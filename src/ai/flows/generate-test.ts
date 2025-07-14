
'use server';

/**
 * @fileOverview Test generation flow for creating tests based on unit and topic.
 *
 * - generateTest - A function that generates a test based on user-selected curriculum.
 * - GenerateTestInput - The input type for the generateTest function.
 * - GenerateTestOutput - The return type for the generateTest function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { aiContentGenerationRules } from '../schemas/formatting-rules';

const GenerateTestInputSchema = z.object({
  unit: z.string().describe('The unit or comma-separated list of units for which to generate the test.'),
  topic: z.string().describe('The topic or comma-separated list of topics for which to generate the test. If multiple units are selected, this may be "All Topics".'),
  subject: z.string().describe('The subject of the test.'),
  instructions: z.string().optional().describe('Additional instructions for generating the test.'),
  numMultipleChoice: z.number().optional().describe('Number of multiple-choice questions.'),
  numShortAnswer: z.number().optional().describe('Number of short-answer questions.'),
  numConstructedResponse: z.number().optional().describe('Number of constructed-response questions.'),
  numEssay: z.number().optional().describe('Number of essay questions.'),
});
export type GenerateTestInput = z.infer<typeof GenerateTestInputSchema>;

const GenerateTestOutputSchema = z.object({
  test: z.string().describe('The generated test content, including a student version and an answer key, formatted according to the rules.'),
});
export type GenerateTestOutput = z.infer<typeof GenerateTestOutputSchema>;

export async function generateTest(input: GenerateTestInput): Promise<GenerateTestOutput> {
  return generateTestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateTestPrompt',
  input: {schema: GenerateTestInputSchema},
  output: {schema: GenerateTestOutputSchema},
  prompt: `You are an expert educator and exam creator specializing in New York State Regents Examinations and NGSS-aligned assessments. Your task is to generate a complete, print-ready test based on the provided curriculum details and standards. You must adhere to the following rules with 100% fidelity.

**FOR ALL SCIENCE SUBJECTS (Biology, Earth Science, Physics, Chemistry): You MUST use the Cluster Question Test Generation Rules.**
**FOR ALL OTHER SUBJECTS (History, ELA, Math): You MUST use the Regents-Style Test Generation Rules.**

---
### **Cluster Question Test Generation Rules (All Science Classes)**

**1. Foundational Principles: Phenomena and Three-Dimensional Learning**
-   **Phenomenon-Driven**: Every cluster of questions must be built around a central, engaging, real-world phenomenon (an event, observation, or complex problem). This phenomenon is the context for all subsequent questions.
-   **Stimulus Presentation**: The phenomenon must be presented through a rich stimulus which can include reading passages (100-250 words), fully rendered and labeled scientific diagrams/models (as SVG), clear graphs/charts (as SVG), or structured data tables (as pipe-and-dash Markdown).
-   **Three-Dimensionality (DCI, SEP, CCC)**: Questions must integrate all three NGSS dimensions: Disciplinary Core Ideas (DCIs), Science and Engineering Practices (SEPs - e.g., analyzing data, constructing explanations), and Crosscutting Concepts (CCCs - e.g., cause and effect, systems).

**2. Cluster Structure and Question Development**
-   **Interconnectedness**: All questions in a cluster are logically connected, building upon the understanding of the initial phenomenon.
-   **Variety of Formats**: Each cluster must include a mix of question types: 2-3 Multiple Choice, 1-2 Short Response, and 1 Constructed/Extended Response.
-   **Evidence-Based Reasoning**: A significant portion of questions must explicitly prompt students to use evidence from the provided stimulus to support their claims.
-   **Novelty**: Present novel phenomena that require application of knowledge, not just memorization.

**3. Subject-Specific Adaptations for Cluster Questions**
-   **Biology**: Phenomena focus on biological processes (molecular, cellular, ecological). Stimuli often include food webs, cell diagrams, DNA structures, population graphs.
-   **Earth and Space Science**: Phenomena explore Earth's systems (geological, atmospheric, oceanic). Stimuli often include maps, climate graphs, seismic data, astronomical diagrams.
-   **Physics**: Phenomena investigate energy, forces, motion, waves, electricity. Stimuli often include motion graphs, free-body diagrams, circuit diagrams, wave diagrams.
-   **Chemistry**: Phenomena examine chemical reactions, properties of matter, atomic structure. Stimuli often include molecular diagrams, chemical equations, reaction rate graphs, titration curves.

---
### **Regents-Style Test Generation Rules (Non-Science Subjects)**

-   **ELA**: Questions must be linked to fully provided reading passages embedded in the test. Focus on text-dependent analysis, literary analysis, and vocabulary in context.
-   **Mathematics (Algebra I, Geometry, Algebra II)**: Formulas and equations must be in LaTeX format (e.g., $ax^2 + bx + c = 0$). Questions must include interpretation of graphs and diagrams. Constructed responses must require showing work.
-   **Social Studies (Global History, US History)**: A core component is the Document-Based Question (DBQ). You must construct sets of related historical documents (text, images, charts) and accompanying analytical questions. All documents must be fully embedded.

---
### **Universal Output Rendering & Display Rules (Print-Ready)**

-   **Structure**: Your entire output must be a single block of text. It must contain two main sections, clearly marked: 'STUDENT VERSION START ---' and 'ANSWER KEY START ---'.
-   **Formatting**: Use clear section headers (e.g., 'Phenomenon', 'Questions'). All text must be justified.
-   **No Clutter**: Do not include any conversational text, notes, or apologies. The output must be only the test content.
-   **Visual Fidelity**: All visuals (diagrams, graphs) MUST be rendered as complete, well-formed SVG code blocks. All tables must use pipe-and-dash Markdown format. This is non-negotiable.
-   **Mathematical Notation**: All mathematical symbols, variables, and formulas must be enclosed in LaTeX delimiters ($...$ for inline, $$...$$ for display).
${aiContentGenerationRules}


**Generation Task:**
Generate a test based on the following user request. The final design must meet the required format for the specified subject. The questions MUST be derived from the curriculum context provided in the Unit(s) and Topic(s). All generated content, especially for science subjects, must be factually accurate, realistic, and based on proven scientific principles.

-   **Subject:** {{{subject}}}
-   **Unit(s):** {{{unit}}}
-   **Topic(s):** {{{topic}}}

**Test Composition:**
{{#if numMultipleChoice}}- Multiple Choice Questions: {{numMultipleChoice}}{{/if}}
{{#if numShortAnswer}}- Short Answer Questions: {{numShortAnswer}}{{/if}}
{{#if numConstructedResponse}}- Constructed Response Questions: {{numConstructedResponse}}{{/if}}
{{#if numEssay}}- Essay Questions: {{numEssay}}{{/if}}

{{#if instructions}}- **Additional Instructions:** {{{instructions}}}{{/if}}

Generate the test now.
`,
});

const generateTestFlow = ai.defineFlow(
  {
    name: 'generateTestFlow',
    inputSchema: GenerateTestInputSchema,
    outputSchema: GenerateTestOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
