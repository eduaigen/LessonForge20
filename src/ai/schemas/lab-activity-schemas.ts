
import { z } from 'zod';

const dataTableSchema = z.object({
  title: z.string(),
  headers: z.array(z.string()),
  rows: z.array(z.array(z.string())).optional().describe("Pre-filled rows if any, otherwise students fill it."),
});

export const GenerateLabActivityOutputSchema = z.object({
  labTitle: z.string().describe("A concise and descriptive title for the lab activity."),
  subjectArea: z.enum(["Biology", "Chemistry", "Physics", "Earth Science"]),
  gradeLevel: z.string().default("High School (9-12)"),
  timeBreakdown: z.string().describe("Time breakdown for the activity, e.g., '5 min intro, 25 min activity, 10 min data/discussion, 5 min cleanup'."),
  learningObjectives: z.array(z.string()).describe("2-3 specific learning objectives students should achieve."),
  ngssAlignment: z.object({
    performanceExpectation: z.string().describe("The primary NGSS Performance Expectation (PE) addressed."),
    scienceAndEngineeringPractice: z.string().describe("The key Science and Engineering Practice (SEP) used."),
    disciplinaryCoreIdea: z.string().describe("The core Disciplinary Core Idea (DCI) explored."),
    crosscuttingConcept: z.string().describe("The central Crosscutting Concept (CCC) highlighted."),
  }),
  phenomenonReading: z.string().describe("A 500-800 word, grade-appropriate reading passage that presents a real-world phenomenon or scenario to anchor the lab and provide context."),
  preLabQuestions: z.array(z.string()).describe("2-3 high-level (DOK 3-4) questions for students to answer based on the phenomenon reading before starting the lab."),
  testableQuestionPrompt: z.string().default("Based on the reading and pre-lab questions, what is one testable question you can investigate?"),
  hypothesisPrompt: z.string().default("Write a hypothesis for your testable question. Use an 'If... then... because...' format."),
  variablesPrompt: z.object({
      independent: z.string().default("What is the independent variable (the one you will change)?"),
      dependent: z.string().default("What is the dependent variable (the one you will measure)?"),
      controlled: z.string().default("What are the key variables you need to keep constant?"),
  }),
  materialsAndEquipment: z.array(z.string()).describe("A detailed list of all necessary materials, assuming standard lab access."),
  safetyPrecautions: z.array(z.string()).describe("Crucial safety warnings and procedures."),
  studentProcedureDesign: z.string().describe("A concise prompt instructing the student to write their own step-by-step experimental procedure."),
  dataCollection: z.object({
    description: z.string().describe("Instructions for what data to collect."),
    dataTable: dataTableSchema.optional(),
  }),
  conclusionPrompt: z.string().default("Based on your data and analysis, was your hypothesis supported or refuted? Use evidence from your investigation to explain your reasoning."),
  discussionQuestions: z.array(z.string()).describe("At least 5 high-level (DOK 3-4) essential questions for a post-lab class or small group discussion."),
});
export type GenerateLabActivityOutput = z.infer<typeof GenerateLabActivityOutputSchema>;

export const GenerateLabActivityInputSchema = z.object({
  lessons: z.array(z.string()).describe("An array of lesson titles or topics the lab should be based on."),
  additionalInfo: z.string().optional().describe('Any additional notes, requests, or context from the user.'),
});
export type GenerateLabActivityInput = z.infer<typeof GenerateLabActivityInputSchema>;


// Schema for the Student Answer Sheet
export const LabStudentSheetInputSchema = z.object({
  originalLab: GenerateLabActivityOutputSchema,
});

export const LabStudentSheetOutputSchema = z.object({
    title: z.string(),
    phenomenonReading: z.string(),
    preLabQuestions: z.array(z.string()),
    testableQuestion: z.object({
        prompt: z.string(),
    }),
    hypothesis: z.object({
        prompt: z.string(),
    }),
    variables: z.object({
        independentPrompt: z.string(),
        dependentPrompt: z.string(),
        controlledPrompt: z.string(),
    }),
    materials: z.array(z.string()),
    procedure: z.object({
        prompt: z.string(),
    }),
    dataCollection: z.object({
        description: z.string(),
        dataTable: dataTableSchema.extend({
          rows: z.array(z.array(z.string())).min(6), // Ensure at least 6 empty rows
        }).optional(),
    }),
    dataAnalysis: z.object({ prompt: z.string().default("Analyze your data. What patterns or trends do you see? Create a graph if appropriate. Explain what your results mean.") }),
    conclusion: z.object({
        prompt: z.string(),
    }),
    discussionQuestions: z.array(z.string()),
});

// Schema for the Lab Answer Key
export const LabAnswerKeyInputSchema = z.object({
  originalLab: GenerateLabActivityOutputSchema,
});

export const LabAnswerKeyOutputSchema = z.object({
    title: z.string(),
    preLabAnswers: z.array(z.string()),
    sampleTestableQuestion: z.string(),
    sampleHypothesis: z.string(),
    procedureNotes: z.array(z.string()).describe("Key elements a successful procedure should include."),
    sampleData: dataTableSchema,
    sampleAnalysisAndConclusion: z.string(),
    discussionAnswers: z.array(z.string()),
});

// Schema for the Teacher Coach document
export const LabTeacherCoachInputSchema = z.object({
  originalLab: GenerateLabActivityOutputSchema,
});

const CoachingAdviceSchema = z.object({
    pedagogicalRationale: z.string(),
    facilitationTip: z.string().optional(),
    sampleScript: z.string().optional(),
});

export const LabTeacherCoachOutputSchema = z.object({
    title: z.string(),
    introduction: CoachingAdviceSchema,
    preLab: CoachingAdviceSchema,
    testableQuestionAndHypothesis: CoachingAdviceSchema,
    procedureDesign: CoachingAdviceSchema,
    dataCollection: CoachingAdviceSchema,
    discussionAndConclusion: CoachingAdviceSchema,
});
export type LabTeacherCoachOutputSchema = z.infer<typeof LabTeacherCoachOutputSchema>;


// Schema for the Differentiated Lab flow
export const DifferentiatedLabInputSchema = z.object({
  originalLab: GenerateLabActivityOutputSchema,
});
