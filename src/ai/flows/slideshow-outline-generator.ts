
'use server';
/**
 * @fileOverview An AI flow for generating a slideshow outline from a lesson plan.
 */
import { ai } from '@/ai/genkit';
import {
  SlideshowOutlineInputSchema,
  SlideshowOutlineOutputSchema,
  type SlideshowOutlineInput,
  type SlideshowOutlineOutput,
  PromptInputSchema,
} from '../schemas/slideshow-outline-generator-schemas';

const prompt = ai.definePrompt({
  name: 'slideshowOutlineGeneratorPrompt',
  input: { schema: PromptInputSchema },
  output: { schema: SlideshowOutlineOutputSchema },
  prompt: `You are an expert instructional designer who creates clear and engaging presentations for teachers. Your task is to convert the provided lesson plan JSON into a concise, slide-by-slide outline.

**Lesson Plan Data:**
\`\`\`json
{{{lessonPlanJson}}}
\`\`\`

**Instructions:**
1.  **Analyze the Lesson Plan:** Read through each section of the lesson plan.
2.  **Create a Slide for Each Key Section:** Generate a logical sequence of slides that a teacher could use for their presentation. Follow the 5E model structure.
3.  **Summarize Content:** For each slide, create a clear title and a few bullet points summarizing the key information, teacher actions, or student activities for that part of the lesson. Do not include teacher-facing notes unless they are critical for the slide's content.
4.  **Extract Key Information:** Pull out essential elements like the Aim/Essential Question, objectives, vocabulary, CFU questions, and task prompts to feature on their own slides.
5.  **Be Concise:** The goal is an outline, not a full script. Keep bullet points brief and to the point.

**Example Slide Structure:**
- Slide 1: Title Slide (Lesson Title)
- Slide 2: Agenda / Objectives
- Slide 3: Do Now (Question/Prompt)
- Slide 4: Mini-Lesson: Key Concepts (Summary of reading/diagram)
- ...and so on.

Generate a complete slideshow outline based on these instructions.`,
});

const slideshowOutlineGeneratorFlow = ai.defineFlow(
  {
    name: 'slideshowOutlineGeneratorFlow',
    inputSchema: SlideshowOutlineInputSchema,
    outputSchema: SlideshowOutlineOutputSchema,
  },
  async (input) => {
    const lessonPlanJson = JSON.stringify(input, null, 2);
    const { output } = await prompt({ lessonPlanJson });
    if (!output) {
      throw new Error('The AI failed to generate the slideshow outline. Please try again.');
    }
    return output;
  }
);

export async function generateSlideshowOutline(
  input: SlideshowOutlineInput
): Promise<SlideshowOutlineOutput> {
  return await slideshowOutlineGeneratorFlow(input);
}
