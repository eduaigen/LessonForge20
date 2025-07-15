
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
1.  **Preserve JSON Structure:** You MUST return a JSON object with the exact same structure as the input, provided as a valid JSON string. Do not add, remove, or alter any keys, nested objects, or arrays.
2.  **Translate Only User-Facing Text:** Only translate the string values that represent human-readable content (e.g., descriptions, questions, passages). Do not translate keys or other structural elements.
3.  **Preserve Formatting:** Within the string values you translate, you MUST preserve all original Markdown formatting, including lists, bolding (**text**), etc.
4.  **Return Valid JSON String:** The final output in the 'translatedContent' field must be a valid JSON string that can be parsed.

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
