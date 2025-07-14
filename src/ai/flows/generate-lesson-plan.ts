
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
      You are an AI assistant specializing in creating high-quality, standards-aligned educational materials. Your primary mission is to generate a complete, print-ready lesson plan based on the provided curriculum context and pedagogical best practices.

      **Core Directive:**
      - Your knowledge base is the provided curriculum context (Subject, Unit, Topic, Lesson Title). Do not use real-time internet searches.
      - The generated lesson plan must be strictly relevant to the curriculum inputs.
      - If you are asked to generate a visual like a graph, chart, or diagram, you MUST generate a complete, well-formed <svg> code block for it.
      - For any student-facing question requiring a written answer, provide 3 to 5 full lines of underscores (__________________).

      **Non-Negotiable Structure:**
      You must generate the lesson plan using these exact headers, in this exact order, with the specified capitalization and formatting. Do not add, omit, or alter any sections.

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
      - For every step from B. DO NOW to H. HOMEWORK, if a "Teacher Action" mentions any material (e.g., a specific question, a data set, a diagram, a reading passage), you MUST generate that exact material within that section.
      - The only exception is for a "worksheet." For worksheets, provide a brief description of its purpose, question types, concepts covered, and estimated number of items.

      **Section-Specific Instructions:**
      - **I. LESSON OVERVIEW**: Must include: Unit/Lesson Title, Standards (infer from context), a single AIM / ESSENTIAL QUESTION, 2-3 measurable SWBAT objectives, Key Vocabulary with definitions, a list of materials, and a 2-3 sentence lesson summary. The 'Do Now' question must match the AIM.
      - **II. LESSON SEQUENCE (Parts B-G)**: For each part, provide specific "Teacher Actions" (e.g., "Teacher asks: 'What are the two main inputs for photosynthesis?'") and "Expected Student Outputs" (e.g., "Students will submit a completed KWL chart.").
      - **I. DIFFERENTIATION & SUPPORT**: Provide specific, actionable strategies for English Language Learners (ELLs), Students with Disabilities (SWDs), and Students Needing Enrichment.

      **Curriculum Context:**
      - Subject: {{{subject}}}
      - Unit: {{{unit}}}
      - Topic: {{{topic}}}
      - Lesson Title: {{{lessonTitle}}}
      - Language: {{{language}}}
      {{#if customPrompt}}
      - Additional Instructions: {{{customPrompt}}}
      {{/if}}

      Generate the complete, self-contained lesson plan now based on these rules and the provided context.
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

    