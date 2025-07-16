
'use server';
/**
 * @fileOverview An AI flow for generating an enhanced version of a science test for advanced learners.
 */
import { ai } from '@/ai/genkit';
import {
  EnhancedTestInputSchema,
  EnhancedTestOutputSchema,
  type EnhancedTestInput,
  type EnhancedTestOutput,
} from '../schemas/enhanced-test-schemas';

const prompt = ai.definePrompt({
  name: 'generateEnhancedTestPrompt',
  input: { schema: z.object({ originalTest: z.string() }) },
  output: { schema: EnhancedTestOutputSchema },
  prompt: `You are an expert educator specializing in creating challenging assessments for advanced and honors-level high school science students.

Your task is to revise the provided science test to increase its rigor and complexity.

**Original Test:**
\`\`\`json
{{{originalTest}}}
\`\`\`

**Instructions for Enhancement:**
1.  **Increase Passage Complexity:** Revise the phenomenon passages to include more advanced vocabulary and more complex sentence structures.
2.  **Enhance Questions:**
    *   **Multiple Choice:** Rewrite two of the multiple-choice questions in each cluster to require a higher level of synthesis or analysis. Introduce plausible distractors that test for common misconceptions.
    *   **Short Response:** Elevate one short response question in each cluster to require a comparison, evaluation, or connection to a broader scientific principle.
    *   **CER Question:** Expand the CER question to require an additional piece of evidence or a connection to a broader scientific principle not explicitly stated in the text.
3.  **Enhance Answer Key:** For the multiple-choice questions, add a brief (1-sentence) explanation for why each incorrect answer (distractor) is wrong. This is a critical step.
4.  **Preserve Structure:** The output JSON must have the exact same structure as the original test. Do not add or remove any fields. Update the title to indicate it is an "Enhanced Version."

Generate the complete, enhanced test based on these instructions.`,
});

const generateTestEnhancedFlow = ai.defineFlow(
  {
    name: 'generateTestEnhancedFlow',
    inputSchema: EnhancedTestInputSchema,
    outputSchema: EnhancedTestOutputSchema,
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

export async function generateEnhancedTest(input: EnhancedTestInput): Promise<EnhancedTestOutput> {
  return await generateTestEnhancedFlow(input);
}
