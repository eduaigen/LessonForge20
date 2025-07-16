
'use server';
/**
 * @fileOverview An AI flow for generating pedagogical coaching for a lab activity.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import { GenerateLabActivityOutputSchema, LabTeacherCoachOutputSchema } from '../schemas/lab-activity-schemas';

export const LabTeacherCoachInputSchema = z.object({
  originalLab: GenerateLabActivityOutputSchema,
});

const prompt = ai.definePrompt({
  name: 'generateLabTeacherCoachPrompt',
  input: { schema: z.object({ originalLab: z.string() }) },
  output: { schema: LabTeacherCoachOutputSchema },
  prompt: `You are an expert instructional coach and a master science teacher, deeply familiar with the NGSS, Universal Design for Learning (UDL), and inquiry-based learning.

Your task is to analyze the provided lab activity JSON and generate detailed, actionable coaching advice for a teacher who will be facilitating this lab. For EACH section of the lab, provide specific, practical guidance.

**Lab Activity Data:**
\`\`\`json
{{{originalLab}}}
\`\`\`

**Instructions:**
1.  **Title:** The title should be "Teacher Coach: [Original Lab Title]".
2.  **Introduction/Phenomenon:**
    *   **Pedagogical Rationale:** Explain the purpose of this section (e.g., to engage students, activate prior knowledge).
    *   **Sample Script:** Provide a verbatim example of what a teacher could say to introduce the phenomenon and elicit student questions. Include a "turn and talk" prompt.
3.  **Pre-Lab Questions:**
    *   **Rationale:** Explain how these questions prepare students for the inquiry.
    *   **Facilitation Tip:** Suggest a strategy for reviewing the pre-lab questions (e.g., small group share-out, whole-class review of one key question).
4.  **Testable Question & Hypothesis:**
    *   **Rationale:** Explain the importance of students formulating their own questions and hypotheses.
    *   **Facilitation Tip:** Provide examples of probing questions the teacher can ask to help students refine a weak question or hypothesis (e.g., "How will you measure that?", "What is your independent variable?").
5.  **Procedure Design:**
    *   **Rationale:** Explain why student-designed procedures are critical for NGSS Science and Engineering Practices.
    *   **Facilitation Tip:** Describe how the teacher can circulate and provide feedback on procedures without giving away the answer. Suggest a quick "procedure check" before students begin.
6.  **Data Collection & Analysis:**
    *   **Rationale:** Explain the importance of accurate data collection and initial analysis.
    *   **Facilitation Tip:** Provide advice on how to manage time during this phase and how to prompt students to look for patterns in their data as they collect it.
7.  **Discussion & Conclusion:**
    *   **Rationale:** Explain the purpose of the post-lab discussion (sense-making, connecting evidence to claims).
    *   **Sample Script:** Provide sentence stems or talk moves the teacher can use to facilitate a rich discussion (e.g., "What evidence do you have to support that claim?", "Can anyone add to that idea?").

Generate a complete and detailed coaching guide based on these instructions.`,
});

const generateLabTeacherCoachFlow = ai.defineFlow(
  {
    name: 'generateLabTeacherCoachFlow',
    inputSchema: LabTeacherCoachInputSchema,
    outputSchema: LabTeacherCoachOutputSchema,
  },
  async (input) => {
    const { output } = await prompt({
      originalLab: JSON.stringify(input.originalLab),
    });
    if (!output) {
      throw new Error('The AI failed to generate the teacher coach document. Please try again.');
    }
    return output;
  }
);

export async function generateLabTeacherCoach(input: z.infer<typeof LabTeacherCoachInputSchema>): Promise<z.infer<typeof LabTeacherCoachOutputSchema>> {
  return await generateLabTeacherCoachFlow(input);
}
