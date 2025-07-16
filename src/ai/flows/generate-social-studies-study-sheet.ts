
'use server';
/**
 * @fileOverview An AI flow for generating a study sheet from a social studies test.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { TestStudySheetOutputSchema } from '../schemas/test-study-sheet-schemas';
import { GenerateSocialStudiesTestOutputSchema } from '../schemas/social-studies-test-schemas';

const SocialStudiesStudySheetInputSchema = z.object({
  originalTest: GenerateSocialStudiesTestOutputSchema.describe("The original social studies test object to create a study sheet from."),
});
export type SocialStudiesStudySheetInput = z.infer<typeof SocialStudiesStudySheetInputSchema>;

const prompt = ai.definePrompt({
  name: 'generateSocialStudiesStudySheetPrompt',
  input: { schema: z.object({ originalTest: z.string() }) },
  output: { schema: TestStudySheetOutputSchema },
  prompt: `You are an expert high school social studies teacher creating a study guide for an upcoming Regents-style test.

Your task is to analyze the provided test and extract the most critical information to create a concise and effective study sheet for students. You must use the provided test and its associated documents as the sole source of information.

**Original Test:**
\`\`\`json
{{{originalTest}}}
\`\`\`

**Instructions:**
1.  **Analyze the Entire Test:** Read through all stimuli, documents, questions, and sample answers to identify the core historical concepts, events, figures, skills, and standards being assessed.
2.  **Create a Title:** The title should be "Study Sheet: [Original Test Title]".
3.  **Extract Key Concepts:** Synthesize the information from all parts of the test. Identify and list the 5-7 most important historical concepts or "big ideas" (e.g., "Causes of the French Revolution," "Impact of Industrialization on Society," "Containment Policy during the Cold War"). These should be clear, student-friendly explanations.
4.  **Identify Key Vocabulary/Terms:** From the test content, pull out the most critical Tier 3 vocabulary and historical terms (e.g., "Mercantilism," "Social Contract," "Appeasement"). Provide a student-friendly definition for each.
5.  **Formulate Essential Questions:** Based on the CRQ and DBQ prompts, generate 3-5 high-level "essential questions" that frame the main ideas of the test. These questions should guide student studying and require them to synthesize information and form arguments.

Generate a complete and detailed study sheet based *only* on the provided test content.`,
});

const generateSocialStudiesStudySheetFlow = ai.defineFlow(
  {
    name: 'generateSocialStudiesStudySheetFlow',
    inputSchema: SocialStudiesStudySheetInputSchema,
    outputSchema: TestStudySheetOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({
      originalTest: JSON.stringify(input.originalTest),
    });
    if (!output) {
      throw new Error('The AI failed to generate the study sheet. Please try again.');
    }
    return output;
  }
);

export async function generateSocialStudiesStudySheet(input: SocialStudiesStudySheetInput): Promise<TestStudySheetOutput> {
  return await generateSocialStudiesStudySheetFlow(input);
}
