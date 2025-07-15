
import { z } from 'zod';

export const LessonSectionRefinerInputSchema = z.object({
  sectionName: z.string().describe('The name of the lesson plan section being revised (e.g., "doNow", "miniLesson").'),
  originalContent: z.string().describe('The original JSON content of the section as a string.'),
  instructions: z.string().describe('The user\'s specific instructions for how to revise the content.'),
});

export const LessonSectionRefinerOutputSchema = z.object({
  revisedContent: z.string().describe('The revised JSON content of the section as a string, conforming to the original structure.'),
});

export type LessonSectionRefinerInput = z.infer<typeof LessonSectionRefinerInputSchema>;
export type LessonSectionRefinerOutput = z.infer<typeof LessonSectionRefinerOutputSchema>;
