
'use server';

/**
 * @fileOverview A lesson plan generator AI agent.
 *
 * - generateLessonPlan - A function that handles the lesson plan generation process.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit/zod';
import {
  GenerateLessonPlanInputSchema,
  type GenerateLessonPlanInput,
  GenerateLessonPlanOutputSchema,
  type GenerateLessonPlanOutput,
  lessonPlanFormattingInstruction,
} from '@/ai/schemas/lesson-plan-schemas';

export async function generateLessonPlan(input: GenerateLessonPlanInput): Promise<GenerateLessonPlanOutput> {
  const result = await generateLessonPlanFlow(input);
  if (!result.lessonPlan) {
    throw new Error('The AI failed to generate a lesson plan. Please try again with a different or more detailed prompt.');
  }
  return result;
}

const prompt = ai.definePrompt({
  name: 'generateLessonPlanPrompt',
  input: {schema: GenerateLessonPlanInputSchema},
  output: {schema: z.object({ lessonPlan: z.string().nullable() }) },
  prompt: `
You are an expert teacher creating a lesson plan. 
${lessonPlanFormattingInstruction}

Generate a complete and detailed lesson plan based on the following inputs.
The output language MUST be {{language}}.

- **Subject:** {{subject}}
{{#if unit}}- **Unit:** {{unit}}{{/if}}
{{#if topic}}- **Topic:** {{topic}}{{/if}}
- **Lesson Title/Focus:** {{lessonTitle}}
{{#if standards}}- **Selected Standards:** {{#each standards}}{{this}}; {{/each}}{{else}}- **Selected Standards:** General curriculum alignment{{/if}}
{{#if customPrompt}}- **Additional Instructions:** {{customPrompt}}{{/if}}

The AIM / ESSENTIAL QUESTION section should be derived from the "Lesson Title/Focus".
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
    return { lessonPlan: output?.lessonPlan ?? "" };
  }
);
