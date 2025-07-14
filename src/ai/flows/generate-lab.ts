
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
  lessonDescription: z.string().describe('The description or title of the lesson that this lab should be based on.'),
  subject: z.string().describe('The science subject (e.g., NV Biology, Chemistry, Physics).'),
  topic: z.string().describe('The specific curriculum topic for the lab experiment.'),
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
  prompt: `You are an experienced science teacher creating a lab experiment for a specific lesson.
${aiContentGenerationRules}

Generate a detailed, print-ready lab experiment handout for students based on the following curriculum context. The entire output must be enclosed within 'STUDENT LAB HANDOUT START ---' and 'STUDENT LAB HANDOUT END ---' markers.

The lab must be directly related to the provided Lesson, Topic, and Subject.

**Curriculum Context:**
- **Subject:** {{{subject}}}
- **Topic:** {{{topic}}}
- **Lesson Focus:** {{{lessonDescription}}}


**Lab Handout Structure:**
Use the following section headers exactly as written:
- LABORATORY INVESTIGATION: [Invent a creative and descriptive title for the lab here]
- INTRODUCTION & BACKGROUND: [Provide a concise introduction that connects to the lesson focus.]
- PROBLEM / INVESTIGATIVE QUESTION: [Formulate a clear, testable question related to the lesson.]
- HYPOTHESIS DEVELOPMENT: [Guide students to form a hypothesis. e.g., "If [I do this], then [this will happen], because..."]
- MATERIALS: [List all necessary materials in a bulleted list.]
- SAFETY PRECAUTIONS: [List critical safety warnings relevant to this specific lab.]
- PROCEDURE: [Provide a clear, step-by-step numbered list of instructions.]
- DATA COLLECTION & OBSERVATIONS: [Create a well-structured data table (using Markdown pipe-and-dash format) for students to record measurements. Include space for qualitative observations.]
- DATA ANALYSIS: [Provide 2-3 specific questions that guide students to analyze their data, calculate results, or create a graph (specify graph type).]
- CONCLUSION: [Provide a structured conclusion prompt, guiding students to restate their hypothesis, summarize results, discuss errors, and relate findings back to the main lesson concept.]

**Important Instructions:**
- **Specificity:** Be very specific and assume the student needs clear guidance.
- **Inclusivity:** Consider culturally inclusive frameworks in the design and context of the experiment.
- **Formatting:** The entire output must be a single block of text formatted according to the rules provided. Do not include any external commentary.
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
