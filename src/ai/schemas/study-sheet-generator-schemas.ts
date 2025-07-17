
import { z } from 'zod';

export const StudySheetInputSchema = z.object({
  lessonPlanJson: z.string().describe('The complete lesson plan object as a JSON string.'),
});

export const StudySheetOutputSchema = z.object({
  lessonTitle: z.string().describe("The main title of the lesson."),
  essentialQuestion: z.string().describe("The main 'aim' or essential question of the lesson."),
  vocabulary: z.array(z.object({
    term: z.string(),
    definition: z.string(),
  })).describe('A list of key vocabulary terms and their definitions from the lesson.'),
  coreConcepts: z.array(z.string()).describe('A bulleted list summarizing the 3-5 most important scientific concepts or big ideas from the lesson, synthesized from the mini-lesson reading and objectives.'),
  keyDiagram: z.string().optional().describe("A text description of the most important diagram or model from the mini-lesson, explaining what it shows."),
  practiceQuestions: z.array(z.object({
    question: z.string(),
    source: z.string().describe("The section of the lesson the question is from (e.g., 'Do Now', 'Concept Check', 'Check for Understanding', 'Exit Ticket').")
  })).describe("A list of key questions from the lesson that students can use to check their understanding."),
  activitiesAndData: z.array(z.object({
      activityTitle: z.string().describe("The title of the activity (e.g., 'Guided Practice Activity', 'Independent Practice Task')."),
      summary: z.string().describe("A brief summary of what the activity or data analysis was designed to show or prove.")
  })).describe("A summary of the key activities or data analyses from the lesson, explaining their purpose."),
});


export type StudySheetInput = z.infer<typeof StudySheetInputSchema>;
export type StudySheetOutput = z.infer<typeof StudySheetOutputSchema>;
