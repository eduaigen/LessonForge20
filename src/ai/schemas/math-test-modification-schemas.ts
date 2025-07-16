
import { z } from 'zod';
import { GenerateMathTestOutputSchema } from './math-test-schemas';

// Input schema for creating a differentiated version of a math test
export const DifferentiatedMathTestInputSchema = z.object({
  originalTest: GenerateMathTestOutputSchema.describe("The original math test object to be differentiated."),
});

// Input schema for creating an enhanced version of a math test
export const EnhancedMathTestInputSchema = z.object({
  originalTest: GenerateMathTestOutputSchema.describe("The original math test object to be enhanced."),
});

// Input schema for creating a study sheet from a math test
export const MathStudySheetInputSchema = z.object({
  originalTest: GenerateMathTestOutputSchema.describe("The original math test object to create a study sheet from."),
});
