
'use server';
/**
 * @fileOverview An AI flow for generating a differentiated version of a science test.
 */
import { ai } from '@/ai/genkit';
import { jsonStringify } from 'genkit/tools';
import {
  DifferentiatedTestInputSchema,
  DifferentiatedTestOutputSchema,
  type DifferentiatedTestInput,
  type DifferentiatedTestOutput,
} from '../schemas/differentiated-test-schemas';


const prompt = ai.definePrompt({
  name: 'generateDifferentiatedTestPrompt',
  input: { schema: DifferentiatedTestInputSchema },
  output: { schema: DifferentiatedTestOutputSchema },
  prompt: `You are an expert educator specializing in differentiation for high school science students, particularly for English Language Learners and students with diverse learning needs.

Your task is to revise the provided science test to make it more accessible.

**Original Test:**
\`\`\`json
{{{jsonStringify originalTest}}}
\`\`\`

**Instructions for Differentiation:**
1.  **Simplify Language:** Review all phenomenon passages and questions. Rewrite complex sentences into simpler ones. Define key Tier 2 and Tier 3 vocabulary in parentheses directly within the text.
2.  **Scaffold Questions:**
    *   **Multiple Choice:** Add a hint for one of the more challenging multiple-choice questions in each cluster.
    *   **Short Response:** For one short-response question in each cluster, provide sentence starters to help students structure their answers.
    *   **CER Question:** Break down the CER question into three distinct parts: "Part A: Make a claim.", "Part B: Provide two pieces of evidence from the text.", "Part C: Explain your reasoning."
3.  **Maintain Rigor:** The goal is to lower the language barrier, not the scientific rigor. The core concepts and required thinking skills should remain the same.
4.  **Preserve Structure:** The output JSON must have the exact same structure as the original test. Do not add or remove any fields. Update the title to indicate it is a "Differentiated Version."

Generate the complete, differentiated test based on these instructions.`,
});

const generateTestDifferentiatedFlow = ai.defineFlow(
  {
    name: 'generateTestDifferentiatedFlow',
    inputSchema: DifferentiatedTestInputSchema,
    outputSchema: DifferentiatedTestOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to generate the differentiated test. Please try again.');
    }
    return output;
  }
);

export async function generateDifferentiatedTest(input: DifferentiatedTestInput): Promise<DifferentiatedTestOutput> {
  return await generateTestDifferentiatedFlow(input);
}
