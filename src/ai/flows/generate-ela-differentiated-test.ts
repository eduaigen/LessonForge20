
'use server';
/**
 * @fileOverview An AI flow for generating a differentiated version of an ELA test.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { GenerateELATestOutputSchema } from '../schemas/ela-test-schemas';
import { DifferentiatedELATestInputSchema } from '../schemas/ela-differentiated-test-schemas';

const prompt = ai.definePrompt({
  name: 'generateDifferentiatedELATestPrompt',
  input: { schema: z.object({ originalTest: z.string() }) },
  output: { schema: GenerateELATestOutputSchema },
  prompt: `You are an expert educator specializing in differentiation for high school ELA students, particularly for English Language Learners and students with diverse learning needs.

Your task is to revise the provided Regents-style ELA test to make it more accessible using research-based strategies.

**Original Test:**
\`\`\`json
{{{originalTest}}}
\`\`\`

**Instructions for Differentiation:**
1.  **Simplify Language in Passages:** For each reading passage (Parts 1, 2, and 3), slightly simplify complex sentences and define potentially challenging Tier 2 and Tier 3 vocabulary in parentheses directly within the text. Do not change the core meaning or structure of the passages.
2.  **Scaffold Questions:**
    *   **Part 1 (Multiple Choice):** Add a "Hint" to four of the more challenging multiple-choice questions, guiding students toward the correct answer (e.g., "Hint: Look closely at paragraph 3 to find the answer.").
    *   **Part 2 (Argument Essay):** Provide 3-4 guiding questions within the main prompt to help students structure their essays (e.g., "Consider: What is the main argument of Source A? How does Source C disagree?").
    *   **Part 3 (Text Analysis):** Provide 2-3 sentence starters to help students begin their response.
3.  **Maintain Rigor:** The goal is to lower the language and processing barrier, not the analytical rigor. The core skills should remain the same.
4.  **Preserve Structure:** The output JSON must have the exact same structure as the original test. Do not add or remove any fields. Update the title to indicate it is a "Differentiated Version."

Generate the complete, differentiated ELA test based on these instructions.`,
});

const generateDifferentiatedELATestFlow = ai.defineFlow(
  {
    name: 'generateDifferentiatedELATestFlow',
    inputSchema: DifferentiatedELATestInputSchema,
    outputSchema: GenerateELATestOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({
      originalTest: JSON.stringify(input.originalTest),
    });
    if (!output) {
      throw new Error('The AI failed to generate the differentiated ELA test. Please try again.');
    }
    return output;
  }
);

export async function generateDifferentiatedELATest(input: z.infer<typeof DifferentiatedELATestInputSchema>): Promise<GenerateELATestOutput> {
  return await generateDifferentiatedELATestFlow(input);
}
