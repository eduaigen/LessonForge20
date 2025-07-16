
'use server';
/**
 * @fileOverview An AI flow for generating a test for the New Visions Biology curriculum.
 * This test is structured into multiple question clusters, each anchored by a phenomenon.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import {
  GenerateNVBiologyTestInputSchema,
  GenerateNVBiologyTestOutputSchema,
  type GenerateNVBiologyTestInput,
  type GenerateNVBiologyTestOutput,
} from '../schemas/nv-biology-test-schemas';

const prompt = ai.definePrompt({
  name: 'generateNVBiologyTestPrompt',
  input: { schema: GenerateNVBiologyTestInputSchema },
  output: { schema: GenerateNVBiologyTestOutputSchema },
  prompt: `You are an expert high school biology teacher and assessment writer for the New Visions for Public Schools Biology curriculum. Your task is to generate a comprehensive test based on specific curriculum units.

**User Provided Context:**
- **Units**: {{{units}}}
- **Desired DOK Level**: {{{dokLevel}}}
- **Number of Question Clusters**: {{{clusterCount}}}

**CRITICAL INSTRUCTIONS:**
1.  **Generate EXACTLY {{{clusterCount}}} Question Clusters:** Your final JSON output MUST have a 'clusters' array containing exactly {{{clusterCount}}} unique cluster objects. Do not generate more or less than this number.
2.  **Create a Test Title:** The title should reflect the selected units.
3.  **For Each of the {{{clusterCount}}} Clusters:**
    *   **Phenomenon Reading:** Write a 300-500 word, grade-appropriate passage describing a real-world phenomenon or scenario directly related to one of the topics in the provided curriculum content. This passage is the stimulus for the questions in the cluster.
    *   **Question Mix:** Generate a mix of Multiple Choice, Short Response, and one CER (Claim, Evidence, Reasoning) question.
    *   **DOK Alignment:** Ensure all questions align with the specified Depth of Knowledge (DOK) level ({{{dokLevel}}}).
    *   **Multiple Choice Questions:** Generate exactly 3 MCQs. Each must have 4 answer choices and a correct answer.
    *   **Short Response Questions:** Generate exactly 2 short response questions that require a brief explanation.
    *   **CER Question:** Generate one Claim-Evidence-Reasoning question that requires students to make a claim, support it with evidence from the phenomenon passage, and explain their reasoning.
4.  **Create an Answer Key:** For each cluster, provide a detailed answer key.
    *   For MCQs, list the correct answer.
    *   For Short Response questions, provide a high-quality sample answer.
    *   For the CER question, provide a sample claim, a list of potential evidence from the passage, and an exemplar reasoning statement.
5.  **Curriculum Adherence:** All content, especially the phenomenon passages and questions, MUST be directly derived from and aligned with the provided curriculum content for the selected units. Do not introduce concepts not covered in the curriculum.

Your response MUST follow the exact JSON structure defined in the output schema.
`,
});

const generateNVBiologyTestFlow = ai.defineFlow(
  {
    name: 'generateNVBiologyTestFlow',
    inputSchema: GenerateNVBiologyTestInputSchema,
    outputSchema: GenerateNVBiologyTestOutputSchema,
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

export async function generateNVBiologyTest(
  input: GenerateNVBiologyTestInput
): Promise<GenerateNVBiologyTestOutput> {
  return await generateNVBiologyTestFlow(input);
}
