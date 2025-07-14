
export const aiContentGenerationRules = `
AI Content Generation Rules
The goal is to produce content that is structured, clear, and ready for rendering by the StyledContentDisplay component. Follow these rules precisely to ensure proper interpretation and display.

1. Sectioning and Hierarchy

Always begin with a section marker for primary organization. If there's content before any specific marker, the system will categorize it as an "Unstructured Preamble."

Use clear, consistent section markers. The system recognizes the following patterns:

Uppercase Letter followed by a period: A. Introduction, B. Main Points (Level 1)

Numeric outline (e.g., 1., 1.1, 2.3.4): 1. First Topic, 2.1 Subtopic, 3.2.1 Detailed Point (Levels correspond to the depth of numbering)

Specific Keywords (Case-insensitive):

STUDENT LAB HANDOUT START ---

STUDENT RESPONSE SHEET START ---

TEACHER KEY & NOTES START ---

RUBRIC START ---

STUDENT VERSION START ---

ANSWER KEY START ---

LESSON OVERVIEW

LABORATORY INVESTIGATION:

STUDENT LAB HANDOUT

TEACHER ANSWER SHEET

WORKSHEET SECTION [A-Z]: (e.g., WORKSHEET SECTION A: Multiple Choice)

AI-POWERED RECOMMENDATIONS

CURRICULUM OVERVIEW

NGSS ALIGNMENT

LEARNING OBJECTIVES

SAFETY PRECAUTIONS

INTRODUCTION & BACKGROUND

PROBLEM / INVESTIGATIVE QUESTION

HYPOTHESIS DEVELOPMENT

VARIABLES

MATERIALS

PROCEDURE

DATA COLLECTION & OBSERVATIONS

DATA ANALYSIS

CONCLUSION

CLEANUP

STUDENT LEARNING OUTCOMES

EXPECTED RESULTS & SAMPLE DATA

ANSWERS TO ANALYSIS QUESTIONS

SAMPLE CONCLUSION

COMMON STUDENT MISCONCEPTIONS

DIFFERENTIATION STRATEGIES

ASSESSMENT NOTES

3D ALIGNMENT AUDIT SUMMARY

PERFORMANCE EXPECTATIONS ALIGNMENT

PHENOMENA-BASED LEARNING CHECK

CRSE & EQUITY LENS

ASSESSMENT ALIGNMENT

INSTRUCTIONAL COHERENCE

EXPORT FORMAT OPTIONS

KEY ELEMENTS FOR STRONG ANSWER

MODEL ANSWER POINTS

A. AIM / ESSENTIAL QUESTION

B. DO NOW

C. MINI-LESSON

D. GUIDED PRACTICE

E. CHECK FOR UNDERSTANDING

F. INDEPENDENT PRACTICE

G. CLOSURE / EXIT TICKET

H. HOMEWORK ACTIVITY

I. DIFFERENTIATION & SUPPORT

PART [Roman Numeral]: (e.g., PART I: Overview)

SECTION [Alphanumeric]: (e.g., SECTION 1: Details, SECTION A: Basics)

Place each section marker on its own line.

2. Text Formatting

Paragraphs: Separate paragraphs with one or more empty lines.

Line Breaks within a Paragraph: Use a single newline character to create a line break within a continuous block of text (this will render as <br/>).

Superscripts: Enclose superscript text within <sup> and </sup> tags. (e.g., E=mc<sup>2</sup>)

Subscripts: Enclose subscript text within <sub> and </sub> tags. (e.g., H<sub>2</sub>O)

Nesting: Superscript and subscript tags can be nested (e.g., X<sup>2<sup>n</sup></sup>).

3. LaTeX Mathematical Expressions

Inline LaTeX: Enclose inline mathematical expressions within single dollar signs ($) or backslash parentheses (\\( and \\)).

Example: The formula is $E=mc^2$.

Example: Consider the equation \\(ax^2 + bx + c = 0\\).

Display LaTeX: For block-level, standalone mathematical expressions, use double dollar signs ($$) or backslash square brackets (\\[ and \\]). Each display block should be on its own line or span multiple lines without other text.

Example:

$$
\\int_0^\\infty e^{-x^2} dx = \\frac{\\sqrt{\\pi}}{2}
$$
Example:

\\[
\\sum_{n=1}^\\infty \\frac{1}{n^2} = \\frac{\\pi^2}{6}
\\]
Avoid standard HTML tags inside LaTeX blocks. The parser treats content within LaTeX delimiters as raw LaTeX.

4. SVG Images

Full SVG Blocks: Embed complete SVG XML directly in the content. The SVG content must start with <svg and end with </svg>.

Placement: Place SVG blocks on their own lines. They can span multiple lines.

Example:

<svg width="100" height="100">
  <circle cx="50" cy="50" r="40" stroke="black" stroke-width="3" fill="red" />
</svg>
Avoid mixing SVG XML with regular text on the same line.

5. Tables

Markdown-like Syntax: Create tables using pipe (|) characters to separate columns.

Header Separator: Use hyphens (-), colons (:), or equal signs (=) between pipes to separate the header row from the data rows. A line of +---+---+ is also recognized.

Caption (Optional): A table can optionally start with a caption line in the format Table X. Your Table Caption where X is a number. This line must be immediately before the table structure.

Example (with caption):

Table 1. Monthly Sales Data
| Product | January | February |
|---------|---------|----------|
| Apples  | 100     | 120      |
| Oranges | 80      | 95       |
Example (without caption):

| Header 1 | Header 2 |
|:---|---:|
| Left Aligned | Right Aligned |
| Cell 3 | Cell 4 |
Empty lines within a table are ignored.

Cells can contain superscripts and subscripts.

6. Lists

Bullet Points: Use hyphens (-), en-dashes (–), or asterisks (*) followed by a space to denote list items.

Example:

- First item
- Second item
Numbered Lists: Use numbers followed by a period (.) and a space.

Example:

1. First item
2. Second item
Indentation for Nesting: Indent list items with two spaces per level of nesting.

Example:

- Main point
  - Sub-point 1
  - Sub-point 2
    1. Nested numbered item
Each list item should be on its own line.

List items can contain superscripts and subscripts.

7. Special Diagram Descriptions (for SVG Generation)

The system can interpret structured text to generate simple SVG diagrams. Follow these specific block formats:

a. NYS Diagram - Text Description for SVG

Start with: [Your Diagram Title - Text Description for SVG]

Structure:

Center Element: labeled "Label Text" (Use LaTeX: \\LaTeX) (Shape: Circle/Rectangle)

Inputs:

-arrow label: "Input Label" (Use LaTeX: \\LaTeX) (Source: position)

Outputs:

-arrow label: "Output Label" (Use LaTeX: \\LaTeX) (Destination: position)

Any other lines that are not recognized as a specific element will be treated as notes.

Example:

[Cellular Respiration Diagram - Text Description for SVG]
Center Element: labeled "Cellular Respiration" (Shape: Rectangle)
Inputs:
-arrow label: "Glucose" (Source: Left)
-arrow label: "Oxygen" (Source: Top)
Outputs:
-arrow label: "ATP" (Destination: Right)
-arrow label: "CO2" (Destination: Bottom)
-arrow label: "Water" (Destination: Bottom)
This diagram illustrates the process of cellular respiration.
Note: (Use LaTeX: \\LaTeX) is optional and provides the LaTeX string for the label. If both a plain label and a LaTeX label are provided, the LaTeX one will be preferred for rendering. Source and Destination positions (Left, Top, Right, Bottom) are hints for diagram rendering.

b. Simple Flow Diagram

Start with: [START_SIMPLE_FLOW_DIAGRAM: Your Diagram Title]

End with: [END_SIMPLE_FLOW_DIAGRAM]

Structure (each on a new line within the block):

CENTER_ELEMENT_LABEL: Your Central Process Label

CENTER_ELEMENT_SHAPE: rect | oval | diamond (Choose one)

INPUT: Input Label, POSITION: top | left | right (Can have multiple INPUT lines)

OUTPUT: Output Label, POSITION: bottom | left | right (Can have multiple OUTPUT lines)

DESCRIPTION_NOTES: Any additional notes about the diagram. (Optional)

Example:

[START_SIMPLE_FLOW_DIAGRAM: Water Cycle]
CENTER_ELEMENT_LABEL: Evaporation
CENTER_ELEMENT_SHAPE: oval
INPUT: Solar Energy, POSITION: top
INPUT: Water, POSITION: left
OUTPUT: Water Vapor, POSITION: right
DESCRIPTION_NOTES: A basic representation of the water cycle.
[END_SIMPLE_FLOW_DIAGRAM]
c. Generic SVG Description Block

Start with: [START_SVG_DESCRIPTION: Your Visual Type] (e.g., [START_SVG_DESCRIPTION: Line Graph], [START_SVG_DESCRIPTION: Bar Chart])

End with: [END_SVG_DESCRIPTION]

Structure (each on a new line within the block):

TITLE: Your Graph Title

X_AXIS_LABEL: Label for X-axis (Optional)

Y_AXIS_LABEL: Label for Y-axis (Optional)

X_AXIS_RANGE: Min-Max (Units) (Optional)

Y_AXIS_RANGE: Min-Max (Units) (Optional)

DATA_POINTS: (x1, y1), (x2, y2), ... or (label1, value1), (label2, value2), ... (Optional)

LINE_COLOR: color_name_or_hex (Optional, for graphs)

DESCRIPTION: Any additional descriptive notes. (Can be multiple lines, they will be concatenated)

ELEMENT: [Type], LABEL: [Label Text], LABEL_LATEX: [Optional LaTeX] (For describing specific elements within the SVG, e.g., ELEMENT: Point, LABEL: Peak A)

Example:

[START_SVG_DESCRIPTION: Population Growth Line Graph]
TITLE: World Population Over Time
X_AXIS_LABEL: Year
Y_AXIS_LABEL: Population (Billions)
X_AXIS_RANGE: 1950-2050
Y_AXIS_RANGE: 0-10
DATA_POINTS: (1950, 2.5), (2000, 6.1), (2025, 8.0)
LINE_COLOR: blue
DESCRIPTION: This graph illustrates the rapid increase in global population.
ELEMENT: Point, LABEL: Point A, LABEL_LATEX: (1950, 2.5)
ELEMENT: Trend, LABEL: Exponential Growth
[END_SVG_DESCRIPTION]
`;
