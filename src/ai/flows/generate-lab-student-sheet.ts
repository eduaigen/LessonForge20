
'use server';
/**
 * @fileOverview An AI flow for generating a student answer sheet for a lab activity.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { GenerateLabActivityOutputSchema, LabStudentSheetOutputSchema, LabStudentSheetInputSchema } from '../schemas/lab-activity-schemas';


const prompt = ai.definePrompt({
  name: 'generateLabStudentSheetPrompt',
  input: { schema: z.object({ originalLab: z.string() }) },
  output: { schema: LabStudentSheetOutputSchema },
  prompt: `You are an expert curriculum developer. Your task is to transform a detailed lab activity JSON into a structured, student-facing worksheet where they can record their work.

**CRITICAL INSTRUCTIONS:**
1.  Your ONLY source of information is the provided JSON lab activity.
2.  You MUST follow the instructions for each section below precisely.
3.  Do NOT invent new content. Your job is to reproduce and reformat existing content into a worksheet format.

**Lab Activity Data:**
\`\`\`json
{{{originalLab}}}
\`\`\`

---
**WORKSHEET GENERATION INSTRUCTIONS**
---

1.  **Title:** Copy the 'labTitle' from the original lab.
2.  **Reading Phenomenon:** Copy the entire 'phenomenon' text.
3.  **Pre-Lab Questions:** Copy all questions from the 'preLabQuestions' array.
4.  **Testable Question:** Provide a labeled space for the student to write their question.
5.  **Hypothesis:** Provide a labeled space for the student to write their hypothesis, perhaps with an "If... then... because..." prompt.
6.  **Materials:** Copy the 'materialsAndEquipment' list.
7.  **Procedure:** Provide a large, lined, or blank space labeled "Procedure" for students to write their own steps.
8.  **Data Collection:**
    *   Copy the 'dataCollection.description'.
    *   If 'dataCollection.dataTable' exists, recreate the table with empty rows for students to fill in. If no table exists, provide a blank space for data collection.
9.  **Data Analysis & Conclusion:** Provide labeled spaces for "Data Analysis" and "Conclusion" for students to write their interpretations.
10. **Discussion Questions:** Copy all questions from the 'discussionQuestions' array, with space after each for answers.

Generate a complete student worksheet based on these instructions.`,
});

const generateLabStudentSheetFlow = ai.defineFlow(
  {
    name: 'generateLabStudentSheetFlow',
    inputSchema: LabStudentSheetInputSchema,
    outputSchema: LabStudentSheetOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({
      originalLab: JSON.stringify(input.originalLab),
    });
    if (!output) {
      throw new Error('The AI failed to generate the student lab sheet. Please try again.');
    }
    return output;
  }
);

export async function generateLabStudentSheet(input: z.infer<typeof LabStudentSheetInputSchema>): Promise<z.infer<typeof LabStudentSheetOutputSchema>> {
  return await generateLabStudentSheetFlow(input);
}
