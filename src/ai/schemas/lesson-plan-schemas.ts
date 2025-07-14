import {z} from 'genkit';
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
* Teacher Actions (bulleted)
* Expected Student Outputs (bulleted)

All resources used in instruction must be fully generated and included within the lesson. This includes:
- Reading Passages: 100–250 words, grade-appropriate, aligned to topic
- Questions: Multiple choice, short response, constructed response
- Diagrams: Fully rendered labeled scientific diagrams, not text-only descriptions
- Graphs & Charts: Clear, labeled visuals with axes, titles, and legends
- Data Tables: Complete and structured with real or simulated values
- Models: Conceptual visuals or simplified schematics embedded directly

**B. DO NOW (5–8 min)**
*Teacher Actions:*
- Post the Essential Question
- Prompt student reflection and vocabulary use
- Cold call and scaffold
*Expected Student Outputs:*
- 2–3 sentence written response
- Verbal or notebook use of terms
❓ **Student Prompt:** [Include 1 student question prompt tied to the Essential Question here.]

**C. MINI-LESSON / DIRECT INSTRUCTION (10–15 min)**
*Teacher Actions:*
- Present reading + diagram
- Model vocabulary and concept connections
- Check for misconceptions
*Expected Student Outputs:*
- Annotated notes
- Use of visuals to explain phenomena
- Written response to guided prompts
📘 **Reading Passage:** [Embed a 100–250 word, grade-appropriate reading passage here, directly aligned to the topic.]
🖼️ **Diagram:** [Embed a fully rendered diagram using proper labels and arrows, following the special SVG description format.]
❓ **Concept-Check Questions:** [Include 2–3 concept-check questions under the reading.]

**D. GUIDED PRACTICE / GROUP ACTIVITY (15–20 min)**
*Teacher Actions:*
- Organize into groups
- Provide a graphic organizer or template
- Facilitate academic dialogue
*Expected Student Outputs:*
- Completed scaffold
- Collaborative verbal/written explanations
📊 **Group Activity Resource:** [Embed a complete graph, data table, or visual model for students to analyze or complete.]

**E. CHECK FOR UNDERSTANDING (CFU)**
*Teacher Actions:*
- Launch a tech-based or verbal CFU
- Analyze responses and provide feedback
*Expected Student Outputs:*
- Response to MC or open-ended items
- Adjusted answers based on feedback
❓ **CFU Items:** [Embed 3 CFU items: 2 multiple choice + 1 short response.]

**F. INDEPENDENT PRACTICE / PERFORMANCE TASK**
*Teacher Actions:*
- Clarify expectations with rubric/checklist
- Monitor individual student effort
*Expected Student Outputs:*
- Written explanation or model
- Use of vocabulary and content skills
✍️ **Student Task:** [Embed 1 full CER (Claim-Evidence-Reasoning) prompt or another analytical task. This must include a resource for analysis.]
📈 **Task Resource:** [Embed a graph, data table, or model for students to interpret, label, or extend as part of the performance task.]

**G. CLOSURE / EXIT TICKET**
*Teacher Actions:*
- Revisit aim/vocabulary
- Prompt 1-sentence summary or visual reflection
*Expected Student Outputs:*
- Submission of summary
- Use of academic vocabulary in written form
❓ **Exit Ticket:** [Include 1 exit ticket item, such as a question, matching task, or a prompt requiring use of specific vocabulary.]

**H. HOMEWORK ACTIVITY**
*Teacher Actions:*
- Explain homework task.
*Expected Student Outputs:*
- Completion of homework assignment.
📝 **Homework:** [Generate a short assignment to reinforce or extend learning (e.g., diagram labeling, CER, reading + question).]

**III. DIFFERENTIATION & SUPPORT**
*Teacher Actions:*
- Offer sentence starters, leveled readings, visuals
- Provide extension activity or challenge prompt
*Expected Student Outputs:*
- Scaffolded writing or models
- Visible use of supports (e.g., translated glossary, graphic frame)

AI OUTPUT RULES – NON-NEGOTIABLE
- Embed all visuals as full diagrams, graphs, tables—not just text descriptions.
- All questions and tasks must appear at the point of use.
- Format must match structure exactly (headings, bullets, spacing).
- No placeholder text or instructional notes in final output.
- Strict alignment to selected topic and standards.
${aiContentGenerationRules}
`;


export const GenerateLessonPlanInputSchema = z.object({
  gradeLevel: z.string().describe('The grade level for the lesson plan.'),
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
