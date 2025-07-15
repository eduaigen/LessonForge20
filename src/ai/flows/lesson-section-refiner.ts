
'use server';
/**
 * @fileOverview An AI flow for refining a specific section of a lesson plan.
 */
import { ai } from '@/ai/genkit';
import {
  LessonSectionRefinerInputSchema,
  LessonSectionRefinerOutputSchema,
  type LessonSectionRefinerInput,
  type LessonSectionRefinerOutput,
} from '../schemas/lesson-section-refiner-schemas';


const prompt = ai.definePrompt({
  name: 'lessonSectionRefinerPrompt',
  input: { schema: LessonSectionRefinerInputSchema },
  output: { schema: LessonSectionRefinerOutputSchema },
  prompt: `You are an expert instructional coach and curriculum designer. Your task is to revise a specific section of a lesson plan based on the user's instructions.

**IMPORTANT:** You MUST only return the content for the revised section. The output must be a valid JSON object that strictly conforms to the structure of the original section content. Do not add extra fields or explanations.

**Lesson Plan Section to Revise:**
- Section Name: {{{sectionName}}}
- Original Content (JSON):
\`\`\`json
{{{originalContent}}}
\`\`\`

**User's Instructions for Revision:**
---
{{{instructions}}}
---

**Your Task:**
1.  Analyze the user's instructions.
2.  Rewrite the JSON content of the specified section according to those instructions.
3.  Ensure your response is a valid JSON object with the exact same structure as the original. For example, if the original content was \`{"question": "What is...", "teacherActions": [...]}\`, your output must also have only the "question" and "teacherActions" keys.
4.  Place the revised, valid JSON content into the 'revisedContent' field of the output.`,
});

const lessonSectionRefinerFlow = ai.defineFlow(
  {
    name: 'lessonSectionRefinerFlow',
    inputSchema: LessonSectionRefinerInputSchema,
    outputSchema: LessonSectionRefinerOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to refine the lesson section. Please try again.');
    }
    return output;
  }
);


export async function refineLessonSection(
  input: LessonSectionRefinerInput
): Promise<LessonSectionRefinerOutput> {
  return await lessonSectionRefinerFlow(input);
}
