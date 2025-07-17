
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
  prompt: `You are an expert instructional coach and curriculum designer with deep knowledge of various educational standards including NGSS, Common Core, and state-specific frameworks. Your task is to perform a detailed audit of a given lesson, topic, or unit against a specified standard.

**Curriculum Content to Audit:**
---
{{{curriculumContent}}}
---

**Standard to Audit Against:**
---
{{{auditStandard}}}
---

**Instructions:**
1.  **Analyze the Content:** Carefully review the provided curriculum content. This could be a single lesson, a topic with multiple lessons, or a full unit.
2.  **Compare to Audit Standard:** Compare the content's components (objectives, activities, etc.) to the specified audit standard.
3.  **Grade Alignment:** Provide a single, overall letter grade (A-F) for alignment based on the provided rubric.
    - A: Fully aligned, all learning targets addressed, cognitively rigorous.
    - B: Mostly aligned with minor scope/depth issues.
    - C: Partial alignment with major gaps in content or assessment.
    - D: Minimal alignment, unclear objectives, weak instructional design.
    - F: No meaningful alignment or relevance to selected standards.
4.  **Write Audit Summary:** Provide a concise, 2-3 sentence summary of the audit findings for the entire selection.
5.  **Identify Strengths and Gaps:**
    - List 1-2 key strengths of the curriculum content in relation to the audit standard.
    - Clearly identify any major gaps or misalignments.
6.  **Provide Suggestions for Improvement:** Offer 2-3 concrete, actionable suggestions to improve alignment for the overall selection.
7.  **Generate Pedagogical Insights with Specific Examples:** For "Simplify," "Differentiate," and "Engage," you MUST provide concrete examples by quoting or referencing specific parts of the provided curriculum content.

    - **Simplify:**
        - **"Instead of this..."**: Quote a specific complex sentence or question from the lesson.
        - **"Try this..."**: Rewrite the quoted part to be clearer and more accessible.
        - **"Because..."**: Briefly explain why the revised version is better for student understanding.

    - **Differentiate:**
        - **"For the activity..."**: Name a specific activity from the lesson (e.g., "the 'guidedPractice' data analysis").
        - **"Provide this scaffold..."**: Describe a concrete scaffold (e.g., "a graphic organizer with sentence starters," "a version of the data table with the first row completed as an example").

    - **Engage:**
        - **"To introduce the..."**: Name a specific concept or section from the lesson (e.g., "the 'miniLesson' on photosynthesis").
        - **"Use this hook..."**: Describe a specific, engaging activity (e.g., "a 'Notice and Wonder' protocol with a time-lapse video of a growing plant").

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
