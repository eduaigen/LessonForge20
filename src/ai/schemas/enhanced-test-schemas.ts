import { z } from 'zod';
import { GenerateNVBiologyTestOutputSchema } from './nv-biology-test-schemas';

export const EnhancedTestInputSchema = z.object({
  originalTest: GenerateNVBiologyTestOutputSchema.describe("The original test object to be enhanced."),
});
export type EnhancedTestInput = z.infer<typeof EnhancedTestInputSchema>;

export const EnhancedTestOutputSchema = GenerateNVBiologyTestOutputSchema;
export type EnhancedTestOutput = z.infer<typeof EnhancedTestOutputSchema>;
