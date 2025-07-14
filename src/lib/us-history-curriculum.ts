import type { CurriculumContent } from './curriculum-data';

export const usHistoryCurriculum: CurriculumContent['US History & Government'] = {
    units: {
        "Constitutional Foundations": {
            topics: {
                "Colonial America": { lessons: ["Colonial America"] },
                "Constitutional Convention": { lessons: ["Constitutional Convention"] },
                "Bill of Rights": { lessons: ["Bill of Rights"] }
            }
        },
        "Expansion & Reform": {
            topics: {
                "Civil War": { lessons: ["Civil War"] },
                "Reconstruction": { lessons: ["Reconstruction"] },
                "Progressive Era": { lessons: ["Progressive Era"] }
            }
        },
        "20th Century US": {
            topics: {
                "Great Depression": { lessons: ["Great Depression"] },
                "World Wars": { lessons: ["World Wars"] },
                "Civil Rights Movement": { lessons: ["Civil Rights Movement"] }
            }
        },
        "Modern America": {
            topics: {
                "Reagan Era": { lessons: ["Reagan Era"] },
                "War on Terror": { lessons: ["War on Terror"] },
                "Contemporary Policies": { lessons: ["Contemporary Policies"] }
            }
        },
        "Regents Review": {
            topics: {
                "DBQ Practice": { lessons: ["DBQ Practice"] },
                "Thematic Essay Practice": { lessons: ["Thematic Essay Practice"] },
                "Civic Literacy Tasks": { lessons: ["Civic Literacy Tasks"] }
            }
        }
    }
};
