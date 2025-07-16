
'use server';
/**
 * @fileOverview An AI flow for generating a study sheet from an ELA test.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { TestStudySheetOutputSchema } from '../schemas/test-study-sheet-schemas';
import { ELAStudySheetInputSchema } from '../schemas/ela-study-sheet-schemas';

const prompt = ai.definePrompt({
  name: 'generateELAStudySheetPrompt',
  input: { schema: z.object({ originalTest: z.string() }) },
  output: { schema: TestStudySheetOutputSchema },
  prompt: `You are an expert high school ELA teacher creating a study guide for an upcoming Regents-style exam.

Your task is to analyze the provided test and extract the most critical information to create a concise and effective study sheet for students.

**Original Test:**
\`\`\`json
{{{originalTest}}}
\`\`\`

**Instructions:**
1.  **Analyze the Entire Test:** Read through all passages, questions, and prompts to identify the core concepts, literary devices, and skills being assessed.
2.  **Create a Title:** The title should be "Study Sheet: [Original Test Title]".
3.  **Extract Key Concepts:** Based on the multiple-choice questions and essay prompts, identify and define 5-7 key literary terms or rhetorical devices that are central to the test (e.g., "Theme," "Figurative Language," "Author's Purpose," "Irony").
4.  **Identify Key Vocabulary/Terms:** From the reading passages, pull out 5-7 challenging Tier 2 or Tier 3 vocabulary words. Provide a student-friendly definition for each.
5.  **Formulate Essential Questions:** Based on the essay prompts in Part 2 and Part 3, generate 3-5 high-level "essential questions" that frame the main analytical tasks of the test. These questions should guide student studying and require them to synthesize information and form arguments.

Generate a complete and detailed study sheet based *only* on the provided test content.`,
});

const generateELAStudySheetFlow = ai.defineFlow(
  {
    name: 'generateELAStudySheetFlow',
    inputSchema: ELAStudySheetInputSchema,
    outputSchema: TestStudySheetOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({
      originalTest: JSON.stringify(input.originalTest),
    });
    if (!output) {
      throw new Error('The AI failed to generate the ELA study sheet. Please try again.');
    }
    return output;
  }
);

export async function generateELAStudySheet(input: z.infer<typeof ELAStudySheetInputSchema>): Promise<TestStudySheetOutput> {
  return await generateELAStudySheetFlow(input);
}
