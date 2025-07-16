
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

export const globalHistory2Curriculum: {
    units: { [key: string]: Unit };
} = {
    units: {
        "10.1 THE WORLD in 1750": {
            unit: "10.1 THE WORLD in 1750",
            topics: {
                "Eurasian States and Empires": {
                    topic: "Eurasian States and Empires",
                    lessons: [
                        { title: "Comparing Mughal, Ottoman, and Tokugawa Empires with Bourbon France", objective: "Compare and contrast powerful Eurasian states and empires ca. 1750.", standard: "10.1a" }
                    ]
                },
                "Interactions with Outsiders": {
                    topic: "Interactions with Outsiders",
                    lessons: [
                        { title: "Responses to European Maritime Empires", objective: "Compare and contrast the Tokugawa and Mughal responses to outsiders and the impacts of those decisions.", standard: "10.1b" }
                    ]
                }
            }
        },
        "10.2 ENLIGHTENMENT, REVOLUTION, AND NATIONALISM": {
            unit: "10.2 ENLIGHTENMENT, REVOLUTION, AND NATIONALISM",
            topics: {
                "The Enlightenment": {
                    topic: "The Enlightenment",
                    lessons: [
                        { title: "Political Philosophies of the Enlightenment", objective: "Examine key ideas from Enlightenment thinkers such as John Locke, Montesquieu, and Rousseau.", standard: "10.2a" },
                        { title: "Enlightenment and Reform Movements", objective: "Explore the influence of Enlightenment ideals on women’s rights and abolition movements, and examine enlightened despots.", standard: "10.2b" }
                    ]
                },
                "Political Revolutions": {
                    topic: "Political Revolutions",
                    lessons: [
                        { title: "The French Revolution and Its Impacts", objective: "Examine the causes, course, and impacts of the French Revolution, and its influence on revolutionary movements in the Americas (e.g., Toussaint L’Ouverture, Simon Bolivar).", standard: "10.2c" }
                    ]
                },
                "Nationalism and Unification": {
                    topic: "Nationalism and Unification",
                    lessons: [
                        { title: "Unification of Italy and Germany", objective: "Investigate the role of cultural identity and nationalism in the unification of Italy and Germany.", standard: "10.2d" },
                        { title: "Dissolution of Empires", objective: "Investigate the role of nationalism in the dissolution of the Ottoman and Austrian Empires.", standard: "10.2d" }
                    ]
                }
            }
        },
        "10.3 CAUSES AND EFFECTS OF THE INDUSTRIAL REVOLUTION": {
            unit: "10.3 CAUSES AND EFFECTS OF THE INDUSTRIAL REVOLUTION",
            topics: {
                "Agricultural and Industrial Innovations": {
                    topic: "Agricultural and Industrial Innovations",
                    lessons: [
                        { title: "The Agricultural Revolution in Great Britain", objective: "Examine agricultural innovations and technologies that enabled large-scale farming.", standard: "10.3a" },
                        { title: "Factors of Industrialization", objective: "Analyze the factors and conditions needed to industrialize, including shifts in economic practices and new technologies.", standard: "10.3b" }
                    ]
                },
                "Social and Economic Impacts": {
                    topic: "Social and Economic Impacts",
                    lessons: [
                        { title: "Impacts of Industrialization in England and Japan", objective: "Investigate the social, political, and economic impacts of industrialization in Victorian England and Meiji Japan.", standard: "10.3c" }
                    ]
                },
                "Responses to Industrialization": {
                    topic: "Responses to Industrialization",
                    lessons: [
                        { title: "Reform Movements and New Ideologies", objective: "Investigate reforms (suffrage, education, labor) and new ideologies, such as Marxism, that developed in response to industrial growth.", standard: "10.3d" }
                    ]
                }
            }
        },
        "10.4 IMPERIALISM": {
            unit: "10.4 IMPERIALISM",
            topics: {
                "Motives and Methods of Imperialism": {
                    topic: "Motives and Methods of Imperialism",
                    lessons: [
                        { title: "European Imperialism in Africa and Asia", objective: "Trace how imperial powers politically and economically controlled territories (e.g., direct/indirect rule in Africa, India, China).", standard: "10.4a" }
                    ]
                },
                "Resistance to Colonial Rule": {
                    topic: "Resistance to Colonial Rule",
                    lessons: [
                        { title: "Resistance in Africa and China", objective: "Investigate one example of resistance in Africa (e.g., Zulu, Ethiopia) and one in China (e.g., Boxer Rebellion).", standard: "10.4b" },
                        { title: "Japan's Reaction to Western Imperialism", objective: "Investigate how Japan reacted to the threat of Western imperialism.", standard: "10.4b" }
                    ]
                },
                "Consequences of Imperialism": {
                    topic: "Consequences of Imperialism",
                    lessons: [
                        { title: "The Berlin Conference and its Impact on Africa", objective: "Compare and contrast maps of Africa to understand the impact of arbitrary colonial borders.", standard: "10.4c" }
                    ]
                }
            }
        },
        "10.5 UNRESOLVED GLOBAL CONFLICT (1914–1945)": {
            unit: "10.5 UNRESOLVED GLOBAL CONFLICT (1914–1945)",
            topics: {
                "World War I and World War II": {
                    topic: "World War I and World War II",
                    lessons: [
                        { title: "Causes and Effects of the World Wars", objective: "Compare and contrast long- and short-term causes and effects of World War I and World War II.", standard: "10.5a" },
                        { title: "Technology and Devastation", objective: "Compare and contrast technologies utilized in both World Wars and their devastating impacts.", standard: "10.5b" }
                    ]
                },
                "Efforts for Peace and Interwar Period": {
                    topic: "Efforts for Peace and Interwar Period",
                    lessons: [
                        { title: "International Efforts for Peace", objective: "Examine international efforts to build stability, including the Treaty of Versailles and the United Nations.", standard: "10.5c" },
                        { title: "Nationalism and Ideology Between the Wars", objective: "Examine the Russian Revolution, rise of totalitarianism in Germany and Japan, and the Great Depression.", standard: "10.5d" }
                    ]
                },
                "Human Rights Violations": {
                    topic: "Human Rights Violations",
                    lessons: [
                        { title: "Atrocities and Mass Murders", objective: "Examine the atrocities against the Armenians, the Ukrainian Holodomor, and the Holocaust.", standard: "10.5e" }
                    ]
                }
            }
        },
        "10.6 UNRESOLVED GLOBAL CONFLICT (1945–1991: THE COLD WAR)": {
            unit: "10.6 UNRESOLVED GLOBAL CONFLICT (1945–1991: THE COLD WAR)",
            topics: {
                "Origins and Characteristics of the Cold War": {
                    topic: "Origins and Characteristics of the Cold War",
                    lessons: [
                        { title: "Post-WWII Tensions and Alliances", objective: "Compare peace plans at Yalta and Potsdam with post-war realities in Europe (e.g., Truman Doctrine, NATO).", standard: "10.6a" }
                    ]
                },
                "Confrontations and Coexistence": {
                    topic: "Confrontations and Coexistence",
                    lessons: [
                        { title: "Proxy Wars and Non-Alignment", objective: "Investigate efforts to expand and contain communism (e.g., Cuba, Vietnam) and the non-alignment movement.", standard: "10.6b" },
                        { title: "Nuclear Arms Race and Détente", objective: "Examine nuclear proliferation, the military-industrial complex, and the era of détente.", standard: "10.6b" }
                    ]
                },
                "End of the Cold War": {
                    topic: "End of the Cold War",
                    lessons: [
                        { title: "Collapse of the Soviet Union", objective: "Investigate the political and economic reforms of glasnost and perestroika and their impacts.", standard: "10.6c" }
                    ]
                }
            }
        },
        "10.7 DECOLONIZATION AND NATIONALISM (1900–2000)": {
            unit: "10.7 DECOLONIZATION AND NATIONALISM (1900–2000)",
            topics: {
                "Independence Movements": {
                    topic: "Independence Movements",
                    lessons: [
                        { title: "Indian Independence and Partition", objective: "Explore Gandhi’s nonviolent movement and the partition of the subcontinent.", standard: "10.7a" },
                        { title: "African Independence Movements", objective: "Explore at least two African independence movements (e.g., Ghana, Algeria, Kenya).", standard: "10.7b" }
                    ]
                },
                "Nationalism in the Middle East and China": {
                    topic: "Nationalism in the Middle East and China",
                    lessons: [
                        { title: "Zionism, Arab Nationalism, and Israel", objective: "Investigate Zionism, the mandate system, the creation of Israel, and the Arab-Israeli conflict.", standard: "10.7c" },
                        { title: "The Chinese Civil War and Communist Rule", objective: "Trace the Chinese Civil War and compare policies under Mao Zedong and Deng Xiaoping.", standard: "10.7d" }
                    ]
                }
            }
        },
        "10.8 TENSIONS BETWEEN TRADITIONAL CULTURES AND MODERNIZATION": {
            unit: "10.8 TENSIONS BETWEEN TRADITIONAL CULTURES AND MODERNIZATION",
            topics: {
                "Views on Modernization": {
                    topic: "Views on Modernization",
                    lessons: [
                        { title: "Impacts of Urbanization and Industrialization", objective: "Investigate how urbanization and industrialization have modified social institutions in Africa, Latin America, and Asia.", standard: "10.8a" }
                    ]
                },
                "Debates within Societies": {
                    topic: "Debates within Societies",
                    lessons: [
                        { title: "Modernization vs. Tradition in Turkey and Iran", objective: "Investigate, compare, and contrast tensions between modernization and traditional culture in Turkey and Iran.", standard: "10.8b" }
                    ]
                }
            }
        },
        "10.9 GLOBALIZATION AND A CHANGING GLOBAL ENVIRONMENT (1990–PRESENT)": {
            unit: "10.9 GLOBALIZATION AND A CHANGING GLOBAL ENVIRONMENT (1990–PRESENT)",
            topics: {
                "Interconnected World": {
                    topic: "Interconnected World",
                    lessons: [
                        { title: "Technological Changes and Exchange Networks", objective: "Explore how information is accessed, exchanged, and controlled in light of changing technology.", standard: "10.9a" }
                    ]
                },
                "Globalization Debates": {
                    topic: "Globalization Debates",
                    lessons: [
                        { title: "Support and Criticism of Globalization", objective: "Compare and contrast arguments supporting and criticizing globalization by examining various concerns (e.g., free market, multinational corporations, inequality).", standard: "10.9b" }
                    ]
                },
                "Environmental Strain": {
                    topic: "Environmental Strain",
                    lessons: [
                        { title: "Population Growth and Environmental Impact", objective: "Examine strains on the environment due to population growth, industrialization, and urbanization.", standard: "10.9c" }
                    ]
                },
                "International Cooperation and Conflict": {
                    topic: "International Cooperation and Conflict",
                    lessons: [
                        { title: "Global Security Threats", objective: "Examine threats to global security, such as terrorism, including a discussion of the events of September 11, 2001.", standard: "10.9d" }
                    ]
                }
            }
        },
        "10.10 HUMAN RIGHTS VIOLATIONS": {
            unit: "10.10 HUMAN RIGHTS VIOLATIONS",
            topics: {
                "The UN Universal Declaration of Human Rights": {
                    topic: "The UN Universal Declaration of Human Rights",
                    lessons: [
                        { title: "Historical Context and Principles", objective: "Investigate the historical context of the Holocaust and Nuremberg Trials and their impacts on the UN Universal Declaration of Human Rights.", standard: "10.10a" }
                    ]
                },
                "Responses to Human Atrocities": {
                    topic: "Responses to Human Atrocities",
                    lessons: [
                        { title: "International Treaties and Organizations", objective: "Explore multinational treaties, international courts, and organizations that work to protect human rights.", standard: "10.10b" }
                    ]
                },
                "Evaluating Human Rights Violations": {
                    topic: "Evaluating Human Rights Violations",
                    lessons: [
                        { title: "Case Studies: Cambodia, Rwanda, Darfur", objective: "Examine and analyze the roles of perpetrators and bystanders in human rights violations.", standard: "10.10c" },
                        { title: "Apartheid in South Africa", objective: "Examine the policy of apartheid and the anti-apartheid movement, exploring Nelson Mandela’s role.", standard: "10.10c" }
                    ]
                }
            }
        }
    }
};
