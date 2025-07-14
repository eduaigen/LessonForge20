
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

**Your response MUST follow this exact three-part structure and include all specified components. Do not omit any section or field.**

---

**I. LESSON OVERVIEW**

**Unit**: [Insert the full Unit name: {{{unit}}}]
**Topic**: [Insert the full Topic name: {{{topic}}}]
**Lesson**: [Insert the full Lesson title: {{{lesson}}}]
**Lesson Summary**: [Write a 2-3 sentence, teacher-facing summary of the lesson's flow and key learning outcomes.]
**NGSS / NYSSLS Standards**: [Provide the relevant standard code and a short description (e.g., HS-LS1-5: Use a model to illustrate...).]
**A. Aim / Essential Question**: [Provide a deep, inquiry-based question that frames the lesson.]
**Lesson Objectives**: 
- SWBAT [Objective 1 using a Bloom's verb]
- SWBAT [Objective 2 using a Bloom's verb]
- SWBAT [Objective 3 using a Bloom's verb]
**Key Vocabulary**:
- [Term 1]: [Definition]
- [Term 2]: [Definition]
- [Term 3]: [Definition]
- [Term 4]: [Definition]
**Materials Needed**: [List all handouts, devices, printed visuals, etc.]


**II. LESSON SEQUENCE**

**B. DO NOW (5–8 min)**
*   **Teacher Actions**: 
    *   [Bulleted list of teacher actions, e.g., Post the Essential Question from Part I.]
    *   [Prompt students to reflect and use key vocabulary.]
*   **Expected Student Outputs**:
    *   [Bulleted list of student actions, e.g., Students write a 2-3 sentence response in their notebooks.]
*   **Question**:
    *   [Include 1 student-facing question prompt tied directly to the Aim / Essential Question.]

**C. MINI-LESSON / DIRECT INSTRUCTION (10–15 min)**
*   **Teacher Actions**:
    *   [Bulleted list of teacher actions, e.g., Present the embedded reading and diagram.]
    *   [Model concepts and check for misconceptions.]
*   **Expected Student Outputs**:
    *   [Bulleted list of student actions, e.g., Students take annotated notes.]
*   **Embedded Reading Passage**:
    *   [Generate a 100–250 word, grade-appropriate reading passage on the topic.]
*   **Embedded Diagram**:
    *   [Generate a fully rendered, labeled SVG scientific diagram related to the reading. Do not describe it; create the SVG code.]
*   **Concept-Check Questions**:
    *   [Generate 2-3 questions based on the reading and diagram.]

**D. GUIDED PRACTICE / GROUP ACTIVITY (15–20 min)**
*   **Teacher Actions**:
    *   [Bulleted list of teacher actions, e.g., Organize students into collaborative groups.]
    *   [Provide the embedded graphic organizer or data table.]
*   **Expected Student Outputs**:
    *   [Bulleted list of student actions, e.g., Students collaboratively complete the graphic organizer.]
*   **Embedded Data Table/Graph/Model**:
    *   [Generate a complete and structured data table, graph, or visual model for students to analyze or complete.]

**E. CHECK FOR UNDERSTANDING (CFU)**
*   **Teacher Actions**:
    *   [Bulleted list of teacher actions, e.g., Launch a quick poll or ask students to respond on whiteboards.]
*   **Expected Student Outputs**:
    *   [Bulleted list of student actions, e.g., Students respond to the CFU items.]
*   **CFU Questions**:
    1.  [Generate a multiple-choice question.]
    2.  [Generate a second multiple-choice question.]
    3.  [Generate one short-response question.]

**F. INDEPENDENT PRACTICE / PERFORMANCE TASK**
*   **Teacher Actions**:
    *   [Bulleted list of teacher actions, e.g., Clarify expectations using a rubric or checklist.]
*   **Expected Student Outputs**:
    *   [Bulleted list of student actions, e.g., Students construct a written explanation using the CER framework.]
*   **Embedded Task**:
    *   [Generate one full CER (Claim, Evidence, Reasoning) prompt or another analytical task. Include any necessary data, graph, or model to be interpreted.]

**G. CLOSURE / EXIT TICKET**
*   **Teacher Actions**:
    *   [Bulleted list of teacher actions, e.g., Prompt students to summarize the main point of the lesson in one sentence.]
*   **Expected Student Outputs**:
    *   [Bulleted list of student actions, e.g., Students submit their exit ticket response.]
*   **Exit Ticket Question**:
    *   [Generate one exit ticket item, such as a final question, a matching task, or a prompt to use a vocabulary term in a sentence.]

**H. HOMEWORK ACTIVITY**
*   [Generate a short, relevant assignment to reinforce or extend learning (e.g., label a diagram, answer a question based on a short reading, complete a CER prompt).]


**III. DIFFERENTIATION & SUPPORT**

*   **Teacher Actions for Support**:
    *   [Bulleted list of specific strategies, e.g., Offer sentence starters for the CER task.]
    *   [Provide a simplified or chunked version of the reading passage.]
*   **Expected Student Outputs with Support**:
    *   [Bulleted list of potential student outputs, e.g., Students use the provided graphic frame to structure their response.]
*   **Extension Activity**:
    *   [Provide a challenge prompt or activity for students who master the content early.]

---
**Final Instruction**: Review your entire response one last time. Ensure every single section from I to III is present and fully generated. Do not use placeholders like "[Insert diagram here]". All content must be created and embedded directly. Failure to comply will result in an invalid response.`,
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
