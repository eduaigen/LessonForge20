
'use server';
/**
 * @fileOverview An AI flow for generating an enhanced version of a social studies test for advanced learners.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { GenerateSocialStudiesTestOutputSchema } from '../schemas/social-studies-test-schemas';

const EnhancedSocialStudiesTestInputSchema = z.object({
  originalTest: GenerateSocialStudiesTestOutputSchema.describe("The original social studies test object to be enhanced."),
});
export type EnhancedSocialStudiesTestInput = z.infer<typeof EnhancedSocialStudiesTestInputSchema>;

const prompt = ai.definePrompt({
  name: 'generateEnhancedSocialStudiesTestPrompt',
  input: { schema: z.object({ originalTest: z.string() }) },
  output: { schema: GenerateSocialStudiesTestOutputSchema },
  prompt: `You are an expert educator specializing in creating challenging assessments for advanced and honors-level high school social studies students.

Your task is to revise the provided test to increase its rigor and complexity.

**Original Test:**
\`\`\`json
{{{originalTest}}}
\`\`\`

**Instructions for Enhancement:**
1.  **Increase Stimulus Complexity:** Revise some of the text-based documents (in all parts) to include more advanced vocabulary and more complex sentence structures, reflecting college-level historical analysis.
2.  **Enhance Questions:**
    *   **Multiple Choice:** Rewrite five of the multiple-choice questions to require a higher level of synthesis or analysis (e.g., comparing perspectives, evaluating long-term consequences). Introduce more plausible distractors that test for common historical misconceptions.
    *   **CRQ:** Elevate one question in each CRQ set to require a more nuanced comparison, evaluation of historiography, or connection to a broader historical theme not explicitly stated in the documents.
    *   **DBQ:** Expand the DBQ essay task to require a more complex argument, perhaps asking students to evaluate the relative importance of different factors or to argue for a specific historical interpretation against another.
3.  **Enhance Sample Essay:** The DBQ sample essay must be rewritten to reflect the increased complexity of the new prompt, demonstrating sophisticated analysis and integration of outside information.
4.  **Preserve Structure:** The output JSON must have the exact same structure as the original test. Do not add or remove any fields. Update the title to indicate it is an "Enhanced Version."

Generate the complete, enhanced test based on these instructions.`,
});

const generateEnhancedSocialStudiesTestFlow = ai.defineFlow(
  {
    name: 'generateEnhancedSocialStudiesTestFlow',
    inputSchema: EnhancedSocialStudiesTestInputSchema,
    outputSchema: GenerateSocialStudiesTestOutputSchema,
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

export async function generateEnhancedSocialStudiesTest(input: EnhancedSocialStudiesTestInput): Promise<GenerateSocialStudiesTestOutput> {
  return await generateEnhancedSocialStudiesTestFlow(input);
}
