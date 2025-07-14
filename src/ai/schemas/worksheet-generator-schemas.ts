import { z } from 'zod';
import { GenerateNVBiologyLessonOutputSchema } from './nv-biology-lesson-schemas';

export const WorksheetGeneratorInputSchema = GenerateNVBiologyLessonOutputSchema;

export const WorksheetGeneratorOutputSchema = z.object({
  worksheetContent: z.string().describe('The full content of the student-facing worksheet in Markdown format.'),
});

export type WorksheetGeneratorInput = z.infer<typeof WorksheetGeneratorInputSchema>;
export type WorksheetGeneratorOutput = z.infer<typeof WorksheetGeneratorOutputSchema>;
