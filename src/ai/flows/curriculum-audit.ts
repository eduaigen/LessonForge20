
'use server';
/**
 * @fileOverview An AI flow for auditing a curriculum lesson against educational standards.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import {
  CurriculumAuditInputSchema,
  CurriculumAuditOutputSchema,
  type CurriculumAuditInput,
  type CurriculumAuditOutput,
} from '../schemas/curriculum-audit-schemas';

const prompt = ai.definePrompt({
  name: 'curriculumAuditPrompt',
  input: { schema: CurriculumAuditInputSchema },
  output: { schema: CurriculumAuditOutputSchema },
  prompt: `You are an expert instructional coach and curriculum designer with deep knowledge of various educational standards including NGSS, Common Core, and state-specific frameworks. Your task is to perform a detailed audit of a given lesson plan against a specified standard.

**Curriculum to Audit:**
---
Lesson Title: {{{lessonTitle}}}
Lesson Objective: {{{lessonObjective}}}
Lesson Standard: {{{lessonStandard}}}
---

**Standard to Audit Against:**
---
{{{auditStandard}}}
---

**Instructions:**
1.  **Analyze the Lesson:** Carefully review the provided lesson title, objective, and its listed standard.
2.  **Compare to Audit Standard:** Compare the lesson's components to the specified audit standard.
3.  **Grade Alignment:** Provide a letter grade (A-F) for alignment based on the provided rubric.
    - A: Fully aligned, all learning targets addressed, cognitively rigorous.
    - B: Mostly aligned with minor scope/depth issues.
    - C: Partial alignment with major gaps in content or assessment.
    - D: Minimal alignment, unclear objectives, weak instructional design.
    - F: No meaningful alignment or relevance to selected standards.
4.  **Write Audit Summary:** Provide a concise, 2-3 sentence summary of the audit findings.
5.  **Identify Strengths and Gaps:**
    - List 1-2 key strengths of the lesson in relation to the audit standard.
    - Clearly identify any gaps or misalignments.
6.  **Provide Suggestions for Improvement:** Offer 2-3 concrete, actionable suggestions to improve alignment. This could include modifying objectives, adding activities, or adjusting assessments.
7.  **Generate Pedagogical Insights:** Provide a set of pedagogical strategies under the categories: "Simplify," "Differentiate," "Engage," and "Assess." These should be practical tips a teacher can use to improve instruction for this lesson.

Your response must be structured according to the output schema.
`,
});

const curriculumAuditFlow = ai.defineFlow(
  {
    name: 'curriculumAuditFlow',
    inputSchema: CurriculumAuditInputSchema,
    outputSchema: CurriculumAuditOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to generate the curriculum audit. Please try again.');
    }
    return output;
  }
);

export async function auditCurriculum(input: CurriculumAuditInput): Promise<CurriculumAuditOutput> {
  return await curriculumAuditFlow(input);
}
