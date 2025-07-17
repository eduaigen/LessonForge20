
import { z } from 'zod';
import type { LanguageOption } from '@/components/common/LanguageSelectionDialog';

export const ComprehensionQuestionInputSchema = z.object({
  articleContent: z.string().describe('The full text of the article to generate questions from.'),
  language: z.custom<LanguageOption>().optional().default('English'),
});

export const ComprehensionQuestionOutputSchema = z.object({
  questions: z.array(z.string()).describe('A list of comprehension questions based on the article.'),
});

export type ComprehensionQuestionInput = z.infer<typeof ComprehensionQuestionInputSchema>;
export type ComprehensionQuestionOutput = z.infer<typeof ComprehensionQuestionOutputSchema>;
