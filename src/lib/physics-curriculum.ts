
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

export const physicsCurriculum: {
    units: { [key: string]: Unit };
} = {
    units: {
        "Reliable Energy Systems": {
            translations: { en: "How can we design more reliable systems to meet our communities' energy needs?", es: "¿Cómo podemos diseñar sistemas más confiables para satisfacer las necesidades energéticas de nuestras comunidades?" },
            topics: {
                "Electricity Transfer and Instability": {
                    translations: { en: "How does electricity transfer through systems to power communities, and what causes instability in these systems?", es: "¿Cómo se transfiere la electricidad a través de los sistemas para alimentar a las comunidades y qué causa la inestabilidad en estos sistemas?" },
                    lessons: [
                        { title: { en: "Learning from a Blackout", es: "Aprendiendo de un Apagón" }, objective: { en: "What can we learn from a blackout in Texas about producing reliable energy for our communities?", es: "¿Qué podemos aprender de un apagón en Texas sobre la producción de energía confiable para nuestras comunidades?" } },
                    ],
                },
            },
        },
        "Forces and Earth's Surface": {
            translations: { en: "How do forces in Earth's interior determine what will happen to the surface we see?", es: "¿Cómo determinan las fuerzas en el interior de la Tierra lo que sucederá en la superficie que vemos?" },
            topics: {
                "Land Deformation": {
                    translations: { en: "How does land stretch and when/why does it break?", es: "¿Cómo se estira la tierra y cuándo/por qué se rompe?" },
                    lessons: [
                        { title: { en: "The Afar Region Case Study", es: "Estudio de Caso de la Región de Afar" }, objective: { en: "What is happening in the Afar region?", es: "¿Qué está pasando en la región de Afar?" } },
                    ],
                },
            },
        },
    },
};
