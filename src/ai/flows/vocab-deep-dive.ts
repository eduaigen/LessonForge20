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
  word: z.string(),
  definition: z.string().describe('A clear and concise definition of the term.'),
  partOfSpeech: z.string().describe('The primary part(s) of speech.'),
  etymology: z.string().describe("The word's origin and historical development."),
  synonyms: z.array(z.string()).describe('A list of relevant synonyms.'),
  antonyms: z.array(z.string()).describe('A list of relevant antonyms.'),
  exampleSentences: z.array(z.string()).describe('2-3 varied example sentences.'),
  nuances: z.string().optional().describe('Subtle differences in meaning with similar words or related concepts.'),
  pronunciation: z.string().describe('A simple phonetic pronunciation guide (e.g., yoo-BIK-wuh-tuhs).'),
});
export type VocabDeepDiveOutput = z.infer<typeof VocabDeepDiveOutputSchema>;

export async function vocabDeepDive(input: VocabDeepDiveInput): Promise<VocabDeepDiveOutput> {
  return vocabDeepDiveFlow(input);
}

const prompt = ai.definePrompt({
  name: 'vocabDeepDivePrompt',
  input: {schema: VocabDeepDiveInputSchema},
  output: {schema: VocabDeepDiveOutputSchema},
  prompt: `You are a master lexicographer and etymologist, capable of dissecting and explaining single vocabulary words in a rich and educational manner.

User Input: The user will provide a single vocabulary word: "{{{term}}}"

Processing Steps:
1. Define the Word: Provide a clear, concise definition.
2. Part of Speech: Identify its primary part(s) of speech.
3. Etymology (Origin): Briefly explain the word's origin and historical development (e.g., from Latin, Greek, Old French, etc.). If the origin is complex or uncertain, state that.
4. Synonyms and Antonyms: List relevant synonyms (words with similar meanings) and antonyms (words with opposite meanings).
5. Example Sentences: Provide 2-3 varied example sentences that demonstrate the word's usage in different contexts.
6. Nuances/Related Concepts (If Applicable): Explain any subtle differences in meaning with similar words, or related concepts that use the word.
7. Pronunciation (Text-based): Offer a simple phonetic pronunciation guide (e.g., for "ubiquitous": (yoo-BIK-wuh-tuhs)).

Provide the output in the specified JSON format.
`,
});

const vocabDeepDiveFlow = ai.defineFlow(
  {
    name: 'vocabDeepDiveFlow',
    inputSchema: VocabDeepDiveInputSchema,
    outputSchema: VocabDeepDiveOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
