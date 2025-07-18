
'use server';
/**
 * @fileOverview An AI flow for generating subject-appropriate practice questions from a lesson plan.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import {
  GeneratePracticeQuestionsInputSchema,
  GeneratePracticeQuestionsOutputSchema,
  type GeneratePracticeQuestionsInput,
  type GeneratePracticeQuestionsOutput,
} from '../schemas/practice-questions-generator-schemas';

const prompt = ai.definePrompt({
  name: 'practiceQuestionsGeneratorPrompt',
  input: { schema: GeneratePracticeQuestionsInputSchema },
  output: { schema: GeneratePracticeQuestionsOutputSchema },
  prompt: `You are an expert educator and assessment writer. Your task is to generate a set of high-quality, subject-appropriate practice questions or a practice activity based on the provided lesson plan. The questions should be similar in style to a Regents exam for that subject.

**Source Material**: Your ONLY source of information is the provided JSON lesson plan. Do not invent new content.

**Lesson Plan Data:**
---
{{{lessonPlanJson}}}
---

**Subject Area:** {{{subject}}}

**CRITICAL INSTRUCTIONS:**
1.  **Analyze the Lesson:** Carefully review the entire lesson plan, including the objectives, vocabulary, reading passages, activities, and essential questions.
2.  **Generate Content Based on Subject:**
    *   If the subject is 'ELA', generate exactly 4-6 questions.
    *   **If the subject is 'ELL', you MUST generate a complete, student-facing PRACTICE ACTIVITY instead of a question list.** The activity should be directly related to the lesson and allow students to practice the skills they learned. The output MUST still follow the question/answer key schema, but you will adapt it: use the 'question' field for the activity description (e.g., instructions, a short reading passage, or a graphic organizer description) and the 'answer' field for an exemplar of a completed student activity. Create only ONE "question" and one "answer" that represents the entire activity.
    *   For all other subjects, generate exactly 5-7 questions.
3.  **Separate Questions and Answers:** Your output must have two distinct top-level keys: "questions" and "answerKey". The questions and their corresponding answers must be in separate arrays.
4.  **Vary Question Types (for non-ELL subjects):** The questions should be a mix of the following types, appropriate for the specified subject:
    *   **Multiple-Choice:** Create at least two multiple-choice questions. Each must have four plausible answer choices. The choices themselves should NOT contain letters (e.g., A., B., C.).
    *   **Short Response:** Create questions that require a brief (2-4 sentence) explanation, definition, or analysis.
    *   **Evidence-Based:** Create at least one question that requires students to cite evidence from a hypothetical reading passage or data table (based on the content in the lesson plan).
    *   **Math Specifics:** If the subject is Math, you MUST use LaTeX for all mathematical expressions by wrapping them in double dollar signs (e.g., $$x^2 + 2x - 1 = 0$$). This applies to all numbers, variables, and equations.
    *   **ELA Specifics:** If the subject is ELA, focus on literary analysis, rhetorical devices, or author's purpose.
    *   **Social Studies Specifics:** If the subject is Social Studies, focus on cause-and-effect, comparison, or analysis of historical context.
5.  **Provide a Detailed Answer Key:** In the separate 'answerKey' array, provide a correct answer and a brief (1-2 sentence) explanation of why it is correct for each question. For multiple-choice questions, the answer should be the full text of the correct option. Use LaTeX for math in the answer key as well.
`,
});

const practiceQuestionsGeneratorFlow = ai.defineFlow(
  {
    name: 'practiceQuestionsGeneratorFlow',
    inputSchema: GeneratePracticeQuestionsInputSchema,
    outputSchema: GeneratePracticeQuestionsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to generate practice questions. Please try again.');
    }
    return output;
  }
);

export async function generatePracticeQuestions(
  input: GeneratePracticeQuestionsInput
): Promise<GeneratePracticeQuestionsOutput> {
  return await practiceQuestionsGeneratorFlow(input);
}
