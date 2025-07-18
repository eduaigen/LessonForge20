
'use server';
/**
 * @fileOverview An AI flow for generating a 5E lesson plan for English Language Learners (ELLs).
 */
import {ai} from '@/ai/genkit';
import { GenerateELLLessonInputSchema, GenerateELLLessonOutputSchema, type GenerateELLLessonInput, type GenerateELLLessonOutput } from '../schemas/ell-lesson-schemas';

async function withRetry<T>(fn: () => Promise<T>, retries = 3, delay = 1000): Promise<T> {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err: any) {
      if (err.message?.includes("503") || err.message?.includes("model is overloaded") || err.message?.includes("An unexpected response was received from the server")) {
        if (i === retries - 1) {
          throw new Error("The AI model is temporarily overloaded. Please try again in a few moments.");
        }
        await new Promise(res => setTimeout(res, delay * (i + 1)));
      } else {
        throw err; // Non-retryable error
      }
    }
  }
  throw new Error("Operation failed after multiple retries.");
}

const prompt = ai.definePrompt({
  name: 'generateELLLessonPrompt',
  input: { schema: GenerateELLLessonInputSchema },
  output: { schema: GenerateELLLessonOutputSchema },
  prompt: `You are an expert instructional designer and a master teacher of English Language Learners (ELLs) / Multilingual Learners (MLLs). Your task is to generate a comprehensive, standards-aligned, and engaging lesson plan based on the 5E instructional model that would be considered "Highly Effective" under the Danielson Framework and is specifically designed to support high school ELLs.

The user has provided the following context from the ELL curriculum:
- **Unit**: {{{unit}}}
- **Topic**: {{{topic}}}
- **Lesson**: {{{lesson}}}
- **Additional Info**: {{{additionalInfo}}}

Based on this context, generate a complete and detailed lesson plan that is ready for a teacher to use in a classroom tomorrow. Your response MUST follow this exact JSON structure and incorporate strong scaffolds for language development in every section.

---
**JSON STRUCTURE:**

The root object should have the following keys: "lessonOverview", "doNow", "miniLesson", "guidedPractice", "checkFoUnderstanding", "independentPractice", "closure", "homework", "differentiation".

**I. "lessonOverview"** (Object)
- "unit": (String) The full Unit name: {{{unit}}}
- "topic": (String) The full Topic name: {{{topic}}}
- "lesson": (String) The full Lesson title: {{{lesson}}}
- "lessonSummary": (String) A 2-3 sentence, teacher-facing summary of the lesson's flow and key learning outcomes.
- "standards": (String) The relevant NYS Next Generation ELA standard code and a short description.
- "aim": (String) A student-friendly question that frames the lesson.
- "essentialQuestion": (String) The same as "aim".
- "objectives": (Array of Strings) 2-3 "SWBAT" objectives using Bloom’s verbs, focusing on both content and language.
- "vocabulary": (Array of Objects) 3-5 objects, each with "term" (String), "definition" (String), and "studentFriendlyDefinition" (String).
- "materials": (Array of Strings) List all handouts, devices, printed visuals, etc.

**II. LESSON SEQUENCE** (Each of these is a key in the root JSON object)

**A. "doNow"** (Object, 5–8 min)
- "teacherActions": (Array of Strings) Provide a verbatim script for the teacher, including what to say and what to write on the board.
- "expectedStudentOutputs": (Array of Strings) Provide a high-quality exemplar of what a student's written response should look like.
- "question": (String) Provide 1 student-facing question prompt that is tied to the Aim.
- "scaffolds": (String) "Sentence starters will be provided on the board to support all learners."

**B. "miniLesson"** (Object, 10–15 min)
- "teacherActions": (Array of Strings) Verbatim script for the teacher.
- "expectedStudentOutputs": (Array of Strings) An exemplar of student work (e.g., an annotated paragraph with key vocabulary highlighted).
- "readingPassage": (String) A 300-500 word, grade-appropriate reading passage. Use Markdown bold (\`**word**\`) for key vocab. The passage should be chunked into smaller paragraphs.
- "diagram": (String) A highly detailed text description of a graphic organizer, concept map, model, or flowchart for the teacher to generate an image from. It should specify the layout, objects, labels, and connections. For example: 'A T-Chart with two columns. The left column is titled 'Cause' and the right column is titled 'Effect'. All text must be exactly as written here.'
- "conceptCheckQuestions": (Array of Objects) 2-3 questions. Each object must have "question" (String) and "dok" (Number, 1, 2, or 3).

**C. "guidedPractice"** (Object, 15–20 min)
- "teacherActions": (Array of Strings) Verbatim script for launching and managing the activity, emphasizing grouping strategies (e.g., heterogeneous groups, think-pair-share).
- "expectedStudentOutputs": (Array of Strings) An exemplar of a completed graphic organizer or collaborative output.
- "activityContent": (Object or String) **EITHER** a graphic organizer object (with "title" and "sections") **OR** a string describing a non-data-based activity.

**D. "checkFoUnderstanding"** (Object, CFU)
- "teacherActions": (Array of Strings) Script for administering the CFU.
- "expectedStudentOutputs": (Array of Strings) A correct, high-quality sample response for the short-answer question.
- "multipleChoice": (Array of Objects) Exactly 2 multiple-choice questions. Each object needs "question" (String), "dok" (Number), "options" (Array of Strings), and "answer" (String).
- "shortResponse": (Object) One short-response question with "question" (String) and "dok" (Number).

**E. "independentPractice"** (Object, Performance Task)
- "teacherActions": (Array of Strings) Script for setting up the task.
- "expectedStudentOutputs": (Array of Strings) A full, high-quality exemplar of a complete response.
- "taskPrompt": (String) A rich analytical or creative writing prompt.
- "taskData": (Object or null) Any necessary data for the task, using the same structure as "activityContent" data table.

**F. "closure"** (Object, Exit Ticket)
- "teacherActions": (Array of Strings) Script for the closure, including a reflective prompt.
- "expectedStudentOutputs": (Array of Strings) An exemplar response for the exit ticket.
- "exitTicketQuestion": (String) One exit ticket item.

**G. "homework"** (Object)
- "activity": (String) A short, relevant assignment. **If the homework requires a reading passage, you MUST generate and embed that content directly. Do NOT refer to external textbooks.**

**H. "differentiation"** (Object)
- "supportActions": (Array of Strings) **Elaborate on specific strategies for different language proficiency levels (Entering, Emerging, Transitioning).**
- "supportOutputs": (Array of Strings) **Provide specific examples of student outputs with different scaffolds.**
- "scaffoldedMaterials": (String) **Provide ready-to-use scaffolds like a vocabulary bank with visuals, sentence starters, or a simplified graphic organizer.**
- "extensionActivity": (String) **Elaborate on a challenging prompt or activity for advanced learners.**
---
**Final Instruction**: Review your entire response. Ensure every single section from A to H is present and fully generated. **Do not use placeholders.** All content must be created and embedded directly.
`,
});

const generateELLLessonFlow = ai.defineFlow(
  {
    name: 'generateELLLessonFlow',
    inputSchema: GenerateELLLessonInputSchema,
    outputSchema: GenerateELLLessonOutputSchema,
    timeout: 180000,
  },
  async (input) => {
    const result = await withRetry(() => prompt(input));
    const { output } = result;
    if (!output) {
      throw new Error('The AI failed to generate a lesson plan. Please try again.');
    }
    return output;
  }
);

export async function generateELLLesson(input: GenerateELLLessonInput): Promise<GenerateELLLessonOutput> {
    return await generateELLLessonFlow(input);
}
