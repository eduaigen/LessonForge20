
export type CurriculumContent = {
  [subject: string]: {
    units: {
      [unit: string]: {
        topics: {
          [topic: string]: {
            lessons: string[];
          }
        };
      };
    };
  };
};

export const curriculumData: {
  subjects: string[];
  grades: number[];
  content: CurriculumContent;
} = {
  subjects: ['AP Biology', 'Biology', 'Chemistry', 'Earth_Science', 'Physics', 'History', 'Literature', 'Health', 'Math'],
  grades: [9, 10, 11, 12],
  content: {
    'AP Biology': {
        units: {
            "Unit 1: Chemistry of Life": {
                topics: {
                    "Properties of Water": { lessons: ["Properties of Water - Part 1"] },
                    "Biological Macromolecules": { lessons: ["Biological Macromolecules - Part 2"] },
                    "pH and Buffers": { lessons: ["pH and Buffers - Part 3"] },
                    "Enzymes": { lessons: ["Enzymes - Part 4"] }
                }
            },
            "Unit 2: Cell Structure and Function": {
                topics: {
                    "Cell Organelles": { lessons: ["Cell Organelles - Part 1"] },
                    "Membrane Transport": { lessons: ["Membrane Transport - Part 2"] },
                    "Surface Area/Volume Ratio": { lessons: ["Surface Area/Volume Ratio - Part 3"] }
                }
            },
            "Unit 3: Cellular Energetics": {
                topics: {
                    "ATP & Enzymes": { lessons: ["ATP & Enzymes - Part 1"] },
                    "Photosynthesis": { lessons: ["Photosynthesis - Part 2"] },
                    "Cellular Respiration": { lessons: ["Cellular Respiration - Part 3"] }
                }
            },
            "Unit 4: Cell Communication and Cell Cycle": {
                topics: {
                    "Signal Transduction": { lessons: ["Signal Transduction - Part 1"] },
                    "Mitosis": { lessons: ["Mitosis - Part 2"] },
                    "Cancer": { lessons: ["Cancer - Part 3"] }
                }
            },
            "Unit 5: Heredity": {
                topics: {
                    "Mendelian Genetics": { lessons: ["Mendelian Genetics - Part 1"] },
                    "Meiosis": { lessons: ["Meiosis - Part 2"] },
                    "Inheritance Patterns": { lessons: ["Inheritance Patterns - Part 3"] }
                }
            },
            "Unit 6: Gene Expression and Regulation": {
                topics: {
                    "DNA Replication": { lessons: ["DNA Replication - Part 1"] },
                    "Transcription & Translation": { lessons: ["Transcription & Translation - Part 2"] },
                    "Gene Regulation": { lessons: ["Gene Regulation - Part 3"] }
                }
            },
            "Unit 7: Natural Selection": {
                topics: {
                    "Darwin & Evolution": { lessons: ["Darwin & Evolution - Part 1"] },
                    "Hardy-Weinberg": { lessons: ["Hardy-Weinberg - Part 2"] },
                    "Speciation": { lessons: ["Speciation - Part 3"] }
                }
            },
            "Unit 8: Ecology": {
                topics: {
                    "Ecosystems": { lessons: ["Ecosystems - Part 1"] },
                    "Energy Flow": { lessons: ["Energy Flow - Part 2"] },
                    "Population Ecology": { lessons: ["Population Ecology - Part 3"] },
                    "Human Impact": { lessons: ["Human Impact - Part 4"] }
                }
            },
            "AP Exam Review & Labs": {
                topics: {
                    "Review": { lessons: ["Review - Part 1"] },
                    "Practice FRQs": { lessons: ["Practice FRQs - Part 2"] },
                    "Lab Wrap-Ups": { lessons: ["Lab Wrap-Ups - Part 3"] },
                    "Mock Exams": { lessons: ["Mock Exams - Part 4"] }
                }
            }
        }
    },
    Biology: {
      units: {
        "How do ecosystems work, and how can understanding them help us protect them?": {
            topics: {
                "Ecosystems and Conservation": {
                    lessons: [
                        "Why do ecosystems need protection, and how are they protected?",
                        "What can other cases of conservation help us understand about ecosystems and conservation?",
                        "Why do the animals in the Serengeti migrate?",
                        "How is food driving the wildebeest migration?",
                        "How does food affect the population size?",
                        "Can we apply what we figured out about limiting factors and carrying capacity to a new scenario?",
                        "How do predators interact with the wildebeest migration?",
                        "What other components of the Serengeti system interact with the migration?",
                        "How do humans interact with the Serengeti ecosystem?",
                        "How do we evaluate if a conservation effort is working?",
                        "Can we use everything we have figured out about ecosystems and conservation to expand conservation to new lands and waters?"
                    ]
                }
            }
        },
        "What causes fires in ecosystems to burn and how should we manage them?": {
            topics: {
                "Fires, Energy, and Matter": {
                    lessons: [
                        "How can fires burn under ice and release so much energy and matter?",
                        "What is peat and why does it burn so much?",
                        "Why is there so much peat that has not decomposed in the permafrost?",
                        "How did so much plant energy and matter get into the peat in the zombie fire system?",
                        "Could changes in the Earth's tilt cause more energy and matter to be stored in plants?",
                        "How do zombie fires disrupt the flow of energy and cycle of matter in Arctic ecosystems?",
                        "What is happening to carbon sinks in other ecosystems?",
                        "Why should we be concerned that carbon sinks around the world are burning?",
                        "What are the global effects of increased carbon dioxide from fires?",
                        "How can we help manage the matter and energy in fire systems?",
                        "What decisions can we make to help manage fire in communities we care about?",
                        "Can we use everything we have figured out about fires to explain a new phenomenon?"
                    ]
                }
            }
        },
        "Who gets cancer and why? Where should we focus efforts on treatment and prevention?": {
            topics: {
                "Cancer, Genetics, and Environment": {
                    lessons: [
                        "Who gets cancer and why?",
                        "What is cancer?",
                        "How do non-cancer cells become cancer cells?",
                        "Why are some kinds of cancer more common than others in older and taller people?",
                        "How do cancer cells end up with differences in their chromosomes and what is the role of p53 in preventing the differences?",
                        "How do we make p53, and why is it different sometimes?",
                        "What is the genetic basis of cancer?",
                        "Why do some cancers appear to run in families?",
                        "How do genes interact with the environment to affect who gets cancer?",
                        "How do cancer treatments work?",
                        "What can we do to support people in our communities who have cancer?"
                    ]
                }
            }
        },
        "Natural Selection & Evolution of Populations": {
            topics: {
                "Urbanization and Adaptation": {
                    lessons: [
                        "What is the effect of increasing urbanization on nonhuman populations?",
                        "Why does hawksbeard make fewer feathery seeds in cities?",
                        "Is poison a selection pressure?",
                        "What causes populations of city juncos to be bolder than mountain juncos?",
                        "How can we make sense of the way urbanization could have caused changes in hawksbeard, rat, and junco populations?",
                        "Can we apply what we know about evolution by natural selection to another phenomenon?",
                        "What happens when nonhuman populations are harmed by urbanization and what can we do about it?",
                        "How can fragmentation lead to lower genetic diversity?",
                        "How can we plan urban areas to protect genetic diversity in nonhuman populations?",
                        "How can we use what we know about natural selection to design cities that support resilient populations and ecosystems?",
                        "Can we apply what we know about natural selection and genetic diversity to a novel phenomenon?"
                    ]
                }
            }
        },
        "What will happen to Arctic bear populations as their environment changes?": {
            topics: {
                "Climate Change and Speciation": {
                    lessons: [
                        "How do changes in climate affect bear species coming together for the first time in the Arctic?",
                        "How and why are bear species interacting and why might brown bears dominate?",
                        "How similar/different are the polar, brown, and black bears?",
                        "How did polar and brown bears become different species?",
                        "What will happen to Arctic bear populations as their environment changes?",
                        "What will happen to bear species in the Arctic in the future?",
                        "How do past patterns of extinction help us understand possible consequences of extinctions now and in the future?",
                        "What are our options for protecting species from extinction and should we implement them?",
                        "Can we use everything we have figured out about speciation to explain a new phenomenon?"
                    ]
                }
            }
        }
      }
    },
    'Earth_Science': {
        units: {
            "Unit 1: Discovering New Worlds": {
                topics: {
                    "How do we know what’s out there in space?": { lessons: ["Anchor Phenomenon - How do we know what’s out there in space?"] },
                    "Naked-Eye Observations": { lessons: ["Naked-Eye Observations"] },
                    "Tools for Observation": { lessons: ["Tools for Observation"] },
                    "Earth's Rotation": { lessons: ["Earth's Rotation"] },
                    "Moon Phases": { lessons: ["Moon Phases"] },
                    "Eclipses": { lessons: ["Eclipses"] },
                    "Sun's Apparent Path": { lessons: ["Sun's Apparent Path"] },
                    "Seasonal Changes": { lessons: ["Seasonal Changes"] },
                    "Solar Energy": { lessons: ["Solar Energy"] },
                    "Light from Stars": { lessons: ["Light from Stars"] },
                    "The H-R Diagram": { lessons: ["The H-R Diagram"] },
                    "Galaxies": { lessons: ["Galaxies"] },
                    "Final Performance Task: Discovering New Worlds": { lessons: ["Final Performance Task"] }
                }
            },
            "Unit 2: Earthquakes, Volcanoes, and Tsunamis: Who's at Risk?": {
                topics: {
                    "Natural Hazard Risk": { lessons: ["Anchor Phenomenon - Natural Hazard Risk"] },
                    "Earth's Layers": { lessons: ["Earth's Layers"] },
                    "Plate Tectonics": { lessons: ["Plate Tectonics"] },
                    "Plate Boundaries": { lessons: ["Plate Boundaries"] },
                    "Earthquakes": { lessons: ["Earthquakes"] },
                    "Volcanoes": { lessons: ["Volcanoes"] },
                    "Mapping Hazards": { lessons: ["Mapping Hazards"] },
                    "Tsunami Risk": { lessons: ["Tsunami Risk"] },
                    "Social Vulnerability": { lessons: ["Social Vulnerability"] },
                    "Engineering for Earthquakes": { lessons: ["Engineering for Earthquakes"] },
                    "Community Resilience": { lessons: ["Community Resilience"] },
                    "Final Performance Task: Risk Assessment": { lessons: ["Final Performance Task"] }
                }
            },
            "Unit 3: Climate Change Throughout Human History": {
                topics: {
                    "Past & Future Climate": { lessons: ["Anchor Phenomenon - Past & Future Climate"] },
                    "Ice Cores": { lessons: ["Ice Cores"] },
                    "Analyzing Ice Core Data": { lessons: ["Analyzing Ice Core Data"] },
                    "The Greenhouse Effect": { lessons: ["The Greenhouse Effect"] },
                    "The Carbon Cycle": { lessons: ["The Carbon Cycle"] },
                    "Human Impact on Climate": { lessons: ["Human Impact on Climate"] },
                    "Sea Level Rise": { lessons: ["Sea Level Rise"] },
                    "Ecosystem Impacts": { lessons: ["Ecosystem Impacts"] },
                    "Mitigation Strategies": { lessons: ["Mitigation Strategies"] },
                    "Geoengineering": { lessons: ["Geoengineering"] },
                    "Final Performance Task: Climate Communication": { lessons: ["Final Performance Task"] }
                }
            },
            "Unit 4: More Hurricanes and Blizzards in NYC?": {
                topics: {
                    "Extreme Weather": { lessons: ["Anchor Phenomenon - Extreme Weather"] },
                    "Weather vs. Climate": { lessons: ["Weather vs. Climate"] },
                    "Air Masses and Fronts": { lessons: ["Air Masses and Fronts"] },
                    "Hurricane Formation": { lessons: ["Hurricane Formation"] },
                    "Hurricane Data Analysis": { lessons: ["Hurricane Data Analysis"] },
                    "Climate Change and Hurricanes": { lessons: ["Climate Change and Hurricanes"] },
                    "Blizzard Formation": { lessons: ["Blizzard Formation"] },
                    "Blizzard Data Analysis": { lessons: ["Blizzard Data Analysis"] },
                    "Infrastructure Vulnerability": { lessons: ["Infrastructure Vulnerability"] },
                    "Designing for Resilience": { lessons: ["Designing for Resilience"] },
                    "Final Performance Task: Infrastructure Proposal": { lessons: ["Final Performance Task"] }
                }
            },
            "Unit 5: Solutions for a Sustainable Future": {
                topics: {
                    "Fossil Fuels and Energy": { lessons: ["Fossil Fuels and Energy"] },
                    "Pollution and Environmental Effects": { lessons: ["Air Pollution", "Water Pollution", "Acid Rain", "The Ozone Layer"] },
                    "Renewable and Alternative Energy": { lessons: ["Renewable Energy", "Nuclear Energy", "Energy Efficiency", "Policy Solutions", "Individual Action"] },
                    "Land Use & Biodiversity": { lessons: ["Deforestation", "Urbanization", "Agriculture", "Biodiversity", "Habitat Destruction", "Conservation"] },
                    "Mining and Resources": { lessons: ["Mineral Resources", "Mining Techniques", "Environmental Impacts of Mining", "Social Impacts of Mining", "Sustainable Mining Practices", "Recycling Minerals", "Conflict Minerals"] },
                    "Unit Closing: Sustainability Project": { lessons: ["Stakeholder Meeting Simulation", "Sustainability Plan", "Final Presentation"] }
                }
            },
            "Unit 6: Probability of Life Elsewhere": {
                topics: {
                    "Solar System Stability": { lessons: ["Gravity and Orbits", "The Goldilocks Zone", "Earth's Magnetic Field", "The Role of Jupiter", "The Moon's Influence", "Long-Term Stability", "Exoplanets"] },
                    "Coevolution of Earth and Life": { lessons: ["Early Earth", "Origin of Life", "Photosynthesis and Oxygen", "Mass Extinctions", "Humans and the Biosphere"] },
                    "Origin of the Universe": { lessons: ["The Big Bang", "Evidence for the Big Bang", "Stellar Evolution", "Formation of Elements", "The Drake Equation"] },
                    "Asteroids and Planetary Defense": { lessons: ["Asteroids and Comets", "Impact Events", "Near-Earth Objects", "Planetary Defense", "The Search for Extraterrestrial Intelligence (SETI)"] },
                    "Final Performance Task: Astrobiology Report": { lessons: ["Final Performance Task"] }
                }
            }
        }
    },
    Chemistry: {
      units: {
        "Why are oysters dying, and how can we use chemistry to protect them?": {
          topics: {
            "What large and small-scale processes make water more or less acidic?": {
              lessons: [
                "What is happening to oysters?",
                "How can we break down the problem so we can solve it?",
                "Can carbon dioxide make the ocean more acidic?",
                "What is it about a substance that determines whether it produces more or fewer H+ or OH- ions when it is added to water?",
                "How does carbon dioxide move between the atmosphere and ocean systems to cause the water to become more acidic?",
                "How can acidic water become less acidic again?",
                "How can we use what we have learned to help protect oysters?",
              ],
            },
            "What mathematical models can help us determine the scale of the reactions needed to save oysters?": {
              lessons: [
                "How can we figure out how much of a substance we need to neutralize acid?",
                "How much NaOH would we need to add to make ocean water safe for oysters?",
                "How does ocean acidification hurt oysters?",
                "How can we help oysters build shells quickly?",
              ],
            },
            "How can engineering design help us determine the best process to save oysters?": {
              lessons: [
                "What criteria and constraints do we need to consider when designing solutions to help protect oysters?",
                "How can we apply our science ideas to develop a solution to help protect oysters?",
                "How well do our different design solutions address our criteria and constraints?",
                "How can we apply our learning to other situations?",
              ],
            },
          },
        },
        "How can we slow the flow of energy on Earth to protect vulnerable coastal communities?": {
          topics: {
            "Why and how is the sea level rising?": {
              lessons: [
                "How are sea levels rising and forcing people to move?",
                "What can the past help us figure out about what is causing sea level rise in the present?",
                "How does carbon dioxide contribute to climate change?",
                "What would happen if the Earth's ice melted?",
              ],
            },
            "What solutions could help slow polar ice melt?": {
              lessons: [
                "How can we best slow or stop the land ice melt?",
                "Why would some engineers want to sprinkle glass microbeads on the Arctic?",
                "How do feedback loops affect Earth's systems?",
              ],
            },
            "How well would the berm solution work in the context of Earth systems?": {
              lessons: [
                "What is going on where the ice meets the water?",
                "Why does warm salty water sink to melt a glacier?",
                "How can we measure the energy transfer a berm prevents?",
                "How does heat affect the amount of ice melt?",
                "How can we slow the flow of energy on Earth to protect vulnerable coastal communities?",
                "How can we model what will happen to Earth's climate if humans make changes?",
              ],
            },
          },
        },
        "What causes lightning and why are some places safer than others when it strikes?": {
          topics: {
            "What is lightning?": {
              lessons: [
                "When and where does lightning occur and what are its impacts?",
                "What parts of the (smaller-scale) system might be causing the (smaller-scale) lightning?",
                "What is the spark in the water dropper system and what else is happening in the system before it appears?",
                "What happens when we produce static electricity?",
                "What is happening at a particle level to produce static effects?",
              ],
            },
            "What causes a lightning strike?": {
              lessons: [
                "What causes static in a lightning system?",
                "How are electrostatic forces between objects affected by the amount of charge and the distance between them?",
                "How can something that is neutral have an attractive or repulsive interaction with another object without any contact?",
                "How can we revise our models to explain what we have figured out about the lightning system?",
              ],
            },
            "How and why does a lightning strike transfer so much energy?": {
              lessons: [
                "Where does the energy come from for lightning to strike across miles of air?",
                "Why do the electrons build up in the cloud and then jump to the ground suddenly?",
              ],
            },
            "What makes some places safer than others when lightning strikes?": {
              lessons: [
                "Why are some structures safer than others (and safer than being outside)?",
                "Why are you supposed to get away from water when there is lightning nearby?",
                "Why are some places safer than others when lightning strikes?",
              ],
            },
          },
        },
        "How can chemistry help us evaluate fuels and transportation options to benefit the Earth and our communities?": {
          topics: {
            "How do carbon-based fuels release energy?": {
              lessons: [
                "What different fuels have we used, and do we currently use, for transportation?",
                "What is happening to the fuels inside the engine to make the vehicle move?",
                "How can diesel engines be working so differently from gasoline engines?",
                "Why do we need to put energy into the system to start the reaction?",
                "How and why is energy released when we burn carbon-based fuels?",
                "How does the amount of energy we put into the reaction system compare to the energy we get out?",
                "How can fuels release different amounts of energy when they all have bonds breaking and forming?",
                "How does our understanding of carbon-based fuels inform our decision-making?",
              ],
            },
            "How do fuels that are not carbon based release energy?": {
              lessons: [
                "Where is the energy coming from (and what are some trade-offs) when we use batteries to power vehicles?",
                "How can we use hydrogen as a fuel and what are the impacts?",
                "Where is the energy coming from when we use uranium as a fuel?",
                "How can our knowledge of fuel trade-offs support our evaluation of future rocket fuels?",
              ],
            },
            "How can we use what we have learned to improve our transportation system?": {
              lessons: [
                "Why do we use some fuels rather than others?",
                "How do we decide on the best transportation options for our future?",
                "How can we make transportation decisions to benefit our communities and Earth?",
              ],
            },
          },
        },
        "How can we find, make, and recycle the substances we need to live on and beyond Earth?": {
          topics: {
            "How can we find water and other substances we need to survive on other objects in space?": {
              lessons: [
                "What substances would we need and how would we get them to live and work beyond Earth?",
                "How does water support life and chemical reactions?",
                "How can we find evidence of the water we need on the surfaces of other objects in space?",
                "How and why do water and other liquids interact with materials to make surface features?",
                "How can we tell what is in the atmosphere (and just below the surface) of objects in space?",
              ],
            },
            "Why do we need certain types of atoms to create the substances we need?": {
              lessons: [
                "What patterns are there between the types of atoms and the number of bonds they form in the resources we need?",
                "Why is there a difference between the number of electrons an element has and the number of bonds an element forms?",
                "Could another substance serve as a substitute for water for some of the processes we need to use it for in space?",
                "How can the ideas we developed be applied to making a possible substitute for another substance?",
              ],
            },
            "How can we make the substances we need to survive off of Earth using the existing matter in the solar system?": {
              lessons: [
                "Why do we need water in so many reactions?",
                "How can we grow food in space?",
                "Which location(s) in the solar system has the elements we need and what relative amount is required to make any substance?",
              ],
            },
            "How can we be more sustainable in what we use and produce?": {
              lessons: [
                "Why can we recycle some of the substances we need and not others?",
                "What are some more sustainable approaches we are developing to help us make the things we need off of Earth and on it?",
                "What is the full impact of going to space?",
              ],
            },
          },
        },
      },
    },
    Physics: {
      units: {
        "Forces in Earth's Interior": {
          topics: {
            "Land Stretching and Breaking": {
              lessons: [
                "What is happening in the Afar region?",
                "What allows a system to remain stable when forces are acting on it, and what causes it to suddenly change?",
                "What happens to the matter and energy in a system when the magnitude of balanced forces on it increases?",
                "What is changing in the matter at a particle level before an earthquake, and when a solid elastically deforms or breaks?",
                "How do we investigate the connection between matter in Earth's interior and surface features above?",
                "How is temperature related to the behavior of the matter in the mantle?",
                "Where does the energy that drives convection come from?",
              ],
            },
          },
        },
      },
    },
    History: {
      units: {
        "Foundations of Civilization": {
          topics: {
            "Early Humans": { lessons: ["Early Humans"] },
            "Neolithic Revolution": { lessons: ["Neolithic Revolution"] },
            "River Valley Civilizations": { lessons: ["River Valley Civilizations"] }
          }
        },
        "Classical Civilizations": {
          topics: {
            "Greece and Rome": { lessons: ["Greece and Rome"] },
            "India and China": { lessons: ["India and China"] },
            "Belief Systems": { lessons: ["Belief Systems"] }
          }
        },
        "Post-Classical World": {
          topics: {
            "Islamic World": { lessons: ["Islamic World"] },
            "Byzantines": { lessons: ["Byzantines"] },
            "Feudalism": { lessons: ["Feudalism"] }
          }
        },
        "Closing Project": {
          topics: {
            "Performance-Based Global Synthesis": { lessons: ["Performance-Based Global Synthesis"] }
          }
        },
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
        },
        "Constitutional Foundations": {
          topics: {
            "Colonial America": { "lessons": ["Colonial America"] },
            "Constitutional Convention": { "lessons": ["Constitutional Convention"] },
            "Bill of Rights": { "lessons": ["Bill of Rights"] }
          }
        },
        "Expansion & Reform": {
          topics: {
            "Civil War": { "lessons": ["Civil War"] },
            "Reconstruction": { "lessons": ["Reconstruction"] },
            "Progressive Era": { "lessons": ["Progressive Era"] }
          }
        },
        "20th Century US": {
          topics: {
            "Great Depression": { "lessons": ["Great Depression"] },
            "World Wars": { "lessons": ["World Wars"] },
            "Civil Rights Movement": { "lessons": ["Civil Rights Movement"] }
          }
        },
        "Modern America": {
          topics: {
            "Reagan Era": { "lessons": ["Reagan Era"] },
            "War on Terror": { "lessons": ["War on Terror"] },
            "Contemporary Policies": { "lessons": ["Contemporary Policies"] }
          }
        },
        "Regents Review": {
          topics: {
            "DBQ Practice": { "lessons": ["DBQ Practice"] },
            "Thematic Essay Practice": { "lessons": ["Thematic Essay Practice"] },
            "Civic Literacy Tasks": { "lessons": ["Civic Literacy Tasks"] }
          }
        },
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
    },
    Literature: {
      units: {}
    },
    Health: {
        units: {
            "Communication & Healthy Relationships": {
                topics: {
                    "Understanding Communication": { lessons: ["To understand the foundational elements of effective listening and appropriate responses in health contexts."] },
                    "Verbal & Non-Verbal Communication": { lessons: ["To master expressing oneself clearly and respectfully, both through words and body language."] },
                    "Expressing Needs & Feelings": { lessons: ["To learn constructive methods for sharing personal emotions and desires without causing harm."] },
                    "Impact of Interpersonal Communication": { lessons: ["To critically examine the dynamic interplay between communication patterns and relationship health."] },
                    "Overcoming Communication Barriers": { lessons: ["To equip students with tools to navigate and resolve obstacles to effective communication in health-related contexts."] },
                    "Respectful Communication & Empathy": { lessons: ["To foster an environment of mutual respect and understanding through communication."] },
                    "Effective Refusal Skills": { lessons: ["To confidently and respectfully say 'no' to unhealthy or unsafe pressures."] },
                    "Conflict Prevention & Management": { lessons: ["To learn proactive and reactive approaches to navigate disagreements constructively."] },
                    "Collaboration for Health Issues": { lessons: ["To work effectively in groups to achieve shared health-related goals."] },
                    "Family as the Basic Unit of Society": { lessons: ["To appreciate the diversity of family structures and their fundamental role in society."] },
                    "Family Roles, Responsibilities & Needs": { lessons: ["To identify the reciprocal nature of support within families and the importance of meeting individual needs."] },
                    "Privacy & Respect in Relationships": { lessons: ["To develop an understanding of boundaries and ethical considerations in personal information sharing."] },
                    "Culture & Relationships": { lessons: ["To recognize the diverse influences on interpersonal dynamics and self-identity."] },
                    "Growth, Appearance & Interests": { lessons: ["To embrace personal evolution and the acceptance of oneself and others through various life stages."] },
                    "Uniqueness & Respect for All": { lessons: ["To foster an inclusive environment where every individual's inherent worth is recognized and celebrated."] }
                }
            }
        }
    },
    Math: {
      units: {
        "Unit 1: One-Variable Statistics": {
          topics: {
            "Section A: Getting to Know You": {
              lessons: [
                "Lesson 1: Getting to Know You",
                "Lesson 2: Data Representations",
                "Lesson 3: A Gallery of Data"
              ]
            },
            "Section B: Distribution Shapes": {
              lessons: [
                "Lesson 4: The Shape of Distributions",
                "Lesson 5: Calculating Measures of Center and Variability"
              ]
            },
            "Section C: How to Use Spreadsheets": {
              lessons: [
                "Lesson 6: Mystery Computations",
                "Lesson 7: Spreadsheet Computations",
                "Lesson 8: Spreadsheet Shortcuts"
              ]
            },
            "Section D: Manipulating Data": {
              lessons: [
                "Lesson 9: Technological Graphing",
                "Lesson 10: The Effect of Extremes",
                "Lesson 11: Comparing and Contrasting Data Distributions",
                "Lesson 12: Standard Deviation",
                "Lesson 13: More Standard Deviation",
                "Lesson 14: Outliers",
                "Lesson 15: Comparing Data Sets"
              ]
            },
            "Section E: Let's Put It to Work": {
              lessons: [
                "Lesson 16: Analyzing Data"
              ]
            }
          }
        },
        "Unit 2: Linear Equations and Systems": {
          topics: {
            "Section A: Writing and Modeling with Equations": {
              lessons: [
                "Lesson 1: Planning a Party",
                "Lesson 2: Writing Equations to Model Relationships (Part 1)",
                "Lesson 3: Writing Equations to Model Relationships (Part 2)",
                "Lesson 4: Equations and Their Solutions",
                "Lesson 5: Equations and Their Graphs"
              ]
            },
            "Section B: Manipulating Equations and Understanding Their Structure": {
              lessons: [
                "Lesson 6: Equivalent Equations",
                "Lesson 7: Explaining Steps for Rewriting Equations",
                "Lesson 8: Which Variable to Solve for? (Part 1)",
                "Lesson 9: Which Variable to Solve for? (Part 2)",
                "Lesson 10: Connecting Equations to Graphs (Part 1)",
                "Lesson 11: Connecting Equations to Graphs (Part 2)"
              ]
            },
            "Section C: Systems of Linear Equations in Two Variables": {
              lessons: [
                "Lesson 12: Writing and Graphing Systems of Linear Equations",
                "Lesson 13: Solving Systems by Substitution",
                "Lesson 14: Solving Systems by Elimination (Part 1)",
                "Lesson 15: Solving Systems by Elimination (Part 2)",
                "Lesson 16: Solving Systems by Elimination (Part 3)",
                "Lesson 17: Systems of Linear Equations and Their Solutions"
              ]
            },
            "Section D: Let's Put It to Work": {
              lessons: [
                "Lesson 18: Asking about Solving Systems",
                "Lesson 19: Linear Patterns"
              ]
            }
          }
        },
        "Unit 3: Two-Variable Statistics": {
          topics: {
            "Section A: Two-Way Tables": {
              lessons: [
                "Lesson 1: Two-Way Tables",
                "Lesson 2: Relative Frequency Tables",
                "Lesson 3: Associations in Categorical Data"
              ]
            },
            "Section B: Scatter Plots": {
              lessons: [
                "Lesson 4: Linear Models",
                "Lesson 5: Fitting Lines",
                "Lesson 6: Residuals"
              ]
            },
            "Section C: Correlation Coefficients": {
              lessons: [
                "Lesson 7: The Correlation Coefficient",
                "Lesson 8: Using the Correlation Coefficient",
                "Lesson 9: Causal Relationships"
              ]
            },
            "Section D: Let's Put It to Work": {
              lessons: [
                "Lesson 10: Fossils and Flags"
              ]
            }
          }
        },
        "Unit 4: Linear Inequalities and Systems": {
          topics: {
            "Section A: Linear Inequalities in One Variable": {
              lessons: [
                "Lesson 1: Representing Situations with Inequalities",
                "Lesson 2: Solutions to Inequalities in One Variable",
                "Lesson 3: Writing and Solving Inequalities in One Variable"
              ]
            },
            "Section B: Linear Inequalities in Two Variables": {
              lessons: [
                "Lesson 4: Graphing Linear Inequalities in Two Variables (Part 1)",
                "Lesson 5: Graphing Linear Inequalities in Two Variables (Part 2)",
                "Lesson 6: Solving Problems with Inequalities in Two Variables"
              ]
            },
            "Section C: Systems of Linear Inequalities in Two Variables": {
              lessons: [
                "Lesson 7: Solutions to Systems of Linear Inequalities in Two Variables",
                "Lesson 8: Solving Problems with Systems of Linear Inequalities in Two Variables",
                "Lesson 9: Modeling with Systems of Inequalities in Two Variables"
              ]
            }
          }
        },
        "Unit 5: Functions": {
          topics: {
            "Section A: Functions and Their Representations": {
              lessons: [
                "Lesson 1: Describing and Graphing Situations",
                "Lesson 2: Function Notation",
                "Lesson 3: Interpreting and Using Function Notation",
                "Lesson 4: Using Function Notation to Describe Rules (Part 1)",
                "Lesson 5: Using Function Notation to Describe Rules (Part 2)"
              ]
            },
            "Section B: Analyzing and Creating Graphs of Functions": {
              lessons: [
                "Lesson 6: Features of Graphs",
                "Lesson 7: Using Graphs to Find Average Rate of Change",
                "Lesson 8: Interpreting and Creating Graphs",
                "Lesson 9: Comparing Graphs"
              ]
            },
            "Section C: A Closer Look at Inputs and Outputs": {
              lessons: [
                "Lesson 10: Domain and Range (Part 1)",
                "Lesson 11: Domain and Range (Part 2)",
                "Lesson 12: Piecewise Functions",
                "Lesson 13: Absolute Value Functions (Part 1)",
                "Lesson 14: Absolute Value Functions (Part 2)"
              ]
            },
            "Section D: Inverse Functions": {
              lessons: [
                "Lesson 15: Inverse Functions",
                "Lesson 16: Finding and Interpreting Inverse Functions",
                "Lesson 17: Writing Inverse Functions to Solve Problems"
              ]
            },
            "Section E: Let's Put It to Work": {
              lessons: [
                "Lesson 18: Using Functions to Model Battery Power"
              ]
            }
          }
        },
        "Unit 6: Introduction to Exponential Functions": {
          topics: {
            "Section A: Looking at Growth": {
              lessons: [
                "Lesson 1: Growing and Growing",
                "Lesson 2: Patterns of Growth"
              ]
            },
            "Section B: A New Kind of Relationship": {
              lessons: [
                "Lesson 3: Representing Exponential Growth",
                "Lesson 4: Representing Exponential Decay",
                "Lesson 5: Understanding Decay",
                "Lesson 6: Analyzing Graphs",
                "Lesson 7: Using Negative Exponents"
              ]
            },
            "Section C: Exponential Functions": {
              lessons: [
                "Lesson 8: Exponential Situations as Functions",
                "Lesson 9: Interpreting Exponential Functions",
                "Lesson 10: Looking at Rates of Change",
                "Lesson 11: Modeling Exponential Behavior",
                "Lesson 12: Reasoning about Exponential Graphs (Part 1)",
                "Lesson 13: Reasoning about Exponential Graphs (Part 2)"
              ]
            },
            "Section D: Percent Growth and Decay": {
              lessons: [
                "Lesson 14: Recalling Percent Change",
                "Lesson 15: Functions Involving Percent Change",
                "Lesson 16: Compounding Interest",
                "Lesson 17: Different Compounding Intervals",
                "Lesson 18: Expressed in Different Ways"
              ]
            },
            "Section E: Comparing Linear and Exponential Functions": {
              lessons: [
                "Lesson 19: Which One Changes Faster?",
                "Lesson 20: Changes over Equal Intervals"
              ]
            },
            "Section F: Let's Put It to Work": {
              lessons: [
                "Lesson 21: Predicting Populations"
              ]
            }
          }
        },
        "Unit 7: Introduction to Quadratic Functions": {
          topics: {
            "Section A: A Different Kind of Change": {
              lessons: [
                "Lesson 1: A Different Kind of Change",
                "Lesson 2: How Does It Change?"
              ]
            },
            "Section B: Quadratic Functions": {
              lessons: [
                "Lesson 3: Building Quadratic Functions from Geometric Patterns",
                "Lesson 4: Comparing Quadratic and Exponential Functions",
                "Lesson 5: Building Quadratic Functions to Describe Situations (Part 1)",
                "Lesson 6: Building Quadratic Functions to Describe Situations (Part 2)",
                "Lesson 7: Building Quadratic Functions to Describe Situations (Part 3)"
              ]
            },
            "Section C: Working with Quadratic Expressions": {
              lessons: [
                "Lesson 8: Equivalent Quadratic Expressions",
                "Lesson 9: Standard Form and Factored Form",
                "Lesson 10: Graphs of Functions in Standard and Factored Forms"
              ]
            },
            "Section D: Features of Graphs of Quadratic Functions": {
              lessons: [
                "Lesson 11: Graphing from the Factored Form",
                "Lesson 12: Graphing the Standard Form (Part 1)",
                "Lesson 13: Graphing the Standard Form (Part 2)",
                "Lesson 14: Graphs That Represent Situations",
                "Lesson 15: Vertex Form",
                "Lesson 16: Graphing from the Vertex Form",
                "Lesson 17: Changing the Vertex"
              ]
            }
          }
        },
        "Unit 8: Quadratic Equations": {
          topics: {
            "Section A: Finding Unknown Inputs": {
              lessons: [
                "Lesson 1: Finding Unknown Inputs",
                "Lesson 2: When and Why Do We Write Quadratic Equations?"
              ]
            },
            "Section B: Solving Quadratic Equations": {
              lessons: [
                "Lesson 3: Solving Quadratic Equations by Reasoning",
                "Lesson 4: Solving Quadratic Equations with the Zero Product Property",
                "Lesson 5: How Many Solutions?",
                "Lesson 6: Rewriting Quadratic Expressions in Factored Form (Part 1)",
                "Lesson 7: Rewriting Quadratic Expressions in Factored Form (Part 2)",
                "Lesson 8: Rewriting Quadratic Expressions in Factored Form (Part 3)",
                "Lesson 9: Solving Quadratic Equations by Using Factored Form",
                "Lesson 10: Rewriting Quadratic Expressions in Factored Form (Part 4)"
              ]
            },
            "Section C: Completing the Square": {
              lessons: [
                "Lesson 11: What Are Perfect Squares?",
                "Lesson 12: Completing the Square (Part 1)",
                "Lesson 13: Completing the Square (Part 2)",
                "Lesson 14: Completing the Square (Part 3)",
                "Lesson 15: Quadratic Equations with Irrational Solutions"
              ]
            },
            "Section D: The Quadratic Formula": {
              lessons: [
                "Lesson 16: The Quadratic Formula",
                "Lesson 17: Applying the Quadratic Formula (Part 1)",
                "Lesson 18: Applying the Quadratic Formula (Part 2)",
                "Lesson 19: Deriving the Quadratic Formula",
                "Lesson 20: Rational and Irrational Solutions",
                "Lesson 21: Sums and Products of Rational and Irrational Numbers"
              ]
            },
            "Section E: Vertex Form Revisited": {
              lessons: [
                "Lesson 22: Rewriting Quadratic Expressions in Vertex Form",
                "Lesson 23: Using Quadratic Expressions in Vertex Form to Solve Problems"
              ]
            },
            "Section F: Let's Put It to Work": {
              lessons: [
                "Lesson 24: Using Quadratic Equations to Model Situations and Solve Problems"
              ]
            }
          }
        },
        "Unit 1: Sequences and Functions": {
          topics: {
            "Section A: Sequences": {
              lessons: [
                "Lesson 1: A Towering Sequence",
                "Lesson 2: Introducing Geometric Sequences",
                "Lesson 3: Different Types of Sequences",
                "Lesson 4: Using Technology to Work with Sequences"
              ]
            },
            "Section B: Representing Sequences": {
              lessons: [
                "Lesson 5: Sequences Are Functions",
                "Lesson 6: Representing Sequences",
                "Lesson 7: Representing More Sequences"
              ]
            },
            "Section C: What’s the Equation?": {
              lessons: [
                "Lesson 8: The nth Term",
                "Lesson 9: What’s the Equation?",
                "Lesson 10: Situations and Sequence Types",
                "Lesson 11: Adding Up"
              ]
            }
          }
        },
        "Unit 2: Polynomial Functions": {
          topics: {
            "Section A: What Is a Polynomial?": {
              lessons: [
                "Lesson 1: Let’s Make a Box",
                "Lesson 2: Funding the Future",
                "Lesson 3: Introducing Polynomials",
                "Lesson 4: Combining Polynomials"
              ]
            },
            "Section B: Working with Polynomials": {
              lessons: [
                "Lesson 5: Connecting Factors and Zeros",
                "Lesson 6: Different Forms",
                "Lesson 7: Using Factors and Zeros"
              ]
            },
            "Section C: Graphs of Polynomials": {
              lessons: [
                "Lesson 8: End Behavior (Part 1)",
                "Lesson 9: End Behavior (Part 2)",
                "Lesson 10: Multiplicity",
                "Lesson 11: Finding Intersections"
              ]
            },
            "Section D: Polynomial Division": {
              lessons: [
                "Lesson 12: Polynomial Division (Part 1)",
                "Lesson 13: Polynomial Division (Part 2)",
                "Lesson 14: What Do You Know about Polynomials?",
                "Lesson 15: The Remainder Theorem"
              ]
            }
          }
        },
        "Unit 3: Rational Functions and Equations": {
          topics: {
            "Section A: Rational Functions": {
              lessons: [
                "Lesson 1: Minimizing Surface Area",
                "Lesson 2: Graphs of Rational Functions (Part 1)",
                "Lesson 3: Graphs of Rational Functions (Part 2)",
                "Lesson 4: End Behavior of Rational Functions"
              ]
            },
            "Section B: Rational Equations": {
              lessons: [
                "Lesson 5: Rational Equations (Part 1)",
                "Lesson 6: Rational Equations (Part 2)",
                "Lesson 7: Solving Rational Equations"
              ]
            },
            "Section C: Polynomial Identities": {
              lessons: [
                "Lesson 8: Polynomial Identities (Part 1)",
                "Lesson 9: Polynomial Identities (Part 2)",
                "Lesson 10: Summing Up",
                "Lesson 11: Using the Sum"
              ]
            }
          }
        },
        "Unit 4: Complex Numbers and Rational Exponents": {
          topics: {
            "Section A: Exponent Properties": {
              lessons: [
                "Lesson 1: Properties of Exponents",
                "Lesson 2: Square Roots and Cube Roots",
                "Lesson 3: Exponents That Are Unit Fractions",
                "Lesson 4: Positive Rational Exponents",
                "Lesson 5: Negative Rational Exponents"
              ]
            },
            "Section B: Solving Equations with Square and Cube Roots": {
              lessons: [
                "Lesson 6: Squares and Square Roots",
                "Lesson 7: Inequivalent Equations?",
                "Lesson 8: Cubes and Cube Roots",
                "Lesson 9: Solving Radical Equations"
              ]
            },
            "Section C: A New Kind of Number": {
              lessons: [
                "Lesson 10: A New Kind of Number",
                "Lesson 11: Introducing the Number i",
                "Lesson 12: Arithmetic with Complex Numbers",
                "Lesson 13: Multiplying Complex Numbers",
                "Lesson 14: More Arithmetic with Complex Numbers",
                "Lesson 15: Working Backward"
              ]
            },
            "Section D: Solving Quadratics with Complex Numbers": {
              lessons: [
                "Lesson 16: Solving Quadratics",
                "Lesson 17: Completing the Square and Complex Solutions",
                "Lesson 18: The Quadratic Formula and Complex Solutions",
                "Lesson 19: Real and Non-Real Solutions"
              ]
            },
            "Section E: Let's Put It to Work": {
              lessons: [
                "Lesson 20: Drawing Proportional Circles"
              ]
            }
          }
        },
        "Unit 5: Exponential Functions and Equations": {
          topics: {
            "Section A: Growing and Shrinking": {
              lessons: [
                "Lesson 1: Growing and Shrinking",
                "Lesson 2: Representations of Growth and Decay",
                "Lesson 3: Understanding Rational Inputs",
                "Lesson 4: Representing Functions at Rational Inputs",
                "Lesson 5: Changes Over Rational Intervals",
                "Lesson 6: Writing Equations for Exponential Functions",
                "Lesson 7: Interpreting and Using Exponential Functions"
              ]
            },
            "Section B: Missing Exponents": {
              lessons: [
                "Lesson 8: Unknown Exponents",
                "Lesson 9: What Is a Logarithm?",
                "Lesson 10: Interpreting and Writing Logarithmic Equations",
                "Lesson 11: Evaluating Logarithmic Expressions"
              ]
            },
            "Section C: The Constant e": {
              lessons: [
                "Lesson 12: The Number e",
                "Lesson 13: Exponential Functions with Base e",
                "Lesson 14: Solving Exponential Equations"
              ]
            },
            "Section D: Logarithmic Functions and Graphs": {
              lessons: [
                "Lesson 15: Using Graphs and Logarithms to Solve Problems (Part 1)",
                "Lesson 16: Using Graphs and Logarithms to Solve Problems (Part 2)",
                "Lesson 17: Logarithmic Functions"
              ]
            },
            "Section E: Let's Put It to Work": {
              lessons: [
                "Lesson 18: Applications of Logarithmic Functions"
              ]
            }
          }
        },
        "Unit 6: Transformations of Functions": {
          topics: {
            "Section A: Translations, Reflections, and Symmetry": {
              lessons: [
                "Lesson 1: Matching Up to Data",
                "Lesson 2: Moving Functions",
                "Lesson 3: More Movement",
                "Lesson 4: Reflecting Functions",
                "Lesson 5: Some Functions Have Symmetry",
                "Lesson 6: Symmetry in Equations",
                "Lesson 7: Expressing Transformations of Functions Algebraically"
              ]
            },
            "Section B: Scaling Outputs and Inputs": {
              lessons: [
                "Lesson 8: Scaling the Outputs",
                "Lesson 9: Scaling the Inputs",
                "Lesson 10: Combining Functions"
              ]
            },
            "Section C: Transformations of Functions": {
              lessons: [
                "Lesson 11: Transforming from an Original Function",
                "Lesson 12: Transformation Effects",
                "Lesson 13: Transforming Parabolas",
                "Lesson 14: Transforming Circles"
              ]
            },
            "Section D: Let’s Put It to Work": {
              lessons: [
                "Lesson 15: Making a Model for Data"
              ]
            }
          }
        },
        "Unit 7: Trigonometric Functions": {
          topics: {
            "Section A: The Unit Circle": {
              lessons: [
                "Lesson 1: Moving in Circles",
                "Lesson 2: Revisiting Right Triangles",
                "Lesson 3: The Unit Circle (Part 1)",
                "Lesson 4: The Unit Circle (Part 2)",
                "Lesson 5: The Pythagorean Identity (Part 1)",
                "Lesson 6: The Pythagorean Identity (Part 2)",
                "Lesson 7: Finding Unknown Coordinates on a Circle"
              ]
            },
            "Section B: Periodic Functions": {
              lessons: [
                "Lesson 8: Rising and Falling",
                "Lesson 9: Introduction to Trigonometric Functions",
                "Lesson 10: Beyond 2pi",
                "Lesson 11: Extending the Domain of Trigonometric Functions",
                "Lesson 12: Tangent",
                "Lesson 13: Some New Ratios"
              ]
            },
            "Section C: Trigonometry Transformations": {
              lessons: [
                "Lesson 14: Amplitude and Midline",
                "Lesson 15: Transforming Trigonometric Functions",
                "Lesson 16: Features of Trigonometric Graphs (Part 1)",
                "Lesson 17: Features of Trigonometric Graphs (Part 2)",
                "Lesson 18: Comparing Transformations",
                "Lesson 19: Modeling Circular Motion"
              ]
            },
            "Section D: Let’s Put It to Work": {
              lessons: [
                "Lesson 20: Beyond Circles"
              ]
            }
          }
        },
        "Unit 8: Statistical Inferences": {
          topics: {
            "Section A: Study Types": {
              lessons: [
                "Lesson 1: Being Skeptical",
                "Lesson 2: Study Types",
                "Lesson 3: Randomness in Groups"
              ]
            },
            "Section B: Distributions": {
              lessons: [
                "Lesson 4: Describing Distributions",
                "Lesson 5: Normal Distributions",
                "Lesson 6: Areas in Histograms",
                "Lesson 7: Areas under a Normal Curve"
              ]
            },
            "Section C: Not All Samples Are the Same": {
              lessons: [
                "Lesson 8: Not Always Ideal",
                "Lesson 9: Variability in Samples",
                "Lesson 10: Estimating Proportions from Samples",
                "Lesson 11: Estimating a Population Mean"
              ]
            },
            "Section D: Analyzing Experimental Data": {
              lessons: [
                "Lesson 12: Experimenting",
                "Lesson 13: Using Normal Distributions for Experiment Analysis",
                "Lesson 14: Questioning Experimenting"
              ]
            },
            "Section E: Let's Put It to Work": {
              lessons: [
                "Lesson 15: Heart Rates"
              ]
            }
          }
        },
        "Unit 1: Constructions and Rigid Transformations": {
            topics: {
                "Section A: Constructions": {
                    lessons: [
                        "Lesson 1: Build It",
                        "Lesson 2: Constructing Patterns",
                        "Lesson 3: Construction Techniques 1: Perpendicular Bisectors",
                        "Lesson 4: Construction Techniques 2: Equilateral Triangles",
                        "Lesson 5: Construction Techniques 3: Perpendicular Lines and Angle Bisectors",
                        "Lesson 6: Construction Techniques 4: Parallel and Perpendicular Lines",
                        "Lesson 7: Construction Techniques 5: Squares",
                        "Lesson 8: Using Technology for Constructions",
                        "Lesson 9: Speedy Delivery"
                    ]
                },
                "Section B: Defining Rigid Transformations": {
                    lessons: [
                        "Lesson 10: Rigid Transformations",
                        "Lesson 11: Defining Reflections",
                        "Lesson 12: Defining Translations",
                        "Lesson 13: Incorporating Rotations",
                        "Lesson 14: Defining Rotations"
                    ]
                },
                "Section C: Working with Rigid Transformations": {
                    lessons: [
                        "Lesson 15: Symmetry",
                        "Lesson 16: More Symmetry",
                        "Lesson 17: Working with Rigid Transformations",
                        "Lesson 18: Practicing Point-by-Point Transformations"
                    ]
                },
                "Section D: Evidence and Proof": {
                    lessons: [
                        "Lesson 19: Evidence, Angles, and Proof",
                        "Lesson 20: Transformations, Transversals, and Proof",
                        "Lesson 21: One Hundred Eighty"
                    ]
                },
                "Section E: Let's Put It to Work": {
                    lessons: [
                        "Lesson 22: Now What Can You Build?"
                    ]
                }
            }
        },
        "Unit 2: Congruence": {
            topics: {
                "Section A: Congruent Figures": {
                    lessons: [
                        "Lesson 1: Congruent Parts, Part 1",
                        "Lesson 2: Congruent Parts, Part 2",
                        "Lesson 3: Congruent Triangles, Part 1",
                        "Lesson 4: Congruent Triangles, Part 2",
                        "Lesson 5: Points, Segments, and Zigzags"
                    ]
                },
                "Section B: Triangle Congruence Theorems": {
                    lessons: [
                        "Lesson 6: Side-Angle-Side Triangle Congruence",
                        "Lesson 7: Angle-Side-Angle Triangle Congruence",
                        "Lesson 8: The Perpendicular Bisector Theorem",
                        "Lesson 9: Side-Side-Side Triangle Congruence",
                        "Lesson 10: Practicing Proofs",
                        "Lesson 11: Side-Side-Angle (Sometimes) Congruence"
                    ]
                },
                "Section C: Proofs about Quadrilaterals": {
                    lessons: [
                        "Lesson 12: Proofs about Quadrilaterals",
                        "Lesson 13: Proofs about Parallelograms",
                        "Lesson 14: Bisect It"
                    ]
                },
                "Section D: Let’s Put It to Work": {
                    lessons: [
                        "Lesson 15: Congruence for Quadrilaterals"
                    ]
                }
            }
        },
        "Unit 3: Similarity": {
            topics: {
                "Section A: Properties of Dilations": {
                    lessons: [
                        "Lesson 1: Scale Drawings",
                        "Lesson 2: Scale of the Solar System",
                        "Lesson 3: Measuring Dilations",
                        "Lesson 4: Dilating Lines and Angles",
                        "Lesson 5: Splitting Triangle Sides with Dilation (Part 1)"
                    ]
                },
                "Section B: Similarity Transformations and Proportional Reasoning": {
                    lessons: [
                        "Lesson 6: Connecting Similarity and Transformations",
                        "Lesson 7: Reasoning about Similarity with Transformations",
                        "Lesson 8: Are They All Similar?",
                        "Lesson 9: Conditions for Triangle Similarity",
                        "Lesson 10: Other Conditions for Triangle Similarity",
                        "Lesson 11: Splitting Triangle Sides with Dilation (Part 2)",
                        "Lesson 12: Practice with Proportional Relationships"
                    ]
                },
                "Section C: Similarity in Right Triangles": {
                    lessons: [
                        "Lesson 13: Using the Pythagorean Theorem and Similarity",
                        "Lesson 14: Proving the Pythagorean Theorem",
                        "Lesson 15: Converse of the Pythagorean Theorem",
                        "Lesson 16: Finding All the Unknown Values in Triangles"
                    ]
                },
                "Section D: Let’s Put It to Work": {
                    lessons: [
                        "Lesson 17: Reflection Similarity"
                    ]
                }
            }
        },
        "Unit 4: Right Triangle Trigonometry": {
            topics: {
                "Section A: Angles and Steepness": {
                    lessons: [
                        "Lesson 1: Angles and Steepness",
                        "Lesson 2: Half a Square",
                        "Lesson 3: Half an Equilateral Triangle",
                        "Lesson 4: Ratios in Right Triangles",
                        "Lesson 5: Working with Ratios in Right Triangles"
                    ]
                },
                "Section B: Defining Trigonometric Ratios": {
                    lessons: [
                        "Lesson 6: Working with Trigonometric Ratios",
                        "Lesson 7: Applying Ratios in Right Triangles",
                        "Lesson 8: Sine and Cosine in the Same Right Triangle",
                        "Lesson 9: Trigonometry Squared",
                        "Lesson 10: Using Trigonometric Ratios to Find Angles"
                    ]
                },
                "Section C: Let’s Put It to Work": {
                    lessons: [
                        "Lesson 11: Solving Problems with Trigonometry",
                        "Lesson 12: Approximating Pi"
                    ]
                }
            }
        },
        "Unit 5: Solid Geometry": {
            topics: {
                "Section A: Cross-Sections, Scaling, and Area": {
                    lessons: [
                        "Lesson 1: Solids of Rotation",
                        "Lesson 2: Slicing Solids",
                        "Lesson 3: Creating Cross-Sections by Dilating",
                        "Lesson 4: Scaling and Area",
                        "Lesson 5: Scaling and Unscaling"
                    ]
                },
                "Section B: Scaling Solids": {
                    lessons: [
                        "Lesson 6: Scaling Solids",
                        "Lesson 7: The Root of the Problem",
                        "Lesson 8: Speaking of Scaling"
                    ]
                },
                "Section C: Prism and Cylinder Volumes": {
                    lessons: [
                        "Lesson 9: Cylinder Volumes",
                        "Lesson 10: Cross-Sections and Volume",
                        "Lesson 11: Prisms Practice"
                    ]
                },
                "Section D: Understanding Pyramid Volumes": {
                    lessons: [
                        "Lesson 12: Prisms and Pyramids",
                        "Lesson 13: Building a Volume Formula for a Pyramid",
                        "Lesson 14: Working with Pyramids",
                        "Lesson 15: Putting All the Solids Together"
                    ]
                },
                "Section E: Let’s Put It to Work": {
                    lessons: [
                        "Lesson 16: Surface Area and Volume",
                        "Lesson 17: Volume and Density",
                        "Lesson 18: Volume and Graphing"
                    ]
                }
            }
        },
        "Unit 6: Coordinate Geometry": {
            topics: {
                "Section A: Transformations in the Plane": {
                    lessons: [
                        "Lesson 1: Rigid Transformations in a Plane",
                        "Lesson 2: Transformations as Functions",
                        "Lesson 3: Types of Transformations"
                    ]
                },
                "Section B: Distances, Circles, and Parabolas": {
                    lessons: [
                        "Lesson 4: Distances and Circles",
                        "Lesson 5: Squares and Circles",
                        "Lesson 6: Completing the Square",
                        "Lesson 7: Distances and Parabolas",
                        "Lesson 8: Equations and Graphs"
                    ]
                },
                "Section C: Proving Geometric Theorems Algebraically": {
                    lessons: [
                        "Lesson 9: Equations of Lines",
                        "Lesson 10: Parallel Lines in the Plane",
                        "Lesson 11: Perpendicular Lines in the Plane",
                        "Lesson 12: It’s All on the Line",
                        "Lesson 13: Intersection Points",
                        "Lesson 14: Coordinate Proof",
                        "Lesson 15: Weighted Averages",
                        "Lesson 16: Weighted Averages in a Triangle",
                        "Lesson 17: Lines in Triangles"
                    ]
                },
                "Section D: Let’s Put It to Work": {
                    lessons: [
                        "Lesson 18: Applying Area and Perimeter on the Plane"
                    ]
                }
            }
        },
        "Unit 7: Circles": {
            topics: {
                "Section A: Lines, Angles, and Circles": {
                    lessons: [
                        "Lesson 1: Lines, Angles, and Curves",
                        "Lesson 2: Inscribed Angles",
                        "Lesson 3: Tangent Lines"
                    ]
                },
                "Section B: Polygons and Circles": {
                    lessons: [
                        "Lesson 4: Quadrilaterals in Circles",
                        "Lesson 5: Triangles in Circles",
                        "Lesson 6: A Special Point",
                        "Lesson 7: Circles in Triangles"
                    ]
                },
                "Section C: Measuring Circles": {
                    lessons: [
                        "Lesson 8: Arcs and Sectors",
                        "Lesson 9: Part to Whole",
                        "Lesson 10: Angles, Arcs, and Radii",
                        "Lesson 11: A New Way to Measure Angles",
                        "Lesson 12: Radian Sense",
                        "Lesson 13: Using Radians"
                    ]
                },
                "Section D: Let’s Put It to Work": {
                    lessons: [
                        "Lesson 14: Putting It All Together"
                    ]
                }
            }
        },
        "Unit 8: Conditional Probability": {
            topics: {
                "Section A: Up to Chance": {
                    lessons: [
                        "Lesson 1: Up to Chance",
                        "Lesson 2: Playing with Probability",
                        "Lesson 3: Sample Spaces",
                        "Lesson 4: Tables of Relative Frequencies",
                        "Lesson 5: Combining Events",
                        "Lesson 6: The Addition Rule"
                    ]
                },
                "Section B: Related Events": {
                    lessons: [
                        "Lesson 7: Related Events",
                        "Lesson 8: Conditional Probability",
                        "Lesson 9: Using Tables for Conditional Probability",
                        "Lesson 10: Using Probability to Determine Whether Events Are Independent"
                    ]
                },
                "Section C: Let's Put It to Work": {
                    lessons: [
                        "Lesson 11: Probabilities in Games"
                    ]
                }
            }
        }
      }
    }
  },
};
