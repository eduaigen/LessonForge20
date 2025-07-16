
import { z } from 'zod';
import { GenerateELLTestOutputSchema } from './ell-test-schemas';

export const DifferentiatedELLTestInputSchema = z.object({
  originalTest: GenerateELLTestOutputSchema.describe("The original ELL test object to be differentiated."),
});
export type DifferentiatedELLTestInput = z.infer<typeof DifferentiatedELLTestInputSchema>;
