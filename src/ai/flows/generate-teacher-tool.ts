
'use server';

/**
 * @fileOverview AI agent that generates various teaching materials based on a provided lesson plan.
 *
 * - generateTeacherTool - A function that routes to the correct tool generator.
 */

import { ai } from '@/ai/genkit';
import { convert } from 'html-to-text';
import { 
    GenerateTeacherToolInputSchema, 
    type GenerateTeacherToolInput, 
    GenerateTeacherToolOutputSchema, 
    type GenerateTeacherToolOutput,
    type ToolType
} from '@/ai/schemas/teacher-tool-schemas';
import { aiContentGenerationRules } from '@/ai/schemas/formatting-rules';

// This is the main exported function that the UI will call.
export async function generateTeacherTool(input: GenerateTeacherToolInput): Promise<GenerateTeacherToolOutput> {
  // Convert HTML from lesson plan to clean text for better AI processing.
  const plainTextLessonPlan = convert(input.lessonPlan, {
    wordwrap: false,
    selectors: [
      { selector: 'h3', options: { uppercase: false, prefix: '\n### ', suffix: '\n' } },
    ]
  });

  const flowInput = {
    ...input,
    lessonPlan: plainTextLessonPlan
  };

  const result = await teacherToolFlow(flowInput);
  return result;
}

const worksheetPrompt = `
Core Task: Reproduce Parts A–I of the lesson plan as a student-facing worksheet.
Source Material Rule (Non-Negotiable): The content for the worksheet must be derived exclusively from the provided lesson plan. Embed all questions, visuals, readings, and tasks directly from the lesson. Include sentence frames and scaffolds from Part I.
Formatting Rules:
- Create a standard header with fields for Name, Date, and Period.
- The worksheet must include sections that directly mirror the lesson plan structure: Aim, Do Now, Guided Notes, Check for Understanding, Independent Practice, Closure/Exit Ticket, and Homework.
- All questions must be followed by 3 to 5 empty lines (using underscores) for student answers.
- If the lesson plan describes a visual (like a diagram), include a placeholder on the worksheet in the format: [Area for Diagram: [Title of Diagram]].
`;

const readingMaterialPrompt = `
Core Task: Generate an NGSS-aligned nonfiction text of 150–400 words based on the lesson plan content.
Options (User-defined, but you should structure for them): The user can request to Shorten or Expand the text. A Spanish toggle and bilingual glossary should be supported.
Formatting Rules:
- The output must have a clear title.
- The text must be well-structured with an introduction, body, and conclusion.
- Include a bilingual (English/Spanish) glossary of key terms from the text.
`;

const comprehensionQuestionPrompt = `
Core Task: Generate comprehension questions based on the "Reading Material" generated from the same lesson plan.
Source Material Rule (Non-Negotiable): All questions must pull directly from the generated Reading Material.
User-Defined Parameters: The user selects the number of questions, type (Multiple Choice, CER, Phenomenon-based), and Depth of Knowledge (DOK) level.
Formatting Rules:
- No True/False questions.
- Multiple Choice questions must have a clear stem and plausible distractors.
- CER (Claim-Evidence-Reasoning) prompts must be explicit.
- Phenomenon-based questions must relate to a real-world scenario.
`;

const studySheetPrompt = `
Core Task: Output a fact-based review sheet for students.
Source Material Rule (Non-Negotiable): The content must be extracted directly from the lesson plan.
Formatting Rules:
- The sheet must be structured with clear sections for: Vocabulary, Key Concepts, and Applications/Examples.
- Optionally include sentence starters and diagrams as specified in the lesson plan.
`;

const clusterQuestionPrompt = `
Core Task: Generate a full 6-question NGSS-style cluster. This tool is ONLY active for Science subjects.
Source Material Rule (Non-Negotiable): The cluster must be based on a real-world phenomenon, passage, and visuals directly related to the lesson plan content.
Formatting Rules:
- The cluster must include exactly: 2 Multiple Choice questions, 2 short response questions, 1 task requiring students to draw/label a model, and 1 prediction question.
`;

const slideshowOutlinePrompt = `
Core Task: Build a teaching slideshow outline based on the lesson plan sections A–I.
Source Material Rule (Non-Negotiable): The outline must strictly follow the sequence and content of the provided lesson plan.
Formatting Rules:
- The output must use clear slide numbers and titles (e.g., "SLIDE 1: Title Slide").
- Each slide entry must contain three parts: 1. Key Content (in bullet points). 2. Visual Cue (a description of an appropriate image or chart). 3. Presenter Notes (a script for the teacher).
`;

