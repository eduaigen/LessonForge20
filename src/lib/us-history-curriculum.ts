
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

export const usHistoryCurriculum: {
    units: { [key: string]: Unit };
} = {
    units: {
        "11.1 COLONIAL FOUNDATIONS (1607–1763)": {
            unit: "11.1 COLONIAL FOUNDATIONS (1607–1763)",
            topics: {
                "Contact and Exchange": {
                    topic: "Contact and Exchange",
                    lessons: [
                        { title: "European Contact with Native Americans", objective: "Trace European contact with Native Americans and examine the impacts of colonization on Native American populations.", standard: "11.1a" }
                    ]
                },
                "Regional Colonial Development": {
                    topic: "Regional Colonial Development",
                    lessons: [
                        { title: "Geography and Colonial Economy", objective: "Examine the impacts of geographic factors on patterns of settlement and the development of colonial economic systems.", standard: "11.1b" },
                        { title: "Slavery in the Colonies", objective: "Analyze slavery as a deeply established component of the colonial economic system and social structure.", standard: "11.1b" }
                    ]
                },
                "Colonial Political Development": {
                    topic: "Colonial Political Development",
                    lessons: [
                        { title: "Influences on Colonial Politics", objective: "Examine colonial political institutions to determine how they were influenced by Enlightenment ideas and British traditions.", standard: "11.1c" }
                    ]
                }
            }
        },
        "11.2 CONSTITUTIONAL FOUNDATIONS (1763–1824)": {
            unit: "11.2 CONSTITUTIONAL FOUNDATIONS (1763–1824)",
            topics: {
                "Road to Revolution": {
                    topic: "Road to Revolution",
                    lessons: [
                        { title: "British Control and Colonial Resistance", objective: "Examine British efforts to gain greater control over the colonies and colonial reactions to these efforts.", standard: "11.2a" }
                    ]
                },
                "Revolutionary War and Declaration of Independence": {
                    topic: "Revolutionary War and Declaration of Independence",
                    lessons: [
                        { title: "The Declaration of Independence", objective: "Examine the purpose of and the ideas contained in the Declaration of Independence and consider its long-term impacts.", standard: "11.2b" },
                        { title: "Impacts of the Revolutionary War", objective: "Examine the impacts of the Revolutionary War on workers, African Americans, women, and Native Americans.", standard: "11.2b" }
                    ]
                },
                "Creating a New Government": {
                    topic: "Creating a New Government",
                    lessons: [
                        { title: "Weaknesses of the Articles of Confederation", objective: "Examine the weaknesses and successes of government under the Articles of Confederation.", standard: "11.2c" },
                        { title: "The Constitutional Convention", objective: "Explore the development of the Constitution, including the major debates and their resolutions.", standard: "11.2c" },
                        { title: "Federalist vs. Antifederalist Debates", objective: "Examine the key points of debate expressed in the Federalist and Antifederalist Papers.", standard: "11.2c" }
                    ]
                },
                "The Early Republic": {
                    topic: "The Early Republic",
                    lessons: [
                        { title: "Washington's Presidency and Precedents", objective: "Identify presidential actions and precedents established by George Washington.", standard: "11.2d" },
                        { title: "Hamilton's Economic Plan", objective: "Examine Hamilton’s economic plan, the debate surrounding it, and its impact on political parties.", standard: "11.2d" },
                        { title: "Strengthening Federal Power", objective: "Examine Supreme Court cases that strengthened the powers of the federal government, such as Marbury v. Madison.", standard: "11.2d" }
                    ]
                }
            }
        },
        "11.3 EXPANSION, NATIONALISM, AND SECTIONALISM (1800–1865)": {
            unit: "11.3 EXPANSION, NATIONALISM, AND SECTIONALISM (1800–1865)",
            topics: {
                "Nationalism and Expansion": {
                    topic: "Nationalism and Expansion",
                    lessons: [
                        { title: "Strengthening American Nationalism", objective: "Examine how the Louisiana Purchase, the War of 1812, and the Monroe Doctrine strengthened nationalism.", standard: "11.3a" },
                        { title: "The Market Revolution", objective: "Examine the market revolution and its impact on technology, transportation, labor, and democracy.", standard: "11.3a" },
                        { title: "Jackson's Presidency", objective: "Examine Jackson’s presidency, including the Indian Removal Act and the case of Worcester v. Georgia.", standard: "11.3a" }
                    ]
                },
                "Growth of Sectionalism": {
                    topic: "Growth of Sectionalism",
                    lessons: [
                        { title: "Debates on States' Rights", objective: "Compare different perspectives on States' rights by examining the nullification crisis.", standard: "11.3b" },
                        { title: "Abolitionist and Women's Rights Movements", objective: "Investigate the development of the abolitionist and women’s rights movements.", standard: "11.3b" },
                        { title: "Expansion of Slavery", objective: "Examine the issues surrounding the expansion of slavery into new territories, including the Missouri Compromise and the Dred Scott decision.", standard: "11.3b" }
                    ]
                },
                "The Civil War": {
                    topic: "The Civil War",
                    lessons: [
                        { title: "Causes of the Civil War", objective: "Analyze the long-standing disputes over States' rights and slavery that led to the Civil War.", standard: "11.3c" },
                        { title: "Union vs. Confederacy", objective: "Compare the relative strengths of the Union and the Confederacy and evaluate the reasons for the North's victory.", standard: "11.3c" },
                        { title: "Expansion of Federal Power During the War", objective: "Examine the expansion of executive and federal power during the Civil War, including the Emancipation Proclamation.", standard: "11.3c" }
                    ]
                }
            }
        },
        "11.4 POST-CIVIL WAR ERA (1865–1900)": {
            unit: "11.4 POST-CIVIL WAR ERA (1865–1900)",
            topics: {
                "Reconstruction and its Aftermath": {
                    topic: "Reconstruction and its Aftermath",
                    lessons: [
                        { title: "Constitutional Amendments and Resistance", objective: "Examine the 13th, 14th, and 15th amendments and the ways their effectiveness was undermined.", standard: "11.4a" },
                        { title: "Life for Freedmen", objective: "Examine the ways in which freedmen attempted to build independent lives after the Civil War.", standard: "11.4a" }
                    ]
                },
                "Struggles for Equality": {
                    topic: "Struggles for Equality",
                    lessons: [
                        { title: "Women's Rights Movement", objective: "Examine the exclusion of women from the 14th and 15th amendments and the subsequent struggle for suffrage.", standard: "11.4b" },
                        { title: "Native American Policies", objective: "Examine the effect of federal policies on Native Americans, including reservation policies and the Dawes Act.", standard: "11.4c" },
                        { title: "Discrimination against Mexican Americans and Chinese Immigrants", objective: "Analyze the racial and economic motives for discrimination against Mexican Americans and Chinese immigrants.", standard: "11.4d" }
                    ]
                }
            }
        },
        "11.5 INDUSTRIALIZATION AND URBANIZATION (1870–1920)": {
            unit: "11.5 INDUSTRIALIZATION AND URBANIZATION (1870–1920)",
            topics: {
                "The Rise of Industry": {
                    topic: "The Rise of Industry",
                    lessons: [
                        { title: "Technological Innovations and Industrial Growth", objective: "Examine the technological innovations that facilitated industrialization and the growth of industries under key businessmen.", standard: "11.5a" },
                        { title: "Regulation of Business", objective: "Evaluate the effectiveness of state and federal attempts to regulate business, including the Sherman Antitrust Act.", standard: "11.5a" }
                    ]
                },
                "Challenges of Urbanization and Reform Efforts": {
                    topic: "Challenges of Urbanization and Reform Efforts",
                    lessons: [
                        { title: "Immigration and Urbanization", objective: "Examine demographic trends associated with urbanization and immigration and the problems faced by farmers.", standard: "11.5b" },
                        { title: "Labor Unions and Workers' Rights", objective: "Examine the attempts of workers to unionize in response to industrial working conditions.", standard: "11.5b" },
                        { title: "The Progressive Era", objective: "Examine Progressive Era reforms, the woman’s suffrage movement, and the efforts of key individuals like Jane Addams and W. E. B. Du Bois.", standard: "11.5b" }
                    ]
                }
            }
        },
        "11.6 THE RISE OF AMERICAN POWER (1890–1920)": {
            unit: "11.6 THE RISE OF AMERICAN POWER (1890–1920)",
            topics: {
                "American Imperialism": {
                    topic: "American Imperialism",
                    lessons: [
                        { title: "The Spanish-American War", objective: "Investigate the causes and effects of the Spanish-American War and the debates between imperialists and anti-imperialists.", standard: "11.6a" },
                        { title: "Expanding American Influence", objective: "Investigate expanding American influence through the creation of the Panama Canal and the Roosevelt Corollary.", standard: "11.6a" }
                    ]
                },
                "World War I": {
                    topic: "World War I",
                    lessons: [
                        { title: "From Neutrality to Involvement", objective: "Investigate the reasons for President Wilson’s shift from neutrality to involvement in World War I.", standard: "11.6b" },
                        { title: "Wilson's Fourteen Points and the Treaty of Versailles", objective: "Examine Wilson’s goals, his role at the Versailles Peace Conference, and the Senate's rejection of the treaty.", standard: "11.6b" },
                        { title: "The Home Front", objective: "Investigate the effects of mobilization on the United States economy and the Great Migration.", standard: "11.6c" }
                    ]
                }
            }
        },
        "11.7 PROSPERITY AND DEPRESSION (1920–1939)": {
            unit: "11.7 PROSPERITY AND DEPRESSION (1920–1939)",
            topics: {
                "The Roaring Twenties": {
                    topic: "The Roaring Twenties",
                    lessons: [
                        { title: "Cultural Changes and Clashes", objective: "Examine the cultural trends of the 1920s, including clashes between modern and traditional values like the Scopes trial.", standard: "11.7a" },
                        { title: "The Harlem Renaissance", objective: "Examine literary and artistic contributions associated with the Harlem Renaissance and the rise of Black Nationalism.", standard: "11.7b" }
                    ]
                },
                "The Great Depression and the New Deal": {
                    topic: "The Great Depression and the New Deal",
                    lessons: [
                        { title: "Causes of the Great Depression", objective: "Examine the underlying weaknesses of the economy that led to the stock market crash of 1929 and the Great Depression.", standard: "11.7c" },
                        { title: "Hoover vs. Roosevelt", objective: "Compare and contrast the responses of Presidents Hoover and Roosevelt to the Great Depression.", standard: "11.7c" },
                        { title: "FDR's New Deal", objective: "Evaluate President Roosevelt’s leadership and the key legislative initiatives of the New Deal.", standard: "11.7c" }
                    ]
                }
            }
        },
        "11.8 WORLD WAR II (1935–1945)": {
            unit: "11.8 WORLD WAR II (1935–1945)",
            topics: {
                "The US Enters the War": {
                    topic: "The US Enters the War",
                    lessons: [
                        { title: "From Neutrality to War", objective: "Examine the shift from neutrality to a pro-Allied position, including the impact of the attack on Pearl Harbor.", standard: "11.8a" },
                        { title: "Truman and the Atomic Bomb", objective: "Examine President Truman’s decision to use the atomic bomb against Hiroshima and Nagasaki.", standard: "11.8a" }
                    ]
                },
                "The Home Front during WWII": {
                    topic: "The Home Front during WWII",
                    lessons: [
                        { title: "Mobilization and Production", objective: "Examine United States mobilization efforts and their effects on the economy and employment.", standard: "11.8b" },
                        { title: "Japanese Internment", objective: "Examine the reasons for Japanese removal and the Supreme Court’s decision in Korematsu v. United States.", standard: "11.8b" },
                        { title: "Contributions and Discrimination", objective: "Examine the contributions of women and minority groups to the war effort and the discrimination they faced.", standard: "11.8b" }
                    ]
                },
                "The Holocaust and Post-War Justice": {
                    topic: "The Holocaust and Post-War Justice",
                    lessons: [
                        { title: "The Holocaust and American Response", objective: "Investigate American officials' knowledge of the Holocaust and the degree to which intervention may have been possible.", standard: "11.8c" },
                        { title: "Nuremberg Trials and Human Rights", objective: "Examine the contributions of Justice Robert Jackson at Nuremberg and Eleanor Roosevelt's role in the UN Universal Declaration of Human Rights.", standard: "11.8c" }
                    ]
                }
            }
        },
        "11.9 COLD WAR (1945–1990)": {
            unit: "11.9 COLD WAR (1945–1990)",
            topics: {
                "Containment Policy": {
                    topic: "Containment Policy",
                    lessons: [
                        { title: "Origins of the Cold War", objective: "Trace the key decisions and disagreements at wartime conferences that led to the Cold War.", standard: "11.9a" },
                        { title: "The Truman Doctrine and Marshall Plan", objective: "Trace United States containment policies and how they represent a shift in American foreign policy.", standard: "11.9a" },
                        { title: "The Vietnam War and Domestic Unrest", objective: "Examine the US involvement in Vietnam, the antiwar movement, and the decline in public confidence in government.", standard: "11.9a" }
                    ]
                },
                "The Nuclear Arms Race": {
                    topic: "The Nuclear Arms Race",
                    lessons: [
                        { title: "Acceleration of the Arms Race", objective: "Trace the acceleration of the nuclear arms race from 1949 through 1969.", standard: "11.9b" },
                        { title: "The Cuban Missile Crisis", objective: "Examine Soviet motives for placing missiles in Cuba and the impact of the crisis on US-Soviet relations.", standard: "11.9b" }
                    ]
                },
                "The Middle East": {
                    topic: "The Middle East",
                    lessons: [
                        { title: "US Policy in the Middle East", objective: "Examine United States foreign policy toward the Middle East, including the creation of Israel and the Camp David Accords.", standard: "11.9c" }
                    ]
                },
                "End of the Cold War": {
                    topic: "End of the Cold War",
                    lessons: [
                        { title: "The Fall of the Berlin Wall", objective: "Trace the factors that led to the fall of the Berlin Wall and the end of the Cold War.", standard: "11.9d" }
                    ]
                }
            }
        },
        "11.10 SOCIAL AND ECONOMIC CHANGE/DOMESTIC ISSUES (1945–present)": {
            unit: "11.10 SOCIAL AND ECONOMIC CHANGE/DOMESTIC ISSUES (1945–present)",
            topics: {
                "The Civil Rights Movement": {
                    topic: "The Civil Rights Movement",
                    lessons: [
                        { title: "Key Individuals and Groups", objective: "Examine the roles and impact of individuals like Martin Luther King Jr. and groups like the NAACP and SNCC.", standard: "11.10a" },
                        { title: "Landmark Legislation and Court Cases", objective: "Examine judicial actions like Brown v. Board of Education and legislation like the Civil Rights Act of 1964.", standard: "11.10a" }
                    ]
                },
                "Other Social Movements": {
                    topic: "Other Social Movements",
                    lessons: [
                        { title: "Modern Women's Movement", objective: "Trace the modern women’s movement, including key figures, legislation, and court cases.", standard: "11.10b" },
                        { title: "Movements for Native Americans, Brown Power, and Gay Rights", objective: "Investigate various movements for equality and their key goals and achievements.", standard: "11.10b" },
                        { title: "The Environmental Movement", objective: "Examine the environmental movement, including Silent Spring and the creation of the EPA.", standard: "11.10b" }
                    ]
                },
                "Economic Debates": {
                    topic: "Economic Debates",
                    lessons: [
                        { title: "The Great Society vs. Reaganomics", objective: "Compare and contrast the economic policies of President Johnson and President Reagan.", standard: "11.10c" },
                        { title: "Contemporary Economic Issues", objective: "Examine the causes of the 2008 financial crisis and debates over Social Security, Medicare, and the Affordable Care Act.", standard: "11.10c" }
                    ]
                }
            }
        },
        "11.11 THE UNITED STATES IN A GLOBALIZING WORLD (1990–present)": {
            unit: "11.11 THE UNITED STATES IN A GLOBALIZING WORLD (1990–present)",
            topics: {
                "Post-Cold War Foreign Policy": {
                    topic: "Post-Cold War Foreign Policy",
                    lessons: [
                        { title: "The Persian Gulf War", objective: "Examine the decision to oppose Iraq’s invasion of Kuwait and the consequences of the Persian Gulf War.", standard: "11.11a" }
                    ]
                },
                "The War on Terror": {
                    topic: "The War on Terror",
                    lessons: [
                        { title: "Response to September 11, 2001", objective: "Trace the reactions to the 9/11 attacks, including the invasion of Afghanistan and the passage of the USA PATRIOT Act.", standard: "11.11b" },
                        { title: "The Iraq War and Civil Liberties", objective: "Examine the decision to invade Iraq and evaluate the constitutional issues raised by the USA PATRIOT Act.", standard: "11.11b" }
                    ]
                },
                "Globalization": {
                    topic: "Globalization",
                    lessons: [
                        { title: "Economic and Societal Effects of Globalization", objective: "Examine the positive and negative consequences of globalization on the United States economy and society.", standard: "11.11c" }
                    ]
                }
            }
        }
    }
};
