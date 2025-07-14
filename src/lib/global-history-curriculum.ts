import type { CurriculumContent } from './curriculum-data';

export const globalHistoryCurriculum: CurriculumContent['Global History I & II'] = {
    units: {
        "Foundations of Civilization": {
            topics: {
                "Early Humans": { lessons: ["Early Humans"] },
                "Neolithic Revolution": { lessons: ["Neolithic Revolution"] },
                "River Valley Civilizations": { lessons: ["River Valley Civilizations"] }
            }
        },
        "Classical Civilizations": {
            topics: {
                "Greece and Rome": { lessons: ["Greece and Rome"] },
                "India and China": { lessons: ["India and China"] },
                "Belief Systems": { lessons: ["Belief Systems"] }
            }
        },
        "Post-Classical World": {
            topics: {
                "Islamic World": { lessons: ["Islamic World"] },
                "Byzantines": { lessons: ["Byzantines"] },
                "Feudalism": { lessons: ["Feudalism"] }
            }
        },
        "Age of Revolutions": {
            topics: {
                "Enlightenment": { "lessons": ["Enlightenment"] },
                "French Revolution": { "lessons": ["French Revolution"] },
                "Industrial Revolution": { "lessons": ["Industrial Revolution"] }
            }
        },
        "Imperialism and Nationalism": {
            topics: {
                "Africa and Asia": { "lessons": ["Africa and Asia"] },
                "Latin America": { "lessons": ["Latin America"] },
                "Resistance Movements": { "lessons": ["Resistance Movements"] }
            }
        },
        "20th Century Conflicts": {
            topics: {
                "World Wars": { "lessons": ["World Wars"] },
                "Cold War": { "lessons": ["Cold War"] },
                "Genocide": { "lessons": ["Genocide"] }
            }
        },
        "Contemporary Issues": {
            topics: {
                "Globalization": { "lessons": ["Globalization"] },
                "Terrorism": { "lessons": ["Terrorism"] },
                "Environmental Challenges": { "lessons": ["Environmental Challenges"] }
            }
        },
        "Global History Regents Review": {
            topics: {
                "DBQ Practice": { "lessons": ["DBQ Practice"] },
                "Thematic Essay Practice": { "lessons": ["Thematic Essay Practice"] },
                "Enduring Issues Essay Practice": { "lessons": ["Enduring Issues Essay Practice"] }
            }
        }
    }
};
