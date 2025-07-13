'use server';

/**
 * @fileOverview AI agent that explains a concept or question in a clear, concise manner suitable for students.
 *
 * - explainConcept - A function that handles the concept explanation process.
 * - ExplainConceptInput - The input type for the explainConcept function.
 * - ExplainConceptOutput - The return type for the explainConcept function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExplainConceptInputSchema = z.object({
  concept: z.string().describe('The concept or question to be explained.'),
  gradeLevel: z.coerce.number().optional().describe('The target grade level. If not provided, assume a general audience.'),
});
export type ExplainConceptInput = z.infer<typeof ExplainConceptInputSchema>;

const ExplainConceptOutputSchema = z.object({
  conceptName: z.string().describe('The concept being explained.'),
  definition: z.string().describe('A clear, straightforward definition of the concept.'),
  simpleExplanation: z.string().describe('An explanation of the concept in simple, accessible terms.'),
  analogy: z.string().describe('A relatable analogy or metaphor to aid understanding.'),
  examples: z.array(z.string()).describe('Concrete real-world or hypothetical examples.'),
  keyComponents: z.array(z.string()).optional().describe('A bulleted list of key steps, components, or principles if the concept is complex.'),
});
export type ExplainConceptOutput = z.infer<typeof ExplainConceptOutputSchema>;

export async function explainConcept(input: ExplainConceptInput): Promise<ExplainConceptOutput> {
  return explainConceptFlow(input);
}

const prompt = ai.definePrompt({
  name: 'explainConceptPrompt',
  input: {schema: ExplainConceptInputSchema},
  output: {schema: ExplainConceptOutputSchema},
  prompt: `You are an expert educator capable of explaining complex concepts clearly and concisely for various learning levels and styles.

User Input:
- Concept: {{{concept}}}
{{#if gradeLevel}}
- Target Audience: {{{gradeLevel}}}th grade students
{{else}}
- Target Audience: A general audience with no prior knowledge.
{{/if}}

Processing Steps:
1. Define the Concept: Provide a clear, straightforward definition.
2. Explain in Simple Terms: Break down the concept into its core components using accessible language.
3. Provide Analogies/Metaphors: Offer 1-2 relatable analogies to help build understanding.
4. Give Concrete Examples: Provide 1-3 real-world or hypothetical examples.
5. Break it Down (Optional/If Complex): For more intricate concepts, offer a bulleted list of key steps, components, or principles.
6. Consider Different Levels: Adjust the language, complexity of examples, and depth of explanation based on the specified audience.

Provide the output in the specified JSON format.
`,
});

const explainConceptFlow = ai.defineFlow(
  {
    name: 'explainConceptFlow',
    inputSchema: ExplainConceptInputSchema,
    outputSchema: ExplainConceptOutputSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
