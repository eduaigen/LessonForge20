
'use server';
/**
 * @fileOverview An AI flow for generating pedagogical coaching advice for a lesson plan.
 */
import { ai } from '@/ai/genkit';
import {
  TeacherCoachGeneratorInputSchema,
  TeacherCoachGeneratorOutputSchema,
  type TeacherCoachGeneratorInput,
  type TeacherCoachGeneratorOutput,
} from '../schemas/teacher-coach-generator-schemas';

const prompt = ai.definePrompt({
  name: 'teacherCoachGeneratorPrompt',
  input: { schema: TeacherCoachGeneratorInputSchema },
  output: { schema: TeacherCoachGeneratorOutputSchema },
  prompt: `You are an expert instructional coach and a master teacher, deeply familiar with the Danielson Framework for Teaching, Universal Design for Learning (UDL), and Culturally Responsive-Sustaining Education (CRSE).

Your task is to analyze the provided lesson plan JSON and generate detailed, actionable coaching advice for a teacher. For EACH section of the lesson (from Do Now to Homework), provide specific guidance.

**Lesson Plan Data:**
\`\`\`json
{{{lessonPlanJson}}}
\`\`\`

**Instructions:**
For each lesson component provided in the JSON, generate the following four pieces of coaching advice. Be specific, insightful, and practical.

1.  **Pedagogical Rationale**: Explain the "why" behind this part of the lesson. What is its instructional purpose? How does it fit into the 5E model?
2.  **Sample Teacher Script / Talk Moves**: Provide concrete, verbatim examples of what a teacher could say to introduce the activity, ask questions, and facilitate student discussion. Use effective "talk moves" to encourage student thinking.
3.  **Danielson Framework Connections**: Explicitly connect the teacher actions in this section to one or two specific components of the Danielson Framework. Name the component number and title (e.g., "3b: Using Questioning and Discussion Techniques," "2a: Creating an Environment of Respect and Rapport").
4.  **CRSE/UDL Check**: Provide a brief note on how this section supports diverse learners. Mention a specific CRSE principle (e.g., "maintaining high expectations," "student-centered learning") or a UDL guideline (e.g., "providing multiple means of representation," "multiple means of engagement").

Structure your entire output according to the 'TeacherCoachGeneratorOutputSchema'. Ensure you provide coaching for every section present in the lesson plan input.`,
});

const teacherCoachGeneratorFlow = ai.defineFlow(
  {
    name: 'teacherCoachGeneratorFlow',
    inputSchema: TeacherCoachGeneratorInputSchema,
    outputSchema: TeacherCoachGeneratorOutputSchema,
    timeout: 120000, // 2 minutes
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to generate coaching advice. Please try again.');
    }
    return output;
  }
);

export async function generateTeacherCoach(
  input: TeacherCoachGeneratorInput
): Promise<TeacherCoachGeneratorOutput> {
  return await teacherCoachGeneratorFlow(input);
}
