
'use server';
/**
 * @fileOverview An AI flow for generating a student-facing worksheet from a lesson plan.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { WorksheetGeneratorInputSchema, WorksheetGeneratorOutputSchema, type WorksheetGeneratorInput, type WorksheetGeneratorOutput } from '../schemas/worksheet-generator-schemas';

const prompt = ai.definePrompt({
  name: 'worksheetGeneratorPrompt',
  input: { schema: z.object({ worksheetDataJson: z.string() }) },
  output: { schema: WorksheetGeneratorOutputSchema },
  prompt: `You are an expert instructional designer tasked with creating a student-facing worksheet from a teacher's lesson plan. Your goal is to transform the provided JSON lesson plan into a clear, well-structured, and comprehensive worksheet that a student can use in the classroom. The worksheet must be a direct reflection of the lesson plan, not an interpretation or a new document.

**Instructions:**
1.  **Analyze the Lesson Plan:** Carefully read through every part of the provided JSON lesson plan object, from "I. LESSON OVERVIEW" to "H. HOMEWORK ACTIVITY".
2.  **Student-Facing Transformation:** Convert the teacher-facing plan into a document for students. Rephrase teacher instructions into student-friendly directions. For example, instead of "Teacher will ask students to answer the Do Now question," the worksheet should simply present the "Do Now" question for the student to answer. **Do not add new questions or activities.**
3.  **Maintain Structure:** The worksheet's organization must mirror the lesson plan's structure. Create sections for each part of the lesson (Aim, Do Now, Mini-Lesson, etc.) and ensure they appear in the same order.
4.  **Formatting for Student Use:** For every question, prompt, or note-taking area, ensure there is ample blank space for a student to write their full response. Use extra line breaks to create visible space for answers.
5.  **Follow Section-Specific Rules:**

    *   **Header:** Start the worksheet with a header for the student to write their Name, Class, and Date.

    *   **A. Aim & Vocabulary:**
        *   Copy the "Aim / Essential Question" exactly as it appears in the lesson plan.
        *   Provide space for the student to rewrite the Aim in their own words.
        *   List all "Key Vocabulary" terms from the lesson plan. For each term, provide its definition from the plan.

    *   **B. DO NOW:**
        *   Specifically copy the student activity/question from the "Do Now" section of the lesson plan.
        *   Provide ample space for the student to write their answer.

    *   **C. MINI-LESSON:**
        *   Based on the topic and the teacher/student actions from the lesson plan, design a simple note-taking strategy for the student (e.g., a two-column note frame).
        *   **CRITICAL: You MUST embed the full text of any "Embedded Reading Passage" exactly as it appears in the lesson plan. Do not summarize it or refer to it. Generate the full text.**
        *   **CRITICAL: You MUST embed any "Embedded Diagram" or other visuals (like SVGs) from the lesson plan directly. The visual must be fully rendered in the worksheet.**

    *   **D. GUIDED PRACTICE / GROUP ACTIVITY:**
        *   Clearly state the instructions for the guided practice activity, taken from the lesson plan.
        *   **CRITICAL: You MUST perfectly render and include any "Embedded Data Table," graphs, or other materials from the lesson plan needed for the activity. Provide space for completion. Do not use placeholders.**

    *   **E. CHECK FOR UNDERSTANDING (CFU):**
        *   Copy all "CFU Questions" (multiple choice and short response) from the lesson plan for the student to answer. Provide space for their responses.

    *   **F. INDEPENDENT PRACTICE / PERFORMANCE TASK:**
        *   Copy the full "Embedded Task" prompt (e.g., the CER prompt) from the lesson plan.
        *   Provide clear instructions and ample space for the student to complete the assignment.
        *   **CRITICAL: You MUST include any necessary "taskData," tables, or graphs from the lesson plan, ensuring they are perfectly rendered.**

    *   **G. CLOSURE / EXIT TICKET:**
        *   Transfer the exact "Exit Ticket Question" from the lesson plan.

    *   **H. HOMEWORK ACTIVITY:**
        *   Include the full "Homework Activity" as described in the lesson plan.

**Lesson Plan Data:**
\`\`\`json
{{{worksheetDataJson}}}
\`\`\`

Generate the complete worksheet content in Markdown format based on these strict instructions. Ensure every student-facing element from the lesson plan, especially all visual data like tables and diagrams, is present and correctly rendered. Ensure there is sufficient blank space for students to write their answers for all questions. Failure to embed all required content will result in an invalid response.
`,
});

const worksheetGeneratorFlow = ai.defineFlow(
  {
    name: 'worksheetGeneratorFlow',
    inputSchema: WorksheetGeneratorInputSchema,
    outputSchema: WorksheetGeneratorOutputSchema,
  },
  async (input) => {
    // Convert the lesson plan object to a JSON string before passing to the prompt
    const worksheetDataJson = JSON.stringify(input, null, 2);

    const { output } = await prompt({ worksheetDataJson });
    if (!output) {
      throw new Error('The AI failed to generate the worksheet. Please try again.');
    }
    return output;
  }
);

export async function generateWorksheet(input: WorksheetGeneratorInput): Promise<WorksheetGeneratorOutput> {
  return await worksheetGeneratorFlow(input);
}
