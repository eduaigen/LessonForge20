
'use server';
/**
 * @fileOverview An AI flow for generating a differentiated version of an ELL test.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { GenerateELLTestOutputSchema } from '../schemas/ell-test-schemas';
import { DifferentiatedELLTestInputSchema } from '../schemas/ell-differentiated-test-schemas';

const prompt = ai.definePrompt({
  name: 'generateDifferentiatedELLTestPrompt',
  input: { schema: z.object({ originalTest: z.string() }) },
  output: { schema: GenerateELLTestOutputSchema },
  prompt: `You are an expert educator specializing in differentiation for English Language Learners.

Your task is to revise the provided ELL test to make it even more accessible using research-based strategies.

**Original Test:**
\`\`\`json
{{{originalTest}}}
\`\`\`

**Instructions for Differentiation:**
1.  **Simplify Language Further:** Review all passages, questions, and prompts. Further simplify any complex sentences. Define key Tier 2 and Tier 3 vocabulary in parentheses directly within the text, perhaps adding a simple synonym (e.g., "The **enormous** (very big) whale...").
2.  **Add Visual Cues:** In the 'visualAidDescription' for the reading passage, add a description of a second visual aid that would help comprehension.
3.  **Enhance Scaffolds:**
    *   **Part 1 & 2 (Multiple Choice):** For two questions in each part, add a "Hint" field explaining a key concept or directing students to a specific part of the text.
    *   **Part 3 (Writing):** Add two more sentence starters to the existing list to provide more support for structuring the written response.
4.  **Maintain Rigor:** The goal is to lower the language barrier, not the cognitive rigor. The core concepts and required thinking skills should remain the same.
5.  **Preserve Structure:** The output JSON must have the exact same structure as the original test. Do not add or remove any fields. Update the title to indicate it is a "Differentiated Version."

Generate the complete, differentiated ELL test based on these instructions.`,
});

const generateDifferentiatedELLTestFlow = ai.defineFlow(
  {
    name: 'generateDifferentiatedELLTestFlow',
    inputSchema: DifferentiatedELLTestInputSchema,
    outputSchema: GenerateELLTestOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({
      originalTest: JSON.stringify(input.originalTest),
    });
    if (!output) {
      throw new Error('The AI failed to generate the differentiated ELL test. Please try again.');
    }
    return output;
  }
);

export async function generateDifferentiatedELLTest(input: z.infer<typeof DifferentiatedELLTestInputSchema>): Promise<GenerateELLTestOutput> {
  return await generateDifferentiatedELLTestFlow(input);
}
