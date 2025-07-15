
'use server';
/**
 * @fileOverview An AI flow for generating educational reading material with analysis questions.
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
  prompt: `You are an expert curriculum writer and subject matter expert. Your task is to write a high-quality, engaging, and informative article for a high school audience, and then generate a corresponding set of analysis questions based on that article.

**Topic:** {{{topic}}}
**Target Grade Level:** {{{gradeLevel}}} grade
**Article Length:** {{{length}}} (Standard: ~600 words, Simplified: ~400 words, Expanded: ~900 words)
**Depth of Knowledge (DOK) Level:** {{{dokLevel}}}

**Instructions:**

**Part 1: Generate the Article**
1.  **Generate a Compelling Title:** Create a title that is engaging and relevant to the topic.
2.  **Write the Article:**
    *   The article should be between 500-800 words for 'standard' length. Adjust word count for 'simplified' or 'expanded'.
    *   The language and complexity must be appropriate for the specified grade level and DOK level.
    *   Structure the article with a clear introduction, body paragraphs with supporting details, and a conclusion.
    *   Use headings or subheadings to organize the content if appropriate.
    *   Explain complex concepts clearly and provide relevant examples.
    *   Ensure the content is factually accurate and aligned with NGSS standards where applicable.

**Part 2: Generate the Question Cluster**
Based *only* on the article you just wrote, generate a 4-question cluster that assesses a student's understanding.

1.  **Multiple Choice Question 1:** A straightforward comprehension question based on the article. Provide 4 answer choices.
2.  **Multiple Choice Question 2:** A more analytical multiple-choice question that requires students to make an inference or connection based on the text. Provide 4 answer choices.
3.  **Short Response Question 1:** A question that requires students to explain a concept or relationship from the article in their own words (2-3 sentences).
4.  **Short Response Question 2:** A question that asks students to use specific evidence from the article to support a claim or explain a process.
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
