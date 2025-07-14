
'use server';
/**
 * @fileOverview An AI flow for translating content.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import {
  TranslateContentInputSchema,
  TranslateContentOutputSchema,
  type TranslateContentInput,
  type TranslateContentOutput,
} from '../schemas/translate-content-schemas';

const prompt = ai.definePrompt({
  name: 'translateContentPrompt',
  input: { schema: TranslateContentInputSchema },
  output: { schema: TranslateContentOutputSchema },
  prompt: `You are an expert translator. Your task is to translate the provided text content into the specified target language. The content is in Markdown format. Preserve the Markdown formatting in the translated output.

**Target Language:** {{{targetLanguage}}}

**Content to Translate:**
---
{{{content}}}
---
`,
});

const translateContentFlow = ai.defineFlow(
  {
    name: 'translateContentFlow',
    inputSchema: TranslateContentInputSchema,
    outputSchema: TranslateContentOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to translate the content. Please try again.');
    }
    return output;
  }
);

export async function translateContent(
  input: TranslateContentInput
): Promise<TranslateContentOutput> {
  return await translateContentFlow(input);
}
