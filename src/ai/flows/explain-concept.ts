
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
import { aiContentGenerationRules } from '../schemas/formatting-rules';

const ExplainConceptInputSchema = z.object({
  concept: z.string().describe('The concept or question to be explained.'),
});
export type ExplainConceptInput = z.infer<typeof ExplainConceptInputSchema>;

const ExplainConceptOutputSchema = z.object({
  explanation: z.string().describe('The generated explanation in structured markdown format.'),
});
export type ExplainConceptOutput = z.infer<typeof ExplainConceptOutputSchema>;

export async function explainConcept(input: ExplainConceptInput): Promise<ExplainConceptOutput> {
  const result = await explainConceptFlow(input);
  return { explanation: result.explanation };
}

const prompt = ai.definePrompt({
  name: 'explainConceptPrompt',
  input: {schema: ExplainConceptInputSchema},
  output: {schema: ExplainConceptOutputSchema},
  prompt: `You are an expert educator capable of explaining complex concepts clearly and concisely for various learning levels and styles.
${aiContentGenerationRules}

User Input:
- Concept: {{{concept}}}
- Target Audience: A general audience with no prior knowledge.

Processing Steps:
1. Define the Concept: Provide a clear, straightforward definition.
2. Explain in Simple Terms: Break down the concept into its core components using accessible language.
3. Provide Analogies/Metaphors: Offer 1-2 relatable analogies to help build understanding.
4. Give Concrete Examples: Provide 1-3 real-world or hypothetical examples.
5. Break it Down (Optional/If Complex): For more intricate concepts, offer a bulleted list of key steps, components, or principles.
6. Consider Different Levels: Adjust the language, complexity of examples, and depth of explanation based on the specified audience.

Format the output as a single block of text using the following section headers:
- A. Concept Name
- B. Definition
- C. Simple Explanation
- D. Analogy
- E. Examples
- F. Key Components (Optional)
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
