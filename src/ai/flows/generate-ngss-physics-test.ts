
'use server';
/**
 * @fileOverview An AI flow for generating a test for the NGSS Physics curriculum.
 * This test is structured into multiple question clusters, each anchored by a phenomenon.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import {
  GenerateScienceTestInputSchema,
  GenerateScienceTestOutputSchema,
  type GenerateScienceTestInput,
  type GenerateScienceTestOutput,
} from '../schemas/ngss-physics-test-schemas';

async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      if (err.message?.includes("503") || err.message?.includes("model is overloaded") || err.message?.includes("An unexpected response was received from the server")) {
        if (i === retries - 1) {
          throw new Error("The AI model is temporarily overloaded. Please try again in a few moments.");
        }
        await new Promise(res => setTimeout(res, delay * (i + 1)));
      } else {
        throw err; // Non-retryable error
      }
    }
  }
  throw new Error("Operation failed after multiple retries.");
}


const prompt = ai.definePrompt({
  name: 'generateNGSSPhysicsTestPrompt',
  input: { schema: GenerateScienceTestInputSchema },
  output: { schema: GenerateScienceTestOutputSchema },
  prompt: `You are an expert high school physics teacher and assessment writer for the NGSS Physics curriculum. Your task is to generate a comprehensive test based on specific curriculum units.

**CRITICAL INSTRUCTIONS:**
1.  Your primary task is to generate a JSON object where the 'clusters' array contains EXACTLY {{{clusterCount}}} unique cluster objects. Do not generate more or less than this number.
2.  For EACH cluster, you MUST generate a mix of questions with the following precise counts:
    *   **Multiple Choice:** Exactly 3 questions. Each must have four complete answer options.
    *   **Short Response:** Exactly 2 questions.
    *   **CER (Claim, Evidence, Reasoning):** Exactly 1 question.
3.  You MUST ensure all questions strictly align with the specified Depth of Knowledge (DOK) level ({{{dokLevel}}}). This is a critical requirement.
4.  Generate a set of clear, student-facing instructions for taking the test.
5.  All generated content must be complete and fully written out. No placeholders.

**User Provided Context:**
- **Units**: {{{units}}}
- **Desired DOK Level**: {{{dokLevel}}}
- **Number of Question Clusters**: {{{clusterCount}}}

**For EACH of the {{{clusterCount}}} clusters, you must perform the following steps:**
1.  **Phenomenon Reading:** Write a 300-500 word, grade-appropriate passage describing a real-world physics phenomenon or scenario directly related to one of the topics in the provided curriculum content for the given units. This passage is the primary stimulus for all questions in its cluster.
2.  **Optional Data Table:** If relevant to the phenomenon, include a data table that students must analyze. The data should be realistic and aligned with the reading.
3.  **Answer Key:** Create a detailed answer key for every question in the cluster.

Your final output MUST be a single, complete JSON object that strictly follows the output schema.
`,
});

const generateNGSSPhysicsTestFlow = ai.defineFlow(
  {
    name: 'generateNGSSPhysicsTestFlow',
    inputSchema: GenerateScienceTestInputSchema,
    outputSchema: GenerateScienceTestOutputSchema,
    timeout: 300000, // 5 minutes
  },
  async (input) => {
    const result = await withRetry(() => prompt(input));
    const { output } = result;
    if (!output) {
      throw new Error('The AI failed to generate a test. Please try again.');
    }
    return output;
  }
);

export async function generateNGSSPhysicsTest(
  input: GenerateScienceTestInput
): Promise<GenerateScienceTestOutput> {
  return await generateNGSSPhysicsTestFlow(input);
}
