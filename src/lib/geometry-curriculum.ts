
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
                        { title: "Construction Techniques 1: Perpendicular Bisectors", objective: "Construct perpendicular bisectors using a compass and straightedge." },
                        { title: "Construction Techniques 2: Equilateral Triangles", objective: "Construct equilateral triangles and other regular polygons." },
                        { title: "Construction Techniques 3: Perpendicular Lines and Angle Bisectors", objective: "Construct perpendicular lines through a point and bisect angles." }
                    ]
                },
                "Section B: Defining Rigid Transformations": {
                    topic: "Section B: Defining Rigid Transformations",
                    lessons: [
                        { title: "Defining Reflections", objective: "Define and perform reflections across a line." },
                        { title: "Defining Translations", objective: "Define and perform translations using vectors." },
                        { title: "Defining Rotations", objective: "Define and perform rotations about a point." }
                    ]
                },
                "Section C: Evidence and Proof": {
                    topic: "Section C: Evidence and Proof",
                    lessons: [
                        { title: "Evidence, Angles, and Proof", objective: "Begin to use deductive reasoning to prove geometric statements about angles." },
                        { title: "Transformations, Transversals, and Proof", objective: "Use properties of rigid transformations to prove theorems about parallel lines and transversals." },
                        { title: "One Hundred Eighty", objective: "Prove that the sum of the angles in a triangle is 180 degrees." }
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
                        { title: "Congruent Parts, Part 1", objective: "Define congruence in terms of rigid motions." },
                        { title: "Congruent Triangles, Part 1", objective: "Identify corresponding parts of congruent triangles." }
                    ]
                },
                "Section B: Triangle Congruence Theorems": {
                    topic: "Section B: Triangle Congruence Theorems",
                    lessons: [
                        { title: "Side-Angle-Side Triangle Congruence", objective: "Prove and apply the SAS Congruence Theorem." },
                        { title: "Angle-Side-Angle Triangle Congruence", objective: "Prove and apply the ASA Congruence Theorem." },
                        { title: "Side-Side-Side Triangle Congruence", objective: "Prove and apply the SSS Congruence Theorem." }
                    ]
                },
                "Section C: Proofs about Quadrilaterals": {
                    topic: "Section C: Proofs about Quadrilaterals",
                    lessons: [
                        { title: "Proofs about Parallelograms", objective: "Prove theorems about the properties of parallelograms." },
                        { title: "Bisect It", objective: "Use congruence and properties of quadrilaterals to prove relationships." }
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
                        { title: "Measuring Dilations", objective: "Perform dilations and identify the center and scale factor." },
                        { title: "Dilating Lines and Angles", objective: "Understand the effect of dilations on lines and angles." }
                    ]
                },
                "Section B: Similarity Transformations": {
                    topic: "Section B: Similarity Transformations",
                    lessons: [
                        { title: "Connecting Similarity and Transformations", objective: "Define similarity in terms of rigid motions and dilations." },
                        { title: "Conditions for Triangle Similarity", objective: "Prove and apply the AA, SSS, and SAS similarity theorems for triangles." }
                    ]
                },
                "Section C: Similarity in Right Triangles": {
                    topic: "Section C: Similarity in Right Triangles",
                    lessons: [
                        { title: "Using the Pythagorean Theorem and Similarity", objective: "Use similarity in right triangles to solve problems." },
                        { title: "Proving the Pythagorean Theorem", objective: "Prove the Pythagorean Theorem using triangle similarity." }
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
                        { title: "Angles and Steepness", objective: "Relate the steepness of a line to the angle it makes with the horizontal." },
                        { title: "Ratios in Right Triangles", objective: "Define the sine, cosine, and tangent ratios for an acute angle in a right triangle." }
                    ]
                },
                "Section B: Defining Trigonometric Ratios": {
                    topic: "Section B: Defining Trigonometric Ratios",
                    lessons: [
                        { title: "Applying Ratios in Right Triangles", objective: "Use trigonometric ratios to find unknown side lengths in right triangles." },
                        { title: "Sine and Cosine in the Same Right Triangle", objective: "Understand the relationship between the sine and cosine of complementary angles." },
                        { title: "Using Trigonometric Ratios to Find Angles", objective: "Use inverse trigonometric functions to find unknown angle measures in right triangles." }
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
                        { title: "Slicing Solids", objective: "Describe the two-dimensional figures that result from slicing three-dimensional figures." },
                        { title: "Scaling and Area", objective: "Understand how the area of a figure changes when it is scaled by a factor." }
                    ]
                },
                "Section B: Scaling Solids and Volume": {
                    topic: "Section B: Scaling Solids and Volume",
                    lessons: [
                        { title: "Scaling Solids", objective: "Understand how the volume of a solid changes when it is scaled by a factor." },
                        { title: "Cylinder Volumes", objective: "Develop and apply the formula for the volume of a cylinder." },
                        { title: "Working with Pyramids", objective: "Develop and apply the formula for the volume of a pyramid." }
                    ]
                }
            }
        },
        "Unit 6: Circles": {
            unit: "Unit 6: Circles",
            topics: {
                "Section A: Lines, Angles, and Circles": {
                    topic: "Section A: Lines, Angles, and Circles",
                    lessons: [
                        { title: "Inscribed Angles", objective: "Understand the relationship between inscribed angles and their intercepted arcs." },
                        { title: "Tangent Lines", objective: "Prove and apply theorems about tangent lines to a circle." }
                    ]
                },
                "Section B: Measuring Circles": {
                    topic: "Section B: Measuring Circles",
                    lessons: [
                        { title: "Arcs and Sectors", objective: "Calculate arc lengths and areas of sectors of circles." },
                        { title: "A New Way to Measure Angles", objective: "Understand and use radian measure for angles." }
                    ]
                }
            }
        }
    }
};
