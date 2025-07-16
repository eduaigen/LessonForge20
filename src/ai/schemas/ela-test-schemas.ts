
import { z } from 'zod';

export const GenerateELATestInputSchema = z.object({
  lessons: z.array(z.string()).describe('An array of curriculum lessons to base the test on.'),
  passageCount: z.number().min(1).max(4).describe('The number of reading comprehension passages.'),
  sourceCount: z.number().min(2).max(5).describe('The number of sources for the argument essay.'),
});

const multipleChoiceQuestionSchema = z.object({
  question: z.string().describe("A multiple-choice question based on the passage."),
  options: z.array(z.string()).length(4).describe("Four answer choices."),
  answer: z.string().describe("The correct answer choice."),
});

const passageSchema = z.object({
  title: z.string(),
  type: z.enum(['Literary', 'Poem', 'Informational']),
  content: z.string().describe("The full text of the passage."),
});

const textAnalysisResponseSchema = z.object({
  passage: passageSchema,
  prompt: z.string().describe("The prompt for the text analysis response."),
  sampleResponse: z.string().describe("A high-quality sample essay response."),
});

const argumentEssaySchema = z.object({
  prompt: z.string().describe("The prompt for the source-based argument essay."),
  sources: z.array(passageSchema).describe("An array of text-based sources."),
  sampleEssay: z.string().describe("A full, high-quality sample essay that answers the prompt using the provided sources."),
});

export const GenerateELATestOutputSchema = z.object({
  testTitle: z.string(),
  instructions: z.string().describe("Student-facing instructions for the test."),
  part1: z.object({
    title: z.string().default("Part 1: Reading Comprehension"),
    passages: z.array(z.object({
        passage: passageSchema,
        questions: z.array(multipleChoiceQuestionSchema).length(8),
    })),
  }),
  part2: z.object({
    title: z.string().default("Part 2: Writing from Sources - Argument"),
    argumentEssay: argumentEssaySchema,
  }),
  part3: z.object({
    title: z.string().default("Part 3: Text Analysis Response"),
    textAnalysis: textAnalysisResponseSchema,
  }),
});

export type GenerateELATestInput = z.infer<typeof GenerateELATestInputSchema>;
export type GenerateELATestOutput = z.infer<typeof GenerateELATestOutputSchema>;
