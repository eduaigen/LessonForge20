
import { z } from 'zod';

export const TranslateContentInputSchema = z.object({
  jsonContent: z.string().describe('The JSON object to be translated, provided as a string.'),
  targetLanguage: z.string().describe('The language to translate the content into (e.g., "Spanish", "French", "Mandarin Chinese").'),
});

export const TranslateContentOutputSchema = z.object({
  translatedContent: z.string().describe('The translated JSON object as a string, with its structure preserved.'),
});

export type TranslateContentInput = z.infer<typeof TranslateContentInputSchema>;
export type TranslateContentOutput = z.infer<typeof TranslateContentOutputSchema>;
