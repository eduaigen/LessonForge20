
'use server';

/**
 * @fileOverview AI flow for generating a complete lesson plan.
 *
 * This file defines the logic for creating a standards-aligned lesson plan
 * based on user-provided curriculum details. It includes input validation,
 * a structured prompt for the AI, and error handling.
 *
 * - generateLessonPlan: The main exported function that UI components will call.
 * - GenerateLessonPlanInput: The Zod schema for the input object.
 * - GenerateLessonPlanOutput: The Zod schema for the expected output.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import {
  GenerateLessonPlanInputSchema,
  type GenerateLessonPlanInput,
  GenerateLessonPlanOutputSchema,
  type GenerateLessonPlanOutput,
  lessonPlanFormattingInstruction
} from '@/ai/schemas/lesson-plan-schemas';


// This is the main exported function that the UI will call.
export async function generateLessonPlan(input: GenerateLessonPlanInput): Promise<GenerateLessonPlanOutput> {
  const result = await generateLessonPlanFlow(input);
  if (!result || !result.lessonPlan) {
    // This could happen if the AI fails or returns an empty string.
    // We can throw an error to be handled by the calling UI component.
    throw new Error('The AI failed to generate a lesson plan. Please try again with a different or more detailed prompt.');
  }
  return result;
}

const lessonPlanPrompt = ai.definePrompt({
    name: 'lessonPlanPrompt',
    input: { schema: GenerateLessonPlanInputSchema },
    output: { schema: GenerateLessonPlanOutputSchema },
    prompt: `
        You are an expert educator and instructional designer. Your task is to generate a complete, print-ready, and standards-aligned lesson plan based on the provided curriculum context.

        **Curriculum Context:**
        - Subject: {{{subject}}}
        - Unit: {{{unit}}}
        - Topic: {{{topic}}}
        - Lesson Title: {{{lessonTitle}}}
        - Language: {{{language}}}
        {{#if customPrompt}}
        - Additional Instructions: {{{customPrompt}}}
        {{/if}}

        **Formatting and Structure Rules (Non-Negotiable):**
        You MUST follow these instructions exactly. The entire output must be a single block of structured markdown text.
        ${lessonPlanFormattingInstruction}

        Generate the lesson plan now based on these rules and the provided context.
    `,
});

const generateLessonPlanFlow = ai.defineFlow(
  {
    name: 'generateLessonPlanFlow',
    inputSchema: GenerateLessonPlanInputSchema,
    outputSchema: GenerateLessonPlanOutputSchema,
  },
  async (input) => {
    const { output } = await lessonPlanPrompt(input);
    return output ?? { lessonPlan: null };
  }
);
