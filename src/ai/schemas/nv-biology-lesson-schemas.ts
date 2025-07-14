import { z } from 'zod';

export const GenerateNVBiologyLessonInputSchema = z.object({
  unit: z.string().describe('The unit from the NV Biology curriculum.'),
  topic: z.string().describe('The topic within the selected unit.'),
  lesson: z.string().describe('The specific lesson objective or title.'),
  additionalInfo: z.string().optional().describe('Any additional notes, requests, or context from the user.'),
});

const lessonOverviewSchema = z.object({
  unit: z.string(),
  topic: z.string(),
  lesson: z.string(),
  lessonSummary: z.string(),
  standards: z.string().describe("NGSS / NYSSLS Standards (e.g., HS-LS1-5: Use a model to illustrate...)"),
  aim: z.string(),
  essentialQuestion: z.string(),
  objectives: z.array(z.string()).describe("2-3 'SWBAT' objectives using Bloom’s verbs"),
  vocabulary: z.array(z.object({ term: z.string(), definition: z.string() })).describe("3-5 Tier 2 or 3 terms with definitions"),
  materials: z.array(z.string()).describe("All handouts, devices, printed visuals"),
});

const lessonSectionSchema = z.object({
  teacherActions: z.array(z.string()),
  expectedStudentOutputs: z.array(z.string()),
});

const doNowSchema = lessonSectionSchema.extend({
  question: z.string(),
});

const miniLessonSchema = lessonSectionSchema.extend({
  readingPassage: z.string().describe("100-250 words, grade-appropriate, aligned to topic"),
  diagram: z.string().optional().describe("A fully rendered, labeled SVG scientific diagram. Not a text description."),
  conceptCheckQuestions: z.array(z.string()),
});

const guidedPracticeSchema = lessonSectionSchema.extend({
  dataTable: z.object({
    title: z.string().describe("Title for the data table."),
    headers: z.array(z.string()),
    rows: z.array(z.array(z.string())),
  }).optional().describe("A complete and structured data table."),
  activityDescription: z.string().optional().describe("Description of the activity if not a data table."),
});

const cfuSchema = lessonSectionSchema.extend({
  multipleChoice: z.array(z.object({
    question: z.string(),
    options: z.array(z.string()),
    answer: z.string(),
  })),
  shortResponse: z.string(),
});

const independentPracticeSchema = lessonSectionSchema.extend({
  taskPrompt: z.string().describe("A full CER (Claim, Evidence, Reasoning) prompt or another analytical task."),
  taskData: z.object({
    title: z.string().describe("Title for the data table."),
    headers: z.array(z.string()),
    rows: z.array(z.array(z.string())),
  }).optional().describe("Any necessary data, graph, or model to be interpreted."),
});

const closureSchema = lessonSectionSchema.extend({
  exitTicketQuestion: z.string(),
});

const homeworkSchema = z.object({
  activity: z.string(),
});

const differentiationSchema = z.object({
  supportActions: z.array(z.string()),
  supportOutputs: z.array(z.string()),
  extensionActivity: z.string(),
});

export const GenerateNVBiologyLessonOutputSchema = z.object({
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


export type GenerateNVBiologyLessonInput = z.infer<typeof GenerateNVBiologyLessonInputSchema>;
export type GenerateNVBiologyLessonOutput = z.infer<typeof GenerateNVBiologyLessonOutputSchema>;
