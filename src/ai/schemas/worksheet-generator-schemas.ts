import { z } from 'zod';
import { GenerateNVBiologyLessonOutputSchema } from './nv-biology-lesson-schemas';

export const WorksheetGeneratorInputSchema = GenerateNVBiologyLessonOutputSchema;

const worksheetHeaderSchema = z.object({
    name: z.string().default('Name: ___________________________'),
    class: z.string().default('Class: ___________________________'),
    date: z.string().default('Date: ___________________________'),
});

const multipleChoiceQuestionSchema = z.object({
  question: z.string(),
  dok: z.number().optional(),
  options: z.array(z.string()),
  answer: z.string().optional(),
});

const shortResponseQuestionSchema = z.object({
    question: z.string(),
    dok: z.number().optional(),
});

const dataTableSchema = z.object({
    title: z.string(),
    headers: z.array(z.string()),
    rows: z.array(z.array(z.string())),
});

export const WorksheetGeneratorOutputSchema = z.object({
    header: worksheetHeaderSchema,
    introduction: z.string().describe('A brief, 1-2 sentence introduction for the student about the lesson.'),
    aim: z.object({
        essentialQuestion: z.string(),
        rewriteSpace: z.string().default('Rewrite the Aim in your own words:'),
    }),
    vocabulary: z.object({
        title: z.string().default('Key Vocabulary'),
        terms: z.array(z.object({ term: z.string(), definition: z.string() })),
    }),
    doNow: z.object({
        title: z.string().default('B. DO NOW'),
        question: z.string(),
    }),
    miniLesson: z.object({
        title: z.string().default('C. MINI-LESSON'),
        notesTitle: z.string().default('Note-Taking T-Chart'),
        readingPassage: z.string().optional(),
        diagramDescription: z.string().optional(),
        conceptCheckQuestions: z.array(shortResponseQuestionSchema).optional(),
    }),
    guidedPractice: z.object({
        title: z.string().default('D. GUIDED PRACTICE / GROUP ACTIVITY'),
        instructions: z.array(z.string()),
        dataTable: dataTableSchema.optional(),
    }),
    checkFoUnderstanding: z.object({
        title: z.string().default('E. CHECK FOR UNDERSTANDING (CFU)'),
        multipleChoice: z.array(multipleChoiceQuestionSchema),
        shortResponse: shortResponseQuestionSchema,
    }),
    independentPractice: z.object({
        title: z.string().default('F. INDEPENDENT PRACTICE / PERFORMANCE TASK'),
        taskPrompt: z.string(),
        taskData: dataTableSchema.optional(),
    }),
    closure: z.object({
        title: z.string().default('G. CLOSURE / EXIT TICKET'),
        exitTicketQuestion: z.string(),
    }),
    homework: z.object({
        title: z.string().default('H. HOMEWORK ACTIVITY'),
        activity: z.string(),
        extensionActivity: z.string().optional().describe("The extension activity for advanced students."),
        differentiation_support: z.string().optional().describe("Scaffolded materials or sentence starters for support."),
    }),
});


export type WorksheetGeneratorInput = z.infer<typeof WorksheetGeneratorInputSchema>;
export type WorksheetGeneratorOutput = z.infer<typeof WorksheetGeneratorOutputSchema>;
