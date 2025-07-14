import { z } from 'zod';

export const GenerateNVBiologyLessonInputSchema = z.object({
  unit: z.string().describe('The unit from the NV Biology curriculum.'),
  topic: z.string().describe('The topic within the selected unit.'),
  lesson: z.string().describe('The specific lesson objective or title.'),
  strategy: z.enum(['Engage', 'Explore', 'Explain', 'Elaborate', 'Evaluate']).describe('The 5E instructional model stage.'),
  additionalInfo: z.string().optional().describe('Any additional notes, requests, or context from the user.'),
});

export const GenerateNVBiologyLessonOutputSchema = z.object({
  lessonPlan: z.string().describe('The generated lesson plan content for the specified 5E stage in Markdown format.'),
});

export type GenerateNVBiologyLessonInput = z.infer<typeof GenerateNVBiologyLessonInputSchema>;
export type GenerateNVBiologyLessonOutput = z.infer<typeof GenerateNVBiologyLessonOutputSchema>;
