
import { z } from 'zod';
import { dataTableSchema } from './nv-biology-lesson-schemas';

export const GenerateWorksheetInputSchema = z.object({
  lessonPlanJson: z.string().describe('The complete lesson plan object as a JSON string.'),
});

const headerSchema = z.object({
    name: z.string(),
    date: z.string(),
    period: z.string(),
    grade: z.string(),
    class: z.string(),
    teacher: z.string(),
});

const aimSchema = z.object({
    essentialQuestion: z.string().describe("Copied from the lesson plan's Aim and Essential Question."),
    rewriteSpace: z.string().describe("A space for students to rewrite the aim in their own words."),
});

const vocabularySchema = z.object({
    title: z.string().default("Vocabulary"),
    terms: z.array(z.object({
        term: z.string(),
        definition: z.string(),
    })).describe("List of vocabulary terms and their student-friendly definitions as complete sentences."),
});

const doNowSchema = z.object({
    title: z.string().default("Do Now"),
    question: z.string().describe("The exact Do Now question from the lesson plan."),
});

const miniLessonSchema = z.object({
    title: z.string().default("Mini Lesson Notes (T-Chart)"),
    readingPassage: z.string().optional().describe("The full reading passage, if one exists in the lesson plan."),
    diagramDescription: z.string().optional().describe("A text description of a diagram for analysis."),
    notesTitle: z.string().describe("The title for the T-chart, e.g., 'Key Ideas | Notes'"),
    sentenceStarters: z.array(z.string()).optional().describe("Sentence starters to guide note-taking."),
    conceptCheckQuestions: z.array(z.object({
        question: z.string(),
        dok: z.number(),
    })).optional().describe("Questions copied from the lesson plan."),
});

const guidedPracticeSchema = z.object({
    title: z.string().default("Guided Practice"),
    instructions: z.array(z.string()).describe("Instructions for the guided practice activity."),
    dataTable: dataTableSchema.optional(),
});

const checkFoUnderstandingSchema = z.object({
    title: z.string().default("Check for Understanding"),
    multipleChoice: z.array(z.object({
        question: z.string(),
        dok: z.number(),
        options: z.array(z.string()),
        answer: z.string(),
    })).describe("Multiple choice questions copied from the lesson plan."),
    shortResponse: z.object({
        question: z.string(),
        dok: z.number(),
    }).describe("Short response question copied from the lesson plan."),
});

const independentPracticeSchema = z.object({
    title: z.string().default("Independent Practice"),
    taskPrompt: z.string().describe("The exact task prompt from the lesson plan."),
    taskData: dataTableSchema.optional(),
});

const closureSchema = z.object({
    title: z.string().default("Exit Ticket"),
    exitTicketQuestion: z.string().describe("The exact exit ticket question from the lesson plan."),
});

const homeworkSchema = z.object({
    title: z.string().default("Homework Assignment"),
    activity: z.string().describe("The full homework activity, including any embedded readings or data."),
});


export const GenerateWorksheetOutputSchema = z.object({
    header: headerSchema,
    introduction: z.string().describe("A brief overview of the lesson for the student."),
    aim: aimSchema,
    vocabulary: vocabularySchema,
    doNow: doNowSchema,
    miniLesson: miniLessonSchema,
    guidedPractice: guidedPracticeSchema,
    checkFoUnderstanding: checkFoUnderstandingSchema,
    independentPractice: independentPracticeSchema,
    closure: closureSchema,
    homework: homeworkSchema,
});


export type GenerateWorksheetInput = z.infer<typeof GenerateWorksheetInputSchema>;
export type GenerateWorksheetOutput = z.infer<typeof GenerateWorksheetOutputSchema>;
