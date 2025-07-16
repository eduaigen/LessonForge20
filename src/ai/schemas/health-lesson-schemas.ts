import { z } from 'zod';
import { dataTableSchema } from './nv-biology-lesson-schemas'; // Re-use from another schema

export const GenerateHealthLessonInputSchema = z.object({
  unit: z.string().describe('The unit from the Health curriculum.'),
  topic: z.string().describe('The topic within the selected unit.'),
  lesson: z.string().describe('The specific lesson objective or title.'),
  additionalInfo: z.string().optional().describe('Any additional notes, requests, or context from the user.'),
});

const lessonOverviewSchema = z.object({
  unit: z.string(),
  topic: z.string(),
  lesson: z.string(),
  lessonSummary: z.string(),
  standards: z.string().describe("Relevant Health Education Standard and a short description."),
  aim: z.string().describe("This should be a deep, inquiry-based question that frames the lesson."),
  essentialQuestion: z.string().describe("This should be the same as the aim."),
  objectives: z.array(z.string()).describe("2-3 'SWBAT' objectives using Bloom’s verbs"),
  vocabulary: z.array(z.object({ term: z.string(), definition: z.string() })).describe("3-5 Tier 2 or 3 terms with definitions"),
  materials: z.array(z.string()).describe("List of all handouts, devices, printed visuals, etc."),
});

const lessonSectionSchema = z.object({
  teacherActions: z.array(z.string()).describe('Verbatim script for the teacher, including what to say and what to write on the board.'),
  expectedStudentOutputs: z.array(z.string()).describe('A high-quality exemplar of the expected student work product for this section.'),
});

const doNowSchema = lessonSectionSchema.extend({
  question: z.string().describe("A student-facing question prompt tied to the Aim."),
});

const leveledQuestionSchema = z.object({
    question: z.string(),
    dok: z.number().min(1).max(3).describe("The Depth of Knowledge level (1, 2, or 3) for the question."),
});

const miniLessonSchema = lessonSectionSchema.extend({
  readingPassage: z.string().describe("A 300-500 word, grade-appropriate reading passage. Key terms should be bolded using Markdown."),
  diagram: z.string().describe("A detailed text description of a health-related concept map, model, or flowchart for the teacher to generate. Not the SVG code itself."),
  conceptCheckQuestions: z.array(leveledQuestionSchema).describe("A mix of DOK 1, 2, and 3 questions."),
});

const guidedPracticeSchema = lessonSectionSchema.extend({
  activityContent: z.union([
    dataTableSchema,
    z.string().describe("Description of a non-data-based activity (e.g., role-play, scenario analysis).")
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
  taskPrompt: z.string().describe("A full CER (Claim, Evidence, Reasoning) prompt or another analytical/application-based task."),
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
  scaffoldedMaterials: z.string().describe('Ready-to-use scaffolds like sentence starters, graphic organizers, or simplified definitions.'),
  extensionActivity: z.string().describe('A challenging prompt or activity for students who master the content early.'),
});

export const GenerateHealthLessonOutputSchema = z.object({
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

export type GenerateHealthLessonInput = z.infer<typeof GenerateHealthLessonInputSchema>;
export type GenerateHealthLessonOutput = z.infer<typeof GenerateHealthLessonOutputSchema>;
