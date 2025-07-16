import { z } from 'zod';
import { GenerateNVBiologyTestOutputSchema } from './nv-biology-test-schemas';

export const DifferentiatedTestInputSchema = z.object({
  originalTest: GenerateNVBiologyTestOutputSchema.describe("The original test object to be differentiated."),
});
export type DifferentiatedTestInput = z.infer<typeof DifferentiatedTestInputSchema>;

export const DifferentiatedTestOutputSchema = GenerateNVBiologyTestOutputSchema;
export type DifferentiatedTestOutput = z.infer<typeof DifferentiatedTestOutputSchema>;
