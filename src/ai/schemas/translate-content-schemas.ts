
import { z } from 'zod';

export const TranslateContentInputSchema = z.object({
  content: z.string().describe('The Markdown-formatted content to be translated.'),
  targetLanguage: z.string().default('Spanish').describe('The language to translate the content into (e.g., "Spanish", "French", "Mandarin").'),
});

export const TranslateContentOutputSchema = z.object({
  translatedContent: z.string().describe('The translated content, with original Markdown formatting perfectly preserved.'),
});

export type TranslateContentInput = z.infer<typeof TranslateContentInputSchema>;
export type TranslateContentOutput = z.infer<typeof TranslateContentOutputSchema>;
