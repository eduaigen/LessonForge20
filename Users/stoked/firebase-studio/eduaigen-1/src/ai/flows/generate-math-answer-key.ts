
'use server';
/**
 * @fileOverview An AI flow for generating an answer key for a math test.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { GenerateMathTestOutputSchema } from '../schemas/math-test-schemas';
import { jsonSchema, zodToJsonSchema } from 'zod-to-json-schema';

// The input is the test itself, without the answers.
const AnswerKeyInputSchema = GenerateMathTestOutputSchema.omit({
  partI: true,
  partII: true,
  partIII: true,
  partIV: true,
}).extend({
  partI: z.object({
    title: z.string(),
    questions: z.array(z.object({
      question: z.string(),
      options: z.array(z.string()).length(4),
    })),
  }),
  partII: z.object({
    title: z.string(),
    questions: z.array(z.object({ question: z.string() })),
  }),
  partIII: z.object({
    title: z.string(),
    questions: z.array(z.object({ question: z.string() })),
  }),
  partIV: z.object({
    title: z.string(),
    question: z.object({ question: z.string() }),
  }),
});

// The output will be just the answers for the test questions.
const AnswerKeyOutputSchema = z.object({
    partI: z.array(z.object({
        answer: z.string().describe("The full text of the correct answer option."),
        explanation: z.string().optional().describe("A brief explanation for why the answer is correct."),
    })),
    partII: z.array(z.object({
        sampleAnswer: z.string().describe("A detailed, step-by-step sample answer showing the work."),
    })),
    partIII: z.array(z.object({
        sampleAnswer: z.string().describe("A detailed, step-by-step sample answer showing the work."),
    })),
    partIV: z.object({
        sampleAnswer: z.string().describe("A detailed, step-by-step sample answer showing the work."),
    }),
});

export async function generateMathAnswerKey(
  input: z.infer<typeof AnswerKeyInputSchema>
): Promise<z.infer<typeof AnswerKeyOutputSchema>> {
  return generateMathAnswerKeyFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMathAnswerKeyPrompt',
  input: { schema: AnswerKeyInputSchema, jsonSchema: zodToJsonSchema(AnswerKeyInputSchema) },
  output: { schema: AnswerKeyOutputSchema },
  prompt: `You are an expert math teacher. You have been given a math test and your task is to generate a complete answer key for it.

**CRITICAL INSTRUCTIONS:**
1.  **Use LaTeX for ALL math**: Every mathematical expression, variable, number, and equation MUST be wrapped in double dollar signs, like $$x^2 + 2x - 1$$.
2.  **Provide Detailed Explanations**: For ALL constructed response questions (Parts II, III, and IV), you MUST provide a detailed, step-by-step sample answer that clearly explains the solution process.
3.  **Correct Answer Only**: For multiple-choice questions, provide only the full text of the correct answer choice for the 'answer' field. Do not include the letter.
4.  **Answer Key Only**: Your output must only contain the answers and explanations as specified in the output schema. Do not regenerate the questions.

**Test Content to Solve:**
\`\`\`json
{{{json input}}}
\`\`\`

Based on the test content provided above, generate a complete answer key that strictly follows the output schema.
`,
});

const generateMathAnswerKeyFlow = ai.defineFlow(
  {
    name: 'generateMathAnswerKeyFlow',
    inputSchema: AnswerKeyInputSchema,
    outputSchema: AnswerKeyOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to generate an answer key. Please try again.');
    }
    return output;
  }
);
