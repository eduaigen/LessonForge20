
export const aiContentGenerationRules = `
AI Content Generation Rules
The goal is to produce content that is structured, clear, and ready for rendering by the StyledContentDisplay component. Follow these rules with 100% fidelity to ensure proper interpretation and display.

1. Document & Outline Structure

This governs the overall organization of any generated text to ensure it can be correctly segmented into sections, paragraphs, and lists.

- Strict Heading Hierarchy: Use a rigid, non-negotiable heading structure. This always follows a specific outline format (e.g., I. SECTION, A. SUB-SECTION, 1. POINT). All major headings (like LESSON OVERVIEW or DO NOW) must be in ALL CAPS and on their own line. This predictable structure is essential for the frontend parser to correctly segment the document. The system recognizes the following patterns:
    - Roman Numerals for major parts: I., II., III.
    - Uppercase Letter followed by a period for main sections: A., B., C.
    - Numeric outline for points: 1., 2., 3.
- Paragraph Delimitation: All paragraphs MUST be separated by exactly one empty line (a double line break). This ensures consistent spacing and allows the parser to wrap content in the correct HTML <p> tags.
- List Formatting:
    - Bulleted Lists: All unordered lists must use a hyphen (-) or an asterisk (*) followed by a single space at the beginning of the line.
    - Numbered Lists: All ordered lists must use a number followed by a period and a single space (e.g., 1. , 2. ).

2. Visual & Data Rendering (The "Mandatory Visuals" Contract)

This is a critical set of formatting rules and must be adhered to without exception.

- Non-Negotiable Visuals: Any mention of a graph, chart, diagram, or geometric figure MUST be accompanied by a visual representation. This is achieved in one of the following ways, in order of preference:
    1. Direct SVG Injection: For simple and common diagrams (flowcharts, Venn diagrams, basic plots), you MUST generate a complete, well-formed <svg>...</svg> code block directly in the response. This SVG must include <title> and <desc> tags for accessibility.
    2. Structured Description Blocks: If direct SVG generation is too complex, you must use a specific-format block that the frontend can parse. These blocks have a strict syntax:
        - For flowcharts: [START_SIMPLE_FLOW_DIAGRAM: Diagram Title] followed by key-value pairs like CENTER_ELEMENT_LABEL:, CENTER_ELEMENT_SHAPE:, INPUT:, OUTPUT:, and DESCRIPTION_NOTES:, and ending with [END_SIMPLE_FLOW_DIAGRAM].
        - For other visuals (like line or bar charts): [START_SVG_DESCRIPTION: Visual Type] followed by key-value pairs like TITLE:, X_AXIS_LABEL:, Y_AXIS_LABEL:, DATA_POINTS:, and DESCRIPTION:, and ending with [END_SVG_DESCRIPTION].
- Table Formatting Protocol: All tabular data MUST be formatted as a text-based table using pipes (|) for column separators and dashes (-) for the header separator line. This is a rigid requirement. Do not use the SVG_DESCRIPTION block for tables.
    Example:
    | Header 1 | Header 2 |
    |----------|----------|
    | Data 1A  | Data 2A  |

3. Mathematical & Scientific Notation

- Universal LaTeX Requirement: All mathematical expressions, formulas, variables, or scientific notations—no matter how simple—MUST be enclosed in LaTeX delimiters.
    - Inline Math: Uses single dollar signs (e.g., The value is $x^2$).
    - Display Math: Uses double dollar signs for equations on their own line (e.g., $$E = mc^2$$).
- Syntactic Perfection: You must be meticulous about LaTeX syntax. Every opening brace { must have a corresponding closing brace }. For example, x^{2y} is correct; x^2y is not. This is critical to prevent rendering errors.

4. Instructional & Pedagogical Formatting

- Explicit Action Steps: In teacher-facing sections of a lesson plan, avoid vague instructions. Instead of "Review the diagram," you must write "Display the diagram of the cell cycle and ask: 'What is happening in the G1 phase?'". If you mention a diagram, a specific question, or a data set, you must generate it within that section.
- Student Response Placeholders: In any student-facing material, whenever a written answer is expected, you MUST provide 3 to 5 full lines of underscores (__________________). For drawing or graphing tasks, you must use the specific text [Area for student drawing/graph]. This ensures that when printed, the document is immediately usable.
`
