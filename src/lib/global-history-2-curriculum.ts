
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
                        { title: "Comparing Mughal and Ottoman Empires", objective: "Compare and contrast the Mughal and Ottoman Empires in 1750 in terms of religious tolerance, political organization, and commerce.", standard: "10.1a" },
                        { title: "Tokugawa Japan and Bourbon France", objective: "Compare and contrast the Tokugawa Shogunate with France under the Bourbon Dynasty.", standard: "10.1a" }
                    ]
                },
                "Interactions with Outsiders": {
                    topic: "Interactions with Outsiders",
                    lessons: [
                        { title: "Comparing Tokugawa and Mughal Responses to Outsiders", objective: "Compare and contrast how Tokugawa Japan and the Mughal Empire responded to outsiders and the impacts of those decisions.", standard: "10.1b" }
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
                        { title: "Enlightenment and Reform Movements", objective: "Explore the influence of Enlightenment ideals on women’s rights and abolition movements.", standard: "10.2b" }
                    ]
                },
                "Revolutions in France and the Americas": {
                    topic: "Revolutions in France and the Americas",
                    lessons: [
                        { title: "The French Revolution", objective: "Examine the causes, course, and impacts of the French Revolution, noting the roles of key figures.", standard: "10.2c" },
                        { title: "Revolutions in the Americas", objective: "Examine the impacts of the French Revolution on revolutionary movements in the Americas, noting the roles of Toussaint L’Ouverture and Simon Bolivar.", standard: "10.2c" }
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
                "Agricultural Revolution": {
                    topic: "Agricultural Revolution",
                    lessons: [
                        { title: "Innovations in Agriculture in Great Britain", objective: "Examine agricultural innovations and technologies that enabled large-scale farming.", standard: "10.3a" }
                    ]
                },
                "The Industrial Revolution": {
                    topic: "The Industrial Revolution",
                    lessons: [
                        { title: "Factors of Industrialization", objective: "Analyze the factors and conditions needed to industrialize and expand industrial production.", standard: "10.3b" },
                        { title: "Social and Economic Impacts", objective: "Investigate the social, political, and economic impacts of industrialization in Victorian England and Meiji Japan.", standard: "10.3c" }
                    ]
                },
                "Responses to Industrialization": {
                    topic: "Responses to Industrialization",
                    lessons: [
                        { title: "Reform Movements and New Ideologies", objective: "Investigate reforms and new ideologies, such as Marxism, that developed in response to industrial growth.", standard: "10.3d" }
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
                        { title: "European Imperialism in Africa and Asia", objective: "Trace how imperial powers politically and economically controlled territories, including direct and indirect rule.", standard: "10.4a" }
                    ]
                },
                "Resistance to Colonial Rule": {
                    topic: "Resistance to Colonial Rule",
                    lessons: [
                        { title: "Resistance in Africa and China", objective: "Investigate examples of resistance to colonial rule, such as the Zulu resistance or the Boxer Rebellion.", standard: "10.4b" },
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
                        { title: "Causes and Effects of the World Wars", objective: "Compare and contrast the long- and short-term causes and effects of World War I and World War II.", standard: "10.5a" },
                        { title: "Technology and Devastation", objective: "Compare and contrast the technologies utilized in both World Wars, noting the human and environmental devastation.", standard: "10.5b" }
                    ]
                },
                "Efforts for Peace": {
                    topic: "Efforts for Peace",
                    lessons: [
                        { title: "International Efforts for Peace", objective: "Examine international efforts to build stability and peace, including the League of Nations and the United Nations.", standard: "10.5c" }
                    ]
                },
                "The Interwar Period": {
                    topic: "The Interwar Period",
                    lessons: [
                        { title: "The Russian Revolution and Soviet State", objective: "Examine the Russian Revolution and the development of the Soviet state under Lenin and Stalin.", standard: "10.5d" },
                        { title: "Rise of Totalitarianism", objective: "Examine the rise of totalitarian dictators in Germany and Japan and the causes of the Great Depression.", standard: "10.5d" }
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
                        { title: "Post-WWII Tensions and Alliances", objective: "Compare and contrast how peace was conceived at Yalta and Potsdam with what happened in Europe post-WWII.", standard: "10.6a" }
                    ]
                },
                "Confrontations and Coexistence": {
                    topic: "Confrontations and Coexistence",
                    lessons: [
                        { title: "Proxy Wars: Cuba, Vietnam, Afghanistan", objective: "Investigate efforts to expand and contain communism from multiple perspectives.", standard: "10.6b" },
                        { title: "Nuclear Arms Race and Détente", objective: "Examine the nuclear proliferation and the era of détente from American and Soviet perspectives.", standard: "10.6b" }
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
                "Independence Movements in Asia": {
                    topic: "Independence Movements in Asia",
                    lessons: [
                        { title: "Indian Independence Movement", objective: "Explore Gandhi’s nonviolent nationalist movement and the partition of the subcontinent.", standard: "10.7a" },
                        { title: "Comparing Gandhi and Ho Chi Minh", objective: "Compare and contrast the ideologies and methodologies of Gandhi and Ho Chi Minh.", standard: "10.7a" }
                    ]
                },
                "African Independence": {
                    topic: "African Independence",
                    lessons: [
                        { title: "African Independence Movements (Ghana, Algeria, Kenya)", objective: "Explore at least two African independence movements.", standard: "10.7b" }
                    ]
                },
                "Nationalism in the Middle East": {
                    topic: "Nationalism in the Middle East",
                    lessons: [
                        { title: "Zionism and Arab Nationalism", objective: "Investigate Zionism, the mandate system, the creation of Israel, and the Arab-Israeli conflict.", standard: "10.7c" }
                    ]
                },
                "Nationalism in China": {
                    topic: "Nationalism in China",
                    lessons: [
                        { title: "The Chinese Civil War", objective: "Trace the Chinese Civil War and the resulting division of China.", standard: "10.7d" },
                        { title: "Communist China under Mao and Deng", objective: "Investigate and compare the policies under Mao Zedong and Deng Xiaoping.", standard: "10.7d" }
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
                        { title: "Impacts of Urbanization and Industrialization", objective: "Investigate the extent to which urbanization and industrialization have modified social institutions in Africa, Latin America, and Asia.", standard: "10.8a" }
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
                "Globalization: Support and Criticism": {
                    topic: "Globalization: Support and Criticism",
                    lessons: [
                        { title: "Debates on Globalization", objective: "Compare and contrast arguments supporting and criticizing globalization by examining various concerns.", standard: "10.9b" }
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
                "UN Universal Declaration of Human Rights": {
                    topic: "UN Universal Declaration of Human Rights",
                    lessons: [
                        { title: "Historical Context of the Universal Declaration", objective: "Investigate the historical context of the Holocaust and Nuremberg Trials and their impacts on the UN Universal Declaration of Human Rights.", standard: "10.10a" }
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
