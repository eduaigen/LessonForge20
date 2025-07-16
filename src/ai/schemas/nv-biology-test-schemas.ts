
import { z } from 'zod';

export const GenerateNVBiologyTestInputSchema = z.object({
  unit: z.string().describe('The unit from the NV Biology curriculum.'),
  topic: z.string().describe('The topic within the selected unit.'),
  questionCount: z.number().min(4).max(20).describe('The total number of questions for the test.'),
});

const multipleChoiceQuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()).length(4),
  answer: z.string(),
});

const shortAnswerQuestionSchema = z.object({
  question: z.string(),
  sampleAnswer: z.string().describe('A detailed, correct sample answer for the short answer question.'),
});

export const GenerateNVBiologyTestOutputSchema = z.object({
  testTitle: z.string(),
  multipleChoiceQuestions: z.array(multipleChoiceQuestionSchema),
  shortAnswerQuestions: z.array(shortAnswerQuestionSchema),
  answerKey: z.object({
    multipleChoice: z.array(z.string()),
    shortAnswer: z.array(z.string()),
  }),
});

export type GenerateNVBiologyTestInput = z.infer<typeof GenerateNVBiologyTestInputSchema>;
export type GenerateNVBiologyTestOutput = z.infer<typeof GenerateNVBiologyTestOutputSchema>;
