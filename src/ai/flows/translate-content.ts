
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
  prompt: `You are an expert translator specializing in educational materials. Your task is to translate the user-facing text content within the provided JSON string into the specified target language.

**CRITICAL INSTRUCTIONS:**
1.  **Preserve JSON Structure:** You MUST preserve the exact JSON structure, including all keys, nested objects, and arrays.
2.  **Translate Only User-Facing Text:** Only translate the string values that represent human-readable content (e.g., descriptions, questions, passages). Do not translate keys or other structural elements.
3.  **Preserve Formatting:** Within the string values you translate, you MUST preserve all original Markdown formatting, including lists, bolding (**text**), etc.

**Target Language:** {{{targetLanguage}}}

**JSON Content to Translate:**
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
