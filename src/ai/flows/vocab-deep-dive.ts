'use server';

/**
 * @fileOverview Provides a vocabulary term and has the AI generate a definition, example sentence, common misconceptions, and real-world connections.
 *
 * - vocabDeepDive - A function that handles the vocabulary deep dive process.
 * - VocabDeepDiveInput - The input type for the vocabDeepDive function.
 * - VocabDeepDiveOutput - The return type for the vocabDeepDive function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const VocabDeepDiveInputSchema = z.object({
  term: z.string().describe('The vocabulary term to explore.'),
});
export type VocabDeepDiveInput = z.infer<typeof VocabDeepDiveInputSchema>;

const VocabDeepDiveOutputSchema = z.object({
  definition: z.string().describe('A clear and concise definition of the term.'),
  exampleSentence: z.string().describe('An example sentence using the term in context.'),
  commonMisconceptions: z
    .string()
    .describe('Common misconceptions or misunderstandings related to the term.'),
  realWorldConnections:
    z.string().describe('Real-world connections or applications of the term.'),
});
export type VocabDeepDiveOutput = z.infer<typeof VocabDeepDiveOutputSchema>;

export async function vocabDeepDive(input: VocabDeepDiveInput): Promise<VocabDeepDiveOutput> {
  return vocabDeepDiveFlow(input);
}

const prompt = ai.definePrompt({
  name: 'vocabDeepDivePrompt',
  input: {schema: VocabDeepDiveInputSchema},
  output: {schema: VocabDeepDiveOutputSchema},
  prompt: `You are an expert vocabulary teacher. Provide a comprehensive deep dive of the vocabulary term.

Term: {{{term}}}

Generate the following:
- A clear and concise definition of the term.
- An example sentence using the term in context.
- Common misconceptions or misunderstandings related to the term.
- Real-world connections or applications of the term.`,
});

const vocabDeepDiveFlow = ai.defineFlow(
  {
    name: 'vocabDeepDiveFlow',
    inputSchema: VocabDeepDiveInputSchema,
    outputSchema: VocabDeepDiveOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
