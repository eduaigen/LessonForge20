
'use server';
/**
 * @fileOverview An AI flow for translating structured JSON content into another language.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';

const TranslateContentInputSchema = z.object({
  jsonContent: z.string().describe('The JSON content of the lesson section as a string.'),
  language: z.string().describe('The target language for translation (e.g., "Spanish", "Mandarin").'),
});

const TranslateContentOutputSchema = z.object({
  translatedContent: z.string().describe('The translated content, returned as a valid JSON string with the same structure as the input.'),
});

const prompt = ai.definePrompt({
  name: 'translateContentPrompt',
  input: { schema: TranslateContentInputSchema },
  output: { schema: TranslateContentOutputSchema },
  prompt: `You are an expert translator specializing in educational materials. Your task is to translate the provided JSON content into the specified target language.

**CRITICAL INSTRUCTIONS:**
1.  **Translate All Text Values:** Translate every string value within the JSON object. Do not translate the keys.
2.  **Maintain JSON Structure:** The output MUST be a valid JSON object with the exact same structure (keys and nesting) as the original input. This is non-negotiable.
3.  **Handle Special Formatting:** Preserve any Markdown or LaTeX formatting within the strings. For example, if the original text is "**Term:** Definición", the translated text should be "**Término:** Definition".

**JSON Content to Translate:**
\`\`\`json
{{{jsonContent}}}
\`\`\`

**Target Language:** {{{language}}}

Translate the content and provide the revised JSON in the 'translatedContent' field.`,
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
  return translateContentFlow(input);
}
