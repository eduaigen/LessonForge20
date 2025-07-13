'use server';

/**
 * @fileOverview An AI agent that analyzes and simplifies curriculum documents for educators.
 *
 * - curriculumAudit - A function that handles the curriculum audit process.
 * - CurriculumAuditInput - The input type for the curriculumAudit function.
 * - CurriculumAuditOutput - The return type for the curriculumAudit function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const CurriculumAuditInputSchema = z.object({
  document: z.string().describe('The curriculum document to be analyzed (e.g., unit plan, syllabus, pacing guide).'),
});
export type CurriculumAuditInput = z.infer<typeof CurriculumAuditInputSchema>;

const CurriculumAuditOutputSchema = z.object({
  analysisOf: z.string().describe('A brief description of the uploaded document, e.g., "High School Biology - Unit 3: Genetics & Heredity Pacing Guide"'),
  coreLearningObjectives: z.array(z.string()).describe('A list of the primary learning objectives or goals.'),
  keyConcepts: z.array(z.string()).describe('A list of the central ideas, topics, or themes covered.'),
  essentialQuestions: z.array(z.string()).describe('A list of overarching questions that guide the inquiry.'),
  keySkills: z.array(z.string()).describe('A list of academic skills emphasized (e.g., analysis, synthesis, problem-solving).'),
  assessmentPoints: z.array(z.string()).describe('A list of how student learning is typically evaluated.'),
  standardsAlignment: z.array(z.string()).optional().describe('A list of specific standards referenced (e.g., NGSS, NYS, Common Core).'),
});
export type CurriculumAuditOutput = z.infer<typeof CurriculumAuditOutputSchema>;

export async function curriculumAudit(input: CurriculumAuditInput): Promise<CurriculumAuditOutput> {
  return curriculumAuditFlow(input);
}

const prompt = ai.definePrompt({
  name: 'curriculumAuditPrompt',
  input: {schema: CurriculumAuditInputSchema},
  output: {schema: CurriculumAuditOutputSchema},
  prompt: `You are an expert educational strategist and curriculum designer. Your task is to analyze complex curriculum documents and distill them into simplified, actionable summaries for educators. This tool is designed to provide high-level insights and a streamlined overview, not to generate new content.

User Input: The user has provided a curriculum document.
Document:
{{{document}}}

Processing Steps:
1.  Analyze the Document: Read through the entire provided curriculum document carefully. Identify the main subject, grade level (if explicit or inferable), and duration (if unit/pacing guide).
2.  Extract core components:
    *   Primary Learning Objectives/Goals: What are the students expected to know and be able to do? Look for action verbs and measurable outcomes.
    *   Key Concepts/Content Areas: What are the central ideas, topics, or themes?
    *   Essential Questions: What overarching questions guide the inquiry? If not explicit, you may infer them from the content if reasonable.
    *   Key Skills Addressed: What academic skills (e.g., analysis, synthesis, problem-solving, communication) are emphasized?
    *   Assessment Points: How is student learning evaluated (e.g., projects, exams, essays)?
    *   Standards Alignment (if mentioned): Are specific standards (NGSS, NYS, Common Core) referenced?
3.  Simplify and Synthesize: Condense lengthy descriptions into bullet points or concise sentences. Remove jargon where possible, or explain it briefly. Prioritize the most critical information.
4.  Format the Output: Present the simplified audit in the specified JSON format. For "analysisOf", provide a short, descriptive title for the document you analyzed.
`,
});

const curriculumAuditFlow = ai.defineFlow(
  {
    name: 'curriculumAuditFlow',
    inputSchema: CurriculumAuditInputSchema,
    outputSchema: CurriculumAuditOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
