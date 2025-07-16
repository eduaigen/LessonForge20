
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
                "Getting to know you": {
                    topic: "Getting to know you",
                    lessons: [
                        { title: "Lesson 1: Numbers in the News", objective: "I can find, interpret, and share interesting numerical information from a news article." },
                        { title: "Lesson 2: Data Representations", objective: "I can describe the shape of a data set using the terms “symmetric,” “skewed,” “uniform,” and “bell-shaped.”" }
                    ]
                },
                "Measuring center and variability": {
                    topic: "Measuring center and variability",
                    lessons: [
                        { title: "Lesson 3: A Gallery of Data", objective: "I can describe the shape of a distribution and say whether the mean or median is a better measure of center for the data." },
                        { title: "Lesson 4: The Shape of Distributions", objective: "I can use the shape of a distribution to compare the mean and median." },
                        { title: "Lesson 5: Calculating Measures of Center and Variability", objective: "I can find the mean, median, and interquartile range of a data set." }
                    ]
                },
                "Distribution shapes": {
                    topic: "Distribution shapes",
                    lessons: [
                        { title: "Lesson 6: Mystery Computations", objective: "I know what a standard deviation is and can use technology to find it." },
                        { title: "Lesson 7: Calculating Standard Deviation", objective: "I can describe what standard deviation measures and what a larger or smaller standard deviation means." },
                        { title: "Lesson 8: Investigating variability", objective: "I can compare the standard deviation and interquartile range to determine the best measure of variability for a data set." }
                    ]
                },
                "Data, shape, and outliers": {
                    topic: "Data, shape, and outliers",
                    lessons: [
                        { title: "Lesson 9: The Normal Distribution", objective: "I can use the mean and standard deviation to describe a data set that is approximately bell-shaped." },
                        { title: "Lesson 10: How Normal is it?", objective: "I can decide if a data set is approximately normal and use the mean and standard deviation to estimate percentages." },
                        { title: "Lesson 11: Comparing and Contrasting Data Distributions", objective: "I can compare and contrast two data sets." },
                        { title: "Lesson 12: Outliers", objective: "I can find values that are outliers in a data set and explain why they are outliers." }
                    ]
                }
            }
        },
        "Unit 2: Linear Equations, Inequalities, and Systems": {
            unit: "Unit 2: Linear Equations, Inequalities, and Systems",
            topics: {
                "Linear equations in one variable": {
                    topic: "Linear equations in one variable",
                    lessons: [
                        { title: "Lesson 1: Planning a Pizza Party", objective: "I can write and interpret an expression that represents a situation." },
                        { title: "Lesson 2: Writing and Solving Equations", objective: "I can write and solve an equation to answer a question." },
                        { title: "Lesson 3: Solving and Working Backwards", objective: "I can solve an equation by doing the same thing to each side." },
                        { title: "Lesson 4: Equations and Their Solutions", objective: "I can tell what the solution to an equation is." }
                    ]
                },
                "Linear inequalities in one variable": {
                    topic: "Linear inequalities in one variable",
                    lessons: [
                        { title: "Lesson 5: Writing and Solving Inequalities", objective: "I can write and solve an inequality to answer a question." },
                        { title: "Lesson 6: Graphing Inequalities", objective: "I can graph the solutions to an inequality on a number line." }
                    ]
                },
                "Two-variable linear equations": {
                    topic: "Two-variable linear equations",
                    lessons: [
                        { title: "Lesson 7: Equations of Lines", objective: "I can write and graph equations of lines." },
                        { title: "Lesson 8: Slope", objective: "I can find the slope of a line and interpret it in a context." },
                        { title: "Lesson 9: Slopes of Parallel and Perpendicular Lines", objective: "I can write equations of parallel and perpendicular lines." },
                        { title: "Lesson 10: Writing Equations of Lines", objective: "I can write an equation of a line from a description." }
                    ]
                },
                "Linear inequalities in two variables": {
                    topic: "Linear inequalities in two variables",
                    lessons: [
                        { title: "Lesson 11: Graphing Linear Inequalities in Two Variables", objective: "I can graph a linear inequality in two variables." }
                    ]
                },
                "Systems of linear equations in two variables": {
                    topic: "Systems of linear equations in two variables",
                    lessons: [
                        { title: "Lesson 12: Systems of Equations", objective: "I can explain what a system of equations is and what the solution to a system of equations is." },
                        { title: "Lesson 13: Solving Systems of Equations", objective: "I can solve a system of equations by graphing." },
                        { title: "Lesson 14: Solving Systems by Substitution", objective: "I can solve a system of equations by substitution." },
                        { title: "Lesson 15: Solving Systems by Elimination", objective: "I can solve a system of equations by elimination." }
                    ]
                },
                "Systems of linear inequalities in two variables": {
                    topic: "Systems of linear inequalities in two variables",
                    lessons: [
                        { title: "Lesson 16: Graphing Systems of Linear Inequalities", objective: "I can graph the solution set to a system of linear inequalities." }
                    ]
                }
            }
        },
        "Unit 3: Two-Variable Statistics": {
            unit: "Unit 3: Two-Variable Statistics",
            topics: {
                "Two-way tables": {
                    topic: "Two-way tables",
                    lessons: [
                        { title: "Lesson 1: Two-Way Tables", objective: "I can use a two-way table to analyze data." },
                        { title: "Lesson 2: Relative Frequency Tables", objective: "I can use a relative frequency table to find conditional probabilities." }
                    ]
                },
                "Scatter plots": {
                    topic: "Scatter plots",
                    lessons: [
                        { title: "Lesson 3: Scatter Plots and Correlation", objective: "I can describe the relationship between two variables using a scatter plot and a correlation coefficient." },
                        { title: "Lesson 4: Linear Models", objective: "I can use a linear model to make predictions." }
                    ]
                },
                "Correlation and causation": {
                    topic: "Correlation and causation",
                    lessons: [
                        { title: "Lesson 5: Correlation and Causation", objective: "I can tell the difference between correlation and causation." },
                        { title: "Lesson 6: The Correlation Coefficient", objective: "I can use the correlation coefficient to describe the strength and direction of a linear relationship." }
                    ]
                }
            }
        },
        "Unit 4: Functions": {
            unit: "Unit 4: Functions",
            topics: {
                "Functions and their representations": {
                    topic: "Functions and their representations",
                    lessons: [
                        { title: "Lesson 1: Describing and Graphing Situations", objective: "I can describe a situation using a graph." },
                        { title: "Lesson 2: Function Notation", objective: "I can use function notation to write and evaluate functions." },
                        { title: "Lesson 3: Interpreting and Using Function Notation", objective: "I can interpret and use function notation." }
                    ]
                },
                "Domain and range": {
                    topic: "Domain and range",
                    lessons: [
                        { title: "Lesson 4: Domain and Range", objective: "I can find the domain and range of a function." }
                    ]
                },
                "Combining functions": {
                    topic: "Combining functions",
                    lessons: [
                        { title: "Lesson 5: Combining Functions", objective: "I can combine functions using addition, subtraction, multiplication, and division." }
                    ]
                },
                "Inverse functions": {
                    topic: "Inverse functions",
                    lessons: [
                        { title: "Lesson 6: Inverse Functions", objective: "I can find the inverse of a function." }
                    ]
                }
            }
        },
        "Unit 5: Introduction to Exponential Functions": {
            unit: "Unit 5: Introduction to Exponential Functions",
            topics: {
                "Exponential growth and decay": {
                    topic: "Exponential growth and decay",
                    lessons: [
                        { title: "Lesson 1: Growing and Shrinking", objective: "I can recognize and describe situations that involve exponential growth and decay." },
                        { title: "Lesson 2: Exponential Functions", objective: "I can write and graph exponential functions." },
                        { title: "Lesson 3: Percent Growth and Decay", objective: "I can write and graph exponential functions that represent percent growth and decay." }
                    ]
                },
                "Comparing linear and exponential functions": {
                    topic: "Comparing linear and exponential functions",
                    lessons: [
                        { title: "Lesson 4: Linear and Exponential Models", objective: "I can compare linear and exponential models and use them to make predictions." }
                    ]
                },
                "Properties of exponents": {
                    topic: "Properties of exponents",
                    lessons: [
                        { title: "Lesson 5: Properties of Exponents", objective: "I can use the properties of exponents to simplify expressions." },
                        { title: "Lesson 6: Rational Exponents", objective: "I can use rational exponents to write and evaluate expressions." }
                    ]
                }
            }
        },
        "Unit 6: Introduction to Quadratic Functions": {
            unit: "Unit 6: Introduction to Quadratic Functions",
            topics: {
                "Quadratic functions": {
                    topic: "Quadratic functions",
                    lessons: [
                        { title: "Lesson 1: A Different Kind of Change", objective: "I can recognize and describe situations that involve quadratic change." },
                        { title: "Lesson 2: Quadratic Functions", objective: "I can write and graph quadratic functions." }
                    ]
                },
                "Quadratic equations": {
                    topic: "Quadratic equations",
                    lessons: [
                        { title: "Lesson 3: Solving Quadratic Equations by Graphing", objective: "I can solve a quadratic equation by graphing." },
                        { title: "Lesson 4: Solving Quadratic Equations by Factoring", objective: "I can solve a quadratic equation by factoring." },
                        { title: "Lesson 5: Solving Quadratic Equations by Completing the Square", objective: "I can solve a quadratic equation by completing the square." },
                        { title: "Lesson 6: The Quadratic Formula", objective: "I can use the quadratic formula to solve a quadratic equation." }
                    ]
                },
                "Quadratic inequalities": {
                    topic: "Quadratic inequalities",
                    lessons: [
                        { title: "Lesson 7: Graphing Quadratic Inequalities", objective: "I can graph the solution set to a quadratic inequality." }
                    ]
                }
            }
        },
        "Unit 7: Structures of Quadratic Expressions": {
            unit: "Unit 7: Structures of Quadratic Expressions",
            topics: {
                "Factored form": {
                    topic: "Factored form",
                    lessons: [
                        { title: "Lesson 1: Factoring Quadratic Expressions", objective: "I can factor a quadratic expression." },
                        { title: "Lesson 2: Solving Quadratic Equations by Factoring", objective: "I can solve a quadratic equation by factoring." }
                    ]
                },
                "Vertex form": {
                    topic: "Vertex form",
                    lessons: [
                        { title: "Lesson 3: Completing the Square", objective: "I can complete the square to write a quadratic expression in vertex form." },
                        { title: "Lesson 4: Solving Quadratic Equations by Completing the Square", objective: "I can solve a quadratic equation by completing the square." }
                    ]
                },
                "Standard form": {
                    topic: "Standard form",
                    lessons: [
                        { title: "Lesson 5: The Quadratic Formula", objective: "I can use the quadratic formula to solve a quadratic equation." }
                    ]
                }
            }
        },
        "Unit 8: More Functions, More Features": {
            unit: "Unit 8: More Functions, More Features",
            topics: {
                "Absolute value functions": {
                    topic: "Absolute value functions",
                    lessons: [
                        { title: "Lesson 1: Absolute Value Functions", objective: "I can write and graph absolute value functions." },
                        { title: "Lesson 2: Solving Absolute Value Equations", objective: "I can solve an absolute value equation." }
                    ]
                },
                "Piecewise functions": {
                    topic: "Piecewise functions",
                    lessons: [
                        { title: "Lesson 3: Piecewise Functions", objective: "I can write and graph piecewise functions." }
                    ]
                },
                "Step functions": {
                    topic: "Step functions",
                    lessons: [
                        { title: "Lesson 4: Step Functions", objective: "I can write and graph step functions." }
                    ]
                }
            }
        }
    }
};

    