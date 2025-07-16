
'use server';
/**
 * @fileOverview An AI flow for generating a science test based on selected units.
 */
import { ai } from '@/ai/genkit';
import {
  GenerateScienceTestInputSchema,
  GenerateScienceTestOutputSchema,
  type GenerateScienceTestInput,
  type GenerateScienceTestOutput,
} from '../schemas/science-test-schemas';

const prompt = ai.definePrompt({
  name: 'generateScienceTestPrompt',
  input: { schema: GenerateScienceTestInputSchema },
  output: { schema: GenerateScienceTestOutputSchema },
  prompt: `You are an expert high school science teacher and assessment writer. Your task is to generate a comprehensive test based on specific curriculum units.

The user has provided the following context:
- **Subject**: {{{subject}}}
- **Units**: {{{units}}}
- **Number of Question Clusters**: {{{clusterCount}}}
- **Depth of Knowledge (DOK) Level**: {{{dokLevel}}}

Based on this context, generate a test with a mix of stimulus-based question clusters. All questions must be directly relevant to the provided units and aligned with the specified DOK level.

Your response MUST follow this exact JSON structure:

**JSON STRUCTURE:**

The root object must have "testTitle", "clusters", and "answerKey".

1.  **"testTitle"** (String): Create a clear title for the test (e.g., "Unit 1 & 3 Assessment: Ecology and Evolution").

2.  **"clusters"** (Array of Objects): Generate exactly {{{clusterCount}}} question clusters. Each cluster object must contain:
    - **"clusterTitle"** (String): A title for the cluster, related to its stimulus.
    - **"stimulus"** (String or Object): This MUST be either:
        - A text passage (String) providing a scenario, experiment description, or phenomenon.
        - A data table object with "title", "headers" (array), and "rows" (array of arrays).
    - **"questions"** (Array of Objects): Generate 2-4 questions per cluster. Each question can be one of two types:
        - **Multiple Choice:** { "question": (String), "options": (Array of 4 Strings), "answer": (String) }
        - **Short Answer:** { "question": (String), "sampleAnswer": (String) }

3.  **"answerKey"** (Array of Objects): Create an answer key. Each object corresponds to a cluster and must contain:
    - **"clusterTitle"** (String): The title of the cluster.
    - **"answers"** (Array of Objects): A list of answers for that cluster. Each answer object must have:
        - **"question"**: (String) The full question text.
        - **"answer"**: (String) The correct answer or sample answer.

**CRITICAL INSTRUCTIONS:**
- Ensure all questions align with the specified DOK level.
- DOK 1: Recall & Reproduction. Simple facts, definitions.
- DOK 2: Skills & Concepts. Making connections, applying rules.
- DOK 3: Strategic Thinking. Reasoning, planning, using evidence to justify a claim.
- The content for all questions and stimuli MUST be derived from the topics within the provided units.
`,
});

const generateScienceTestFlow = ai.defineFlow(
  {
    name: 'generateScienceTestFlow',
    inputSchema: GenerateScienceTestInputSchema,
    outputSchema: GenerateScienceTestOutputSchema,
    timeout: 180000, // 3 minutes
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to generate a test. Please try again.');
    }
    return output;
  }
);

export async function generateScienceTest(
  input: GenerateScienceTestInput
): Promise<GenerateScienceTestOutput> {
  return await generateScienceTestFlow(input);
}
