
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

**CRITICAL RULES:**
1.  **Strictly Scan the Lesson Plan:** Your ONLY source of information is the provided JSON lesson plan. Do not add, invent, or hallucinate any content, questions, or activities.
2.  **Student-Facing Transformation:** Convert all teacher-facing instructions into student-friendly directions.
3.  **Follow the Structure Precisely:** Populate the JSON output schema by mapping the lesson plan sections (A–H) as described below.

---
**Step-by-Step Generation Instructions:**

1.  **Header and Introduction:**
    *   For the \`header\`, create strings for 'Name', 'Class', and 'Date' fields for a student to fill in.
    *   For the \`introduction\`, write a brief, 1-2 sentence summary for the student explaining what they will be learning and doing in this lesson.

2.  **Part A: Aim & Vocabulary:**
    *   Copy the \`lessonOverview.aim\` from the lesson plan into the \`aim.essentialQuestion\` field of the worksheet.
    *   Copy all vocabulary terms and their definitions from \`lessonOverview.vocabulary\` into \`vocabulary.terms\`. Ensure each definition is a complete sentence.

3.  **Part B: Do Now:**
    *   Copy the exact question from the lesson plan's \`doNow.question\` into the worksheet's \`doNow.question\` field.

4.  **Part C: Mini-Lesson:**
    *   Set up a T-Chart structure for note-taking under \`miniLesson.notesTitle\`. The chart should have two columns: "Key Ideas / Concepts" and "Notes / Details / Questions".
    *   If \`miniLesson.expectedStudentOutputs\` contains examples of student annotations or summaries, use them to create helpful sentence starters for the notes section.
    *   **CRITICAL:** If \`miniLesson.readingPassage\` exists, you MUST embed the full text of the passage exactly as it appears into the \`readingPassage\` field.
    *   Embed the \`miniLesson.diagram\` description if it exists into the \`diagramDescription\` field.
    *   Copy all questions from \`miniLesson.conceptCheckQuestions\` into the corresponding field.

5.  **Part D: Guided Practice:**
    *   Emulate the problems students will work on by rephrasing the instructions from \`guidedPractice.teacherActions\` as student-facing directions in the \`instructions\` field.
    *   **CRITICAL:** If \`guidedPractice.dataTable\` exists, you MUST copy the entire JSON object for the data table into the \`dataTable\` field. Do not alter it.

6.  **Part E: Check for Understanding (CFU):**
    *   Strictly copy all questions from \`checkFoUnderstanding.multipleChoice\` and \`checkFoUnderstanding.shortResponse\`. Use \`expectedStudentOutputs\` for guidance on what a correct answer might look like, but do not copy the answer itself into the question prompt.

7.  **Part F: Independent Practice:**
    *   Copy the exact task prompt from \`independentPractice.taskPrompt\`.
    *   If \`independentPractice.taskData\` exists, copy the exact data table into the \`taskData\` field.

8.  **Part G: Closure / Exit Ticket:**
    *   Copy the exact question from \`closure.exitTicketQuestion\`.

9.  **Part H: Homework Activity:**
    *   Copy the full activity description from \`homework.activity\` into the corresponding field.
    *   **CRITICAL:** If the homework requires a reading passage, data table, or diagram, it MUST be fully rendered within the \`activity\` field.
    *   Copy the extension activity from \`differentiation.extensionActivity\` into the \`extensionActivity\` field.
    *   Copy the support strategies and materials from \`differentiation.scaffoldedMaterials\` into the \`differentiation_support\` field.
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
