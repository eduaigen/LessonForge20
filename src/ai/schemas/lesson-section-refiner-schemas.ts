
'use server';

import { z } from 'zod';

export const LessonSectionRefinerInputSchema = z.object({
  sectionName: z.string().describe('The name of the lesson plan section to be refined (e.g., "Do Now", "Mini-Lesson").'),
  sectionContent: z.string().describe('The current content of the section as a JSON string.'),
  userPrompt: z.string().describe('The user\'s specific instructions for how to revise the section.'),
});
export type LessonSectionRefinerInput = z.infer<typeof LessonSectionRefinerInputSchema>;

export const LessonSectionRefinerOutputSchema = z.object({
    revisedContent: z.any().describe('The revised content of the lesson plan section as a JSON object, matching the original schema.'),
});
export type LessonSectionRefinerOutput = z.infer<typeof LessonSectionRefinerOutputSchema>;
