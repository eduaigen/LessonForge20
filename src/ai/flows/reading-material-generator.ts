
'use server';
/**
 * @fileOverview An AI flow for generating educational reading material from a lesson plan.
 */
import { ai } from '@/ai/genkit';
import {
  ReadingMaterialInputSchema,
  ReadingMaterialOutputSchema,
  type ReadingMaterialInput,
  type ReadingMaterialOutput,
} from '../schemas/reading-material-generator-schemas';

const prompt = ai.definePrompt({
  name: 'readingMaterialGeneratorPrompt',
  input: { schema: ReadingMaterialInputSchema },
  output: { schema: ReadingMaterialOutputSchema },
  prompt: `You are an expert curriculum writer and subject matter expert. Your task is to transform the provided lesson plan JSON into a high-quality, engaging, and informative article for a high school audience, in the specified language.

**CRITICAL INSTRUCTIONS:**
1.  **Language**: Generate all text content in **{{{language}}}**. If the language is "Bilingual", provide the English text first, followed by the Spanish translation, clearly labeled (e.g., "English: [text] / Español: [texto]").
2.  **Source Material**: Your ONLY source of information is the provided JSON lesson plan. Do not invent new content, topics, or data.
3.  **SYNTHESIZE, DON'T JUST COPY:** Weave information from different parts of the lesson into a coherent narrative.
4.  **STUDENT-FACING TONE:** Write in a style that is engaging and accessible for high school students.

**Lesson Plan Data:**
---
{{{lessonPlanJson}}}
---

**Instructions:**

**Part 1: Generate the Article**
1.  **Derive the Title:** Create a title that is directly based on the 'lessonOverview.lesson' or 'lessonOverview.topic' from the JSON.
2.  **Write the Article (approx. 500-600 words):**
    *   **Introduction:** Start by using the 'lessonOverview.lessonSummary' and 'doNow.question' to frame the topic and engage the reader.
    *   **Body Paragraphs:** Synthesize the core content from the 'miniLesson.readingPassage'. Explain the concepts described in the 'miniLesson.diagram' in clear text. Incorporate the key terms from 'lessonOverview.vocabulary', explaining them in context. Use information from the 'guidedPractice' and 'independentPractice' sections to provide examples or applications of the concepts.
    *   **Conclusion:** Summarize the main points and connect back to the 'lessonOverview.aim' or 'lessonOverview.essentialQuestion'.
    *   **Accuracy:** Ensure all content is factually accurate according to the information provided in the lesson plan JSON.

**Part 2: Generate the Initial Question Cluster**
Based *only* on the article you just wrote, generate a 4-question cluster that assesses a student's understanding.

1.  **Multiple Choice Question 1:** A straightforward comprehension question based on the article. Provide 4 answer choices.
2.  **Multiple Choice Question 2:** A more analytical multiple-choice question that requires students to make an inference or connection based on the text. Provide 4 answer choices.
3.  **Short Response Question 1:** A question that requires students to explain a concept or relationship from the article in their own words (2-3 sentences).
4.  **Short Response Question 2:** A question that asks students to use specific evidence from the article to support a claim or explain a process.
`,
});

const readingMaterialGeneratorFlow = ai.defineFlow(
  {
    name: 'readingMaterialGeneratorFlow',
    inputSchema: ReadingMaterialInputSchema,
    outputSchema: ReadingMaterialOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to generate the reading material. Please try again.');
    }
    return output;
  }
);

export async function generateReadingMaterial(input: ReadingMaterialInput): Promise<ReadingMaterialOutput> {
  return await readingMaterialGeneratorFlow(input);
}
