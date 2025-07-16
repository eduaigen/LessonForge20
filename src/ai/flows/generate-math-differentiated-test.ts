
'use server';
/**
 * @fileOverview An AI flow for generating a differentiated version of a math test.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { GenerateMathTestOutputSchema } from '../schemas/math-test-schemas';
import { DifferentiatedMathTestInputSchema } from '../schemas/math-test-modification-schemas';

const prompt = ai.definePrompt({
  name: 'generateDifferentiatedMathTestPrompt',
  input: { schema: z.object({ originalTest: z.string() }) },
  output: { schema: GenerateMathTestOutputSchema },
  prompt: `You are an expert educator specializing in differentiation for high school math students, particularly for English Language Learners and students with diverse learning needs.

Your task is to revise the provided Regents-style math test to make it more accessible using research-based strategies. All mathematical expressions MUST be wrapped in LaTeX.

**Original Test:**
\`\`\`json
{{{originalTest}}}
\`\`\`

**Instructions for Differentiation:**
1.  **Simplify Language:** Review all questions and prompts. Rewrite complex sentences into simpler ones. Define key Tier 2 and Tier 3 vocabulary in parentheses directly within the text. Do not simplify the LaTeX mathematical expressions themselves.
2.  **Scaffold Questions:**
    *   **Multiple Choice:** For three of the more challenging multiple-choice questions, add a "Hint" field explaining the first step or a key concept needed to solve the problem.
    *   **Constructed Response:** For one question in each of Part II, Part III, and Part IV, break down the main question into 2-3 scaffolded sub-questions (e.g., "a) Define the variables," "b) Write the equation," "c) Solve for x").
3.  **Maintain Rigor:** The goal is to lower the language barrier, not the mathematical rigor. The core concepts and required skills should remain the same.
4.  **Preserve Structure:** The output JSON must have the exact same structure as the original test. Do not add or remove any fields except for the "Hint" field in the multiple-choice questions. Update the title to indicate it is a "Differentiated Version."

Generate the complete, differentiated test based on these instructions.`,
});

const generateDifferentiatedMathTestFlow = ai.defineFlow(
  {
    name: 'generateDifferentiatedMathTestFlow',
    inputSchema: DifferentiatedMathTestInputSchema,
    outputSchema: GenerateMathTestOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({
      originalTest: JSON.stringify(input.originalTest),
    });
    if (!output) {
      throw new Error('The AI failed to generate the differentiated test. Please try again.');
    }
    return output;
  }
);

export async function generateDifferentiatedMathTest(input: z.infer<typeof DifferentiatedMathTestInputSchema>): Promise<GenerateMathTestOutput> {
  return await generateDifferentiatedMathTestFlow(input);
}
