
'use server';
/**
 * @fileOverview An AI flow for generating an enhanced version of a math test for advanced learners.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { GenerateMathTestOutputSchema } from '../schemas/math-test-schemas';
import { EnhancedMathTestInputSchema } from '../schemas/math-test-modification-schemas';

const prompt = ai.definePrompt({
  name: 'generateEnhancedMathTestPrompt',
  input: { schema: z.object({ originalTest: z.string() }) },
  output: { schema: GenerateMathTestOutputSchema },
  prompt: `You are an expert educator specializing in creating challenging assessments for advanced and honors-level high school math students.

Your task is to revise the provided Regents-style math test to increase its rigor and complexity. All mathematical expressions MUST be wrapped in LaTeX.

**Original Test:**
\`\`\`json
{{{originalTest}}}
\`\`\`

**Instructions for Enhancement:**
1.  **Increase Question Complexity:**
    *   **Multiple Choice:** Rewrite five of the multiple-choice questions to require a higher level of synthesis or a less direct solution path. Introduce more plausible distractors that test for common misconceptions or algebraic errors.
    *   **Constructed Response:** Elevate one question in each of Part II and Part III to require multi-step reasoning, synthesis of multiple concepts, or a more abstract application of the underlying principles.
    *   **Part IV:** Rewrite the Part IV question to be a more complex modeling or proof-based problem, potentially requiring students to justify their approach in addition to solving it.
2.  **Enhance Sample Answers:** The sample answers for all rewritten questions must be updated to reflect the increased complexity, showing all necessary steps and justifications.
3.  **Preserve Structure:** The output JSON must have the exact same structure as the original test. Do not add or remove any fields. Update the title to indicate it is an "Enhanced Version."

Generate the complete, enhanced test based on these instructions.`,
});

const generateEnhancedMathTestFlow = ai.defineFlow(
  {
    name: 'generateEnhancedMathTestFlow',
    inputSchema: EnhancedMathTestInputSchema,
    outputSchema: GenerateMathTestOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({
      originalTest: JSON.stringify(input.originalTest),
    });
    if (!output) {
      throw new Error('The AI failed to generate the enhanced test. Please try again.');
    }
    return output;
  }
);

export async function generateEnhancedMathTest(input: z.infer<typeof EnhancedMathTestInputSchema>): Promise<GenerateMathTestOutput> {
  return await generateEnhancedMathTestFlow(input);
}
