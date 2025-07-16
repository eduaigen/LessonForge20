
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
                "Constructions": {
                    topic: "Constructions",
                    lessons: [
                        { title: "Lesson 1: Build a Mathematician's Toolbox", objective: "I can describe the moves that are possible with the tools in my geometry construction toolbox." },
                        { title: "Lesson 2: Constructing Patterns", objective: "I can use a compass and straightedge to construct a line segment and an equilateral triangle." },
                        { title: "Lesson 3: Constructing Perpendicular Bisectors", objective: "I can use a compass and straightedge to construct the perpendicular bisector of a line segment." },
                        { title: "Lesson 4: Constructing Angle Bisectors", objective: "I can use a compass and straightedge to construct the bisector of an angle." },
                        { title: "Lesson 5: Constructing Parallel and Perpendicular Lines", objective: "I can use a compass and straightedge to construct a line that is parallel or perpendicular to a given line." }
                    ]
                },
                "Rigid Transformations": {
                    topic: "Rigid Transformations",
                    lessons: [
                        { title: "Lesson 6: Transformations", objective: "I can describe a transformation and its image." },
                        { title: "Lesson 7: Rigid Transformations", objective: "I can describe the properties of a rigid transformation." },
                        { title: "Lesson 8: Rotations", objective: "I can describe a rotation and its properties." },
                        { title: "Lesson 9: Reflections", objective: "I can describe a reflection and its properties." },
                        { title: "Lesson 10: Translations", objective: "I can describe a translation and its properties." }
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
                        { title: "Lesson 1: Congruence", objective: "I can describe a sequence of rigid transformations that takes one figure to another." },
                        { title: "Lesson 2: Congruent Triangles", objective: "I can use the definition of congruent to prove that two triangles are congruent." },
                        { title: "Lesson 3: Side-Angle-Side Triangle Congruence", objective: "I can use the Side-Angle-Side Triangle Congruence Theorem to prove that two triangles are congruent." },
                        { title: "Lesson 4: Angle-Side-Angle and Angle-Angle-Side Triangle Congruence", objective: "I can use the Angle-Side-Angle and Angle-Angle-Side Triangle Congruence Theorems to prove that two triangles are congruent." },
                        { title: "Lesson 5: Side-Side-Side Triangle Congruence", objective: "I can use the Side-Side-Side Triangle Congruence Theorem to prove that two triangles are congruent." }
                    ]
                },
                "Proofs about Triangles": {
                    topic: "Proofs about Triangles",
                    lessons: [
                        { title: "Lesson 6: Isosceles Triangles", objective: "I can prove theorems about isosceles triangles." },
                        { title: "Lesson 7: Medians and Angle Bisectors", objective: "I can prove theorems about medians and angle bisectors of triangles." },
                        { title: "Lesson 8: Perpendicular Bisectors", objective: "I can prove theorems about perpendicular bisectors of triangles." }
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
                        { title: "Lesson 1: Similarity", objective: "I can describe a sequence of rigid transformations and dilations that takes one figure to another." },
                        { title: "Lesson 2: Similar Triangles", objective: "I can use the definition of similar to prove that two triangles are similar." },
                        { title: "Lesson 3: Angle-Angle Triangle Similarity", objective: "I can use the Angle-Angle Triangle Similarity Theorem to prove that two triangles are similar." },
                        { title: "Lesson 4: Side-Side-Side and Side-Angle-Side Triangle Similarity", objective: "I can use the Side-Side-Side and Side-Angle-Side Triangle Similarity Theorems to prove that two triangles are similar." }
                    ]
                },
                "Proofs about Similar Triangles": {
                    topic: "Proofs about Similar Triangles",
                    lessons: [
                        { title: "Lesson 5: Proportions in Triangles", objective: "I can prove theorems about proportions in triangles." },
                        { title: "Lesson 6: The Pythagorean Theorem", objective: "I can prove the Pythagorean Theorem and its converse." }
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
                        { title: "Lesson 1: The Tangent Ratio", objective: "I can use the tangent ratio to find side lengths in right triangles." },
                        { title: "Lesson 2: The Sine and Cosine Ratios", objective: "I can use the sine and cosine ratios to find side lengths in right triangles." },
                        { title: "Lesson 3: Solving Right Triangles", objective: "I can use trigonometric ratios to find all the side lengths and angle measures in a right triangle." }
                    ]
                },
                "Applications of Trigonometry": {
                    topic: "Applications of Trigonometry",
                    lessons: [
                        { title: "Lesson 4: Angles of Elevation and Depression", objective: "I can use angles of elevation and depression to solve problems." },
                        { title: "Lesson 5: The Law of Sines", objective: "I can use the Law of Sines to solve problems." },
                        { title: "Lesson 6: The Law of Cosines", objective: "I can use the Law of Cosines to solve problems." }
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
                        { title: "Lesson 1: Circles and Their Parts", objective: "I can identify and describe parts of a circle." },
                        { title: "Lesson 2: Chords and Arcs", objective: "I can prove theorems about chords and arcs in circles." },
                        { title: "Lesson 3: Tangents", objective: "I can prove theorems about tangents to circles." }
                    ]
                },
                "Angles and Segments in Circles": {
                    topic: "Angles and Segments in Circles",
                    lessons: [
                        { title: "Lesson 4: Inscribed Angles", objective: "I can prove theorems about inscribed angles in circles." },
                        { title: "Lesson 5: Angles Formed by Chords, Secants, and Tangents", objective: "I can prove theorems about angles formed by chords, secants, and tangents." },
                        { title: "Lesson 6: Segments Formed by Chords, Secants, and Tangents", objective: "I can prove theorems about segments formed by chords, secants, and tangents." }
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
                        { title: "Lesson 1: The Distance Formula", objective: "I can use the Distance Formula to find the distance between two points." },
                        { title: "Lesson 2: The Midpoint Formula", objective: "I can use the Midpoint Formula to find the midpoint of a line segment." },
                        { title: "Lesson 3: Slopes of Parallel and Perpendicular Lines", objective: "I can use the slopes of lines to determine whether they are parallel or perpendicular." }
                    ]
                },
                "Quadrilaterals in the Coordinate Plane": {
                    topic: "Quadrilaterals in the Coordinate Plane",
                    lessons: [
                        { title: "Lesson 4: Proving Properties of Quadrilaterals", objective: "I can use coordinate geometry to prove properties of quadrilaterals." }
                    ]
                },
                "Circles in the Coordinate Plane": {
                    topic: "Circles in the Coordinate Plane",
                    lessons: [
                        { title: "Lesson 5: Equations of Circles", objective: "I can write the equation of a circle and graph a circle given its equation." }
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
                        { title: "Lesson 1: Polyhedra", objective: "I can identify and describe polyhedra." },
                        { title: "Lesson 2: Prisms and Cylinders", objective: "I can find the surface area and volume of prisms and cylinders." },
                        { title: "Lesson 3: Pyramids and Cones", objective: "I can find the surface area and volume of pyramids and cones." },
                        { title: "Lesson 4: Spheres", objective: "I can find the surface area and volume of spheres." }
                    ]
                },
                "Similarity of Solids": {
                    topic: "Similarity of Solids",
                    lessons: [
                        { title: "Lesson 5: Similar Solids", objective: "I can use the properties of similar solids to solve problems." }
                    ]
                }
            }
        }
    }
};

    