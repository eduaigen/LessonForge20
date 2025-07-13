'use server';

/**
 * @fileOverview A lesson plan generator AI agent.
 *
 * - generateLessonPlan - A function that handles the lesson plan generation process.
 */

import {ai} from '@/ai/genkit';
import {
  GenerateLessonPlanInputSchema,
  type GenerateLessonPlanInput,
  GenerateLessonPlanOutputSchema,
  type GenerateLessonPlanOutput,
  lessonPlanFormattingInstruction,
} from '@/ai/schemas/lesson-plan-schemas';

export async function generateLessonPlan(input: GenerateLessonPlanInput): Promise<GenerateLessonPlanOutput> {
  return generateLessonPlanFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLessonPlanPrompt',
  input: {schema: GenerateLessonPlanInputSchema},
  output: {schema: GenerateLessonPlanOutputSchema},
  prompt: `
${lessonPlanFormattingInstruction}

Generate a complete and detailed lesson plan based on the following inputs.
The output language MUST be {{language}}.

- **Grade Level:** {{gradeLevel}}
- **Subject:** {{subject}}
{{#if unit}}- **Unit:** {{unit}}{{/if}}
{{#if topic}}- **Topic:** {{topic}}{{/if}}
- **Lesson Title:** {{lessonTitle}}
- **Lesson Aim/Essential Question:** {{lessonAim}}
{{#if standards}}- **Selected Standards:** {{#each standards}}{{this}}; {{/each}}{{else}}- **Selected Standards:** General curriculum alignment{{/if}}
{{#if customPrompt}}- **Additional Instructions:** {{customPrompt}}{{/if}}
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
    return output!;
  }
);
