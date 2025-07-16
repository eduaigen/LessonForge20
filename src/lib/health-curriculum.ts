
type Translation = {
    en: string;
    es: string;
};

type Lesson = {
    title: Translation;
    objective: Translation;
};

type Topic = {
    translations: Translation;
    lessons: Lesson[];
};

type Unit = {
    translations: Translation;
    topics: { [key: string]: Topic };
};

export const healthCurriculum: {
    units: { [key: string]: Unit };
} = {
    units: {
        "Communication & Healthy Relationships": {
            translations: { en: "Communication & Healthy Relationships", es: "Comunicación y Relaciones Saludables" },
            topics: {
                "Understanding Communication": {
                    translations: { en: "Understanding Communication", es: "Entendiendo la Comunicación" },
                    lessons: [
                        { 
                            title: { en: "Foundations of Effective Communication", es: "Fundamentos de la Comunicación Efectiva" },
                            objective: { en: "To understand the foundational elements of effective listening and appropriate responses in health contexts.", es: "Comprender los elementos fundamentales de la escucha efectiva y las respuestas apropiadas en contextos de salud." }
                        },
                        { 
                            title: { en: "Verbal & Non-Verbal Communication", es: "Comunicación Verbal y No Verbal" },
                            objective: { en: "To master expressing oneself clearly and respectfully, both through words and body language.", es: "Dominar la expresión clara y respetuosa, tanto a través de las palabras como del lenguaje corporal." }
                        },
                    ]
                },
                "Expressing Needs & Feelings": {
                    translations: { en: "Expressing Needs & Feelings", es: "Expresando Necesidades y Sentimientos" },
                    lessons: [
                        { 
                            title: { en: "Constructive Self-Expression", es: "Autoexpresión Constructiva" },
                            objective: { en: "To learn constructive methods for sharing personal emotions and desires without causing harm.", es: "Aprender métodos constructivos para compartir emociones y deseos personales sin causar daño." }
                        }
                    ]
                },
            }
        }
    }
};
