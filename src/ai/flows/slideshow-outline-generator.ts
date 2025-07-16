
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
} from '../schemas/slideshow-outline-generator-schemas';

const prompt = ai.definePrompt({
  name: 'slideshowOutlineGeneratorPrompt',
  input: { schema: SlideshowOutlineInputSchema },
  output: { schema: SlideshowOutlineOutputSchema },
  prompt: `You are an expert instructional designer who creates clear and engaging presentations for teachers. Your task is to convert the provided lesson plan JSON into a detailed, student-facing, slide-by-slide outline in the specified language.

**CRITICAL INSTRUCTION:**
1.  **Language**: Generate all text content in **{{{language}}}**. If the language is "Bilingual", provide the English text first, followed by an exact, word-for-word Spanish translation, clearly labeled (e.g., "English: [text] / Español: [texto]"). **CRITICAL**: Do NOT translate any numerical data within data tables; only translate textual headers and titles.
2.  **Source Material**: Your ONLY source of information is the provided lesson plan JSON. Do not include any "teacherActions" or "sampleScript" content.

**Lesson Plan Data:**
\`\`\`json
{{{lessonPlanJson}}}
\`\`\`

**Instructions:**
1.  **Analyze the Lesson Plan:** Read through each section of the lesson plan to extract all key student-facing information.
2.  **Create a Comprehensive Slide for Each Key Section:** Generate a logical sequence of slides that a teacher could use for their presentation. Follow the 5E model structure.
3.  **Summarize and Embed Content:** For each slide, create a clear title and bullet points summarizing the key information, student activities, and core concepts.
4.  **Embed All Questions:** You MUST embed all student-facing questions directly into the slide content. This includes the 'doNow.question', all 'conceptCheckQuestions', all 'checkFoUnderstanding' questions, the 'independentPractice.taskPrompt', and the 'closure.exitTicketQuestion'.
5.  **Handle Data Tables as Notes:** If the 'guidedPractice' or 'independentPractice' sections contain a 'dataTable' or 'taskData', DO NOT copy the table. Instead, insert a placeholder note like: "[Teacher Note: Insert data table from lesson plan here.]"
6.  **Extract Key Information:** Pull out essential elements like the Aim/Essential Question, objectives, and vocabulary to feature on their own dedicated slides near the beginning of the presentation.

**Example Slide Structure:**
- Slide 1: Title Slide (Lesson Title from lessonOverview)
- Slide 2: Agenda / Objectives (from lessonOverview)
- Slide 3: Do Now (Full question/prompt from doNow)
- Slide 4: Mini-Lesson: Reading Passage (Full text of the passage)
- Slide 5: Mini-Lesson: Key Concepts & Diagram (Summary of concepts and diagram description)
- Slide 6: Mini-Lesson: Concept Check Questions (All questions listed)
- Slide 7: Guided Practice: Activity & Data (Instructions and a note like "[Teacher Note: Insert data table from lesson plan here.]")
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
    const { output } = await prompt(input);
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
