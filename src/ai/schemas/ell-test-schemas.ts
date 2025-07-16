
import { z } from 'zod';

export const GenerateELLTestInputSchema = z.object({
  lessons: z.array(z.string()).describe('An array of curriculum lessons to base the test on.'),
});

const multipleChoiceQuestionSchema = z.object({
  question: z.string().describe("A multiple-choice question with simplified language."),
  options: z.array(z.string()).length(4).describe("Four answer choices, with clear and simple language."),
  answer: z.string().describe("The correct answer choice."),
});

const listeningPassageSchema = z.object({
  title: z.string(),
  audioScript: z.string().describe("A script for a short audio passage (approx. 150-200 words)."),
});

const readingPassageSchema = z.object({
    title: z.string(),
    content: z.string().describe("The full text of the reading passage, chunked into paragraphs with simplified language."),
    visualAidDescription: z.string().optional().describe("A text description of a helpful image or diagram related to the passage."),
});

export const GenerateELLTestOutputSchema = z.object({
  testTitle: z.string(),
  instructions: z.string().describe("Simple, student-facing instructions for the test."),
  
  part1: z.object({
    title: z.string().default("Part 1: Listening Comprehension"),
    passage: listeningPassageSchema,
    questions: z.array(multipleChoiceQuestionSchema).length(5),
  }),

  part2: z.object({
    title: z.string().default("Part 2: Reading Comprehension"),
    passage: readingPassageSchema,
    questions: z.array(multipleChoiceQuestionSchema).length(5),
    vocabularyQuestions: z.array(z.object({
        question: z.string().describe("A vocabulary question with sentence completion or matching."),
        options: z.array(z.string()).length(4),
        answer: z.string(),
    })).length(3),
  }),
  
  part3: z.object({
    title: z.string().default("Part 3: Writing"),
    prompt: z.string().describe("A writing prompt based on the reading passage, with clear scaffolding."),
    sentenceStarters: z.array(z.string()).optional().describe("A list of sentence starters to help students begin their response."),
    sampleResponse: z.string().describe("A high-quality sample response."),
  }),
});

export type GenerateELLTestInput = z.infer<typeof GenerateELLTestInputSchema>;
export type GenerateELLTestOutput = z.infer<typeof GenerateELLTestOutputSchema>;
