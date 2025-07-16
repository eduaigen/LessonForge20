
import { z } from 'zod';

const timeBreakdownSchema = z.object({
  intro: z.string().describe("Time allocated for introduction, e.g., '5 min'."),
  activity: z.string().describe("Time for the hands-on activity, e.g., '25 min'."),
  discussion: z.string().describe("Time for data analysis and discussion, e.g., '10 min'."),
  cleanup: z.string().describe("Time for cleanup, e.g., '5 min'."),
});

const ngssAlignmentSchema = z.object({
  performanceExpectation: z.string().describe("The primary NGSS Performance Expectation (PE) addressed."),
  scienceAndEngineeringPractice: z.string().describe("The key Science and Engineering Practice (SEP) used."),
  disciplinaryCoreIdea: z.string().describe("The core Disciplinary Core Idea (DCI) explored."),
  crosscuttingConcept: z.string().describe("The central Crosscutting Concept (CCC) highlighted."),
});

const dataCollectionSchema = z.object({
  description: z.string().describe("Instructions for what data to collect."),
  dataTable: z.object({
    headers: z.array(z.string()),
    rows: z.array(z.array(z.string())).optional().describe("Pre-filled rows if any, otherwise students fill it."),
  }).optional(),
});

export const GenerateLabActivityOutputSchema = z.object({
  labTitle: z.string().describe("A concise and descriptive title for the lab activity."),
  subjectArea: z.enum(["Biology", "Chemistry", "Physics", "Earth Science"]),
  gradeLevel: z.string().default("High School (9-12)"),
  totalTimeRequired: z.string().default("45 minutes (Strict Maximum)"),
  timeBreakdown: timeBreakdownSchema,
  learningObjectives: z.array(z.string()).describe("2-3 specific learning objectives students should achieve."),
  ngssAlignment: ngssAlignmentSchema,
  introduction: z.string().describe("A brief background paragraph providing essential context."),
  materialsAndEquipment: z.array(z.string()).describe("A detailed list of all necessary materials, assuming standard lab access."),
  safetyPrecautions: z.array(z.string()).describe("Crucial safety warnings and procedures."),
  preLab: z.string().describe("A short pre-lab reading or set of questions for students to complete before the activity."),
  procedure: z.array(z.string()).describe("Clear, numbered, and concise steps for the lab activity."),
  dataCollectionAndAnalysis: dataCollectionSchema,
  discussionQuestions: z.array(z.string()).describe("2-3 essential questions for a brief class or small group discussion."),
  extensionActivities: z.string().describe("Suggestions for deeper investigation or analysis to be done as homework or in a future class."),
  assessmentSuggestions: z.string().describe("Ideas for quick, formative assessments during the lab period (e.g., exit ticket, observation)."),
  teacherNotes: z.string().describe("Tips for setup, common student challenges, and managing the 45-minute timeframe."),
});

export type GenerateLabActivityOutput = z.infer<typeof GenerateLabActivityOutputSchema>;

// Input schema for all lab generators
export const GenerateLabActivityInputSchema = z.object({
  lesson: z.string().describe("The specific lesson title or topic the lab should be based on."),
  additionalInfo: z.string().optional().describe('Any additional notes, requests, or context from the user.'),
});
export type GenerateLabActivityInput = z.infer<typeof GenerateLabActivityInputSchema>;
