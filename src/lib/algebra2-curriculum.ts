
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
        "Number and Quantity": {
            unit: "Number and Quantity",
            topics: {
                "The Real Number System": {
                    topic: "The Real Number System",
                    lessons: [
                        { title: "Rational Exponents", objective: "AII-N.RN.1 & AII-N.RN.2: Explore and convert between radical expressions and expressions with rational exponents." }
                    ]
                },
                "The Complex Number System": {
                    topic: "The Complex Number System",
                    lessons: [
                        { title: "Introduction to Complex Numbers", objective: "AII-N.CN.1: Know there is a complex number i such that i² = –1." },
                        { title: "Arithmetic with Complex Numbers", objective: "AII-N.CN.2: Use the relation i² = –1 and properties to add, subtract, and multiply complex numbers." }
                    ]
                }
            }
        },
        "Algebra": {
            unit: "Algebra",
            topics: {
                "Seeing Structure in Expressions": {
                    topic: "Seeing Structure in Expressions",
                    lessons: [
                        { title: "Rewriting Complex Expressions", objective: "AII-A.SSE.2: Recognize and use the structure of an expression to identify ways to rewrite it (including factoring by grouping and sum/difference of cubes)." },
                        { title: "Factoring to Reveal Zeros", objective: "AII-A.SSE.3a: Factor quadratic expressions to reveal the zeros of the function." },
                        { title: "Properties of Exponents with Exponential Expressions", objective: "AII-A.SSE.3c: Use the properties of exponents to rewrite exponential expressions." }
                    ]
                },
                "Arithmetic with Polynomials and Rational Expressions": {
                    topic: "Arithmetic with Polynomials and Rational Expressions",
                    lessons: [
                        { title: "The Remainder Theorem", objective: "AII-A.APR.2: Apply the Remainder Theorem." },
                        { title: "Identifying Zeros of Polynomials", objective: "AII-A.APR.3: Identify zeros of polynomial functions when suitable factorizations are available." },
                        { title: "Rewriting Rational Expressions", objective: "AII-A.APR.6: Rewrite rational expressions in the form q(x) + r(x)/b(x)." }
                    ]
                },
                "Creating Equations": {
                    topic: "Creating Equations",
                    lessons: [
                        { title: "Creating Equations in One Variable", objective: "AII-A.CED.1: Create equations and inequalities in one variable to represent a real-world context (including rational and exponential functions)." }
                    ]
                },
                "Reasoning with Equations and Inequalities": {
                    topic: "Reasoning with Equations and Inequalities",
                    lessons: [
                        { title: "Explaining Steps in Solving Rational/Radical Equations", objective: "AII-A.REI.1b: Explain each step when solving rational or radical equations." },
                        { title: "Solving Rational and Radical Equations", objective: "AII-A.REI.2: Solve rational and radical equations in one variable and identify extraneous solutions." },
                        { title: "Solving Quadratic Equations with Complex Solutions", objective: "AII-A.REI.4b: Solve quadratic equations and write complex solutions in a + bi form." },
                        { title: "Solving Systems of Linear and Quadratic Equations", objective: "AII-A.REI.7b: Solve a system consisting of a linear equation and a quadratic equation in two variables." },
                        { title: "Graphical Solutions of Various Function Types", objective: "AII-A.REI.11: Find and interpret approximate solutions for f(x) = g(x) and f(x) ≤ g(x) graphically for various function types." }
                    ]
                }
            }
        },
        "Functions": {
            unit: "Functions",
            topics: {
                "Interpreting Functions": {
                    topic: "Interpreting Functions",
                    lessons: [
                        { title: "Recursive and Explicit Sequences", objective: "AII-F.IF.3: Recognize that a sequence is a function, and translate between recursive and explicit forms." },
                        { title: "Interpreting Key Features of Advanced Functions", objective: "AII-F.IF.4: Interpret key features of graphs and tables for polynomial, radical, exponential, logarithmic, and trigonometric functions." },
                        { title: "Average Rate of Change for Advanced Functions", objective: "AII-F.IF.6: Calculate and interpret the average rate of change of advanced functions." },
                        { title: "Graphing Advanced Functions", objective: "AII-F.IF.7c & 7e: Graph polynomial, cube root, exponential, logarithmic, and trigonometric functions, showing key features." },
                        { title: "Interpreting Exponential Functions", objective: "AII-F.IF.8b: Use the properties of exponents to interpret exponential functions and classify them as growth or decay." },
                        { title: "Comparing Advanced Functions", objective: "AII-F.IF.9: Compare properties of two functions each represented in a different way (for advanced function types)." }
                    ]
                },
                "Building Functions": {
                    topic: "Building Functions",
                    lessons: [
                        { title: "Modeling with Various Function Types", objective: "AII-F.BF.1a: Determine a function from context (including linear, quadratic, and exponential)." },
                        { title: "Combining Functions with Arithmetic Operations", objective: "AII-F.BF.1b: Combine standard function types using arithmetic operations." },
                        { title: "Modeling with Sequences", objective: "AII-F.BF.2: Write arithmetic and geometric sequences both recursively and explicitly to model situations." },
                        { title: "Transformations of Advanced Functions", objective: "AII-F.BF.3b: Identify the effect of transformations on advanced functions and recognize even/odd functions." },
                        { title: "Finding Inverse Functions", objective: "AII-F.BF.4a: Find the inverse of a one-to-one function algebraically and graphically." },
                        { title: "Inverse Relationship of Exponents and Logarithms", objective: "AII-F.BF.5a: Understand inverse relationships between exponents and logarithms." },
                        { title: "Summation (Sigma) Notation", objective: "AII-F.BF.6: Represent and evaluate the sum of a finite arithmetic or finite geometric series using summation notation." },
                        { title: "Formulas for Finite Series", objective: "AII-F.BF.7: Explore the derivation of and use the formulas for finite arithmetic and geometric series." }
                    ]
                },
                "Linear, Quadratic, and Exponential Models": {
                    topic: "Linear, Quadratic, and Exponential Models",
                    lessons: [
                        { title: "Constructing Functions from Various Contexts", objective: "AII-F.LE.2: Construct a linear or exponential function symbolically from a graph, description, or input-output pairs." },
                        { title: "Solving Exponential Equations with Logarithms", objective: "AII-F.LE.4: Use logarithms to solve exponential equations of the form ab^(ct) = d." },
                        { title: "Interpreting Parameters in Exponential Functions", objective: "AII-F.LE.5: Interpret the parameters in a linear or exponential function with non-integer domains." }
                    ]
                },
                "Trigonometric Functions": {
                    topic: "Trigonometric Functions",
                    lessons: [
                        { title: "Radian Measure and the Unit Circle", objective: "AII-F.TF.1 & AII-F.TF.2: Understand radian measure and use the unit circle to calculate trigonometric function values." },
                        { title: "Symmetry and Periodicity of Trigonometric Functions", objective: "AII-F.TF.4: Use the unit circle to explain symmetry and periodicity of trigonometric functions." },
                        { title: "Modeling Periodic Phenomena", objective: "AII-F.TF.5: Choose trigonometric functions to model periodic phenomena with specified amplitude, frequency, and midline." },
                        { title: "The Pythagorean Identity", objective: "AII-F.TF.8: Prove the Pythagorean identity sin²(θ) + cos²(θ) = 1 and use it to find other trig function values." }
                    ]
                }
            }
        },
        "Statistics and Probability": {
            unit: "Statistics and Probability",
            topics: {
                "Interpreting Categorical and Quantitative Data": {
                    topic: "Interpreting Categorical and Quantitative Data",
                    lessons: [
                        { title: "Normal Distributions", objective: "AII-S.ID.4a & 4b: Recognize if a normal curve is appropriate for a data set and determine population percentages." },
                        { title: "Fitting Functions to Data", objective: "AII-S.ID.6a: Fit quadratic, exponential, and power models to real-world data." }
                    ]
                },
                "Making Inferences and Justifying Conclusions": {
                    topic: "Making Inferences and Justifying Conclusions",
                    lessons: [
                        { title: "Evaluating Sample Statistics", objective: "AII-S.IC.2: Determine if a value for a sample proportion or mean is likely to occur based on a simulation." },
                        { title: "Surveys, Experiments, and Observational Studies", objective: "AII-S.IC.3: Recognize the purposes of and differences among surveys, experiments, and observational studies." },
                        { title: "Plausibility of Parameters", objective: "AII-S.IC.4: Use a simulation model to determine if a suggested parameter is plausible." },
                        { title: "Drawing and Critiquing Conclusions", objective: "AII-S.IC.6a & 6b: Use statistical tools to draw conclusions and critique claims from informational texts." }
                    ]
                },
                "Conditional Probability and the Rules of Probability": {
                    topic: "Conditional Probability and the Rules of Probability",
                    lessons: [
                        { title: "Describing Events as Subsets", objective: "AII-S.CP.1: Describe events as subsets of a sample space using unions, intersections, or complements." },
                        { title: "Independence and Conditional Probability with Two-Way Tables", objective: "AII-S.CP.4: Use two-way frequency tables to decide if events are independent and to calculate conditional probabilities." },
                        { title: "Applying the Addition Rule", objective: "AII-S.CP.7: Apply the Addition Rule, P(A or B) = P(A) + P(B) - P(A and B), and interpret the answer." }
                    ]
                }
            }
        }
    }
};
