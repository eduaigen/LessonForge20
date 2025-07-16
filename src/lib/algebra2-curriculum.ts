
type Lesson = {
    title: string;
    objective: string;
    standard: string;
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
        "Unit 1: Polynomials": {
            unit: "Unit 1: Polynomials",
            topics: {
                "Introduction to Polynomials": {
                    topic: "Introduction to Polynomials",
                    lessons: [
                        { title: "Lesson 1: Features of Polynomials", objective: "I can describe the key features of polynomial graphs and expressions.", standard: "AII-F.IF.7c" },
                        { title: "Lesson 2: End Behavior", objective: "I can determine the end behavior of a polynomial function from its equation.", standard: "AII-F.IF.7c" }
                    ]
                },
                "Operations with Polynomials": {
                    topic: "Operations with Polynomials",
                    lessons: [
                        { title: "Lesson 3: Adding and Subtracting Polynomials", objective: "I can add and subtract polynomials.", standard: "AI-A.APR.1" },
                        { title: "Lesson 4: Multiplying Polynomials", objective: "I can multiply polynomials.", standard: "AI-A.APR.1" },
                        { title: "Lesson 5: Polynomial Division", objective: "I can divide polynomials using long division and synthetic division.", standard: "AII-A.APR.6" }
                    ]
                },
                "Factoring Polynomials": {
                    topic: "Factoring Polynomials",
                    lessons: [
                        { title: "Lesson 6: Factoring Polynomials", objective: "I can factor polynomials using various techniques.", standard: "AII-A.SSE.2" },
                        { title: "Lesson 7: Zeros of Polynomials", objective: "I can find the zeros of a polynomial function.", standard: "AII-A.APR.3" }
                    ]
                }
            }
        },
        "Unit 2: Rational and Radical Functions": {
            unit: "Unit 2: Rational and Radical Functions",
            topics: {
                "Rational Expressions": {
                    topic: "Rational Expressions",
                    lessons: [
                        { title: "Lesson 1: Simplifying Rational Expressions", objective: "I can simplify rational expressions.", standard: "AII-A.APR.6" },
                        { title: "Lesson 2: Multiplying and Dividing Rational Expressions", objective: "I can multiply and divide rational expressions.", standard: "(+)-A.APR.7" },
                        { title: "Lesson 3: Adding and Subtracting Rational Expressions", objective: "I can add and subtract rational expressions.", standard: "(+)-A.APR.7" }
                    ]
                },
                "Rational Equations": {
                    topic: "Rational Equations",
                    lessons: [
                        { title: "Lesson 4: Solving Rational Equations", objective: "I can solve rational equations and check for extraneous solutions.", standard: "AII-A.REI.2" }
                    ]
                },
                "Radical Expressions and Equations": {
                    topic: "Radical Expressions and Equations",
                    lessons: [
                        { title: "Lesson 5: Simplifying Radical Expressions", objective: "I can simplify radical expressions.", standard: "AII-N.RN.2" },
                        { title: "Lesson 6: Solving Radical Equations", objective: "I can solve radical equations and check for extraneous solutions.", standard: "AII-A.REI.2" }
                    ]
                }
            }
        },
        "Unit 3: Exponential and Logarithmic Functions": {
            unit: "Unit 3: Exponential and Logarithmic Functions",
            topics: {
                "Exponential Functions": {
                    topic: "Exponential Functions",
                    lessons: [
                        { title: "Lesson 1: Graphing Exponential Functions", objective: "I can graph exponential functions and identify their key features.", standard: "AII-F.IF.7e" },
                        { title: "Lesson 2: Solving Exponential Equations", objective: "I can solve exponential equations by finding a common base.", standard: "AII-F.LE.4" }
                    ]
                },
                "Logarithmic Functions": {
                    topic: "Logarithmic Functions",
                    lessons: [
                        { title: "Lesson 3: Introduction to Logarithms", objective: "I can evaluate logarithms and convert between exponential and logarithmic forms.", standard: "AII-F.BF.5a" },
                        { title: "Lesson 4: Graphing Logarithmic Functions", objective: "I can graph logarithmic functions and identify their key features.", standard: "AII-F.IF.7e" },
                        { title: "Lesson 5: Properties of Logarithms", objective: "I can use the properties of logarithms to expand and condense logarithmic expressions.", standard: "(+)-F.BF.5c" },
                        { title: "Lesson 6: Solving Logarithmic Equations", objective: "I can solve logarithmic equations.", standard: "AII-F.LE.4" }
                    ]
                },
                "Applications": {
                    topic: "Applications",
                    lessons: [
                        { title: "Lesson 7: Modeling with Exponential and Logarithmic Functions", objective: "I can use exponential and logarithmic functions to model and solve real-world problems.", standard: "AII-F.LE.5" }
                    ]
                }
            }
        },
        "Unit 4: Trigonometric Functions": {
            unit: "Unit 4: Trigonometric Functions",
            topics: {
                "The Unit Circle": {
                    topic: "The Unit Circle",
                    lessons: [
                        { title: "Lesson 1: Angles and Radian Measure", objective: "I can convert between degrees (e.g., $$90^\\circ$$) and radians and find coterminal angles.", standard: "AII-F.TF.1" },
                        { title: "Lesson 2: The Unit Circle", objective: "I can find the values of sine ($\\sin$), cosine ($\\cos$), and tangent ($\\tan$) for angles on the unit circle.", standard: "AII-F.TF.2" }
                    ]
                },
                "Graphs of Trigonometric Functions": {
                    topic: "Graphs of Trigonometric Functions",
                    lessons: [
                        { title: "Lesson 3: Graphing Sine and Cosine Functions", objective: "I can graph sine and cosine functions and identify their amplitude, period, and midline.", standard: "AII-F.IF.7e" },
                        { title: "Lesson 4: Graphing Other Trigonometric Functions", objective: "I can graph tangent ($\\tan$), cotangent ($\\cot$), secant ($\\sec$), and cosecant ($\\csc$) functions.", standard: "AII-F.IF.7e" }
                    ]
                },
                "Trigonometric Identities and Equations": {
                    topic: "Trigonometric Identities and Equations",
                    lessons: [
                        { title: "Lesson 5: Trigonometric Identities", objective: "I can use trigonometric identities to simplify expressions and prove other identities.", standard: "AII-F.TF.8" },
                        { title: "Lesson 6: Solving Trigonometric Equations", objective: "I can solve trigonometric equations.", standard: "(+)-F.TF.7" }
                    ]
                }
            }
        },
        "Unit 5: Statistics and Probability": {
            unit: "Unit 5: Statistics and Probability",
            topics: {
                "Data Analysis": {
                    topic: "Data Analysis",
                    lessons: [
                        { title: "Lesson 1: Normal Distributions", objective: "I can use the mean and standard deviation of a normal distribution to estimate population percentages.", standard: "AII-S.ID.4a" },
                        { title: "Lesson 2: Sampling and Surveys", objective: "I can identify different sampling methods and recognize bias in survey questions.", standard: "AII-S.IC.3" }
                    ]
                },
                "Probability": {
                    topic: "Probability",
                    lessons: [
                        { title: "Lesson 3: Conditional Probability", objective: "I can find conditional probabilities and use them to determine if events are independent.", standard: "AII-S.CP.4" },
                        { title: "Lesson 4: Rules of Probability", objective: "I can use the rules of probability to compute probabilities of compound events.", standard: "AII-S.CP.7" }
                    ]
                }
            }
        }
    }
};
