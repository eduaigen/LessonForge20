
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

const RefineObjectiveInputSchema = z.string().describe('The learning objective to be refined.');
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
  prompt: `You are an expert instructional coach specializing in curriculum design and pedagogy. Your task is to take a learning objective and rewrite it to be a SMART objective (Specific, Measurable, Achievable, Relevant, Time-bound).

Given the following learning objective:
"{{{input}}}"

Deconstruct and rewrite it into a full SMART objective. For each component of the SMART framework, provide a clear, actionable statement. Also provide a brief suggestion explaining why the refined version is a pedagogical improvement.

- **Specific**: What exactly will students know or be able to do? Use a strong action verb. Who is this for?
- **Measurable**: How will learning be measured and evaluated? What is the concrete evidence of success?
- **Achievable**: Is the objective realistic for the students given a typical timeframe and resources?
- **Relevant**: Why is this objective important for students to master? How does it connect to a larger learning goal or real-world skill?
- **Time-bound**: By when should this objective be met? (e.g., "by the end of this lesson," "by the end of the week's project")`,
});

const refineObjectiveFlow = ai.defineFlow(
  {
    name: 'refineObjectiveFlow',
    inputSchema: RefineObjectiveInputSchema,
    outputSchema: RefineObjectiveOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to refine the objective. Please try again.');
    }
    // Manually add the original objective to the output as the prompt can't access it directly with a simple string input.
    return { ...output, originalObjective: input };
  }
);
