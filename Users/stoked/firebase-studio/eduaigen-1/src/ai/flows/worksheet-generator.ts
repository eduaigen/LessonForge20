
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

async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      if (err instanceof SyntaxError || err.message?.includes("503") || err.message?.includes("model is overloaded") || err.message?.includes("An unexpected response was received from the server")) {
        if (i === retries - 1) {
          console.error("Final attempt failed:", err);
          throw new Error("The AI model failed to generate a valid worksheet after multiple attempts. Please try again.");
        }
        await new Promise(res => setTimeout(res, delay * (i + 1)));
      } else {
        throw err; // Non-retryable error
      }
    }
  }
  throw new Error("Operation failed after multiple retries.");
}


const prompt = ai.definePrompt({
  name: 'worksheetGeneratorPrompt',
  input: { schema: GenerateWorksheetInputSchema },
  output: { schema: GenerateWorksheetOutputSchema },
  prompt: `You are an expert curriculum developer. Your task is to transform a detailed, teacher-facing lesson plan JSON into a structured, student-facing worksheet.

**CRITICAL INSTRUCTIONS:**
1.  **Source Material**: Your ONLY source of information is the provided JSON lesson plan.
2.  **Fidelity**: You MUST follow the instructions for each section below with 100% fidelity.
3.  **No New Content**: Do NOT invent new content, questions, or activities. Your job is to reproduce and reformat existing content for a student audience.
4.  **EXCLUDE TEACHER ACTIONS**: Do NOT include any content from fields named 'teacherActions' or 'expectedStudentOutputs'. The worksheet is for students only.
5.  **Valid JSON Output**: Your final output must be a single, valid JSON object that strictly adheres to the 'GenerateWorksheetOutputSchema'.

---
**WORKSHEET GENERATION INSTRUCTIONS (PART-BY-PART)**
---

1.  **Header Section:**
    *   Action: Populate the 'header' object fields.
    *   Output:
        - lessonTitle: Extract the exact title from 'lessonOverview.lesson'.
        - unitTitle: Extract the exact unit name from 'lessonOverview.unit'.
        - name: "Name: ____________________________"
        - date: "Date: _________________"
        - period: "Period: _________"
        - class: "Class: _____________________________"

2.  **Aim & Essential Question Section:**
    *   Action: Scan 'lessonOverview' in the lesson plan.
    *   Output:
        - Copy 'aim' into 'aim.essentialQuestion'.
        - Set 'aim.rewriteSpace' to "In my own words, the aim of today's lesson is:".

3.  **Introduction Summary:**
    *   Action: Write a brief, 1-2 sentence summary for the student based on 'lessonOverview.lessonSummary'.
    *   Format: "📘 Today’s Lesson Overview: In today’s lesson, you will learn about [topic from lesson summary]. You will explore [key skill or idea from lesson summary], and practice applying it through guided examples and independent work."

4.  **Vocabulary Section:**
    *   Action: Scan 'lessonOverview.vocabulary'. If it exists and has terms, rewrite each term and its definition into the 'terms' array.
    *   Output: Populate the 'vocabulary.terms' array with objects containing 'term' and 'definition' keys.
    *   Example: For a term "Photosynthesis" with definition "The process...", the output object is \`{"term": "Photosynthesis", "definition": "The process..."}\`.
    *   IMPORTANT: If the source 'lessonOverview.vocabulary' is empty or missing, you MUST still include the 'vocabulary' key in your output with an empty 'terms' array. e.g., \`"vocabulary": { "title": "Vocabulary", "terms": [] }\`.

5.  **Do Now Section:**
    *   Action: Scan 'doNow'. Copy the 'question' field exactly.

6.  **Mini Lesson Section:**
    *   Action:
        - Set the 'title' field to "Mini Lesson Notes (T-Chart)".
        - If 'miniLesson.readingPassage' exists, copy the ENTIRE passage into 'miniLesson.readingPassage'.
        - If 'miniLesson.diagram' exists, copy its exact text description into 'diagramDescription'.
        - If 'miniLesson.conceptCheckQuestions' exists, copy ALL questions into 'miniLesson.conceptCheckQuestions'.
        - Populate 'miniLesson.notesTitle' with "Key Ideas or Terms | Notes, Definitions, or Examples".
        - Populate 'miniLesson.sentenceStarters' with an array of strings: ["“This reminds me of…”", ““An example of this is…””, ““This is important because…””].
        

7.  **Guided Practice Section:**
    *   Action:
        - Set the 'title' to "Guided Practice".
        - If 'guidedPractice.activityContent' is a string, copy it into 'instructions' as a single-element array.
        - If 'guidedPractice.activityContent' is an object (a data table), copy the entire JSON object for the table into the 'guidedPractice.dataTable' field. Write a generic instruction like "Analyze the data table below and follow your teacher's directions." for the 'instructions' field. Do NOT use teacherActions.

8.  **Check for Understanding Section:**
    *   Action:
        - Set 'title' to "Check for Understanding".
        - Strictly copy ALL questions from 'checkFoUnderstanding.multipleChoice' and the 'checkFoUnderstanding.shortResponse' into the corresponding fields in the output.

9.  **Independent Practice Section:**
    *   Action:
        - Set 'title' to "Independent Practice".
        - Copy the 'independentPractice.taskPrompt' exactly.
        - If 'independentPractice.taskData' exists, you MUST copy the entire JSON object for the table into the 'independentPractice.taskData' field. Do not alter it.

10. **Closure / Exit Ticket Section:**
    *   Action:
        - Set 'title' to "Exit Ticket".
        - Copy the 'closure.exitTicketQuestion' exactly.

11. **Homework Section:**
    *   Action:
        - Set 'title' to "Homework Assignment".
        - Copy the 'homework.activity' content, which may include passages or questions, exactly into 'homework.activity'.
---
**Final Instruction**: Your response MUST be a single, valid JSON object that strictly follows the 'GenerateWorksheetOutputSchema'. Do not include any text, explanations, or markdown formatting outside of the JSON object.
---
**Lesson Plan Data:**
\`\`\`json
{{{lessonPlanJson}}}
\`\`\`