const ellSwdScaffoldPrompt = `
Core Task: Regenerate the lesson plan's worksheet with built-in scaffolds for English Language Learners and Students with Disabilities.
Source Material Rule (Non-Negotiable): The content of the worksheet is the same as the original, but with added supports.
Formatting Rules:
- Embed supports directly into the worksheet.
- Supports must include: Sentence frames for writing tasks, visual cues next to key concepts, and dual-language (English/Spanish) labels or glossaries where appropriate.
`;

const diagramFlowchartPrompt = `
Core Task: Auto-generate a systems or structure diagram that was referenced in the lesson plan.
Source Material Rule (Non-Negotiable): The visual must illustrate a concept explicitly detailed in the lesson plan.
Formatting Rules:
- The output must be a print-ready, black-and-white visual.
- It must be generated as a complete, well-formed SVG code block.
`;

const mathVisualizerPrompt = `
Core Task: Render a mathematical visual for functions, graphs (4-quadrant), or geometric shapes.
Source Material Rule (Non-Negotiable): The visual must represent a specific mathematical concept found within the lesson plan.
Formatting Rules:
- The output must be an editable, printable, and clearly labeled visual.
- It must be generated as a complete, well-formed SVG code block.
`;

const teacherCoachPrompt = `
Core Task: Provide professional guidance for each section of the lesson plan (A–I).
Source Material Rule (Non-Negotiable): All advice must be specific and directly actionable for the provided lesson plan.
Formatting Rules:
- The output must be structured by lesson plan section (e.g., "Coaching for B. DO NOW").
- Each section must include: 1. Coaching Advice (pedagogical strategy). 2. A Sample Teacher Script.
- The advice must align with CRSE, UDL, NGSS, and Bloom's Taxonomy frameworks.
`;


const getPromptForTool = (toolType: ToolType) => {
    switch (toolType) {
        case 'worksheet': return worksheetPrompt;
        case 'reading_material': return readingMaterialPrompt;
        case 'comprehension_questions': return comprehensionQuestionPrompt;
        case 'study_sheet': return studySheetPrompt;
        case 'cluster_questions': return clusterQuestionPrompt;
        case 'slideshow_outline': return slideshowOutlinePrompt;
        case 'ell_swd_scaffolds': return ellSwdScaffoldPrompt;
        case 'diagram_flowchart': return diagramFlowchartPrompt;
        case 'math_visualizer': return mathVisualizerPrompt;
        case 'teacher_coach': return teacherCoachPrompt;
        default: throw new Error(`Invalid tool type: ${toolType}`);
    }
}

const teacherToolPrompt = ai.definePrompt({
    name: 'teacherToolPrompt',
    input: { schema: GenerateTeacherToolInputSchema },
    output: { schema: GenerateTeacherToolOutputSchema },
    prompt: `
        You are an AI assistant for teachers. Your task is to generate a specific teaching tool based on the provided lesson plan.
        Follow the specific rules for the requested tool type with 100% fidelity. Adhere to all print-ready formatting and translation rules.
        ${aiContentGenerationRules}

        **Lesson Plan Content:**
        {{{lessonPlan}}}

        **Requested Tool Type:** {{{toolType}}}

        **Tool-Specific Instructions:**
        {{#if (eq toolType 'worksheet')}}${worksheetPrompt}{{/if}}
        {{#if (eq toolType 'reading_material')}}${readingMaterialPrompt}{{/if}}
        {{#if (eq toolType 'comprehension_questions')}}${comprehensionQuestionPrompt}{{/if}}
        {{#if (eq toolType 'study_sheet')}}${studySheetPrompt}{{/if}}
        {{#if (eq toolType 'cluster_questions')}}${clusterQuestionPrompt}{{/if}}
        {{#if (eq toolType 'slideshow_outline')}}${slideshowOutlinePrompt}{{/if}}
        {{#if (eq toolType 'ell_swd_scaffolds')}}${ellSwdScaffoldPrompt}{{/if}}
        {{#if (eq toolType 'diagram_flowchart')}}${diagramFlowchartPrompt}{{/if}}
        {{#if (eq toolType 'math_visualizer')}}${mathVisualizerPrompt}{{/if}}
        {{#if (eq toolType 'teacher_coach')}}${teacherCoachPrompt}{{/if}}

        Now, generate the content for the requested tool.
    `,
    // Register Handlebars helper 'eq'
    helpers: {
        eq: (a: any, b: any) => a === b,
    },
});

const teacherToolFlow = ai.defineFlow(
  {
    name: 'teacherToolFlow',
    inputSchema: GenerateTeacherToolInputSchema,
    outputSchema: GenerateTeacherToolOutputSchema,
  },
  async (input) => {
    const { output } = await teacherToolPrompt(input);
    return output!;
  }
);
