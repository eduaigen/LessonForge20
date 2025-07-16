
'use server';
/**
 * @fileOverview An AI flow for translating the content of a JSON object to a specified language.
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
  prompt: `You are an expert translator specializing in educational materials. Your task is to translate the provided JSON object into the target language.

**Target Language:** {{{targetLanguage}}}

**IMPORTANT INSTRUCTIONS:**
1.  **Preserve Structure:** You MUST maintain the exact same JSON structure, including all keys, arrays, and nested objects.
2.  **Translate ONLY String Values:** Translate only the string values within the JSON object. Do not translate keys or any non-string values (like numbers or booleans).
3.  **Maintain Formatting:** For strings that contain Markdown, preserve all Markdown syntax (e.g., \`**\`, \`*\`, \`#\`, lists). Translate only the text content.
4.  **Natural Language:** Ensure the translation is accurate, natural, and appropriate for an educational context.

**JSON to Translate:**
---
{{{jsonContent}}}
---

Return the fully translated JSON object in the 'translatedContent' field.`,
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
