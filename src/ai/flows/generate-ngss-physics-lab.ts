
'use server';
/**
 * @fileOverview An AI flow for generating a 45-minute NGSS Physics lab activity.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { GenerateLabActivityInputSchema, GenerateLabActivityOutputSchema, type GenerateLabActivityInput, type GenerateLabActivityOutput } from '../schemas/lab-activity-schemas';

async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      if (err.message?.includes("503") || err.message?.includes("model is overloaded")) {
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
3.  **Student-Centered & Inquiry-Based:** The lab must be structured to promote student inquiry. This includes:
    *   **Extensive Phenomenon Reading:** Write a detailed, 500-800 word, grade-appropriate reading passage that presents a real-world phenomenon or scenario to anchor the lab and provide context.
    *   **High-Level Pre-Lab Questions:** Generate 2-3 pre-lab questions based on the reading that are at DOK Level 3-4, requiring students to analyze, evaluate, or synthesize information.
    *   **Student-Led Investigation:**
        - The prompt for 'testableQuestion' MUST guide the student to create their own, not provide a ready-made one.
        - The 'hypothesisPrompt' MUST include a sentence starter like "If... then... because...".
        - The 'variablesPrompt' MUST only contain direct questions asking the student to identify the independent, dependent, and controlled variables. Do NOT add any extra explanatory text.
        - The 'studentProcedureDesign' MUST be a concise prompt instructing the student to write their own step-by-step experimental procedure. Do NOT write the procedure for them or give a long explanation on how to do it.
4.  **Safety First:** Clearly list essential and specific safety precautions.
5.  **Accessible Materials:** Use materials commonly found in a high school physics lab.
6.  **Rigorous Discussion:** Generate at least 5 high-level (DOK 3-4) discussion questions that encourage students to analyze their data, consider sources of error, and connect their findings to broader scientific concepts.
7.  **Conclusion:** The conclusion prompt must ask students to explicitly state whether their hypothesis was supported or refuted by their data and to explain their reasoning.

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
    timeout: 180000,
  },
  async (input) => {
    const { output } = await withRetry(() => prompt({ ...input, lessons: input.lessons.join(', ') }));
    if (!output) {
      throw new Error('The AI failed to generate a lab activity. Please try again.');
    }
    return output;
  }
);

export async function generateNGSSPhysicsLab(input: GenerateLabActivityInput): Promise<GenerateLabActivityOutput> {
    return await generateNGSSPhysicsLabFlow(input);
}
