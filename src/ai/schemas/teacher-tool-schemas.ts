import { z } from 'zod';

// Define the types of tools available
const toolTypes = [
    'worksheet', 'reading_material', 'comprehension_questions', 'study_sheet',
    'cluster_questions', 'slideshow_outline', 'ell_swd_scaffolds',
    'diagram_flowchart', 'math_visualizer', 'teacher_coach'
] as const;
export const toolTypeSchema = z.enum(toolTypes);
export type ToolType = z.infer<typeof toolTypeSchema>;

export const GenerateTeacherToolInputSchema = z.object({
  lessonPlan: z.string().describe('The full content of the lesson plan to be used as the source material.'),
  toolType: toolTypeSchema.describe('The specific type of tool to generate.'),
});
export type GenerateTeacherToolInput = z.infer<typeof GenerateTeacherToolInputSchema>;

export const GenerateTeacherToolOutputSchema = z.object({
  content: z.string().describe('The generated content for the specified tool.'),
});
export type GenerateTeacherToolOutput = z.infer<typeof GenerateTeacherToolOutputSchema>;
