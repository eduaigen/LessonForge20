
'use server';

/**
 * @fileOverview AI flow for generating a complete lesson plan.
 *
 * This file defines the logic for creating a standards-aligned lesson plan
 * based on user-provided curriculum details.
 *
 * - generateLessonPlan: The main exported function that UI components will call.
 */

import {ai} from '@/ai/genkit';
import {
  GenerateLessonPlanInputSchema,
  type GenerateLessonPlanInput,
  GenerateLessonPlanOutputSchema,
  type GenerateLessonPlanOutput,
} from '@/ai/schemas/lesson-plan-schemas';


// This is the main exported function that the UI will call.
export async function generateLessonPlan(input: GenerateLessonPlanInput): Promise<GenerateLessonPlanOutput> {
  const result = await generateLessonPlanFlow(input);
  if (!result) {
    // This could happen if the AI fails or returns an empty string.
    // We will return a user-friendly error message instead of throwing an error.
    return "The AI failed to generate a lesson plan. This may be due to a temporary issue. Please try again with a different or more detailed prompt.";
  }
  return result;
}

const lessonPlanPrompt = ai.definePrompt({
    name: 'lessonPlanPrompt',
    input: { schema: GenerateLessonPlanInputSchema },
    output: { schema: GenerateLessonPlanOutputSchema },
    prompt: `
      You are an expert educator and instructional designer. Your task is to generate a complete, print-ready, and standards-aligned lesson plan based on the provided curriculum context.

      **Core Directive:**
      - Your primary knowledge base is the provided curriculum context (Subject, Unit, Topic, Lesson Title).
      - The lesson plan must be strictly relevant to these inputs.
      - Adhere to established pedagogical practices.
      - If you are asked to generate a visual like a graph or diagram, you must generate a complete <svg> code block.

      **Non-Negotiable Structure:**
      You must generate the lesson plan using these exact headers, in this exact order, with the specified capitalization and formatting. Do not add or omit any sections.

      I. LESSON OVERVIEW
      A. AIM / ESSENTIAL QUESTION
      B. DO NOW
      C. MINI-LESSON / DIRECT INSTRUCTION
      D. GUIDED PRACTICE
      E. CHECK FOR UNDERSTANDING (CFU)
      F. INDEPENDENT PRACTICE
      G. CLOSURE / EXIT TICKET
      H. HOMEWORK ACTIVITY
      I. DIFFERENTIATION & SUPPORT

      **"Self-Contained" Mandate:**
      - For every step from B. DO NOW to H. HOMEWORK, if a "Teacher Action" mentions any material (e.g., a specific question, a data set, a diagram, a reading passage), you must generate that exact material within that section.
      - For any student-facing question requiring a written answer, provide 3 to 5 full lines of underscores (__________________).

      **Curriculum Context:**
      - Subject: {{{subject}}}
      - Unit: {{{unit}}}
      - Topic: {{{topic}}}
      - Lesson Title: {{{lessonTitle}}}
      - Language: {{{language}}}
      {{#if customPrompt}}
      - Additional Instructions: {{{customPrompt}}}
      {{/if}}

      Generate the complete lesson plan now based on these rules and the provided context.
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
    return output ?? ""; // Return an empty string on failure to prevent crashes
  }
);
