
'use server';
/**
 * @fileOverview An AI flow for generating a 5E lesson plan for NV Biology.
 */
import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { GenerateNVBiologyLessonInputSchema, GenerateNVBiologyLessonOutputSchema } from '../schemas/nv-biology-lesson-schemas';

export type GenerateNVBiologyLessonInput = z.infer<typeof GenerateNVBiologyLessonInputSchema>;
export type GenerateNVBiologyLessonOutput = z.infer<typeof GenerateNVBiologyLessonOutputSchema>;

const prompt = ai.definePrompt({
  name: 'generateNVBiologyLessonPrompt',
  input: { schema: GenerateNVBiologyLessonInputSchema },
  output: { schema: GenerateNVBiologyLessonOutputSchema },
  prompt: `You are an expert instructional designer and master teacher specializing in the New Visions for Public Schools science curriculum, specifically for Living Environment (Biology). Your task is to generate a comprehensive, standards-aligned, and engaging lesson plan based on the 5E instructional model that would be considered "Highly Effective" under the Danielson Framework.

The user has provided the following context from the NV Biology curriculum:
- **Unit**: {{{unit}}}
- **Topic**: {{{topic}}}
- **Lesson**: {{{lesson}}}
- **Additional Info**: {{{additionalInfo}}}

Based on this context, generate a complete and detailed lesson plan that is ready for a teacher to use in a classroom tomorrow.

**Your response MUST follow this exact structure and include all specified components. Do not omit any section or field. All content, including reading passages, diagrams, charts, and data tables referenced in the lesson, must be created and embedded directly within the response.**

---
**I. LESSON OVERVIEW**
- **Unit**: The full Unit name: {{{unit}}}
- **Topic**: The full Topic name: {{{topic}}}
- **Lesson**: The full Lesson title: {{{lesson}}}
- **Lesson Summary**: A 2-3 sentence, teacher-facing summary of the lesson's flow and key learning outcomes.
- **NGSS / NYSSLS Standards**: The relevant standard code and a short description (e.g., HS-LS1-5: Use a model to illustrate...).
- **A. Aim / Essential Question**: Provide a deep, inquiry-based question that frames the lesson.
- **Lesson Objectives**: Generate 2-3 "SWBAT" objectives using Bloom's verbs.
- **Key Vocabulary**: Generate 3-5 Tier 2 or 3 terms with concise definitions.
- **Materials Needed**: List all handouts, devices, printed visuals, etc.

**II. LESSON SEQUENCE**

**B. DO NOW (5–8 min)**
- **Teacher Actions**: Elaborate with highly effective strategies. e.g., "Circulate to observe student responses, posing probing questions to extend thinking..."
- **Expected Student Outputs**: Elaborate on student actions. e.g., "Students independently write a 2-3 sentence response, then turn and talk with a partner to compare initial ideas."
- **Question**: 1 student-facing question prompt tied to the Aim.

**C. MINI-LESSON / DIRECT INSTRUCTION (10–15 min)**
- **Teacher Actions**: Elaborate with highly effective strategies. e.g., "Model annotation strategies on the board, chunk the text and use a 'turn and talk' protocol to check for understanding..."
- **Expected Student Outputs**: Elaborate on student actions. e.g., "Students annotate the text by underlining key ideas and circling unknown words. They will summarize each paragraph in the margin."
- **Embedded Reading Passage**: A **300-500 word**, grade-appropriate reading passage on the topic. **Use Markdown bold (\`**word**\`) to emphasize key vocabulary and main ideas.**
- **Embedded Diagram**: A fully rendered, labeled, and valid SVG scientific diagram related to the reading. Ensure all labels are clear and arrows correctly point to relevant parts. Do not describe it; create the SVG code.
- **Concept-Check Questions**: 2-3 questions based on the reading and diagram. **Each question must have a specified Depth of Knowledge (DOK) level (1, 2, or 3).** Ensure a mix of DOK levels.

**D. GUIDED PRACTICE / GROUP ACTIVITY (15–20 min)**
- **Teacher Actions**: Elaborate with highly effective strategies. e.g., "Group students heterogeneously based on prior data. Provide each group with a role card (facilitator, scribe, etc.). Monitor group discussions and interject with clarifying questions."
- **Expected Student Outputs**: Elaborate on student actions. e.g., "In groups, students collaboratively analyze the provided data table, discuss patterns, and complete the graphic organizer. Each student contributes to the final product."
- **Embedded Data Table**: A complete and structured data table with a title, clear headers, and logically organized data, ready for students to analyze and graph themselves. **Do not generate a graph or chart; provide only the raw data in a table.**

**E. CHECK FOR UNDERSTANDING (CFU)**
- **Teacher Actions**: Elaborate. e.g., "Use a quick poll to gather responses. Intentionally call on students who showed misconceptions during the group activity."
- **Expected Student Outputs**: Elaborate. e.g., "Students respond to CFU items on a mini-whiteboard or using a digital polling tool."
- **CFU Questions**: 2 multiple-choice questions and 1 short-response question. **Each question must have a specified DOK level (1, 2, or 3).** For multiple-choice questions, provide the options as a simple array of strings without letters like "a)", "b)". Ensure surrounding text is not cluttered.

**F. INDEPENDENT PRACTICE / PERFORMANCE TASK**
- **Teacher Actions**: Elaborate. e.g., "Review the CER rubric with students, highlighting the criteria for 'evidence' and 'reasoning'. Provide a model CER response from a previous lesson."
- **Expected Student Outputs**: Elaborate. e.g., "Students independently construct a written explanation using the Claim, Evidence, Reasoning (CER) framework, citing specific data from the provided table."
- **Embedded Task**: One full CER (Claim, Evidence, Reasoning) prompt. Include any necessary data or model to be interpreted. If data is needed, provide it in a structured data table, not a graph. Ensure any embedded charts or diagrams are clearly labeled and contain valid, renderable SVG code.

**G. CLOSURE / EXIT TICKET**
- **Teacher Actions**: Elaborate. e.g., "Prompt students to complete a '3-2-1' ticket: 3 things they learned, 2 questions they still have, 1 connection to their life."
- **Expected Student Outputs**: Elaborate. e.g., "Students submit their exit ticket, which the teacher will use to inform the next day's lesson."
- **Exit Ticket Question**: One exit ticket item (e.g., a final question, a matching task, or a vocabulary use prompt).

**H. HOMEWORK ACTIVITY**
- **Activity**: A short, relevant assignment to reinforce learning (e.g., label a diagram, answer a question based on a short reading).

**III. DIFFERENTIATION & SUPPORT**
- **Teacher Actions for Support**: **Elaborate on specific strategies.** e.g., "Provide a pre-highlighted version of the reading for select students. Offer a graphic organizer with pre-filled sentence starters for the CER task."
- **Expected Student Outputs with Support**: **Elaborate on potential student outputs with scaffolds.** e.g., "Students use the provided sentence starters to construct their reasoning. Students refer to the vocabulary bank with visual cues."
- **Scaffolded Materials**: **Provide ready-to-use scaffolds.** e.g., "Sentence Starters for CER: 'My claim is...,' 'The evidence that supports my claim is...,' 'This evidence supports my claim because...'. Simplified Definitions: Photosynthesis - The process plants use to make food from sunlight."
- **Extension Activity**: **Elaborate on a challenging prompt or activity.** e.g., "Students who finish early will be asked to design a follow-up experiment to test a new variable related to the guided practice data."
---
**Final Instruction**: Review your entire response. Ensure every single section from I to III is present and fully generated. **Do not use placeholders or refer to external materials that you have not created.** All content, especially SVG diagrams and question DOK levels, must be created and embedded directly as valid code. Failure to comply will result in an invalid response.`,
});

const generateNVBiologyLessonFlow = ai.defineFlow(
  {
    name: 'generateNVBiologyLessonFlow',
    inputSchema: GenerateNVBiologyLessonInputSchema,
    outputSchema: GenerateNVBiologyLessonOutputSchema,
    timeout: 120000, // 2 minutes
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
