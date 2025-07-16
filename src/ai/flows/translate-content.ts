
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
  prompt: `Translate the following JSON object into {{{targetLanguage}}}.

**IMPORTANT INSTRUCTIONS:**
1.  **Preserve JSON Structure:** You MUST maintain the exact same JSON structure, including all keys, arrays, and nested objects. Do not translate keys or any non-string values (like numbers or booleans).
2.  **Translate ONLY String Values:** Translate only the string values within the JSON object.
3.  **Maintain Formatting:** For strings that contain Markdown, preserve all Markdown syntax (e.g., \`**\`, \`*\`, \`#\`, lists). Translate only the text content.
4.  **Output ONLY JSON:** Your entire response must be ONLY the translated JSON object, starting with \`{\` and ending with \`}\`. Do not include any extra text, explanations, or markdown fences like \`\`\`json.

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
