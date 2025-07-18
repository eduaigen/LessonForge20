
import { z } from 'zod';
import { GenerateNVBiologyTestOutputSchema } from './nv-biology-test-schemas';

export const TestStudySheetInputSchema = z.object({
  originalTest: GenerateNVBiologyTestOutputSchema.describe("The original test object to create a study sheet from."),
});
export type TestStudySheetInput = z.infer<typeof TestStudySheetInputSchema>;

export const TestStudySheetOutputSchema = z.object({
  title: z.string(),
  keyConcepts: z.array(z.string()).describe("A list of the core scientific concepts or formulas students must understand for the test."),
  vocabulary: z.array(z.object({ term: z.string(), definition: z.string() })).describe("A list of key vocabulary terms and their definitions."),
  essentialQuestions: z.array(z.string()).optional().describe("A list of guiding questions students should be able to answer after studying."),
  workedExample: z.string().optional().describe("A step-by-step worked example of a key problem type from the test."),
  practiceQuestions: z.array(z.string()).optional().describe("A list of practice problems for students to try on their own."),
});
export type TestStudySheetOutput = z.infer<typeof TestStudySheetOutputSchema>;
