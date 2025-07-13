// refine-learning-objective.ts
'use server';

/**
 * @fileOverview Refines a learning objective to be SMART and student-centered.
 *
 * - refineLearningObjective - A function that refines a learning objective.
 * - RefineLearningObjectiveInput - The input type for the refineLearningObjective function.
 * - RefineLearningObjectiveOutput - The return type for the refineLearningObjective function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefineLearningObjectiveInputSchema = z.object({
  objective: z.string().describe('The learning objective to refine.'),
});

export type RefineLearningObjectiveInput = z.infer<typeof RefineLearningObjectiveInputSchema>;

const RefineLearningObjectiveOutputSchema = z.object({
  refinedObjective: z.string().describe('The refined learning objective.'),
});

export type RefineLearningObjectiveOutput = z.infer<typeof RefineLearningObjectiveOutputSchema>;

export async function refineLearningObjective(input: RefineLearningObjectiveInput): Promise<RefineLearningObjectiveOutput> {
  return refineLearningObjectiveFlow(input);
}

const refineLearningObjectivePrompt = ai.definePrompt({
  name: 'refineLearningObjectivePrompt',
  input: {schema: RefineLearningObjectiveInputSchema},
  output: {schema: RefineLearningObjectiveOutputSchema},
  prompt: `You are an expert educator. Refine the following learning objective to be SMART (Specific, Measurable, Achievable, Relevant, Time-bound) and student-centered.\n\nLearning Objective: {{{objective}}}`,
});

const refineLearningObjectiveFlow = ai.defineFlow(
  {
    name: 'refineLearningObjectiveFlow',
    inputSchema: RefineLearningObjectiveInputSchema,
    outputSchema: RefineLearningObjectiveOutputSchema,
  },
  async input => {
    const {output} = await refineLearningObjectivePrompt(input);
    return output!;
  }
);
