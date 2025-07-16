
'use server';
/**
 * @fileOverview An AI flow for generating a 45-minute NGSS Biology lab activity.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { GenerateLabActivityInputSchema, GenerateLabActivityOutputSchema, type GenerateLabActivityInput, type GenerateLabActivityOutput } from '../schemas/lab-activity-schemas';

const prompt = ai.definePrompt({
  name: 'generateNVBiologyLabPrompt',
  input: { schema: GenerateLabActivityInputSchema },
  output: { schema: GenerateLabActivityOutputSchema },
  prompt: `You are an expert instructional designer specializing in creating NGSS-aligned high school biology lab activities. Your task is to design an engaging, inquiry-based lab that fits within a strict 45-minute class period.

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
5.  **Accessible Materials:** Use materials commonly found in a high school biology lab.
6.  **Pre-Lab and Post-Lab:** Clearly state what students need to do before the lab and what can be assigned for homework.
7.  **Rigorous Discussion:** Generate at least 5 high-level (DOK 3-4) discussion questions that encourage students to analyze their data, consider sources of error, and connect their findings to broader scientific concepts.
8.  **Conclusion:** The conclusion prompt must ask students to explicitly state whether their hypothesis was supported or refuted by their data and to explain their reasoning.

**Biology-Specific Guidelines:**
- **Focus:** Design the lab around highly specific biological concepts suitable for quick observation or demonstration.
- **Emphasis:** Prioritize direct observation, simple experimental manipulation, qualitative data collection, and rapid analysis.
- **Avoid:** Labs requiring long incubation times or extensive culturing within the 45-minute period.
- **Example Concepts:** Osmosis with pre-cut materials (e.g., potato, gummy bear), enzyme activity with a quick, observable reaction, basic cell observation with prepared slides or simple wet mounts (e.g., cheek cells, onion skin), stomata observation using nail polish peels, simple Mendelian genetics probability simulations (e.g., coin flips).

**Output Format:** Your response must be a single JSON object that strictly follows the 'GenerateLabActivityOutputSchema'.
`,
});

const generateNVBiologyLabFlow = ai.defineFlow(
  {
    name: 'generateNVBiologyLabFlow',
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

export async function generateNVBiologyLab(input: GenerateLabActivityInput): Promise<GenerateLabActivityOutput> {
    return await generateNVBiologyLabFlow(input);
}
