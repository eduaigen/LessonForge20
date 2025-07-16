
'use server';
/**
 * @fileOverview An AI flow for generating an enhanced version of an ELA test.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { GenerateELATestOutputSchema } from '../schemas/ela-test-schemas';
import { EnhancedELATestInputSchema } from '../schemas/ela-enhanced-test-schemas';

const prompt = ai.definePrompt({
  name: 'generateEnhancedELATestPrompt',
  input: { schema: z.object({ originalTest: z.string() }) },
  output: { schema: GenerateELATestOutputSchema },
  prompt: `You are an expert educator specializing in creating challenging assessments for advanced and honors-level high school ELA students.

Your task is to revise the provided Regents-style ELA test to increase its rigor and complexity.

**Original Test:**
\`\`\`json
{{{originalTest}}}
\`\`\`

**Instructions for Enhancement:**
1.  **Increase Question Complexity:**
    *   **Part 1 (Multiple Choice):** Rewrite five of the multiple-choice questions to require a higher level of synthesis or nuanced interpretation. Introduce more plausible distractors that test for subtle misunderstandings.
    *   **Part 2 (Argument Essay):** Make the essay prompt more complex by asking for a nuanced position that evaluates the validity of multiple perspectives presented in the sources.
    *   **Part 3 (Text Analysis):** Instead of asking for one writing strategy, require students to analyze how two different strategies interact to develop the central idea.
2.  **Enhance Sample Responses:** The sample responses for Part 2 and Part 3 must be rewritten to reflect the increased complexity of the new prompts, demonstrating sophisticated analysis, synthesis, and integration of textual evidence.
3.  **Preserve Structure:** The output JSON must have the exact same structure as the original test. Do not add or remove any fields. Update the title to indicate it is an "Enhanced Version."

Generate the complete, enhanced ELA test based on these instructions.`,
});

const generateEnhancedELATestFlow = ai.defineFlow(
  {
    name: 'generateEnhancedELATestFlow',
    inputSchema: EnhancedELATestInputSchema,
    outputSchema: GenerateELATestOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({
      originalTest: JSON.stringify(input.originalTest),
    });
    if (!output) {
      throw new Error('The AI failed to generate the enhanced ELA test. Please try again.');
    }
    return output;
  }
);

export async function generateEnhancedELATest(input: z.infer<typeof EnhancedELATestInputSchema>): Promise<GenerateELATestOutput> {
  return await generateEnhancedELATestFlow(input);
}
