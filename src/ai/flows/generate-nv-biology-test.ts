
'use server';
/**
 * @fileOverview An AI flow for generating a test for the New Visions Biology curriculum.
 * This test is structured into multiple question clusters, each anchored by a phenomenon.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { generateQuestionCluster } from './question-cluster-generator';
import {
  GenerateNVBiologyTestInputSchema,
  GenerateNVBiologyTestOutputSchema,
  type GenerateNVBiologyTestInput,
  type GenerateNVBiologyTestOutput,
} from '../schemas/nv-biology-test-schemas';

const generateNVBiologyTestFlow = ai.defineFlow(
  {
    name: 'generateNVBiologyTestFlow',
    inputSchema: GenerateNVBiologyTestInputSchema,
    outputSchema: GenerateNVBiologyTestOutputSchema,
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

      const testTitle = `New Visions Biology Test: ${units.join(' & ')}`;
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

export async function generateNVBiologyTest(
  input: GenerateNVBiologyTestInput
): Promise<GenerateNVBiologyTestOutput> {
  return await generateNVBiologyTestFlow(input);
}
