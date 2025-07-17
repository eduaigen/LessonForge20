
'use server';
/**
 * @fileOverview An AI flow for generating a Regents-style test for U.S. History & Government.
 */
import { ai } from '@/ai/genkit';
import {
  GenerateSocialStudiesTestInputSchema,
  GenerateSocialStudiesTestOutputSchema,
  type GenerateSocialStudiesTestInput,
  type GenerateSocialStudiesTestOutput,
} from '../schemas/social-studies-test-schemas';

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
  name: 'generateUSHistoryTestPrompt',
  input: { schema: GenerateSocialStudiesTestInputSchema },
  output: { schema: GenerateSocialStudiesTestOutputSchema },
  prompt: `You are an expert high school U.S. History teacher and assessment writer for the NYS U.S. History & Government curriculum. Your task is to generate a comprehensive, multi-part test based on specific curriculum lessons.

**User Provided Context:**
- **Lessons**: {{{lessons}}}
- **Desired DOK Level**: {{{dokLevel}}}
- **Number of Multiple Choice Questions**: {{{mcqCount}}}
- **Number of CRQ Sets**: {{{crqCount}}}
- **Number of DBQ Documents**: {{{dbqDocCount}}}

**CRITICAL INSTRUCTIONS:**
1.  Your primary task is to generate a JSON object that precisely matches the specified counts for each part of the test. Do not deviate.
2.  All stimulus material, including for multiple-choice questions and documents, MUST be text-based. You can use direct quotes, excerpts from historical texts, or descriptions of data tables. DO NOT create stimuli that require a visual diagram or map.
3.  You MUST generate EXACTLY {{{mcqCount}}} multiple-choice questions for Part I. This is a non-negotiable requirement.
4.  All generated content must be complete and fully written out. No placeholders.
5.  Generate a set of clear, student-facing instructions for taking the test.
6.  You MUST create a complete and thorough answer key for all parts of the test.

**Part I: Multiple Choice**
- Generate EXACTLY {{{mcqCount}}} stimulus-based multiple-choice questions.
- Each question must have a unique, text-based stimulus and four complete answer options.
- The answer key for this section must contain the correct letter for each question.

**Part II: Constructed-Response Questions (CRQs)**
- Generate EXACTLY {{{crqCount}}} unique CRQ sets.
- Each set must contain 1-2 fully-written, text-based documents. The document length should vary, from short quotes to longer passages of 200-500 words.
- Each set must have exactly 3 scaffolded questions.
- **Answer Key:** Provide a detailed, high-quality sample answer for each of the 3 questions in each CRQ set.

**Part III: Document-Based Question (DBQ)**
- Generate ONE DBQ essay prompt.
- Create EXACTLY {{{dbqDocCount}}} authentic, relevant, fully-written text-based documents to support the prompt. The document length should vary significantly, from short quotes to longer passages of 200-500 words.
- **Answer Key:** Write a detailed sample essay that answers the prompt, citing the documents and incorporating outside information.

Your final output MUST be a single, complete JSON object that strictly follows the output schema.
`,
});

const generateUSHistoryTestFlow = ai.defineFlow(
  {
    name: 'generateUSHistoryTestFlow',
    inputSchema: GenerateSocialStudiesTestInputSchema,
    outputSchema: GenerateSocialStudiesTestOutputSchema,
    timeout: 300000, // 5 minutes
  },
  async (input) => {
    const result = await withRetry(() => prompt(input));
    const { output } = result;
    if (!output) {
      throw new Error('The AI failed to generate a test. Please try again.');
    }
    return output;
  }
);

export async function generateUSHistoryTest(
  input: GenerateSocialStudiesTestInput
): Promise<GenerateSocialStudiesTestOutput> {
  return await generateUSHistoryTestFlow(input);
}
