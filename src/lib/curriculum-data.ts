
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
        'The Marathon Runner': {
          topics: {
            'Gas Exchange and Cellular Respiration': {
              lessons: [
                'Lesson 0: Anchor Phenomenon - Why did the marathon runner collapse?',
                'Lesson 1: Why do we breathe faster during exercise?',
                'Lesson 2: What is the role of gas exchange in respiration?',
                'Lesson 3: How does cellular respiration release energy?',
              ],
            },
            'Muscles and Energy': {
              lessons: [
                'Lesson 4: How do muscles use ATP for movement?',
                'Lesson 5: How do cells replenish ATP during prolonged activity?',
              ],
            },
            'Human Thermoregulation': {
              lessons: [
                'Lesson 6: How does the body maintain a stable temperature?',
              ],
            },
            'Water Balance': {
              lessons: [
                'Lesson 7: What happens to water levels during intense exercise?',
              ],
            },
            'Unit Closing and Explanation': {
              lessons: [
                'Lesson 8: Final Performance Task - What happened to the marathon runner?',
              ],
            },
          },
        },
        'Humans vs. Bacteria': {
          topics: {
            'The Black Death': {
              lessons: [
                'Lesson 0: Anchor Phenomenon – Why are infectious diseases resurging globally?',
                'Lesson 1: How did some people survive the Black Death?',
              ],
            },
            'Antibiotic Resistance': {
              lessons: [
                'Lesson 2: How do bacteria become resistant to antibiotics?',
              ],
            },
            'The Microbiome': {
              lessons: [
                'Lesson 3: How do beneficial bacteria protect our health?',
              ],
            },
            'Cooperation and Survival': {
              lessons: [
                'Lesson 4: How do bacteria cooperate to survive?',
              ],
            },
            'Unit Closing - Preventing Future Outbreaks': {
              lessons: [
                'Lesson 5: What strategies can prevent future cholera outbreaks?',
              ],
            },
          },
        },
        'Evolution of Sick Humans': {
          topics: {
            'Lactase Persistence': {
              lessons: [
                'Lesson 0: Anchor Phenomenon – How have modern lifestyles affected our health?',
                'Lesson 1: Why can some people digest milk but others cannot?',
              ],
            },
            'Leptin Resistance': {
              lessons: ['Lesson 2: What causes some people to overeat?'],
            },
            'Circadian Rhythms': {
              lessons: [
                'Lesson 3: How do our internal clocks regulate health?',
              ],
            },
            'Common Ancestry': {
              lessons: [
                'Lesson 4: What evidence shows we share ancestry with other species?',
              ],
            },
            'Unit Closing - Mismatch Solutions': {
              lessons: [
                'Lesson 5: How can we redesign schools to support healthy biology?',
              ],
            },
          },
        },
        'Saving the Mountain Lion': {
          topics: {
            'Mountain Lion Population': {
              lessons: [
                'Lesson 0: Anchor Phenomenon – How did a mountain lion end up near NYC?',
                'Lesson 1: Where did the Connecticut cat come from?',
              ],
            },
            'Sexual Reproduction': {
              lessons: ['Lesson 2: How do cells divide and reproduce?'],
            },
            'Genetic Variation': {
              lessons: [
                'Lesson 3: What causes variation in traits across a population?',
              ],
            },
            'Engineering Gene Flow': {
              lessons: [
                'Lesson 4: How can we prevent inbreeding in endangered populations?',
              ],
            },
            'Unit Closing - Species Survival Plan': {
              lessons: [
                'Lesson 5: How can genetic evidence guide species conservation?',
              ],
            },
          },
        },
        'Food for All': {
          topics: {
            'The Pellagra Mystery': {
              lessons: [
                'Lesson 0: Anchor Phenomenon – Why did only some people get sick during the pellagra epidemic?',
                'Lesson 1: What clues help us solve a medical mystery?',
              ],
            },
            'The Neolithic Revolution': {
              lessons: [
                'Lesson 2: How did agriculture change human populations?',
              ],
            },
            'The Superfood that Changed the World': {
              lessons: ['Lesson 3: Why is corn such a powerful crop?'],
            },
            'Infectious Agent or Insufficient Diet?': {
              lessons: ['Lesson 4: What actually caused pellagra?'],
            },
            'Unit Closing - Future of Food': {
              lessons: [
                'Lesson 5: How can we ensure access to nutritious food for all?',
              ],
            },
          },
        },
        'The Woolly Mammoth': {
          topics: {
            'Tuskless Elephants': {
              lessons: [
                'Lesson 0: Anchor Phenomenon – What caused the woolly mammoth to go extinct?',
                'Lesson 1: Why are more elephants tuskless?',
              ],
            },
            'Coral Bleaching': {
              lessons: [
                'Lesson 2: What causes coral to bleach and ecosystems to collapse?',
              ],
            },
            'Kelp Forests': {
              lessons: [
                'Lesson 3: What happens when keystone species disappear?',
              ],
            },
            'Passenger Pigeon': {
              lessons: ['Lesson 4: Should we bring back extinct species?'],
            },
            'Unit Closing - Saving Biodiversity': {
              lessons: [
                'Lesson 5: What should humans do to protect biodiversity?',
              ],
            },
          },
        },
      },
    },
    'Earth_Science': {
        units: {
            "Unit 1: Discovering New Worlds": {
                topics: {
                    "Engage & Explore": { lessons: ["Anchor Phenomenon - How do we know what’s out there in space?", "Naked-Eye Observations", "Tools for Observation"] },
                    "Earth and the Moon": { lessons: ["Earth's Rotation", "Moon Phases", "Eclipses"] },
                    "Modeling the Sun": { lessons: ["Sun's Apparent Path", "Seasonal Changes", "Solar Energy"] },
                    "Interpreting Data About Distant Objects": { lessons: ["Light from Stars", "The H-R Diagram", "Galaxies"] },
                    "Unit Closing": { lessons: ["Final Performance Task"] }
                }
            },
            "Unit 2: Earthquakes, Volcanoes, and Tsunamis: Who's at Risk?": {
                topics: {
                    "Engage & Launch": { lessons: ["Anchor Phenomenon - Natural Hazard Risk", "Earth's Layers", "Plate Tectonics"] },
                    "Tectonic Movement and Plate Boundaries": { lessons: ["Plate Boundaries", "Earthquakes", "Volcanoes"] },
                    "Natural Hazard Data": { lessons: ["Mapping Hazards", "Tsunami Risk", "Social Vulnerability"] },
                    "Earthquake Engineering": { lessons: ["Engineering for Earthquakes", "Community Resilience"] },
                    "Unit Closing": { lessons: ["Final Performance Task"] }
                }
            },
            "Unit 3: Climate Change Throughout Human History": {
                topics: {
                    "Engage and Ice Core Data": { lessons: ["Anchor Phenomenon - Past & Future Climate", "Ice Cores", "Analyzing Ice Core Data"] },
                    "Global Warming and Carbon Emissions": { lessons: ["The Greenhouse Effect", "The Carbon Cycle", "Human Impact on Climate"] },
                    "Sea Level and Ecosystem Effects": { lessons: ["Sea Level Rise", "Ecosystem Impacts"] },
                    "Geoengineering and Mitigation": { lessons: ["Mitigation Strategies", "Geoengineering"] },
                    "Unit Closing": { lessons: ["Final Performance Task"] }
                }
            },
            "Unit 4: More Hurricanes and Blizzards in NYC?": {
                topics: {
                    "Extreme Weather Patterns": { lessons: ["Anchor Phenomenon - Extreme Weather", "Weather vs. Climate", "Air Masses and Fronts"] },
                    "Hurricane Frequency": { lessons: ["Hurricane Formation", "Hurricane Data Analysis", "Climate Change and Hurricanes"] },
                    "Blizzard Analysis": { lessons: ["Blizzard Formation", "Blizzard Data Analysis"] },
                    "Infrastructure Resilience": { lessons: ["Infrastructure Vulnerability", "Designing for Resilience"] },
                    "Unit Closing": { lessons: ["Final Performance Task"] }
                }
            },
            "Unit 5: Solutions for a Sustainable Future": {
                topics: {
                    "Burning Fossil Fuels": { lessons: ["Fossil Fuels and Energy", "Air Pollution", "Water Pollution", "Acid Rain", "The Ozone Layer", "Renewable Energy", "Nuclear Energy", "Energy Efficiency", "Policy Solutions", "Individual Action"] },
                    "Land Use & Biodiversity": { lessons: ["Deforestation", "Urbanization", "Agriculture", "Biodiversity", "Habitat Destruction", "Conservation"] },
                    "Mining": { lessons: ["Mineral Resources", "Mining Techniques", "Environmental Impacts of Mining", "Social Impacts of Mining", "Sustainable Mining Practices", "Recycling Minerals", "Conflict Minerals"] },
                    "Unit Closing": { lessons: ["Stakeholder Meeting Simulation", "Sustainability Plan", "Final Presentation"] }
                }
            },
            "Unit 6: Probability of Life Elsewhere": {
                topics: {
                    "Stability of the Solar System": { lessons: ["Gravity and Orbits", "The Goldilocks Zone", "Earth's Magnetic Field", "The Role of Jupiter", "The Moon's Influence", "Long-Term Stability", "Exoplanets"] },
                    "Coevolution of Earth and Life": { lessons: ["Early Earth", "Origin of Life", "Photosynthesis and Oxygen", "Mass Extinctions", "Humans and the Biosphere"] },
                    "Origin of the Universe": { lessons: ["The Big Bang", "Evidence for the Big Bang", "Stellar Evolution", "Formation of Elements", "The Drake Equation"] },
                    "Asteroid Orbits": { lessons: ["Asteroids and Comets", "Impact Events", "Near-Earth Objects", "Planetary Defense", "The Search for Extraterrestrial Intelligence (SETI)"] },
                    "Unit Closing": { lessons: ["Final Performance Task"] }
                }
            }
        }
    },
    Chemistry: {
      units: {
        "Unit 1: Why are oysters dying, and how can we use chemistry to protect them?": {
          topics: {
            "Lesson Set 1: What large and small-scale processes make water more or less acidic?": {
              lessons: [
                "Lesson 1: What is happening to oysters?",
                "Lesson 2: How can we break down the problem so we can solve it?",
                "Lesson 3: Can carbon dioxide make the ocean more acidic?",
                "Lesson 4: What is it about a substance that determines whether it produces more or fewer H+ or OH- ions when it is added to water?",
                "Lesson 5: How does carbon dioxide move between the atmosphere and ocean systems to cause the water to become more acidic?",
                "Lesson 6: How can acidic water become less acidic again?",
                "Lesson 7: How can we use what we have learned to help protect oysters?",
              ],
            },
            "Lesson Set 2: What mathematical models can help us determine the scale of the reactions needed to save oysters?": {
              lessons: [
                "Lesson 8: How can we figure out how much of a substance we need to neutralize acid?",
                "Lesson 9: How much NaOH would we need to add to make ocean water safe for oysters?",
                "Lesson 10: How does ocean acidification hurt oysters?",
                "Lesson 11: How can we help oysters build shells quickly?",
              ],
            },
            "Lesson Set 3: How can engineering design help us determine the best process to save oysters?": {
              lessons: [
                "Lesson 12: What criteria and constraints do we need to consider when designing solutions to help protect oysters?",
                "Lesson 13: How can we apply our science ideas to develop a solution to help protect oysters?",
                "Lesson 14: How well do our different design solutions address our criteria and constraints?",
                "Lesson 15: How can we apply our learning to other situations?",
              ],
            },
          },
        },
        "Unit 2: How can we slow the flow of energy on Earth to protect vulnerable coastal communities?": {
          topics: {
            "Lesson Set 1: Why and how is the sea level rising?": {
              lessons: [
                "Lesson 1: How are sea levels rising and forcing people to move?",
                "Lesson 2: What can the past help us figure out about what is causing sea level rise in the present?",
                "Lesson 3: How does carbon dioxide contribute to climate change?",
                "Lesson 4: What would happen if the Earth's ice melted?",
              ],
            },
            "Lesson Set 2: What solutions could help slow polar ice melt?": {
              lessons: [
                "Lesson 5: How can we best slow or stop the land ice melt?",
                "Lesson 6: Why would some engineers want to sprinkle glass microbeads on the Arctic?",
                "Lesson 7: How do feedback loops affect Earth's systems?",
              ],
            },
            "Lesson Set 3: How well would the berm solution work in the context of Earth systems?": {
              lessons: [
                "Lesson 8: What is going on where the ice meets the water?",
                "Lesson 9: Why does warm salty water sink to melt a glacier?",
                "Lesson 10: How can we measure the energy transfer a berm prevents?",
                "Lesson 11: How does heat affect the amount of ice melt?",
                "Lesson 12: How can we slow the flow of energy on Earth to protect vulnerable coastal communities?",
                "Lesson 13: How can we model what will happen to Earth's climate if humans make changes?",
              ],
            },
          },
        },
        "Unit 3: What causes lightning and why are some places safer than others when it strikes?": {
          topics: {
            "Lesson Set 1: What is lightning?": {
              lessons: [
                "Lesson 1: When and where does lightning occur and what are its impacts?",
                "Lesson 2: What parts of the (smaller-scale) system might be causing the (smaller-scale) lightning?",
                "Lesson 3: What is the spark in the water dropper system and what else is happening in the system before it appears?",
                "Lesson 4: What happens when we produce static electricity?",
                "Lesson 5: What is happening at a particle level to produce static effects?",
              ],
            },
            "Lesson Set 2: What causes a lightning strike?": {
              lessons: [
                "Lesson 6: What causes static in a lightning system?",
                "Lesson 7: How are electrostatic forces between objects affected by the amount of charge and the distance between them?",
                "Lesson 8: How can something that is neutral have an attractive or repulsive interaction with another object without any contact?",
                "Lesson 9: How can we revise our models to explain what we have figured out about the lightning system?",
              ],
            },
            "Lesson Set 3: How and why does a lightning strike transfer so much energy?": {
              lessons: [
                "Lesson 10: Where does the energy come from for lightning to strike across miles of air?",
                "Lesson 11: Why do the electrons build up in the cloud and then jump to the ground suddenly?",
              ],
            },
            "Lesson Set 4: What makes some places safer than others when lightning strikes?": {
              lessons: [
                "Lesson 12: Why are some structures safer than others (and safer than being outside)?",
                "Lesson 13: Why are you supposed to get away from water when there is lightning nearby?",
                "Lesson 14: Why are some places safer than others when lightning strikes?",
              ],
            },
          },
        },
        "Unit 4: How can chemistry help us evaluate fuels and transportation options to benefit the Earth and our communities?": {
          topics: {
            "Lesson Set 1: How do carbon-based fuels release energy?": {
              lessons: [
                "Lesson 1: What different fuels have we used, and do we currently use, for transportation?",
                "Lesson 2: What is happening to the fuels inside the engine to make the vehicle move?",
                "Lesson 3: How can diesel engines be working so differently from gasoline engines?",
                "Lesson 4: Why do we need to put energy into the system to start the reaction?",
                "Lesson 5: How and why is energy released when we burn carbon-based fuels?",
                "Lesson 6: How does the amount of energy we put into the reaction system compare to the energy we get out?",
                "Lesson 7: How can fuels release different amounts of energy when they all have bonds breaking and forming?",
                "Lesson 8: How does our understanding of carbon-based fuels inform our decision-making?",
              ],
            },
            "Lesson Set 2: How do fuels that are not carbon based release energy?": {
              lessons: [
                "Lesson 9: Where is the energy coming from (and what are some trade-offs) when we use batteries to power vehicles?",
                "Lesson 10: How can we use hydrogen as a fuel and what are the impacts?",
                "Lesson 11: Where is the energy coming from when we use uranium as a fuel?",
                "Lesson 12: How can our knowledge of fuel trade-offs support our evaluation of future rocket fuels?",
              ],
            },
            "Lesson Set 3: How can we use what we have learned to improve our transportation system?": {
              lessons: [
                "Lesson 13: Why do we use some fuels rather than others?",
                "Lesson 14: How do we decide on the best transportation options for our future?",
                "Lesson 15: How can we make transportation decisions to benefit our communities and Earth?",
              ],
            },
          },
        },
        "Unit 5: How can we find, make, and recycle the substances we need to live on and beyond Earth?": {
          topics: {
            "Lesson Set 1: How can we find water and other substances we need to survive on other objects in space?": {
              lessons: [
                "Lesson 1: What substances would we need and how would we get them to live and work beyond Earth?",
                "Lesson 2: How does water support life and chemical reactions?",
                "Lesson 3: How can we find evidence of the water we need on the surfaces of other objects in space?",
                "Lesson 4: How and why do water and other liquids interact with materials to make surface features?",
                "Lesson 5: How can we tell what is in the atmosphere (and just below the surface) of objects in space?",
              ],
            },
            "Lesson Set 2: Why do we need certain types of atoms to create the substances we need?": {
              lessons: [
                "Lesson 6: What patterns are there between the types of atoms and the number of bonds they form in the resources we need?",
                "Lesson 7: Why is there a difference between the number of electrons an element has and the number of bonds an element forms?",
                "Lesson 8: Could another substance serve as a substitute for water for some of the processes we need to use it for in space?",
                "Lesson 9: How can the ideas we developed be applied to making a possible substitute for another substance?",
              ],
            },
            "Lesson Set 3: How can we make the substances we need to survive off of Earth using the existing matter in the solar system?": {
              lessons: [
                "Lesson 10: Why do we need water in so many reactions?",
                "Lesson 11: How can we grow food in space?",
                "Lesson 12: Which location(s) in the solar system has the elements we need and what relative amount is required to make any substance?",
              ],
            },
            "Lesson Set 4: How can we be more sustainable in what we use and produce?": {
              lessons: [
                "Lesson 13: Why can we recycle some of the substances we need and not others?",
                "Lesson 14: What are some more sustainable approaches we are developing to help us make the things we need off of Earth and on it?",
                "Lesson 15: What is the full impact of going to space?",
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
        units: {}
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
