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
        "Congruence": {
            unit: "Congruence",
            topics: {
                "Experiment with transformations in the plane": {
                    topic: "Experiment with transformations in the plane",
                    lessons: [
                        { title: "Precise Definitions", objective: "GEO-G.CO.1: Know precise definitions of angle, circle, perpendicular lines, parallel lines, and line segment." },
                        { title: "Representing Transformations", objective: "GEO-G.CO.2: Represent transformations as geometric functions." },
                        { title: "Symmetry of Polygons", objective: "GEO-G.CO.3: Describe the rotations and reflections that carry a polygon onto itself." },
                        { title: "Defining Transformations", objective: "GEO-G.CO.4: Develop definitions of rotations, reflections, and translations." },
                        { title: "Drawing Transformed Figures", objective: "GEO-G.CO.5: Given a geometric figure and a transformation, draw the transformed figure." }
                    ]
                },
                "Understand congruence in terms of rigid motions": {
                    topic: "Understand congruence in terms of rigid motions",
                    lessons: [
                        { title: "Predicting Rigid Motions", objective: "GEO-G.CO.6: Use geometric descriptions of rigid motions to transform figures and predict their effect." },
                        { title: "Definition of Congruence", objective: "GEO-G.CO.7: Use the definition of congruence in terms of rigid motions to show two triangles are congruent." },
                        { title: "Triangle Congruence Criteria", objective: "GEO-G.CO.8: Explain how ASA, SAS, SSS, AAS, and HL (Hypotenuse Leg) follow from the definition of congruence." }
                    ]
                },
                "Prove geometric theorems": {
                    topic: "Prove geometric theorems",
                    lessons: [
                        { title: "Theorems about Lines and Angles", objective: "GEO-G.CO.9: Prove and apply theorems about lines and angles." },
                        { title: "Theorems about Triangles", objective: "GEO-G.CO.10: Prove and apply theorems about triangles." },
                        { title: "Theorems about Parallelograms", objective: "GEO-G.CO.11: Prove and apply theorems about parallelograms." }
                    ]
                },
                "Make geometric constructions": {
                    topic: "Make geometric constructions",
                    lessons: [
                        { title: "Formal Geometric Constructions", objective: "GEO-G.CO.12: Make, justify, and apply formal geometric constructions." },
                        { title: "Inscribing Regular Polygons", objective: "GEO-G.CO.13: Make and justify the constructions for inscribing an equilateral triangle, a square, and a regular hexagon in a circle." }
                    ]
                }
            }
        },
        "Similarity, Right Triangles, and Trigonometry": {
            unit: "Similarity, Right Triangles, and Trigonometry",
            topics: {
                "Understand similarity in terms of similarity transformations": {
                    topic: "Understand similarity in terms of similarity transformations",
                    lessons: [
                        { title: "Properties of Dilations", objective: "GEO-G.SRT.1: Verify experimentally the properties of dilations." },
                        { title: "Definition of Similarity", objective: "GEO-G.SRT.2: Use the definition of similarity in terms of similarity transformations to decide if figures are similar." },
                        { title: "Triangle Similarity Criteria", objective: "GEO-G.SRT.3: Use the properties of similarity transformations to establish AA~, SSS~, and SAS~ criteria." }
                    ]
                },
                "Prove theorems involving similarity": {
                    topic: "Prove theorems involving similarity",
                    lessons: [
                        { title: "Similarity Theorems about Triangles", objective: "GEO-G.SRT.4: Prove and apply similarity theorems about triangles." },
                        { title: "Using Congruence and Similarity", objective: "GEO-G.SRT.5: Use congruence and similarity criteria for triangles to solve problems and prove relationships." }
                    ]
                },
                "Define trigonometric ratios and solve problems involving right triangles": {
                    topic: "Define trigonometric ratios and solve problems involving right triangles",
                    lessons: [
                        { title: "Defining Trigonometric Ratios", objective: "GEO-G.SRT.6: Understand that side ratios in right triangles lead to definitions of trigonometric ratios." },
                        { title: "Sine and Cosine of Complementary Angles", objective: "GEO-G.SRT.7: Explain and use the relationship between the sine and cosine of complementary angles." },
                        { title: "Solving Right Triangles", objective: "GEO-G.SRT.8: Use sine, cosine, tangent, and the Pythagorean Theorem to solve right triangles." }
                    ]
                },
                "Apply Trigonometry to general triangles": {
                     topic: "Apply Trigonometry to general triangles",
                    lessons: [
                        { title: "Area of a Triangle using Sine", objective: "GEO-G.SRT.9: Justify and apply the formula A = 1/2 ab sin(C) to find the area of any triangle." }
                    ]
                }
            }
        },
        "Circles": {
            unit: "Circles",
            topics: {
                "Understand and apply theorems about circles": {
                    topic: "Understand and apply theorems about circles",
                    lessons: [
                        { title: "Similarity of Circles", objective: "GEO-G.C.1: Prove that all circles are similar." },
                        { title: "Relationships between Angles and Arcs", objective: "GEO-G.C.2a: Identify, describe and apply relationships between the angles and their intercepted arcs of a circle." },
                        { title: "Relationships among Radii, Chords, Tangents, and Secants", objective: "GEO-G.C.2b: Identify, describe and apply relationships among radii, chords, tangents, and secants of a circle." }
                    ]
                },
                "Find arc lengths and area of sectors of circles": {
                     topic: "Find arc lengths and area of sectors of circles",
                    lessons: [
                        { title: "Arc Length and Sector Area", objective: "GEO-G.C.5: Using proportionality, find the central angle, arc length, radius, or area of a sector." }
                    ]
                }
            }
        },
        "Expressing Geometric Properties with Equations": {
            unit: "Expressing Geometric Properties with Equations",
            topics: {
                "Translate between the geometric description and the equation of a conic section": {
                    topic: "Translate between the geometric description and the equation of a conic section",
                    lessons: [
                        { title: "Equation of a Circle", objective: "GEO-G.GPE.1a: Derive the equation of a circle of given center and radius using the Pythagorean Theorem." },
                        { title: "Graphing Circles", objective: "GEO-G.GPE.1b: Graph circles given their equation." }
                    ]
                },
                "Use coordinates to prove simple geometric theorems algebraically": {
                    topic: "Use coordinates to prove simple geometric theorems algebraically",
                    lessons: [
                        { title: "Coordinate Proofs", objective: "GEO-G.GPE.4: On the coordinate plane, algebraically prove geometric theorems and properties." },
                        { title: "Parallel and Perpendicular Lines", objective: "GEO-G.GPE.5: Determine if lines are parallel or perpendicular based on their slopes and apply these properties." },
                        { title: "Partitioning a Line Segment", objective: "GEO-G.GPE.6: Find the point on a directed line segment that partitions the segment in a given ratio." },
                        { title: "Perimeter and Area on the Coordinate Plane", objective: "GEO-G.GPE.7: Use coordinates to compute perimeters of polygons and areas of triangles and rectangles." }
                    ]
                }
            }
        },
        "Geometric Measurement and Dimension": {
            unit: "Geometric Measurement and Dimension",
            topics: {
                "Explain volume formulas and use them to solve problems": {
                    topic: "Explain volume formulas and use them to solve problems",
                    lessons: [
                        { title: "Informal Arguments for Volume Formulas", objective: "GEO-G.GMD.1: Provide informal arguments for the formulas for the circumference, area, and volume of various solids." },
                        { title: "Solving Problems with Volume Formulas", objective: "GEO-G.GMD.3: Use volume formulas for cylinders, pyramids, cones, and spheres to solve problems." }
                    ]
                },
                "Visualize relationships between two-dimensional and three-dimensional objects": {
                    topic: "Visualize relationships between two-dimensional and three-dimensional objects",
                    lessons: [
                        { title: "Cross-Sections and Rotations", objective: "GEO-G.GMD.4: Identify the shapes of plane sections of 3D objects and identify 3D objects generated by rotations of 2D objects." }
                    ]
                }
            }
        },
        "Modeling with Geometry": {
            unit: "Modeling with Geometry",
            topics: {
                "Apply geometric concepts in modeling situations": {
                    topic: "Apply geometric concepts in modeling situations",
                    lessons: [
                        { title: "Describing Objects with Geometry", objective: "GEO-G.MG.1: Use geometric shapes, their measures, and their properties to describe objects." },
                        { title: "Density in Modeling", objective: "GEO-G.MG.2: Apply concepts of density based on area and volume in modeling situations." },
                        { title: "Geometric Design Problems", objective: "GEO-G.MG.3: Apply geometric methods to solve design problems." }
                    ]
                }
            }
        }
    }
};
