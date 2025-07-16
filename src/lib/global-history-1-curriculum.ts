
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
                "Complex Societies and River Valleys": {
                    topic: "Complex Societies and River Valleys",
                    lessons: [
                        { title: "Adapting to the Environment: Mesopotamian, Shang, and Indus River Valleys", objective: "Explore how early river valley civilizations adapted to and modified their environments.", standard: "9.1b" }
                    ]
                },
                "Characteristics of Civilizations": {
                    topic: "Characteristics of Civilizations",
                    lessons: [
                        { title: "Comparing Mesopotamian, Shang, and Indus Valley Civilizations", objective: "Examine archaeological and historical evidence to compare and contrast characteristics and note unique contributions of early civilizations.", standard: "9.1c" }
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
                        { title: "Comparing World Religions and Philosophies", objective: "Identify origins, compare core beliefs, and explore sacred texts for Hinduism, Buddhism, Judaism, Christianity, Islam, Confucianism, and Daoism.", standard: "9.2a" }
                    ]
                },
                "Social Impact of Belief Systems": {
                    topic: "Social Impact of Belief Systems",
                    lessons: [
                        { title: "Belief Systems, Social Order, and Gender Roles", objective: "Examine similarities and differences between major belief systems regarding their effects on social order and gender roles.", standard: "9.2b" }
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
                        { title: "Geography's Role in Classical Civilizations (Greece, Rome, Maya)", objective: "Investigate how geographic factors encouraged or hindered expansion and interactions.", standard: "9.3a" }
                    ]
                },
                "Consolidating Power": {
                    topic: "Consolidating Power",
                    lessons: [
                        { title: "Methods of Imperial Control (Mauryan, Qin, Roman)", objective: "Compare and contrast how different empires consolidated and increased power through belief systems, law, government, and military.", standard: "9.3b" }
                    ]
                },
                "Golden Ages": {
                    topic: "Golden Ages",
                    lessons: [
                        { title: "Golden Ages of Greece, Gupta, Han, Maya, and Rome", objective: "Examine the achievements of classical civilizations to determine if they experienced a Golden Age.", standard: "9.3c" }
                    ]
                },
                "Decline and Fall of Empires": {
                    topic: "Decline and Fall of Empires",
                    lessons: [
                        { title: "Fall of the Han Dynasty, Mayan Civilization, and Roman Empire", objective: "Compare and contrast the political, socioeconomic, environmental, and external forces that led to the fall of classical empires.", standard: "9.3d" }
                    ]
                }
            }
        },
        "9.4 RISE OF TRANSREGIONAL TRADE NETWORKS": {
            unit: "9.4 RISE OF TRANSREGIONAL TRADE NETWORKS",
            topics: {
                "Afro-Eurasian Trade Routes": {
                    topic: "Afro-Eurasian Trade Routes",
                    lessons: [
                        { title: "Mapping Transregional Trade Networks", objective: "Identify the locations and connections of the Indian Ocean complex, Mediterranean Sea complex, Silk Roads, and Trans-Saharan routes.", standard: "9.4a" }
                    ]
                },
                "Technology and Travel": {
                    topic: "Technology and Travel",
                    lessons: [
                        { title: "Innovations in Interregional Travel", objective: "Examine technologies that improved travel along the Indian Ocean and Trans-Saharan networks.", standard: "9.4b" }
                    ]
                },
                "Cultural Diffusion and Exchange": {
                    topic: "Cultural Diffusion and Exchange",
                    lessons: [
                        { title: "Products, Ideas, and Peoples on the Move", objective: "Analyze the exchange of goods, resources, enslaved people, and religious ideas along major trade networks.", standard: "9.4c" },
                        { title: "Journeys of Zheng He, Ibn Battuta, and Marco Polo", objective: "Examine the travels of significant individuals and the influence of their journeys.", standard: "9.4c" }
                    ]
                },
                "Trade and Political States": {
                    topic: "Trade and Political States",
                    lessons: [
                        { title: "Emergence of States along Trade Routes (Byzantine, Ottoman, Ghana, Mali)", objective: "Examine how control of trade contributed to the emergence and expansion of political states.", standard: "9.4d" }
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
                        { title: "Comparing Feudal Western Europe and the Byzantine Empire", objective: "Compare and contrast the political, economic, and social institutions of feudal Western Europe and the Byzantine Empire.", standard: "9.5a" }
                    ]
                },
                "Empire Building": {
                    topic: "Empire Building",
                    lessons: [
                        { title: "Comparing the Mongol and Islamic Caliphate Empires", objective: "Compare and contrast the empire-building processes of the Mongols and the Islamic caliphates.", standard: "9.5b" }
                    ]
                },
                "Cultural and Scientific Innovations": {
                    topic: "Cultural and Scientific Innovations",
                    lessons: [
                        { title: "Achievements of the Tang/Song Dynasties and the Abbasid Caliphate", objective: "Compare and contrast the achievements and innovations of major postclassical empires.", standard: "9.5c" },
                        { title: "Diffusion of Technology and Learning (East Asia to Europe)", objective: "Explore the spread of technology and learning from East Asia to Western Europe.", standard: "9.5c" },
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
                        { title: "Divisions within Islam and Christianity", objective: "Investigate the Sunni-Shia split in Islam and the Great Schism in Christianity and their impacts.", standard: "9.6a" },
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
                        { title: "Mapping Muslim, Neo-Confucian, and Christian Realms (ca. 1400)", objective: "Map and compare the extent and power of realms influenced by major belief systems.", standard: "9.7a" }
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
                        { title: "Environment and Trade in Aztec, Inca, and Songhai Empires", objective: "Examine the influence of environment, resources, and trade on the growth of empires in Africa and the Americas.", standard: "9.8a" }
                    ]
                },
                "Religion and Power": {
                    topic: "Religion and Power",
                    lessons: [
                        { title: "Role of Traditional Religions in Africa and the Americas", objective: "Examine the role of animism and the relationship between religious beliefs and political power in the Aztec and Inca empires.", standard: "9.8b" }
                    ]
                },
                "Cultural Achievements": {
                    topic: "Cultural Achievements",
                    lessons: [
                        { title: "Contributions of Aztec, Inca, and Songhai Empires", objective: "Investigate the achievements and contributions of major African and American empires.", standard: "9.8c" }
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
                        { title: "Challenges to Religious Authority", objective: "Explore the roles of key individuals and the impacts of the Reformation and Counter-Reformation on European unity.", standard: "9.9b" }
                    ]
                },
                "Absolutism": {
                    topic: "Absolutism",
                    lessons: [
                        { title: "Consolidation of Power in Russia and Western Europe", objective: "Investigate autocratic and absolutist rule by comparing the reigns of Louis XIV and Peter the Great.", standard: "9.9c" }
                    ]
                },
                "Scientific Revolution and Enlightenment": {
                    topic: "Scientific Revolution and Enlightenment",
                    lessons: [
                        { title: "Challenging Traditional Authorities", objective: "Examine the Scientific Revolution and the influence of Enlightenment thinkers on political authority.", standard: "9.9d, 9.9e" }
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
                "The Encounter and Columbian Exchange": {
                    topic: "The Encounter and Columbian Exchange",
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
                        { title: "Impacts of Colonization in the Americas and Africa", objective: "Examine the political, economic, cultural, and geographic impacts of European colonization on existing societies.", standard: "9.10d" }
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
