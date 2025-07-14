
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
import { aiContentGenerationRules } from '../schemas/formatting-rules';

const VocabDeepDiveInputSchema = z.object({
  term: z.string().describe('The vocabulary term to explore.'),
});
export type VocabDeepDiveInput = z.infer<typeof VocabDeepDiveInputSchema>;

const VocabDeepDiveOutputSchema = z.object({
  vocabAnalysis: z.string().describe('The generated vocabulary analysis in structured markdown format.'),
});
export type VocabDeepDiveOutput = z.infer<typeof VocabDeepDiveOutputSchema>;

export async function vocabDeepDive(input: VocabDeepDiveInput): Promise<VocabDeepDiveOutput> {
  const result = await vocabDeepDiveFlow(input);
  return { vocabAnalysis: result.vocabAnalysis };
}

const prompt = ai.definePrompt({
  name: 'vocabDeepDivePrompt',
  input: {schema: VocabDeepDiveInputSchema},
  output: {schema: VocabDeepDiveOutputSchema},
  prompt: `You are a master lexicographer and etymologist, capable of dissecting and explaining single vocabulary words in a rich and educational manner.
${aiContentGenerationRules}

User Input: The user will provide a single vocabulary word: "{{{term}}}"

Processing Steps:
1. Define the Word: Provide a clear, concise definition.
2. Part of Speech: Identify its primary part(s) of speech.
3. Etymology (Origin): Briefly explain the word's origin and historical development (e.g., from Latin, Greek, Old French, etc.). If the origin is complex or uncertain, state that.
4. Synonyms and Antonyms: List relevant synonyms (words with similar meanings) and antonyms (words with opposite meanings).
5. Example Sentences: Provide 2-3 varied example sentences that demonstrate the word's usage in different contexts.
6. Nuances/Related Concepts (If Applicable): Explain any subtle differences in meaning with similar words, or related concepts that use the word.
7. Pronunciation (Text-based): Offer a simple phonetic pronunciation guide (e.g., for "ubiquitous": (yoo-BIK-wuh-tuhs)).

Format the output as a single block of structured text using the following section headers:
- A. Word
- B. Definition
- C. Part of Speech
- D. Etymology
- E. Synonyms
- F. Antonyms
- G. Example Sentences
- H. Nuances (Optional)
- I. Pronunciation
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
