
'use server';
/**
 * @fileOverview An AI flow for generating a student study sheet from a lesson plan.
 */
import { ai } from '@/ai/genkit';
import {
  StudySheetInputSchema,
  StudySheetOutputSchema,
  type StudySheetInput,
  type StudySheetOutput,
} from '../schemas/study-sheet-generator-schemas';

const prompt = ai.definePrompt({
  name: 'studySheetGeneratorPrompt',
  input: { schema: StudySheetInputSchema },
  output: { schema: StudySheetOutputSchema },
  prompt: `You are an expert educator creating a comprehensive study guide for students based on a detailed lesson plan. Your task is to extract, synthesize, and reformat the most critical information into a clear, concise, and thorough study sheet.

**CRITICAL INSTRUCTIONS:**
1.  **Source Material**: Your ONLY source of information is the provided JSON lesson plan. Do not invent new content.
2.  **Follow Instructions Precisely**: You MUST follow the instructions for each section below with 100% fidelity.
3.  **Valid JSON Output**: Your final output must be a single, valid JSON object that strictly adheres to the 'StudySheetOutputSchema'.

**Lesson Plan Data:**
\`\`\`json
{{{lessonPlanJson}}}
\`\`\`

---
**STUDY SHEET GENERATION INSTRUCTIONS (PART-BY-PART)**
---

1.  **lessonTitle**: Extract the exact title from 'lessonOverview.lesson'.
2.  **essentialQuestion**: Extract the exact question from 'lessonOverview.aim'.
3.  **vocabulary**:
    *   Iterate through the 'lessonOverview.vocabulary' array.
    *   For each object, create a new object in the output with the 'term' and 'definition'.
    *   If the source vocabulary is empty, output an empty array: \`"vocabulary": []\`.
4.  **coreConcepts**:
    *   Carefully read the 'lessonOverview.objectives' and the 'miniLesson.readingPassage'.
    *   Synthesize this information into a bulleted list of the 3-5 most important concepts or "big ideas" from the lesson. These must be complete sentences summarizing key takeaways found ONLY in the lesson plan.
5.  **keyDiagram**:
    *   If a 'miniLesson.diagram' description exists, summarize it in this field.
    *   Explain what the diagram or model illustrates, based on its description in the lesson plan. If it does not exist, omit this field.
6.  **practiceQuestions**:
    *   Create a list of key questions for students to review.
    *   You MUST pull these questions from the following sections of the lesson plan, in this order:
        - 'doNow.question'
        - All questions from 'miniLesson.conceptCheckQuestions'
        - All 'multipleChoice' and 'shortResponse' questions from 'checkFoUnderstanding'
        - The 'closure.exitTicketQuestion'
    *   For each question you pull, create an object containing the 'question' text and a 'source' string indicating which section it came from (e.g., "Do Now", "Concept Check", "Check for Understanding", "Exit Ticket").
7.  **activitiesAndData**:
    *   Review the 'guidedPractice' and 'independentPractice' sections.
    *   For each section, create one summary object in the output array.
    *   Set 'activityTitle' to either "Guided Practice Activity" or "Independent Practice Task".
    *   Write a 'summary' that explains the purpose of that activity or data analysis, based on the provided content.

**Final Check:** Review your generated JSON to ensure every instruction was followed precisely. The output must be a valid JSON object matching the 'StudySheetOutputSchema'.`,
});

const studySheetGeneratorFlow = ai.defineFlow(
  {
    name: 'studySheetGeneratorFlow',
    inputSchema: StudySheetInputSchema,
    outputSchema: StudySheetOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to generate the study sheet. Please try again.');
    }
    return output;
  }
);

export async function generateStudySheet(input: StudySheetInput): Promise<StudySheetOutput> {
  return await studySheetGeneratorFlow(input);
}
