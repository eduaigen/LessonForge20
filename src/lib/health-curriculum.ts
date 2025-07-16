
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

export const healthCurriculum: {
    units: { [key: string]: Unit };
} = {
    units: {
        "Communication & Healthy Relationships": {
            unit: "Communication & Healthy Relationships",
            topics: {
                "Understanding Communication": {
                    topic: "Understanding Communication",
                    lessons: [
                        { 
                            title: "Foundations of Effective Communication",
                            objective: "To understand the foundational elements of effective listening and appropriate responses in health contexts."
                        },
                        { 
                            title: "Verbal & Non-Verbal Communication",
                            objective: "To master expressing oneself clearly and respectfully, both through words and body language."
                        },
                    ]
                },
                "Expressing Needs & Feelings": {
                    topic: "Expressing Needs & Feelings",
                    lessons: [
                        { 
                            title: "Constructive Self-Expression",
                            objective: "To learn constructive methods for sharing personal emotions and desires without causing harm."
                        }
                    ]
                },
            }
        }
    }
};
