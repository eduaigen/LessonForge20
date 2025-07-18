
import { z } from 'zod';

export const GeneratePracticeQuestionsInputSchema = z.object({
  lessonPlanJson: z.string().describe('The complete lesson plan object as a JSON string.'),
  subject: z.string().describe('The subject area of the lesson plan (e.g., "Math", "ELA", "Social Studies").'),
});

const questionSchema = z.object({
    question: z.string().describe("The practice question text. For Math, use LaTeX for expressions."),
    questionType: z.enum(['Multiple Choice', 'Short Answer', 'Evidence-Based']),
    options: z.array(z.string()).length(4).optional().describe("An array of four answer choices for multiple-choice questions, without letters."),
});

const answerSchema = z.object({
    answer: z.string().describe("The correct answer. For multiple-choice, this is the full text of the correct option."),
    explanation: z.string().describe("A brief justification for the correct answer."),
});

export const GeneratePracticeQuestionsOutputSchema = z.object({
  title: z.string().describe("The title for the practice questions set, e.g., 'Practice Questions: [Lesson Title]'"),
  questions: z.array(questionSchema).min(4).max(7).describe('A list of 4-7 varied practice questions.'),
  answerKey: z.array(answerSchema).min(4).max(7).describe('A list of answers and explanations corresponding to the questions.'),
});

export type GeneratePracticeQuestionsInput = z.infer<typeof GeneratePracticeQuestionsInputSchema>;
export type GeneratePracticeQuestionsOutput = z.infer<typeof GeneratePracticeQuestionsOutputSchema>;
