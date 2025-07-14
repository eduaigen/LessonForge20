import { z } from 'genkit';

// Define the types of tools available
const toolTypes = [
    'worksheet', 'article', 'graph_chart_data', 'diagram_flowchart',
    'slideshow_outline', 'pedagogical_coach', 'ell_swd_support',
    'enrichment_activity', 'math_problem_visualizer'
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
