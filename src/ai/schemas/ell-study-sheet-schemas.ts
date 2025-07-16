
import { z } from 'zod';
import { GenerateELLTestOutputSchema } from './ell-test-schemas';

export const ELLStudySheetInputSchema = z.object({
  originalTest: GenerateELLTestOutputSchema.describe("The original ELL test object to create a study sheet from."),
});
export type ELLStudySheetInput = z.infer<typeof ELLStudySheetInputSchema>;
