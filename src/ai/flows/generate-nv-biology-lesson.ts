
'use server';
/**
 * @fileOverview An AI flow for generating a 5E lesson plan for NV Biology.
 */
import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { GenerateNVBiologyLessonInputSchema, GenerateNVBiologyLessonOutputSchema, GenerateNVBiologyLessonOutputSchema as LessonPlanSchema } from '../schemas/nv-biology-lesson-schemas';

export type GenerateNVBiologyLessonInput = z.infer<typeof GenerateNVBiologyLessonInputSchema>;
export type GenerateNVBiologyLessonOutput = z.infer<typeof GenerateNVBiologyLessonOutputSchema>;

const PromptSchema = GenerateNVBiologyLessonInputSchema.extend({
    previousAttempt: z.string().optional().describe("A stringified JSON of a previous incomplete attempt, if any."),
});

const prompt = ai.definePrompt({
  name: 'generateNVBiologyLessonPrompt',
  input: { schema: PromptSchema },
  output: { schema: GenerateNVBiologyLessonOutputSchema },
  prompt: `You are an expert instructional designer and master teacher specializing in the New Visions for Public Schools science curriculum, specifically for Living Environment (Biology). Your task is to generate a comprehensive, standards-aligned, and engaging lesson plan based on the 5E instructional model that would be considered "Highly Effective" under the Danielson Framework.

The user has provided the following context from the NV Biology curriculum:
- **Unit**: {{{unit}}}
- **Topic**: {{{topic}}}
- **Lesson**: {{{lesson}}}
- **Additional Info**: {{{additionalInfo}}}

{{#if previousAttempt}}
**IMPORTANT**: Your previous attempt to generate this lesson plan was incomplete. You MUST use the provided previous attempt as a starting point and ensure that ALL sections are fully and correctly generated this time. Do not omit any sections.
Previous (incomplete) attempt:
\`\`\`json
{{{previousAttempt}}}
\`\`\`
{{/if}}

Based on this context, generate a complete and detailed lesson plan that is ready for a teacher to use in a classroom tomorrow.

**Your response MUST follow this exact structure and include all specified components. Do not omit any section or field. All content, including reading passages, charts, and data tables referenced in the lesson, must be created and embedded directly within the response.**

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
- **Teacher Actions**: Provide a verbatim script for the teacher, including what they write on the board and say to students. e.g., "Good morning, class. On the board, you'll see our Do Now. Please take 5 minutes to respond in your notebooks: [Write Do Now question on board]. As you work, I will circulate to see your initial ideas."
- **Expected Student Outputs**: Provide a high-quality exemplar of a student's written response to the Do Now question. e.g., "Exemplar Student Response: I think that..."
- **Question**: 1 student-facing question prompt tied to the Aim.

**C. MINI-LESSON / DIRECT INSTRUCTION (10–15 min)**
- **Teacher Actions**: Provide a verbatim script. e.g., "Today, we're going to explore... Open your handouts to page 2. I'm going to model how to annotate the first paragraph on the document camera. Watch how I circle key terms and underline the main idea. Now, you'll have 3 minutes to read and annotate the next paragraph. When you're done, turn and talk to your partner about what you found."
- **Expected Student Outputs**: Provide an exemplar of student work. e.g., "Exemplar Annotated Paragraph: [Show a paragraph with specific annotations, underlined sentences, and a margin summary]."
- **Embedded Reading Passage**: A **300-500 word**, grade-appropriate reading passage on the topic. **Use Markdown bold (\`**word**\`) to emphasize key vocabulary.**
- **Embedded Diagram**: A detailed text description of a scientific diagram for the teacher to generate using an AI tool. Describe all components, labels, and their relationships. **Do not generate SVG code.**
- **Concept-Check Questions**: 2-3 questions based on the reading and diagram. **Each question must have a specified Depth of Knowledge (DOK) level (1, 2, or 3).** Ensure a mix of DOK levels.

**D. GUIDED PRACTICE / GROUP ACTIVITY (15–20 min)**
- **Teacher Actions**: Provide a verbatim script for launching and managing the activity. e.g., "In your groups of four, you will analyze this data table. Your goal is to identify a pattern and explain what it means. Facilitators, make sure everyone's voice is heard. Scribes, you will record your group's findings on the graphic organizer. You have 15 minutes."
- **Expected Student Outputs**: Provide an exemplar of a completed graphic organizer or the expected collaborative output. e.g., "Exemplar Group Response: Pattern Identified - As X increases, Y decreases. Possible Reason: This is because..."
- **Embedded Data Table**: A complete and structured data table with a title, clear headers, and logically organized data, ready for students to analyze and graph themselves. **Do not generate a graph or chart; provide only the raw data in a table.**

**E. CHECK FOR UNDERSTANDING (CFU)**
- **Teacher Actions**: Provide a script for administering the CFU. e.g., "Alright everyone, eyes on me. On your mini-whiteboards, please answer the following multiple-choice question. Show me your boards in 3, 2, 1."
- **Expected Student Outputs**: Provide a correct, high-quality sample response for the short-answer question. e.g., "Exemplar Short Response: The process is affected because..."
- **CFU Questions**: 2 multiple-choice questions and 1 short-response question. **Each question must have a specified DOK level (1, 2, or 3).** For multiple-choice questions, provide the options as a simple array of strings without letters like "a)", "b)". Ensure surrounding text is not cluttered.

**F. INDEPENDENT PRACTICE / PERFORMANCE TASK**
- **Teacher Actions**: Provide a script for setting up the task. e.g., "For our final task today, you will be writing a CER response to this prompt. Remember our rubric: a strong response includes a clear claim, specific evidence from the text, and reasoning that explains how the evidence supports the claim. You may use the sentence starters on the handout."
- **Expected Student Outputs**: Provide a full, high-quality exemplar of a complete CER response. e.g., "Exemplar CER: Claim - ... Evidence - According to the data table, ... Reasoning - This evidence supports the claim because..."
- **Embedded Task**: One full CER (Claim, Evidence, Reasoning) prompt. Include any necessary data or model to be interpreted. If data is needed, provide it in a structured data table, not a graph. Ensure any embedded charts or diagrams are clearly labeled and contain valid descriptions.

**G. CLOSURE / EXIT TICKET**
- **Teacher Actions**: Provide a script for the closure. e.g., "Before you leave, please complete this Exit Ticket on the slip of paper I've handed out. This will help me know what we need to review tomorrow."
- **Expected Student Outputs**: Provide an exemplar response for the exit ticket. e.g., "Exemplar Exit Ticket: One thing I learned today is... A question I still have is..."
- **Exit Ticket Question**: One exit ticket item (e.g., a final question, a matching task, or a vocabulary use prompt).

**H. HOMEWORK ACTIVITY**
- **Activity**: A short, relevant assignment to reinforce learning. If the assignment requires a reading passage, data table, or diagram description, **you must generate and embed that content here.** For example, "Read the short passage below about symbiotic relationships and answer the two questions that follow. [Generate a 150-word passage here]. 1. ... 2. ..."

**III. DIFFERENTIATION & SUPPORT**
- **Teacher Actions for Support**: **Elaborate on specific strategies.** e.g., "Provide a pre-highlighted version of the reading for select students. Offer a graphic organizer with pre-filled sentence starters for the CER task."
- **Expected Student Outputs with Support**: **Elaborate on potential student outputs with scaffolds.** e.g., "Students use the provided sentence starters to construct their reasoning. Students refer to the vocabulary bank with visual cues."
- **Scaffolded Materials**: **Provide ready-to-use scaffolds.** e.g., "Sentence Starters for CER: 'My claim is...,' 'The evidence that supports my claim is...,' 'This evidence supports my claim because...'. Simplified Definitions: Photosynthesis - The process plants use to make food from sunlight."
- **Extension Activity**: **Elaborate on a challenging prompt or activity.** e.g., "Students who finish early will be asked to design a follow-up experiment to test a new variable related to the guided practice data."
---
**Final Instruction**: Review your entire response. Ensure every single section from I to III is present and fully generated. **Do not use placeholders or refer to external materials that you have not created.** All content, especially data tables and question DOK levels, must be created and embedded directly as valid code. Failure to comply will result in an invalid response.`,
});

