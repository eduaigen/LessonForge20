
'use server';
/**
 * @fileOverview An AI flow for generating a differentiated version of a science lab.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import {
  GenerateLabActivityOutputSchema,
  DifferentiatedLabInputSchema,
} from '../schemas/lab-activity-schemas';

const prompt = ai.definePrompt({
  name: 'generateDifferentiatedLabPrompt',
  input: { schema: z.object({ originalLab: z.string() }) },
  output: { schema: GenerateLabActivityOutputSchema },
  prompt: `You are an expert educator specializing in differentiation for high school science students, particularly for English Language Learners and students with diverse learning needs.

Your task is to revise the provided lab activity to make it more accessible using research-based strategies.

**Original Lab:**
\`\`\`json
{{{originalLab}}}
\`\`\`

**Instructions for Differentiation:**
1.  **Simplify Language:** Review all sections (Phenomenon, Pre-Lab, etc.). Simplify complex sentences and define key Tier 2/3 vocabulary in parentheses.
2.  **Scaffold Key Sections:**
    *   **Testable Question:** Provide a sentence frame to help students formulate their question (e.g., "How does _______ affect _______?").
    *   **Hypothesis:** Provide an "If... then... because..." sentence frame.
    *   **Procedure:** Add 2-3 guiding questions or hints within the procedure design section to help students structure their experimental steps.
    *   **Data Collection:** Make the data table more explicit, perhaps with pre-filled examples or clearer column headers.
    *   **Discussion Questions:** Simplify the wording of one of the more complex discussion questions.
3.  **Maintain Rigor:** The goal is to lower the language and executive function barrier, not the scientific rigor. The core investigation should remain the same.
4.  **Preserve Structure:** The output JSON must have the exact same structure as the original lab. Do not add or remove any fields. Update the title to indicate it is a "Differentiated Version."

Generate the complete, differentiated lab based on these instructions.`,
});

const generateDifferentiatedLabFlow = ai.defineFlow(
  {
    name: 'generateDifferentiatedLabFlow',
    inputSchema: DifferentiatedLabInputSchema,
    outputSchema: GenerateLabActivityOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({
      originalLab: JSON.stringify(input.originalLab),
    });
    if (!output) {
      throw new Error(
        'The AI failed to generate the differentiated lab. Please try again.'
      );
    }
    return output;
  }
);

export async function generateDifferentiatedLab(
  input: z.infer<typeof DifferentiatedLabInputSchema>
): Promise<GenerateLabActivityOutput> {
  return await generateDifferentiatedLabFlow(input);
}
