
'use server';
/**
 * @fileOverview An AI flow for generating a 45-minute NGSS Physics lab activity.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { GenerateLabActivityInputSchema, GenerateLabActivityOutputSchema, type GenerateLabActivityInput, type GenerateLabActivityOutput } from '../schemas/lab-activity-schemas';

const prompt = ai.definePrompt({
  name: 'generateNGSSPhysicsLabPrompt',
  input: { schema: GenerateLabActivityInputSchema },
  output: { schema: GenerateLabActivityOutputSchema },
  prompt: `You are an expert instructional designer specializing in creating NGSS-aligned high school physics lab activities. Your task is to design an engaging, inquiry-based lab that fits within a strict 45-minute class period.

**Lesson Context:**
- **Topic(s)**: {{{lessons}}}
- **Additional Info**: {{{additionalInfo}}}

**CRITICAL INSTRUCTIONS:**
1.  **45-Minute Constraint:** The entire activity, including introduction, setup, experiment, data collection, discussion, and cleanup, MUST be realistically completable within 45 minutes. Provide a time breakdown for each phase.
2.  **NGSS Alignment:** Explicitly identify the NGSS Performance Expectation (PE), Science and Engineering Practice (SEP), Disciplinary Core Idea (DCI), and Crosscutting Concept (CCC) the lab addresses.
3.  **Student-Centered & Inquiry-Based:** The lab should encourage student questioning and investigation.
4.  **Safety First:** Clearly list essential and specific safety precautions.
5.  **Accessible Materials:** Use materials commonly found in a high school physics lab.
6.  **Pre-Lab and Post-Lab:** Clearly state what students need to do before the lab (e.g., read, form hypothesis) and what can be assigned for homework (e.g., detailed analysis, conclusion writing).

**Physics-Specific Guidelines:**
- **Focus:** Design the lab to demonstrate fundamental physical principles with simple setups.
- **Emphasis:** Prioritize direct measurement, quick data collection for a single variable relationship, and visual demonstration of concepts.
- **Avoid:** Complex setups or experiments requiring precise, long-duration measurements.
- **Example Concepts:** Simple pendulum (period vs. length), force and acceleration (toy car), conservation of momentum (collision carts), Ohm's Law (simple circuit), light reflection/refraction.

**Output Format:** Your response must be a single JSON object that strictly follows the 'GenerateLabActivityOutputSchema'.
`,
});

const generateNGSSPhysicsLabFlow = ai.defineFlow(
  {
    name: 'generateNGSSPhysicsLabFlow',
    inputSchema: GenerateLabActivityInputSchema,
    outputSchema: GenerateLabActivityOutputSchema,
    timeout: 120000, // 2 minutes
  },
  async (input) => {
    const { output } = await prompt({ ...input, lessons: input.lessons.join(', ') });
    if (!output) {
      throw new Error('The AI failed to generate a lab activity. Please try again.');
    }
    return output;
  }
);

export async function generateNGSSPhysicsLab(input: GenerateLabActivityInput): Promise<GenerateLabActivityOutput> {
    return await generateNGSSPhysicsLabFlow(input);
}
