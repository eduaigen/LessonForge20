import {z} from 'genkit';

export const GenerateLessonPlanInputSchema = z.object({
  subject: z.string().describe('The main subject area (e.g., "NV Biology", "Illustrative Math Algebra 1").'),
  unit: z.string().describe('The specific unit within the subject.'),
  topic: z.string().describe('The topic within the unit.'),
  lessonTitle: z.string().describe('The title or specific focus of the lesson.'),
  language: z.string().default('en').describe('The language for the lesson plan (e.g., "en" for English).'),
  customPrompt: z.string().optional().describe('Any additional custom instructions or context from the user.'),
});
export type GenerateLessonPlanInput = z.infer<typeof GenerateLessonPlanInputSchema>;

export const GenerateLessonPlanOutputSchema = z.string().nullable().describe("The generated lesson plan as a single block of markdown text, or null if generation fails.");
export type GenerateLessonPlanOutput = z.infer<typeof GenerateLessonPlanOutputSchema>;
