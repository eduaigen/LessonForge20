
'use server';
/**
 * @fileOverview An AI flow for generating a Regents-style test for Algebra 2.
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
  name: 'generateAlgebra2TestPrompt',
  input: { schema: GenerateMathTestInputSchema },
  output: { schema: GenerateMathTestOutputSchema },
  prompt: `You are an expert high school Algebra 2 teacher and assessment writer for the NYS Regents curriculum. Your task is to generate a comprehensive, multi-part test based on specific curriculum lessons. Use LaTeX for all mathematical expressions by wrapping them in double dollar signs, like $$f(x) = \log_2(x)$$.

**CRITICAL INSTRUCTIONS:**
1.  Generate a set of clear, student-facing instructions for taking the test.
2.  Your primary task is to generate a JSON object that precisely matches the specified counts for each part of the test. Do not deviate.
3.  You MUST generate EXACTLY {{{partICount}}} multiple-choice questions for Part I. This is a non-negotiable requirement.
4.  All generated content must be complete and fully written out. No placeholders.
5.  Use LaTeX for all mathematical expressions, equations, and variables.

**Part I: Multiple Choice**
- Generate EXACTLY {{{partICount}}} multiple-choice questions.
- Each question must have four complete answer options. Each option should be the text of the answer, without any prefix like "A." or "1.".

**Part II: 2-Credit Constructed Response**
- Generate EXACTLY {{{partIICount}}} unique constructed-response questions.
- Each question must require students to show their work and should be solvable in 2-4 steps.
- Provide a detailed, step-by-step sample answer for each question.

**Part III: 4-Credit Constructed Response**
- Generate EXACTLY {{{partIIICount}}} unique, multi-step constructed-response questions.
- These questions should be more complex than Part II and may require graphing or interpreting complex scenarios.
- Provide a detailed, step-by-step sample answer for each question.

**Part IV: 6-Credit Constructed Response**
- Generate ONE high-complexity, multi-part question that requires students to synthesize multiple concepts from the selected lessons.
- This could be a modeling problem or a complex real-world application.
- Provide a detailed, step-by-step sample answer.

Your final output MUST be a single, complete JSON object that strictly follows the output schema.
`,
});

const generateAlgebra2TestFlow = ai.defineFlow(
  {
    name: 'generateAlgebra2TestFlow',
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

export async function generateAlgebra2Test(
  input: GenerateMathTestInput
): Promise<GenerateMathTestOutput> {
  return await generateAlgebra2TestFlow(input);
}
