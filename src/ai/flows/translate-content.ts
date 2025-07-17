
'use server';
/**
 * @fileOverview An AI flow for translating lesson plan content.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

export const TranslateContentInputSchema = z.object({
  jsonContent: z.string().describe('The JSON content of the section as a string to be translated.'),
  language: z.enum(['Spanish', 'Bilingual']).describe('The target language for translation.'),
});

export const TranslateContentOutputSchema = z.object({
  translatedContent: z.string().describe('The translated JSON content as a string.'),
});

const prompt = ai.definePrompt({
  name: 'translateContentPrompt',
  input: { schema: TranslateContentInputSchema },
  output: { schema: TranslateContentOutputSchema },
  prompt: `You are an expert translator specializing in educational materials for a high school audience. Your task is to translate the provided JSON content into Spanish.

**CRITICAL INSTRUCTIONS:**
1.  Translate ALL user-facing string values within the JSON object to Spanish.
2.  Do NOT translate the JSON keys (e.g., "lessonTitle", "essentialQuestion").
3.  The final output MUST be a single, valid JSON object formatted as a string.
4.  Ensure all special characters within the translated strings (such as double quotes or backslashes) are properly escaped to maintain valid JSON syntax.
5.  Do not include any explanatory text, markdown formatting, or anything else outside of the single JSON object string.

**JSON Content to Translate:**
---
{{{jsonContent}}}
---

**Example Output:**
If the input is \`{"title": "Hello World"}\`, the output in the 'translatedContent' field must be exactly \`{"title": "Hola Mundo"}\`.
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
  input: z.infer<typeof TranslateContentInputSchema>
): Promise<z.infer<typeof TranslateContentOutputSchema>> {
  return await translateContentFlow(input);
}
