
'use server';
/**
 * @fileOverview An AI flow for generating a student-facing worksheet from a lesson plan.
 */
import { ai } from '@/ai/genkit';
import {
  GenerateWorksheetInputSchema,
  GenerateWorksheetOutputSchema,
  type GenerateWorksheetInput,
  type GenerateWorksheetOutput,
} from '../schemas/worksheet-generator-schemas';

const prompt = ai.definePrompt({
  name: 'worksheetGeneratorPrompt',
  input: { schema: GenerateWorksheetInputSchema },
  output: { schema: GenerateWorksheetOutputSchema },
  prompt: `You are an expert curriculum developer. Your task is to transform a detailed, teacher-facing lesson plan JSON into a structured, student-facing worksheet in the specified language.

**CRITICAL RULES:**
1.  **Language**: Generate all text content in **{{{language}}}**. If the language is "Bilingual", provide the English text first, followed by an exact, word-for-word Spanish translation on a new line and in italics. **CRITICAL**: Do NOT translate any numerical data within data tables; only translate textual headers and titles.
2.  **Source Material**: Your ONLY source of information is the provided JSON lesson plan.
3.  **Fidelity**: You MUST follow the instructions for each section below with 100% fidelity.
4.  **No New Content**: Do NOT invent new content, questions, or activities. Your job is to reproduce and reformat existing content for a student audience.
5.  **EXCLUDE TEACHER ACTIONS**: Do NOT include any content from fields named 'teacherActions' or 'expectedStudentOutputs'. The worksheet is for students only.

**Lesson Plan Data:**
\`\`\`json
{{{lessonPlanJson}}}
\`\`\`

---
**WORKSHEET GENERATION INSTRUCTIONS**
---

**1. Header Section:**
- **Action:** Populate the 'header' object fields as placeholders in the target language.
- **Output:**
    - name: "Name: ______________________" (and Spanish translation if bilingual)
    - date: "Date: _______________" (and Spanish translation if bilingual)
    - period: "Period: _______" (and Spanish translation if bilingual)
    - grade: "Grade: _______" (and Spanish translation if bilingual)
    - class: "Class: ___________________" (and Spanish translation if bilingual)
    - teacher: "Teacher: ___________________" (and Spanish translation if bilingual)

**2. Aim & Essential Question Section:**
- **Action:** Scan 'lessonOverview' in the lesson plan.
- **Output:**
    - Copy 'aim' into 'aim.essentialQuestion'.
    - Copy 'essentialQuestion' into 'aim.rewriteSpace' (leave it as the question).

**3. Introduction Summary:**
- **Action:** Write a brief, 1-2 sentence summary for the student based on 'lessonOverview.lessonSummary'.
- **Format:** "📘 Today’s Lesson Overview: In today’s lesson, you will learn about [topic from lesson summary]. You will explore [key skill or idea from lesson summary], and practice applying it through guided examples and independent work."

**4. Vocabulary Section:**
- **Action:** Scan 'lessonOverview.vocabulary'. Rewrite each term and its definition into a complete, student-friendly sentence.
- **Output:** Populate the 'vocabulary.terms' array.
- **Example:** For a term "Photosynthesis" with definition "The process...", the output sentence is "Photosynthesis is the process...".

**5. Do Now Section:**
- **Action:** Scan 'doNow'. Copy the 'question' field exactly.

**6. Mini Lesson Section:**
- **Action:**
    - Set the 'title' field to "Mini Lesson Notes (T-Chart)".
    - **CRITICAL:** If 'miniLesson.readingPassage' exists, copy the ENTIRE passage into 'miniLesson.readingPassage'.
    - **CRITICAL:** If 'miniLesson.conceptCheckQuestions' exists, copy ALL questions into 'miniLesson.conceptCheckQuestions'.
    - Populate 'miniLesson.notesTitle' with "Key Ideas or Terms | Notes, Definitions, or Examples".
    - Populate 'miniLesson.sentenceStarters' with: "“This reminds me of…”, “An example of this is…”, “This is important because…”".
    - If 'miniLesson.diagram' exists, copy its description into 'miniLesson.diagramDescription'.

**7. Guided Practice Section:**
- **Action:**
    - Set the 'title' to "Guided Practice".
    - If 'guidedPractice.activityContent' is a string, copy it into 'instructions'.
    - If 'guidedPractice.activityContent' is an object (a data table), copy the entire JSON object for the table into the 'guidedPractice.dataTable' field. Write a generic instruction like "Analyze the data table below and follow your teacher's directions." for the 'instructions' field. Do NOT use teacherActions.

**8. Check for Understanding Section:**
- **Action:**
    - Set 'title' to "Check for Understanding".
    - **CRITICAL:** Strictly copy ALL questions from 'checkFoUnderstanding.multipleChoice' and the 'checkFoUnderstanding.shortResponse' into the corresponding fields in the output.

**9. Independent Practice Section:**
- **Action:**
    - Set 'title' to "Independent Practice".
    - Copy the 'independentPractice.taskPrompt' exactly.
    - **CRITICAL:** If 'independentPractice.taskData' exists, you MUST copy the entire JSON object for the table into the 'independentPractice.taskData' field. Do not alter it.

**10. Closure / Exit Ticket Section:**
- **Action:**
    - Set 'title' to "Exit Ticket".
    - Copy the 'closure.exitTicketQuestion' exactly.

**11. Homework Section:**
- **Action:**
    - Set 'title' to "Homework Assignment".
    - **CRITICAL:** Copy the 'homework.activity' content, which may include passages or questions, exactly into 'homework.activity'.
    - Copy 'differentiation.extensionActivity' into 'homework.extensionActivity'.
    - Copy 'differentiation.scaffoldedMaterials' into 'homework.differentiation_support'.

**Final Check:** Review your generated JSON to ensure every instruction was followed precisely. The output must be a valid JSON object matching the 'GenerateWorksheetOutputSchema' and be in the correct language.
`,
});

const worksheetGeneratorFlow = ai.defineFlow(
  {
    name: 'worksheetGeneratorFlow',
    inputSchema: GenerateWorksheetInputSchema,
    outputSchema: GenerateWorksheetOutputSchema,
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

export async function generateWorksheet(input: GenerateWorksheetInput): Promise<GenerateWorksheetOutput> {
  return await worksheetGeneratorFlow(input);
}
