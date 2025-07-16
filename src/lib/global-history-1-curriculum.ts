
type Lesson = {
    title: string;
    objective: string;
    standard: string;
};

type Topic = {
    topic: string;
    lessons: Lesson[];
};

type Unit = {
    unit: string;
    topics: { [key: string]: Topic };
};

export const globalHistory1Curriculum: {
    units: { [key: string]: Unit };
} = {
    units: {
        "9.1 DEVELOPMENT OF CIVILIZATION": {
            unit: "9.1 DEVELOPMENT OF CIVILIZATION",
            topics: {
                "The Paleolithic Era vs. The Neolithic Era": {
                    topic: "The Paleolithic Era vs. The Neolithic Era",
                    lessons: [
                        { title: "Life Before and After the Neolithic Revolution", objective: "Analyze the political, social, and economic differences in human lives before and after the Neolithic Revolution.", standard: "9.1a" }
                    ]
                },
                "Adapting to the Environment": {
                    topic: "Adapting to the Environment",
                    lessons: [
                        { title: "Mesopotamian, Shang, and Indus River Valley Civilizations", objective: "Explore how early river valley civilizations adapted to and modified their environments to meet their need for food, clothing, and shelter.", standard: "9.1b" }
                    ]
                },
                "Characteristics of Civilizations": {
                    topic: "Characteristics of Civilizations",
                    lessons: [
                        { title: "Comparing Early River Valley Civilizations", objective: "Examine archaeological and historical evidence to compare and contrast characteristics and note unique contributions of Mesopotamian, Shang, and Indus River valley civilizations.", standard: "9.1c" }
                    ]
                }
            }
        },
        "9.2 BELIEF SYSTEMS: RISE AND IMPACT": {
            unit: "9.2 BELIEF SYSTEMS: RISE AND IMPACT",
            topics: {
                "Core Beliefs and Practices": {
                    topic: "Core Beliefs and Practices",
                    lessons: [
                        { title: "Comparing World Religions and Philosophies", objective: "Identify the place of origin, compare and contrast the core beliefs and practices, and explore the sacred texts and ethical codes for Hinduism, Buddhism, Judaism, Christianity, Islam, Confucianism, and Daoism.", standard: "9.2a" }
                    ]
                },
                "Social and Gender Roles": {
                    topic: "Social and Gender Roles",
                    lessons: [
                        { title: "Effects of Belief Systems on Social Order", objective: "Examine similarities and differences between Hinduism, Buddhism, Judaism, Christianity, Islam, and Confucianism regarding their effects on social order and gender roles.", standard: "9.2b" }
                    ]
                }
            }
        },
        "9.3 CLASSICAL CIVILIZATIONS: EXPANSION, ACHIEVEMENT, DECLINE": {
            unit: "9.3 CLASSICAL CIVILIZATIONS: EXPANSION, ACHIEVEMENT, DECLINE",
            topics: {
                "Geography and Expansion": {
                    topic: "Geography and Expansion",
                    lessons: [
                        { title: "Geographic Factors in Classical Civilizations", objective: "Investigate how geographic factors encouraged or hindered expansion and interactions within the Greek, Roman, and Mayan civilizations.", standard: "9.3a" }
                    ]
                },
                "Consolidating Power": {
                    topic: "Consolidating Power",
                    lessons: [
                        { title: "Methods of Imperial Control", objective: "Compare and contrast how the Mauryan, Qin, and Roman civilizations consolidated and increased power.", standard: "9.3b" }
                    ]
                },
                "Golden Ages": {
                    topic: "Golden Ages",
                    lessons: [
                        { title: "Achievements of Classical Civilizations", objective: "Examine the achievements of Greece, Gupta, Han Dynasty, Maya, and Rome to determine if the civilizations experienced a Golden Age.", standard: "9.3c" }
                    ]
                },
                "Decline and Fall of Empires": {
                    topic: "Decline and Fall of Empires",
                    lessons: [
                        { title: "Fall of the Han, Mayan, and Roman Empires", objective: "Compare and contrast the forces that led to the fall of the Han Dynasty, the Mayan civilization, and the Roman Empire.", standard: "9.3d" }
                    ]
                }
            }
        },
        "9.4 RISE OF TRANSREGIONAL TRADE NETWORKS": {
            unit: "9.4 RISE OF TRANSREGIONAL TRADE NETWORKS",
            topics: {
                "Afro-Eurasian Trade Networks": {
                    topic: "Afro-Eurasian Trade Networks",
                    lessons: [
                        { title: "Mapping Trade Routes", objective: "Identify the location of the transregional trade networks noting regional connections between the Indian Ocean complex, Mediterranean Sea complex, Silk Roads, and Trans-Saharan routes.", standard: "9.4a" }
                    ]
                },
                "Technology and Travel": {
                    topic: "Technology and Travel",
                    lessons: [
                        { title: "Innovations in Interregional Travel", objective: "Examine the technologies that facilitated and improved interregional travel along the Indian Ocean and Trans-Saharan networks of exchange.", standard: "9.4b" }
                    ]
                },
                "Cultural Diffusion and Exchange": {
                    topic: "Cultural Diffusion and Exchange",
                    lessons: [
                        { title: "Exchange of Products, Resources, and Ideas", objective: "Identify key resources, products, and luxury items vital to exchanges and examine the diffusion of religious ideas along major trade networks.", standard: "9.4c" },
                        { title: "Travels of Zheng He, Ibn Battuta, and Marco Polo", objective: "Examine the travels of significant individuals and the influence of their journeys.", standard: "9.4c" }
                    ]
                },
                "Trade and Political States": {
                    topic: "Trade and Political States",
                    lessons: [
                        { title: "Emergence of States along Trade Routes", objective: "Examine the emergence and expansion of political states along the Mediterranean Sea complex (Byzantine Empire, Ottoman Empire) and Trans-Saharan routes (Ghana, Mali).", standard: "9.4d" }
                    ]
                }
            }
        },
        "9.5 POLITICAL POWERS AND ACHIEVEMENTS": {
            unit: "9.5 POLITICAL POWERS AND ACHIEVEMENTS",
            topics: {
                "Post-Roman Europe": {
                    topic: "Post-Roman Europe",
                    lessons: [
                        { title: "Comparing Feudal Western Europe and the Byzantine Empire", objective: "Compare and contrast the political, economic, and social institutions of feudal Western Europe and the Byzantine Empire, including the role of Justinian and Theodora.", standard: "9.5a" }
                    ]
                },
                "Empire Building": {
                    topic: "Empire Building",
                    lessons: [
                        { title: "Comparing Mongol and Islamic Caliphate Empires", objective: "Compare and contrast the empire-building processes of the Mongols and the Islamic caliphates.", standard: "9.5b" }
                    ]
                },
                "Cultural and Scientific Innovations": {
                    topic: "Cultural and Scientific Innovations",
                    lessons: [
                        { title: "Achievements of Postclassical Empires", objective: "Compare and contrast the achievements and innovations of the Tang and Song dynasties with the Abbasid Caliphate.", standard: "9.5c" },
                        { title: "Diffusion of Technology and Learning", objective: "Explore the spread and evolution of technology and learning from East Asia to Western Europe via the Middle East.", standard: "9.5c" },
                        { title: "Feudal Japan and Chinese Cultural Influence", objective: "Examine feudal Japan and the adoption and adaptation of Chinese culture.", standard: "9.5c" }
                    ]
                }
            }
        },
        "9.6 SOCIAL AND CULTURAL GROWTH AND CONFLICT": {
            unit: "9.6 SOCIAL AND CULTURAL GROWTH AND CONFLICT",
            topics: {
                "Religious and Political Disputes": {
                    topic: "Religious and Political Disputes",
                    lessons: [
                        { title: "Divisions within Islam and Christianity", objective: "Investigate the Sunni-Shia split in Islam and the Great Schism and their impacts.", standard: "9.6a" },
                        { title: "The Crusades and the Delhi Sultanate", objective: "Investigate the Crusades and the Delhi Sultanate from multiple perspectives.", standard: "9.6a" },
                        { title: "Development of Sikhism", objective: "Examine the development of Sikhism in South Asia.", standard: "9.6a" }
                    ]
                },
                "Spread of Disease": {
                    topic: "Spread of Disease",
                    lessons: [
                        { title: "The Black Death (Bubonic Plague)", objective: "Map the spread of the Black Death and evaluate its effects on Asia, Africa, and Europe.", standard: "9.6b" }
                    ]
                }
            }
        },
        "9.7 THE OTTOMAN EMPIRE AND THE MING DYNASTY PRE-1600": {
            unit: "9.7 THE OTTOMAN EMPIRE AND THE MING DYNASTY PRE-1600",
            topics: {
                "Belief Systems and Powerful States": {
                    topic: "Belief Systems and Powerful States",
                    lessons: [
                        { title: "Mapping Muslim, Neo-Confucian, and Christian Realms", objective: "Map the extent of the Muslim, Neo-Confucian, and Christian realms and compare their relative size and power ca. 1400.", standard: "9.7a" }
                    ]
                },
                "Social and Political Structures": {
                    topic: "Social and Political Structures",
                    lessons: [
                        { title: "Comparing Ottoman and Ming Social/Political Organization", objective: "Analyze how ethnic and religious compositions were reflected in the political and societal organizations of the Ottoman Empire and Ming Dynasty.", standard: "9.7b" }
                    ]
                },
                "Worldviews and Interactions": {
                    topic: "Worldviews and Interactions",
                    lessons: [
                        { title: "Ming Interactions with Europeans", objective: "Examine Ming interactions with European traders and Christian missionaries.", standard: "9.7c" },
                        { title: "Ottoman Interactions with Europeans", objective: "Examine how the Ottomans interacted with Europeans, noting the role of Suleiman the Magnificent.", standard: "9.7c" }
                    ]
                }
            }
        },
        "9.8 AFRICA AND THE AMERICAS PRE-1600": {
            unit: "9.8 AFRICA AND THE AMERICAS PRE-1600",
            topics: {
                "Development of Complex Societies": {
                    topic: "Development of Complex Societies",
                    lessons: [
                        { title: "Environment and Trade in Africa and the Americas", objective: "Examine the influence of environment, resources, and trade on the growth of the Aztec, Inca, and Songhai empires and East African city-states.", standard: "9.8a" }
                    ]
                },
                "Religion and Power": {
                    topic: "Religion and Power",
                    lessons: [
                        { title: "Role of Traditional Religions", objective: "Examine the role of animism and the relationship between religious beliefs and political power in the Aztec and Inca empires.", standard: "9.8b" }
                    ]
                },
                "Cultural Achievements": {
                    topic: "Cultural Achievements",
                    lessons: [
                        { title: "Contributions of African and American Empires", objective: "Investigate the achievements and contributions of the Aztec, Inca, and Songhai empires.", standard: "9.8c" }
                    ]
                }
            }
        },
        "9.9 TRANSFORMATION OF WESTERN EUROPE AND RUSSIA": {
            unit: "9.9 TRANSFORMATION OF WESTERN EUROPE AND RUSSIA",
            topics: {
                "The Renaissance": {
                    topic: "The Renaissance",
                    lessons: [
                        { title: "Diffusion of Technology and Ideas to Europe", objective: "Investigate technologies and ideas that diffused to Europe, noting the role of Islamic caliphates.", standard: "9.9a" }
                    ]
                },
                "The Reformation": {
                    topic: "The Reformation",
                    lessons: [
                        { title: "Challenges to Religious Authority", objective: "Explore the roles of key individuals and the impacts of the Reformation and Counter-Reformation.", standard: "9.9b" }
                    ]
                },
                "Absolutism": {
                    topic: "Absolutism",
                    lessons: [
                        { title: "Consolidation of Power", objective: "Investigate autocratic and absolutist rule by comparing the reigns of Louis XIV and Peter the Great.", standard: "9.9c" }
                    ]
                },
                "Scientific Revolution and Enlightenment": {
                    topic: "Scientific Revolution and Enlightenment",
                    lessons: [
                        { title: "Challenging Traditional Authorities", objective: "Examine the Scientific Revolution and the influence of Enlightenment thinkers.", standard: "9.9d, 9.9e" }
                    ]
                }
            }
        },
        "9.10 INTERACTIONS AND DISRUPTIONS": {
            unit: "9.10 INTERACTIONS AND DISRUPTIONS",
            topics: {
                "Age of Exploration": {
                    topic: "Age of Exploration",
                    lessons: [
                        { title: "Motives and Innovations in Transoceanic Travel", objective: "Explore the motivations, knowledge, and technological innovations that influenced European exploration.", standard: "9.10a" }
                    ]
                },
                "The Columbian Exchange": {
                    topic: "The Columbian Exchange",
                    lessons: [
                        { title: "Impacts on Global Populations", objective: "Analyze the exchange of crops, animals, and diseases, and evaluate the devastating impact on indigenous American populations.", standard: "9.10b" }
                    ]
                },
                "The Atlantic Slave Trade": {
                    topic: "The Atlantic Slave Trade",
                    lessons: [
                        { title: "Causes and Consequences", objective: "Examine how the demand for labor influenced the growth of the slave trade and investigate the conditions of the Middle Passage.", standard: "9.10c" }
                    ]
                },
                "Colonization and its Impacts": {
                    topic: "Colonization and its Impacts",
                    lessons: [
                        { title: "Impacts of Colonization in the Americas and Africa", objective: "Examine the political, economic, cultural, and geographic impacts of European colonization.", standard: "9.10d" }
                    ]
                },
                "Shifts in Global Trade": {
                    topic: "Shifts in Global Trade",
                    lessons: [
                        { title: "Disruption of Eastern Hemisphere Trade Networks", objective: "Explore how new transoceanic routes shifted global trade networks and affected empires like the Ottoman.", standard: "9.10e" }
                    ]
                }
            }
        }
    }
};
