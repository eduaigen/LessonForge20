import { z } from 'zod';
import { GenerateNVBiologyLessonOutputSchema } from './nv-biology-lesson-schemas';

export const TeacherCoachGeneratorInputSchema = z.object({
    lessonPlanJson: z.string().describe('The complete lesson plan object as a JSON string.'),
});

const coachingAdviceSchema = z.object({
  pedagogicalRationale: z.string().describe("The 'why' behind this part of the lesson."),
  sampleScript: z.string().describe("Concrete examples of what a teacher could say."),
  danielsonConnection: z.string().describe("Connection to a specific Danielson Framework component (e.g., '3b: Using Questioning and Discussion Techniques')."),
  crseUdlCheck: z.string().describe("A note on how this section supports CRSE or UDL principles."),
});

export const TeacherCoachGeneratorOutputSchema = z.object({
  doNow: coachingAdviceSchema.describe('Coaching advice for the Do Now section.'),
  miniLesson: coachingAdviceSchema.describe('Coaching advice for the Mini-Lesson section.'),
  guidedPractice: coachingAdviceSchema.describe('Coaching advice for the Guided Practice section.'),
  checkFoUnderstanding: coachingAdviceSchema.describe('Coaching advice for the CFU section.'),
  independentPractice: coachingAdviceSchema.describe('Coaching advice for the Independent Practice section.'),
  closure: coachingAdviceSchema.describe('Coaching advice for the Closure/Exit Ticket section.'),
  homework: coachingAdviceSchema.describe('Coaching advice for the Homework section.'),
});

export type TeacherCoachGeneratorInput = z.infer<typeof GenerateNVBiologyLessonOutputSchema>;
export type TeacherCoachGeneratorOutput = z.infer<typeof TeacherCoachGeneratorOutputSchema>;
