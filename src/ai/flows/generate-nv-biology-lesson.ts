
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
  prompt: `You are an expert instructional designer and master teacher specializing in the New Visions for Public Schools science curriculum, specifically for Living Environment (Biology). Your task is to generate a comprehensive, standards-aligned, and engaging lesson plan based on the 5E instructional model.

The user has provided the following context from the NV Biology curriculum:
- **Unit**: {{{unit}}}
- **Topic**: {{{topic}}}
- **Lesson**: {{{lesson}}}
- **Additional Info**: {{{additionalInfo}}}

Based on this context, generate a complete and detailed lesson plan that is ready for a teacher to use in a classroom tomorrow.

**Your response MUST follow this exact structure and include all specified components. Do not omit any section or field. All content must be created and embedded directly.**

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
- **Teacher Actions**: Bulleted list of teacher actions (e.g., Post the Essential Question, prompt reflection).
- **Expected Student Outputs**: Bulleted list of student actions (e.g., Students write a 2-3 sentence response).
- **Question**: 1 student-facing question prompt tied to the Aim.

**C. MINI-LESSON / DIRECT INSTRUCTION (10–15 min)**
- **Teacher Actions**: Bulleted list of teacher actions (e.g., Present reading and diagram, model concepts).
- **Expected Student Outputs**: Bulleted list of student actions (e.g., Students take annotated notes).
- **Embedded Reading Passage**: A 100–250 word, grade-appropriate reading passage on the topic.
- **Embedded Diagram**: A fully rendered, labeled SVG scientific diagram related to the reading. Do not describe it; create the SVG code.
- **Concept-Check Questions**: 2-3 questions based on the reading and diagram.

**D. GUIDED PRACTICE / GROUP ACTIVITY (15–20 min)**
- **Teacher Actions**: Bulleted list of teacher actions (e.g., Organize students into groups, provide graphic organizer).
- **Expected Student Outputs**: Bulleted list of student actions (e.g., Students collaboratively complete the graphic organizer).
- **Embedded Data Table/Graph/Model**: A complete and structured data table with headers and rows for students to analyze or complete.

**E. CHECK FOR UNDERSTANDING (CFU)**
- **Teacher Actions**: Bulleted list of teacher actions (e.g., Launch a quick poll).
- **Expected Student Outputs**: Bulleted list of student actions (e.g., Students respond to CFU items).
- **CFU Questions**: 2 multiple-choice questions and 1 short-response question. For multiple-choice questions, provide the options as a simple array of strings without letters like "a)", "b)".

**F. INDEPENDENT PRACTICE / PERFORMANCE TASK**
- **Teacher Actions**: Bulleted list of teacher actions (e.g., Clarify expectations with a rubric).
- **Expected Student Outputs**: Bulleted list of student actions (e.g., Students construct a written explanation using CER).
- **Embedded Task**: One full CER (Claim, Evidence, Reasoning) prompt. Include any necessary data or model to be interpreted.

**G. CLOSURE / EXIT TICKET**
- **Teacher Actions**: Bulleted list of teacher actions (e.g., Prompt students to summarize the main point).
- **Expected Student Outputs**: Bulleted list of student actions (e.g., Students submit their exit ticket).
- **Exit Ticket Question**: One exit ticket item (e.g., a final question, a matching task, or a vocabulary use prompt).

**H. HOMEWORK ACTIVITY**
- **Activity**: A short, relevant assignment to reinforce learning (e.g., label a diagram, answer a question based on a short reading).

**III. DIFFERENTIATION & SUPPORT**
- **Teacher Actions for Support**: Bulleted list of specific strategies (e.g., Offer sentence starters).
- **Expected Student Outputs with Support**: Bulleted list of potential student outputs (e.g., Students use a graphic frame).
- **Extension Activity**: A challenge prompt or activity for students who master the content early.
---
**Final Instruction**: Review your entire response. Ensure every single section from I to III is present and fully generated. Do not use placeholders. All content must be created and embedded directly. Failure to comply will result in an invalid response.`,
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
