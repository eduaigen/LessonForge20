
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
        "Unit 1: Sequences and Functions": {
            unit: "Unit 1: Sequences and Functions",
            topics: {
                "Section A: Sequences": {
                    topic: "Section A: Sequences",
                    lessons: [
                        { title: "Lesson 1: A Towering Sequence", objective: "Describe sequences with informal language and identify if they are geometric, arithmetic, or neither." },
                        { title: "Lesson 2: Introducing Geometric Sequences", objective: "Write out terms of sequences from mathematical situations." },
                        { title: "Lesson 3: Different Types of Sequences", objective: "Interpret and create tables and graphs for given relationships." },
                        { title: "Lesson 4: Using Technology to Work with Sequences", objective: "Use technology to analyze and work with sequences." }
                    ]
                },
                "Section B: Representing Sequences": {
                    topic: "Section B: Representing Sequences",
                    lessons: [
                        { title: "Lesson 5: Sequences Are Functions", objective: "Understand that sequences are functions with the input as position and output as the term." },
                        { title: "Lesson 6: Representing Sequences", objective: "Interpret sequences and use function notation to write recursive definitions." },
                        { title: "Lesson 7: Representing More Sequences", objective: "Make connections between sequences and different representations of functions." }
                    ]
                },
                "Section C: What’s the Equation?": {
                    topic: "Section C: What’s the Equation?",
                    lessons: [
                        { title: "Lesson 8: The nth Term", objective: "Develop explicit formulas for arithmetic and geometric sequences." },
                        { title: "Lesson 9: What’s the Equation?", objective: "Model situations represented in different ways using sequence equations." },
                        { title: "Lesson 10: Situations and Sequence Types", objective: "Choose appropriate sequence models and identify appropriate domains for situations." },
                        { title: "Lesson 11: Adding Up", objective: "Compute the sum of a finite sequence." }
                    ]
                }
            }
        },
        "Unit 2: Polynomial Functions": {
            unit: "Unit 2: Polynomial Functions",
            topics: {
                "Section A: What Is a Polynomial?": {
                    topic: "Section A: What Is a Polynomial?",
                    lessons: [
                        { title: "Lesson 1: Let’s Make a Box", objective: "Model a situation with a polynomial function." },
                        { title: "Lesson 2: Funding the Future", objective: "Build understanding of what polynomials are and what their graphs can look like." },
                        { title: "Lesson 3: Introducing Polynomials", objective: "Define polynomials and explore their properties." },
                        { title: "Lesson 4: Combining Polynomials", objective: "Perform arithmetic operations on polynomials." }
                    ]
                },
                "Section B: Working with Polynomials": {
                    topic: "Section B: Working with Polynomials",
                    lessons: [
                        { title: "Lesson 5: Connecting Factors and Zeros", objective: "Connect that a factor of (x-a) means 'a' is a zero of the function." },
                        { title: "Lesson 6: Different Forms", objective: "Recognize the benefits of different polynomial forms." },
                        { title: "Lesson 7: Using Factors and Zeros", objective: "Use factors and zeros to analyze polynomial functions." }
                    ]
                },
                "Section C: Graphs of Polynomials": {
                    topic: "Section C: Graphs of Polynomials",
                    lessons: [
                        { title: "Lesson 8: End Behavior (Part 1)", objective: "Establish the effect of degree and leading coefficient on end behavior." },
                        { title: "Lesson 9: End Behavior (Part 2)", objective: "Continue analyzing the end behavior of polynomial functions." },
                        { title: "Lesson 10: Multiplicity", objective: "Understand the effect of multiplicity on the shape of the graph near zeros." },
                        { title: "Lesson 11: Finding Intersections", objective: "Sketch polynomial functions expressed as a product of linear factors." }
                    ]
                },
                "Section D: Polynomial Division": {
                    topic: "Section D: Polynomial Division",
                    lessons: [
                        { title: "Lesson 12: Polynomial Division (Part 1)", objective: "Divide a polynomial by a suspected factor using long division." },
                        { title: "Lesson 13: Polynomial Division (Part 2)", objective: "Continue practicing polynomial division." },
                        { title: "Lesson 14: What Do You Know about Polynomials?", objective: "Review and apply knowledge of polynomial functions." },
                        { title: "Lesson 15: The Remainder Theorem", objective: "Establish and apply the Remainder Theorem." }
                    ]
                }
            }
        },
        "Unit 3: Rational Functions and Equations": {
            unit: "Unit 3: Rational Functions and Equations",
            topics: {
                "Section A: Rational Functions": {
                    topic: "Section A: Rational Functions",
                    lessons: [
                        { title: "Lesson 1: Minimizing Surface Area", objective: "Model situations with rational functions." },
                        { title: "Lesson 2: Graphs of Rational Functions (Part 1)", objective: "Examine the asymptotic behavior of rational function graphs." },
                        { title: "Lesson 3: Graphs of Rational Functions (Part 2)", objective: "Continue analyzing graphs of rational functions." },
                        { title: "Lesson 4: End Behavior of Rational Functions", objective: "Use polynomial division to identify the end behavior of a rational function." }
                    ]
                },
                "Section B: Rational Equations": {
                    topic: "Section B: Rational Equations",
                    lessons: [
                        { title: "Lesson 5: Rational Equations (Part 1)", objective: "Begin solving rational equations." },
                        { title: "Lesson 6: Rational Equations (Part 2)", objective: "Continue solving rational equations and identify extraneous solutions." },
                        { title: "Lesson 7: Solving Rational Equations", objective: "Master solving rational equations and checking for extraneous solutions." }
                    ]
                },
                "Section C: Polynomial Identities": {
                    topic: "Section C: Polynomial Identities",
                    lessons: [
                        { title: "Lesson 8: Polynomial Identities (Part 1)", objective: "Prove or disprove that two expressions are equivalent." },
                        { title: "Lesson 9: Polynomial Identities (Part 2)", objective: "Continue working with polynomial identities." },
                        { title: "Lesson 10: Summing Up", objective: "Derive the formula for the sum of a finite geometric series." },
                        { title: "Lesson 11: Using the Sum", objective: "Use the formula for the sum of a geometric series to solve problems." }
                    ]
                }
            }
        },
        "Unit 4: Complex Numbers and Rational Exponents": {
            unit: "Unit 4: Complex Numbers and Rational Exponents",
            topics: {
                "Section A: Exponent Properties": {
                    topic: "Section A: Exponent Properties",
                    lessons: [
                        { title: "Lesson 1: Properties of Exponents", objective: "Review and apply exponent rules." },
                        { title: "Lesson 2: Square Roots and Cube Roots", objective: "Explore square and cube roots as solutions to equations." },
                        { title: "Lesson 3: Exponents That Are Unit Fractions", objective: "Extend exponent rules to include unit fraction exponents." },
                        { title: "Lesson 4: Positive Rational Exponents", objective: "Work with positive rational exponents." },
                        { title: "Lesson 5: Negative Rational Exponents", objective: "Work with negative rational exponents." }
                    ]
                },
                "Section B: Solving Equations with Square and Cube Roots": {
                    topic: "Section B: Solving Equations with Square and Cube Roots",
                    lessons: [
                        { title: "Lesson 6: Squares and Square Roots", objective: "Solve equations involving squares and square roots." },
                        { title: "Lesson 7: Inequivalent Equations?", objective: "Recognize that squaring each side of an equation can introduce extraneous solutions." },
                        { title: "Lesson 8: Cubes and Cube Roots", objective: "Solve equations involving cubes and cube roots." },
                        { title: "Lesson 9: Solving Radical Equations", objective: "Practice solving equations with radicals." }
                    ]
                },
                "Section C: A New Kind of Number": {
                    topic: "Section C: A New Kind of Number",
                    lessons: [
                        { title: "Lesson 10: A New Kind of Number", objective: "Introduce the concept of imaginary numbers." },
                        { title: "Lesson 11: Introducing the Number i", objective: "Define i as the solution to x^2 = -1." },
                        { title: "Lesson 12: Arithmetic with Complex Numbers", objective: "Add and subtract complex numbers." },
                        { title: "Lesson 13: Multiplying Complex Numbers", objective: "Multiply complex numbers." },
                        { title: "Lesson 14: More Arithmetic with Complex Numbers", objective: "Continue practicing arithmetic with complex numbers." },
                        { title: "Lesson 15: Working Backward", objective: "Find quadratic equations given complex roots." }
                    ]
                },
                "Section D: Solving Quadratics with Complex Numbers": {
                    topic: "Section D: Solving Quadratics with Complex Numbers",
                    lessons: [
                        { title: "Lesson 16: Solving Quadratics", objective: "Solve quadratic equations with complex solutions." },
                        { title: "Lesson 17: Completing the Square and Complex Solutions", objective: "Use completing the square to find complex solutions." },
                        { title: "Lesson 18: The Quadratic Formula and Complex Solutions", objective: "Use the quadratic formula to find complex solutions." },
                        { title: "Lesson 19: Real and Non-Real Solutions", objective: "Distinguish between real and non-real solutions of quadratic equations." }
                    ]
                },
                "Section E: Let's Put It to Work": {
                    topic: "Section E: Let's Put It to Work",
                    lessons: [
                        { title: "Lesson 20: Drawing Proportional Circles", objective: "Apply understanding of square roots to a data representation problem." }
                    ]
                }
            }
        },
        "Unit 5: Exponential Functions and Equations": {
            unit: "Unit 5: Exponential Functions and Equations",
            topics: {
                "Section A: Growing and Shrinking": {
                    topic: "Section A: Growing and Shrinking",
                    lessons: [
                        { title: "Lesson 1: Growing and Shrinking", objective: "Connect geometric sequences to exponential growth and decay." },
                        { title: "Lesson 2: Representations of Growth and Decay", objective: "Represent exponential relationships using functions of the form f(x) = a * b^x." },
                        { title: "Lesson 3: Understanding Rational Inputs", objective: "Use rational inputs to better understand exponential functions." },
                        { title: "Lesson 4: Representing Functions at Rational Inputs", objective: "Continue exploring exponential functions with rational inputs." },
                        { title: "Lesson 5: Changes Over Rational Intervals", objective: "Explore growth factors over intervals of different lengths." },
                        { title: "Lesson 6: Writing Equations for Exponential Functions", objective: "Practice writing equations for exponential functions." },
                        { title: "Lesson 7: Interpreting and Using Exponential Functions", objective: "Interpret exponential functions in various contexts." }
                    ]
                },
                "Section B: Missing Exponents": {
                    topic: "Section B: Missing Exponents",
                    lessons: [
                        { title: "Lesson 8: Unknown Exponents", objective: "Introduce the need to solve for an exponent in an equation." },
                        { title: "Lesson 9: What Is a Logarithm?", objective: "Introduce logarithms as a way to solve for unknown exponents." },
                        { title: "Lesson 10: Interpreting and Writing Logarithmic Equations", objective: "Rewrite exponential equations in logarithmic form." },
                        { title: "Lesson 11: Evaluating Logarithmic Expressions", objective: "Evaluate simple logarithmic expressions." }
                    ]
                },
                "Section C: The Constant e": {
                    topic: "Section C: The Constant e",
                    lessons: [
                        { title: "Lesson 12: The Number e", objective: "Introduce the constant e." },
                        { title: "Lesson 13: Exponential Functions with Base e", objective: "Compare functions of the form a*b^x with functions of the form a*e^(kx)." },
                        { title: "Lesson 14: Solving Exponential Equations", objective: "Solve exponential equations using various methods." }
                    ]
                },
                "Section D: Logarithmic Functions and Graphs": {
                    topic: "Section D: Logarithmic Functions and Graphs",
                    lessons: [
                        { title: "Lesson 15: Using Graphs and Logarithms to Solve Problems (Part 1)", objective: "Use graphical and algebraic methods to solve exponential and logarithmic equations." },
                        { title: "Lesson 16: Using Graphs and Logarithms to Solve Problems (Part 2)", objective: "Continue solving problems with exponential and logarithmic functions." },
                        { title: "Lesson 17: Logarithmic Functions", objective: "Explore the properties and graphs of logarithmic functions." }
                    ]
                },
                "Section E: Let's Put It to Work": {
                    topic: "Section E: Let's Put It to Work",
                    lessons: [
                        { title: "Lesson 18: Applications of Logarithmic Functions", objective: "Interpret solutions to logarithmic equations in context." }
                    ]
                }
            }
        },
        "Unit 6: Transformations of Functions": {
            unit: "Unit 6: Transformations of Functions",
            topics: {
                "Section A: Translations, Reflections, and Symmetry": {
                    topic: "Section A: Translations, Reflections, and Symmetry",
                    lessons: [
                        { title: "Lesson 1: Matching Up to Data", objective: "Informally describe transformations of graphs." },
                        { title: "Lesson 2: Moving Functions", objective: "Explore vertical and horizontal translations." },
                        { title: "Lesson 3: More Movement", objective: "Continue practicing function translations." },
                        { title: "Lesson 4: Reflecting Functions", objective: "Explore reflections across the x and y axes." },
                        { title: "Lesson 5: Some Functions Have Symmetry", objective: "Identify even and odd functions from their graphs." },
                        { title: "Lesson 6: Symmetry in Equations", objective: "Describe even and odd functions algebraically." },
                        { title: "Lesson 7: Expressing Transformations of Functions Algebraically", objective: "Write algebraic rules for transformations." }
                    ]
                },
                "Section B: Scaling Outputs and Inputs": {
                    topic: "Section B: Scaling Outputs and Inputs",
                    lessons: [
                        { title: "Lesson 8: Scaling the Outputs", objective: "Explore the effect of multiplying the output of a function by a scale factor." },
                        { title: "Lesson 9: Scaling the Inputs", objective: "Explore the effect of multiplying the input of a function by a scale factor." },
                        { title: "Lesson 10: Combining Functions", objective: "Combine multiple transformations on a single function." }
                    ]
                },
                "Section C: Transformations of Functions": {
                    topic: "Section C: Transformations of Functions",
                    lessons: [
                        { title: "Lesson 11: Transforming from an Original Function", objective: "Apply transformations to various function types." },
                        { title: "Lesson 12: Transformation Effects", objective: "Analyze the effects of different transformations." },
                        { title: "Lesson 13: Transforming Parabolas", objective: "Apply transformations specifically to quadratic functions." },
                        { title: "Lesson 14: Transforming Circles", objective: "Apply transformations to equations of circles." }
                    ]
                },
                "Section D: Let’s Put It to Work": {
                    topic: "Section D: Let’s Put It to Work",
                    lessons: [
                        { title: "Lesson 15: Making a Model for Data", objective: "Apply transformations to a function to model a real-world data set." }
                    ]
                }
            }
        },
        "Unit 7: Trigonometric Functions": {
            unit: "Unit 7: Trigonometric Functions",
            topics: {
                "Section A: The Unit Circle": {
                    topic: "Section A: The Unit Circle",
                    lessons: [
                        { title: "Lesson 1: Moving in Circles", objective: "Explore circular motion in familiar contexts." },
                        { title: "Lesson 2: Revisiting Right Triangles", objective: "Use the Pythagorean Theorem and right-triangle trigonometry." },
                        { title: "Lesson 3: The Unit Circle (Part 1)", objective: "Determine coordinates of points on a circle." },
                        { title: "Lesson 4: The Unit Circle (Part 2)", objective: "Generalize to the unit circle and define sine and cosine." },
                        { title: "Lesson 5: The Pythagorean Identity (Part 1)", objective: "Introduce and understand the Pythagorean Identity." },
                        { title: "Lesson 6: The Pythagorean Identity (Part 2)", objective: "Apply the Pythagorean Identity." },
                        { title: "Lesson 7: Finding Unknown Coordinates on a Circle", objective: "Use trigonometry to find coordinates on a circle." }
                    ]
                },
                "Section B: Periodic Functions": {
                    topic: "Section B: Periodic Functions",
                    lessons: [
                        { title: "Lesson 8: Rising and Falling", objective: "Transition to thinking about sine and cosine as functions." },
                        { title: "Lesson 9: Introduction to Trigonometric Functions", objective: "Use the unit circle to graph sine and cosine." },
                        { title: "Lesson 10: Beyond 2pi", objective: "Expand the domain of trigonometric functions to all real numbers." },
                        { title: "Lesson 11: Extending the Domain of Trigonometric Functions", objective: "Understand the meaning of radian angles greater than 2pi and less than 0." },
                        { title: "Lesson 12: Tangent", objective: "Reason about the tangent function and its periodic nature." },
                        { title: "Lesson 13: Some New Ratios", objective: "Introduce reciprocal trigonometric functions." }
                    ]
                },
                "Section C: Trigonometry Transformations": {
                    topic: "Section C: Trigonometry Transformations",
                    lessons: [
                        { title: "Lesson 14: Amplitude and Midline", objective: "Identify amplitude and midline of periodic functions." },
                        { title: "Lesson 15: Transforming Trigonometric Functions", objective: "Apply transformations to trigonometric functions." },
                        { title: "Lesson 16: Features of Trigonometric Graphs (Part 1)", objective: "Identify key features of trigonometric graphs." },
                        { title: "Lesson 17: Features of Trigonometric Graphs (Part 2)", objective: "Continue analyzing trigonometric graphs." },
                        { title: "Lesson 18: Comparing Transformations", objective: "Compare the effects of different transformations on trigonometric functions." },
                        { title: "Lesson 19: Modeling Circular Motion", objective: "Model periodic situations algebraically and graphically." }
                    ]
                },
                "Section D: Let’s Put It to Work": {
                    topic: "Section D: Let’s Put It to Work",
                    lessons: [
                        { title: "Lesson 20: Beyond Circles", objective: "Apply trigonometric functions to model periodic situations." }
                    ]
                }
            }
        },
        "Unit 8: Statistical Inferences": {
            unit: "Unit 8: Statistical Inferences",
            topics: {
                "Section A: Study Types": {
                    topic: "Section A: Study Types",
                    lessons: [
                        { title: "Lesson 1: Being Skeptical", objective: "Critically evaluate statistical claims." },
                        { title: "Lesson 2: Study Types", objective: "Consider experimental, observational, and survey study types." },
                        { title: "Lesson 3: Randomness in Groups", objective: "Understand the importance of random selection and assignment." }
                    ]
                },
                "Section B: Distributions": {
                    topic: "Section B: Distributions",
                    lessons: [
                        { title: "Lesson 4: Describing Distributions", objective: "Describe the shape, center, and spread of distributions." },
                        { title: "Lesson 5: Normal Distributions", objective: "Examine the normal distribution as a common model." },
                        { title: "Lesson 6: Areas in Histograms", objective: "Relate area in a histogram to proportions." },
                        { title: "Lesson 7: Areas under a Normal Curve", objective: "Use a normal distribution model to approximate proportions." }
                    ]
                },
                "Section C: Not All Samples Are the Same": {
                    topic: "Section C: Not All Samples Are the Same",
                    lessons: [
                        { title: "Lesson 8: Not Always Ideal", objective: "Understand sources of bias in sampling." },
                        { title: "Lesson 9: Variability in Samples", objective: "Recognize that different samples yield different estimates." },
                        { title: "Lesson 10: Estimating Proportions from Samples", objective: "Estimate a population proportion from a sample and understand margin of error." },
                        { title: "Lesson 11: Estimating a Population Mean", objective: "Estimate a population mean from a sample and understand margin of error." }
                    ]
                },
                "Section D: Analyzing Experimental Data": {
                    topic: "Section D: Analyzing Experimental Data",
                    lessons: [
                        { title: "Lesson 12: Experimenting", objective: "Design and conduct a simple experiment." },
                        { title: "Lesson 13: Using Normal Distributions for Experiment Analysis", objective: "Check for evidence of a treatment effect." },
                        { title: "Lesson 14: Questioning Experimenting", objective: "Critically evaluate experimental designs." }
                    ]
                },
                "Section E: Let's Put It to Work": {
                    topic: "Section E: Let's Put It to Work",
                    lessons: [
                        { title: "Lesson 15: Heart Rates", objective: "Design, conduct, and analyze an experimental study." }
                    ]
                }
            }
        }
    }
};
