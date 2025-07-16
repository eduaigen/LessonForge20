
'use server';
/**
 * @fileOverview An AI flow for generating a study sheet from a science test.
 */
import { ai } from '@/ai/genkit';
import { jsonStringify } from 'genkit/tools';
import {
  TestStudySheetInputSchema,
  TestStudySheetOutputSchema,
  type TestStudySheetInput,
  type TestStudySheetOutput,
} from '../schemas/test-study-sheet-schemas';

const prompt = ai.definePrompt({
  name: 'generateTestStudySheetPrompt',
  input: { schema: TestStudySheetInputSchema },
  output: { schema: TestStudySheetOutputSchema },
  prompt: `You are an expert high school science teacher creating a study guide for an upcoming test.

Your task is to analyze the provided test and extract the most critical information to create a concise and effective study sheet for students. You must use the provided test and its associated curriculum standards as the sole source of information.

**Original Test:**
\`\`\`json
{{{jsonStringify originalTest}}}
\`\`\`

**Instructions:**
1.  **Analyze the Entire Test:** Read through all phenomenon passages, questions, and answer keys to identify the core content, skills, and standards being assessed.
2.  **Create a Title:** The title should be "Study Sheet: [Original Test Title]".
3.  **Extract Key Concepts:** Synthesize the information from all clusters. Identify and list the 5-7 most important scientific concepts or "big ideas" that students need to understand to succeed on the test. These should be clear, student-friendly explanations.
4.  **Identify Key Vocabulary:** From the passages and questions, pull out the most critical Tier 3 vocabulary terms. Provide a student-friendly definition for each.
5.  **Formulate Essential Questions:** Based on the test questions (especially the short response and CER), generate 3-5 high-level "essential questions" that frame the main ideas of the test. These questions should guide student studying and require them to apply their knowledge.

Generate a complete and detailed study sheet based *only* on the provided test content.`,
});

const generateTestStudySheetFlow = ai.defineFlow(
  {
    name: 'generateTestStudySheetFlow',
    inputSchema: TestStudySheetInputSchema,
    outputSchema: TestStudySheetOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({ ...input, jsonStringify });
    if (!output) {
      throw new Error('The AI failed to generate the study sheet. Please try again.');
    }
    return output;
  }
);

export async function generateTestStudySheet(input: TestStudySheetInput): Promise<TestStudySheetOutput> {
  return await generateTestStudySheetFlow(input);
}
