
import { z } from 'zod';
import { GenerateELATestOutputSchema } from './ela-test-schemas';

export const EnhancedELATestInputSchema = z.object({
  originalTest: GenerateELATestOutputSchema.describe("The original ELA test object to be enhanced."),
});
export type EnhancedELATestInput = z.infer<typeof EnhancedELATestInputSchema>;
