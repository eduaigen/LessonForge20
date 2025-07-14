
'use server';

/**
 * @fileOverview A lesson plan generator AI agent.
 *
 * - generateLessonPlan - A function that handles the lesson plan generation process.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { aiContentGenerationRules } from '../schemas/formatting-rules';


const GenerateLessonPlanInputSchema = z.object({
  subject: z.string().describe('The subject for the lesson plan.'),
  unit: z.string().optional().describe('The unit for the lesson plan.'),
  topic: z.string().optional().describe('The topic for the lesson plan.'),
  lessonTitle: z.string().describe('The title or focus for the lesson plan. The AI will generate objectives from this.'),
  standards: z.array(z.string()).optional().describe('A list of educational standards to align with.'),
  customPrompt: z.string().optional().describe('Additional specific instructions from the user.'),
  language: z.enum(['en', 'es']).default('en').describe('The output language.'),
});
export type GenerateLessonPlanInput = z.infer<typeof GenerateLessonPlanInputSchema>;


const GenerateLessonPlanOutputSchema = z.string().describe('The generated lesson plan in structured markdown format.');
export type GenerateLessonPlanOutput = z.infer<typeof GenerateLessonPlanOutputSchema>;


export async function generateLessonPlan(input: GenerateLessonPlanInput): Promise<string> {
  const result = await generateLessonPlanFlow(input);
  if (!result) {
    // This could happen if the AI fails or returns an empty string.
    // We can throw an error to be handled by the calling UI component.
    throw new Error('The AI failed to generate a lesson plan. Please try again with a different or more detailed prompt.');
  }
  return result;
}

const prompt = ai.definePrompt({
  name: 'generateLessonPlanPrompt',
  input: {schema: GenerateLessonPlanInputSchema},
  output: {schema: z.string().nullable()},
  prompt: `
You are an expert teacher creating a lesson plan. 
You must generate a complete, print-ready lesson plan based on the provided curriculum details and standards. Your output must be a single block of text with clear sections.
${aiContentGenerationRules}

Generate a complete and detailed lesson plan based on the following inputs.
The output language MUST be {{language}}.

- **Subject:** {{subject}}
{{#if unit}}- **Unit:** {{unit}}{{/if}}
{{#if topic}}- **Topic:** {{topic}}{{/if}}
- **Lesson Title/Focus:** {{lessonTitle}}
{{#if standards}}- **Selected Standards:** {{#each standards}}{{this}}; {{/each}}{{else}}- **Selected Standards:** General curriculum alignment{{/if}}
{{#if customPrompt}}- **Additional Instructions:** {{customPrompt}}{{/if}}

The AIM / ESSENTIAL QUESTION section should be derived from the "Lesson Title/Focus".
The lesson plan must be structured with the following sections, in order:
I. LESSON OVERVIEW (Unit, Lesson Title, Standards, Aim, Objectives, Vocabulary, Materials, Summary)
II. LESSON SEQUENCE (B. DO NOW, C. MINI-LESSON, D. GUIDED PRACTICE, E. CHECK FOR UNDERSTANDING, F. INDEPENDENT PRACTICE, G. CLOSURE, H. HOMEWORK)
III. DIFFERENTIATION & SUPPORT

For each part of the LESSON SEQUENCE, include Teacher Actions and Expected Student Outputs.
Crucially, if you mention a resource (like a diagram, reading passage, data table, or specific questions), you MUST generate and embed that resource directly into the relevant section.
`,
});

const generateLessonPlanFlow = ai.defineFlow(
  {
    name: 'generateLessonPlanFlow',
    inputSchema: GenerateLessonPlanInputSchema,
    outputSchema: GenerateLessonPlanOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output ?? "";
  }
);
