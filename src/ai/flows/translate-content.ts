
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
  prompt: `Translate the text values in the following JSON object into {{{targetLanguage}}}.

**CRITICAL INSTRUCTIONS:**
1.  **PRESERVE JSON STRUCTURE:** You MUST maintain the exact same JSON structure, including all keys, arrays, and nested objects. Do NOT translate the JSON keys. Only translate the string values associated with the keys.
2.  **TRANSLATE ONLY STRING VALUES:** Translate only the string values. Do not alter numbers, booleans, or null values.
3.  **MAINTAIN MARKDOWN:** For any string that contains Markdown formatting (e.g., \`**\`, \`*\`, \`#\`, lists), you must preserve all Markdown syntax perfectly. Translate only the text content around the Markdown.
4.  **OUTPUT ONLY THE JSON OBJECT:** Your entire response MUST be the translated JSON object and nothing else. It must start with \`{\` and end with \`}\`. Do not include any extra text, explanations, or markdown fences like \`\`\`json.

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
    timeout: 120000, // 2 minutes timeout for complex translations
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
