
'use server';
/**
 * @fileOverview An AI flow for generating a student-facing worksheet from a lesson plan.
 */
import { ai } from '@/ai/genkit';
import {
  WorksheetGeneratorInputSchema,
  WorksheetGeneratorOutputSchema,
  type WorksheetGeneratorInput,
  type WorksheetGeneratorOutput,
} from '../schemas/worksheet-generator-schemas';

const prompt = ai.definePrompt({
  name: 'worksheetGeneratorPrompt',
  input: { schema: WorksheetGeneratorInputSchema },
  output: { schema: WorksheetGeneratorOutputSchema },
  prompt: `You are an expert instructional designer tasked with creating a student-facing worksheet from a teacher's lesson plan. Your goal is to transform the provided JSON lesson plan into a clear, well-structured, and comprehensive structured JSON worksheet that a student can use in the classroom. The worksheet must be a direct reflection of the lesson plan, not an interpretation or a new document.

**Instructions:**
1.  **Analyze the Lesson Plan:** Carefully read through every part of the provided JSON lesson plan object.
2.  **Student-Facing Transformation:** Convert the teacher-facing plan into a document for students. Rephrase teacher instructions into student-friendly directions. For example, instead of "Teacher will ask students to answer the Do Now question," the worksheet should simply present the "Do Now" question for the student to answer. **Do not add new questions or activities.**
3.  **Maintain Structure:** The worksheet's organization must mirror the lesson plan's structure. Populate the JSON output schema with data from each part of the lesson (Aim, Do Now, Mini-Lesson, etc.) in the same order.
4.  **Populate the JSON Schema:**
    *   **Header:** For the header, create strings for 'Name', 'Class', and 'Date' fields that a student can fill in.
    *   **Aim & Vocabulary:**
        *   Copy the "Aim / Essential Question" from the lesson plan.
        *   Copy all "Key Vocabulary" terms and their definitions.
    *   **DO NOW:**
        *   Copy the student activity/question from the "Do Now" section.
    *   **MINI-LESSON:**
        *   **CRITICAL: You MUST embed the full text of any "Embedded Reading Passage" exactly as it appears in the lesson plan. Do not summarize it or refer to it.**
        *   **CRITICAL: If the lesson plan contains a 'diagram' description, you MUST embed this description under the 'diagramDescription' field. Do NOT write "(Diagram would be inserted here)" or any other placeholder text.**
        *   Copy all concept check questions.
    *   **GUIDED PRACTICE / GROUP ACTIVITY:**
        *   Clearly state the instructions for the guided practice activity.
        *   **CRITICAL: For any "Embedded Data Table" from the lesson plan, you MUST copy the entire JSON object for the data table into the 'dataTable' field. Do not alter it.**
    *   **CHECK FOR UNDERSTANDING (CFU):**
        *   Copy all "CFU Questions" (multiple choice and short response) from the lesson plan.
    *   **INDEPENDENT PRACTICE / PERFORMANCE TASK:**
        *   Copy the full "Embedded Task" prompt (e.g., the CER prompt).
        *   **CRITICAL: If the task includes a data table, you MUST copy the entire JSON object for the data table into the 'taskData' field.**
    *   **CLOSURE / EXIT TICKET:**
        *   Transfer the exact "Exit Ticket Question".
    *   **HOMEWORK ACTIVITY:**
        *   Include the full "Homework Activity" as described in the lesson plan.

Generate the complete worksheet as a JSON object based on these strict instructions. Ensure every student-facing element from the lesson plan is present. Failure to embed all required content or follow the JSON schema will result in an invalid response.
`,
});

const worksheetGeneratorFlow = ai.defineFlow(
  {
    name: 'worksheetGeneratorFlow',
    inputSchema: WorksheetGeneratorInputSchema,
    outputSchema: WorksheetGeneratorOutputSchema,
    timeout: 120000, // 2 minutes
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to generate the worksheet. Please try again.');
    }
    return output;
  }
);

export async function generateWorksheet(
  input: WorksheetGeneratorInput
): Promise<WorksheetGeneratorOutput> {
  return await worksheetGeneratorFlow(input);
}
