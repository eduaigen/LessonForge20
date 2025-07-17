
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

const prompt = ai.definePrompt({
  name: 'generateGeometryTestPrompt',
  input: { schema: GenerateMathTestInputSchema },
  output: { schema: GenerateMathTestOutputSchema },
  prompt: `You are an expert high school Geometry teacher and assessment writer for the NYS Regents curriculum. Your task is to generate a comprehensive, multi-part test based on specific curriculum lessons. Use LaTeX for all mathematical expressions by wrapping them in double dollar signs, like $$\\triangle ABC \\cong \\triangle DEF$$.

**CRITICAL INSTRUCTIONS:**
1.  Generate a set of clear, student-facing instructions for taking the test.
2.  Your primary task is to generate a JSON object that precisely matches the specified counts for each part of the test. Do not deviate.
3.  You MUST generate EXACTLY {{{partICount}}} multiple-choice questions for Part I. This is a non-negotiable requirement.
4.  All generated content must be complete and fully written out. No placeholders.
5.  Use LaTeX for all mathematical expressions, equations, and symbols.
6.  Do not generate questions that require a visual diagram to be understood. Instead, describe the geometric figure in words (e.g., "In right triangle ABC, the right angle is at C...").

**User Provided Context:**
- **Lessons**: {{{lessons}}}
- **Number of Part I Questions (Multiple Choice)**: {{{partICount}}}
- **Number of Part II Questions (2-Credit Open Response)**: {{{partIICount}}}
- **Number of Part III Questions (4-Credit Open Response)**: {{{partIIICount}}}

**Part I: Multiple Choice**
- Generate EXACTLY {{{partICount}}} multiple-choice questions.
- Each question must have four complete answer options.

**Part II: 2-Credit Constructed Response**
- Generate EXACTLY {{{partIICount}}} unique constructed-response questions.
- Each question must require students to show their work and should be solvable in 2-4 steps. Questions can involve calculations or simple proofs.
- Provide a detailed, step-by-step sample answer for each question.

**Part III: 4-Credit Constructed Response**
- Generate EXACTLY {{{partIIICount}}} unique, multi-step constructed-response questions.
- These questions should be more complex than Part II and may require more extensive calculations or proofs.
- Provide a detailed, step-by-step sample answer for each question.

**Part IV: 6-Credit Constructed Response**
- Generate ONE high-complexity, multi-part question that requires students to synthesize multiple concepts from the selected lessons, such as a coordinate geometry proof.
- Provide a detailed, step-by-step sample answer.

Your final output MUST be a single, complete JSON object that strictly follows the output schema.
`,
});

const generateGeometryTestFlow = ai.defineFlow(
  {
    name: 'generateGeometryTestFlow',
    inputSchema: GenerateMathTestInputSchema,
    outputSchema: GenerateMathTestOutputSchema,
    timeout: 300000, // 5 minutes
  },
  async (input) => {
    const { output } = await prompt(input);
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
