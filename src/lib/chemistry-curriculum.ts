
type Lesson = {
    title: string;
    objective: string;
};

type Topic = {
    topic: string;
    lessons: Lesson[];
};

type Unit = {
    unit: string;
    topics: { [key: string]: Topic };
};

export const chemistryCurriculum: {
    units: { [key: string]: Unit };
} = {
    units: {
        "Unit 1: Finding, Making, and Recycling Substances for Survival": {
            unit: "Unit 1: Finding, Making, and Recycling Substances for Survival",
            topics: {
                "Lesson Set 1: How can we find water and other substances we need to survive on other objects in space?": {
                    topic: "Lesson Set 1: How can we find water and other substances we need to survive on other objects in space?",
                    lessons: [
                        { title: "Lesson 1: What substances would we need and how would we get them to live and work beyond Earth?", objective: "Examine a video of NASA's future plans, identify criteria and constraints for living beyond Earth, develop models of chemical reactions, and brainstorm investigations for a Driving Question Board." },
                        { title: "Lesson 2: How does water support life and chemical reactions?", objective: "Discuss chemical reactions involving water, explore water's properties through investigation stations, and integrate information." },
                        { title: "Lesson 3: How can we find evidence of the water we need on the surfaces of other objects in space?", objective: "Develop a 'Surface Features and Causes' poster using photos of Earth, the Moon, and Mars to infer geologic processes." },
                        { title: "Lesson 4: How and why do water and other liquids interact with materials to make surface features?", objective: "Investigate liquid-material interactions to determine if Mars's features were water-made, examine molecular models to compare polarities." },
                        { title: "Lesson 5: How can we tell what is in the atmosphere (and just below the surface) of objects in space?", objective: "Use a spectrometer to investigate light absorption and transmission by pure substances and create graphical displays; use reference spectra to identify gases in mixtures and space atmospheres." }
                    ]
                },
                "Lesson Set 2: Why do we need certain types of atoms to create the substances we need?": {
                    topic: "Lesson Set 2: Why do we need certain types of atoms to create the substances we need?",
                    lessons: [
                        { title: "Lesson 6: What patterns are there between the types of atoms and the number of bonds they form in the resources we need?", objective: "Identify patterns in subatomic particles and bond numbers, then organize elements based on these patterns." },
                        { title: "Lesson 7: Why is there a difference between the number of electrons an element has and the number of bonds an element forms?", objective: "Examine new models of atomic structure and evaluate their usefulness for explaining interactions between elements (bonds)." },
                        { title: "Lesson 8: Could another substance serve as a substitute for water for some of the processes we need to use it for in space?", objective: "Predict if another substance can replace water, model H2O and H2S structures, explain electronegativity differences, and simulate their effects on bonds and polarity." },
                        { title: "Lesson 9: How can the ideas we developed be applied to making a possible substitute for another substance?", objective: "Describe bond characteristics in salt, wood, and metal; consider salt substitutes; complete Mid-Point Assessment." }
                    ]
                },
                "Lesson Set 3: How can we make the substances we need to survive off of Earth using the existing matter in the solar system?": {
                    topic: "Lesson Set 3: How can we make the substances we need to survive off of Earth using the existing matter in the solar system?",
                    lessons: [
                        { title: "Lesson 10: Why do we need water in so many reactions?", objective: "Revisit Lesson 1 processes with more reaction information, read about copper cleaning from water via precipitate formation, and model the reaction." },
                        { title: "Lesson 11: How can we grow food in space?", objective: "Read about growing plants in space, model differences between ammonia (NH3) and ammonium (NH4+), read about perchlorate ions in Martian soil, and model chemical reactions." },
                        { title: "Lesson 12: Which location(s) in the solar system has the elements we need and what relative amount is required to make any substance?", objective: "Balance chemical equations by adding coefficients, obtain information about cement production using Martian substances." }
                    ]
                },
                "Lesson Set 4: How can we be more sustainable in what we use and produce?": {
                    topic: "Lesson Set 4: How can we be more sustainable in what we use and produce?",
                    lessons: [
                        { title: "Lesson 13: Why can we recycle some of the substances we need and not others?", objective: "Synthesize information on recycling to answer questions about which substances are recyclable and why, and apply this to long-term plans for living on and beyond Earth." },
                        { title: "Lesson 14: What are some more sustainable approaches we are developing to help us make the things we need off of Earth and on it?", objective: "Read articles on innovative materials technologies, share and evaluate arguments, then share evaluations with other groups." },
                        { title: "Lesson 15: What is the full impact of going to space?", objective: "Read about space travel perspectives, balance a final equation, close out the Driving Question Board, and complete a transfer task on soap scum formation." }
                    ]
                }
            }
        },
        "Unit 2: Protecting Oysters and Ecosystems": {
            unit: "Unit 2: Protecting Oysters and Ecosystems",
            topics: {
                "Lesson Set 1: What large and small-scale processes make water more or less acidic?": {
                    topic: "Lesson Set 1: What large and small-scale processes make water more or less acidic?",
                    lessons: [
                        { title: "Lesson 1: What is happening to oysters?", objective: "Explore cases, analyze data, and read about atmospheric CO2 entering the ocean, making it acidic and harming oysters. Develop an initial model and Driving Question Board." },
                        { title: "Lesson 2: How can we break down the problem so we can solve it?", objective: "Break down the oyster die-off problem, revisit the classroom consensus model from Lesson 1, consider multi-scale actions, and develop arguments for pursuing specific subproblems and solutions in chemistry class." },
                        { title: "Lesson 3: Can carbon dioxide make the ocean more acidic?", objective: "Brainstorm substances with water and CO2, plan an investigation to test if CO2-water solutions are acidic, read about pH, and explore a pH website." },
                        { title: "Lesson 4: What is it about a substance that determines whether it produces more or fewer H+ or OH- ions when it is added to water?", objective: "Use molecular formulas to predict acid/base/neutral substances, use mathematical thinking to compare particle quantities and concentrations, conduct an investigation, and develop a model." },
                        { title: "Lesson 5: How does carbon dioxide move between the atmosphere and ocean systems to cause the water to become more acidic?", objective: "Investigate how CO2 naturally dissolves in water experimentally, examine atmospheric and hydrospheric CO2 amounts." },
                        { title: "Lesson 6: How can acidic water become less acidic again?", objective: "Use a simulation to investigate how acidic water can become less acidic, argue for a reversible reaction reaching equilibrium, and use data to determine relationships between bond strength, stability, and reaction reversibility." },
                        { title: "Lesson 7: How can we use what we have learned to help protect oysters?", objective: "Discuss the importance of learning from directly affected people, read about interested parties, brainstorm additional criteria and constraints for engineering design solutions, and complete an assessment on pH changes with ion concentration." }
                    ]
                },
                "Lesson Set 2: What mathematical models can help us determine the scale of the reactions needed to save oysters?": {
                    topic: "Lesson Set 2: What mathematical models can help us determine the scale of the reactions needed to save oysters?",
                    lessons: [
                        { title: "Lesson 8: How can we figure out how much of a substance we need to neutralize acid?", objective: "Model acid-base neutralization, argue that balanced chemical equations represent mass ratios, test this model (revealing particle-number ratios), apply a mathematical model using these ratios and molar masses to predict base needed for neutralization, and conduct a second neutralization investigation." },
                        { title: "Lesson 9: How much NaOH would we need to add to make ocean water safe for oysters?", objective: "Use mathematical thinking to determine grams of base needed to restore ocean pH for baby oysters. Consider feasibility, effectiveness, and safety for other organisms." },
                        { title: "Lesson 10: How does ocean acidification hurt oysters?", objective: "Investigate how different pH levels affect oyster shells, read about the oyster life cycle." },
                        { title: "Lesson 11: How can we help oysters build shells quickly?", objective: "Design an investigation to test temperature and concentration influence on reaction product yield, build a particle model of reaction rate, and use it to identify effects of adding calcium carbonate." }
                    ]
                },
                "Lesson Set 3: How can engineering design help us determine the best process to save oysters?": {
                    topic: "Lesson Set 3: How can engineering design help us determine the best process to save oysters?",
                    lessons: [
                        { title: "Lesson 12: What criteria and constraints do we need to consider when designing solutions to help protect oysters?", objective: "Develop and narrow down a class list of solutions based on design criteria/constraints, community priorities, and existing knowledge. Choose a promising solution for group development." },
                        { title: "Lesson 13: How can we apply our science ideas to develop a solution to help protect oysters?", objective: "Brainstorm information to refine solutions, criteria, and constraints. Work in groups to choose a site profile and design a solution. Share plans with another group, then quantify data to complete the design." },
                        { title: "Lesson 14: How well do our different design solutions address our criteria and constraints?", objective: "Identify main points and guiding criteria of design solutions. Present designs for peer feedback, then refine. Discuss chemistry and Earth science ideas used in solutions to reach consensus." },
                        { title: "Lesson 15: How can we apply our learning to other situations?", objective: "Refine solutions, review the Driving Question Board, and complete a transfer task assessment on the Haber-Bosch process." }
                    ]
                }
            }
        },
        "Unit 3: Slowing Energy Flow to Protect Coastal Communities": {
            unit: "Unit 3: Slowing Energy Flow to Protect Coastal Communities",
            topics: {
                "Lesson Set 1: Why and how is the sea level rising?": {
                    topic: "Lesson Set 1: Why and how is the sea level rising?",
                    lessons: [
                        { title: "Lesson 1: How are sea levels rising and forcing people to move?", objective: "Explore affected coastal communities, develop community agreements, a class consensus model, a Driving Question Board, and investigation ideas." },
                        { title: "Lesson 2: What can the past help us figure out about what is causing sea level rise in the present?", objective: "Examine historical data on temperature, polar ice volume, sea level, and possible causes. Discuss and model the likely cause of current ice melt and sea level rise." },
                        { title: "Lesson 3: How does carbon dioxide contribute to climate change?", objective: "Investigate, model, and read about how increased atmospheric CO2 causes warmer temperatures." },
                        { title: "Lesson 4: What would happen if the Earth's ice melted?", objective: "Develop a mathematical model to calculate sea level impact from melting Greenland and Antarctica ice. Evaluate with a sea level simulation, noticing Arctic Ocean ice omission. Investigate if ice in water affects water level upon melting." }
                    ]
                },
                "Lesson Set 2: What solutions could help slow polar ice melt?": {
                    topic: "Lesson Set 2: What solutions could help slow polar ice melt?",
                    lessons: [
                        { title: "Lesson 5: How can we best slow or stop the land ice melt?", objective: "Use satellite images and modern design ideas to consider glacier melt mitigations." },
                        { title: "Lesson 6: Why would some engineers want to sprinkle glass microbeads on the Arctic?", objective: "Plan an investigation on how microbeads prevent ice melt. Read about light energy and explain how CO2 causes temperature increases and how beads help prevent melt. Reflect on who decides to use microbeads." },
                        { title: "Lesson 7: How do feedback loops affect Earth's systems?", objective: "Discuss who should decide on microbead use, read about feedback loops, engage with a mid-unit assessment, and check the Driving Question Board." }
                    ]
                },
                "Lesson Set 3: How well would the berm solution work in the context of Earth systems?": {
                    topic: "Lesson Set 3: How well would the berm solution work in the context of Earth systems?",
                    lessons: [
                        { title: "Lesson 8: What is going on where the ice meets the water?", objective: "Pose questions about the ice-ocean interface, learn from experts to frame hypotheses on how solutions affect energy flows." },
                        { title: "Lesson 9: Why does warm salty water sink to melt a glacier?", objective: "Create water models under different conditions, investigate mass and volume, graph results, and calculate densities." },
                        { title: "Lesson 10: How can we measure the energy transfer a berm prevents?", objective: "Use investigation, simulations, and mathematical modeling to examine energy transfer during direct contact." },
                        { title: "Lesson 11: How does heat affect the amount of ice melt?", objective: "Reflect on the heat equation's fit in the energy transfer model. Plan and conduct an investigation measuring water temperature change and melting ice mass change. Figure out the energy required to melt ice from the data's best-fit line." },
                        { title: "Lesson 12: How can we slow the flow of energy on Earth to protect vulnerable coastal communities?", objective: "Develop a mathematical model to evaluate the berm solution and calculate its impact on ice melt. Brainstorm ideas for an expanded computational model to include the Earth system beyond the glacier." },
                        { title: "Lesson 13: How can we model what will happen to Earth's climate if humans make changes?", objective: "Read about climate modeling, develop and test questions with a computational model. Discuss results and reflect. Close out Driving Question Board and complete a transfer task on indoor heating in a changing climate." }
                    ]
                }
            }
        },
        "Unit 4: Evaluating Fuels and Transportation Options": {
            unit: "Unit 4: Evaluating Fuels and Transportation Options",
            topics: {
                "Lesson Set 1: How do carbon-based fuels release energy?": {
                    topic: "Lesson Set 1: How do carbon-based fuels release energy?",
                    lessons: [
                        { title: "Lesson 1: What different fuels have we used, and do we currently use, for transportation?", objective: "Analyze data on carbon emissions to consider fuels for future vehicles." },
                        { title: "Lesson 2: What is happening to the fuels inside the engine to make the vehicle move?", objective: "Watch demonstrations, examine models, and revise models based on new information." },
                        { title: "Lesson 3: How can diesel engines be working so differently from gasoline engines?", objective: "Examine relationships between pressure, volume, and temperature of air in a closed system. Use Combined Gas Law to quantify these relationships." },
                        { title: "Lesson 4: Why do we need to put energy into the system to start the reaction?", objective: "Use marbles and a computer model to examine bond breaking in combustion." },
                        { title: "Lesson 5: How and why is energy released when we burn carbon-based fuels?", objective: "Investigate bond formation using magnet marbles and a simulation. Observe forces and energy changes. Update the class consensus model with energy transfers during bond breaking and formation. Read about carbon-based fuel energy sources. Complete an exit ticket." },
                        { title: "Lesson 6: How does the amount of energy we put into the reaction system compare to the energy we get out?", objective: "Use a physical model and simulation to examine kinetic energy changes during bond breaking and formation." },
                        { title: "Lesson 7: How can fuels release different amounts of energy when they all have bonds breaking and forming?", objective: "Revisit energy involvement in bond breaking/formation to understand how atom types affect bond energy. Use bond energies to create visual/mathematical representations of energy transfer during methane combustion. Revisit the Driving Question Board." },
                        { title: "Lesson 8: How does our understanding of carbon-based fuels inform our decision-making?", objective: "Explain and model why carbon-based fuels provide energy. Consider CO2 emission impacts and return to Progress Trackers. Check the Driving Question Board and complete a mid-unit assessment on hot/cold packs." }
                    ]
                },
                "Lesson Set 2: How do fuels that are not carbon based release energy?": {
                    topic: "Lesson Set 2: How do fuels that are not carbon based release energy?",
                    lessons: [
                        { title: "Lesson 9: Where is the energy coming from (and what are some trade-offs) when we use batteries to power vehicles?", objective: "Learn about EV benefits and drawbacks. Analyze battery images, conduct investigations with different metal electrodes, and analyze current data from electrolytes. Develop a battery design proposal for highest energy output rate." },
                        { title: "Lesson 10: How can we use hydrogen as a fuel and what are the impacts?", objective: "Learn how fuel cells generate electricity from hydrogen. Determine that most hydrogen production from methane emits CO2. Identify hydrogen refueling and battery recharging station locations." },
                        { title: "Lesson 11: Where is the energy coming from when we use uranium as a fuel?", objective: "Examine nuclear processes' similarities and differences to chemical reactions using M-E-F thinking. Jigsaw readings on uranium fuel concerns and update Progress Trackers." },
                        { title: "Lesson 12: How can our knowledge of fuel trade-offs support our evaluation of future rocket fuels?", objective: "Observe a video of astronauts reaching Mars. Develop criteria/constraints for rocket fuel selection. Read an article comparing chemical and nuclear rockets. Rank criteria/constraints and compare rocket types. Individually argue for future space mission fuel use." }
                    ]
                },
                "Lesson Set 3: How can we use what we have learned to improve our transportation system?": {
                    topic: "Lesson Set 3: How can we use what we have learned to improve our transportation system?",
                    lessons: [
                        { title: "Lesson 13: Why do we use some fuels rather than others?", objective: "Create a draft decision matrix to evaluate two transportation solutions based on environmental impact. Realize initial criteria/constraints are too complex and need subcategories. Update the consensus decision matrix with subcategories for other criteria/constraints." },
                        { title: "Lesson 14: How do we decide on the best transportation options for our future?", objective: "Use data from various sources to evaluate transportation options and argue for future best choices." },
                        { title: "Lesson 15: How can we make transportation decisions to benefit our communities and Earth?", objective: "Use prioritized criteria, Lesson 14 arguments, and feedback to propose a final transportation design solution. Reflect on unit and course progress." }
                    ]
                }
            }
        },
        "Unit 5: Understanding Lightning and Safety": {
            unit: "Unit 5: Understanding Lightning and Safety",
            topics: {
                "Lesson Set 1: What is lightning?": {
                    topic: "Lesson Set 1: What is lightning?",
                    lessons: [
                        { title: "Lesson 1: When and where does lightning occur and what are its impacts?", objective: "Watch videos, engage with stories, and analyze data patterns to determine lightning formation and location safety." },
                        { title: "Lesson 2: What parts of the (smaller-scale) system might be causing the (smaller-scale) lightning?", objective: "Analyze graphical data and examine a physical model to assess the causal relationship between falling water and lightning formation." },
                        { title: "Lesson 3: What is the spark in the water dropper system and what else is happening in the system before it appears?", objective: "Conduct two rounds of investigations by adding different test objects to the water dropper system. Record observations, develop a model illustrating force patterns, discuss force and energy transfer patterns, and identify related phenomena (static)." },
                        { title: "Lesson 4: What happens when we produce static electricity?", objective: "Use several objects to investigate attractions and repulsions in different materials when rubbed together." },
                        { title: "Lesson 5: What is happening at a particle level to produce static effects?", objective: "Investigate more static interactions. Use readings and simulations to develop atomic structure models to explain observed interactions." }
                    ]
                },
                "Lesson Set 2: What causes a lightning strike?": {
                    topic: "Lesson Set 2: What causes a lightning strike?",
                    lessons: [
                        { title: "Lesson 6: What causes static in a lightning system?", objective: "Use reading information to compare lightning systems to in-class static systems." },
                        { title: "Lesson 7: How are electrostatic forces between objects affected by the amount of charge and the distance between them?", objective: "Investigate how electrostatic forces are affected by charge amount and distance. Compare graphs, identify patterns, evaluate a mathematical model (Coulomb's law), and use algebra to predict larger-scale changes." },
                        { title: "Lesson 8: How can something that is neutral have an attractive or repulsive interaction with another object without any contact?", objective: "Use a simulation and paper-clip models to explain what happens in neutral object atoms when interacting with charged objects." },
                        { title: "Lesson 9: How can we revise our models to explain what we have figured out about the lightning system?", objective: "Create 'Gotta-Have-It Checklists' to develop updated models for lightning strike causes. Review the Driving Question Board and complete an assessment on static interactions and Coulomb's law." }
                    ]
                },
                "Lesson Set 3: How and why does a lightning strike transfer so much energy?": {
                    topic: "Lesson Set 3: How and why does a lightning strike transfer so much energy?",
                    lessons: [
                        { title: "Lesson 10: Where does the energy come from for lightning to strike across miles of air?", objective: "Analyze data showing large energy transfer in lightning. Use a computational model showing energy storage between charges." },
                        { title: "Lesson 11: Why do the electrons build up in the cloud and then jump to the ground suddenly?", objective: "Consider air properties to understand why electrons don't easily move through it. Research and evaluate sources to explain charge movement through air causing visible lightning." }
                    ]
                },
                "Lesson Set 4: What makes some places safer than others when lightning strikes?": {
                    topic: "Lesson Set 4: What makes some places safer than others when lightning strikes?",
                    lessons: [
                        { title: "Lesson 12: Why are some structures safer than others (and safer than being outside)?", objective: "Look at lightning safety data, read about lightning rods, and examine models of metals and nonmetals. Compare two lightning rod models, identifying merits and limitations." },
                        { title: "Lesson 13: Why are you supposed to get away from water when there is lightning nearby?", objective: "Determine that pure water doesn't conduct electricity. Argue that salt in water conducts electricity. Plan an investigation to test this. Evaluate models explaining investigation results. Explain how lightning striking water could kill geese." },
                        { title: "Lesson 14: Why are some places safer than others when lightning strikes?", objective: "Create a consensus 'Gotta-Have-It Checklist' to build models explaining lightning safety. Review Driving Question Board questions and complete an assessment." }
                    ]
                }
            }
        }
    }
};

    