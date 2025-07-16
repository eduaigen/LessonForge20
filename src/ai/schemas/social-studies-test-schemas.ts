
import { z } from 'zod';

export const GenerateSocialStudiesTestInputSchema = z.object({
  lessons: z.array(z.string()).describe('An array of curriculum lessons to base the test on.'),
  dokLevel: z.number().min(1).max(4).describe('The desired Depth of Knowledge level for the questions.'),
  mcqCount: z.number().min(1).max(28).describe('The number of multiple-choice questions to generate.'),
  crqCount: z.number().min(1).max(5).describe('The number of Constructed-Response Question sets to generate.'),
  dbqDocCount: z.number().min(3).max(7).describe('The number of documents for the Document-Based Question.'),
});

const multipleChoiceQuestionSchema = z.object({
  stimulus: z.string().describe("A stimulus, which can be a direct quote, a description of a chart, or a short text passage. This content must be created by the AI."),
  question: z.string(),
  options: z.array(z.string()).length(4).describe("An array of exactly four string options for the multiple-choice question."),
  answer: z.string(),
});

const constructedResponseQuestionSchema = z.object({
    question: z.string(),
    sampleAnswer: z.string().describe("A detailed, high-quality sample answer for the question."),
});

const crqSetSchema = z.object({
  documents: z.array(z.string()).describe("A list containing 1 or 2 document sources (direct quotes, descriptions of charts, or short passages)."),
  questions: z.array(constructedResponseQuestionSchema).length(3).describe("An array of 3 constructed-response questions, scaffolded in difficulty (interpretation, cause/effect, reliability/synthesis)."),
});

const dbqSchema = z.object({
  historicalContext: z.string().describe("A paragraph providing the historical context for the essay."),
  task: z.string().describe("The specific prompt or task for the Document-Based Question essay."),
  documents: z.array(z.string()).describe("A list of document sources (direct quotes, descriptions of charts, or short passages)."),
  sampleEssay: z.string().describe("A full, high-quality sample essay that answers the prompt using the provided documents and outside information."),
});

export const GenerateSocialStudiesTestOutputSchema = z.object({
  testTitle: z.string(),
  instructions: z.string().describe("Student-facing instructions for the test."),
  partI: z.object({
    title: z.string().default("Part I: Multiple Choice"),
    questions: z.array(multipleChoiceQuestionSchema),
  }),
  partII: z.object({
    title: z.string().default("Part II: Constructed-Response Questions"),
    sets: z.array(crqSetSchema),
  }),
  partIII: z.object({
    title: z.string().default("Part III: Document-Based Question (DBQ)"),
    dbq: dbqSchema,
  }),
});

export type GenerateSocialStudiesTestInput = z.infer<typeof GenerateSocialStudiesTestInputSchema>;
export type GenerateSocialStudiesTestOutput = z.infer<typeof GenerateSocialStudiesTestOutputSchema>;
