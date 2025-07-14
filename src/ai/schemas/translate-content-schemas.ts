
import { z } from 'zod';

export const TranslateContentInputSchema = z.object({
  content: z.string().describe('The Markdown content to be translated.'),
  targetLanguage: z.string().default('Spanish').describe('The language to translate the content into.'),
});

export const TranslateContentOutputSchema = z.object({
  translatedContent: z.string().describe('The translated content, with Markdown formatting preserved.'),
});

export type TranslateContentInput = z.infer<typeof TranslateContentInputSchema>;
export type TranslateContentOutput = z.infer<typeof TranslateContentOutputSchema>;
