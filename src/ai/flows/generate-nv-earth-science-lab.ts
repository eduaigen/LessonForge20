
'use server';
/**
 * @fileOverview An AI flow for generating a 45-minute NGSS Earth Science lab activity.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { GenerateLabActivityInputSchema, GenerateLabActivityOutputSchema, type GenerateLabActivityInput, type GenerateLabActivityOutput } from '../schemas/lab-activity-schemas';

const prompt = ai.definePrompt({
  name: 'generateNVEarthScienceLabPrompt',
  input: { schema: GenerateLabActivityInputSchema },
  output: { schema: GenerateLabActivityOutputSchema },
  prompt: `You are an expert instructional designer specializing in creating NGSS-aligned high school Earth Science lab activities. Your task is to design an engaging, inquiry-based lab that fits within a strict 45-minute class period.

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
5.  **Accessible Materials:** Use materials commonly found in a high school Earth Science lab.
6.  **Pre-Lab and Post-Lab:** Clearly state what students need to do before the lab and what can be assigned for homework.
7.  **Rigorous Discussion:** Generate at least 5 high-level (DOK 3-4) discussion questions that encourage students to analyze their data, consider sources of error, and connect their findings to broader scientific concepts.
8.  **Conclusion:** The conclusion prompt must ask students to explicitly state whether their hypothesis was supported or refuted by their data and to explain their reasoning.

**Earth Science-Specific Guidelines:**
- **Focus:** Design the lab around rapid observation, model interpretation, or simulation of Earth processes.
- **Emphasis:** Prioritize interpreting visual data (maps, charts, samples), hands-on modeling of geological/atmospheric phenomena, and quick analysis of environmental samples.
- **Avoid:** Long-term observation projects or complex data analysis that cannot be done quickly.
- **Example Concepts:** Rock/mineral identification (small sample set), analyzing weather map patterns, modeling plate boundaries with household items, simulating erosion with a stream table, interpreting soil layers.

**Output Format:** Your response must be a single JSON object that strictly follows the 'GenerateLabActivityOutputSchema'.
`,
});

const generateNVEarthScienceLabFlow = ai.defineFlow(
  {
    name: 'generateNVEarthScienceLabFlow',
    inputSchema: GenerateLabActivityInputSchema,
    outputSchema: GenerateLabActivityOutputSchema,
    timeout: 180000,
  },
  async (input) => {
    const { output } = await prompt({ ...input, lessons: input.lessons.join(', ') });
    if (!output) {
      throw new Error('The AI failed to generate a lab activity. Please try again.');
    }
    return output;
  }
);

export async function generateNVEarthScienceLab(input: GenerateLabActivityInput): Promise<GenerateLabActivityOutput> {
    return await generateNVEarthScienceLabFlow(input);
}
