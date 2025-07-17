
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

const VocabularyDeepDiveInputSchema = z.string().describe('The vocabulary term to be explained. The user might provide context like subject or grade level.');
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
  prompt: `You are an expert educator and curriculum developer creating high-quality teaching materials. Your task is to provide a comprehensive "deep dive" for a single vocabulary term. The user may provide context like a subject or grade level. If not, assume a general high school level.

Given the following term/query:
"{{{input}}}"

Generate the following content, ensuring it is pedagogically sound and directly relevant to the term:
1.  **Term**: Identify the core vocabulary term from the user's input.
2.  **Definition**: A clear, student-friendly definition appropriate for a high school level.
3.  **In-Context Example**: A sentence or short paragraph that uses the term correctly in a way that reveals its meaning.
4.  **Common Misconceptions**: Explain how students often misunderstand this term or concept and clarify why that understanding is incorrect.
5.  **Real-World Connection**: Provide a simple, relatable example of how this term applies to students' lives or the world around them, making the concept tangible.`,
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
