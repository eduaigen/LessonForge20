
import { z } from 'zod';
import { GenerateELLTestOutputSchema } from './ell-test-schemas';

export const EnhancedELLTestInputSchema = z.object({
  originalTest: GenerateELLTestOutputSchema.describe("The original ELL test object to be enhanced."),
});
export type EnhancedELLTestInput = z.infer<typeof EnhancedELLTestInputSchema>;
