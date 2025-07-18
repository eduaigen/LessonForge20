
'use server';
/**
 * @fileOverview An AI flow for generating a 5E lesson plan for NGSS Earth & Space Science.
 */
import {ai} from '@/ai/genkit';
import { GenerateESSLessonInputSchema, GenerateESSLessonOutputSchema, type GenerateESSLessonInput, type GenerateESSLessonOutput } from '../schemas/ess-lesson-schemas';

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
  name: 'generateESSLessonPrompt',
  input: { schema: GenerateESSLessonInputSchema },
  output: { schema: GenerateESSLessonOutputSchema },
  prompt: `You are an expert instructional designer and master teacher specializing in the NGSS for Earth and Space Science. Your task is to generate a comprehensive, standards-aligned, and engaging lesson plan based on the 5E instructional model that would be considered "Highly Effective" under the Danielson Framework.

The user has provided the following context from the ESS curriculum:
- **Unit**: {{{unit}}}
- **Topic**: {{{topic}}}
- **Lesson**: {{{lesson}}}
- **Additional Info**: {{{additionalInfo}}}

Based on this context, generate a complete and detailed lesson plan that is ready for a teacher to use in a classroom tomorrow.

Your response MUST follow this exact JSON structure. Do not omit any section or field. All content, including reading passages, charts, and data tables referenced in the lesson, must be created and embedded directly within the response.

---
**JSON STRUCTURE:**

The root object should have the following keys: "lessonOverview", "doNow", "miniLesson", "guidedPractice", "checkFoUnderstanding", "independentPractice", "closure", "homework", "differentiation".

**I. "lessonOverview"** (Object)
- "unit": (String) The full Unit name: {{{unit}}}
- "topic": (String) The full Topic name: {{{topic}}}
- "lesson": (String) The full Lesson title: {{{lesson}}}
- "lessonSummary": (String) A 2-3 sentence, teacher-facing summary of the lesson's flow and key learning outcomes.
- "standards": (String) The relevant standard code and a short description (e.g., HS-ESS1-1: Develop a model based on evidence to illustrate the life span of the sun and the role of nuclear fusion...).
- "aim": (String) A deep, inquiry-based question that frames the lesson.
- "essentialQuestion": (String) The same as "aim".
- "objectives": (Array of Strings) 2-3 "SWBAT" objectives using Bloom’s verbs.
- "vocabulary": (Array of Objects) 3-5 objects, each with "term" (String) and "definition" (String).
- "materials": (Array of Strings) List all handouts, devices, printed visuals, etc.

**II. LESSON SEQUENCE** (Each of these is a key in the root JSON object)

**A. "doNow"** (Object, 5–8 min)
- "teacherActions": (Array of Strings) Provide a verbatim script for the teacher, including what to say and what to write on the board.
- "expectedStudentOutputs": (Array of Strings) Provide a high-quality exemplar of what a student's written response should look like.
- "question": (String) Provide 1 student-facing question prompt that is tied to the Aim.

**B. "miniLesson"** (Object, 10–15 min)
- "teacherActions": (Array of Strings) Verbatim script for the teacher.
- "expectedStudentOutputs": (Array of Strings) An exemplar of student work (e.g., an annotated paragraph).
- "readingPassage": (String) A 300-500 word, grade-appropriate reading passage. Use Markdown bold (\`**word**\`) for key vocab.
- "diagram": (String) A highly detailed text description of a scientific concept map, model, or flowchart for the teacher to generate an image from. It should specify the layout, objects, labels, and connections. For example: 'A flowchart with three boxes. Box 1 on the left contains the text 'Sunlight'. An arrow points from Box 1 to Box 2 in the center. Box 2 contains the text 'Photosynthesis in Chloroplast'. An arrow points from Box 2 to Box 3 on the right. Box 3 contains the text 'Glucose (Energy)'. All text must be exactly as written here.'
- "conceptCheckQuestions": (Array of Objects) 2-3 questions. Each object must have "question" (String) and "dok" (Number, 1, 2, or 3). Ensure a mix of DOK levels.

**C. "guidedPractice"** (Object, 15–20 min)
- "teacherActions": (Array of Strings) Verbatim script for launching and managing the activity.
- "expectedStudentOutputs": (Array of Strings) An exemplar of a completed graphic organizer or collaborative output.
- "activityContent": (Object or String) **EITHER** a data table object (with "title", "headers", "rows") **OR** a string describing a non-data-based activity.

**D. "checkFoUnderstanding"** (Object, CFU)
- "teacherActions": (Array of Strings) Script for administering the CFU.
- "expectedStudentOutputs": (Array of Strings) A correct, high-quality sample response for the short-answer question.
- "multipleChoice": (Array of Objects) Exactly 2 multiple-choice questions. Each object needs "question" (String), "dok" (Number), "options" (Array of Strings), and "answer" (String).
- "shortResponse": (Object) One short-response question with "question" (String) and "dok" (Number).

**E. "independentPractice"** (Object, Performance Task)
- "teacherActions": (Array of Strings) Script for setting up the task.
- "expectedStudentOutputs": (Array of Strings) A full, high-quality exemplar of a complete CER response.
- "taskPrompt": (String) One full CER (Claim, Evidence, Reasoning) prompt.
- "taskData": (Object or null) Any necessary data for the task, using the same structure as "activityContent" data table.

**F. "closure"** (Object, Exit Ticket)
- "teacherActions": (Array of Strings) Script for the closure.
- "expectedStudentOutputs": (Array of Strings) An exemplar response for the exit ticket.
- "exitTicketQuestion": (String) One exit ticket item.

**G. "homework"** (Object)
- "activity": (String) A short, relevant assignment. **If the homework requires a reading passage, you MUST generate and embed that content directly. Do NOT refer to external textbooks.**

**H. "differentiation"** (Object)
- "supportActions": (Array of Strings) **Elaborate on specific strategies.**
- "supportOutputs": (Array of Strings) **Elaborate on potential student outputs with scaffolds.**
- "scaffoldedMaterials": (String) **Provide ready-to-use scaffolds.**
- "extensionActivity": (String) **Elaborate on a challenging prompt or activity.**
---
**Final Instruction**: Review your entire response. Ensure every single section from A to H is present and fully generated. **Do not use placeholders or refer to external materials that you have not created.** All content must be created and embedded directly.`,
});

const generateESSLessonFlow = ai.defineFlow(
  {
    name: 'generateESSLessonFlow',
    inputSchema: GenerateESSLessonInputSchema,
    outputSchema: GenerateESSLessonOutputSchema,
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

export async function generateESSLesson(input: GenerateESSLessonInput): Promise<GenerateESSLessonOutput> {
    return await generateESSLessonFlow(input);
}
