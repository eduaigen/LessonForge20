
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
import { aiContentGenerationRules } from '../schemas/formatting-rules';

const RefineLearningObjectiveInputSchema = z.object({
  objective: z.string().describe('The learning objective to refine.'),
});

export type RefineLearningObjectiveInput = z.infer<typeof RefineLearningObjectiveInputSchema>;

const RefineLearningObjectiveOutputSchema = z.object({
  refinedObjective: z.string().describe('The generated refinement in structured markdown format.'),
});

export type RefineLearningObjectiveOutput = z.infer<typeof RefineLearningObjectiveOutputSchema>;

export async function refineLearningObjective(input: RefineLearningObjectiveInput): Promise<RefineLearningObjectiveOutput> {
  const result = await refineLearningObjectiveFlow(input);
  return { refinedObjective: result.refinedObjective };
}

const refineLearningObjectivePrompt = ai.definePrompt({
  name: 'refineLearningObjectivePrompt',
  input: {schema: RefineLearningObjectiveInputSchema},
  output: {schema: RefineLearningObjectiveOutputSchema},
  prompt: `You are an expert in instructional design and educational pedagogy. Your task is to refine and improve learning objectives provided by a teacher.
${aiContentGenerationRules}

User Input: The user will provide a learning objective.

Processing Steps:
1. Analyze the objective:
- Identify if the objective is measurable, observable, and specific.
- Determine the cognitive level (e.g., remember, understand, apply, analyze, evaluate, create) and suggest a more precise verb if needed.
- Check for clarity and conciseness.
- Identify any ambiguity or broadness.
2. Suggest Improvements: For each objective, provide:
- Original Objective: [User's original objective]
- Refined Objective(s): Offer 1-3 improved versions that are more specific, measurable, and action-oriented. Use strong, measurable verbs (e.g., "Students will be able to analyze primary sources," instead of "Students will understand history").
- Explanation of Refinement: Briefly explain why the changes were made (e.g., "Changed 'understand' to 'explain' for better measurability," or "Added specific content to narrow the focus").
- Tips for Writing Learning Objectives: Provide general best practices for crafting effective learning objectives (e.g., use SMART criteria: Specific, Measurable, Achievable, Relevant, Time-bound).

The user's objective is: "{{{objective}}}"

Format your response as a single block of structured text using the following section headers:
- A. Original Objective
- B. Refined Objectives
- C. Explanation of Refinement
- D. Tips for Writing Learning Objectives
`,
});

const refineLearningObjectiveFlow = ai.defineFlow(
  {
    name: 'refineLearningObjectiveFlow',
    inputSchema: RefineLearningObjectiveInputSchema,
    outputSchema: RefineLearningObjectiveOutputSchema,
  },
  async (input) => {
    const {output} = await refineLearningObjectivePrompt(input);
    return output!;
  }
);
