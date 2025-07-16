
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
import { GenerateNVBiologyLessonOutputSchema } from '../schemas/nv-biology-lesson-schemas';
import { z } from 'zod';

const PromptInputSchema = z.object({
    lessonPlanJson: z.string().describe('The complete lesson plan object as a JSON string.'),
});

const prompt = ai.definePrompt({
  name: 'studySheetGeneratorPrompt',
  input: { schema: PromptInputSchema },
  output: { schema: StudySheetOutputSchema },
  prompt: `You are an expert educator creating a comprehensive study guide for students based on a detailed lesson plan. Your task is to extract, synthesize, and reformat the most critical information into a clear, concise, and thorough study sheet.

**Lesson Plan Data:**
\`\`\`json
{{{lessonPlanJson}}}
\`\`\`

**Instructions:**
1.  **Analyze the Entire Lesson Plan:** Read through the entire JSON to identify all core content for students.
2.  **Extract Header Information:**
    *   **lessonTitle**: Get this from 'lessonOverview.lesson'.
    *   **essentialQuestion**: Get this from 'lessonOverview.aim'.
3.  **Extract Key Vocabulary:** From the 'lessonOverview.vocabulary' section, pull out all terms and their definitions.
4.  **Synthesize Core Concepts:** Review the 'lessonOverview.objectives' and the 'miniLesson.readingPassage'. Synthesize this information into a bulleted list of the 3-5 most important scientific concepts or "big ideas" from the lesson. These should be complete sentences that summarize a key takeaway.
5.  **Describe the Key Diagram:** If a 'miniLesson.diagram' description exists, summarize it in the 'keyDiagram' field. Explain what the diagram or model illustrates.
6.  **Compile Practice Questions:** Create a list of key questions for students to review. Pull these from the following sections:
    *   'doNow.question'
    *   'miniLesson.conceptCheckQuestions' (include all)
    *   'checkFoUnderstanding.multipleChoice' and 'checkFoUnderstanding.shortResponse' (include all)
    *   'closure.exitTicketQuestion'
    For each question, note its source section.
7.  **Summarize Activities and Data:** Review the 'guidedPractice' and 'independentPractice' sections. For each, create a summary explaining the purpose of the activity or what the data analysis was intended to demonstrate.

Generate a complete and detailed study sheet based *only* on the provided lesson plan JSON.`,
});

const studySheetGeneratorFlow = ai.defineFlow(
  {
    name: 'studySheetGeneratorFlow',
    inputSchema: StudySheetInputSchema,
    outputSchema: StudySheetOutputSchema,
  },
  async (input) => {
    const lessonPlanJson = JSON.stringify(input, null, 2);
    const { output } = await prompt({ lessonPlanJson });
    if (!output) {
      throw new Error('The AI failed to generate the study sheet. Please try again.');
    }
    return output;
  }
);

export async function generateStudySheet(input: StudySheetInput): Promise<StudySheetOutput> {
  return await studySheetGeneratorFlow(input);
}
