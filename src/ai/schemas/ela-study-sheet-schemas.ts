
import { z } from 'zod';
import { GenerateELATestOutputSchema } from './ela-test-schemas';

export const ELAStudySheetInputSchema = z.object({
  originalTest: GenerateELATestOutputSchema.describe("The original ELA test object to create a study sheet from."),
});
export type ELAStudySheetInput = z.infer<typeof ELAStudySheetInputSchema>;
