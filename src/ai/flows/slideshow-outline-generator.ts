
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
  prompt: `You are an expert instructional designer who creates clear and engaging presentations for teachers. Your task is to convert the provided lesson plan JSON into a detailed, slide-by-slide outline.

**CRITICAL INSTRUCTION:** Your only source of information is the provided lesson plan JSON.

**Lesson Plan Data:**
\`\`\`json
{{{lessonPlanJson}}}
\`\`\`

**Instructions:**
1.  **Analyze the Lesson Plan:** Read through each section of the lesson plan to extract all key information.
2.  **Create a Comprehensive Slide for Each Key Section:** Generate a logical sequence of slides that a teacher could use for their presentation. Follow the 5E model structure.
3.  **Summarize and Embed Content:** For each slide, create a clear title and bullet points summarizing the key information, teacher actions, or student activities.
4.  **Embed All Materials:** You MUST embed all relevant materials directly into the slide content. This includes:
    *   The full text of the 'miniLesson.readingPassage'.
    *   A Markdown version of any 'guidedPractice.dataTable' or 'independentPractice.taskData'. **This must be formatted as a valid Markdown table so it can be rendered as HTML.**
    *   All 'conceptCheckQuestions' and 'checkFoUnderstanding' questions.
    *   The full 'doNow.question', 'independentPractice.taskPrompt', and 'closure.exitTicketQuestion'.
    *   Key vocabulary terms and definitions.
5.  **Extract Key Information:** Pull out essential elements like the Aim/Essential Question, objectives, and vocabulary to feature on their own dedicated slides near the beginning of the presentation.
6.  **Be Thorough:** The goal is a comprehensive outline that a teacher can use directly. Do not omit details.

**Example Slide Structure:**
- Slide 1: Title Slide (Lesson Title from lessonOverview)
- Slide 2: Agenda / Objectives (from lessonOverview)
- Slide 3: Do Now (Full question/prompt from doNow)
- Slide 4: Mini-Lesson: Reading Passage (Full text of the passage)
- Slide 5: Mini-Lesson: Key Concepts & Diagram (Summary of concepts and diagram description)
- Slide 6: Mini-Lesson: Concept Check Questions (All questions listed)
- Slide 7: Guided Practice: Activity & Data (Instructions and the full data table in Markdown format)
- ...and so on for all sections of the lesson plan.

Generate a complete and detailed slideshow outline based on these instructions.`,
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
