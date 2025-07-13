'use server';

/**
 * @fileOverview AI agent that generates lab experiments for science lessons.
 *
 * - generateLabExperiment - A function that generates lab experiments based on the selected lesson.
 * - GenerateLabExperimentInput - The input type for the generateLabExperiment function.
 * - GenerateLabExperimentOutput - The return type for the generateLabExperiment function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateLabExperimentInputSchema = z.object({
  lessonDescription: z.string().describe('The description of the lesson.'),
  subject: z.string().describe('The science subject (e.g., Biology, Chemistry, Physics).'),
  gradeLevel: z.number().describe('The grade level of the students.'),
  topic: z.string().describe('The specific topic of the lab experiment.'),
});
export type GenerateLabExperimentInput = z.infer<typeof GenerateLabExperimentInputSchema>;

const GenerateLabExperimentOutputSchema = z.object({
  title: z.string().describe('The title of the lab experiment.'),
  objective: z.string().describe('The learning objective of the lab experiment.'),
  materials: z.string().describe('A list of materials needed for the lab experiment.'),
  procedure: z.string().describe('A detailed procedure for conducting the lab experiment.'),
  safetyGuidelines: z.string().describe('Important safety guidelines for the lab experiment.'),
  disposalInstructions: z.string().describe('Instructions for proper disposal of materials.'),
  ngssAlignment: z.string().describe('Next Generation Science Standards alignment.'),
});
export type GenerateLabExperimentOutput = z.infer<typeof GenerateLabExperimentOutputSchema>;

export async function generateLabExperiment(input: GenerateLabExperimentInput): Promise<GenerateLabExperimentOutput> {
  return generateLabExperimentFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateLabExperimentPrompt',
  input: {schema: GenerateLabExperimentInputSchema},
  output: {schema: GenerateLabExperimentOutputSchema},
  prompt: `You are an experienced science teacher creating a lab experiment for a lesson.

  Subject: {{{subject}}}
  Grade Level: {{{gradeLevel}}}
  Lesson Description: {{{lessonDescription}}}
  Topic: {{{topic}}}

  Generate a detailed lab experiment, including the title, objective, materials, procedure, safety guidelines, disposal instructions and alignment with Next Generation Science Standards (NGSS).
  Ensure the lab experiment is appropriate for the specified grade level and aligns with the lesson description.

  Consider culturally inclusive frameworks in the design of the experiment.
  Be very specific and assume the teacher knows nothing about the topic.
  Here is an example of the format you MUST return.
  {
    "title": "Exploring Density",
    "objective": "Students will determine the density of different materials and relate it to their ability to float or sink.",
    "materials": "- Variety of objects (e.g., rocks, wood, plastic)
- Water
- Graduated cylinders
- Balances",
    "procedure": "1. Measure the mass of each object using a balance.
2. Measure the volume of each object using water displacement in a graduated cylinder.
3. Calculate the density of each object using the formula: density = mass / volume.
4. Place each object in water and observe whether it floats or sinks.
5. Relate the density of each object to its ability to float or sink.",
    "safetyGuidelines": "- Wear safety goggles to protect your eyes.
- Handle glassware with care to avoid breakage.
- Clean up any spills immediately to prevent accidents.",
    "disposalInstructions": "- Dispose of any waste materials in the appropriate containers.
- Clean and dry all equipment before returning it to storage.",
    "ngssAlignment": "- NGSS Standard: MS-PS1-2 Analyze and interpret data on the properties of substances before and after the substances interact to determine if a chemical reaction has occurred."
  }

  Follow this example output format exactly!
  Do not write any other text besides the json output.
  Output:
  `,
});

const generateLabExperimentFlow = ai.defineFlow(
  {
    name: 'generateLabExperimentFlow',
    inputSchema: GenerateLabExperimentInputSchema,
    outputSchema: GenerateLabExperimentOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
