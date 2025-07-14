
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
  prompt: `You are an expert educator creating a study guide for students based on a detailed lesson plan. Your task is to extract the most important information and present it in a clear, concise, and easy-to-review format.

**Lesson Plan Data:**
\`\`\`json
{{{lessonPlanJson}}}
\`\`\`

**Instructions:**
1.  **Analyze the Lesson Plan:** Read through the entire lesson plan JSON to identify the core content.
2.  **Extract Key Vocabulary:** From the 'lessonOverview.vocabulary' section, pull out all terms and their definitions.
3.  **Identify Key Concepts:** Synthesize information from the 'lessonSummary', 'aim', 'objectives', 'readingPassage', and 'conceptCheckQuestions' to create a bulleted list of the 3-5 most important concepts or "big ideas" from the lesson. These should be complete sentences that summarize a key takeaway.
4.  **Find Real-World Applications:** Review the entire lesson, especially the 'independentPractice', 'guidedPractice', and 'closure' sections. Generate 2-3 questions or statements that connect the lesson's content to real-world scenarios, applications, or problems. These should prompt the student to think about how the concepts apply outside the classroom.

Generate the study sheet based on these instructions.`,
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
