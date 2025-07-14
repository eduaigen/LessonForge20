'use server';
/**
 * @fileOverview An AI flow for adding scaffolds to an existing worksheet for ELL and SWD students.
 */
import { ai } from '@/ai/genkit';
import { z } from 'zod';
import {
  ScaffoldWorksheetInputSchema,
  ScaffoldWorksheetOutputSchema,
  type ScaffoldWorksheetInput,
  type ScaffoldWorksheetOutput,
} from '../schemas/scaffold-worksheet-schemas';

const prompt = ai.definePrompt({
  name: 'scaffoldWorksheetPrompt',
  input: { schema: ScaffoldWorksheetInputSchema },
  output: { schema: ScaffoldWorksheetOutputSchema },
  prompt: `You are an expert instructional designer specializing in creating accessible materials for English Language Learners (ELLs) and Students with Disabilities (SWDs).

Your task is to take the following student worksheet, provided in Markdown format, and regenerate it with built-in scaffolds. Do not change the core activities, but enhance them to be more accessible.

**Original Worksheet Content:**
---
{{{worksheetContent}}}
---

**Scaffolding Instructions:**
1.  **Maintain Structure:** Keep the original sections (Header, Aim, Do Now, Mini-Lesson, etc.) in the same order.
2.  **Simplify Language:** Review all instructions and questions. Rephrase complex sentences into simpler, more direct language where possible without losing academic rigor.
3.  **Add Sentence Starters:** For all open-ended questions, short responses, and reasoning prompts (like in a CER), provide sentence starters or frames.
    *   Example: For "Explain your reasoning," add: "I think this because... The evidence that supports my idea is..."
4.  **Chunk Instructions:** Break down multi-step instructions into numbered or bulleted lists.
5.  **Define Key Vocabulary:** For key vocabulary sections, add a column or line for a Spanish translation. For other sections, if a key term is used, add its definition or a simple synonym in parentheses.
6.  **Add Visual Cue Placeholders:** Where a concept is particularly abstract or complex (e.g., cell diagrams, feedback loops), insert a placeholder to indicate where a teacher could add a visual aid.
    *   Example: "[Visual Aid: A simple diagram showing the flow of energy from the sun to plants.]"
7.  **Format for Clarity:** Use bolding, italics, and lists to make the worksheet easy to navigate. Ensure there is clear space for student responses.

Generate the full, scaffolded version of the worksheet in Markdown format.`,
});

const scaffoldWorksheetFlow = ai.defineFlow(
  {
    name: 'scaffoldWorksheetFlow',
    inputSchema: ScaffoldWorksheetInputSchema,
    outputSchema: ScaffoldWorksheetOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    if (!output) {
      throw new Error('The AI failed to generate the scaffolded worksheet. Please try again.');
    }
    return output;
  }
);

export async function scaffoldWorksheet(
  input: ScaffoldWorksheetInput
): Promise<ScaffoldWorksheetOutput> {
  return await scaffoldWorksheetFlow(input);
}
