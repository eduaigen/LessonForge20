import {z} from 'genkit';
import { aiContentGenerationRules } from './formatting-rules';

export const lessonPlanFormattingInstruction = `
You are an expert teacher creating a lesson plan. Your output MUST strictly follow the structured format below.
- Use justified format with the exact section labels (Roman numerals and letters), bold formatting, and 1-line spacing between sections.
- ALL instructional content (readings, diagrams, questions, etc.) MUST be fully generated and embedded directly within the lesson plan as specified.

${aiContentGenerationRules}

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
**B. DO NOW (5–8 min)**
*Teacher Actions:*
- Post the Essential Question.
- Prompt students to reflect on the question and use key vocabulary from the previous lesson.
- Cold call students to share initial thoughts and scaffold understanding.
*Expected Student Outputs:*
- Students write a 2–3 sentence response in their notebooks.
- Students verbally use vocabulary terms in their shared responses.
❓ **Student Prompt:** [Include 1 student question prompt tied to the Essential Question here.]

**C. MINI-LESSON / DIRECT INSTRUCTION (10–15 min)**
*Teacher Actions:*
- Present the embedded reading passage and diagram.
- Model how to connect vocabulary terms to the concepts in the reading and visual.
- Use targeted questions to check for and address common misconceptions.
*Expected Student Outputs:*
- Students annotate the reading passage and notes.
- Students use the diagram to explain the scientific phenomenon.
- Students provide written or verbal responses to guided prompts.
📘 **Reading Passage:**
[Embed a 100–250 word, grade-appropriate reading passage here, directly aligned to the topic.]
🖼️ **Diagram:**
[Embed a fully rendered and labeled scientific diagram, chart, or model here. Use the special SVG description format.]
❓ **Concept-Check Questions:**
1. [Question 1]
2. [Question 2]
3. [Question 3, if applicable]

**D. GUIDED PRACTICE / GROUP ACTIVITY (15–20 min)**
*Teacher Actions:*
- Organize students into collaborative groups.
- Provide the embedded graphic organizer, data table, or model for analysis.
- Facilitate academic dialogue and monitor group progress.
*Expected Student Outputs:*
- Students complete the scaffolded analysis task in groups.
- Students engage in collaborative verbal and written explanations.
📊 **Group Activity Resource:**
[Embed a complete graph, data table, or visual model for students to analyze, complete, or use.]

**E. CHECK FOR UNDERSTANDING (CFU)**
*Teacher Actions:*
- Launch a quick, technology-based or verbal check for understanding.
- Analyze student responses in real-time to identify trends in understanding.
- Provide immediate, targeted feedback to the whole class or small groups.
*Expected Student Outputs:*
- Students submit responses to multiple-choice or open-ended questions.
- Students adjust their initial answers based on class feedback.
❓ **CFU Items:**
1. (Multiple Choice) [Question with A, B, C, D options]
2. (Multiple Choice) [Question with A, B, C, D options]
3. (Short Response) [Open-ended question requiring a 1-2 sentence answer]

**F. INDEPENDENT PRACTICE / PERFORMANCE TASK**
*Teacher Actions:*
- Clarify expectations for the independent task using a rubric or checklist.
- Monitor individual student effort and provide targeted support.
*Expected Student Outputs:*
- Students produce a written explanation, a completed model, or solve a problem.
- Students demonstrate use of key vocabulary and content-specific skills.
✍️ **Student Task:**
[Embed 1 full CER (Claim-Evidence-Reasoning) prompt or another analytical task. This must include a resource for analysis.]
📈 **Task Resource:**
[Embed a graph, data table, or model for students to interpret, label, or extend as part of the performance task.]

**G. CLOSURE / EXIT TICKET**
*Teacher Actions:*
- Revisit the lesson's Aim / Essential Question and key vocabulary.
- Prompt students to complete the Exit Ticket.
*Expected Student Outputs:*
- Students submit a written summary or response.
- Students demonstrate use of academic vocabulary in their written form.
❓ **Exit Ticket:** [Include 1 exit ticket item, such as a question, matching task, or a prompt requiring use of specific vocabulary.]

**H. HOMEWORK ACTIVITY**
[Generate a short, meaningful assignment to reinforce or extend the lesson's learning. This should be a complete activity, such as a labeled diagram, a short reading with a question, or a CER prompt.]

**III. DIFFERENTIATION & SUPPORT**
*Teacher Actions:*
- Offer sentence starters for written responses.
- Provide a leveled or simplified version of the reading passage.
- Use visuals and manipulatives to support diverse learners.
- Offer an extension activity or challenge prompt for advanced students.
*Expected Student Outputs:*
- Students utilize provided scaffolds (e.g., sentence starters, graphic organizers).
- Students access and use support materials like glossaries or visual aids.
- Advanced students engage with the extension task.
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
