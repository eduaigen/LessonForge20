
import { z } from 'zod';

export const CurriculumAuditInputSchema = z.object({
  lessonTitle: z.string().describe('The title of the lesson being audited.'),
  lessonObjective: z.string().describe('The stated learning objective of the lesson.'),
  lessonStandard: z.string().describe('The standard the lesson is originally aligned to.'),
  auditStandard: z.string().describe('The educational standard to audit the lesson against.'),
});

export const CurriculumAuditOutputSchema = z.object({
  alignmentGrade: z.enum(['A', 'B', 'C', 'D', 'F']).describe('The letter grade for alignment based on the rubric.'),
  auditSummary: z.string().describe('A concise summary of the audit findings.'),
  strengths: z.array(z.string()).describe('A list of key strengths of the lesson.'),
  gaps: z.array(z.string()).describe('A list of identified gaps or misalignments.'),
  suggestionsForImprovement: z.array(z.string()).describe('Actionable suggestions to improve alignment.'),
  pedagogicalInsights: z.object({
    simplify: z.string().describe('A strategy to simplify the concept for struggling learners.'),
    differentiate: z.string().describe('A strategy for differentiating instruction for diverse learners.'),
    engage: z.string().describe('A strategy to increase student engagement.'),
    assess: z.string().describe('A formative or summative assessment tip.'),
  }).describe('Practical pedagogical strategies to improve instruction.'),
});

export type CurriculumAuditInput = z.infer<typeof CurriculumAuditInputSchema>;
export type CurriculumAuditOutput = z.infer<typeof CurriculumAuditOutputSchema>;
