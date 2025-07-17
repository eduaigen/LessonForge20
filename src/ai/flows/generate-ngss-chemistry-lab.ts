
'use server';
/**
 * @fileOverview An AI flow for generating a 45-minute NGSS Chemistry lab activity.
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
  name: 'generateNGSSChemistryLabPrompt',
  input: { schema: GenerateLabActivityInputSchema },
  output: { schema: GenerateLabActivityOutputSchema },
  prompt: `You are an expert instructional designer specializing in creating NGSS-aligned high school chemistry lab activities. Your task is to design an engaging, inquiry-based lab that fits within a strict 45-minute class period.

**Lesson Context:**
- **Topic(s)**: {{{lessons}}}
- **Additional Info**: {{{additionalInfo}}}

**CRITICAL INSTRUCTIONS:**
1.  **45-Minute Constraint:** The entire activity, including introduction, setup, experiment, data collection, discussion, and cleanup, MUST be realistically completable within 45 minutes. Provide a time breakdown for each phase.
2.  **NGSS Alignment:** Explicitly identify the NGSS Performance Expectation (PE), Science and Engineering Practice (SEP), Disciplinary Core Idea (DCI), and Crosscutting Concept (CCC) the lab addresses.
3.  **Student-Centered & Inquiry-Based:** The lab must be structured to promote student inquiry. This includes:
    *   **Extensive Phenomenon Reading:** Write a detailed, 500-800 word, grade-appropriate reading passage that presents a real-world phenomenon or scenario to anchor the lab and provide context.
    *   **High-Level Pre-Lab Questions:** Generate 2-3 pre-lab questions based on the reading that are at DOK Level 3-4, requiring students to analyze, evaluate, or synthesize information.
    *   **Student-Led Investigation:** The prompts for the 'testableQuestion', 'hypothesis', and 'variables' MUST guide the student to create their own, not provide them with a ready-made one. The hypothesis prompt MUST include a sentence starter like "If... then... because...".
4.  **Safety First:** Clearly list essential and specific safety precautions.
5.  **Accessible Materials:** Use materials commonly found in a high school chemistry lab.
6.  **Rigorous Discussion:** Generate at least 5 high-level (DOK 3-4) discussion questions that encourage students to analyze their data, consider sources of error, and connect their findings to broader scientific concepts.
7.  **Conclusion:** The conclusion prompt must ask students to explicitly state whether their hypothesis was supported or refuted by their data and to explain their reasoning.

**Chemistry-Specific Guidelines:**
- **Focus:** Design the lab around quick, observable chemical reactions, simple property investigations, or concept demonstrations.
- **Emphasis:** Prioritize observation of chemical change, qualitative analysis, and rapid quantitative measurements (e.g., temperature change, pH).
- **Avoid:** Multi-step syntheses, long titrations, or reactions that require extended time to complete.
- **Example Concepts:** Acid-base indicators, dissolving rates, simple solubility rules, single/double displacement reactions, exothermic/endothermic reactions.

**Output Format:** Your response must be a single JSON object that strictly follows the 'GenerateLabActivityOutputSchema'.
`,
});

const generateNGSSChemistryLabFlow = ai.defineFlow(
  {
    name: 'generateNGSSChemistryLabFlow',
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

export async function generateNGSSChemistryLab(input: GenerateLabActivityInput): Promise<GenerateLabActivityOutput> {
    return await generateNGSSChemistryLabFlow(input);
}
