
'use server';
/**
 * @fileOverview An AI flow for generating an enhanced version of an ELL test.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
// Assuming GenerateELLTestOutputSchema is no longer needed or defined elsewhere
import { EnhancedELLTestInputSchema } from '../schemas/ell-enhanced-test-schemas';

const prompt = ai.definePrompt({
  name: 'generateEnhancedELLTestPrompt',
  input: { schema: z.object({ originalTest: z.string() }) },
  output: { schema: GenerateELLTestOutputSchema },
  prompt: `You are an expert educator specializing in creating assessments for advanced English Language Learners.

Your task is to revise the provided ELL test to increase its rigor and complexity, while still being appropriate for language learners.

**Original Test:**
\`\`\`json
{{{originalTest}}}
\`\`\`

**Instructions for Enhancement:**
1.  **Increase Passage Complexity:** Revise the reading and listening passages to include more complex sentence structures and more advanced Tier 2 vocabulary, suitable for a higher language proficiency level.
2.  **Enhance Questions:**
    *   **Part 1 & 2 (Multiple Choice):** Rewrite three questions in each part to require more inference and analysis, rather than direct comprehension. Introduce more plausible distractors.
    *   **Part 3 (Writing):** Remove the sentence starters and make the writing prompt more open-ended, requiring students to develop their own structure and argument more independently.
3.  **Enhance Sample Response:** The sample response for Part 3 must be rewritten to reflect the increased complexity of the new prompt, demonstrating more sophisticated language and analysis.
4.  **Preserve Structure:** The output JSON must have the exact same structure as the original test. Update the title to indicate it is an "Enhanced Version."

Generate the complete, enhanced ELL test based on these instructions.`,
});

const generateEnhancedELLTestFlow = ai.defineFlow(
  {
    name: 'generateEnhancedELLTestFlow',
    inputSchema: EnhancedELLTestInputSchema,
    outputSchema: GenerateELLTestOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({
      originalTest: JSON.stringify(input.originalTest),
    });
    if (!output) {
      throw new Error('The AI failed to generate the enhanced ELL test. Please try again.');
    }
    return output;
  }
);

export async function generateEnhancedELLTest(input: z.infer<typeof EnhancedELLTestInputSchema>): Promise<GenerateELLTestOutput> {
  return await generateEnhancedELLTestFlow(input);
}
