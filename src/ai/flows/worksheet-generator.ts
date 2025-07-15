
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
  prompt: `You are an expert instructional designer tasked with creating a student-facing worksheet from a teacher's lesson plan. Your goal is to transform the provided JSON lesson plan into a clear, well-structured, and comprehensive structured JSON worksheet that a student can use in the classroom.

**Critical Rules:**
1.  **Strictly Scan the Lesson Plan:** Your ONLY source of information is the provided JSON lesson plan. Do not add, invent, or hallucinate any content, questions, or activities.
2.  **Student-Facing Transformation:** Convert all teacher-facing instructions into student-friendly directions. For example, instead of "Teacher will ask students to...", the worksheet should simply present the question for the student to answer.
3.  **Follow the Structure Precisely:** Populate the JSON output schema by mapping the lesson plan sections (A–I) as described below.

---
**Step-by-Step Generation Instructions:**

1.  **Header and Introduction:**
    *   For the \`header\`, create strings for 'Name', 'Class', and 'Date' fields that a student can fill in.
    *   For the \`introduction\`, write a brief, 1-2 sentence summary for the student explaining what they will be learning and doing in this lesson.

2.  **Part A: Aim & Vocabulary:**
    *   Copy the \`lessonOverview.aim\` into \`aim.essentialQuestion\`.
    *   Copy all vocabulary terms and definitions from \`lessonOverview.vocabulary\` into \`vocabulary.terms\`. Ensure they are complete sentences.

3.  **Part B: Do Now:**
    *   Copy the exact question from \`doNow.question\` into \`doNow.question\`.

4.  **Part C: Mini-Lesson:**
    *   **T-Chart for Notes:** Set up a T-Chart structure for note-taking. You can use the \`miniLesson.notesTitle\` for this section. The chart should have two columns: "Key Ideas / Concepts" and "Notes / Details / Questions".
    *   **Sentence Starters:** If the \`miniLesson.expectedStudentOutputs\` provide examples of student annotations or summaries, use them to create a few helpful sentence starters for the notes section.
    *   **Embed Reading Passage:** If \`miniLesson.readingPassage\` exists, you MUST embed the full text of the passage exactly as it appears.
    *   **Embed Diagram Description:** If \`miniLesson.diagram\` description exists, embed it under \`diagramDescription\`. Do NOT write placeholders like "(Diagram would be inserted here)".
    *   **Embed Questions:** Copy all \`miniLesson.conceptCheckQuestions\`.

5.  **Part D: Guided Practice:**
    *   Emulate the problems students will work on by rephrasing the instructions from \`guidedPractice.teacherActions\` for the student.
    *   **CRITICAL:** If \`guidedPractice.dataTable\` exists, you MUST copy the entire JSON object for the data table into the \`dataTable\` field. Do not alter it.

6.  **Part E: Check for Understanding (CFU):**
    *   Strictly copy all questions from \`checkFoUnderstanding.multipleChoice\` and \`checkFoUnderstanding.shortResponse\`. Use student outputs for guidance if needed, but do not copy them.

7.  **Part F: Independent Practice:**
    *   Copy the exact task prompt from \`independentPractice.taskPrompt\`.
    *   If \`independentPractice.taskData\` exists, copy the exact data table.

8.  **Part G: Closure / Exit Ticket:**
    *   Copy the exact question from \`closure.exitTicketQuestion\`.

9.  **Part H: Homework Activity:**
    *   Copy the full activity description from \`homework.activity\`.
    *   **CRITICAL:** If the homework requires a reading passage, data, or diagram, it MUST be fully rendered in the \`activity\` field.
    *   For the \`extensionActivity\` field, copy the extension activity from \`differentiation.extensionActivity\`.
    *   For the \`differentiation_support\` field, copy the support strategies from \`differentiation.scaffoldedMaterials\`.

---
Generate the complete worksheet as a JSON object based on these strict instructions. Failure to embed all required content or follow the JSON schema will result in an invalid response.
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