function isLessonPlanComplete(plan: any): plan is GenerateNVBiologyLessonOutput {
    if (!plan || typeof plan !== 'object') return false;
    const requiredKeys = Object.keys(LessonPlanSchema.shape);
    const hasAllKeys = requiredKeys.every(key => key in plan && plan[key] !== null && plan[key] !== undefined);
    return hasAllKeys;
}


const generateNVBiologyLessonFlow = ai.defineFlow(
  {
    name: 'generateNVBiologyLessonFlow',
    inputSchema: GenerateNVBiologyLessonInputSchema,
    outputSchema: GenerateNVBiologyLessonOutputSchema,
    timeout: 120000, // 2 minutes
  },
  async (input) => {
    let attempts = 0;
    const maxAttempts = 3;
    let currentOutput: GenerateNVBiologyLessonOutput | null | undefined = null;

    while (attempts < maxAttempts) {
        attempts++;
        
        const promptInput: z.infer<typeof PromptSchema> = { ...input };
        if (currentOutput) {
            promptInput.previousAttempt = JSON.stringify(currentOutput);
        }

        const { output } = await prompt(promptInput);

        if (isLessonPlanComplete(output)) {
            return output;
        }
        
        currentOutput = output; // Store the incomplete output for the next attempt
        console.log(`Attempt ${attempts} failed. Lesson plan was incomplete. Retrying...`);
    }

    throw new Error('The AI failed to generate a complete lesson plan after multiple attempts. Please try again.');
  }
);

export async function generateNVBiologyLesson(input: GenerateNVBiologyLessonInput): Promise<GenerateNVBiologyLessonOutput> {
    return await generateNVBiologyLessonFlow(input);
}
