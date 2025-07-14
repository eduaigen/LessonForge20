'use server';
/**
 * @fileOverview An AI flow for refining learning objectives to be SMART.
 *
 * - refineObjective - A function that handles the objective refinement process.
 * - RefineObjectiveInput - The input type for the refineObjective function.
 * - RefineObjectiveOutput - The return type for the refineObjective function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RefineObjectiveInputSchema = z.object({
  objective: z.string().describe('The learning objective to be refined.'),
  subject: z.string().describe('The subject area of the objective (e.g., Science, ELA).'),
});
export type RefineObjectiveInput = z.infer<typeof RefineObjectiveInputSchema>;

const RefineObjectiveOutputSchema = z.object({
  originalObjective: z.string().describe('The original objective provided by the user.'),
  refinedObjective: z.object({
    Specific: z.string().describe('The "Specific" component of the SMART objective.'),
    Measurable: z.string().describe('The "Measurable" component of the SMART objective.'),
    Achievable: z.string().describe('The "Achievable" component of the SMART objective.'),
    Relevant: z.string().describe('The "Relevant" component of the SMART objective.'),
    TimeBound: z.string().describe('The "Time-bound" component of the SMART objective.'),
  }),
  suggestion: z.string().describe('A brief explanation of why the refined objective is an improvement.'),
});
export type RefineObjectiveOutput = z.infer<typeof RefineObjectiveOutputSchema>;

export async function refineObjective(input: RefineObjectiveInput): Promise<RefineObjectiveOutput> {
  return refineObjectiveFlow(input);
}

const prompt = ai.definePrompt({
  name: 'refineObjectivePrompt',
  input: {schema: RefineObjectiveInputSchema},
  output: {schema: RefineObjectiveOutputSchema},
  prompt: `You are an expert instructional coach specializing in curriculum design. Your task is to refine a learning objective to be SMART (Specific, Measurable, Achievable, Relevant, Time-bound).

Given the following learning objective for the subject '{{{subject}}}':
"{{{objective}}}"

Rewrite it into a SMART objective. For each component of the SMART framework, provide a clear statement. Also provide a brief suggestion explaining the improvements made.

- **Specific**: What will students know or be able to do? Who is involved?
- **Measurable**: How will you measure success? What is the evidence of learning?
- **Achievable**: Is the objective realistic for the students given their current skills?
- **Relevant**: Why is this important for students to learn? Does it connect to a larger goal?
- **Time-bound**: By when should this objective be met? (e.g., "by the end of the lesson," "by the end of the week")`,
});

const refineObjectiveFlow = ai.defineFlow(
  {
    name: 'refineObjectiveFlow',
    inputSchema: RefineObjectiveInputSchema,
    outputSchema: RefineObjectiveOutputSchema,
  },
  async (input) => {
    const {output} = await prompt({
        ...input,
        originalObjective: input.objective,
    });
    if (!output) {
      throw new Error('The AI failed to refine the objective. Please try again.');
    }
    return output;
  }
);
