
import { z } from 'zod';

export const CurriculumAuditInputSchema = z.object({
  curriculumContent: z.string().describe('A string containing the JSON representation of the lesson(s), topic, or unit being audited.'),
  auditStandard: z.string().describe('The educational standard to audit the lesson against.'),
});

const pedagogicalInsightSchema = z.object({
    insteadOf: z.string().describe("A direct quote of a complex sentence or question from the provided lesson content."),
    tryThis: z.string().describe("A rewritten, simplified version of the 'insteadOf' content."),
    because: z.string().describe("A brief pedagogical justification for the change."),
});

const differentiationInsightSchema = z.object({
    activity: z.string().describe("The name of a specific activity from the lesson (e.g., 'the Guided Practice task')."),
    scaffold: z.string().describe("A description of a concrete scaffold to provide (e.g., 'a version of the worksheet with sentence starters')."),
});

const engagementInsightSchema = z.object({
    concept: z.string().describe("The specific concept or lesson section to introduce (e.g., 'the Mini-Lesson on cellular respiration')."),
    hook: z.string().describe("A description of a specific, engaging hook or activity to use as an introduction."),
});

export const CurriculumAuditOutputSchema = z.object({
  alignmentGrade: z.enum(['A', 'B', 'C', 'D', 'F']).describe('The letter grade for alignment based on the rubric.'),
  auditSummary: z.string().describe('A concise summary of the audit findings.'),
  strengths: z.array(z.string()).describe('A list of key strengths of the lesson.'),
  gaps: z.array(z.string()).describe('A list of identified gaps or misalignments.'),
  suggestionsForImprovement: z.array(z.string()).describe('Actionable suggestions to improve alignment.'),
  pedagogicalInsights: z.object({
    simplify: pedagogicalInsightSchema,
    differentiate: differentiationInsightSchema,
    engage: engagementInsightSchema,
    assess: z.string().describe('A formative or summative assessment tip.'),
  }).describe('Practical pedagogical strategies to improve instruction, with specific examples from the provided content.'),
});

export type CurriculumAuditInput = z.infer<typeof CurriculumAuditInputSchema>;
export type CurriculumAuditOutput = z.infer<typeof CurriculumAuditOutputSchema>;
