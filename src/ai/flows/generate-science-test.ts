
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

**CRITICAL INSTRUCTIONS:**
- You MUST use the provided 'curriculumContent' as your ONLY source of information.
- All questions, stimuli (passages, data tables), and concepts must be directly derived from the topics, lessons, and standards within the provided curriculum content. Do not invent content or topics.
- Ensure all questions align with the specified DOK level.
- DOK 1: Recall & Reproduction. Simple facts, definitions.
- DOK 2: Skills & Concepts. Making connections, applying rules.
- DOK 3: Strategic Thinking. Reasoning, planning, using evidence to justify a claim.

**User-Provided Context:**
- **Subject**: {{{subject}}}
- **Number of Question Clusters**: {{{clusterCount}}}
- **Depth of Knowledge (DOK) Level**: {{{dokLevel}}}
- **Curriculum Content to Use**:
---
{{{curriculumContent}}}
---

**Your response MUST follow this exact JSON structure:**

The root object must have "testTitle", "clusters", and "answerKey".

1.  **"testTitle"** (String): Create a clear title for the test (e.g., "Unit 1 & 3 Assessment: Ecology and Evolution").

2.  **"clusters"** (Array of Objects): Generate exactly {{{clusterCount}}} question clusters. Each cluster object must contain:
    - **"clusterTitle"** (String): A title for the cluster, related to its stimulus and the curriculum topic.
    - **"stimulus"** (String or Object): This MUST be either:
        - A text passage (String) providing a scenario, experiment description, or phenomenon based on the curriculum.
        - A data table object with "title", "headers" (array), and "rows" (array of arrays) based on concepts from the curriculum.
    - **"questions"** (Array of Objects): Generate 2-4 questions per cluster. Each question can be one of two types:
        - **Multiple Choice:** { "question": (String), "options": (Array of 4 Strings), "answer": (String) }
        - **Short Answer:** { "question": (String), "sampleAnswer": (String) }

3.  **"answerKey"** (Array of Objects): Create an answer key. Each object corresponds to a cluster and must contain:
    - **"clusterTitle"** (String): The title of the cluster.
    - **"answers"** (Array of Objects): A list of answers for that cluster. Each answer object must have:
        - **"question"**: (String) The full question text.
        - **"answer"**: (String) The correct answer or sample answer.
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
