
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
                        { title: "Lesson 1: Getting to Know You", objective: "Introduce statistical questions and data collection." },
                        { title: "Lesson 2: Data Representations", objective: "Represent and interpret data using dot plots, histograms, and box plots." },
                        { title: "Lesson 3: A Gallery of Data", objective: "Compare and contrast different data representations." }
                    ]
                },
                "Section B: Distribution Shapes": {
                    topic: "Section B: Distribution Shapes",
                    lessons: [
                        { title: "Lesson 4: The Shape of Distributions", objective: "Describe the shape of a data distribution (e.g., symmetric, skewed, uniform)." },
                        { title: "Lesson 5: Calculating Measures of Center and Variability", objective: "Calculate and interpret measures of center (mean, median) and variability (IQR, standard deviation)." }
                    ]
                },
                "Section C: How to Use Spreadsheets": {
                    topic: "Section C: How to Use Spreadsheets",
                    lessons: [
                        { title: "Lesson 6: Mystery Computations", objective: "Familiarize students with spreadsheet basics and simple formulas." },
                        { title: "Lesson 7: Spreadsheet Computations", objective: "Use spreadsheets to calculate measures of center and variability." },
                        { title: "Lesson 8: Spreadsheet Shortcuts", objective: "Learn efficient ways to work with data in a spreadsheet." }
                    ]
                },
                "Section D: Manipulating Data": {
                    topic: "Section D: Manipulating Data",
                    lessons: [
                        { title: "Lesson 9: Technological Graphing", objective: "Use technology to create various statistical plots." },
                        { title: "Lesson 10: The Effect of Extremes", objective: "Analyze the effect of outliers on measures of center and spread." },
                        { title: "Lesson 11: Comparing and Contrasting Data Distributions", objective: "Compare two or more data distributions using their shapes, centers, and spreads." },
                        { title: "Lesson 12: Standard Deviation", objective: "Understand standard deviation as a measure of variability." },
                        { title: "Lesson 13: More Standard Deviation", objective: "Calculate and interpret the standard deviation of data sets." },
                        { title: "Lesson 14: Outliers", objective: "Identify outliers and understand their impact on data analysis." },
                        { title: "Lesson 15: Comparing Data Sets", objective: "Use statistical measures to compare and draw conclusions about different data sets." }
                    ]
                },
                "Section E: Let's Put It to Work": {
                    topic: "Section E: Let's Put It to Work",
                    lessons: [
                        { title: "Lesson 16: Analyzing Data", objective: "Pose a statistical question, design an experiment, collect data, and analyze the data to draw conclusions." }
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
                        { title: "Lesson 1: Planning a Party", objective: "Model a real-world situation with a linear equation." },
                        { title: "Lesson 2: Writing Equations to Model Relationships (Part 1)", objective: "Write and interpret linear equations in two variables to model relationships between quantities." },
                        { title: "Lesson 3: Writing Equations to Model Relationships (Part 2)", objective: "Continue practicing writing and interpreting linear equations." },
                        { title: "Lesson 4: Equations and Their Solutions", objective: "Understand what it means for a pair of values to be a solution to a linear equation." },
                        { title: "Lesson 5: Equations and Their Graphs", objective: "Connect the solutions of a linear equation to its graph." }
                    ]
                },
                "Section B: Manipulating Equations and Understanding Their Structure": {
                    topic: "Section B: Manipulating Equations and Understanding Their Structure",
                    lessons: [
                        { title: "Lesson 6: Equivalent Equations", objective: "Understand that equivalent equations have the same solutions." },
                        { title: "Lesson 7: Explaining Steps for Rewriting Equations", objective: "Justify each step in solving a linear equation." },
                        { title: "Lesson 8: Which Variable to Solve for? (Part 1)", objective: "Rearrange linear equations to highlight a quantity of interest (solve for a variable)." },
                        { title: "Lesson 9: Which Variable to Solve for? (Part 2)", objective: "Continue practicing solving for a specified variable." },
                        { title: "Lesson 10: Connecting Equations to Graphs (Part 1)", objective: "Connect the algebraic and graphical representations of linear equations." },
                        { title: "Lesson 11: Connecting Equations to Graphs (Part 2)", objective: "Further explore the connection between equations and their graphs." }
                    ]
                },
                "Section C: Systems of Linear Equations in Two Variables": {
                    topic: "Section C: Systems of Linear Equations in Two Variables",
                    lessons: [
                        { title: "Lesson 12: Writing and Graphing Systems of Linear Equations", objective: "Write and graph systems of linear equations to represent real-world scenarios." },
                        { title: "Lesson 13: Solving Systems by Substitution", objective: "Solve systems of linear equations using the substitution method." },
                        { title: "Lesson 14: Solving Systems by Elimination (Part 1)", objective: "Introduce the elimination method for solving systems of linear equations." },
                        { title: "Lesson 15: Solving Systems by Elimination (Part 2)", objective: "Practice the elimination method with more complex systems." },
                        { title: "Lesson 16: Solving Systems by Elimination (Part 3)", objective: "Apply the elimination method to various problems." },
                        { title: "Lesson 17: Systems of Linear Equations and Their Solutions", objective: "Analyze systems of equations to determine the number of solutions (one, none, or infinitely many)." }
                    ]
                },
                "Section D: Let's Put It to Work": {
                    topic: "Section D: Let's Put It to Work",
                    lessons: [
                        { title: "Lesson 18: Asking about Solving Systems", objective: "Apply systems of equations to solve complex contextual problems." },
                        { title: "Lesson 19: Linear Patterns", objective: "Identify and analyze linear patterns in various contexts." }
                    ]
                }
            }
        },
        "Unit 3: Two-Variable Statistics": {
            unit: "Unit 3: Two-Variable Statistics",
            topics: {
                "Section A: Two-Way Tables": {
                    topic: "Section A: Two-Way Tables",
                    lessons: [
                        { title: "Lesson 1: Two-Way Tables", objective: "Organize and interpret bivariate categorical data in two-way tables." },
                        { title: "Lesson 2: Relative Frequency Tables", objective: "Calculate and interpret joint, marginal, and conditional relative frequencies." },
                        { title: "Lesson 3: Associations in Categorical Data", objective: "Use relative frequencies to determine if there is an association between two categorical variables." }
                    ]
                },
                "Section B: Scatter Plots": {
                    topic: "Section B: Scatter Plots",
                    lessons: [
                        { title: "Lesson 4: Linear Models", objective: "Represent bivariate numerical data on a scatter plot and describe its form, direction, and strength." },
                        { title: "Lesson 5: Fitting Lines", objective: "Informally fit a line to data and use the line to make predictions." },
                        { title: "Lesson 6: Residuals", objective: "Calculate and interpret residuals to assess the fit of a linear model." }
                    ]
                },
                "Section C: Correlation Coefficients": {
                    topic: "Section C: Correlation Coefficients",
                    lessons: [
                        { title: "Lesson 7: The Correlation Coefficient", objective: "Understand the correlation coefficient (r) as a measure of the strength and direction of a linear relationship." },
                        { title: "Lesson 8: Using the Correlation Coefficient", objective: "Interpret the correlation coefficient in the context of the data." },
                        { title: "Lesson 9: Causal Relationships", objective: "Distinguish between correlation and causation." }
                    ]
                },
                "Section D: Let's Put It to Work": {
                    topic: "Section D: Let's Put It to Work",
                    lessons: [
                        { title: "Lesson 10: Fossils and Flags", objective: "Apply concepts of two-variable statistics to real-world data sets." }
                    ]
                }
            }
        },
        "Unit 4: Linear Inequalities and Systems": {
            unit: "Unit 4: Linear Inequalities and Systems",
            topics: {
                "Section A: Linear Inequalities in One Variable": {
                    topic: "Section A: Linear Inequalities in One Variable",
                    lessons: [
                        { title: "Lesson 1: Representing Situations with Inequalities", objective: "Write one-variable inequalities to represent constraints in real-world situations." },
                        { title: "Lesson 2: Solutions to Inequalities in One Variable", objective: "Solve one-variable inequalities and graph the solution set on a number line." },
                        { title: "Lesson 3: Writing and Solving Inequalities in One Variable", objective: "Practice writing and solving multi-step one-variable inequalities." }
                    ]
                },
                "Section B: Linear Inequalities in Two Variables": {
                    topic: "Section B: Linear Inequalities in Two Variables",
                    lessons: [
                        { title: "Lesson 4: Graphing Linear Inequalities in Two Variables (Part 1)", objective: "Graph the solution set to a linear inequality in two variables as a half-plane." },
                        { title: "Lesson 5: Graphing Linear Inequalities in Two Variables (Part 2)", objective: "Continue practicing graphing two-variable linear inequalities." },
                        { title: "Lesson 6: Solving Problems with Inequalities in Two Variables", objective: "Model real-world constraints using two-variable inequalities." }
                    ]
                },
                "Section C: Systems of Linear Inequalities in Two Variables": {
                    topic: "Section C: Systems of Linear Inequalities in Two Variables",
                    lessons: [
                        { title: "Lesson 7: Solutions to Systems of Linear Inequalities in Two Variables", objective: "Graph the solution set to a system of linear inequalities." },
                        { title: "Lesson 8: Solving Problems with Systems of Linear Inequalities in Two Variables", objective: "Use systems of linear inequalities to solve real-world problems." },
                        { title: "Lesson 9: Modeling with Systems of Inequalities in Two Variables", objective: "Model complex situations using systems of linear inequalities." }
                    ]
                }
            }
        },
        "Unit 5: Functions": {
            unit: "Unit 5: Functions",
            topics: {
                "Section A: Functions and Their Representations": {
                    topic: "Section A: Functions and Their Representations",
                    lessons: [
                        { title: "Lesson 1: Describing and Graphing Situations", objective: "Define a function and identify functions from graphs and descriptions." },
                        { title: "Lesson 2: Function Notation", objective: "Understand and use function notation." },
                        { title: "Lesson 3: Interpreting and Using Function Notation", objective: "Interpret function notation in the context of a real-world problem." },
                        { title: "Lesson 4: Using Function Notation to Describe Rules (Part 1)", objective: "Write rules for functions using function notation." },
                        { title: "Lesson 5: Using Function Notation to Describe Rules (Part 2)", objective: "Continue writing function rules from various representations." }
                    ]
                },
                "Section B: Analyzing and Creating Graphs of Functions": {
                    topic: "Section B: Analyzing and Creating Graphs of Functions",
                    lessons: [
                        { title: "Lesson 6: Features of Graphs", objective: "Identify key features of graphs, including intercepts, maximums, and minimums." },
                        { title: "Lesson 7: Using Graphs to Find Average Rate of Change", objective: "Calculate and interpret the average rate of change of a function over a specified interval." },
                        { title: "Lesson 8: Interpreting and Creating Graphs", objective: "Create and interpret graphs of functions that model real-world situations." },
                        { title: "Lesson 9: Comparing Graphs", objective: "Compare key features of two or more functions represented graphically." }
                    ]
                },
                "Section C: A Closer Look at Inputs and Outputs": {
                    topic: "Section C: A Closer Look at Inputs and Outputs",
                    lessons: [
                        { title: "Lesson 10: Domain and Range (Part 1)", objective: "Determine the domain and range of a function from its graph or description." },
                        { title: "Lesson 11: Domain and Range (Part 2)", objective: "Determine the domain and range in more complex situations." },
                        { title: "Lesson 12: Piecewise Functions", objective: "Understand and graph piecewise-defined functions." },
                        { title: "Lesson 13: Absolute Value Functions (Part 1)", objective: "Graph the absolute value function, \\(y = |x|\\), and understand its properties." },
                        { title: "Lesson 14: Absolute Value Functions (Part 2)", objective: "Analyze transformations of the absolute value function." }
                    ]
                },
                "Section D: Inverse Functions": {
                    topic: "Section D: Inverse Functions",
                    lessons: [
                        { title: "Lesson 15: Inverse Functions", objective: "Understand the concept of an inverse function." },
                        { title: "Lesson 16: Finding and Interpreting Inverse Functions", objective: "Find the inverse of a linear function and interpret its meaning." },
                        { title: "Lesson 17: Writing Inverse Functions to Solve Problems", objective: "Use inverse functions to solve problems." }
                    ]
                },
                "Section E: Let's Put It to Work": {
                    topic: "Section E: Let's Put It to Work",
                    lessons: [
                        { title: "Lesson 18: Using Functions to Model Battery Power", objective: "Apply function concepts to model a real-world scenario involving battery life." }
                    ]
                }
            }
        },
        "Unit 6: Introduction to Exponential Functions": {
            unit: "Unit 6: Introduction to Exponential Functions",
            topics: {
                "Section A: Looking at Growth": {
                    topic: "Section A: Looking at Growth",
                    lessons: [
                        { title: "Lesson 1: Growing and Growing", objective: "Observe and describe patterns of exponential growth." },
                        { title: "Lesson 2: Patterns of Growth", objective: "Recognize exponential growth from tables and geometric patterns." }
                    ]
                },
                "Section B: A New Kind of Relationship": {
                    topic: "Section B: A New Kind of Relationship",
                    lessons: [
                        { title: "Lesson 3: Representing Exponential Growth", objective: "Write equations to represent exponential growth." },
                        { title: "Lesson 4: Representing Exponential Decay", objective: "Write equations to represent exponential decay." },
                        { title: "Lesson 5: Understanding Decay", objective: "Interpret the parameters in an exponential decay model." },
                        { title: "Lesson 6: Analyzing Graphs", objective: "Analyze graphs of exponential functions to identify key features." },
                        { title: "Lesson 7: Using Negative Exponents", objective: "Understand and use negative exponents in the context of exponential functions." }
                    ]
                },
                "Section C: Exponential Functions": {
                    topic: "Section C: Exponential Functions",
                    lessons: [
                        { title: "Lesson 8: Exponential Situations as Functions", objective: "Represent exponential relationships using function notation." },
                        { title: "Lesson 9: Interpreting Exponential Functions", objective: "Interpret the parameters of an exponential function in context." },
                        { title: "Lesson 10: Looking at Rates of Change", objective: "Compare the rates of change of linear and exponential functions." },
                        { title: "Lesson 11: Modeling Exponential Behavior", objective: "Use exponential functions to model real-world situations." },
                        { title: "Lesson 12: Reasoning about Exponential Graphs (Part 1)", objective: "Analyze and interpret graphs of exponential functions." },
                        { title: "Lesson 13: Reasoning about Exponential Graphs (Part 2)", objective: "Continue analyzing graphs and making connections to the function's equation." }
                    ]
                },
                "Section D: Percent Growth and Decay": {
                    topic: "Section D: Percent Growth and Decay",
                    lessons: [
                        { title: "Lesson 14: Recalling Percent Change", objective: "Review how to calculate and apply percent change." },
                        { title: "Lesson 15: Functions Involving Percent Change", objective: "Write exponential functions to model situations involving percent growth or decay." },
                        { title: "Lesson 16: Compounding Interest", objective: "Understand and calculate compound interest." },
                        { title: "Lesson 17: Different Compounding Intervals", objective: "Compare the effects of different compounding intervals." },
                        { title: "Lesson 18: Expressed in Different Ways", objective: "Rewrite exponential expressions to reveal different properties of the function." }
                    ]
                },
                "Section E: Comparing Linear and Exponential Functions": {
                    topic: "Section E: Comparing Linear and Exponential Functions",
                    lessons: [
                        { title: "Lesson 19: Which One Changes Faster?", objective: "Compare the growth of linear and exponential functions." },
                        { title: "Lesson 20: Changes over Equal Intervals", objective: "Distinguish between linear and exponential functions by analyzing their change over equal intervals." }
                    ]
                },
                "Section F: Let's Put It to Work": {
                    topic: "Section F: Let's Put It to Work",
                    lessons: [
                        { title: "Lesson 21: Predicting Populations", objective: "Use linear and exponential models to predict population trends." }
                    ]
                }
            }
        },
        "Unit 7: Introduction to Quadratic Functions": {
            unit: "Unit 7: Introduction to Quadratic Functions",
            topics: {
                "Section A: A Different Kind of Change": {
                    topic: "Section A: A Different Kind of Change",
                    lessons: [
                        { title: "Lesson 1: A Different Kind of Change", objective: "Recognize quadratic relationships from patterns in tables and graphs." },
                        { title: "Lesson 2: How Does It Change?", objective: "Analyze how quadratic functions change over equal intervals." }
                    ]
                },
                "Section B: Quadratic Functions": {
                    topic: "Section B: Quadratic Functions",
                    lessons: [
                        { title: "Lesson 3: Building Quadratic Functions from Geometric Patterns", objective: "Write a quadratic function to model a geometric pattern." },
                        { title: "Lesson 4: Comparing Quadratic and Exponential Functions", objective: "Distinguish between quadratic and exponential growth." },
                        { title: "Lesson 5: Building Quadratic Functions to Describe Situations (Part 1)", objective: "Model real-world situations involving area with quadratic functions." },
                        { title: "Lesson 6: Building Quadratic Functions to Describe Situations (Part 2)", objective: "Model projectile motion with quadratic functions." },
                        { title: "Lesson 7: Building Quadratic Functions to Describe Situations (Part 3)", objective: "Model situations involving revenue with quadratic functions." }
                    ]
                },
                "Section C: Working with Quadratic Expressions": {
                    topic: "Section C: Working with Quadratic Expressions",
                    lessons: [
                        { title: "Lesson 8: Equivalent Quadratic Expressions", objective: "Identify and write equivalent quadratic expressions." },
                        { title: "Lesson 9: Standard Form and Factored Form", objective: "Understand the relationship between the standard and factored forms of a quadratic expression." },
                        { title: "Lesson 10: Graphs of Functions in Standard and Factored Forms", objective: "Connect the different forms of a quadratic function to its graph." }
                    ]
                },
                "Section D: Features of Graphs of Quadratic Functions": {
                    topic: "Section D: Features of Graphs of Quadratic Functions",
                    lessons: [
                        { title: "Lesson 11: Graphing from the Factored Form", objective: "Use the factored form of a quadratic function to identify its x-intercepts and vertex." },
                        { title: "Lesson 12: Graphing the Standard Form (Part 1)", objective: "Use the standard form to find the y-intercept and axis of symmetry." },
                        { title: "Lesson 13: Graphing the Standard Form (Part 2)", objective: "Graph quadratic functions given in standard form." },
                        { title: "Lesson 14: Graphs That Represent Situations", objective: "Interpret the key features of a quadratic graph in the context of a real-world situation." },
                        { title: "Lesson 15: Vertex Form", objective: "Understand and use the vertex form of a quadratic function, \\(y = a(x-h)^2 + k\\)." },
                        { title: "Lesson 16: Graphing from the Vertex Form", objective: "Graph quadratic functions given in vertex form." },
                        { title: "Lesson 17: Changing the Vertex", objective: "Analyze how changing the parameters in vertex form affects the graph." }
                    ]
                }
            }
        },
        "Unit 8: Quadratic Equations": {
            unit: "Unit 8: Quadratic Equations",
            topics: {
                "Section A: Finding Unknown Inputs": {
                    topic: "Section A: Finding Unknown Inputs",
                    lessons: [
                        { title: "Lesson 1: Finding Unknown Inputs", objective: "Solve for the input of a quadratic function given an output." },
                        { title: "Lesson 2: When and Why Do We Write Quadratic Equations?", objective: "Write quadratic equations to represent questions about quadratic functions." }
                    ]
                },
                "Section B: Solving Quadratic Equations": {
                    topic: "Section B: Solving Quadratic Equations",
                    lessons: [
                        { title: "Lesson 3: Solving Quadratic Equations by Reasoning", objective: "Solve simple quadratic equations by taking square roots." },
                        { title: "Lesson 4: Solving Quadratic Equations with the Zero Product Property", objective: "Use the zero product property to solve quadratic equations in factored form." },
                        { title: "Lesson 5: How Many Solutions?", objective: "Determine the number of solutions to a quadratic equation." },
                        { title: "Lesson 6: Rewriting Quadratic Expressions in Factored Form (Part 1)", objective: "Factor quadratic expressions of the form \\(x^2 + bx + c\\)." },
                        { title: "Lesson 7: Rewriting Quadratic Expressions in Factored Form (Part 2)", objective: "Factor quadratic expressions where the leading coefficient is not 1." },
                        { title: "Lesson 8: Rewriting Quadratic Expressions in Factored Form (Part 3)", objective: "Factor special products, like difference of squares." },
                        { title: "Lesson 9: Solving Quadratic Equations by Using Factored Form", objective: "Solve quadratic equations by factoring." },
                        { title: "Lesson 10: Rewriting Quadratic Expressions in Factored Form (Part 4)", objective: "Practice factoring various types of quadratic expressions." }
                    ]
                },
                "Section C: Completing the Square": {
                    topic: "Section C: Completing the Square",
                    lessons: [
                        { title: "Lesson 11: What Are Perfect Squares?", objective: "Recognize and create perfect square trinomials." },
                        { title: "Lesson 12: Completing the Square (Part 1)", objective: "Understand the process of completing the square to rewrite a quadratic expression." },
                        { title: "Lesson 13: Completing the Square (Part 2)", objective: "Solve quadratic equations by completing the square." },
                        { title: "Lesson 14: Completing the Square (Part 3)", objective: "Apply completing the square to more complex equations." },
                        { title: "Lesson 15: Quadratic Equations with Irrational Solutions", objective: "Find irrational solutions to quadratic equations." }
                    ]
                },
                "Section D: The Quadratic Formula": {
                    topic: "Section D: The Quadratic Formula",
                    lessons: [
                        { title: "Lesson 16: The Quadratic Formula", objective: "Understand and apply the quadratic formula, \\(x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}\\), to solve quadratic equations." },
                        { title: "Lesson 17: Applying the Quadratic Formula (Part 1)", objective: "Practice using the quadratic formula." },
                        { title: "Lesson 18: Applying the Quadratic Formula (Part 2)", objective: "Use the discriminant, \\(b^2-4ac\\), to determine the number and type of solutions." },
                        { title: "Lesson 19: Deriving the Quadratic Formula", objective: "Derive the quadratic formula by completing the square." },
                        { title: "Lesson 20: Rational and Irrational Solutions", objective: "Distinguish between rational and irrational solutions." },
                        { title: "Lesson 21: Sums and Products of Rational and Irrational Numbers", objective: "Understand properties of sums and products involving rational and irrational numbers." }
                    ]
                },
                "Section E: Vertex Form Revisited": {
                    topic: "Section E: Vertex Form Revisited",
                    lessons: [
                        { title: "Lesson 22: Rewriting Quadratic Expressions in Vertex Form", objective: "Rewrite quadratic functions from standard form to vertex form by completing the square." },
                        { title: "Lesson 23: Using Quadratic Expressions in Vertex Form to Solve Problems", objective: "Find the maximum or minimum value of a quadratic function to solve problems." }
                    ]
                },
                "Section F: Let's Put It to Work": {
                    topic: "Section F: Let's Put It to Work",
                    lessons: [
                        { title: "Lesson 24: Using Quadratic Equations to Model Situations and Solve Problems", objective: "Apply knowledge of quadratic equations to solve complex real-world problems." }
                    ]
                }
            }
        }
    }
};
