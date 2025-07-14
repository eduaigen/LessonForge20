'use server';
/**
 * @fileOverview An AI flow for generating educational reading material.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import {
  ReadingMaterialInputSchema,
  ReadingMaterialOutputSchema,
  type ReadingMaterialInput,
  type ReadingMaterialOutput,
} from '../schemas/reading-material-generator-schemas';

const prompt = ai.definePrompt({
  name: 'readingMaterialGeneratorPrompt',
  input: { schema: ReadingMaterialInputSchema },
  output: { schema: ReadingMaterialOutputSchema },
  prompt: `You are an expert curriculum writer and subject matter expert. Your task is to write a high-quality, engaging, and informative article for a high school audience.

**Topic:** {{{topic}}}
**Target Grade Level:** {{{gradeLevel}}} grade
**Article Length:** {{{length}}} (Standard: ~600 words, Simplified: ~400 words, Expanded: ~900 words)
**Depth of Knowledge (DOK) Level:** {{{dokLevel}}}

**Instructions:**
1.  **Generate a Compelling Title:** Create a title that is engaging and relevant to the topic.
2.  **Write the Article:**
    *   The article should be between 500-800 words for 'standard' length. Adjust word count for 'simplified' or 'expanded'.
    *   The language and complexity must be appropriate for the specified grade level and DOK level.
    *   Structure the article with a clear introduction, body paragraphs with supporting details, and a conclusion.
    *   Use headings or subheadings to organize the content if appropriate.
    *   Explain complex concepts clearly and provide relevant examples.
    *   Ensure the content is factually accurate and aligned with NGSS standards where applicable.
3.  **Do Not Include Questions:** The article itself should not contain any comprehension questions at the end. It should be a standalone piece of reading material.
`,
});

const readingMaterialGeneratorFlow = ai.defineFlow(
  {
    name: 'readingMaterialGeneratorFlow',
    inputSchema: ReadingMaterialInputSchema,
    outputSchema: ReadingMaterialOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to generate the reading material. Please try again.');
    }
    return output;
  }
);

export async function generateReadingMaterial(input: ReadingMaterialInput): Promise<ReadingMaterialOutput> {
  return await readingMaterialGeneratorFlow(input);
}
