
'use server';
/**
 * @fileOverview An AI flow for generating an answer key for a science lab.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { GenerateLabActivityOutputSchema, LabAnswerKeyOutputSchema } from '../schemas/lab-activity-schemas';

export const LabAnswerKeyInputSchema = z.object({
  originalLab: GenerateLabActivityOutputSchema,
});

const prompt = ai.definePrompt({
  name: 'generateLabAnswerKeyPrompt',
  input: { schema: z.object({ originalLab: z.string() }) },
  output: { schema: LabAnswerKeyOutputSchema },
  prompt: `You are an expert high school science teacher creating a comprehensive answer key and teacher guide for an inquiry-based lab activity.

Your task is to analyze the provided lab activity and generate a complete answer key.

**Original Lab Activity:**
\`\`\`json
{{{originalLab}}}
\`\`\`

**Instructions:**
1.  **Title:** The title should be "Answer Key: [Original Lab Title]".
2.  **Pre-Lab Questions:** Provide clear and correct sample answers for all pre-lab questions.
3.  **Testable Question & Hypothesis:** Provide an exemplary, well-formulated testable question and a corresponding hypothesis that aligns with the lab's objectives.
4.  **Procedure:** Do NOT write a procedure. Instead, provide a bulleted list of 3-4 key elements or steps that a successful student-designed procedure should include (e.g., "Should identify an independent and dependent variable," "Must include a control group," "Should specify how and when data is measured.").
5.  **Sample Data:** Based on the expected outcome of the lab, generate a realistic-looking sample data table. The data should be plausible and support the intended conclusion.
6.  **Data Analysis & Conclusion:** Provide a sample analysis of the data you generated. This should include a sample graph description (if applicable) and a well-reasoned conclusion that answers the testable question and references the sample data as evidence.
7.  **Discussion Questions:** Provide thorough, well-explained answers for all discussion questions.

Generate a complete and detailed answer key based on these instructions.`,
});

const generateLabAnswerKeyFlow = ai.defineFlow(
  {
    name: 'generateLabAnswerKeyFlow',
    inputSchema: LabAnswerKeyInputSchema,
    outputSchema: LabAnswerKeyOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({
      originalLab: JSON.stringify(input.originalLab),
    });
    if (!output) {
      throw new Error('The AI failed to generate the lab answer key. Please try again.');
    }
    return output;
  }
);

export async function generateLabAnswerKey(input: z.infer<typeof LabAnswerKeyInputSchema>): Promise<z.infer<typeof LabAnswerKeyOutputSchema>> {
  return await generateLabAnswerKeyFlow(input);
}
