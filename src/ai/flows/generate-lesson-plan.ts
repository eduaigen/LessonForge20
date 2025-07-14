
'use server';

/**
 * @fileOverview AI flow for generating a complete lesson plan.
 *
 * This file defines the logic for creating a standards-aligned lesson plan
 * based on user-provided curriculum details.
 *
 * - generateLessonPlan: The main exported function that UI components will call.
 * - GenerateLessonPlanInput: The Zod schema for the input object.
 * - GenerateLessonPlanOutput: The Zod schema for the expected output.
 */

import {ai} from '@/ai/genkit';
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
      You are an expert educator and instructional designer. Your task is to generate a complete, print-ready, and standards-aligned lesson plan based on the provided curriculum context.

      **Core Directive:**
      - Your primary knowledge base is the provided curriculum context (Subject, Unit, Topic, Lesson Title).
      - The lesson plan must be strictly relevant to these inputs.
      - Adhere to established pedagogical practices.

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

      **"Self-Contained" Mandate (Internal Review Process):**
      - Before finalizing the output, you must internally review every step from B. DO NOW to H. HOMEWORK.
      - If a "Teacher Action" mentions any material (e.g., a specific question, a data set, a diagram, a reading passage), you must generate that exact material within that section.
      - **Worksheet Exception:** Do not generate full worksheets. Instead, provide a brief description of the worksheet's purpose, question types, concepts covered, and an estimated number of items.
      - The final lesson plan must be a "print-and-go" document with all necessary materials embedded.

      **Mandatory Visual Rendering & Student Response Formatting:**
      - **Visuals:** Any reference to a graph, chart, or diagram must be accompanied by a complete <svg> code block. All math/science notation within visuals must use LaTeX.
      - **Answer Lines:** For any student-facing question requiring a written answer, provide 3 to 5 full lines of underscores (__________________).
      - **Drawing Areas:** For tasks requiring drawing, use the text "[Area for student drawing/graph - approximately Xcm by Ycm]" followed by blank lines.

      **Section-Specific Instructions:**
      - **I. LESSON OVERVIEW:**
        - **Unit & Lesson Title:** Use the provided inputs.
        - **Standards:** List specific NGSS/NYS standards.
        - **AIM / ESSENTIAL QUESTION:** An inquiry-based question that matches the Do Now.
        - **Lesson Objectives (SWBAT):** 2-3 specific, measurable objectives using action verbs.
        - **Key Vocabulary:** 3-5 key terms with definitions.
        - **Materials Needed:** List all materials. Ensure any listed handout/diagram is generated later.
        - **Lesson Summary:** A 2-3 sentence teacher-facing summary. Note if the activities may exceed a 45-minute target.
      - **II. LESSON SEQUENCE (Parts B-G):**
        - **Teacher Actions:** Be extremely specific. Write the exact questions the teacher will ask. Detail all steps.
        - **Expected Student Outputs:** Describe the tangible product or observable outcome.
      - **I. DIFFERENTIATION & SUPPORT:**
        - Provide specific, actionable strategies for English Language Learners (ELLs), Students with Disabilities (SWDs), and Students Needing Enrichment.

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
