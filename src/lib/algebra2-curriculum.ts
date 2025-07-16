
type Lesson = {
    title: string;
    objective: string;
};

type Topic = {
    topic: string;
    lessons: Lesson[];
};

type Unit = {
    unit: string;
    topics: { [key: string]: Topic };
};

export const algebra2Curriculum: {
    units: { [key: string]: Unit };
} = {
    units: {
        "Unit 1: Polynomial Functions": {
            unit: "Unit 1: Polynomial Functions",
            topics: {
                "Section A: Introduction to Polynomials": {
                    topic: "Section A: Introduction to Polynomials",
                    lessons: [
                        { title: "Graphs of Polynomials", objective: "Identify and describe key features of polynomial graphs, such as end behavior, turning points, and intercepts." },
                        { title: "Adding and Subtracting Polynomials", objective: "Perform addition and subtraction of polynomial expressions." },
                        { title: "Multiplying Polynomials", objective: "Multiply polynomial expressions using the distributive property and other methods." },
                        { title: "Factoring Polynomials", objective: "Factor polynomials using various techniques, including grouping and special patterns." }
                    ]
                },
                "Section B: Polynomial Division and Theorems": {
                    topic: "Section B: Polynomial Division and Theorems",
                    lessons: [
                        { title: "Dividing Polynomials", objective: "Divide polynomials using long division and synthetic division." },
                        { title: "The Remainder Theorem", objective: "Apply the Remainder Theorem to evaluate polynomial functions." },
                        { title: "The Factor Theorem", objective: "Use the Factor Theorem to find factors and roots of polynomial functions." },
                        { title: "Roots and Zeros of Polynomials", objective: "Find all real and complex zeros of a polynomial function." }
                    ]
                }
            }
        },
        "Unit 2: Rational and Radical Functions": {
            unit: "Unit 2: Rational and Radical Functions",
            topics: {
                "Section A: Rational Exponents and Radical Functions": {
                    topic: "Section A: Rational Exponents and Radical Functions",
                    lessons: [
                        { title: "Properties of Exponents and Radicals", objective: "Simplify expressions involving rational exponents and radicals." },
                        { title: "Graphing Radical Functions", objective: "Graph radical functions and analyze their domain, range, and transformations." },
                        { title: "Solving Radical Equations", objective: "Solve equations containing radicals and identify extraneous solutions." }
                    ]
                },
                "Section B: Rational Functions": {
                    topic: "Section B: Rational Functions",
                    lessons: [
                        { title: "Graphing Rational Functions", objective: "Identify asymptotes, intercepts, and holes to graph rational functions." },
                        { title: "Multiplying and Dividing Rational Expressions", objective: "Simplify products and quotients of rational expressions." },
                        { title: "Adding and Subtracting Rational Expressions", objective: "Find least common denominators to add and subtract rational expressions." },
                        { title: "Solving Rational Equations", objective: "Solve equations containing rational expressions and identify extraneous solutions." }
                    ]
                }
            }
        },
        "Unit 3: Exponential and Logarithmic Functions": {
            unit: "Unit 3: Exponential and Logarithmic Functions",
            topics: {
                "Section A: Exponential Functions Revisited": {
                    topic: "Section A: Exponential Functions Revisited",
                    lessons: [
                        { title: "Graphing Exponential Functions", objective: "Graph exponential growth and decay functions and identify their key features." },
                        { title: "The Natural Base e", objective: "Use the natural base e in exponential functions and applications." },
                        { title: "Applications of Exponential Functions", objective: "Model real-world situations, such as compound interest and population growth, with exponential functions." }
                    ]
                },
                "Section B: Logarithmic Functions": {
                    topic: "Section B: Logarithmic Functions",
                    lessons: [
                        { title: "Defining and Evaluating Logarithms", objective: "Understand the relationship between exponential and logarithmic forms." },
                        { title: "Graphing Logarithmic Functions", objective: "Graph logarithmic functions and analyze their domain, range, and transformations." },
                        { title: "Properties of Logarithms", objective: "Use the properties of logarithms to expand and condense logarithmic expressions." },
                        { title: "Solving Exponential and Logarithmic Equations", objective: "Solve exponential and logarithmic equations using properties of exponents and logarithms." }
                    ]
                }
            }
        },
        "Unit 4: Trigonometric Functions": {
            unit: "Unit 4: Trigonometric Functions",
            topics: {
                "Section A: The Unit Circle": {
                    topic: "Section A: The Unit Circle",
                    lessons: [
                        { title: "Angles and Radian Measure", objective: "Convert between degree and radian measures and find coterminal angles." },
                        { title: "The Unit Circle", objective: "Use the unit circle to define and evaluate the six trigonometric functions." }
                    ]
                },
                "Section B: Graphing Trigonometric Functions": {
                    topic: "Section B: Graphing Trigonometric Functions",
                    lessons: [
                        { title: "Graphing Sine and Cosine Functions", objective: "Graph sine and cosine functions and identify their amplitude, period, and phase shift." },
                        { title: "Graphing Other Trigonometric Functions", objective: "Graph tangent, cotangent, secant, and cosecant functions." },
                        { title: "Modeling with Trigonometric Functions", objective: "Use trigonometric functions to model real-world periodic phenomena." }
                    ]
                },
                "Section C: Trigonometric Identities": {
                    topic: "Section C: Trigonometric Identities",
                    lessons: [
                        { title: "Fundamental Trigonometric Identities", objective: "Use fundamental identities to simplify expressions and verify other identities." },
                        { title: "Sum and Difference Formulas", objective: "Apply sum and difference formulas to evaluate trigonometric functions and solve equations." }
                    ]
                }
            }
        }
    }
};
