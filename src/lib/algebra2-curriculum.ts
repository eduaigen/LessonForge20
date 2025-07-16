
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
        "Unit 1: Polynomials": {
            unit: "Unit 1: Polynomials",
            topics: {
                "Introduction to Polynomials": {
                    topic: "Introduction to Polynomials",
                    lessons: [
                        { title: "Lesson 1: Features of Polynomials", objective: "I can describe the key features of polynomial graphs and expressions." },
                        { title: "Lesson 2: End Behavior", objective: "I can determine the end behavior of a polynomial function from its equation." }
                    ]
                },
                "Operations with Polynomials": {
                    topic: "Operations with Polynomials",
                    lessons: [
                        { title: "Lesson 3: Adding and Subtracting Polynomials", objective: "I can add and subtract polynomials." },
                        { title: "Lesson 4: Multiplying Polynomials", objective: "I can multiply polynomials." },
                        { title: "Lesson 5: Polynomial Division", objective: "I can divide polynomials using long division and synthetic division." }
                    ]
                },
                "Factoring Polynomials": {
                    topic: "Factoring Polynomials",
                    lessons: [
                        { title: "Lesson 6: Factoring Polynomials", objective: "I can factor polynomials using various techniques." },
                        { title: "Lesson 7: Zeros of Polynomials", objective: "I can find the zeros of a polynomial function." }
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
                        { title: "Lesson 1: Simplifying Rational Expressions", objective: "I can simplify rational expressions." },
                        { title: "Lesson 2: Multiplying and Dividing Rational Expressions", objective: "I can multiply and divide rational expressions." },
                        { title: "Lesson 3: Adding and Subtracting Rational Expressions", objective: "I can add and subtract rational expressions." }
                    ]
                },
                "Rational Equations": {
                    topic: "Rational Equations",
                    lessons: [
                        { title: "Lesson 4: Solving Rational Equations", objective: "I can solve rational equations and check for extraneous solutions." }
                    ]
                },
                "Radical Expressions and Equations": {
                    topic: "Radical Expressions and Equations",
                    lessons: [
                        { title: "Lesson 5: Simplifying Radical Expressions", objective: "I can simplify radical expressions." },
                        { title: "Lesson 6: Solving Radical Equations", objective: "I can solve radical equations and check for extraneous solutions." }
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
                        { title: "Lesson 1: Graphing Exponential Functions", objective: "I can graph exponential functions and identify their key features." },
                        { title: "Lesson 2: Solving Exponential Equations", objective: "I can solve exponential equations by finding a common base." }
                    ]
                },
                "Logarithmic Functions": {
                    topic: "Logarithmic Functions",
                    lessons: [
                        { title: "Lesson 3: Introduction to Logarithms", objective: "I can evaluate logarithms and convert between exponential and logarithmic forms." },
                        { title: "Lesson 4: Graphing Logarithmic Functions", objective: "I can graph logarithmic functions and identify their key features." },
                        { title: "Lesson 5: Properties of Logarithms", objective: "I can use the properties of logarithms to expand and condense logarithmic expressions." },
                        { title: "Lesson 6: Solving Logarithmic Equations", objective: "I can solve logarithmic equations." }
                    ]
                },
                "Applications": {
                    topic: "Applications",
                    lessons: [
                        { title: "Lesson 7: Modeling with Exponential and Logarithmic Functions", objective: "I can use exponential and logarithmic functions to model and solve real-world problems." }
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
                        { title: "Lesson 1: Angles and Radian Measure", objective: "I can convert between degrees and radians and find coterminal angles." },
                        { title: "Lesson 2: The Unit Circle", objective: "I can find the values of sine, cosine, and tangent for angles on the unit circle." }
                    ]
                },
                "Graphs of Trigonometric Functions": {
                    topic: "Graphs of Trigonometric Functions",
                    lessons: [
                        { title: "Lesson 3: Graphing Sine and Cosine Functions", objective: "I can graph sine and cosine functions and identify their amplitude, period, and midline." },
                        { title: "Lesson 4: Graphing Other Trigonometric Functions", objective: "I can graph tangent, cotangent, secant, and cosecant functions." }
                    ]
                },
                "Trigonometric Identities and Equations": {
                    topic: "Trigonometric Identities and Equations",
                    lessons: [
                        { title: "Lesson 5: Trigonometric Identities", objective: "I can use trigonometric identities to simplify expressions and prove other identities." },
                        { title: "Lesson 6: Solving Trigonometric Equations", objective: "I can solve trigonometric equations." }
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
                        { title: "Lesson 1: Normal Distributions", objective: "I can use the mean and standard deviation of a normal distribution to estimate population percentages." },
                        { title: "Lesson 2: Sampling and Surveys", objective: "I can identify different sampling methods and recognize bias in survey questions." }
                    ]
                },
                "Probability": {
                    topic: "Probability",
                    lessons: [
                        { title: "Lesson 3: Conditional Probability", objective: "I can find conditional probabilities and use them to determine if events are independent." },
                        { title: "Lesson 4: Rules of Probability", objective: "I can use the rules of probability to compute probabilities of compound events." }
                    ]
                }
            }
        }
    }
};

    