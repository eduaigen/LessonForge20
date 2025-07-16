
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

export const governmentEconomicsCurriculum: {
    units: { [key: string]: Unit };
} = {
    units: {
        "12.G1 FOUNDATIONS of AMERICAN DEMOCRACY": {
            unit: "12.G1 FOUNDATIONS of AMERICAN DEMOCRACY",
            topics: {
                "Core Principles": {
                    topic: "Core Principles",
                    lessons: [
                        { title: "Enlightenment Influences", objective: "Analyze how Enlightenment ideas like natural rights and social contract influenced the framers.", standard: "12.G1a" },
                        { title: "Federalism and Separation of Powers", objective: "Examine the distribution of powers between federal/state governments and among the three federal branches.", standard: "12.G1b" },
                        { title: "Checks and Balances", objective: "Analyze the system of checks and balances as a mechanism for limited government.", standard: "12.G1c" },
                        { title: "The Rule of Law", objective: "Understand the principle that no one, including government, is above the law.", standard: "12.G1d" }
                    ]
                }
            }
        },
        "12.G2 CIVIL RIGHTS and CIVIL LIBERTIES": {
            unit: "12.G2 CIVIL RIGHTS and CIVIL LIBERTIES",
            topics: {
                "Fundamental Rights and Freedoms": {
                    topic: "Fundamental Rights and Freedoms",
                    lessons: [
                        { title: "Equality and Due Process", objective: "Explore the fundamental values of equality before the law and due process.", standard: "12.G2a" },
                        { title: "First Amendment Freedoms", objective: "Analyze the protections of freedom of speech, press, assembly, petition, and religion.", standard: "12.G2b" },
                        { title: "The Role of an Independent Judiciary", objective: "Understand the role of the judicial system in interpreting and defending citizens’ freedoms.", standard: "12.G2c" },
                        { title: "Broadening Definition of Civil Rights", objective: "Trace how the definition and application of civil rights have expanded over time.", standard: "12.G2d" }
                    ]
                }
            }
        },
        "12.G3 RIGHTS, RESPONSIBILITIES, AND DUTIES OF CITIZENSHIP": {
            unit: "12.G3 RIGHTS, RESPONSIBILITIES, AND DUTIES OF CITIZENSHIP",
            topics: {
                "The Role of the Citizen": {
                    topic: "The Role of the Citizen",
                    lessons: [
                        { title: "Balancing Personal Liberties and Social Responsibility", objective: "Debate the balance between individual rights and the common good.", standard: "12.G3a" },
                        { title: "The Right to Vote", objective: "Understand the voting process, including registration and party affiliation, as a cornerstone of democracy.", standard: "12.G3b" },
                        { title: "Duties and Responsibilities", objective: "Differentiate between legal duties (e.g., paying taxes, jury duty) and civic responsibilities.", standard: "12.G3c" },
                        { title: "Running for Public Office", objective: "Examine the process and requirements for becoming an elected official.", standard: "12.G3d" }
                    ]
                }
            }
        },
        "12.G4 POLITICAL AND CIVIC PARTICIPATION": {
            unit: "12.G4 POLITICAL AND CIVIC PARTICIPATION",
            topics: {
                "The Electoral Process": {
                    topic: "The Electoral Process",
                    lessons: [
                        { title: "The Electoral College", objective: "Analyze the advantages and drawbacks of the Electoral College system.", standard: "12.G4a" },
                        { title: "Mechanics of Voting", objective: "Understand how to register, research candidates, and participate in elections.", standard: "12.G4b" },
                        { title: "Political Parties", objective: "Analyze the role and influence of political parties in the United States electoral system.", standard: "12.G4d" }
                    ]
                },
                "Non-Electoral Participation": {
                    topic: "Non-Electoral Participation",
                    lessons: [
                        { title: "Influencing the Political Process", objective: "Explore non-electoral participation methods like joining political organizations and volunteering.", standard: "12.G4c" },
                        { title: "Advocacy and Activism", objective: "Examine various forms of civic life, including advocacy, petitioning, protesting, and boycotting.", standard: "12.G4e" }
                    ]
                }
            }
        },
        "12.G5 PUBLIC POLICY": {
            unit: "12.G5 PUBLIC POLICY",
            topics: {
                "The Policymaking Process": {
                    topic: "The Policymaking Process",
                    lessons: [
                        { title: "Shaping Public Policy", objective: "Understand how public policy is shaped, implemented, and enforced at local, state, and federal levels.", standard: "12.G5a" },
                        { title: "Balancing Interests in Policy", objective: "Analyze how policymakers balance regional and national needs, political positions, and sources of power.", standard: "12.G5b" },
                        { title: "Intergovernmental Relations", objective: "Examine how cooperation and conflict between different levels of government affect policy implementation.", standard: "12.G5c" },
                        { title: "Media and Public Policy", objective: "Develop skills to critically evaluate media sources to be an informed citizen on public policy issues.", standard: "12.G5d" }
                    ]
                }
            }
        },
        "12.E1 INDIVIDUAL RESPONSIBILITY AND THE ECONOMY": {
            unit: "12.E1 INDIVIDUAL RESPONSIBILITY AND THE ECONOMY",
            topics: {
                "Personal Finance": {
                    topic: "Personal Finance",
                    lessons: [
                        { title: "Economic Decision Making", objective: "Consider opportunities, resources, preferences, and ethics in making economic decisions.", standard: "12.E1a" },
                        { title: "Budgeting, Saving, and Investing", objective: "Understand how to use budgeting, borrowing, and investment strategies to maximize well-being.", standard: "12.E1b" },
                        { title: "Credit and Debt", objective: "Understand financial credit, personal debt, the impact of interest, and predatory lending practices.", standard: "12.E1c" },
                        { title: "Global Economy Awareness", objective: "Be aware of inflation and understand how international currencies fluctuate in value.", standard: "12.E1d" }
                    ]
                }
            }
        },
        "12.E2 INDIVIDUALS AND BUSINESSES IN MARKETS": {
            unit: "12.E2 INDIVIDUALS AND BUSINESSES IN MARKETS",
            topics: {
                "Market Dynamics": {
                    topic: "Market Dynamics",
                    lessons: [
                        { title: "Supply, Demand, and Resource Allocation", objective: "Analyze how the choices of buyers and sellers determine supply, demand, market prices, and resource allocation.", standard: "12.E2b" },
                        { title: "Factor Markets and Employment", objective: "Understand how supply and demand in factor markets determine employment and the price of resources.", standard: "12.E2c" }
                    ]
                }
            }
        },
        "12.E3 THE IMPACT OF AMERICAN CAPITALISM": {
            unit: "12.E3 THE IMPACT OF AMERICAN CAPITALISM",
            topics: {
                "The American Economy": {
                    topic: "The American Economy",
                    lessons: [
                        { title: "Evolution of the US Workforce", objective: "Understand how the US has evolved from an agrarian to an industrial to an information economy.", standard: "12.E3a" },
                        { title: "Government's Role in the Workplace", objective: "Analyze the government’s evolving role in protecting property rights and regulating working conditions.", standard: "12.E3b" },
                        { title: "Entrepreneurialism and its Consequences", objective: "Analyze the intended and unintended consequences of entrepreneurialism in the US economy.", standard: "12.E3c" },
                        { title: "Economic Inequality", objective: "Debate the degree to which economic inequality reflects injustices versus individual choices and the role of government.", standard: "12.E3e" }
                    ]
                }
            }
        },
        "12.E4 THE TOOLS OF ECONOMIC POLICY": {
            unit: "12.E4 THE TOOLS OF ECONOMIC POLICY",
            topics: {
                "Economic Policy Tools": {
                    topic: "Economic Policy Tools",
                    lessons: [
                        { title: "Economic Goals and Indicators", objective: "Understand how policymakers establish economic goals related to indicators like GNP, GDP, and CPI.", standard: "12.E4a" },
                        { title: "Fiscal Policy", objective: "Understand how the President and Congress determine fiscal policy through spending and taxing.", standard: "12.E4b" },
                        { title: "Monetary Policy", objective: "Understand the role of the Federal Reserve in managing the nation’s monetary policy.", standard: "12.E4c" },
                        { title: "Trade Policy", objective: "Examine how trade policies and agreements set the rules for trade between the US and other nations.", standard: "12.E4d" }
                    ]
                }
            }
        }
    }
};
