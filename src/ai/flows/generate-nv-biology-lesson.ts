
'use server';
/**
 * @fileOverview An AI flow for generating a 5E lesson plan for NV Biology.
 */
import {ai} from '@/ai/genkit';
import {z} from 'zod';
import { GenerateNVBiologyLessonInputSchema, GenerateNVBiologyLessonOutputSchema, type GenerateNVBiologyLessonInput, type GenerateNVBiologyLessonOutput } from '../schemas/nv-biology-lesson-schemas';

const PromptSchema = GenerateNVBiologyLessonInputSchema.extend({
    previousAttempt: z.string().optional().describe("A stringified JSON of a previous incomplete attempt, if any."),
});

const prompt = ai.definePrompt({
  name: 'generateNVBiologyLessonPrompt',
  input: { schema: PromptSchema },
  // IMPORTANT: We are not providing an output schema here to avoid the "too many states" error.
  // The prompt itself requests a JSON object, and we will parse it manually.
  prompt: `You are an expert instructional designer and master teacher specializing in the New Visions for Public Schools science curriculum, specifically for Living Environment (Biology). Your task is to generate a comprehensive, standards-aligned, and engaging lesson plan based on the 5E instructional model that would be considered "Highly Effective" under the Danielson Framework.

Your entire response MUST be a single, valid JSON object that conforms to the structure described below. Do not include any text, backticks, or explanations outside of the JSON object.

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

**Your response MUST follow this exact JSON structure and include all specified components. Do not omit any section or field. All content, including reading passages, charts, and data tables referenced in the lesson, must be created and embedded directly within the response.**

---
**JSON STRUCTURE:**

The root object should have the following keys: "lessonOverview", "doNow", "miniLesson", "guidedPractice", "checkFoUnderstanding", "independentPractice", "closure", "homework", "differentiation".

**I. "lessonOverview"** (Object)
- "unit": (String) The full Unit name: {{{unit}}}
- "topic": (String) The full Topic name: {{{topic}}}
- "lesson": (String) The full Lesson title: {{{lesson}}}
- "lessonSummary": (String) A 2-3 sentence, teacher-facing summary of the lesson's flow and key learning outcomes.
- "standards": (String) The relevant standard code and a short description (e.g., HS-LS1-5: Use a model to illustrate...).
- "aim": (String) A deep, inquiry-based question that frames the lesson.
- "essentialQuestion": (String) The same as "aim".
- "objectives": (Array of Strings) 2-3 "SWBAT" objectives using Bloom’s verbs.
- "vocabulary": (Array of Objects) 3-5 objects, each with "term" (String) and "definition" (String).
- "materials": (Array of Strings) List all handouts, devices, printed visuals, etc.

**II. LESSON SEQUENCE** (Each of these is a key in the root JSON object)

**"doNow"** (Object, 5–8 min)
- "teacherActions": (Array of Strings) Verbatim script for the teacher.
- "expectedStudentOutputs": (Array of Strings) A high-quality exemplar of a student's written response.
- "question": (String) 1 student-facing question prompt tied to the Aim.

**"miniLesson"** (Object, 10–15 min)
- "teacherActions": (Array of Strings) Verbatim script.
- "expectedStudentOutputs": (Array of Strings) An exemplar of student work (e.g., an annotated paragraph).
- "readingPassage": (String) A **300-500 word**, grade-appropriate reading passage. Use Markdown bold (\`**word**\`) for key vocab.
- "diagram": (String) A detailed text description of a scientific diagram for the teacher to generate. **Do not generate SVG code.**
- "conceptCheckQuestions": (Array of Objects) 2-3 questions. Each object must have "question" (String) and "dok" (Number, 1, 2, or 3). Ensure a mix of DOK levels.

**"guidedPractice"** (Object, 15–20 min)
- "teacherActions": (Array of Strings) Verbatim script for launching and managing the activity.
- "expectedStudentOutputs": (Array of Strings) An exemplar of a completed graphic organizer or collaborative output.
- "dataTable": (Object or null) A structured object with "title" (String), "headers" (Array of Strings), and "rows" (Array of Array of Strings). **Set to null if using activityDescription.**
- "activityDescription": (String or null) Description of a non-data-based activity. **Set to null if using dataTable.**

**"checkFoUnderstanding"** (Object, CFU)
- "teacherActions": (Array of Strings) Script for administering the CFU.
- "expectedStudentOutputs": (Array of Strings) A correct, high-quality sample response for the short-answer question.
- "multipleChoice": (Array of Objects) Exactly 2 multiple-choice questions. Each object needs "question" (String), "dok" (Number), "options" (Array of Strings), and "answer" (String).
- "shortResponse": (Object) One short-response question with "question" (String) and "dok" (Number).

**"independentPractice"** (Object, Performance Task)
- "teacherActions": (Array of Strings) Script for setting up the task.
- "expectedStudentOutputs": (Array of Strings) A full, high-quality exemplar of a complete CER response.
- "taskPrompt": (String) One full CER (Claim, Evidence, Reasoning) prompt.
- "taskData": (Object or null) Any necessary data for the task, using the same structure as "dataTable". Set to null if not applicable.

**"closure"** (Object, Exit Ticket)
- "teacherActions": (Array of Strings) Script for the closure.
- "expectedStudentOutputs": (Array of Strings) An exemplar response for the exit ticket.
- "exitTicketQuestion": (String) One exit ticket item.

**"homework"** (Object)
- "activity": (String) A short, relevant assignment. If it needs content like a reading, generate and embed that content here.

**III. "differentiation"** (Object)
- "supportActions": (Array of Strings) **Elaborate on specific strategies.**
- "supportOutputs": (Array of Strings) **Elaborate on potential student outputs with scaffolds.**
- "scaffoldedMaterials": (String) **Provide ready-to-use scaffolds.**
- "extensionActivity": (String) **Elaborate on a challenging prompt or activity.**
---
**Final Instruction**: Review your entire response. Ensure every single section from I to III is present and fully generated as a single valid JSON object. **Do not use placeholders or refer to external materials that you have not created.** All content must be created and embedded directly as valid code. Failure to comply will result in an invalid response.`,
});

