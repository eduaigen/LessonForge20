
'use server';

/**
 * @fileOverview AI flow for regenerating a single test question.
 *
 * - regenerateQuestion - A function that regenerates a question based on an original.
 * - RegenerateQuestionInput - The input type for the function.
 * - RegenerateQuestionOutput - The return type for the function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RegenerateQuestionInputSchema = z.object({
  originalQuestion: z.string().describe('The original question to be replaced.'),
  subject: z.string().describe('The subject of the test.'),
  unit: z.string().describe('The unit(s) the test covers.'),
  topic: z.string().describe('The topic(s) the test covers.'),
});
export type RegenerateQuestionInput = z.infer<typeof RegenerateQuestionInputSchema>;

const RegenerateQuestionOutputSchema = z.object({
  newQuestion: z.string().describe('The newly generated question, formatted identically to the original.'),
  newAnswer: z.string().describe('The corresponding answer for the new question.'),
});
export type RegenerateQuestionOutput = z.infer<typeof RegenerateQuestionOutputSchema>;

export async function regenerateQuestion(input: RegenerateQuestionInput): Promise<RegenerateQuestionOutput> {
  return regenerateQuestionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'regenerateQuestionPrompt',
  input: {schema: RegenerateQuestionInputSchema},
  output: {schema: RegenerateQuestionOutputSchema},
  prompt: `You are an expert educator and exam creator. Your task is to regenerate a single test question to be similar in style, topic, and difficulty to the original, but different.

**Context:**
- Subject: {{{subject}}}
- Unit(s): {{{unit}}}
- Topic: {{{topic}}}

**Original Question:**
{{{originalQuestion}}}

**Task:**
1.  Analyze the original question to understand its format (e.g., multiple choice, short answer), cognitive level (e.g., recall, analysis), and specific content.
2.  Generate a **new, different question** that covers the same core concept and is suitable for the same test context.
3.  Generate a corresponding **correct answer** for the new question.
4.  Ensure the new question and answer are formatted cleanly. The question should start with its number (e.g., "1. "), and the answer should follow the same pattern.
5.  Return the new question and its answer.
`,
});

const regenerateQuestionFlow = ai.defineFlow(
  {
    name: 'regenerateQuestionFlow',
    inputSchema: RegenerateQuestionInputSchema,
    outputSchema: RegenerateQuestionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
