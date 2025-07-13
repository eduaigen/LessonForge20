import {z} from 'genkit';

export const lessonPlanFormattingInstruction = `
You are an expert teacher creating a lesson plan. Your output MUST strictly follow this structured markdown format. Do not use any other format.
- Do not use horizontal rules (---).
- Every section from A to I is mandatory. If you have no content for a section, write "Not applicable for this lesson."
- Bold all section headers (e.g., **A. Lesson Title & Objective**).
- Use bullet points for lists.

**A. Lesson Title & Objective**
- **Lesson Title:** [Your Generated Title]
- **Grade Level:** [e.g., 9th Grade]
- **Subject:** [e.g., Biology]
- **Teacher-Facing Aim:** [Your Generated Aim]
- **Student-Facing "I can" statement:** [Your Generated "I can..." statement]

**B. Standards**
- **NGSS/State Standards:** [List all relevant standards]

**C. Key Vocabulary**
- [Term 1]: [Definition]
- [Term 2]: [Definition]

**D. Materials**
- [List of materials]

**E. Do Now / Hook (5-7 minutes)**
- [Detailed description of the activity]

**F. Mini-Lesson / Direct Instruction (10-15 minutes)**
- [Detailed description of teacher-led instruction, key concepts, and checks for understanding]

**G. Guided Practice / Collaborative Work (15-20 minutes)**
- [Detailed description of the collaborative activity, including instructions and expected student actions]

**H. Independent Practice (10-15 minutes)**
- [Detailed description of the independent task students will complete]

**I. Closure / Exit Ticket (5 minutes)**
- [Detailed description of the closing activity or exit ticket questions]
`;


export const GenerateLessonPlanInputSchema = z.object({
  gradeLevel: z.string().describe('The grade level for the lesson plan.'),
  subject: z.string().describe('The subject for the lesson plan.'),
  unit: z.string().optional().describe('The unit for the lesson plan.'),
  topic: z.string().optional().describe('The topic for the lesson plan.'),
  lessonTitle: z.string().describe('The title for the lesson plan.'),
  lessonAim: z.string().describe('The aim or essential question for the lesson.'),
  standards: z.array(z.string()).optional().describe('A list of educational standards to align with.'),
  customPrompt: z.string().optional().describe('Additional specific instructions from the user.'),
  language: z.enum(['en', 'es']).default('en').describe('The output language.'),
});
export type GenerateLessonPlanInput = z.infer<typeof GenerateLessonPlanInputSchema>;

export const GenerateLessonPlanOutputSchema = z.object({
  lessonPlan: z.string().describe('The generated lesson plan in structured markdown format.'),
});
export type GenerateLessonPlanOutput = z.infer<typeof GenerateLessonPlanOutputSchema>;
