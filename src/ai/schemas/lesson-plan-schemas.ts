
import {z} from 'zod';
import { aiContentGenerationRules } from './formatting-rules';

export const lessonPlanFormattingInstruction = `
LESSON PLAN STRUCTURE — REQUIRED OUTPUT FIELDS
Use justified format with exact section labels, bold formatting, and 1-line spacing between sections. The entire output must be a single, clean block of text organized as a clear outline. Main parts should be bolded, and their components should be properly indented.

**I. LESSON OVERVIEW**
    **Unit:** [Insert curriculum-aligned unit name]
    **Lesson:** [Descriptive title aligned to standard]
    **NGSS / NYSSLS Standards:** [Code and short description (e.g., HS-LS1-5: Use a model to illustrate...)]
    
    **A. Aim / Essential Question:** [Deep, inquiry-based question. Must be the same as the Do Now question.]
    
    **Lesson Objectives:**
    - SWBAT [Objective 1 using a Bloom's verb]
    - SWBAT [Objective 2 using a Bloom's verb]
    - SWBAT [Objective 3 using a Bloom's verb, if applicable]
    
    **Key Vocabulary:**
    - Term 1: Definition
    - Term 2: Definition
    - Term 3: Definition
    - Term 4: Definition
    - Term 5: Definition
    
    **Materials Needed:**
    - [List all handouts, devices, and visuals. All must be embedded below.]
    
    **Lesson Summary:** [Provide a 2–3 sentence teacher-facing summary of the lesson's flow and goals.]

**II. LESSON SEQUENCE**
    Each instructional step (B–H) must include:
    * Label
    * Teacher Actions (bulleted and explicit, e.g., "Display the diagram and ask 'What do you notice?'")
    * Expected Student Outputs (bulleted)

    All resources used in instruction must be fully generated and included within the lesson. This includes:
    - Reading Passages: 100–250 words, grade-appropriate, aligned to topic
    - Questions: Multiple choice, short response, constructed response, with placeholders for student answers.
    - Diagrams: Fully rendered labeled scientific diagrams as SVG code, not text-only descriptions.
    - Graphs & Charts: Clear, labeled visuals with axes, titles, and legends as SVG code.
    - Data Tables: Complete and structured with real or simulated values using pipe-and-dash format.
    - Models: Conceptual visuals or simplified schematics embedded directly as SVG code.
    
    **B. DO NOW (5–8 min)**
        *Teacher Actions:*
        - Post the Essential Question.
        - Prompt student reflection and vocabulary use.
        *Expected Student Outputs:*
        - 2–3 sentence written response.
        - Verbal or notebook use of terms.
        ❓ **Student Prompt:** [Include 1 student question prompt tied to the Essential Question here.]
        __________________________________________________
        __________________________________________________
        __________________________________________________

    **C. MINI-LESSON / DIRECT INSTRUCTION (10–15 min)**
        *Teacher Actions:*
        - Present the reading passage and diagram below.
        - Model vocabulary and concept connections through explicit questioning.
        - Check for misconceptions.
        *Expected Student Outputs:*
        - Annotated notes on the provided reading.
        - Use of visuals to explain phenomena.
        - Written response to guided prompts.
        📘 **Reading Passage:** [Embed a 100–250 word, grade-appropriate reading passage here.]
        🖼️ **Diagram:** [Embed a fully rendered SVG diagram here, e.g., <svg>...</svg>]
        ❓ **Concept-Check Questions:** [Include 2–3 concept-check questions under the reading.]
        1. __________________________________________________
        2. __________________________________________________

    **D. GUIDED PRACTICE / GROUP ACTIVITY (15–20 min)**
        *Teacher Actions:*
        - Organize students into groups.
        - Provide the data table or visual model below for analysis.
        - Facilitate academic dialogue with specific prompts.
        *Expected Student Outputs:*
        - Completed analysis of the provided resource.
        - Collaborative verbal/written explanations.
        📊 **Group Activity Resource:** [Embed a complete graph, data table, or visual model for students to analyze or complete.]
        [Area for student drawing/graph]

    **E. CHECK FOR UNDERSTANDING (CFU)**
        *Teacher Actions:*
        - Launch a verbal or written CFU using the items below.
        - Analyze student responses and provide immediate feedback.
        *Expected Student Outputs:*
        - Response to multiple-choice or open-ended items.
        - Adjusted answers based on feedback.
        ❓ **CFU Items:** [Embed 3 CFU items: 2 multiple choice + 1 short response.]
        1. (A) ____ (B) ____ (C) ____ (D) ____
        2. (A) ____ (B) ____ (C) ____ (D) ____
        3. __________________________________________________

    **F. INDEPENDENT PRACTICE / PERFORMANCE TASK**
        *Teacher Actions:*
        - Clarify expectations for the CER task using the provided resource.
        - Monitor individual student effort.
        *Expected Student Outputs:*
        - A complete written Claim-Evidence-Reasoning response.
        - Use of academic vocabulary and content skills.
        ✍️ **Student Task:** [Embed 1 full CER (Claim-Evidence-Reasoning) prompt here.]
        📈 **Task Resource:** [Embed a graph, data table, or model for students to interpret as evidence.]
        Claim: __________________________________________________
        Evidence: __________________________________________________
        Reasoning: __________________________________________________

    **G. CLOSURE / EXIT TICKET**
        *Teacher Actions:*
        - Revisit the Aim and key vocabulary.
        - Prompt students to complete the exit ticket item below.
        *Expected Student Outputs:*
        - Submission of a summary or response.
        - Use of academic vocabulary in written form.
        ❓ **Exit Ticket:** [Include 1 exit ticket item, such as a question, matching task, or a prompt requiring use of specific vocabulary.]
        __________________________________________________
        __________________________________________________

    **H. HOMEWORK ACTIVITY**
        *Teacher Actions:*
        - Explain the homework task clearly.
        *Expected Student Outputs:*
        - Completion of the homework assignment.
        📝 **Homework:** [Generate a short assignment to reinforce or extend learning (e.g., diagram labeling, reading + question, or a short CER).]
        __________________________________________________

**III. DIFFERENTIATION & SUPPORT**
    *Teacher Actions:*
    - Offer specific sentence starters for writing tasks.
    - Suggest providing leveled readings or simplified diagrams for struggling learners.
    - Provide a clear extension activity or challenge prompt for advanced students.
    *Expected Student Outputs:*
    - Scaffolded writing or models.
    - Visible use of supports (e.g., translated glossary, graphic frame).

${aiContentGenerationRules}
`;


export const GenerateLessonPlanInputSchema = z.object({
  subject: z.string().describe('The subject for the lesson plan.'),
  unit: z.string().optional().describe('The unit for the lesson plan.'),
  topic: z.string().optional().describe('The topic for the lesson plan.'),
  lessonTitle: z.string().describe('The title or focus for the lesson plan. The AI will generate objectives from this.'),
  standards: z.array(z.string()).optional().describe('A list of educational standards to align with.'),
  customPrompt: z.string().optional().describe('Additional specific instructions from the user.'),
  language: z.enum(['en', 'es']).default('en').describe('The output language.'),
});
export type GenerateLessonPlanInput = z.infer<typeof GenerateLessonPlanInputSchema>;

export const GenerateLessonPlanOutputSchema = z.object({
  lessonPlan: z.string().describe('The generated lesson plan in structured markdown format.'),
});
export type GenerateLessonPlanOutput = z.infer<typeof GenerateLessonPlanOutputSchema>;
