
'use server';
/**
 * @fileOverview An AI flow for generating comprehension questions from a text.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import {
  ComprehensionQuestionInputSchema,
  ComprehensionQuestionOutputSchema,
  type ComprehensionQuestionInput,
  type ComprehensionQuestionOutput,
} from '../schemas/comprehension-question-generator-schemas';

const prompt = ai.definePrompt({
  name: 'comprehensionQuestionGeneratorPrompt',
  input: { schema: ComprehensionQuestionInputSchema },
  output: { schema: ComprehensionQuestionOutputSchema },
  prompt: `You are an expert educator. Your task is to generate a set of insightful comprehension questions based on the provided article, in the specified language.

**Language:** {{{language}}}

**Article Content:**
---
{{{articleContent}}}
---

**Instructions:**
1.  Read the article carefully.
2.  Generate a list of 5 comprehension questions in the specified language.
3.  The questions should be a mix of question types (e.g., 'what', 'why', 'how').
4.  Ensure the questions are directly answerable from the text.
`,
});

const comprehensionQuestionGeneratorFlow = ai.defineFlow(
  {
    name: 'comprehensionQuestionGeneratorFlow',
    inputSchema: ComprehensionQuestionInputSchema,
    outputSchema: ComprehensionQuestionOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to generate comprehension questions. Please try again.');
    }
    return output;
  }
);

export async function generateComprehensionQuestions(
  input: ComprehensionQuestionInput
): Promise<ComprehensionQuestionOutput> {
  return await comprehensionQuestionGeneratorFlow(input);
}
