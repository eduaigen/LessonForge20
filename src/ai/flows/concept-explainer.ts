
'use server';
/**
 * @fileOverview An AI flow for explaining educational concepts.
 *
 * - explainConcept - A function that handles the concept explanation process.
 * - ExplainConceptInput - The input type for the explainConcept function.
 * - ExplainConceptOutput - The return type for the explainConcept function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainConceptInputSchema = z.string().describe('The concept or question to be explained.');
export type ExplainConceptInput = z.infer<typeof ExplainConceptInputSchema>;

const ExplainConceptOutputSchema = z.object({
  explanation: z.string().describe('A clear, grade-appropriate explanation of the concept.'),
  analogy: z.string().describe('An analogy or metaphor to help understand the concept.'),
  keyPoints: z.array(z.string()).describe('A list of 3-5 key bullet points summarizing the concept.'),
});
export type ExplainConceptOutput = z.infer<typeof ExplainConceptOutputSchema>;

export async function explainConcept(input: ExplainConceptInput): Promise<ExplainConceptOutput> {
  return explainConceptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainConceptPrompt',
  input: {schema: ExplainConceptInputSchema},
  output: {schema: ExplainConceptOutputSchema},
  prompt: `You are an expert educator and curriculum developer with a talent for making complex topics understandable. Your task is to explain a concept in a way that is clear, engaging, and pedagogically sound for a high school audience.

Given the following concept or question:
"{{{input}}}"

Generate the following three components:
1.  **Explanation**: Provide a clear, concise, and grade-appropriate explanation of the concept. Break it down into simple terms. Assume a 10th-grade reading level unless the query implies a different one.
2.  **Analogy**: Create a simple, relatable analogy or metaphor that makes the abstract concept concrete and easier to understand.
3.  **Key Points**: Distill the explanation into a list of 3-5 essential bullet points that summarize the most important, take-away aspects of the concept.`,
});

const explainConceptFlow = ai.defineFlow(
  {
    name: 'explainConceptFlow',
    inputSchema: ExplainConceptInputSchema,
    outputSchema: ExplainConceptOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to generate an explanation. Please try again.');
    }
    return output;
  }
);
