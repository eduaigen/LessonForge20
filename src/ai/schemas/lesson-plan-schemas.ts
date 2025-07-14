import {z} from 'genkit';
import { aiContentGenerationRules } from './formatting-rules';

export const lessonPlanFormattingInstruction = `
${aiContentGenerationRules}

You are an expert teacher creating a lesson plan. Your output MUST strictly follow this structured format using the specified section headers. Do not use any other format.
- Every section from A to I is mandatory. If you have no content for a section, write "Not applicable for this lesson."
- Bold all section headers (e.g., **A. AIM / ESSENTIAL QUESTION**).
- Use bullet points for lists.

A. AIM / ESSENTIAL QUESTION
- [Your Generated Aim based on user's lesson title/focus]

B. DO NOW
- [Detailed description of the activity]

C. MINI-LESSON
- [Detailed description of teacher-led instruction, key concepts, and checks for understanding]

D. GUIDED PRACTICE
- [Detailed description of the collaborative activity, including instructions and expected student actions]

E. CHECK FOR UNDERSTANDING
- [Detailed description of how you will check for understanding]

F. INDEPENDENT PRACTICE
- [Detailed description of the independent task students will complete]

G. CLOSURE / EXIT TICKET
- [Detailed description of the closing activity or exit ticket questions]

H. HOMEWORK ACTIVITY
- [Description of homework activity]

I. DIFFERENTIATION & SUPPORT
- [Description of differentiation and support strategies]
`;


export const GenerateLessonPlanInputSchema = z.object({
  gradeLevel: z.string().describe('The grade level for the lesson plan.'),
  subject: z.string().describe('The subject for the lesson plan.'),
  unit: z.string().optional().describe('The unit for the lesson plan.'),
  topic: z.string().optional().describe('The topic for the lesson plan.'),
  lessonTitle: z.string().describe('The title or focus for the lesson plan. The AI will generate objectives from this.'),
  standards: z.array(z.string()).optional().describe('A list of educational standards to align with.'),
  customPrompt: z.string().optional().describe('Additional specific instructions from the user.'),
  language: z.enum(['en', 'es']).default('en').describe('The output language.'),
});
export type GenerateLessonPlanInput = z.infer<typeof GenerateLessonPlanInputSchema>;

export const GenerateLessonPlanOutputSchema = z.object({
  lessonPlan: z.string().describe('The generated lesson plan in structured markdown format.'),
});
export type GenerateLessonPlanOutput = z.infer<typeof GenerateLessonPlanOutputSchema>;
