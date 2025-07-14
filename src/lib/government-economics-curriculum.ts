import type { CurriculumContent } from './curriculum-data';

export const governmentEconomicsCurriculum: CurriculumContent['Government & Economics'] = {
    units: {
        "Foundations of Government": {
            topics: {
                "Types of Government": { "lessons": ["Types of Government"] },
                "Voting Rights": { "lessons": ["Voting Rights"] },
                "Political Ideologies": { "lessons": ["Political Ideologies"] }
            }
        },
        "Public Policy & Citizenship": {
            topics: {
                "Policy Making": { "lessons": ["Policy Making"] },
                "Civic Engagement": { "lessons": ["Civic Engagement"] },
                "Role of Media": { "lessons": ["Role of Media"] }
            }
        },
        "Economic Systems": {
            topics: {
                "Supply and Demand": { "lessons": ["Supply and Demand"] },
                "Market Structures": { "lessons": ["Market Structures"] },
                "Government Regulation": { "lessons": ["Government Regulation"] }
            }
        },
        "Global Interdependence": {
            topics: {
                "Trade": { "lessons": ["Trade"] },
                "Sustainability": { "lessons": ["Sustainability"] },
                "International Economics": { "lessons": ["International Economics"] }
            }
        },
        "Senior Exit Project": {
            topics: {
                "Capstone Policy Presentation": { "lessons": ["Capstone Policy Presentation"] }
            }
        }
    }
};
