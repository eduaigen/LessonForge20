
import { z } from 'zod';
import { dataTableSchema } from './nv-biology-lesson-schemas';

export const GenerateScienceTestInputSchema = z.object({
  subject: z.string().describe("The science subject for the test (e.g., 'NV Biology', 'NGSS Chemistry')."),
  units: z.array(z.string()).min(1).describe('A list of one or more units to source content from.'),
  clusterCount: z.number().min(1).max(10).describe('The number of question clusters to generate.'),
  dokLevel: z.number().min(1).max(3).describe('The desired Depth of Knowledge level for the questions (1, 2, or 3).'),
  curriculumContent: z.string().describe('A JSON string of the curriculum content for the selected units, which the AI will use as the source of truth.'),
});

const multipleChoiceQuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()).length(4),
  answer: z.string(),
});

const shortAnswerQuestionSchema = z.object({
  question: z.string(),
  sampleAnswer: z.string(),
});

const questionSchema = z.union([multipleChoiceQuestionSchema, shortAnswerQuestionSchema]);

const questionClusterSchema = z.object({
  clusterTitle: z.string().describe('A title for the question cluster, usually based on the stimulus.'),
  stimulus: z.union([
    z.string().describe('A text passage or scenario.'),
    dataTableSchema.describe('A data table for interpretation.'),
  ]),
  questions: z.array(questionSchema).describe('A list of questions (MCQ or Short Answer) related to the stimulus.'),
});

export const GenerateScienceTestOutputSchema = z.object({
  testTitle: z.string().describe('The overall title for the generated test.'),
  clusters: z.array(questionClusterSchema).describe('An array of question clusters.'),
  answerKey: z.array(z.object({
    clusterTitle: z.string(),
    answers: z.array(z.object({
        question: z.string(),
        answer: z.string()
    }))
  })).describe("A comprehensive answer key for all questions.")
});

export type GenerateScienceTestInput = z.infer<typeof GenerateScienceTestInputSchema>;
export type GenerateScienceTestOutput = z.infer<typeof GenerateScienceTestOutputSchema>;
