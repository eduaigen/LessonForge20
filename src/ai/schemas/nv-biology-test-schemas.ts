
import { z } from 'zod';
import { dataTableSchema } from './nv-biology-lesson-schemas';
import { type LanguageOption } from '@/components/common/LanguageSelectionDialog';

export const GenerateNVBiologyTestInputSchema = z.object({
  units: z.array(z.string()).describe('An array of curriculum units to base the test on.'),
  dokLevel: z.number().min(1).max(4).describe('The desired Depth of Knowledge level for the questions.'),
  clusterCount: z.number().min(1).max(5).describe('The number of question clusters to generate.'),
  language: z.custom<LanguageOption>(),
});

const multipleChoiceQuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()).length(4),
  answer: z.string(),
});

const shortAnswerQuestionSchema = z.object({
  question: z.string(),
});

const cerQuestionSchema = z.object({
  question: z.string().describe("A Claim-Evidence-Reasoning prompt."),
});

const answerKeySchema = z.object({
  multipleChoice: z.array(z.object({
    question: z.string(),
    answer: z.string(),
    explanation: z.string().optional().describe("Explanation for why incorrect answers are wrong. Only for enhanced tests."),
  })),
  shortAnswer: z.array(z.object({
    question: z.string(),
    sampleAnswer: z.string(),
  })),
  cer: z.object({
    question: z.string(),
    sampleClaim: z.string(),
    sampleEvidence: z.array(z.string()),
    sampleReasoning: z.string(),
  }),
});

const questionClusterSchema = z.object({
  phenomenon: z.string().describe("A 300-500 word passage describing a real-world phenomenon."),
  dataTable: dataTableSchema.optional().describe("An optional data table to be used as stimulus material for the questions."),
  multipleChoiceQuestions: z.array(multipleChoiceQuestionSchema).length(3),
  shortAnswerQuestions: z.array(shortAnswerQuestionSchema).length(2),
  cerQuestion: cerQuestionSchema,
  answerKey: answerKeySchema,
});

export const GenerateNVBiologyTestOutputSchema = z.object({
  testTitle: z.string(),
  instructions: z.string().describe("Student-facing instructions for the test."),
  clusters: z.array(questionClusterSchema),
});

export type GenerateNVBiologyTestInput = z.infer<typeof GenerateNVBiologyTestInputSchema>;
export type GenerateNVBiologyTestOutput = z.infer<typeof GenerateNVBiologyTestOutputSchema>;
