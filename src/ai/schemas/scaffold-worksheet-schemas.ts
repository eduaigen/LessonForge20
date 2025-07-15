import { z } from 'zod';
import { WorksheetGeneratorOutputSchema } from './worksheet-generator-schemas';

export const ScaffoldWorksheetInputSchema = z.object({
  worksheetJson: z.string().describe('The full JSON content of the original worksheet to be scaffolded.'),
});

export const ScaffoldWorksheetOutputSchema = WorksheetGeneratorOutputSchema;

export type ScaffoldWorksheetInput = z.infer<typeof ScaffoldWorksheetInputSchema>;
export type ScaffoldWorksheetOutput = z.infer<typeof ScaffoldWorksheetOutputSchema>;
