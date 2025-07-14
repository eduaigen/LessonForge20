
'use server';
/**
 * @fileOverview An AI flow for generating a student-facing worksheet from a lesson plan.
 */
import { ai } from '@/ai/genkit';
import { jsonStringify } from 'genkit';
import { WorksheetGeneratorInputSchema, WorksheetGeneratorOutputSchema, type WorksheetGeneratorInput, type WorksheetGeneratorOutput } from '../schemas/worksheet-generator-schemas';

const prompt = ai.definePrompt({
  name: 'worksheetGeneratorPrompt',
  input: { schema: z.object({ input: WorksheetGeneratorInputSchema }) },
  output: { schema: WorksheetGeneratorOutputSchema },
  prompt: `You are an expert instructional designer tasked with creating a student-facing worksheet from a teacher's lesson plan. Your goal is to transform the provided JSON lesson plan into a clear, well-structured, and comprehensive worksheet that a student can use in the classroom.

**Instructions:**
1.  **Scan the Entire Lesson Plan:** Carefully read through every part of the provided JSON lesson plan object, from "I. LESSON OVERVIEW" to "H. HOMEWORK ACTIVITY".
2.  **Student-Facing Transformation:** Convert the teacher-facing plan into a document for students. Rephrase teacher instructions into student-friendly directions. For example, instead of "Teacher will ask students to answer the Do Now question," the worksheet should simply present the "Do Now" question for the student to answer.
3.  **Maintain Structure:** The worksheet's organization must mirror the lesson plan's structure. Create sections for each part of the lesson (e.g., Do Now, Mini-Lesson, Guided Practice, Independent Practice, Homework).
4.  **Extract All Student Materials:**
    *   **Questions:** Include every single question from all sections (Do Now, Concept-Check, CFU, Exit Ticket, etc.).
    *   **Readings & Visuals:** Embed the full text of any reading passages and any SVG diagrams, charts, or data tables directly into the worksheet where they are referenced.
    *   **Tasks:** Reproduce the full prompts for all activities, including the Guided Practice and the Independent Practice (e.g., the CER prompt).
5.  **Create Response Areas:** For every question or task that requires a student response, provide a clear space for them to write. Use lines (e.g., "Answer: __________") for short answers or add multiple blank lines for longer responses.
6.  **Header:** Start the worksheet with a header for Name, Class, and Date.

**Lesson Plan Data:**
\`\`\`json
{{{jsonStringify input}}}
\`\`\`

Generate the complete worksheet content in Markdown format based on these instructions. Ensure every student-facing element from the lesson plan is present and correctly placed.`,
  
  // Register the custom helper
  helpers: {
    jsonStringify,
  },
});

const worksheetGeneratorFlow = ai.defineFlow(
  {
    name: 'worksheetGeneratorFlow',
    inputSchema: WorksheetGeneratorInputSchema,
    outputSchema: WorksheetGeneratorOutputSchema,
  },
  async (input) => {
    // Pass the input object wrapped in another object to match the prompt's input schema
    const { output } = await prompt({ input });
    if (!output) {
      throw new Error('The AI failed to generate the worksheet. Please try again.');
    }
    return output;
  }
);

export async function generateWorksheet(input: WorksheetGeneratorInput): Promise<WorksheetGeneratorOutput> {
  return await worksheetGeneratorFlow(input);
}
