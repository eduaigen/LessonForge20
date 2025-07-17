
import { z } from 'zod';

export const TeacherCoachGeneratorInputSchema = z.object({
    lessonPlanJson: z.string().describe('The complete lesson plan object as a JSON string.'),
});

const coachingAdviceSchema = z.object({
  pedagogicalRationale: z.string().describe("The 'why' behind this part of the lesson, grounded in educational theory."),
  sampleScript: z.string().describe("Concrete examples of what a teacher could say, using research-based talk moves."),
  danielsonConnection: z.string().describe("Connection to a specific Danielson Framework component (e.g., '3b: Using Questioning and Discussion Techniques')."),
  crseUdlCheck: z.string().describe("An actionable note on how this section supports CRSE or UDL principles."),
});

export const TeacherCoachGeneratorOutputSchema = z.object({
  lessonTitle: z.string().describe('The title of the lesson.'),
  teacherName: z.string().describe('A placeholder for the teacher to write their name.'),
  date: z.string().describe('A placeholder for the date.'),
  doNow: coachingAdviceSchema.describe('Coaching advice for the Do Now section.'),
  miniLesson: coachingAdviceSchema.describe('Coaching advice for the Mini-Lesson section.'),
  guidedPractice: coachingAdviceSchema.describe('Coaching advice for the Guided Practice section.'),
  checkFoUnderstanding: coachingAdviceSchema.describe('Coaching advice for the CFU section.'),
  independentPractice: coachingAdviceSchema.describe('Coaching advice for the Independent Practice section.'),
  closure: coachingAdviceSchema.describe('Coaching advice for the Closure/Exit Ticket section.'),
  homework: coachingAdviceSchema.describe('Coaching advice for the Homework section.'),
});

export type TeacherCoachGeneratorInput = z.infer<typeof TeacherCoachGeneratorInputSchema>;
export type TeacherCoachGeneratorOutput = z.infer<typeof TeacherCoachGeneratorOutputSchema>;
