
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

export const geometryCurriculum: {
    units: { [key: string]: Unit };
} = {
    units: {
        "Unit 1: Constructions and Rigid Transformations": {
            unit: "Unit 1: Constructions and Rigid Transformations",
            topics: {
                "Constructions": {
                    topic: "Constructions",
                    lessons: [
                        { title: "Lesson 1: Build a Mathematician's Toolbox", objective: "I can describe the moves that are possible with the tools in my geometry construction toolbox.", standard: "GEO-G.CO.1" },
                        { title: "Lesson 2: Constructing Patterns", objective: "I can use a compass and straightedge to construct a line segment, $AB$, and an equilateral triangle, $\\triangle ABC$.", standard: "GEO-G.CO.12" },
                        { title: "Lesson 3: Constructing Perpendicular Bisectors", objective: "I can use a compass and straightedge to construct the perpendicular bisector of a line segment.", standard: "GEO-G.CO.12" },
                        { title: "Lesson 4: Constructing Angle Bisectors", objective: "I can use a compass and straightedge to construct the bisector of an angle, $\\angle ABC$.", standard: "GEO-G.CO.12" },
                        { title: "Lesson 5: Constructing Parallel and Perpendicular Lines", objective: "I can use a compass and straightedge to construct a line that is parallel ($\\parallel$) or perpendicular ($\\perp$) to a given line.", standard: "GEO-G.CO.12" }
                    ]
                },
                "Rigid Transformations": {
                    topic: "Rigid Transformations",
                    lessons: [
                        { title: "Lesson 6: Transformations", objective: "I can describe a transformation and its image.", standard: "GEO-G.CO.2" },
                        { title: "Lesson 7: Rigid Transformations", objective: "I can describe the properties of a rigid transformation.", standard: "GEO-G.CO.2" },
                        { title: "Lesson 8: Rotations", objective: "I can describe a rotation and its properties, including the center of rotation and angle in degrees ($90^\\circ, 180^\\circ$).", standard: "GEO-G.CO.4" },
                        { title: "Lesson 9: Reflections", objective: "I can describe a reflection and its properties across a line of reflection.", standard: "GEO-G.CO.4" },
                        { title: "Lesson 10: Translations", objective: "I can describe a translation and its properties using a vector.", standard: "GEO-G.CO.4" }
                    ]
                }
            }
        },
        "Unit 2: Congruence": {
            unit: "Unit 2: Congruence",
            topics: {
                "Congruent Triangles": {
                    topic: "Congruent Triangles",
                    lessons: [
                        { title: "Lesson 1: Congruence", objective: "I can describe a sequence of rigid transformations that takes one figure onto another, showing congruence ($\\cong$).", standard: "GEO-G.CO.6" },
                        { title: "Lesson 2: Congruent Triangles", objective: "I can use the definition of congruent ($\\cong$) to prove that two triangles are congruent.", standard: "GEO-G.CO.7" },
                        { title: "Lesson 3: Side-Angle-Side Triangle Congruence", objective: "I can use the Side-Angle-Side (SAS) Triangle Congruence Theorem to prove that two triangles are congruent.", standard: "GEO-G.CO.8" },
                        { title: "Lesson 4: Angle-Side-Angle and Angle-Angle-Side Triangle Congruence", objective: "I can use the Angle-Side-Angle (ASA) and Angle-Angle-Side (AAS) Triangle Congruence Theorems to prove that two triangles are congruent.", standard: "GEO-G.CO.8" },
                        { title: "Lesson 5: Side-Side-Side Triangle Congruence", objective: "I can use the Side-Side-Side (SSS) Triangle Congruence Theorem to prove that two triangles are congruent.", standard: "GEO-G.CO.8" }
                    ]
                },
                "Proofs about Triangles": {
                    topic: "Proofs about Triangles",
                    lessons: [
                        { title: "Lesson 6: Isosceles Triangles", objective: "I can prove theorems about isosceles triangles, including the property that base angles (e.g., $\\angle B \\cong \\angle C$) are congruent.", standard: "GEO-G.CO.10" },
                        { title: "Lesson 7: Medians and Angle Bisectors", objective: "I can prove theorems about medians and angle bisectors of triangles.", standard: "GEO-G.CO.10" },
                        { title: "Lesson 8: Perpendicular Bisectors", objective: "I can prove theorems about perpendicular bisectors of triangles.", standard: "GEO-G.CO.9" }
                    ]
                }
            }
        },
        "Unit 3: Similarity": {
            unit: "Unit 3: Similarity",
            topics: {
                "Similar Triangles": {
                    topic: "Similar Triangles",
                    lessons: [
                        { title: "Lesson 1: Similarity", objective: "I can describe a sequence of rigid transformations and dilations that takes one figure to another, showing similarity ($\\sim$).", standard: "GEO-G.SRT.2" },
                        { title: "Lesson 2: Similar Triangles", objective: "I can use the definition of similar ($\\sim$) to prove that two triangles are similar.", standard: "GEO-G.SRT.2" },
                        { title: "Lesson 3: Angle-Angle Triangle Similarity", objective: "I can use the Angle-Angle (AA) Triangle Similarity Theorem to prove that two triangles are similar.", standard: "GEO-G.SRT.3" },
                        { title: "Lesson 4: Side-Side-Side and Side-Angle-Side Triangle Similarity", objective: "I can use the Side-Side-Side (SSS) and Side-Angle-Side (SAS) Triangle Similarity Theorems to prove that two triangles are similar.", standard: "GEO-G.SRT.3" }
                    ]
                },
                "Proofs about Similar Triangles": {
                    topic: "Proofs about Similar Triangles",
                    lessons: [
                        { title: "Lesson 5: Proportions in Triangles", objective: "I can prove theorems about proportions in triangles, such as the Triangle Proportionality Theorem.", standard: "GEO-G.SRT.4" },
                        { title: "Lesson 6: The Pythagorean Theorem", objective: "I can prove the Pythagorean Theorem ($a^2 + b^2 = c^2$) and its converse.", standard: "NY-8.G.6" }
                    ]
                }
            }
        },
        "Unit 4: Right Triangle Trigonometry": {
            unit: "Unit 4: Right Triangle Trigonometry",
            topics: {
                "Trigonometric Ratios": {
                    topic: "Trigonometric Ratios",
                    lessons: [
                        { title: "Lesson 1: The Tangent Ratio", objective: "I can use the tangent ratio ($\\tan(\\theta) = \\frac{\\text{opposite}}{\\text{adjacent}}$) to find side lengths in right triangles.", standard: "GEO-G.SRT.6" },
                        { title: "Lesson 2: The Sine and Cosine Ratios", objective: "I can use the sine ($\\sin(\\theta) = \\frac{\\text{opposite}}{\\text{hypotenuse}}$) and cosine ($\\cos(\\theta) = \\frac{\\text{adjacent}}{\\text{hypotenuse}}$) ratios to find side lengths in right triangles.", standard: "GEO-G.SRT.6" },
                        { title: "Lesson 3: Solving Right Triangles", objective: "I can use trigonometric ratios to find all the side lengths and angle measures in a right triangle.", standard: "GEO-G.SRT.8" }
                    ]
                },
                "Applications of Trigonometry": {
                    topic: "Applications of Trigonometry",
                    lessons: [
                        { title: "Lesson 4: Angles of Elevation and Depression", objective: "I can use angles of elevation and depression to solve problems.", standard: "GEO-G.SRT.8" },
                        { title: "Lesson 5: The Law of Sines", objective: "I can use the Law of Sines ($\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C}$) to solve problems.", standard: "(+)-G.SRT.10" },
                        { title: "Lesson 6: The Law of Cosines", objective: "I can use the Law of Cosines ($c^2 = a^2 + b^2 - 2ab\\cos(C)$) to solve problems.", standard: "(+)-G.SRT.10" }
                    ]
                }
            }
        },
        "Unit 5: Circles": {
            unit: "Unit 5: Circles",
            topics: {
                "Properties of Circles": {
                    topic: "Properties of Circles",
                    lessons: [
                        { title: "Lesson 1: Circles and Their Parts", objective: "I can identify and describe parts of a circle, including radius ($r$), diameter ($d$), chord, tangent, and secant.", standard: "GEO-G.C.2b" },
                        { title: "Lesson 2: Chords and Arcs", objective: "I can prove theorems about chords and arcs in circles.", standard: "GEO-G.C.2b" },
                        { title: "Lesson 3: Tangents", objective: "I can prove theorems about tangents to circles.", standard: "GEO-G.C.2b" }
                    ]
                },
                "Angles and Segments in Circles": {
                    topic: "Angles and Segments in Circles",
                    lessons: [
                        { title: "Lesson 4: Inscribed Angles", objective: "I can prove theorems about inscribed angles in circles.", standard: "GEO-G.C.2a" },
                        { title: "Lesson 5: Angles Formed by Chords, Secants, and Tangents", objective: "I can prove theorems about angles formed by chords, secants, and tangents.", standard: "GEO-G.C.2a" },
                        { title: "Lesson 6: Segments Formed by Chords, Secants, and Tangents", objective: "I can prove theorems about segments formed by chords, secants, and tangents.", standard: "GEO-G.C.2b" }
                    ]
                }
            }
        },
        "Unit 6: Coordinate Geometry": {
            unit: "Unit 6: Coordinate Geometry",
            topics: {
                "Lines in the Coordinate Plane": {
                    topic: "Lines in the Coordinate Plane",
                    lessons: [
                        { title: "Lesson 1: The Distance Formula", objective: "I can use the Distance Formula ($d = \\sqrt{(x_2 - x_1)^2 + (y_2 - y_1)^2}$) to find the distance between two points.", standard: "NY-8.G.8" },
                        { title: "Lesson 2: The Midpoint Formula", objective: "I can use the Midpoint Formula ($M = (\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2})$) to find the midpoint of a line segment.", standard: "GEO-G.GPE.6" },
                        { title: "Lesson 3: Slopes of Parallel and Perpendicular Lines", objective: "I can use the slopes of lines to determine whether they are parallel ($\\parallel$) or perpendicular ($\\perp$).", standard: "GEO-G.GPE.5" }
                    ]
                },
                "Quadrilaterals in the Coordinate Plane": {
                    topic: "Quadrilaterals in the Coordinate Plane",
                    lessons: [
                        { title: "Lesson 4: Proving Properties of Quadrilaterals", objective: "I can use coordinate geometry to prove properties of quadrilaterals (e.g., parallelogram, rectangle, rhombus).", standard: "GEO-G.GPE.4" }
                    ]
                },
                "Circles in the Coordinate Plane": {
                    topic: "Circles in the Coordinate Plane",
                    lessons: [
                        { title: "Lesson 5: Equations of Circles", objective: "I can write the equation of a circle ($(x-h)^2 + (y-k)^2 = r^2$) and graph a circle given its equation.", standard: "GEO-G.GPE.1a" }
                    ]
                }
            }
        },
        "Unit 7: Solid Geometry": {
            unit: "Unit 7: Solid Geometry",
            topics: {
                "Three-Dimensional Figures": {
                    topic: "Three-Dimensional Figures",
                    lessons: [
                        { title: "Lesson 1: Polyhedra", objective: "I can identify and describe polyhedra.", standard: "GEO-G.GMD.4" },
                        { title: "Lesson 2: Prisms and Cylinders", objective: "I can find the surface area and volume of prisms and cylinders.", standard: "GEO-G.GMD.3" },
                        { title: "Lesson 3: Pyramids and Cones", objective: "I can find the surface area and volume of pyramids and cones.", standard: "GEO-G.GMD.3" },
                        { title: "Lesson 4: Spheres", objective: "I can find the surface area ($A=4\\pi r^2$) and volume ($V=\\frac{4}{3}\\pi r^3$) of spheres.", standard: "GEO-G.GMD.3" }
                    ]
                },
                "Similarity of Solids": {
                    topic: "Similarity of Solids",
                    lessons: [
                        { title: "Lesson 5: Similar Solids", objective: "I can use the properties of similar solids to solve problems.", standard: "GEO-G.MG.1" }
                    ]
                }
            }
        }
    }
};

    

