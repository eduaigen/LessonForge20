import type { CurriculumContent } from './curriculum-data';

export const globalHistory1Curriculum: CurriculumContent['Global History I & II'] = {
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
        "Closing Project": {
            topics: {
                "Performance-Based Global Synthesis": { lessons: ["Performance-Based Global Synthesis"] }
            }
        }
    }
};