function isLessonPlanComplete(plan: any): plan is GenerateNVBiologyLessonOutput {
    if (!plan || typeof plan !== 'object') return false;
    const requiredKeys = Object.keys(GenerateNVBiologyLessonOutputSchema.shape);
    for (const key of requiredKeys) {
        if (plan[key] === undefined || plan[key] === null) {
            console.warn(`Validation failed: Missing or null key '${key}'`);
            return false;
        }
    }
    return true;
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
    let lastIncompleteOutput: any = null;

    while (attempts < maxAttempts) {
        attempts++;
        
        const promptInput: z.infer<typeof PromptSchema> = { ...input };
        if (lastIncompleteOutput) {
            promptInput.previousAttempt = JSON.stringify(lastIncompleteOutput);
        }

        const { text } = await ai.generate({ prompt: prompt(promptInput) });
        
        let parsedOutput: any;
        try {
            parsedOutput = JSON.parse(text);
        } catch (e) {
            console.error(`Attempt ${attempts} failed: AI returned invalid JSON. Retrying...`, e);
            lastIncompleteOutput = { error: "Invalid JSON response", response: text };
            continue;
        }

        if (isLessonPlanComplete(parsedOutput)) {
            // Final validation with Zod schema to ensure full compliance before returning
            const finalValidation = GenerateNVBiologyLessonOutputSchema.safeParse(parsedOutput);
            if (finalValidation.success) {
                return finalValidation.data;
            } else {
                 console.error(`Attempt ${attempts} failed: Zod validation failed after JSON parsing.`, finalValidation.error);
                 lastIncompleteOutput = parsedOutput; // It's valid JSON but not a valid lesson plan
            }
        } else {
            lastIncompleteOutput = parsedOutput; // Store the incomplete output for the next attempt
            console.log(`Attempt ${attempts} failed. Lesson plan was incomplete. Retrying...`);
        }
    }

    throw new Error('The AI failed to generate a complete lesson plan after multiple attempts. Please try again.');
  }
);

export async function generateNVBiologyLesson(input: GenerateNVBiologyLessonInput): Promise<GenerateNVBiologyLessonOutput> {
    return await generateNVBiologyLessonFlow(input);
}
