
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
  prompt: `You are an expert instructional designer tasked with creating a student-facing worksheet from a teacher's lesson plan. Your goal is to transform the provided JSON lesson plan into a clear, well-structured, and comprehensive worksheet that a student can use in the classroom. The worksheet must be differentiated for Multilingual Learners (MLLs) and Students with Disabilities (SWDs).

**Instructions:**
1.  **Analyze the Lesson Plan:** Carefully read through every part of the provided JSON lesson plan object, from "I. LESSON OVERVIEW" to "H. HOMEWORK ACTIVITY".
2.  **Student-Facing Transformation:** Convert the teacher-facing plan into a document for students. Rephrase teacher instructions into student-friendly directions. For example, instead of "Teacher will ask students to answer the Do Now question," the worksheet should simply present the "Do Now" question for the student to answer.
3.  **Maintain Structure:** The worksheet's organization must mirror the lesson plan's structure. Create sections for each part of the lesson.
4.  **Follow Section-Specific Rules:**

    *   **Header:** Start the worksheet with a header for the student to write their Name, Class, and Date.

    *   **A. Aim & Vocabulary:**
        *   Copy the "Aim / Essential Question" exactly as it appears in the lesson plan.
        *   Provide space for the student to rewrite the Aim in their own words.
        *   List all "Key Vocabulary" terms. For each term, provide its definition but turn key words into fill-in-the-blanks for students to complete (e.g., "Homeostasis: The process by which an organism maintains a stable internal ________.").

    *   **B. DO NOW:**
        *   Specifically copy the student activity/question from the "Do Now" section.
        *   Provide ample space for the student to write their answer.

    *   **C. MINI-LESSON:**
        *   Based on the topic and the teacher/student actions, design a simple note-taking strategy for the student (e.g., a two-column note frame, a simple graphic organizer).
        *   Embed the full text of the "Embedded Reading Passage".
        *   **Crucially, embed any SVG "Embedded Diagram" or other visuals directly. The visual must be fully rendered in the worksheet.**
        *   List all "Concept-Check Questions" with space for answers.

    *   **D. GUIDED PRACTICE / GROUP ACTIVITY:**
        *   Clearly state the instructions for the guided practice activity.
        *   Guide the student on how to complete the task.
        *   **Perfectly render and include any "Embedded Data Table," graphs, or other materials needed for the activity. Provide space for completion.**

    *   **E. CHECK FOR UNDERSTANDING (CFU):**
        *   Copy all "CFU Questions" (multiple choice and short response) for the student to answer. Provide space for their responses.

    *   **F. INDEPENDENT PRACTICE / PERFORMANCE TASK:**
        *   Based on the teacher actions and expected outputs, copy the full "Embedded Task" prompt (e.g., the CER prompt).
        *   Provide clear instructions and ample space for the student to complete the assignment.
        *   **Include any necessary "taskData," tables, or graphs, ensuring they are perfectly rendered.**

    *   **G. CLOSURE / EXIT TICKET:**
        *   Transfer the exact same question/activity from the "DO NOW" section here. Add a prompt like: "Let's revisit our Do Now question. Has your thinking changed? Explain your answer now, using what you've learned in today's lesson."

    *   **H. HOMEWORK ACTIVITY:**
        *   Include the full "Homework Activity" as described in the lesson plan.

**Lesson Plan Data:**
\`\`\`json
{{{worksheetDataJson}}}
\`\`\`

Generate the complete worksheet content in Markdown format based on these instructions. Ensure every student-facing element from the lesson plan, especially all visual data like tables and diagrams, is present and correctly rendered.`,
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
