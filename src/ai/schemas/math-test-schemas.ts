
import { z } from 'zod';
import { type LanguageOption } from '@/components/common/LanguageSelectionDialog';

export const GenerateMathTestInputSchema = z.object({
  lessons: z.array(z.string()).describe('An array of curriculum lessons to base the test on.'),
  partICount: z.number().min(1).max(24).describe('The number of multiple-choice questions.'),
  partIICount: z.number().min(1).max(8).describe('The number of 2-credit constructed-response questions.'),
  partIIICount: z.number().min(1).max(4).describe('The number of 4-credit constructed-response questions.'),
  language: z.custom<LanguageOption>().describe('The language for the generated test.'),
});

const multipleChoiceQuestionSchema = z.object({
  question: z.string().describe("A multiple-choice question, potentially with LaTeX for equations."),
  options: z.array(z.string()).length(4).describe("Four answer choices."),
  answer: z.string().describe("The correct answer choice."),
});

const constructedResponseQuestionSchema = z.object({
  question: z.string().describe("A constructed-response question requiring students to show their work. It may include LaTeX."),
  sampleAnswer: z.string().describe("A detailed, step-by-step sample answer and explanation."),
});

export const GenerateMathTestOutputSchema = z.object({
  testTitle: z.string(),
  instructions: z.string().describe("Student-facing instructions for the test."),
  partI: z.object({
    title: z.string().default("Part I: Multiple Choice"),
    questions: z.array(multipleChoiceQuestionSchema),
  }),
  partII: z.object({
    title: z.string().default("Part II: 2-Credit Constructed Response"),
    questions: z.array(constructedResponseQuestionSchema),
  }),
  partIII: z.object({
    title: z.string().default("Part III: 4-Credit Constructed Response"),
    questions: z.array(constructedResponseQuestionSchema),
  }),
  partIV: z.object({
    title: z.string().default("Part IV: 6-Credit Constructed Response"),
    question: constructedResponseQuestionSchema,
  }),
});

export type GenerateMathTestInput = z.infer<typeof GenerateMathTestInputSchema>;
export type GenerateMathTestOutput = z.infer<typeof GenerateMathTestOutputSchema>;
