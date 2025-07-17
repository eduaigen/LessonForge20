
'use server';
/**
 * @fileOverview An AI flow for generating a test for English Language Learners.
 */
import { ai } from '@/ai/genkit';
import {
  GenerateELLTestInputSchema,
  GenerateELLTestOutputSchema,
  type GenerateELLTestInput,
  type GenerateELLTestOutput,
} from '../schemas/ell-test-schemas';

async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      if (err.message?.includes("503") || err.message?.includes("model is overloaded")) {
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
  name: 'generateELLTestPrompt',
  input: { schema: GenerateELLTestInputSchema },
  output: { schema: GenerateELLTestOutputSchema },
  prompt: `You are an expert educator specializing in creating assessments for high school English Language Learners (ELLs). Your task is to generate a comprehensive, three-part test that is accessible and assesses key language skills.

**CRITICAL INSTRUCTIONS:**
1.  **Use Simple Language:** All generated content (instructions, passages, questions, prompts) must use clear, simple, and accessible language suitable for high school ELLs.
2.  **Provide Scaffolding:** Build in scaffolds like sentence starters, visual aid descriptions, and clear vocabulary support.
3.  All generated content must be complete and fully written out. No placeholders.
4.  Your final output MUST be a single, complete JSON object that strictly follows the output schema.

**User Provided Context:**
- **Lessons**: {{{lessons}}}

---

**Part 1: Listening Comprehension**
- Generate a script for a short audio passage (150-200 words) on a high-interest topic. The script should use clear pronunciation and a moderate pace.
- Generate FIVE multiple-choice questions based on the listening script. Questions should test for main ideas and key details.

**Part 2: Reading Comprehension**
- Generate a reading passage (250-350 words) on a different high-interest topic. The passage must be broken into short, manageable paragraphs.
- Provide a text description for a helpful visual aid (like a simple chart or diagram) that supports the reading passage.
- Generate FIVE multiple-choice questions based on the reading passage.
- Generate THREE vocabulary questions that ask students to identify the meaning of a word from the passage in context.

**Part 3: Writing**
- Create a writing prompt that is directly related to the reading passage in Part 2.
- Provide 2-3 sentence starters to help students begin their written response.
- Write a short, high-quality sample response that demonstrates a clear answer to the prompt.
`,
});

const generateELLTestFlow = ai.defineFlow(
  {
    name: 'generateELLTestFlow',
    inputSchema: GenerateELLTestInputSchema,
    outputSchema: GenerateELLTestOutputSchema,
    timeout: 300000, // 5 minutes
  },
  async (input) => {
    const result = await withRetry(() => prompt(input));
    const { output } = result;
    if (!output) {
      throw new Error('The AI failed to generate an ELL test. Please try again.');
    }
    return output;
  }
);

export async function generateELLTest(
  input: GenerateELLTestInput
): Promise<GenerateELLTestOutput> {
  return await generateELLTestFlow(input);
}
