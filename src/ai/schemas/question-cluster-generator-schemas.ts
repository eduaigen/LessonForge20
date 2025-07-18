
import { z } from 'zod';
import { dataTableSchema } from './nv-biology-lesson-schemas';

export const GenerateQuestionClusterInputSchema = z.object({
  lessonTopics: z.string().describe('A string of comma-separated lesson topics.'),
  dokLevel: z.number().describe('The desired Depth of Knowledge level for the questions.'),
});
export type GenerateQuestionClusterInput = z.infer<typeof GenerateQuestionClusterInputSchema>;

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
    explanation: z.string().optional(),
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
  modeling: z.object({
    question: z.string(),
    sampleAnswer: z.string().describe("A text description of an ideal student response."),
  }),
});

export const QuestionClusterSchema = z.object({
  phenomenon: z.string().describe("A 150-200 word passage describing a real-world phenomenon."),
  dataTable: dataTableSchema.optional().describe("An optional data table for interpretation."),
  multipleChoiceQuestions: z.array(multipleChoiceQuestionSchema).length(2),
  shortAnswerQuestions: z.array(shortAnswerQuestionSchema).length(2),
  cerQuestion: cerQuestionSchema,
  modelingQuestion: shortAnswerQuestionSchema.describe("A prompt asking students to create or interpret a model."),
  answerKey: answerKeySchema,
});
export type QuestionClusterOutput = z.infer<typeof QuestionClusterSchema>;
