
import { z } from 'zod';
import { GenerateNVBiologyLessonOutputSchema } from './nv-biology-lesson-schemas';

export const PromptInputSchema = z.object({
    lessonPlanJson: z.string().describe('The complete lesson plan object as a JSON string.'),
});

// The input for the flow is the entire lesson plan object.
export const ReadingMaterialInputSchema = GenerateNVBiologyLessonOutputSchema;

const multipleChoiceQuestionSchema = z.object({
  question: z.string(),
  options: z.array(z.string()).length(4),
  answer: z.string(),
});

export const ReadingMaterialOutputSchema = z.object({
  title: z.string().describe('The generated title for the article, derived from the lesson plan.'),
  articleContent: z.string().describe('The full content of the generated article in Markdown format.'),
  questionCluster: z.object({
    mcq1: multipleChoiceQuestionSchema,
    mcq2: multipleChoiceQuestionSchema,
    shortResponse1: z.string().describe('A short response question requiring an explanation.'),
    shortResponse2: z.string().describe('A short response question requiring evidence from the text.'),
  }).describe('A cluster of analysis questions based on the article.')
});

export type ReadingMaterialInput = z.infer<typeof ReadingMaterialInputSchema>;
export type ReadingMaterialOutput = z.infer<typeof ReadingMaterialOutputSchema>;
