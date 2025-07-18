
'use server';
/**
 * @fileOverview An AI flow for generating a test for the NGSS Physics curriculum.
 * This test is structured into multiple question clusters, each anchored by a phenomenon.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { generateQuestionCluster } from './question-cluster-generator';
import {
  GenerateScienceTestInputSchema,
  GenerateScienceTestOutputSchema,
  type GenerateScienceTestInput,
  type GenerateScienceTestOutput,
} from '../schemas/ngss-physics-test-schemas';

const generateNGSSPhysicsTestFlow = ai.defineFlow(
  {
    name: 'generateNGSSPhysicsTestFlow',
    inputSchema: GenerateScienceTestInputSchema,
    outputSchema: GenerateScienceTestOutputSchema,
    timeout: 300000, // 5 minutes
  },
  async (input) => {
    const { units, dokLevel, clusterCount } = input;
    const lessonTopics = units.join(', ');

    const clusterPromises = Array.from({ length: clusterCount }, () =>
      generateQuestionCluster({ lessonTopics, dokLevel })
    );

    try {
      const clusters = await Promise.all(clusterPromises);

      const testTitle = `NGSS Physics Test: ${units.join(' & ')}`;
      const instructions = `This test contains ${clusterCount} question clusters. Read the phenomenon and analyze any provided data for each cluster before answering the questions that follow.`;

      return {
        testTitle,
        instructions,
        clusters,
      };
    } catch (error) {
      console.error("Error generating one or more clusters:", error);
      throw new Error("Failed to generate the test. One or more question clusters could not be created. Please try again.");
    }
  }
);

export async function generateNGSSPhysicsTest(
  input: GenerateScienceTestInput
): Promise<GenerateScienceTestOutput> {
  return await generateNGSSPhysicsTestFlow(input);
}
