
'use server';
/**
 * @fileOverview An AI flow for generating a test for the NGSS Chemistry curriculum.
 * This test is structured into multiple question clusters, each anchored by a phenomenon.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import {
  GenerateScienceTestInputSchema,
  GenerateScienceTestOutputSchema,
  type GenerateScienceTestInput,
  type GenerateScienceTestOutput,
} from '../schemas/ngss-chemistry-test-schemas';

const prompt = ai.definePrompt({
  name: 'generateNGSSChemistryTestPrompt',
  input: { schema: GenerateScienceTestInputSchema },
  output: { schema: GenerateScienceTestOutputSchema },
  prompt: `You are an expert high school chemistry teacher and assessment writer for the NGSS Chemistry curriculum. Your task is to generate a comprehensive test based on specific curriculum units.

**User Provided Context:**
- **Units**: {{{units}}}
- **Desired DOK Level**: {{{dokLevel}}}
- **Number of Question Clusters**: {{{clusterCount}}}

**CRITICAL INSTRUCTIONS:**
1.  Your primary task is to generate a JSON object where the 'clusters' array contains EXACTLY {{{clusterCount}}} unique cluster objects. Do not generate more or less than this number. Each cluster must be distinct and based on the provided context.
2.  Generate a set of clear, student-facing instructions for taking the test.

**For EACH of the {{{clusterCount}}} clusters, you must perform the following steps:**
1.  **Phenomenon Reading:** Write a 300-500 word, grade-appropriate passage describing a real-world chemical phenomenon or scenario directly related to one of the topics in the provided curriculum content for the given units. This passage is the primary stimulus for all questions in its cluster.
2.  **Optional Data Table:** If relevant to the phenomenon, include a data table that students must analyze. The data should be realistic and aligned with the reading.
3.  **Question Mix:** Generate a mix of Multiple Choice (3 questions), Short Response (2 questions), and one CER (Claim, Evidence, Reasoning) question.
4.  **DOK Alignment:** Ensure all questions align with the specified Depth of Knowledge (DOK) level ({{{dokLevel}}}).
5.  **Answer Key:** Create a detailed answer key for every question in the cluster.

Your final output MUST be a single JSON object that strictly follows the output schema. The root 'clusters' array must have a length of {{{clusterCount}}}.
`,
});

const generateNGSSChemistryTestFlow = ai.defineFlow(
  {
    name: 'generateNGSSChemistryTestFlow',
    inputSchema: GenerateScienceTestInputSchema,
    outputSchema: GenerateScienceTestOutputSchema,
    timeout: 240000, // 4 minutes
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to generate a test. Please try again.');
    }
    return output;
  }
);

export async function generateNGSSChemistryTest(
  input: GenerateScienceTestInput
): Promise<GenerateScienceTestOutput> {
  return await generateNGSSChemistryTestFlow(input);
}
