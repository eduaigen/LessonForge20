
'use server';
/**
 * @fileOverview An AI flow for generating a study sheet from a math test.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { TestStudySheetOutputSchema } from '../schemas/test-study-sheet-schemas';
import { GenerateMathTestOutputSchema } from '../schemas/math-test-schemas';
import { MathStudySheetInputSchema } from '../schemas/math-test-modification-schemas';

const prompt = ai.definePrompt({
  name: 'generateMathStudySheetPrompt',
  input: { schema: z.object({ originalTest: z.string() }) },
  output: { schema: TestStudySheetOutputSchema },
  prompt: `You are an expert high school math teacher creating a study guide for an upcoming Regents-style test.

Your task is to analyze the provided test and extract the most critical information to create a concise and effective study sheet for students. All mathematical expressions MUST be wrapped in LaTeX.

**Original Test:**
\`\`\`json
{{{originalTest}}}
\`\`\`

**Instructions:**
1.  **Analyze the Entire Test:** Read through all questions and sample answers to identify the core mathematical concepts, formulas, skills, and standards being assessed.
2.  **Create a Title:** The title should be "Study Sheet: [Original Test Title]".
3.  **Extract Key Concepts & Formulas:** Synthesize the information from all parts of the test. Identify and list the 5-7 most important formulas or "big ideas" (e.g., "The Quadratic Formula: $$x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$$", "Pythagorean Theorem: $$a^2 + b^2 = c^2$$", "Slope-Intercept Form: $$y=mx+b$$"). For each, provide a brief, 1-2 sentence explanation of when and how it's used.
4.  **Identify Key Vocabulary/Terms:** From the test questions, pull out the most critical Tier 3 vocabulary and mathematical terms (e.g., "Vertex," "Asymptote," "Congruent," "Dilation"). Provide a student-friendly definition for each.
5.  **Formulate Practice Problems:** Based on the test questions, generate 3-5 high-level practice problems that are similar in style but not identical to the test questions. These should cover the main skills assessed in the test. Do not provide answers for these.

Generate a complete and detailed study sheet based *only* on the provided test content.`,
});

const generateMathStudySheetFlow = ai.defineFlow(
  {
    name: 'generateMathStudySheetFlow',
    inputSchema: MathStudySheetInputSchema,
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

export async function generateMathStudySheet(input: z.infer<typeof MathStudySheetInputSchema>): Promise<TestStudySheetOutput> {
  return await generateMathStudySheetFlow(input);
}
