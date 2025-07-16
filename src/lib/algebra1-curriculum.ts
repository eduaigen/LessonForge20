
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

export const algebra1Curriculum: {
    units: { [key: string]: Unit };
} = {
    units: {
        "Unit 1: One-Variable Statistics": {
            unit: "Unit 1: One-Variable Statistics",
            topics: {
                "Section A: Getting to Know You": {
                    topic: "Section A: Getting to Know You",
                    lessons: [
                        { title: "Getting to Know You", objective: "Introduce statistical questions and data collection." },
                        { title: "Data Representations", objective: "Represent and interpret data using dot plots, histograms, and box plots." },
                        { title: "A Gallery of Data", objective: "Compare and contrast different data representations." }
                    ]
                },
                "Section B: Distribution Shapes": {
                    topic: "Section B: Distribution Shapes",
                    lessons: [
                        { title: "The Shape of Distributions", objective: "Describe the shape of a data distribution (symmetric, skewed)." },
                        { title: "Calculating Measures of Center and Variability", objective: "Calculate and interpret measures of center (mean, median) and variability (IQR, standard deviation)." }
                    ]
                },
                "Section C: Manipulating Data": {
                    topic: "Section C: Manipulating Data",
                    lessons: [
                        { title: "The Effect of Extremes", objective: "Analyze the effect of outliers on measures of center and spread." },
                        { title: "Comparing and Contrasting Data Distributions", objective: "Compare two or more data distributions using their shapes, centers, and spreads." },
                        { title: "Standard Deviation", objective: "Understand standard deviation as a measure of variability." },
                        { title: "Outliers", objective: "Identify outliers and understand their impact on data analysis." }
                    ]
                }
            }
        },
        "Unit 2: Linear Equations and Systems": {
            unit: "Unit 2: Linear Equations and Systems",
            topics: {
                "Section A: Writing and Modeling with Equations": {
                    topic: "Section A: Writing and Modeling with Equations",
                    lessons: [
                        { title: "Planning a Party", objective: "Model a real-world situation with a linear equation." },
                        { title: "Writing Equations to Model Relationships", objective: "Write and interpret linear equations in two variables to model relationships between quantities." },
                        { title: "Equations and Their Solutions", objective: "Understand what it means for a pair of values to be a solution to a linear equation." }
                    ]
                },
                "Section B: Manipulating Equations and Understanding Their Structure": {
                    topic: "Section B: Manipulating Equations and Understanding Their Structure",
                    lessons: [
                        { title: "Equivalent Equations", objective: "Understand that equivalent equations have the same solutions." },
                        { title: "Which Variable to Solve for?", objective: "Rearrange linear equations to highlight a quantity of interest (solve for a variable)." },
                        { title: "Connecting Equations to Graphs", objective: "Connect the algebraic and graphical representations of linear equations." }
                    ]
                },
                "Section C: Systems of Linear Equations in Two Variables": {
                    topic: "Section C: Systems of Linear Equations in Two Variables",
                    lessons: [
                        { title: "Writing and Graphing Systems of Linear Equations", objective: "Write and graph systems of linear equations to represent real-world scenarios." },
                        { title: "Solving Systems by Substitution", objective: "Solve systems of linear equations using the substitution method." },
                        { title: "Solving Systems by Elimination", objective: "Solve systems of linear equations using the elimination method." }
                    ]
                }
            }
        },
        "Unit 3: Functions": {
            unit: "Unit 3: Functions",
            topics: {
                "Section A: Functions and Their Representations": {
                    topic: "Section A: Functions and Their Representations",
                    lessons: [
                        { title: "Function Notation", objective: "Understand and use function notation to represent relationships." },
                        { title: "Interpreting and Using Function Notation", objective: "Interpret statements that use function notation in terms of a context." }
                    ]
                },
                "Section B: Analyzing and Creating Graphs of Functions": {
                    topic: "Section B: Analyzing and Creating Graphs of Functions",
                    lessons: [
                        { title: "Features of Graphs", objective: "Identify key features of graphs of functions, including intercepts, intervals of increase/decrease, and relative maximums/minimums." },
                        { title: "Using Graphs to Find Average Rate of Change", objective: "Calculate and interpret the average rate of change of a function from its graph." }
                    ]
                },
                "Section C: Domain and Range": {
                    topic: "Section C: Domain and Range",
                    lessons: [
                        { title: "Domain and Range (Part 1)", objective: "Determine the domain and range of a function from its graph or a description." },
                        { title: "Piecewise Functions", objective: "Understand and graph piecewise-defined functions." }
                    ]
                }
            }
        },
        "Unit 4: Introduction to Exponential Functions": {
            unit: "Unit 4: Introduction to Exponential Functions",
            topics: {
                "Section A: Patterns of Growth": {
                    topic: "Section A: Patterns of Growth",
                    lessons: [
                        { title: "Patterns of Growth", objective: "Recognize and describe patterns of exponential growth." }
                    ]
                },
                "Section B: Exponential Functions": {
                    topic: "Section B: Exponential Functions",
                    lessons: [
                        { title: "Representing Exponential Growth", objective: "Write equations to represent exponential growth." },
                        { title: "Representing Exponential Decay", objective: "Write equations to represent exponential decay." },
                        { title: "Interpreting Exponential Functions", objective: "Interpret the parameters in an exponential function in terms of a context." }
                    ]
                },
                "Section C: Comparing Linear and Exponential Functions": {
                    topic: "Section C: Comparing Linear and Exponential Functions",
                    lessons: [
                        { title: "Which One Changes Faster?", objective: "Compare the growth of linear and exponential functions." },
                        { title: "Changes over Equal Intervals", objective: "Distinguish between linear and exponential functions by analyzing their change over equal intervals." }
                    ]
                }
            }
        },
        "Unit 5: Introduction to Quadratic Functions": {
            unit: "Unit 5: Introduction to Quadratic Functions",
            topics: {
                "Section A: A Different Kind of Change": {
                    topic: "Section A: A Different Kind of Change",
                    lessons: [
                        { title: "A Different Kind of Change", objective: "Recognize quadratic relationships from patterns, tables, and graphs." }
                    ]
                },
                "Section B: Quadratic Functions": {
                    topic: "Section B: Quadratic Functions",
                    lessons: [
                        { title: "Building Quadratic Functions from Geometric Patterns", objective: "Write a quadratic function to model a geometric pattern." },
                        { title: "Comparing Quadratic and Exponential Functions", objective: "Distinguish between quadratic and exponential growth." }
                    ]
                },
                "Section C: Features of Graphs of Quadratic Functions": {
                    topic: "Section C: Features of Graphs of Quadratic Functions",
                    lessons: [
                        { title: "Standard Form and Factored Form", objective: "Understand the relationship between the standard and factored forms of a quadratic expression." },
                        { title: "Graphing from the Factored Form", objective: "Use the factored form of a quadratic function to identify its x-intercepts and vertex." },
                        { title: "Vertex Form", objective: "Understand and use the vertex form of a quadratic function to identify its vertex and direction of opening." }
                    ]
                }
            }
        },
        "Unit 6: Quadratic Equations": {
            unit: "Unit 6: Quadratic Equations",
            topics: {
                "Section A: Solving Quadratic Equations": {
                    topic: "Section A: Solving Quadratic Equations",
                    lessons: [
                        { title: "Solving Quadratic Equations by Reasoning", objective: "Solve simple quadratic equations by taking square roots." },
                        { title: "Solving Quadratic Equations with the Zero Product Property", objective: "Use the zero product property to solve quadratic equations in factored form." },
                        { title: "Rewriting Quadratic Expressions in Factored Form", objective: "Factor quadratic expressions to solve quadratic equations." }
                    ]
                },
                "Section B: Completing the Square": {
                    topic: "Section B: Completing the Square",
                    lessons: [
                        { title: "Completing the Square", objective: "Understand the process of completing the square to rewrite a quadratic expression." },
                        { title: "Solving Quadratic Equations by Completing the Square", objective: "Solve any quadratic equation by completing the square." }
                    ]
                },
                "Section C: The Quadratic Formula": {
                    topic: "Section C: The Quadratic Formula",
                    lessons: [
                        { title: "The Quadratic Formula", objective: "Understand and apply the quadratic formula to solve quadratic equations." },
                        { title: "Rational and Irrational Solutions", objective: "Determine the nature of solutions to a quadratic equation using the discriminant." }
                    ]
                }
            }
        }
    }
};
