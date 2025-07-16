
import { z } from 'zod';

export const GenerateESSLessonInputSchema = z.object({
  unit: z.string().describe('The unit from the NGSS Earth & Space Science curriculum.'),
  topic: z.string().describe('The topic within the selected unit.'),
  lesson: z.string().describe('The specific lesson objective or title.'),
  additionalInfo: z.string().optional().describe('Any additional notes, requests, or context from the user.'),
});

const lessonOverviewSchema = z.object({
  unit: z.string(),
  topic: z.string(),
  lesson: z.string(),
  lessonSummary: z.string(),
  standards: z.string().describe("NGSS Standards (e.g., HS-ESS1-1)"),
  aim: z.string().describe("This should be the same as essentialQuestion."),
  essentialQuestion: z.string(),
  objectives: z.array(z.string()).describe("2-3 'SWBAT' objectives using Bloom’s verbs"),
  vocabulary: z.array(z.object({ term: z.string(), definition: z.string() })).describe("3-5 Tier 2 or 3 terms with definitions"),
  materials: z.array(z.string()).describe("All handouts, devices, printed visuals"),
});

const lessonSectionSchema = z.object({
  teacherActions: z.array(z.string()).describe('Verbatim script for teacher, including what to say and write on the board.'),
  expectedStudentOutputs: z.array(z.string()).describe('A high-quality exemplar of the expected student work product for this section.'),
});

const doNowSchema = lessonSectionSchema.extend({
  question: z.string(),
});

const leveledQuestionSchema = z.object({
    question: z.string(),
    dok: z.number().min(1).max(3).describe("The Depth of Knowledge level (1, 2, or 3) for the question."),
});

const miniLessonSchema = lessonSectionSchema.extend({
  readingPassage: z.string().describe("300-500 words, grade-appropriate, aligned to topic, with key terms bolded."),
  diagram: z.string().describe("A detailed text description of a scientific diagram for the teacher to generate. Not the SVG code itself."),
  conceptCheckQuestions: z.array(leveledQuestionSchema).describe("A mix of DOK 1, 2, and 3 questions."),
});

export const dataTableSchema = z.object({
  title: z.string(),
  headers: z.array(z.string()),
  rows: z.array(z.array(z.string())),
});

const guidedPracticeSchema = lessonSectionSchema.extend({
  activityContent: z.union([
    dataTableSchema,
    z.string().describe("Description of a non-data-based activity (e.g., card sort).")
  ]),
});


const cfuSchema = lessonSectionSchema.extend({
  multipleChoice: z.array(z.object({
    question: z.string(),
    dok: z.number().min(1).max(3).describe("The Depth of Knowledge level (1, 2, or 3) for the question."),
    options: z.array(z.string()),
    answer: z.string(),
  })).min(2, "Must have at least 2 multiple-choice questions."),
  shortResponse: leveledQuestionSchema,
});

const independentPracticeSchema = lessonSectionSchema.extend({
  taskPrompt: z.string().describe("A full CER (Claim, Evidence, Reasoning) prompt or another analytical task."),
  taskData: dataTableSchema.nullable().describe("Any necessary data, graph, or model to be interpreted. Set to null if not applicable."),
});

const closureSchema = lessonSectionSchema.extend({
  exitTicketQuestion: z.string(),
});

const homeworkSchema = z.object({
  activity: z.string().describe("A full description of the homework, including any passages or questions."),
});

const differentiationSchema = z.object({
  supportActions: z.array(z.string()).describe('Elaborated, specific strategies for diverse learners.'),
  supportOutputs: z.array(z.string()).describe('Elaborated, potential student outputs with scaffolds.'),
  scaffoldedMaterials: z.string().describe('Ready-to-use scaffolds like sentence starters or simplified definitions.'),
  extensionActivity: z.string().describe('A challenging prompt for students who master content early.'),
});

export const GenerateESSLessonOutputSchema = z.object({
  lessonOverview: lessonOverviewSchema,
  doNow: doNowSchema,
  miniLesson: miniLessonSchema,
  guidedPractice: guidedPracticeSchema,
  checkFoUnderstanding: cfuSchema,
  independentPractice: independentPracticeSchema,
  closure: closureSchema,
  homework: homeworkSchema,
  differentiation: differentiationSchema,
});


export type GenerateESSLessonInput = z.infer<typeof GenerateESSLessonInputSchema>;
export type GenerateESSLessonOutput = z.infer<typeof GenerateESSLessonOutputSchema>;
