
import { z } from 'zod';

export const TranslateContentInputSchema = z.object({
  content: z.string().describe('The JSON object to be translated, provided as a string.'),
  targetLanguage: z.string().default('Spanish').describe('The language to translate the content into (e.g., "Spanish", "French", "Mandarin").'),
});

export const TranslateContentOutputSchema = z.object({
  translatedContent: z.string().describe('The translated content, with original JSON structure perfectly preserved as a string.'),
});

export type TranslateContentInput = z.infer<typeof TranslateContentInputSchema>;
export type TranslateContentOutput = z.infer<typeof TranslateContentOutputSchema>;
