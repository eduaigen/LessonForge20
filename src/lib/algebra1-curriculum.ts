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
        "Number and Quantity": {
            unit: "Number and Quantity",
            topics: {
                "The Real Number System": {
                    topic: "The Real Number System",
                    lessons: [
                        { title: "Properties of Rational and Irrational Numbers", objective: "AI-N.RN.3: Use properties and operations to understand the different forms of rational and irrational numbers." }
                    ]
                },
                "Quantities": {
                    topic: "Quantities",
                    lessons: [
                        { title: "Reasoning with Quantities and Units", objective: "AI-N.Q.1 & AI-N.Q.3: Select and interpret quantities and units, and choose appropriate levels of accuracy." }
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
                        { title: "Interpreting Expressions", objective: "AI-A.SSE.1: Interpret expressions that represent a quantity in terms of its context." },
                        { title: "Rewriting Expressions", objective: "AI-A.SSE.2: Recognize and use the structure of an expression to identify ways to rewrite it." },
                        { title: "Writing Expressions in Equivalent Forms", objective: "AI-A.SSE.3: Choose and produce an equivalent form of an expression to reveal and explain properties." }
                    ]
                },
                "Arithmetic with Polynomials and Rational Expressions": {
                    topic: "Arithmetic with Polynomials and Rational Expressions",
                    lessons: [
                        { title: "Operations on Polynomials", objective: "AI-A.APR.1: Add, subtract, and multiply polynomials." },
                        { title: "Zeros and Factors of Polynomials", objective: "AI-A.APR.3: Identify zeros of polynomial functions when suitable factorizations are available." }
                    ]
                },
                "Creating Equations": {
                    topic: "Creating Equations",
                    lessons: [
                        { title: "Creating Equations and Inequalities in One Variable", objective: "AI-A.CED.1: Create equations and inequalities in one variable to represent a real-world context." },
                        { title: "Creating Equations in Two Variables", objective: "AI-A.CED.2: Create equations and linear inequalities in two variables to represent a real-world context." },
                        { title: "Representing Constraints", objective: "AI-A.CED.3: Represent constraints by equations or inequalities, and by systems of equations and/or inequalities." },
                        { title: "Rearranging Formulas", objective: "AI-A.CED.4: Rewrite formulas to highlight a quantity of interest." }
                    ]
                },
                "Reasoning with Equations and Inequalities": {
                    topic: "Reasoning with Equations and Inequalities",
                    lessons: [
                        { title: "Understanding Solving Equations", objective: "AI-A.REI.1a: Explain each step when solving a linear or quadratic equation." },
                        { title: "Solving Linear Equations and Inequalities", objective: "AI-A.REI.3: Solve linear equations and inequalities in one variable." },
                        { title: "Solving Quadratic Equations", objective: "AI-A.REI.4: Solve quadratic equations in one variable." },
                        { title: "Solving Systems of Linear Equations", objective: "AI-A.REI.6a: Solve systems of linear equations in two variables algebraically and graphically." },
                        { title: "Solving Systems of Linear and Quadratic Equations", objective: "AI-A.REI.7a: Solve a system consisting of a linear equation and a quadratic equation in two variables." },
                        { title: "Graphical Solutions of Equations", objective: "AI-A.REI.10 & AI-A.REI.11: Understand the graph of an equation and find approximate solutions by graphing." },
                        { title: "Graphical Solutions of Inequalities", objective: "AI-A.REI.12: Graph the solutions to a linear inequality and systems of linear inequalities." }
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
                        { title: "Understanding Functions and Notation", objective: "AI-F.IF.1 & AI-F.IF.2: Understand the concept of a function and use function notation." },
                        { title: "Sequences as Functions", objective: "AI-F.IF.3: Recognize that a sequence is a function whose domain is a subset of the integers." },
                        { title: "Interpreting Key Features of Graphs", objective: "AI-F.IF.4: Interpret key features of graphs and tables in terms of the quantities." },
                        { title: "Domain of a Function", objective: "AI-F.IF.5: Determine the domain of a function from its graph and context." },
                        { title: "Average Rate of Change", objective: "AI-F.IF.6: Calculate and interpret the average rate of change of a function." },
                        { title: "Graphing Functions", objective: "AI-F.IF.7: Graph functions and show key features." },
                        { title: "Equivalent Forms of Functions", objective: "AI-F.IF.8: Write a function in different but equivalent forms." },
                        { title: "Comparing Functions", objective: "AI-F.IF.9: Compare properties of two functions each represented in a different way." }
                    ]
                },
                "Building Functions": {
                    topic: "Building Functions",
                    lessons: [
                        { title: "Modeling with Functions", objective: "AI-F.BF.1: Write a function that describes a relationship between two quantities." },
                        { title: "Transformations of Functions", objective: "AI-F.BF.3a: Identify the effect on the graph of replacing f(x) by f(x) + k, k f(x), and f(x + k)." }
                    ]
                },
                "Linear, Quadratic, and Exponential Models": {
                    topic: "Linear, Quadratic, and Exponential Models",
                    lessons: [
                        { title: "Distinguishing Function Types", objective: "AI-F.LE.1: Distinguish between situations that can be modeled with linear and exponential functions." },
                        { title: "Constructing Linear and Exponential Functions", objective: "AI-F.LE.2: Construct a linear or exponential function symbolically given various contexts." },
                        { title: "Comparing Growth Rates", objective: "AI-F.LE.3: Observe that a quantity increasing exponentially eventually exceeds a quantity increasing linearly or quadratically." },
                        { title: "Interpreting Parameters", objective: "AI-F.LE.5: Interpret the parameters in a linear or exponential function in terms of a context." }
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
                        { title: "Representing and Comparing Data Sets", objective: "AI-S.ID.1 & AI-S.ID.2: Represent data with plots and use statistics to compare two or more data sets." },
                        { title: "Interpreting Data Shapes", objective: "AI-S.ID.3: Interpret differences in shape, center, and spread in the context of the data sets." },
                        { title: "Analyzing Two-Way Frequency Tables", objective: "AI-S.ID.5: Summarize categorical data for two categories in two-way frequency tables." },
                        { title: "Scatter Plots and Function Fitting", objective: "AI-S.ID.6: Represent bivariate data on a scatter plot and fit a function to the data." },
                        { title: "Interpreting Linear Models", objective: "AI-S.ID.7, AI-S.ID.8, AI-S.ID.9: Interpret slope and intercept, calculate and interpret the correlation coefficient, and distinguish between correlation and causation." }
                    ]
                }
            }
        }
    }
};
