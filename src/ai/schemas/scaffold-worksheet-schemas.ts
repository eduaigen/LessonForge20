import { z } from 'zod';

export const ScaffoldWorksheetInputSchema = z.object({
  worksheetContent: z.string().describe('The full Markdown content of the original worksheet to be scaffolded.'),
});

export const ScaffoldWorksheetOutputSchema = z.object({
  scaffoldedContent: z.string().describe('The full content of the scaffolded worksheet in Markdown format.'),
});

export type ScaffoldWorksheetInput = z.infer<typeof ScaffoldWorksheetInputSchema>;
export type ScaffoldWorksheetOutput = z.infer<typeof ScaffoldWorksheetOutputSchema>;
