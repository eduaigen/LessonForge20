
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

export const geometryCurriculum: {
    units: { [key: string]: Unit };
} = {
    units: {
        "Unit 1: Constructions and Rigid Transformations": {
            unit: "Unit 1: Constructions and Rigid Transformations",
            topics: {
                "Section A: Constructions": {
                    topic: "Section A: Constructions",
                    lessons: [
                        { title: "Lesson 1: Build It", objective: "Explore properties of shapes using construction tools." },
                        { title: "Lesson 2: Constructing Patterns", objective: "Create complex patterns using basic constructions." },
                        { title: "Lesson 3: Construction Techniques 1: Perpendicular Bisectors", objective: "Construct perpendicular bisectors using a compass and straightedge." },
                        { title: "Lesson 4: Construction Techniques 2: Equilateral Triangles", objective: "Construct equilateral triangles and other regular polygons." },
                        { title: "Lesson 5: Construction Techniques 3: Perpendicular Lines and Angle Bisectors", objective: "Construct perpendicular lines through a point and bisect angles." },
                        { title: "Lesson 6: Construction Techniques 4: Parallel and Perpendicular Lines", objective: "Construct parallel and perpendicular lines using various techniques." },
                        { title: "Lesson 7: Construction Techniques 5: Squares", objective: "Construct squares using a compass and straightedge." },
                        { title: "Lesson 8: Using Technology for Constructions", objective: "Use dynamic geometry software to perform constructions." },
                        { title: "Lesson 9: Speedy Delivery", objective: "Apply construction techniques to solve a practical problem." }
                    ]
                },
                "Section B: Defining Rigid Transformations": {
                    topic: "Section B: Defining Rigid Transformations",
                    lessons: [
                        { title: "Lesson 10: Rigid Transformations", objective: "Introduce the concept of rigid transformations." },
                        { title: "Lesson 11: Defining Reflections", objective: "Define and perform reflections across a line." },
                        { title: "Lesson 12: Defining Translations", objective: "Define and perform translations using vectors." },
                        { title: "Lesson 13: Incorporating Rotations", objective: "Incorporate rotations into sequences of transformations." },
                        { title: "Lesson 14: Defining Rotations", objective: "Define and perform rotations about a point." }
                    ]
                },
                "Section C: Working with Rigid Transformations": {
                    topic: "Section C: Working with Rigid Transformations",
                    lessons: [
                        { title: "Lesson 15: Symmetry", objective: "Identify rotational and reflectional symmetry in figures." },
                        { title: "Lesson 16: More Symmetry", objective: "Continue exploring symmetry in various geometric figures." },
                        { title: "Lesson 17: Working with Rigid Transformations", objective: "Combine multiple rigid transformations." },
                        { title: "Lesson 18: Practicing Point-by-Point Transformations", objective: "Perform point-by-point transformations on figures." }
                    ]
                },
                "Section D: Evidence and Proof": {
                    topic: "Section D: Evidence and Proof",
                    lessons: [
                        { title: "Lesson 19: Evidence, Angles, and Proof", objective: "Begin to use deductive reasoning to prove geometric statements about angles." },
                        { title: "Lesson 20: Transformations, Transversals, and Proof", objective: "Use properties of rigid transformations to prove theorems about parallel lines and transversals." },
                        { title: "Lesson 21: One Hundred Eighty", objective: "Prove that the sum of the angles in a triangle is 180 degrees." }
                    ]
                },
                "Section E: Let's Put It to Work": {
                    topic: "Section E: Let's Put It to Work",
                    lessons: [
                        { title: "Lesson 22: Now What Can You Build?", objective: "Apply construction and proof skills to build and justify complex figures." }
                    ]
                }
            }
        },
        "Unit 2: Congruence": {
            unit: "Unit 2: Congruence",
            topics: {
                "Section A: Congruent Figures": {
                    topic: "Section A: Congruent Figures",
                    lessons: [
                        { title: "Lesson 1: Congruent Parts, Part 1", objective: "Define congruence in terms of rigid motions." },
                        { title: "Lesson 2: Congruent Parts, Part 2", objective: "Identify corresponding parts of congruent figures." },
                        { title: "Lesson 3: Congruent Triangles, Part 1", objective: "Identify corresponding parts of congruent triangles." },
                        { title: "Lesson 4: Congruent Triangles, Part 2", objective: "Use congruence to solve problems with triangles." },
                        { title: "Lesson 5: Points, Segments, and Zigzags", objective: "Explore congruence in segments and simple paths." }
                    ]
                },
                "Section B: Triangle Congruence Theorems": {
                    topic: "Section B: Triangle Congruence Theorems",
                    lessons: [
                        { title: "Lesson 6: Side-Angle-Side Triangle Congruence", objective: "Prove and apply the SAS Congruence Theorem." },
                        { title: "Lesson 7: Angle-Side-Angle Triangle Congruence", objective: "Prove and apply the ASA Congruence Theorem." },
                        { title: "Lesson 8: The Perpendicular Bisector Theorem", objective: "Prove and apply the Perpendicular Bisector Theorem." },
                        { title: "Lesson 9: Side-Side-Side Triangle Congruence", objective: "Prove and apply the SSS Congruence Theorem." },
                        { title: "Lesson 10: Practicing Proofs", objective: "Practice writing proofs using triangle congruence theorems." },
                        { title: "Lesson 11: Side-Side-Angle (Sometimes) Congruence", objective: "Investigate why SSA is not a valid congruence theorem." }
                    ]
                },
                "Section C: Proofs about Quadrilaterals": {
                    topic: "Section C: Proofs about Quadrilaterals",
                    lessons: [
                        { title: "Lesson 12: Proofs about Quadrilaterals", objective: "Begin proving theorems about quadrilaterals." },
                        { title: "Lesson 13: Proofs about Parallelograms", objective: "Prove theorems about the properties of parallelograms." },
                        { title: "Lesson 14: Bisect It", objective: "Use congruence and properties of quadrilaterals to prove relationships." }
                    ]
                },
                "Section D: Let’s Put It to Work": {
                    topic: "Section D: Let’s Put It to Work",
                    lessons: [
                        { title: "Lesson 15: Congruence for Quadrilaterals", objective: "Apply congruence theorems to solve problems involving quadrilaterals." }
                    ]
                }
            }
        },
        "Unit 3: Similarity": {
            unit: "Unit 3: Similarity",
            topics: {
                "Section A: Properties of Dilations": {
                    topic: "Section A: Properties of Dilations",
                    lessons: [
                        { title: "Lesson 1: Scale Drawings", objective: "Connect dilations to scale drawings." },
                        { title: "Lesson 2: Scale of the Solar System", objective: "Apply scale factors to a real-world context." },
                        { title: "Lesson 3: Measuring Dilations", objective: "Perform dilations and identify the center and scale factor." },
                        { title: "Lesson 4: Dilating Lines and Angles", objective: "Understand the effect of dilations on lines and angles." },
                        { title: "Lesson 5: Splitting Triangle Sides with Dilation (Part 1)", objective: "Explore how dilations affect triangle sides proportionally." }
                    ]
                },
                "Section B: Similarity Transformations and Proportional Reasoning": {
                    topic: "Section B: Similarity Transformations and Proportional Reasoning",
                    lessons: [
                        { title: "Lesson 6: Connecting Similarity and Transformations", objective: "Define similarity in terms of rigid motions and dilations." },
                        { title: "Lesson 7: Reasoning about Similarity with Transformations", objective: "Use transformations to justify if two figures are similar." },
                        { title: "Lesson 8: Are They All Similar?", objective: "Determine if all figures of a certain type (e.g., all rectangles) are similar." },
                        { title: "Lesson 9: Conditions for Triangle Similarity", objective: "Introduce the AA similarity criterion for triangles." },
                        { title: "Lesson 10: Other Conditions for Triangle Similarity", objective: "Prove and apply the SSS and SAS similarity theorems for triangles." },
                        { title: "Lesson 11: Splitting Triangle Sides with Dilation (Part 2)", objective: "Prove the Triangle Proportionality Theorem." },
                        { title: "Lesson 12: Practice with Proportional Relationships", objective: "Solve problems using proportional reasoning and similar triangles." }
                    ]
                },
                "Section C: Similarity in Right Triangles": {
                    topic: "Section C: Similarity in Right Triangles",
                    lessons: [
                        { title: "Lesson 13: Using the Pythagorean Theorem and Similarity", objective: "Use similarity in right triangles to solve problems." },
                        { title: "Lesson 14: Proving the Pythagorean Theorem", objective: "Prove the Pythagorean Theorem using triangle similarity." },
                        { title: "Lesson 15: Converse of the Pythagorean Theorem", objective: "Understand and apply the converse of the Pythagorean Theorem." },
                        { title: "Lesson 16: Finding All the Unknown Values in Triangles", objective: "Solve for all unknown sides and angles in right triangles." }
                    ]
                },
                "Section D: Let’s Put It to Work": {
                    topic: "Section D: Let’s Put It to Work",
                    lessons: [
                        { title: "Lesson 17: Reflection Similarity", objective: "Apply similarity concepts to real-world problems involving reflections." }
                    ]
                }
            }
        },
        "Unit 4: Right Triangle Trigonometry": {
            unit: "Unit 4: Right Triangle Trigonometry",
            topics: {
                "Section A: Angles and Steepness": {
                    topic: "Section A: Angles and Steepness",
                    lessons: [
                        { title: "Lesson 1: Angles and Steepness", objective: "Relate the steepness of a line to the angle it makes with the horizontal." },
                        { title: "Lesson 2: Half a Square", objective: "Explore the properties of 45-45-90 triangles." },
                        { title: "Lesson 3: Half an Equilateral Triangle", objective: "Explore the properties of 30-60-90 triangles." },
                        { title: "Lesson 4: Ratios in Right Triangles", objective: "Define the sine, cosine, and tangent ratios for an acute angle in a right triangle." },
                        { title: "Lesson 5: Working with Ratios in Right Triangles", objective: "Use a table of trigonometric ratios to find side lengths." }
                    ]
                },
                "Section B: Defining Trigonometric Ratios": {
                    topic: "Section B: Defining Trigonometric Ratios",
                    lessons: [
                        { title: "Lesson 6: Working with Trigonometric Ratios", objective: "Solidify understanding of sine, cosine, and tangent." },
                        { title: "Lesson 7: Applying Ratios in Right Triangles", objective: "Use trigonometric ratios to find unknown side lengths in right triangles." },
                        { title: "Lesson 8: Sine and Cosine in the Same Right Triangle", objective: "Understand the relationship between the sine and cosine of complementary angles." },
                        { title: "Lesson 9: Trigonometry Squared", objective: "Explore the Pythagorean Identity sin^2(x) + cos^2(x) = 1." },
                        { title: "Lesson 10: Using Trigonometric Ratios to Find Angles", objective: "Use inverse trigonometric functions to find unknown angle measures in right triangles." }
                    ]
                },
                "Section C: Let’s Put It to Work": {
                    topic: "Section C: Let’s Put It to Work",
                    lessons: [
                        { title: "Lesson 11: Solving Problems with Trigonometry", objective: "Apply trigonometry to solve real-world problems." },
                        { title: "Lesson 12: Approximating Pi", objective: "Use trigonometry and polygons to approximate the value of Pi." }
                    ]
                }
            }
        },
        "Unit 5: Solid Geometry": {
            unit: "Unit 5: Solid Geometry",
            topics: {
                "Section A: Cross-Sections, Scaling, and Area": {
                    topic: "Section A: Cross-Sections, Scaling, and Area",
                    lessons: [
                        { title: "Lesson 1: Solids of Rotation", objective: "Visualize and create three-dimensional solids by rotating two-dimensional shapes." },
                        { title: "Lesson 2: Slicing Solids", objective: "Describe the two-dimensional figures that result from slicing three-dimensional figures." },
                        { title: "Lesson 3: Creating Cross-Sections by Dilating", objective: "Relate cross-sections to dilations of a base." },
                        { title: "Lesson 4: Scaling and Area", objective: "Understand how the area of a figure changes when it is scaled by a factor." },
                        { title: "Lesson 5: Scaling and Unscaling", objective: "Work backwards from a scaled area to find original dimensions." }
                    ]
                },
                "Section B: Scaling Solids": {
                    topic: "Section B: Scaling Solids",
                    lessons: [
                        { title: "Lesson 6: Scaling Solids", objective: "Understand how the volume of a solid changes when it is scaled by a factor." },
                        { title: "Lesson 7: The Root of the Problem", objective: "Use square and cube roots to understand scaling relationships." },
                        { title: "Lesson 8: Speaking of Scaling", objective: "Apply scaling principles to solve problems." }
                    ]
                },
                "Section C: Prism and Cylinder Volumes": {
                    topic: "Section C: Prism and Cylinder Volumes",
                    lessons: [
                        { title: "Lesson 9: Cylinder Volumes", objective: "Develop and apply the formula for the volume of a cylinder." },
                        { title: "Lesson 10: Cross-Sections and Volume", objective: "Introduce Cavalieri's Principle to understand volume." },
                        { title: "Lesson 11: Prisms Practice", objective: "Practice calculating volumes of various prisms." }
                    ]
                },
                "Section D: Understanding Pyramid Volumes": {
                    topic: "Section D: Understanding Pyramid Volumes",
                    lessons: [
                        { title: "Lesson 12: Prisms and Pyramids", objective: "Compare the volumes of prisms and pyramids with the same base and height." },
                        { title: "Lesson 13: Building a Volume Formula for a Pyramid", objective: "Derive the formula for the volume of a pyramid." },
                        { title: "Lesson 14: Working with Pyramids", objective: "Apply the volume formula for pyramids to solve problems." },
                        { title: "Lesson 15: Putting All the Solids Together", objective: "Calculate volumes of composite solids." }
                    ]
                },
                "Section E: Let’s Put It to Work": {
                    topic: "Section E: Let’s Put It to Work",
                    lessons: [
                        { title: "Lesson 16: Surface Area and Volume", objective: "Analyze the relationship between surface area and volume in solids." },
                        { title: "Lesson 17: Volume and Density", objective: "Use volume and density to solve real-world problems." },
                        { title: "Lesson 18: Volume and Graphing", objective: "Connect solid geometry concepts to graphical representations." }
                    ]
                }
            }
        },
        "Unit 6: Coordinate Geometry": {
            unit: "Unit 6: Coordinate Geometry",
            topics: {
                "Section A: Transformations in the Plane": {
                    topic: "Section A: Transformations in the Plane",
                    lessons: [
                        { title: "Lesson 1: Rigid Transformations in a Plane", objective: "Review rigid transformations on the coordinate plane." },
                        { title: "Lesson 2: Transformations as Functions", objective: "Describe transformations using function notation." },
                        { title: "Lesson 3: Types of Transformations", objective: "Connect geometric transformations to coordinate rules." }
                    ]
                },
                "Section B: Distances, Circles, and Parabolas": {
                    topic: "Section B: Distances, Circles, and Parabolas",
                    lessons: [
                        { title: "Lesson 4: Distances and Circles", objective: "Derive the equation of a circle using the distance formula." },
                        { title: "Lesson 5: Squares and Circles", objective: "Solve problems involving squares and circles on the coordinate plane." },
                        { title: "Lesson 6: Completing the Square", objective: "Use completing the square to find the center and radius of a circle." },
                        { title: "Lesson 7: Distances and Parabolas", objective: "Define a parabola as the set of points equidistant from a focus and directrix." },
                        { title: "Lesson 8: Equations and Graphs", objective: "Write equations for parabolas given a focus and directrix." }
                    ]
                },
                "Section C: Proving Geometric Theorems Algebraically": {
                    topic: "Section C: Proving Geometric Theorems Algebraically",
                    lessons: [
                        { title: "Lesson 9: Equations of Lines", objective: "Review and apply different forms of linear equations." },
                        { title: "Lesson 10: Parallel Lines in the Plane", objective: "Prove that parallel lines have equal slopes." },
                        { title: "Lesson 11: Perpendicular Lines in the Plane", objective: "Prove that the slopes of perpendicular lines are opposite reciprocals." },
                        { title: "Lesson 12: It’s All on the Line", objective: "Use slope criteria to solve problems involving parallel and perpendicular lines." },
                        { title: "Lesson 13: Intersection Points", objective: "Solve systems of linear and quadratic equations." },
                        { title: "Lesson 14: Coordinate Proof", objective: "Use coordinate geometry to prove geometric theorems." },
                        { title: "Lesson 15: Weighted Averages", objective: "Partition a line segment in a given ratio." },
                        { title: "Lesson 16: Weighted Averages in a Triangle", objective: "Find the centroid of a triangle." },
                        { title: "Lesson 17: Lines in Triangles", objective: "Explore properties of medians, altitudes, and perpendicular bisectors in triangles." }
                    ]
                },
                "Section D: Let’s Put It to Work": {
                    topic: "Section D: Let’s Put It to Work",
                    lessons: [
                        { title: "Lesson 18: Applying Area and Perimeter on the Plane", objective: "Calculate areas and perimeters of polygons on the coordinate plane." }
                    ]
                }
            }
        },
        "Unit 7: Circles": {
            unit: "Unit 7: Circles",
            topics: {
                "Section A: Lines, Angles, and Circles": {
                    topic: "Section A: Lines, Angles, and Circles",
                    lessons: [
                        { title: "Lesson 1: Lines, Angles, and Curves", objective: "Define chords, arcs, and central angles." },
                        { title: "Lesson 2: Inscribed Angles", objective: "Understand the relationship between inscribed angles and their intercepted arcs." },
                        { title: "Lesson 3: Tangent Lines", objective: "Prove and apply theorems about tangent lines to a circle." }
                    ]
                },
                "Section B: Polygons and Circles": {
                    topic: "Section B: Polygons and Circles",
                    lessons: [
                        { title: "Lesson 4: Quadrilaterals in Circles", objective: "Prove properties of cyclic quadrilaterals." },
                        { title: "Lesson 5: Triangles in Circles", objective: "Construct the circumscribed circle of a triangle." },
                        { title: "Lesson 6: A Special Point", objective: "Define and find the circumcenter of a triangle." },
                        { title: "Lesson 7: Circles in Triangles", objective: "Construct the inscribed circle of a triangle and define the incenter." }
                    ]
                },
                "Section C: Measuring Circles": {
                    topic: "Section C: Measuring Circles",
                    lessons: [
                        { title: "Lesson 8: Arcs and Sectors", objective: "Calculate arc lengths and areas of sectors of circles." },
                        { title: "Lesson 9: Part to Whole", objective: "Solve problems involving parts of circles." },
                        { title: "Lesson 10: Angles, Arcs, and Radii", objective: "Relate angle measure, arc length, and radius." },
                        { title: "Lesson 11: A New Way to Measure Angles", objective: "Understand and use radian measure for angles." },
                        { title: "Lesson 12: Radian Sense", objective: "Develop fluency with converting between degrees and radians." },
                        { title: "Lesson 13: Using Radians", objective: "Solve problems using radian measure." }
                    ]
                },
                "Section D: Let’s Put It to Work": {
                    topic: "Section D: Let’s Put It to Work",
                    lessons: [
                        { title: "Lesson 14: Putting It All Together", objective: "Apply various circle theorems and formulas to solve complex problems." }
                    ]
                }
            }
        },
        "Unit 8: Conditional Probability": {
            unit: "Unit 8: Conditional Probability",
            topics: {
                "Section A: Up to Chance": {
                    topic: "Section A: Up to Chance",
                    lessons: [
                        { title: "Lesson 1: Up to Chance", objective: "Review basic probability concepts." },
                        { title: "Lesson 2: Playing with Probability", objective: "Explore probability through games and experiments." },
                        { title: "Lesson 3: Sample Spaces", objective: "Represent sample spaces for compound events using lists, tables, and tree diagrams." },
                        { title: "Lesson 4: Tables of Relative Frequencies", objective: "Use two-way tables to calculate probabilities." },
                        { title: "Lesson 5: Combining Events", objective: "Find probabilities of compound events (A or B, A and B)." },
                        { title: "Lesson 6: The Addition Rule", objective: "Understand and apply the General Addition Rule for probability." }
                    ]
                },
                "Section B: Related Events": {
                    topic: "Section B: Related Events",
                    lessons: [
                        { title: "Lesson 7: Related Events", objective: "Introduce the concept of conditional probability." },
                        { title: "Lesson 8: Conditional Probability", objective: "Calculate and interpret conditional probabilities." },
                        { title: "Lesson 9: Using Tables for Conditional Probability", objective: "Use two-way tables to find conditional probabilities." },
                        { title: "Lesson 10: Using Probability to Determine Whether Events Are Independent", objective: "Define and test for independence of events." }
                    ]
                },
                "Section C: Let's Put It to Work": {
                    topic: "Section C: Let's Put It to Work",
                    lessons: [
                        { title: "Lesson 11: Probabilities in Games", objective: "Apply concepts of conditional probability and independence to analyze games." }
                    ]
                }
            }
        }
    }
};
