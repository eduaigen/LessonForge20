import { z } from 'zod';
import { dataTableSchema } from './nv-biology-lesson-schemas';

export const QuestionClusterInputSchema = z.object({
  lessonTopic: z.string().describe('The core topic of the lesson plan.'),
  lessonObjective: z.string().describe('The main learning objective of the lesson.'),
});

const multipleChoiceQuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()).length(4),
  answer: z.string(),
});

export const QuestionClusterOutputSchema = z.object({
  phenomenon: z.string().describe('An informative passage (150-200 words) describing a compelling, real-world phenomenon.'),
  stimulus: z.object({
    visual: dataTableSchema.describe('A data table for interpretation, formatted as a structured object.'),
  }),
  questions: z.object({
    mcq1: multipleChoiceQuestionSchema,
    mcq2: multipleChoiceQuestionSchema,
    shortResponse1: z.string().describe('A question requiring a short explanation.'),
    shortResponse2: z.string().describe('A question requiring evidence-based reasoning.'),
    modeling: z.string().describe('A prompt asking students to create or interpret a model.'),
    prediction: z.string().describe('A question asking students to make a justified prediction.'),
  }),
});

export type QuestionClusterInput = z.infer<typeof QuestionClusterInputSchema>;
export type QuestionClusterOutput = z.infer<typeof QuestionClusterOutputSchema>;
