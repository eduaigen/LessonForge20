
import { z } from 'zod';

export const GenerateELLLessonInputSchema = z.object({
  unit: z.string().describe('The unit from the ELL curriculum.'),
  topic: z.string().describe('The topic within the selected unit.'),
  lesson: z.string().describe('The specific lesson objective or title.'),
  additionalInfo: z.string().optional().describe('Any additional notes, requests, or context from the user.'),
});

const lessonOverviewSchema = z.object({
  unit: z.string(),
  topic: z.string(),
  lesson: z.string(),
  lessonSummary: z.string(),
  standards: z.string().describe("Relevant NYS ELA Standard (e.g., 9-10R1, 11-12W2)"),
  aim: z.string().describe("This should be the same as essentialQuestion."),
  essentialQuestion: z.string(),
  objectives: z.array(z.string()).describe("2-3 'SWBAT' objectives using Bloom’s verbs, including both content and language goals."),
  vocabulary: z.array(z.object({
    term: z.string(),
    definition: z.string(),
    studentFriendlyDefinition: z.string().describe("A simplified definition suitable for language learners.")
  })).describe("3-5 Tier 2 or 3 terms with definitions"),
  materials: z.array(z.string()).describe("All handouts, devices, printed visuals"),
});

const lessonSectionSchema = z.object({
  teacherActions: z.array(z.string()).describe('Verbatim script for teacher, including what to say and write on the board.'),
  expectedStudentOutputs: z.array(z.string()).describe('A high-quality exemplar of the expected student work product for this section.'),
});

const doNowSchema = lessonSectionSchema.extend({
  question: z.string(),
  scaffolds: z.string().describe("Description of scaffolds provided, e.g., sentence starters.")
});

const leveledQuestionSchema = z.object({
    question: z.string(),
    dok: z.number().min(1).max(3).describe("The Depth of Knowledge level (1, 2, or 3) for the question."),
});

const miniLessonSchema = lessonSectionSchema.extend({
  readingPassage: z.string().describe("300-500 words, grade-appropriate, aligned to topic, with key terms bolded. Chunked into smaller paragraphs."),
  diagram: z.string().describe("A highly detailed text description of a graphic organizer, concept map, model, or flowchart for the teacher to generate an image from. It should specify the layout, objects, labels, and connections. For example: 'A T-Chart with two columns. The left column is titled 'Cause' and the right column is titled 'Effect'. All text must be exactly as written here.'"),
  conceptCheckQuestions: z.array(leveledQuestionSchema).describe("A mix of DOK 1, 2, and 3 questions."),
});

export const graphicOrganizerSchema = z.object({
  title: z.string(),
  sections: z.array(z.string().describe("The different parts or boxes of the graphic organizer.")),
});

const guidedPracticeSchema = lessonSectionSchema.extend({
  activityContent: z.union([
    graphicOrganizerSchema,
    z.string().describe("Description of a non-data-based activity (e.g., collaborative dialogue, role-playing).")
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
  taskPrompt: z.string().describe("A rich analytical or creative writing prompt."),
  taskData: z.any().nullable().describe("Any necessary data for the task. Set to null if not applicable."),
});

const closureSchema = lessonSectionSchema.extend({
  exitTicketQuestion: z.string(),
});

const homeworkSchema = z.object({
  activity: z.string().describe("A full description of the homework, including any passages or questions."),
});

const differentiationSchema = z.object({
  supportActions: z.array(z.string()).describe('Elaborated, specific strategies for different language proficiency levels.'),
  supportOutputs: z.array(z.string()).describe('Elaborated, potential student outputs with scaffolds.'),
  scaffoldedMaterials: z.string().describe('Ready-to-use scaffolds like sentence starters, vocabulary banks with visuals, or graphic organizers.'),
  extensionActivity: z.string().describe('A challenging prompt for students who master content early.'),
});

export const GenerateELLLessonOutputSchema = z.object({
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


export type GenerateELLLessonInput = z.infer<typeof GenerateELLLessonInputSchema>;
export type GenerateELLLessonOutput = z.infer<typeof GenerateELLLessonOutputSchema>;
