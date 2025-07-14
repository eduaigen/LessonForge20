
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
  prompt: `You are an expert translator specializing in educational materials. Your task is to translate the provided text content into the specified target language.

**Crucially, you MUST preserve all original Markdown formatting.** This includes headers (like #, ##, ###), lists (like * or 1.), bolding (**text**), italics (*text*), tables, and any embedded SVG code blocks (<svg>...</svg>). The structure of the output must exactly match the structure of the input. Do not add or remove any formatting.

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
