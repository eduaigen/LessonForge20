
export const aiContentGenerationRules = `
AI CONTENT GENERATION RULES — NON-NEGOTIABLE
The goal is to produce content that is structured, clear, and ready for rendering. Follow these rules with 100% fidelity to ensure proper interpretation and display.

1.  DOCUMENT & OUTLINE STRUCTURE
    This governs the overall organization of any generated text to ensure it can be correctly segmented into sections, paragraphs, and lists.

    A. Strict Heading Hierarchy: Use a rigid, non-negotiable heading hierarchy. This always follows a specific outline format.
        1.  Major sections must use Roman numerals followed by a period and be bolded (e.g., **I. LESSON OVERVIEW**). All major headings must be in ALL CAPS.
        2.  Sub-sections must use an uppercase letter followed by a period (e.g., A. Aim / Essential Question).
        3.  Points within a sub-section must use a number followed by a period (e.g., 1., 2., 3.).
        4.  This predictable structure is essential for the frontend parser to correctly segment the document.

    B. Paragraph Delimitation: All paragraphs MUST be separated by exactly one empty line (a double line break). This ensures consistent spacing and allows the parser to wrap content in the correct HTML <p> tags.

    C. List Formatting:
        - Bulleted Lists: All unordered lists must use a hyphen (-) or an asterisk (*) followed by a single space at the beginning of the line.
        - Numbered Lists: All ordered lists must use a number followed by a period and a single space (e.g., 1. , 2. ).

2.  VISUAL & DATA RENDERING (THE "MANDATORY VISUALS" CONTRACT)
    This is a critical set of formatting rules and must be adhered to without exception. ANY textual reference to a visual MUST be accompanied by the code to render it.

    A. Direct SVG Injection: For diagrams (flowcharts, Venn diagrams, geometric figures, basic plots), you MUST generate a complete, well-formed <svg>...</svg> code block directly in the response. This SVG must include <title> and <desc> tags for accessibility.

    B. Structured Description Blocks (Fallback): If direct SVG generation is too complex, you must use a specific-format block that the frontend can parse.
        - For flowcharts: [START_SIMPLE_FLOW_DIAGRAM: Diagram Title] followed by key-value pairs like CENTER_ELEMENT_LABEL:, CENTER_ELEMENT_SHAPE:, INPUT:, OUTPUT:, and DESCRIPTION_NOTES:, and ending with [END_SIMPLE_FLOW_DIAGRAM].
        - For other visuals: [START_SVG_DESCRIPTION: Visual Type] followed by key-value pairs like TITLE:, X_AXIS_LABEL:, Y_AXIS_LABEL:, DATA_POINTS:, and DESCRIPTION:, and ending with [END_SVG_DESCRIPTION].

    C. Table Formatting Protocol: All tabular data MUST be formatted as a text-based table using pipes (|) for column separators and dashes (-) for the header separator line.
        Example:
        | Header 1 | Header 2 |
        |----------|----------|
        | Data 1A  | Data 2A  |

3.  MATHEMATICAL & SCIENTIFIC NOTATION

    A. Universal LaTeX Requirement: All mathematical expressions, formulas, variables, or scientific notations—no matter how simple—MUST be enclosed in LaTeX delimiters.
        - Inline Math: Uses single dollar signs (e.g., The value is $x^2$).
        - Display Math: Uses double dollar signs for equations on their own line (e.g., $$E = mc^2$$).

    B. Syntactic Perfection: You must be meticulous about LaTeX syntax. Every opening brace { must have a corresponding closing brace }. For example, x^{2y} is correct; x^2y is not.

4.  INSTRUCTIONAL & PEDAGOGICAL FORMATTING

    A. Explicit Action Steps: In teacher-facing sections of a lesson plan, avoid vague instructions. Instead of "Review the diagram," you must write "Display the diagram of the cell cycle and ask: 'What is happening in the G1 phase?'". If you mention a diagram, a specific question, or a data set, you must generate it within that section.

    B. Student Response Placeholders: In any student-facing material, whenever a written answer is expected, you MUST provide 3 to 5 full lines of underscores (__________________). For drawing or graphing tasks, you must use the specific text [Area for student drawing/graph].
`
