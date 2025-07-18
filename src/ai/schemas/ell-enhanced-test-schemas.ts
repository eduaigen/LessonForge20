
import { z } from 'zod';

export const EnhancedELLTestInputSchema = z.object({
 originalTest: z.any().describe("The original ELL test object to be enhanced."), // Using z.any() as the specific schema is removed
});
export type EnhancedELLTestInput = z.infer<typeof EnhancedELLTestInputSchema>;
