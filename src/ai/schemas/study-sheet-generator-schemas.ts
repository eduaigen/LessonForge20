
import { z } from 'zod';

export const StudySheetInputSchema = z.object({
  lessonPlanJson: z.string().describe('The complete lesson plan object as a JSON string.'),
});

export const StudySheetOutputSchema = z.object({
  vocabulary: z.array(z.object({
    term: z.string(),
    definition: z.string(),
  })).describe('A list of key vocabulary terms and their definitions from the lesson.'),
  keyConcepts: z.array(z.string()).describe('A bulleted list of the 3-5 most important concepts or big ideas from the lesson.'),
  applications: z.array(z.string()).describe('A list of 2-3 questions or prompts connecting the lesson content to real-world applications.'),
});

export type StudySheetInput = z.infer<typeof StudySheetInputSchema>;
export type StudySheetOutput = z.infer<typeof StudySheetOutputSchema>;
