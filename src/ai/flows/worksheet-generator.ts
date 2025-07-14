
'use server';
/**
 * @fileOverview An AI flow for generating a student-facing worksheet from a lesson plan.
 */
import { ai } from '@/ai/genkit';
import { z } from 'genkit';
import { GenerateNVBiologyLessonOutputSchema } from '../schemas/nv-biology-lesson-schemas';

export const WorksheetGeneratorInputSchema = GenerateNVBiologyLessonOutputSchema;
export const WorksheetGeneratorOutputSchema = z.object({
  worksheetContent: z.string().describe('The full content of the student-facing worksheet in Markdown format.'),
});

export type WorksheetGeneratorInput = z.infer<typeof WorksheetGeneratorInputSchema>;
export type WorksheetGeneratorOutput = z.infer<typeof WorksheetGeneratorOutputSchema>;

const prompt = ai.definePrompt({
  name: 'worksheetGeneratorPrompt',
  input: { schema: WorksheetGeneratorInputSchema },
  output: { schema: WorksheetGeneratorOutputSchema },
  prompt: `You are an expert instructional designer tasked with creating a student-facing worksheet from a teacher's lesson plan.

**Instructions:**
1.  Scan the entire provided lesson plan JSON object.
2.  Transform the lesson plan into a clear, well-structured, student-facing worksheet in Markdown format.
3.  Include a header for Name, Class, and Date at the top of the worksheet.
4.  The worksheet must include all questions, readings, data tables, visuals, and tasks from the lesson plan.
5.  Where students are expected to answer, provide clear response areas (e.g., "Answer:__________", or several blank lines for longer responses).
6.  Format the content to be clean, organized, and easy for a student to follow. Use Markdown headings, lists, and bold text to create a clear visual hierarchy.
7.  All referenced content (readings, charts, models) MUST be embedded directly in the worksheet.

**Lesson Plan Data:**
\`\`\`json
{{{jsonStringify input}}}
\`\`\`

Generate the complete worksheet content based on these instructions.`,
});

const worksheetGeneratorFlow = ai.defineFlow(
  {
    name: 'worksheetGeneratorFlow',
    inputSchema: WorksheetGeneratorInputSchema,
    outputSchema: WorksheetGeneratorOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({ input, jsonStringify: JSON.stringify });
    if (!output) {
      throw new Error('The AI failed to generate the worksheet. Please try again.');
    }
    return output;
  }
);

export async function generateWorksheet(input: WorksheetGeneratorInput): Promise<WorksheetGeneratorOutput> {
  return await worksheetGeneratorFlow(input);
}
