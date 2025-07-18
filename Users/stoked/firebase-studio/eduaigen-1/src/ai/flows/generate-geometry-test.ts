
'use server';
/**
 * @fileOverview An AI flow for generating a Regents-style test for Geometry.
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
  name: 'generateGeometryTestPrompt',
  input: { schema: GenerateMathTestInputSchema },
  output: { schema: GenerateMathTestOutputSchema },
  prompt: `You are an expert high school Geometry teacher and assessment writer for the NYS Regents curriculum. Your task is to generate a comprehensive, multi-part test based on specific curriculum lessons.

**CRITICAL INSTRUCTIONS:**
1.  **Use LaTeX for math expressions ONLY**: Every mathematical expression, variable, symbol, and equation MUST be wrapped in double dollar signs, like $$\\triangle ABC \\cong \\triangle DEF$$.
2.  **CRITICAL: Do NOT wrap non-mathematical text or currency values (like prices) in LaTeX.** This is a common error to avoid.
3.  **Generate a set of clear, student-facing instructions for taking the test.**
4.  **Your primary task is to generate a JSON object that precisely matches the specified counts for each part of the test. Do not deviate.**
5.  **You MUST generate EXACTLY {{{partICount}}} multiple-choice questions for Part I.** This is a non-negotiable requirement.
6.  **For multiple-choice questions, each answer option MUST contain only the text of the answer.** DO NOT include any prefix like "A.", "B.", or "1.".
7.  **All generated content must be complete and fully written out.** No placeholders.
8.  **Do not generate questions that require a visual diagram to be understood.** Instead, describe the geometric figure in words (e.g., "In right triangle ABC, the right angle is at C...").
9.  **You MUST generate a complete answer key**, including step-by-step solutions for all constructed-response questions, and explanations for multiple choice questions.

**User Provided Context:**
- **Lessons**: {{{lessons}}}
- **Number of Part I Questions (Multiple Choice)**: {{{partICount}}}
- **Number of Part II Questions (2-Credit Open Response)**: {{{partIICount}}}
- **Number of Part III Questions (4-Credit Open Response)**: {{{partIIICount}}}

**Part I: Multiple Choice**
- Generate EXACTLY {{{partICount}}} multiple-choice questions.
- Each question must have four complete answer options.
- The 'answer' field for each question must contain the full text of the correct option.
- The 'explanation' field must contain a brief justification for the correct answer.

**Part II: 2-Credit Constructed Response**
- Generate EXACTLY {{{partIICount}}} unique constructed-response questions.
- Each question must require students to show their work and should be solvable in 2-4 steps. Questions can involve calculations or simple proofs.
- The 'sampleAnswer' field must contain a detailed, step-by-step solution.

**Part III: 4-Credit Constructed Response**
- Generate EXACTLY {{{partIIICount}}} unique, multi-step constructed-response questions.
- These questions should be more complex than Part II and may require more extensive calculations or proofs.
- The 'sampleAnswer' field must contain a detailed, step-by-step solution.

**Part IV: 6-Credit Constructed Response**
- Generate ONE high-complexity, multi-part question that requires students to synthesize multiple concepts from the selected lessons, such as a coordinate geometry proof.
- The 'sampleAnswer' field must contain a detailed, step-by-step solution.

Your final output MUST be a single, complete JSON object that strictly follows the output schema.`,
});

const generateGeometryTestFlow = ai.defineFlow(
  {
    name: 'generateGeometryTestFlow',
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

export async function generateGeometryTest(
  input: GenerateMathTestInput
): Promise<GenerateMathTestOutput> {
  return await generateGeometryTestFlow(input);
}
