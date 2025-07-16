
'use server';
/**
 * @fileOverview An AI flow for generating a Regents-style test for Global History I.
 */
import { ai } from '@/ai/genkit';
import {
  GenerateSocialStudiesTestInputSchema,
  GenerateSocialStudiesTestOutputSchema,
  type GenerateSocialStudiesTestInput,
  type GenerateSocialStudiesTestOutput,
} from '../schemas/social-studies-test-schemas';

const prompt = ai.definePrompt({
  name: 'generateGlobalHistory1TestPrompt',
  input: { schema: GenerateSocialStudiesTestInputSchema },
  output: { schema: GenerateSocialStudiesTestOutputSchema },
  prompt: `You are an expert high school Global History teacher and assessment writer for the NYS Global History & Geography I curriculum. Your task is to generate a comprehensive, multi-part test based on specific curriculum units.

**User Provided Context:**
- **Units**: {{{units}}}
- **Desired DOK Level**: {{{dokLevel}}}
- **Number of Multiple Choice Questions**: {{{mcqCount}}}
- **Number of CRQ Sets**: {{{crqCount}}}
- **Number of DBQ Documents**: {{{dbqDocCount}}}

**CRITICAL INSTRUCTIONS:**
1.  Your primary task is to generate a JSON object that precisely matches the specified counts for each part of the test. Do not deviate.
2.  All stimulus material, including for multiple-choice questions and documents, MUST be text-based. You can use direct quotes, excerpts from historical texts, or descriptions of data tables. DO NOT create stimuli that require a visual diagram or map.

**Part I: Multiple Choice**
- Generate EXACTLY {{{mcqCount}}} stimulus-based multiple-choice questions.
- Each question must have a unique, text-based stimulus and four complete answer options.

**Part II: Constructed-Response Questions (CRQs)**
- Generate EXACTLY {{{crqCount}}} unique CRQ sets.
- Each set must contain 1-2 fully-written, text-based documents and exactly 3 scaffolded questions:
    1.  A question about the historical context or point of view of a document.
    2.  A question requiring a historical thinking skill (e.g., cause/effect, turning point, comparison) using both documents.
    3.  A question requiring synthesis or analysis of reliability.

**Part III: Document-Based Question (DBQ)**
- Generate ONE DBQ essay prompt.
- Create EXACTLY {{{dbqDocCount}}} authentic, relevant, fully-written text-based documents to support the prompt.
- Write a detailed sample essay that answers the prompt, citing the documents and incorporating outside information.

Your final output MUST be a single, complete JSON object that strictly follows the output schema.
`,
});

const generateGlobalHistory1TestFlow = ai.defineFlow(
  {
    name: 'generateGlobalHistory1TestFlow',
    inputSchema: GenerateSocialStudiesTestInputSchema,
    outputSchema: GenerateSocialStudiesTestOutputSchema,
    timeout: 300000, // 5 minutes
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to generate a test. Please try again.');
    }
    return output;
  }
);

export async function generateGlobalHistory1Test(
  input: GenerateSocialStudiesTestInput
): Promise<GenerateSocialStudiesTestOutput> {
  return await generateGlobalHistory1TestFlow(input);
}
