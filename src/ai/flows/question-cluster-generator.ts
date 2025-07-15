'use server';
/**
 * @fileOverview An AI flow for generating NGSS-style question clusters.
 */
import { ai } from '@/ai/genkit';
import {
  QuestionClusterInputSchema,
  QuestionClusterOutputSchema,
  type QuestionClusterInput,
  type QuestionClusterOutput,
} from '../schemas/question-cluster-generator-schemas';

const prompt = ai.definePrompt({
  name: 'questionClusterGeneratorPrompt',
  input: { schema: QuestionClusterInputSchema },
  output: { schema: QuestionClusterOutputSchema },
  prompt: `You are an expert in science assessment design, specializing in creating three-dimensional, NGSS-aligned question clusters.

Your task is to generate a 6-question cluster based on the provided lesson plan topic. The cluster must be anchored in a real-world phenomenon and include stimulus material (a short passage and a data table).

**Lesson Plan Context:**
---
Topic: {{{lessonTopic}}}
Lesson Objective: {{{lessonObjective}}}
---

**Instructions:**
1.  **Develop a Phenomenon:** Create a compelling, real-world phenomenon related to the lesson topic. This should be a 1-2 sentence description.
2.  **Create Stimulus Material:**
    *   **Passage:** Write a short, informative passage (100-150 words) that provides background information on the phenomenon.
    *   **Visual:** Create a relevant data table that students will need to interpret. The data must be directly related to the phenomenon and passage. **Do not generate a diagram.**
3.  **Generate a 6-Question Cluster:** Based on the stimulus material, create exactly six questions that align with different cognitive tasks.

    *   **Multiple Choice Question 1:** A straightforward comprehension or identification question based on the stimulus. Provide 4 answer choices.
    *   **Multiple Choice Question 2:** A more analytical multiple-choice question that requires students to make an inference or connection. Provide 4 answer choices.
    *   **Short Response Question 1:** A question that requires students to explain a concept or relationship from the stimulus in their own words (2-3 sentences).
    *   **Short Response Question 2:** A question that asks students to use evidence from the stimulus to support a claim.
    *   **Modeling Question:** A prompt that asks students to draw, label, or complete a model or diagram to explain a process or relationship.
    *   **Prediction Question:** A question that asks students to predict an outcome if a variable in the phenomenon were to change, and to justify their prediction.

Ensure all questions are clear, concise, and directly tied to the provided stimulus materials.`,
});

const questionClusterGeneratorFlow = ai.defineFlow(
  {
    name: 'questionClusterGeneratorFlow',
    inputSchema: QuestionClusterInputSchema,
    outputSchema: QuestionClusterOutputSchema,
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
  input: QuestionClusterInput
): Promise<QuestionClusterOutput> {
  return await questionClusterGeneratorFlow(input);
}
