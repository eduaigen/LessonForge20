
import type { CurriculumContent } from './curriculum-data';

export const globalHistory2Curriculum: CurriculumContent['Global History I & II'] = {
    units: {
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
        "Closing Performance Task": {
            topics: {
                "Global History Regents Review": { "lessons": ["Global History Regents Review"] }
            }
        }
    }
};
