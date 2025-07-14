
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
import { aiContentGenerationRules } from '../schemas/formatting-rules';

// This is the main exported function that the UI will call.
export async function generateTeacherTool(input: GenerateTeacherToolInput): Promise<GenerateTeacherToolOutput> {
  // Convert HTML from lesson plan to clean text for better AI processing.
  const plainTextLessonPlan = convert(input.lessonPlan, {
    wordwrap: false,
    selectors: [
      { selector: 'h3', options: { uppercase: false, prefix: '\n### ', suffix: '\n' } },
      { selector: 'div.document-view', options: { uppercase: false } },
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
Core Task: Create a comprehensive, two-column Cornell Notes-style worksheet.
Source Material Rule (Non-Negotiable): The content for the worksheet must be derived exclusively from the provided lesson plan. Do not introduce new concepts. The "Do Now" on the worksheet must come from Section B of the lesson plan.
Formatting Rules:
- Create a standard header with fields for Name, Date, and Period.
- The worksheet must include sections that directly mirror the lesson plan structure: Aim, Do Now, Guided Notes (formatted for Cornell Notes with a main notes column and a questions/cues column), Check for Understanding, Independent Practice, and a Closure/Exit Ticket.
- All questions must be followed by 3 to 5 empty lines (using underscores) for student answers.
- If the lesson plan describes a visual (like a diagram), include a placeholder on the worksheet in the format: [Area for Diagram: [Title of Diagram]].
`;

const articlePrompt = `
Core Task: Write a grade-level appropriate informational article or reading passage.
Source Material Rule (Non-Negotiable): The article must strictly relate to the key concepts, vocabulary, and objectives found in the provided lesson plan. It should summarize or expand on that lesson only.
Formatting Rules:
- The output must have a specific structure: 1. An engaging title. 2. A single introduction paragraph. 3. Three to five body paragraphs. 4. A single conclusion paragraph. 5. A Glossary section that defines all key vocabulary terms from the lesson plan.
`;

const graphChartDataPrompt = `
Core Task: Generate a relevant data visualization, such as a graph, chart, or data table.
Source Material Rule (Non-Negotiable): The visual must represent a concept explicitly mentioned or implied in the lesson plan. If the lesson plan lacks specific data points, your rule is to generate plausible, synthetic data that aligns with the lesson's principles.
Formatting Rules (Critical):
- Your output must be either a complete, well-formed SVG code block for the visual, or a detailed textual description using the [START_SVG_DESCRIPTION: ...] format.
- For data tables, you are explicitly forbidden from using the description block. Instead, you must generate the table using Markdown pipe syntax (| Header | ... |).
- All labels, axes, titles, and units must be accurate and use LaTeX for any mathematical or scientific notation.
`;

const diagramFlowchartPrompt = `
Core Task: Design a diagram, flowchart, or graphic organizer.
Source Material Rule (Non-Negotiable): The visual must illustrate a process, concept, or relationship explicitly detailed in the lesson plan. It must serve to clarify a concept from that specific lesson.
Formatting Rules (Critical): Your output must be either a complete, well-formed SVG code block or a detailed textual description using the [START_SIMPLE_FLOW_DIAGRAM: ...] or [START_SVG_DESCRIPTION: ...] format. All labels must use LaTeX for scientific or mathematical terms.
`;

const slideshowOutlinePrompt = `
Core Task: Generate a detailed slideshow outline.
Source Material Rule (Non-Negotiable): The outline must strictly follow the sequence and content of the provided lesson plan. Each slide must correspond to a specific part of the lesson (e.g., Slide 2 is the Do Now from Section B). You cannot deviate.
Formatting Rules:
- The output must use clear slide numbers and titles (e.g., "SLIDE 1: Title Slide").
- Each slide entry must contain three parts: 1. Key Content (in bullet points). 2. Visual Cue (a description of an appropriate image or chart). 3. Speaker Notes (a script for the teacher).
`;

const pedagogicalCoachPrompt = `
Core Task: Provide pedagogical coaching advice for the provided lesson plan.
Source Material Rule (Non-Negotiable): All coaching advice must be specific and directly actionable for the provided lesson plan. You are forbidden from giving generic advice.
Formatting Rules: Your output must be structured into five specific sections: 1. Instructional Strategies. 2. Potential Student Difficulties. 3. Agenda Table (Time, Teacher Moves, Student Look-Fors). 4. Danielson Framework Alignment (for Domains 3B, 3C, 3D). 5. Sample Rubric for a key task in the lesson.
`;

const ellSwdSupportPrompt = `
Core Task: Generate differentiated support materials for English Language Learners and Students with Disabilities.
Source Material Rule (Non-Negotiable): All support materials must be directly based on the content and activities in the provided lesson plan.
Formatting Rules: The output must have clear headings for each distinct support material. Generate materials like: Simplified Language Versions of texts, descriptions of Graphic Organizers, lists of Sentence Starters for specific tasks, and descriptions of necessary Visual Aids.
`;

const enrichmentActivityPrompt = `
Core Task: Design an enrichment activity for advanced or early-finishing students.
Source Material Rule (Non-Negotiable): The activity must be a direct and logical extension of the concepts from the lesson plan and require higher-order thinking.
Formatting Rules: The output must contain five specific sections: 1. Activity Title. 2. Objective. 3. Task Description. 4. Materials Needed. 5. Final Product.
`;

const mathProblemVisualizerPrompt = `
Core Task: Create a visual representation for a mathematical problem or concept.
Source Material Rule (Non-Negotiable): The visual must explain a specific mathematical problem or concept found explicitly within the lesson plan.
Formatting Rules (Critical): Your output must be either a complete, well-formed SVG code block or a detailed textual description using the [START_SVG_DESCRIPTION: ...] format. This could be a number line, a geometric diagram, a function graph, etc. Adherence to the mandatory visual rendering instruction is required.
`;

const getPromptForTool = (toolType: ToolType) => {
    switch (toolType) {
        case 'worksheet': return worksheetPrompt;
        case 'article': return articlePrompt;
        case 'graph_chart_data': return graphChartDataPrompt;
        case 'diagram_flowchart': return diagramFlowchartPrompt;
        case 'slideshow_outline': return slideshowOutlinePrompt;
        case 'pedagogical_coach': return pedagogicalCoachPrompt;
        case 'ell_swd_support': return ellSwdSupportPrompt;
        case 'enrichment_activity': return enrichmentActivityPrompt;
        case 'math_problem_visualizer': return mathProblemVisualizerPrompt;
        default: throw new Error(`Invalid tool type: ${toolType}`);
    }
}

const teacherToolPrompt = ai.definePrompt({
    name: 'teacherToolPrompt',
    input: { schema: GenerateTeacherToolInputSchema },
    output: { schema: GenerateTeacherToolOutputSchema },
    prompt: `
        You are an AI assistant for teachers. Your task is to generate a specific teaching tool based on the provided lesson plan.
        Follow the specific rules for the requested tool type with 100% fidelity.
        ${aiContentGenerationRules}

        **Lesson Plan Content:**
        {{{lessonPlan}}}

        **Requested Tool Type:** {{{toolType}}}

        **Tool-Specific Instructions:**
        {{#if (eq toolType 'worksheet')}}${worksheetPrompt}{{/if}}
        {{#if (eq toolType 'article')}}${articlePrompt}{{/if}}
        {{#if (eq toolType 'graph_chart_data')}}${graphChartDataPrompt}{{/if}}
        {{#if (eq toolType 'diagram_flowchart')}}${diagramFlowchartPrompt}{{/if}}
        {{#if (eq toolType 'slideshow_outline')}}${slideshowOutlinePrompt}{{/if}}
        {{#if (eq toolType 'pedagogical_coach')}}${pedagogicalCoachPrompt}{{/if}}
        {{#if (eq toolType 'ell_swd_support')}}${ellSwdSupportPrompt}{{/if}}
        {{#if (eq toolType 'enrichment_activity')}}${enrichmentActivityPrompt}{{/if}}
        {{#if (eq toolType 'math_problem_visualizer')}}${mathProblemVisualizerPrompt}{{/if}}

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
