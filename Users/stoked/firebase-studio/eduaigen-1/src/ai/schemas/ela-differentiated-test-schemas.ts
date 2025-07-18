
import { z } from 'zod';
import { GenerateELATestOutputSchema } from './ela-test-schemas';

export const DifferentiatedELATestInputSchema = z.object({
  originalTest: GenerateELATestOutputSchema.describe("The original ELA test object to be differentiated."),
});
export type DifferentiatedELATestInput = z.infer<typeof DifferentiatedELATestInputSchema>;
