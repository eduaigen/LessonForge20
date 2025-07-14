'use server';
/**
 * @fileOverview An AI flow for generating a 5E lesson plan for NV Biology.
 */
import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { GenerateNVBiologyLessonInputSchema, GenerateNVBiologyLessonOutputSchema } from '../schemas/nv-biology-lesson-schemas';

export type GenerateNVBiologyLessonInput = z.infer<typeof GenerateNVBiologyLessonInputSchema>;
export type GenerateNVBiologyLessonOutput = z.infer<typeof GenerateNVBiologyLessonOutputSchema>;

const prompt = ai.definePrompt({
  name: 'generateNVBiologyLessonPrompt',
  input: { schema: GenerateNVBiologyLessonInputSchema },
  output: { schema: GenerateNVBiologyLessonOutputSchema },
  prompt: `You are an expert instructional designer and master teacher specializing in the New Visions for Public Schools science curriculum, specifically for Living Environment (Biology). Your task is to generate a comprehensive, standards-aligned, and engaging lesson segment based on the 5E instructional model.

The user has provided the following context from the NV Biology curriculum:
- **Unit**: {{{unit}}}
- **Topic**: {{{topic}}}
- **Lesson**: {{{lesson}}}
- **5E Stage**: {{{strategy}}}

The user has also provided the following additional information or requests:
- **Additional Info**: {{{additionalInfo}}}

Based on this context, generate a detailed and well-structured lesson plan component for the specified 5E stage.

**Your response MUST follow these strict guidelines:**

1.  **Directly Address the 5E Stage**: The content you generate must be exclusively for the selected 5E stage (e.g., if the user selects "Engage," generate only the Engage portion of the lesson).
2.  **Integrate Curriculum**: Ensure the content is directly aligned with the specified NV Biology Unit, Topic, and Lesson.
3.  **High-Quality Content**:
    *   Provide clear instructions for the teacher.
    *   Include student-facing materials (questions, readings, diagrams, etc.) directly in the response.
    *   If a diagram is needed, generate an appropriate, simple SVG image.
    *   If a reading is required, write a concise, grade-appropriate passage.
    *   Ensure all content is scientifically accurate and pedagogically sound.
4.  **Formatting**:
    *   Use Markdown for formatting (headings, lists, bold text).
    *   Start with a clear heading indicating the 5E stage (e.g., "### Engage: Why do we breathe faster during exercise?").
    *   Use clear subheadings for different parts of the activity (e.g., "Teacher Instructions," "Student Handout," "Discussion Questions").

Do not generate content for other 5E stages. Focus entirely on creating a rich, detailed, and actionable plan for the selected stage.`,
});

const generateNVBiologyLessonFlow = ai.defineFlow(
  {
    name: 'generateNVBiologyLessonFlow',
    inputSchema: GenerateNVBiologyLessonInputSchema,
    outputSchema: GenerateNVBiologyLessonOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to generate the lesson plan. Please try again.');
    }
    return output;
  }
);

export async function generateNVBiologyLesson(input: GenerateNVBiologyLessonInput): Promise<GenerateNVBiologyLessonOutput> {
    return await generateNVBiologyLessonFlow(input);
}
