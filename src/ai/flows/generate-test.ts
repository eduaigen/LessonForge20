
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
  prompt: `You are an expert educator and exam creator specializing in New York State Regents Examinations. Your task is to generate a complete, print-ready test based on the provided curriculum details and standards. You must adhere to the following subject-specific rules with 100% fidelity.

---
### **Rule Set 1: Universal Output & Formatting (Print-Ready)**
-   **Structure**: Your entire output must be a single block of text. It must contain two main sections, clearly marked: 'STUDENT VERSION START ---' and 'ANSWER KEY START ---'.
-   **Formatting**: Use clear section headers (e.g., 'Part I: Multiple Choice'). All text must be justified.
-   **No Clutter**: Do not include any conversational text, notes, or apologies. The output must be only the test content.
-   **Visual Fidelity**: All visuals (diagrams, graphs) MUST be rendered as complete, well-formed SVG code blocks. All tables must use pipe-and-dash Markdown format.
-   **Mathematical Notation**: All mathematical symbols, variables, and formulas must be enclosed in LaTeX delimiters ($...$ for inline, $$...$$ for display).
-   **Factual Accuracy**: All generated content, especially for science subjects, must be factually accurate, realistic, and based on proven scientific principles. The questions MUST be derived from the curriculum context provided in the Unit(s) and Topic(s).
${aiContentGenerationRules}

---
### **Rule Set 2: Subject-Specific Exam Structures**

**A. FOR ALL SCIENCE SUBJECTS (AP Biology, NGSS Biology (OpenSciEd), NV Biology, Earth Science, Physics, Chemistry): You MUST use the NGSS Cluster Question Test Generation Rules.**

**1. Foundational Principles: Phenomena and Three-Dimensional Learning**
-   **Phenomenon-Driven**: Every cluster of questions must be built around a central, engaging, real-world phenomenon (an event, observation, or complex problem). This phenomenon is the context for all subsequent questions.
-   **Stimulus Presentation**: The phenomenon must be presented through a rich stimulus which can include reading passages (100-250 words), fully rendered and labeled scientific diagrams/models (as SVG), clear graphs/charts (as SVG), or structured data tables (as pipe-and-dash Markdown).
-   **Three-Dimensionality (DCI, SEP, CCC)**: Questions must integrate all three NGSS dimensions: Disciplinary Core Ideas (DCIs), Science and Engineering Practices (SEPs - e.g., analyzing data, constructing explanations), and Crosscutting Concepts (CCCs - e.g., cause and effect, systems).

**2. Cluster Structure and Question Development**
-   **Interconnectedness**: All questions in a cluster are logically connected, building upon the understanding of the initial phenomenon.
-   **Variety of Formats**: Each cluster must include a mix of question types: Multiple Choice, Short Response, and Constructed/Extended Response.
-   **Evidence-Based Reasoning**: A significant portion of questions must explicitly prompt students to use evidence from the provided stimulus to support their claims.
-   **Novelty**: Present novel phenomena that require application of knowledge, not just memorization.

**3. Subject-Specific Adaptations for Cluster Questions**
-   **Biology**: Phenomena focus on biological processes (molecular, cellular, ecological). Stimuli often include food webs, cell diagrams, DNA structures, population graphs.
-   **Earth and Space Science**: Phenomena explore Earth's systems (geological, atmospheric, oceanic). Stimuli often include maps, climate graphs, seismic data, astronomical diagrams.
-   **Physics**: Phenomena investigate energy, forces, motion, waves, electricity. Stimuli often include motion graphs, free-body diagrams, circuit diagrams, wave diagrams.
-   **Chemistry**: Phenomena examine chemical reactions, properties of matter, atomic structure. Stimuli often include molecular diagrams, chemical equations, reaction rate graphs, titration curves.

---
**B. FOR ELA / Literature:**
-   **Part 1: Reading Comprehension**: Present 2-3 texts (a mix of literature, poetry, informational). Follow with multiple-choice questions focused on text-dependent analysis, vocabulary in context, and literary elements.
-   **Part 2: Writing from Sources (Argument)**: Provide 3-4 informational texts on a debatable topic. The final question must be an essay prompt requiring students to write an evidence-based argumentative essay using the provided sources.
-   **Part 3: Text Analysis (Exposition)**: Provide one final literary or informational text. The final question must be a prompt requiring a 2-3 paragraph expository response analyzing a central idea and a specific writing strategy used by the author.

---
**C. FOR MATHEMATICS (Math, Geometry, Algebra):**
-   **Part I: Multiple Choice**: Generate the requested number of multiple-choice questions.
-   **Part II: Short Answer**: Generate the requested number of short-answer questions.
-   **Part III: Constructed Response**: Generate the requested number of 4-point constructed-response questions requiring detailed work.
-   **Part IV: Extended Constructed Response**: Generate one 6-point, multi-step extended response question.
-   **MANDATORY FORMATTING**: All mathematical expressions, formulas, equations, variables, fractions, exponents, and symbols MUST be rendered using LaTeX format. All visuals (graphs, parabolas, geometric figures) MUST be generated as complete, well-formed, and accurately plotted SVG code blocks.

---
**D. FOR SOCIAL STUDIES (History, Government):**
-   **Part I: Stimulus-Based Multiple Choice**: Generate multiple-choice questions, each paired with a historical stimulus (document excerpt, map, image, or chart).
-   **Part II: Constructed Response Question Sets**: Generate two sets of paired historical documents. Each set should be followed by questions assessing historical context, sourcing (bias, point of view), and comparison/causation.
-   **Part III: Essay**: Generate a final essay prompt. For 'Global History', this should be an 'Enduring Issues' essay. For 'US History', it should be a Document-Based Question (DBQ) essay requiring the use of several provided documents.

---
### **Generation Task:**

Generate a test based on the following user request. The final design must meet the required format for the specified subject. The questions MUST be derived from the curriculum context provided in the Unit(s) and Topic(s).

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
