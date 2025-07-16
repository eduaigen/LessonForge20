
'use server';
/**
 * @fileOverview An AI flow for generating a Regents-style test for ELA.
 */
import { ai } from '@/ai/genkit';
import {
  GenerateELATestInputSchema,
  GenerateELATestOutputSchema,
  type GenerateELATestInput,
  type GenerateELATestOutput,
} from '../schemas/ela-test-schemas';

const prompt = ai.definePrompt({
  name: 'generateELATestPrompt',
  input: { schema: GenerateELATestInputSchema },
  output: { schema: GenerateELATestOutputSchema },
  prompt: `You are an expert high school English teacher and assessment writer for the NYS ELA Regents exam. Your task is to generate a comprehensive, three-part test based on a provided list of lessons and specified question counts.

**CRITICAL INSTRUCTIONS:**
1.  **Language**: Generate all text content in **{{{language}}}**. If the language is "Bilingual", provide the English text first, followed by an exact, word-for-word Spanish translation on a new line and in italics.
2.  All generated passages and questions must be complete and fully written out. No placeholders.
3.  The content should be appropriate for a 9th-12th grade reading level.
4.  Your final output MUST be a single, complete JSON object that strictly follows the output schema.
5.  You MUST create a complete and thorough answer key for all parts of the test.

**User Provided Context:**
- **Lessons**: {{{lessons}}}
- **Number of Reading Passages**: {{{passageCount}}} (Generate 8 MCQs per passage)
- **Number of Argument Essay Sources**: {{{sourceCount}}}
- **Language**: {{{language}}}

---

**Part 1: Reading Comprehension**
- Generate EXACTLY {{{passageCount}}} unique reading passages.
- **Passage Types:** Create a mix of literary text (e.g., short story excerpt), a poem, and informational text (e.g., article, essay).
- For EACH passage, generate EXACTLY EIGHT multiple-choice questions, for a total of {{{passageCount}}} * 8 questions.
- The questions should assess a range of skills: word meaning, literary devices, central idea, author's purpose, and inference.
- The answer key for this section must contain the correct letter for each multiple-choice question.

**Part 2: Writing from Sources - Argument Essay**
- Generate a compelling and debatable prompt related to the themes in the provided lessons.
- Generate EXACTLY {{{sourceCount}}} diverse, text-based sources that provide different perspectives on the prompt. These can be short excerpts from articles, speeches, or infographics described in text.
- **Answer Key:** Write a detailed, high-quality sample essay that develops a clear claim and supports it with evidence from at least three of the generated sources.

**Part 3: Text Analysis Response**
- Generate ONE complete literary or informational text (approximately 400-600 words).
- Create a prompt that asks students to identify a central idea and analyze how a specific writing strategy (e.g., figurative language, characterization, point of view) develops that idea.
- **Answer Key:** Write a detailed, high-quality sample response (2-3 paragraphs) that correctly identifies a central idea and analyzes the writing strategy with specific evidence from the text.
`,
});

const generateELATestFlow = ai.defineFlow(
  {
    name: 'generateELATestFlow',
    inputSchema: GenerateELATestInputSchema,
    outputSchema: GenerateELATestOutputSchema,
    timeout: 300000, // 5 minutes
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to generate an ELA test. Please try again.');
    }
    return output;
  }
);

export async function generateELATest(
  input: GenerateELATestInput
): Promise<GenerateELATestOutput> {
  return await generateELATestFlow(input);
}
