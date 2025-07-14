'use server';
/**
 * @fileOverview An AI flow for providing a deep dive into a vocabulary term.
 *
 * - vocabularyDeepDive - A function that handles the vocabulary explanation process.
 * - VocabularyDeepDiveInput - The input type for the vocabularyDeepDive function.
 * - VocabularyDeepDiveOutput - The return type for the vocabularyDeepDive function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VocabularyDeepDiveInputSchema = z.object({
  term: z.string().describe('The vocabulary term to be explained.'),
  subject: z.string().describe('The subject where this term is used (e.g., Biology, US History).'),
  gradeLevel: z.string().describe('The target grade level for the explanation (e.g., 10th Grade).'),
});
export type VocabularyDeepDiveInput = z.infer<typeof VocabularyDeepDiveInputSchema>;

const VocabularyDeepDiveOutputSchema = z.object({
  term: z.string().describe('The vocabulary term.'),
  definition: z.string().describe('A clear, grade-appropriate definition of the term.'),
  inContextExample: z.string().describe('An example sentence or short paragraph showing the term used in context.'),
  commonMisconceptions: z.string().describe('Common misunderstandings or pitfalls related to the term.'),
  realWorldConnection: z.string().describe('A connection to a real-world scenario or application.'),
});
export type VocabularyDeepDiveOutput = z.infer<typeof VocabularyDeepDiveOutputSchema>;

export async function vocabularyDeepDive(input: VocabularyDeepDiveInput): Promise<VocabularyDeepDiveOutput> {
  return vocabularyDeepDiveFlow(input);
}

const prompt = ai.definePrompt({
  name: 'vocabularyDeepDivePrompt',
  input: {schema: VocabularyDeepDiveInputSchema},
  output: {schema: VocabularyDeepDiveOutputSchema},
  prompt: `You are an expert educator creating teaching materials. Your task is to provide a comprehensive "deep dive" for a single vocabulary term, tailored for a specific subject and grade level.

Given the following information:
- Term: {{{term}}}
- Subject: {{{subject}}}
- Grade Level: {{{gradeLevel}}}

Generate the following content:
1.  **Definition**: A clear, student-friendly definition appropriate for the grade level.
2.  **In-Context Example**: A sentence or short paragraph that uses the term correctly in a way that reveals its meaning.
3.  **Common Misconceptions**: A brief explanation of how students often misunderstand this term or concept.
4.  **Real-World Connection**: A relatable example of how this term applies to students' lives or the world around them.`,
});

const vocabularyDeepDiveFlow = ai.defineFlow(
  {
    name: 'vocabularyDeepDiveFlow',
    inputSchema: VocabularyDeepDiveInputSchema,
    outputSchema: VocabularyDeepDiveOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to generate the vocabulary deep dive. Please try again.');
    }
    return output;
  }
);
