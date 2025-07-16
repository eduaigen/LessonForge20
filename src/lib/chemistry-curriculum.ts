
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

export const chemistryCurriculum: {
    units: { [key: string]: Unit };
} = {
    units: {
        "Oyster Mortality and Ocean Acidification": {
            unit: "Why are oysters dying, and how can we use chemistry to protect them?",
            topics: {
                "Water Acidity Processes": {
                    topic: "What large and small-scale processes make water more or less acidic?",
                    lessons: [
                        { title: "Oyster Crisis Introduction", objective: "What is happening to oysters?" },
                        { title: "Problem Decomposition", objective: "How can we break down the problem so we can solve it?" },
                    ],
                },
                "Mathematical Models for Neutralization": {
                    topic: "What mathematical models can help us determine the scale of the reactions needed to save oysters?",
                    lessons: [
                        { title: "Calculating Neutralization Amounts", objective: "How can we figure out how much of a substance we need to neutralize acid?" },
                    ],
                },
            },
        },
        "Slowing Energy Flow to Protect Coasts": {
            unit: "How can we slow the flow of energy on Earth to protect vulnerable coastal communities?",
            topics: {
                "Sea Level Rise Causes": {
                    topic: "Why and how is the sea level rising?",
                    lessons: [
                        { title: "Forced Migration due to Sea Level Rise", objective: "How are sea levels rising and forcing people to move?" },
                    ],
                },
            },
        },
    },
};
