
'use server';
/**
 * @fileOverview An AI flow for generating a Regents-style test for Algebra 1.
 */
import { ai } from '@/ai/genkit';
import {
  GenerateMathTestInputSchema,
  GenerateMathTestOutputSchema,
  type GenerateMathTestInput,
  type GenerateMathTestOutput,
} from '../schemas/math-test-schemas';

async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      if (err.message?.includes("503") || err.message?.includes("model is overloaded") || err.message?.includes("An unexpected response was received from the server")) {
        if (i === retries - 1) {
          throw new Error("The AI model is temporarily overloaded. Please try again in a few moments.");
        }
        await new Promise(res => setTimeout(res, delay * (i + 1)));
      } else {
        throw err; // Non-retryable error
      }
    }
  }
  throw new Error("Operation failed after multiple retries.");
}


const prompt = ai.definePrompt({
  name: 'generateAlgebra1TestPrompt',
  input: { schema: GenerateMathTestInputSchema },
  output: { schema: GenerateMathTestOutputSchema },
  prompt: `You are an expert high school Algebra 1 teacher and assessment writer for the NYS Regents curriculum. Your task is to generate a comprehensive, multi-part test based on specific curriculum lessons. Use LaTeX for all mathematical expressions by wrapping them in double dollar signs, like $$x^2 + 2x - 1$$.

**CRITICAL INSTRUCTIONS:**
1.  Generate a set of clear, student-facing instructions for taking the test.
2.  Your primary task is to generate a JSON object that precisely matches the specified counts for each part of the test. Do not deviate.
3.  You MUST generate EXACTLY {{{partICount}}} multiple-choice questions for Part I. This is a non-negotiable requirement.
4.  For multiple-choice questions, each answer option MUST contain only the text of the answer. DO NOT include any prefix like "A.", "B.", or "1.".
5.  All generated content must be complete and fully written out. No placeholders.
6.  Use LaTeX for all mathematical expressions, equations, and variables.
7.  For ALL constructed response questions (Parts II, III, and IV), you MUST provide a detailed, step-by-step sample answer that clearly explains the solution process.

**Part I: Multiple Choice**
- Generate EXACTLY {{{partICount}}} multiple-choice questions.
- Each question must have four complete answer options.
- The answer key must contain the correct answer option text and a brief explanation.

**Part II: 2-Credit Constructed Response**
- Generate EXACTLY {{{partIICount}}} unique constructed-response questions.
- Each question must require students to show their work and should be solvable in 2-4 steps.

**Part III: 4-Credit Constructed Response**
- Generate EXACTLY {{{partIIICount}}} unique, multi-step constructed-response questions.
- These questions should be more complex than Part II and may require graphing or interpreting complex scenarios.

**Part IV: 6-Credit Constructed Response**
- Generate ONE high-complexity, multi-part question that requires students to synthesize multiple concepts from the selected lessons.
- This could be a modeling problem or a complex real-world application.

Your final output MUST be a single, complete JSON object that strictly follows the output schema.`,
});

const generateAlgebra1TestFlow = ai.defineFlow(
  {
    name: 'generateAlgebra1TestFlow',
    inputSchema: GenerateMathTestInputSchema,
    outputSchema: GenerateMathTestOutputSchema,
    timeout: 300000, // 5 minutes
  },
  async (input) => {
    const result = await withRetry(() => prompt(input));
    const { output } = result;
    if (!output) {
      throw new Error('The AI failed to generate a test. Please try again.');
    }
    return output;
  }
);

export async function generateAlgebra1Test(
  input: GenerateMathTestInput
): Promise<GenerateMathTestOutput> {
  return await generateAlgebra1TestFlow(input);
}

    