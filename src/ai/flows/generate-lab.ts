
'use server';

/**
 * @fileOverview AI agent that generates lab experiments for science lessons.
 *
 * - generateLabExperiment - A function that generates lab experiments based on the selected lesson.
 * - GenerateLabExperimentInput - The input type for the generateLabExperiment function.
 * - GenerateLabExperimentOutput - The return type for the generateLabExperiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { aiContentGenerationRules } from '../schemas/formatting-rules';

const GenerateLabExperimentInputSchema = z.object({
  lessonDescription: z.string().describe('The description of the lesson.'),
  subject: z.string().describe('The science subject (e.g., Biology, Chemistry, Physics).'),
  topic: z.string().describe('The specific topic of the lab experiment.'),
});
export type GenerateLabExperimentInput = z.infer<typeof GenerateLabExperimentInputSchema>;

const GenerateLabExperimentOutputSchema = z.object({
  labHandout: z.string().describe('The generated student lab handout in structured markdown format.'),
});
export type GenerateLabExperimentOutput = z.infer<typeof GenerateLabExperimentOutputSchema>;

export async function generateLabExperiment(input: GenerateLabExperimentInput): Promise<GenerateLabExperimentOutput> {
  const result = await generateLabExperimentFlow(input);
  return { labHandout: result.labHandout };
}

const prompt = ai.definePrompt({
  name: 'generateLabExperimentPrompt',
  input: {schema: GenerateLabExperimentInputSchema},
  output: {schema: GenerateLabExperimentOutputSchema},
  prompt: `You are an experienced science teacher creating a lab experiment for a lesson.
${aiContentGenerationRules}

Generate a detailed lab experiment handout for students. The entire output must be enclosed within 'STUDENT LAB HANDOUT START ---' and 'STUDENT LAB HANDOUT END ---' markers.

Use the following section headers:
- LABORATORY INVESTIGATION: [Title of Lab]
- INTRODUCTION & BACKGROUND
- PROBLEM / INVESTIGATIVE QUESTION
- HYPOTHESIS DEVELOPMENT
- MATERIALS
- SAFETY PRECAUTIONS
- PROCEDURE
- DATA COLLECTION & OBSERVATIONS
- DATA ANALYSIS
- CONCLUSION

Subject: {{{subject}}}
Lesson Description: {{{lessonDescription}}}
Topic: {{{topic}}}

Ensure the lab experiment is appropriate for the specified subject and aligns with the lesson description.
Consider culturally inclusive frameworks in the design of the experiment.
Be very specific and assume the student knows nothing about the topic.
The output should be a single block of text formatted according to the rules provided.
`,
});

const generateLabExperimentFlow = ai.defineFlow(
  {
    name: 'generateLabExperimentFlow',
    inputSchema: GenerateLabExperimentInputSchema,
    outputSchema: GenerateLabExperimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
