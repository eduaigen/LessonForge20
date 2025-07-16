
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

export const physicsCurriculum: {
    units: { [key: string]: Unit };
} = {
    units: {
        "Reliable Energy Systems": {
            unit: "How can we design more reliable systems to meet our communities' energy needs?",
            topics: {
                "Electricity Transfer and Instability": {
                    topic: "How does electricity transfer through systems to power communities, and what causes instability in these systems?",
                    lessons: [
                        { title: "Learning from a Blackout", objective: "What can we learn from a blackout in Texas about producing reliable energy for our communities?" },
                    ],
                },
            },
        },
        "Forces and Earth's Surface": {
            unit: "How do forces in Earth's interior determine what will happen to the surface we see?",
            topics: {
                "Land Deformation": {
                    topic: "How does land stretch and when/why does it break?",
                    lessons: [
                        { title: "The Afar Region Case Study", objective: "What is happening in the Afar region?" },
                    ],
                },
            },
        },
    },
};
