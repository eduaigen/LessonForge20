
'use server';
/**
 * @fileOverview An AI flow for generating a single NGSS-style question cluster.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import {
  GenerateQuestionClusterInputSchema,
  QuestionClusterSchema,
  type GenerateQuestionClusterInput,
  type QuestionClusterOutput,
} from '../schemas/question-cluster-generator-schemas';

const prompt = ai.definePrompt({
  name: 'singleQuestionClusterGeneratorPrompt',
  input: { schema: GenerateQuestionClusterInputSchema },
  output: { schema: QuestionClusterSchema },
  prompt: `You are an expert in science assessment design, specializing in creating three-dimensional, NGSS-aligned question clusters. Your task is to generate a single 6-question cluster based on the provided lesson topics and Depth of Knowledge (DOK) level.

**Curriculum Context:**
-   **Topics**: {{{lessonTopics}}}
-   **DOK Level**: {{{dokLevel}}}

**Instructions for Generating ONE Cluster:**
1.  **Develop a Phenomenon:** Create a compelling, real-world phenomenon related to the lesson topics. This should be an informative passage (150-200 words) that provides background information.
2.  **Create Stimulus Material:** If relevant, create a data table that students will need to interpret. The data must be directly related to the phenomenon and passage.
3.  **Generate 6 Questions:** Based on the phenomenon and stimulus, create exactly six questions that align with the specified DOK level.
    *   **Multiple Choice Question 1:** A straightforward comprehension or identification question. Provide 4 answer choices but DO NOT include the letters (A, B, C, D).
    *   **Multiple Choice Question 2:** A more analytical multiple-choice question that requires students to make an inference. Provide 4 answer choices but DO NOT include the letters.
    *   **Short Response Question 1:** A question requiring students to explain a concept from the stimulus.
    *   **Short Response Question 2:** A question asking students to use evidence from the stimulus to support a claim.
    *   **CER Question:** A full Claim, Evidence, Reasoning prompt.
    *   **Modeling Question:** A prompt that asks students to draw, label, or complete a model to explain a process or relationship.
4.  **Create Answer Key:** Provide a detailed answer key for every question in the cluster.

Your final output MUST be a single, valid JSON object representing one question cluster that strictly follows the output schema.
`,
});

const generateQuestionClusterFlow = ai.defineFlow(
  {
    name: 'generateQuestionClusterFlow',
    inputSchema: GenerateQuestionClusterInputSchema,
    outputSchema: QuestionClusterSchema,
    timeout: 120000,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to generate the question cluster. Please try again.');
    }
    return output;
  }
);

export async function generateQuestionCluster(
  input: GenerateQuestionClusterInput
): Promise<QuestionClusterOutput> {
  return await generateQuestionClusterFlow(input);
}
