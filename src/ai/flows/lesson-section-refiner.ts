
'use server';
/**
 * @fileOverview An AI flow for refining a specific section of a lesson plan.
 */
import { ai } from '@/ai/genkit';
import {
    LessonSectionRefinerInputSchema,
    LessonSectionRefinerOutputSchema,
    type LessonSectionRefinerInput,
    type LessonSectionRefinerOutput
} from '../schemas/lesson-section-refiner-schemas';

const prompt = ai.definePrompt({
  name: 'lessonSectionRefinerPrompt',
  input: { schema: LessonSectionRefinerInputSchema },
  output: { schema: LessonSectionRefinerOutputSchema },
  prompt: `You are an expert instructional coach. Your task is to revise a specific section of a 5E lesson plan based on a teacher's request.

**Context:**
- You are editing the "{{sectionName}}" section of a lesson plan.
- The teacher wants you to make the following change: "{{userPrompt}}"

**Current Section Content (JSON):**
\`\`\`json
{{{sectionContent}}}
\`\`\`

**Instructions:**
1.  Analyze the current content of the section and the user's prompt.
2.  Rewrite the content to incorporate the requested changes while maintaining the pedagogical integrity and the original JSON structure for that section.
3.  Ensure your output is a valid JSON object that matches the schema of the original section content. Do not add fields that were not there originally.
4.  Return the revised content in the 'revisedContent' field.
`,
});

const lessonSectionRefinerFlow = ai.defineFlow(
  {
    name: 'lessonSectionRefinerFlow',
    inputSchema: LessonSectionRefinerInputSchema,
    outputSchema: LessonSectionRefinerOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output || !output.revisedContent) {
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
