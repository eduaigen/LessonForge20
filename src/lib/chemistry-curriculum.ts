
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

export const chemistryCurriculum: {
    units: { [key: string]: Unit };
} = {
    units: {
        "Oyster Mortality and Ocean Acidification": {
            translations: { en: "Why are oysters dying, and how can we use chemistry to protect them?", es: "¿Por qué se mueren las ostras y cómo podemos usar la química para protegerlas?" },
            topics: {
                "Water Acidity Processes": {
                    translations: { en: "What large and small-scale processes make water more or less acidic?", es: "¿Qué procesos a gran y pequeña escala hacen que el agua sea más o menos ácida?" },
                    lessons: [
                        { title: { en: "Oyster Crisis Introduction", es: "Introducción a la Crisis de las Ostras" }, objective: { en: "What is happening to oysters?", es: "¿Qué les está pasando a las ostras?" } },
                        { title: { en: "Problem Decomposition", es: "Descomposición del Problema" }, objective: { en: "How can we break down the problem so we can solve it?", es: "¿Cómo podemos descomponer el problema para poder resolverlo?" } },
                    ],
                },
                "Mathematical Models for Neutralization": {
                    translations: { en: "What mathematical models can help us determine the scale of the reactions needed to save oysters?", es: "¿Qué modelos matemáticos pueden ayudarnos a determinar la escala de las reacciones necesarias para salvar a las ostras?" },
                    lessons: [
                        { title: { en: "Calculating Neutralization Amounts", es: "Cálculo de Cantidades de Neutralización" }, objective: { en: "How can we figure out how much of a substance we need to neutralize acid?", es: "¿Cómo podemos calcular la cantidad de una sustancia que necesitamos para neutralizar un ácido?" } },
                    ],
                },
            },
        },
        "Slowing Energy Flow to Protect Coasts": {
            translations: { en: "How can we slow the flow of energy on Earth to protect vulnerable coastal communities?", es: "¿Cómo podemos ralentizar el flujo de energía en la Tierra para proteger a las comunidades costeras vulnerables?" },
            topics: {
                "Sea Level Rise Causes": {
                    translations: { en: "Why and how is the sea level rising?", es: "¿Por qué y cómo está subiendo el nivel del mar?" },
                    lessons: [
                        { title: { en: "Forced Migration due to Sea Level Rise", es: "Migración Forzada por el Aumento del Nivel del Mar" }, objective: { en: "How are sea levels rising and forcing people to move?", es: "¿Cómo está subiendo el nivel del mar y obligando a la gente a mudarse?" } },
                    ],
                },
            },
        },
    },
};
