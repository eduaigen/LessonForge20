import { z } from 'zod';

export const ReadingMaterialInputSchema = z.object({
  topic: z.string().describe('The specific topic for the article.'),
  gradeLevel: z.string().describe('The target grade level (e.g., "9th", "10th").'),
  length: z.enum(['simplified', 'standard', 'expanded']).describe("The desired length of the article."),
  dokLevel: z.enum(['1-2', '3-4']).describe("The Depth of Knowledge level for the content."),
});

export const ReadingMaterialOutputSchema = z.object({
  title: z.string().describe('The generated title for the article.'),
  articleContent: z.string().describe('The full content of the generated article in Markdown format.'),
});

export type ReadingMaterialInput = z.infer<typeof ReadingMaterialInputSchema>;
export type ReadingMaterialOutput = z.infer<typeof ReadingMaterialOutputSchema>;
