
'use server';
/**
 * @fileOverview An AI flow for generating a differentiated version of a social studies test.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { GenerateSocialStudiesTestOutputSchema } from '../schemas/social-studies-test-schemas';

const DifferentiatedSocialStudiesTestInputSchema = z.object({
  originalTest: GenerateSocialStudiesTestOutputSchema.describe("The original social studies test object to be differentiated."),
});
export type DifferentiatedSocialStudiesTestInput = z.infer<typeof DifferentiatedSocialStudiesTestInputSchema>;


const prompt = ai.definePrompt({
  name: 'generateDifferentiatedSocialStudiesTestPrompt',
  input: { schema: z.object({ originalTest: z.string() }) },
  output: { schema: GenerateSocialStudiesTestOutputSchema },
  prompt: `You are an expert educator specializing in differentiation for high school social studies students, particularly for English Language Learners and students with diverse learning needs.

Your task is to revise the provided test to make it more accessible using research-based strategies.

**Original Test:**
\`\`\`json
{{{originalTest}}}
\`\`\`

**Instructions for Differentiation:**
1.  **Simplify Language:** Review all stimulus documents, questions, and prompts. Rewrite complex sentences into simpler ones. Define key Tier 2 and Tier 3 vocabulary in parentheses directly within the text.
2.  **Scaffold Questions:**
    *   **Multiple Choice:** Add a hint for two of the more challenging multiple-choice questions in Part I.
    *   **CRQ:** For each CRQ set, provide sentence starters for one of the questions to help students structure their answers.
    *   **DBQ:** Add specific guiding questions within the main DBQ task prompt to help students structure their essay.
3.  **Maintain Rigor:** The goal is to lower the language barrier, not the historical rigor. The core concepts and required thinking skills should remain the same.
4.  **Preserve Structure:** The output JSON must have the exact same structure as the original test. Do not add or remove any fields. Update the title to indicate it is a "Differentiated Version."

Generate the complete, differentiated test based on these instructions.`,
});

const generateDifferentiatedSocialStudiesTestFlow = ai.defineFlow(
  {
    name: 'generateDifferentiatedSocialStudiesTestFlow',
    inputSchema: DifferentiatedSocialStudiesTestInputSchema,
    outputSchema: GenerateSocialStudiesTestOutputSchema,
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

export async function generateDifferentiatedSocialStudiesTest(input: DifferentiatedSocialStudiesTestInput): Promise<GenerateSocialStudiesTestOutput> {
  return await generateDifferentiatedSocialStudiesTestFlow(input);
}
