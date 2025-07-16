
'use server';
/**
 * @fileOverview An AI flow for generating a study sheet from an ELL test.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { TestStudySheetOutputSchema } from '../schemas/test-study-sheet-schemas';
import { ELLStudySheetInputSchema } from '../schemas/ell-study-sheet-schemas';

const prompt = ai.definePrompt({
  name: 'generateELLStudySheetPrompt',
  input: { schema: z.object({ originalTest: z.string() }) },
  output: { schema: TestStudySheetOutputSchema },
  prompt: `You are an expert ELL teacher creating a study guide for an upcoming test.

Your task is to analyze the provided test and extract the most critical information to create a clear, concise, and effective study sheet for English Language Learners.

**Original Test:**
\`\`\`json
{{{originalTest}}}
\`\`\`

**Instructions:**
1.  **Analyze the Entire Test:** Read through all passages, questions, and prompts to identify the core concepts and skills being assessed.
2.  **Create a Title:** The title should be "Study Sheet: [Original Test Title]".
3.  **Extract Key Concepts:** Based on the test content, identify and explain in simple terms 3-5 key concepts or skills (e.g., "Finding the Main Idea," "Understanding the Author's Feelings," "Using Details to Answer Questions").
4.  **Identify Key Vocabulary:** From the reading and listening passages, pull out 8-10 of the most important vocabulary words. For each word, provide a simple, student-friendly definition and an example sentence.
5.  **Formulate Essential Questions:** Based on the writing prompt in Part 3, generate 2-3 "I can..." statements that describe what students should be able to do in their writing (e.g., "I can state my opinion clearly," "I can use one example from the story to support my opinion.").

Generate a complete and detailed study sheet based *only* on the provided test content, using simple and clear language.`,
});

const generateELLStudySheetFlow = ai.defineFlow(
  {
    name: 'generateELLStudySheetFlow',
    inputSchema: ELLStudySheetInputSchema,
    outputSchema: TestStudySheetOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({
      originalTest: JSON.stringify(input.originalTest),
    });
    if (!output) {
      throw new Error('The AI failed to generate the ELL study sheet. Please try again.');
    }
    return output;
  }
);

export async function generateELLStudySheet(input: z.infer<typeof ELLStudySheetInputSchema>): Promise<TestStudySheetOutput> {
  return await generateELLStudySheetFlow(input);
}
