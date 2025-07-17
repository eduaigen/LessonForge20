
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
  prompt: `You are an expert instructional coach and a master teacher, deeply familiar with research-based pedagogical practices including the Danielson Framework for Teaching, Universal Design for Learning (UDL), and Culturally Responsive-Sustaining Education (CRSE).

Your task is to analyze the provided lesson plan JSON and generate detailed, actionable coaching advice for a teacher.

**Source Material**: Use the lesson plan as your only source.

**Lesson Plan Data:**
\`\`\`json
{{{lessonPlanJson}}}
\`\`\`

**Instructions:**
First, populate the header information:
- **lessonTitle**: Extract the 'lesson' title from the 'lessonOverview'.
- **unitTitle**: Extract the 'unit' title from the 'lessonOverview'.
- **teacherName**: "___________________" (as a placeholder for the teacher to write their name).
- **date**: "___________________" (as a placeholder for the date).

Next, for each lesson component provided in the JSON, generate the following four pieces of coaching advice. Be specific, insightful, and practical.

1.  **Pedagogical Rationale**: Explain the "why" behind this part of the lesson. What is its instructional purpose? How does it fit into the 5E model? Connect it to a specific learning theory (e.g., constructivism, inquiry-based learning).
2.  **Sample Teacher Script / Talk Moves**: Provide concrete, verbatim examples of what a teacher could say to introduce the activity, ask probing questions, and facilitate student discussion. Use research-based "talk moves" (e.g., "wait time," "turn and talk," "say more about that") to encourage deep student thinking.
3.  **Danielson Framework Connections**: Explicitly connect the teacher actions in this section to one or two specific components of the Danielson Framework. Name the component number and title (e.g., "Component 3b: Using Questioning and Discussion Techniques," "Component 2a: Creating an Environment of Respect and Rapport"). Briefly justify the connection.
4.  **CRSE/UDL Check**: Provide a brief, actionable note on how this section supports diverse learners. Mention a specific CRSE principle (e.g., "maintaining high expectations," "student-centered learning," "leveraging cultural funds of knowledge") or a UDL guideline (e.g., "providing multiple means of representation," "providing multiple means of action and expression," "providing multiple means of engagement").

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
