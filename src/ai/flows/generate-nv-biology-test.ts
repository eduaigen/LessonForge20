
'use server';
/**
 * @fileOverview An AI flow for generating a test for the New Visions Biology curriculum.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import {
  GenerateNVBiologyTestInputSchema,
  GenerateNVBiologyTestOutputSchema,
  type GenerateNVBiologyTestInput,
  type GenerateNVBiologyTestOutput,
} from '../schemas/nv-biology-test-schemas';

const prompt = ai.definePrompt({
  name: 'generateNVBiologyTestPrompt',
  input: { schema: GenerateNVBiologyTestInputSchema },
  output: { schema: GenerateNVBiologyTestOutputSchema },
  prompt: `You are an expert high school biology teacher and assessment writer. Your task is to generate a comprehensive test based on a specific topic from the New Visions for Public Schools Biology curriculum.

The user has provided the following context:
- **Unit**: {{{unit}}}
- **Topic**: {{{topic}}}
- **Number of Questions**: {{{questionCount}}}

Based on this context, generate a test with a mix of question types. All questions must be directly relevant to the provided topic.

Your response MUST follow this exact JSON structure:

**JSON STRUCTURE:**

The root object should have "testTitle", "multipleChoiceQuestions", "shortAnswerQuestions", and "answerKey".

1.  **"testTitle"** (String): Create a clear title for the test (e.g., "Test: Gas Exchange and Cellular Respiration").

2.  **"multipleChoiceQuestions"** (Array of Objects): Generate a set of multiple-choice questions. Each object must have:
    - "question": (String) The full question text.
    - "options": (Array of 4 Strings) The four answer choices.
    - "answer": (String) The correct answer choice.

3.  **"shortAnswerQuestions"** (Array of Objects): Generate a set of short-answer questions. Each object must have:
    - "question": (String) The full question text.
    - "sampleAnswer": (String) A high-quality, complete sample answer.

4.  **"answerKey"** (Object): An object containing the answers.
    - "multipleChoice": (Array of Strings) List of correct answers for the MCQs in order.
    - "shortAnswer": (Array of Strings) List of the sample answers for the short-answer questions in order.

**Instructions:**
- Generate half of the total 'questionCount' as multiple-choice and half as short-answer. For example, if 'questionCount' is 10, generate 5 MCQ and 5 short-answer questions.
- Ensure all questions are appropriate for a high school biology level and directly assess understanding of the specified topic.
- The answer key must be complete and accurate.
`,
});

const generateNVBiologyTestFlow = ai.defineFlow(
  {
    name: 'generateNVBiologyTestFlow',
    inputSchema: GenerateNVBiologyTestInputSchema,
    outputSchema: GenerateNVBiologyTestOutputSchema,
    timeout: 120000, // 2 minutes
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to generate a test. Please try again.');
    }
    return output;
  }
);

export async function generateNVBiologyTest(
  input: GenerateNVBiologyTestInput
): Promise<GenerateNVBiologyTestOutput> {
  return await generateNVBiologyTestFlow(input);
}
