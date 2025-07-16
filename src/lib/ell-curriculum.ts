
type Lesson = {
    title: string;
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

export const ellCurriculum: {
    units: { [key: string]: Unit };
} = {
    units: {
        "Unit 1: Foundational Literacy and Language": {
            unit: "Unit 1: Foundational Literacy and Language",
            topics: {
                "Topic 1.1: Building Blocks of Reading": {
                    topic: "Topic 1.1: Building Blocks of Reading",
                    lessons: [
                        { title: "Decoding Complex Words", standard: "9-10R4: Determine the meaning of words and phrases as they are used in a text." },
                        { title: "Developing Reading Fluency", standard: "11-12R1: Read and comprehend complex literary and informational texts." },
                        { title: "Identifying Main Idea vs. Details", standard: "9-10R2: Determine one or more themes or central ideas in a text and analyze its development." },
                    ]
                },
                "Topic 1.2: Vocabulary Development": {
                    topic: "Topic 1.2: Vocabulary Development",
                    lessons: [
                        { title: "Using Context Clues", standard: "9-10L4a: Use context as a clue to the meaning of a word or phrase." },
                        { title: "Understanding Figurative Language", standard: "11-12L5a: Interpret figures of speech, including hyperbole and paradox, in context." },
                        { title: "Academic and Content-Specific Vocabulary", standard: "9-10L6: Acquire and accurately use general academic and content-specific words and phrases." },
                    ]
                }
            }
        },
        "Unit 2: Language and Expression": {
            unit: "Unit 2: Language and Expression",
            topics: {
                "Topic 2.1: Grammar and Syntax": {
                    topic: "Topic 2.1: Grammar and Syntax",
                    lessons: [
                        { title: "Sentence Structure and Variety", standard: "11-12L3a: Vary syntax for effect." },
                        { title: "Using Phrases and Clauses", standard: "9-12L1: Use various types of phrases and clauses to add variety and interest to writing or presentations." },
                        { title: "Conventions of Academic English", standard: "9-12L1: Demonstrate command of the conventions of academic English grammar and usage." },
                    ]
                },
                "Topic 2.2: Oral Communication": {
                    topic: "Topic 2.2: Oral Communication",
                    lessons: [
                        { title: "Participating in Collaborative Discussions", standard: "9-10SL1: Initiate and participate effectively in a range of collaborative discussions." },
                        { title: "Presenting Information Clearly", standard: "11-12SL4: Present claims, findings, and supporting evidence, conveying a clear and distinct perspective." },
                        { title: "Adapting Speech for Different Contexts", standard: "9-10SL6: Adapt speech to a variety of contexts and tasks." },
                    ]
                }
            }
        },
        "Unit 3: Argumentative Writing and Research": {
            unit: "Unit 3: Argumentative Writing and Research",
            topics: {
                "Topic 3.1: Building an Argument": {
                    topic: "Topic 3.1: Building an Argument",
                    lessons: [
                        { title: "Developing a Claim and Counterclaim", standard: "9-10W1a: Introduce precise claim(s), distinguish the claim(s) from counterclaims." },
                        { title: "Supporting Claims with Evidence", standard: "11-12W1b: Develop claim(s) and counterclaim(s) thoroughly and in a balanced manner." },
                        { title: "Logical Reasoning and Fallacies", standard: "9-10R8: Delineate and evaluate an argument and specific claims in a text." },
                    ]
                },
                "Topic 3.2: Research Skills": {
                    topic: "Topic 3.2: Research Skills",
                    lessons: [
                        { title: "Conducting Research and Synthesizing Sources", standard: "9-10W6: Conduct research to answer questions... Synthesize multiple sources." },
                        { title: "Evaluating Source Credibility", standard: "11-12W7: Gather relevant information... assess the strengths and limitations of each source." },
                        { title: "Citing Sources and Avoiding Plagiarism", standard: "9-10W7: ...avoid plagiarism and follow a standard format for citation." },
                    ]
                }
            }
        },
        "Unit 4: Textual Analysis Across Genres": {
            unit: "Unit 4: Textual Analysis Across Genres",
            topics: {
                "Topic 4.1: Literary Analysis": {
                    topic: "Topic 4.1: Literary Analysis",
                    lessons: [
                        { title: "Analyzing Character Development", standard: "9-10R3: In literary texts, analyze how complex and/or dynamic characters develop." },
                        { title: "Analyzing Theme Development", standard: "11-12R2: Determine two or more themes or central ideas in a text and analyze their development." },
                        { title: "Analyzing Author's Choices in Structure", standard: "11-12R5: In literary texts, analyze how varied aspects of structure create meaning." },
                    ]
                },
                "Topic 4.2: Informational Text Analysis": {
                    topic: "Topic 4.2: Informational Text Analysis",
                    lessons: [
                        { title: "Analyzing Author's Purpose and Point of View", standard: "9-10R6: Analyze how authors employ point of view, perspective, and purpose." },
                        { title: "Comparing and Contrasting Texts", standard: "9-10R9: Choose and develop criteria in order to evaluate the quality of texts. Make connections to other texts." },
                        { title: "Analyzing Texts in Different Media", standard: "11-12R7: In informational texts, integrate and evaluate sources on the same topic or argument." },
                    ]
                }
            }
        }
    }
};
