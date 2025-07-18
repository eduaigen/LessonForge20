
import { z } from 'zod';
import { QuestionClusterSchema } from './question-cluster-generator-schemas';

export const GenerateScienceTestInputSchema = z.object({
  units: z.array(z.string()).describe('An array of curriculum units to base the test on.'),
  dokLevel: z.number().min(1).max(4).describe('The desired Depth of Knowledge level for the questions.'),
  clusterCount: z.number().min(1).max(5).describe('The number of question clusters to generate.'),
});

export const GenerateScienceTestOutputSchema = z.object({
  testTitle: z.string(),
  instructions: z.string().describe("Student-facing instructions for the test."),
  clusters: z.array(QuestionClusterSchema),
});

export type GenerateScienceTestInput = z.infer<typeof GenerateScienceTestInputSchema>;
export type GenerateScienceTestOutput = z.infer<typeof GenerateScienceTestOutputSchema>;
