
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

async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      if (err.message?.includes("503") || err.message?.includes("model is overloaded") || err.message?.includes("An unexpected response was received from the server")) {
        if (i === retries - 1) {
          throw new Error("The AI model is temporarily overloaded. Please try again in a few moments.");
        }
        await new Promise(res => setTimeout(res, delay * (i + 1)));
      } else {
        throw err; // Non-retryable error
      }
    }
  }
  throw new Error("Operation failed after multiple retries.");
}


const prompt = ai.definePrompt({
  name: 'generateELATestPrompt',
  input: { schema: GenerateELATestInputSchema },
  output: { schema: GenerateELATestOutputSchema },
  prompt: `You are an expert high school English teacher and assessment writer for the NYS ELA Regents exam. Your task is to generate a comprehensive, three-part test based on a provided list of lessons and specified question counts.

**CRITICAL INSTRUCTIONS:**
1.  All generated passages and questions must be complete and fully written out. No placeholders.
2.  The content should be appropriate for a 9th-12th grade reading level.
3.  Your final output MUST be a single, complete JSON object that strictly follows the output schema.
4.  You MUST create a complete and thorough answer key for all parts of the test.
5.  For Part 1, you MUST generate EXACTLY {{{passageCount}}} passages, and each passage MUST have EXACTLY 8 multiple-choice questions. This is a non-negotiable requirement.

**Part 1: Reading Comprehension**
- Generate EXACTLY {{{passageCount}}} unique reading passages.
- **Passage Types:** Create a mix of literary text (e.g., short story excerpt), a poem, and informational text (e.g., article, essay).
- For EACH passage, generate EXACTLY EIGHT multiple-choice questions, for a total of {{{passageCount}}} * 8 questions.
- Each multiple-choice question must have four complete answer options. Each option should be the text of the answer, without any prefix like "A." or "1.".
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
    const result = await withRetry(() => prompt(input));
    const { output } = result;
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
