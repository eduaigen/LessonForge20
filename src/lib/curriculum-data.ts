
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
                    "Engage & Explore": { lessons: ["Lesson 1: Anchor Phenomenon", "Lesson 2: Naked-Eye Observations", "Lesson 3: Tools for Observation"] },
                    "Earth and the Moon": { lessons: ["Lesson 4: Earth's Rotation", "Lesson 5: Moon Phases", "Lesson 6: Eclipses"] },
                    "Modeling the Sun": { lessons: ["Lesson 7: Sun's Apparent Path", "Lesson 8: Seasonal Changes", "Lesson 9: Solar Energy"] },
                    "Interpreting Data About Distant Objects": { lessons: ["Lesson 10: Light from Stars", "Lesson 11: The H-R Diagram", "Lesson 12: Galaxies"] },
                    "Unit Closing": { lessons: ["Lesson 13: Final Performance Task"] }
                }
            },
            "Unit 2: Earthquakes, Volcanoes, and Tsunamis: Who's at Risk?": {
                topics: {
                    "Engage & Launch": { lessons: ["Lesson 1: Anchor Phenomenon", "Lesson 2: Earth's Layers", "Lesson 3: Plate Tectonics"] },
                    "Tectonic Movement and Plate Boundaries": { lessons: ["Lesson 4: Plate Boundaries", "Lesson 5: Earthquakes", "Lesson 6: Volcanoes"] },
                    "Natural Hazard Data": { lessons: ["Lesson 7: Mapping Hazards", "Lesson 8: Tsunami Risk", "Lesson 9: Social Vulnerability"] },
                    "Earthquake Engineering": { lessons: ["Lesson 10: Engineering for Earthquakes", "Lesson 11: Community Resilience"] },
                    "Unit Closing": { lessons: ["Lesson 12: Final Performance Task"] }
                }
            },
            "Unit 3: Climate Change Throughout Human History": {
                topics: {
                    "Engage and Ice Core Data": { lessons: ["Lesson 1: Anchor Phenomenon", "Lesson 2: Ice Cores", "Lesson 3: Analyzing Ice Core Data"] },
                    "Global Warming and Carbon Emissions": { lessons: ["Lesson 4: The Greenhouse Effect", "Lesson 5: The Carbon Cycle", "Lesson 6: Human Impact on Climate"] },
                    "Sea Level and Ecosystem Effects": { lessons: ["Lesson 7: Sea Level Rise", "Lesson 8: Ecosystem Impacts"] },
                    "Geoengineering and Mitigation": { lessons: ["Lesson 9: Mitigation Strategies", "Lesson 10: Geoengineering"] },
                    "Unit Closing": { lessons: ["Lesson 11: Final Performance Task"] }
                }
            },
            "Unit 4: More Hurricanes and Blizzards in NYC?": {
                topics: {
                    "Extreme Weather Patterns": { lessons: ["Lesson 1: Anchor Phenomenon", "Lesson 2: Weather vs. Climate", "Lesson 3: Air Masses and Fronts"] },
                    "Hurricane Frequency": { lessons: ["Lesson 4: Hurricane Formation", "Lesson 5: Hurricane Data Analysis", "Lesson 6: Climate Change and Hurricanes"] },
                    "Blizzard Analysis": { lessons: ["Lesson 7: Blizzard Formation", "Lesson 8: Blizzard Data Analysis"] },
                    "Infrastructure Resilience": { lessons: ["Lesson 9: Infrastructure Vulnerability", "Lesson 10: Designing for Resilience"] },
                    "Unit Closing": { lessons: ["Lesson 11: Final Performance Task"] }
                }
            },
            "Unit 5: Solutions for a Sustainable Future": {
                topics: {
                    "Burning Fossil Fuels": { lessons: ["Lesson 1: Fossil Fuels and Energy", "Lesson 2: Air Pollution", "Lesson 3: Water Pollution", "Lesson 4: Acid Rain", "Lesson 5: The Ozone Layer", "Lesson 6: Renewable Energy", "Lesson 7: Nuclear Energy", "Lesson 8: Energy Efficiency", "Lesson 9: Policy Solutions", "Lesson 10: Individual Action"] },
                    "Land Use & Biodiversity": { lessons: ["Lesson 11: Deforestation", "Lesson 12: Urbanization", "Lesson 13: Agriculture", "Lesson 14: Biodiversity", "Lesson 15: Habitat Destruction", "Lesson 16: Conservation"] },
                    "Mining": { lessons: ["Lesson 17: Mineral Resources", "Lesson 18: Mining Techniques", "Lesson 19: Environmental Impacts of Mining", "Lesson 20: Social Impacts of Mining", "Lesson 21: Sustainable Mining Practices", "Lesson 22: Recycling Minerals", "Lesson 23: Conflict Minerals"] },
                    "Unit Closing": { lessons: ["Lesson 24: Stakeholder Meeting Simulation", "Lesson 25: Sustainability Plan", "Lesson 26: Final Presentation"] }
                }
            },
            "Unit 6: Probability of Life Elsewhere": {
                topics: {
                    "Stability of the Solar System": { lessons: ["Lesson 1: Gravity and Orbits", "Lesson 2: The Goldilocks Zone", "Lesson 3: Earth's Magnetic Field", "Lesson 4: The Role of Jupiter", "Lesson 5: The Moon's Influence", "Lesson 6: Long-Term Stability", "Lesson 7: Exoplanets"] },
                    "Coevolution of Earth and Life": { lessons: ["Lesson 8: Early Earth", "Lesson 9: Origin of Life", "Lesson 10: Photosynthesis and Oxygen", "Lesson 11: Mass Extinctions", "Lesson 12: Humans and the Biosphere"] },
                    "Origin of the Universe": { lessons: ["Lesson 13: The Big Bang", "Lesson 14: Evidence for the Big Bang", "Lesson 15: Stellar Evolution", "Lesson 16: Formation of Elements", "Lesson 17: The Drake Equation"] },
                    "Asteroid Orbits": { lessons: ["Lesson 18: Asteroids and Comets", "Lesson 19: Impact Events", "Lesson 20: Near-Earth Objects", "Lesson 21: Planetary Defense", "Lesson 22: The Search for Extraterrestrial Intelligence (SETI)"] },
                    "Unit Closing": { lessons: ["Lesson 23: Final Performance Task"] }
                }
            }
        }
    },
    Chemistry: {
      units: {
        'Atomic Structure': {
          topics: {
            'Protons, Neutrons, Electrons': { lessons: ['Atomic Number and Mass', 'Subatomic Particles'] },
            'Isotopes': { lessons: ['Defining Isotopes', 'Calculating Average Atomic Mass'] },
            'Electron Configurations': { lessons: ['Aufbau Principle', 'Orbital Diagrams'] },
          },
        },
        'Chemical Bonding & Stoichiometry': {
          topics: {
            'Ionic Bonds': { lessons: ['Cations and Anions', 'Properties of Ionic Compounds'] },
            'Covalent Bonds': { lessons: ['Lewis Structures', 'Polarity'] },
            'The Mole': { lessons: ['Avogadro\'s Number', 'Molar Mass'] },
            'Balancing Equations': { lessons: ['Law of Conservation of Mass', 'Stoichiometric Ratios'] },
          },
        },
        'Organic Chemistry': {
          topics: {
            'Alkanes': { lessons: ['Naming Alkanes', 'Properties of Alkanes'] },
            'Alkenes': { lessons: ['Naming Alkenes', 'Addition Reactions'] },
            'Alkynes': { lessons: ['Naming Alkynes', 'Properties of Alkynes'] },
            'Functional Groups': { lessons: ['Alcohols, Ethers, Aldehydes', 'Ketones, Carboxylic Acids'] },
          },
        },
      },
    },
    Physics: {
      units: {
        'Kinematics': {
          topics: {
            'Displacement, Velocity, and Acceleration': { lessons: ['1D Motion', 'Motion Graphs'] },
            'Projectile Motion': { lessons: ['Horizontal Launch', 'Angled Launch'] },
            'Uniform Circular Motion': { lessons: ['Centripetal Force', 'Period and Frequency'] },
          },
        },
        'Electricity & Magnetism': {
          topics: {
            "Ohm's Law": { lessons: ['Voltage, Current, Resistance', 'Series Circuits'] },
            "Kirchhoff's Laws": { lessons: ['Junction Rule', 'Loop Rule'] },
            "Magnetic Fields": { lessons: ['Forces on Moving Charges', 'Electromagnets'] },
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
      units: {
        "Grade 9: Unit 1: Journeys of Identity": {
            "topics": {
                "Analyzing Narrative and Character in 'The House on Mango Street'": {
                    "lessons": [
                        "Day 1: Unit Introduction: What is Identity?",
                        "Day 2: Engage: Identity Mapping",
                        "Day 3: Anchor Text Introduction: First Look",
                        "Day 4: Close Reading & Annotation Practice",
                        "Day 5: Discussion: First Impressions",
                        "Day 6: Citing Textual Evidence",
                        "Day 7: Figurative Language Workshop 1",
                        "Day 8: Analyzing Character Voice",
                        "Day 9: Reading for Thematic Development",
                        "Day 10: Writing Workshop: Claim-Evidence-Reasoning",
                        "Day 11: Thematic Analysis: Shame and Hope",
                        "Day 12: Group Discussion: Thematic Patterns",
                        "Day 13: Figurative Language Workshop 2",
                        "Day 14: Reading and Connecting",
                        "Day 15: Checkpoint: Thematic Analysis",
                        "Day 16: Analyzing Narrative Structure",
                        "Day 17: Intro to Personal Narratives",
                        "Day 18: Brainstorming Workshop: 'My Own Mango Street'",
                        "Day 19: Narrative Craft: Show, Don't Tell",
                        "Day 20: Drafting the Personal Narrative",
                        "Day 21: Peer Review Workshop 1",
                        "Day 22: Revision Workshop: Voice and Tone",
                        "Day 23: Connecting Texts: Poetry of Identity",
                        "Day 24: Comparative Discussion",
                        "Day 25: Peer Review Workshop 2",
                        "Day 26: Revision Workshop: Polishing the Narrative",
                        "Day 27: Publishing and Sharing",
                        "Day 28: Connecting Texts: Non-fiction",
                        "Day 29: Synthesizing Ideas",
                        "Day 30: Summative Task Intro: Thematic Essay",
                        "Day 31: Essay Workshop: Developing a Thesis",
                        "Day 32: Essay Workshop: Gathering Evidence",
                        "Day 33: Essay Workshop: Outlining",
                        "Day 34: Drafting the Essay: Introduction",
                        "Day 35: Drafting the Essay: Body Paragraphs",
                        "Day 36: Drafting the Essay: Conclusion",
                        "Day 37: Self-Revision Workshop",
                        "Day 38: Peer Review Essay Workshop",
                        "Day 39: Final Revisions and Editing",
                        "Day 40: Final Essay Due. Socratic Seminar Prep",
                        "Day 41: Unit Closure: Socratic Seminar",
                        "Day 42: Creative Response to Text",
                        "Day 43: Gallery Walk and Sharing",
                        "Day 44: Unit Reflection",
                        "Day 45: Portfolio Review and Goal Setting"
                    ]
                }
            }
        },
        "Grade 9: Unit 2: The Power of Persuasion": {
            "topics": {
                "Deconstructing Arguments": {
                    "lessons": [
                        "Day 1: Unit Introduction: What is Persuasion?",
                        "Day 2: Engage: Analyzing Advertisements",
                        "Day 3: Introduction to Rhetoric: Ethos, Pathos, Logos",
                        "Day 4: Identifying Appeals in Speeches",
                        "Day 5: Anchor Text Introduction",
                        "Day 6: Delineating an Argument",
                        "Day 7: Evaluating Evidence",
                        "Day 8: Analyzing Word Choice and Tone",
                        "Day 9: Rhetorical Devices Workshop",
                        "Day 10: Writing Workshop: Rhetorical Analysis Paragraph",
                        "Day 11: Author's Purpose and Point of View",
                        "Day 12: Reading a Counter-Argument",
                        "Day 13: Comparative Analysis",
                        "Day 14: Introduction to Logical Fallacies",
                        "Day 15: Identifying Fallacies in Media",
                        "Day 16: Evaluating Speaker's Reasoning",
                        "Day 17: Integrating Information from Diverse Media",
                        "Day 18: Debate Preparation",
                        "Day 19: Class Debate",
                        "Day 20: Debate Reflection",
                        "Day 21: Argumentative Writing Intro",
                        "Day 22: Topic Selection and Brainstorming",
                        "Day 23: Research Workshop 1: Formulating Questions",
                        "Day 24: Research Workshop 2: Finding Credible Sources",
                        "Day 25: Writing Workshop: Crafting a Thesis Statement",
                        "Day 26: Outlining the Argument",
                        "Day 27: Workshop: Acknowledging the Counterclaim",
                        "Day 28: Drafting: Introduction",
                        "Day 29: Drafting: Body Paragraphs with Evidence",
                        "Day 30: Drafting: Conclusion",
                        "Day 31: Language for Effect: Academic Vocabulary",
                        "Day 32: Language for Effect: Transitions",
                        "Day 33: Self-Revision Workshop",
                        "Day 34: Peer Review Workshop",
                        "Day 35: Revising Based on Feedback",
                        "Day 36: Editing and Proofreading",
                        "Day 37: Adapting Writing for Presentation",
                        "Day 38: Presentation Workshop: Using Visuals",
                        "Day 39: Presentation Workshop: Delivery",
                        "Day 40: Presentation Rehearsals",
                        "Day 41: Persuasive Presentations Day 1",
                        "Day 42: Persuasive Presentations Day 2",
                        "Day 43: Final Paper Submission",
                        "Day 44: Unit Closure: Socratic Seminar",
                        "Day 45: Unit Reflection"
                    ]
                }
            }
        },
        "Grade 9: Unit 3: Structure and Story": {
            "topics": {
                "Analyzing Text Structure and Form": {
                    "lessons": [
                        "Day 1: Unit Introduction: What is Narrative Structure?",
                        "Day 2: Engage: Playing with Story",
                        "Day 3: Anchor Text Introduction",
                        "Day 4: Plotting the Story: Freytag's Pyramid",
                        "Day 5: Reading and Mapping the Plot",
                        "Day 6: Structural Elements: Chronological vs. Non-linear",
                        "Day 7: Workshop: Analyzing Foreshadowing",
                        "Day 8: Workshop: Analyzing Flashbacks",
                        "Day 9: Pacing and Tension",
                        "Day 10: Writing Workshop: Structural Analysis Paragraph",
                        "Day 11: Point of View 1: First and Third Person",
                        "Day 12: Point of View 2: Analyzing POV in the Anchor Text",
                        "Day 13: Creative Writing: Shifting Perspectives",
                        "Day 14: Reading and Analyzing Subplots",
                        "Day 15: Discussion: Structure and Theme",
                        "Day 16: Introduction to the Analytical Essay",
                        "Day 17: Essay Workshop: Thesis Development",
                        "Day 18: Essay Workshop: Finding Evidence for Structure",
                        "Day 19: Essay Workshop: Outlining",
                        "Day 20: Drafting the Analytical Essay",
                        "Day 21: Peer Review: Thesis and Introduction",
                        "Day 22: Continued Drafting",
                        "Day 23: Language Workshop: Writing with Precision",
                        "Day 24: Revising for Clarity and Cohesion",
                        "Day 25: Editing and Proofreading",
                        "Day 26: Elaboration Intro: Text to Film Adaptation",
                        "Day 27: Film Viewing Day 1",
                        "Day 28: Film Viewing Day 2",
                        "Day 29: Comparative Analysis: What Changed?",
                        "Day 30: Discussion: The 'Why' of Adaptation",
                        "Day 31: Project Intro: Comparative Presentation",
                        "Day 32: Scene Selection and Analysis",
                        "Day 33: Film Scene Analysis",
                        "Day 34: Developing a Comparative Claim",
                        "Day 35: Storyboarding the Presentation",
                        "Day 36: Presentation Workshop: Clear and Logical Reporting",
                        "Day 37: Presentation Workshop: Delivery",
                        "Day 38: Presentation Rehearsals",
                        "Day 39: Submit Analytical Essay",
                        "Day 40: Presentations Day 1",
                        "Day 41: Presentations Day 2",
                        "Day 42: Presentations Day 3",
                        "Day 43: Unit Closure: Socratic Seminar",
                        "Day 44: Creative Response",
                        "Day 45: Unit Reflection"
                    ]
                }
            }
        },
        "Grade 9: Unit 4: Research and Inquiry": {
            "topics": {
                "The Research Process": {
                    "lessons": [
                        "Day 1: Unit Introduction: The Power of Inquiry",
                        "Day 2: Engage: Sparking Curiosity",
                        "Day 3: From Broad Topic to Focused Question",
                        "Day 4: Keywords and Search Strategies",
                        "Day 5: Library/Database Orientation",
                        "Day 6: Source Evaluation 1: The CRAAP Test",
                        "Day 7: Source Evaluation 2: Primary vs. Secondary Sources",
                        "Day 8: Assessing Usefulness of Sources",
                        "Day 9: Research Check-in and Question Refinement",
                        "Day 10: Introduction to the Annotated Bibliography",
                        "Day 11: Note-Taking Strategies 1: Paraphrasing",
                        "Day 12: Note-Taking Strategies 2: Summarizing",
                        "Day 13: Note-Taking Strategies 3: Direct Quotation",
                        "Day 14: Avoiding Plagiarism",
                        "Day 15: Citation Workshop 1: MLA Basics",
                        "Day 16: Writing Annotations",
                        "Day 17: Peer Review: Annotated Bibliography",
                        "Day 18: Annotated Bibliography Due",
                        "Day 19: Synthesizing Information: Finding Connections",
                        "Day 20: Developing a Working Thesis",
                        "Day 21: Outlining the Research Paper",
                        "Day 22: Drafting the Introduction",
                        "Day 23: Drafting Body Paragraphs with Synthesis",
                        "Day 24: Workshop: Integrating Quotations",
                        "Day 25: Drafting the Conclusion",
                        "Day 26: Self-Revision Workshop",
                        "Day 27: Peer Review Workshop: Research Paper",
                        "Day 28: Revising Based on Feedback",
                        "Day 29: Citation Workshop 2: Works Cited Page",
                        "Day 30: Final Editing and Proofreading",
                        "Day 31: Research Paper Due",
                        "Day 32: From Paper to Presentation",
                        "Day 33: Presentation Storyboarding",
                        "Day 34: Workshop: Effective Visual Aids",
                        "Day 35: Creating Visuals",
                        "Day 36: Presentation Delivery Workshop",
                        "Day 37: Presentation Rehearsal Day 1",
                        "Day 38: Presentation Rehearsal Day 2",
                        "Day 39: Research Symposium Day 1",
                        "Day 40: Research Symposium Day 2",
                        "Day 41: Research Symposium Day 3",
                        "Day 42: Research Symposium Day 4",
                        "Day 43: Evaluating Texts and Research",
                        "Day 44: Unit Closure: What Have We Learned?",
                        "Day 45: Unit Reflection"
                    ]
                }
            }
        },
        "Grade 10: Unit 1: Truth and Perspective": {
            "topics": {
                "Point of View and Reliability": {
                    "lessons": [
                        "Day 1: Unit Introduction: What is Truth?",
                        "Day 2: Engage: A Question of Truth",
                        "Day 3: Defining Point of View and Narrator Reliability",
                        "Day 4: Anchor Text Introduction",
                        "Day 5: Reading and First Impressions",
                        "Day 6: Analyzing Diction and Tone",
                        "Day 7: Tracking the Narrative",
                        "Day 8: Character Motivation",
                        "Day 9: Group Discussion: Is the Narrator Trustworthy?",
                        "Day 10: Writing Workshop: Character Voice Journal",
                        "Day 11: How Perspective Shapes Plot",
                        "Day 12: The Impact of an Unreliable Narrator",
                        "Day 13: Reading and Analyzing a Key Scene",
                        "Day 14: Socratic Seminar Preparation",
                        "Day 15: Socratic Seminar",
                        "Day 16: Connecting to Other Perspectives",
                        "Day 17: Comparative Analysis",
                        "Day 18: Introduction to the Analytical Essay",
                        "Day 19: Essay Workshop: Developing a Thesis",
                        "Day 20: Essay Workshop: Gathering Evidence",
                        "Day 21: Elaboration: Rewriting a Scene",
                        "Day 22: Creative Writing Workshop: Capturing a New Voice",
                        "Day 23: Peer Review: Creative Scene",
                        "Day 24: Sharing Rewritten Scenes",
                        "Day 25: Connecting Creative and Analytical Writing",
                        "Day 26: Essay Workshop: Outlining",
                        "Day 27: Drafting the Essay: Introduction and Body",
                        "Day 28: Drafting the Essay: Conclusion",
                        "Day 29: Figurative Language and Nuance",
                        "Day 30: Revising for Argument",
                        "Day 31: Revising for Clarity and Style",
                        "Day 32: Peer Review Workshop: Full Essay",
                        "Day 33: Final Revisions",
                        "Day 34: Editing and Proofreading",
                        "Day 35: Final Essay Submission",
                        "Day 36: Introduction to a New Text with Multiple Perspectives",
                        "Day 37: Comparing Narrative Structures",
                        "Day 38: Evaluating a Speaker's Perspective",
                        "Day 39: Discussion: Truth in Non-Fiction",
                        "Day 40: Debate: Is Objective Truth Possible?",
                        "Day 41: Creative Response Project Intro",
                        "Day 42: Creative Project Work Day",
                        "Day 43: Creative Project Work Day",
                        "Day 44: Project Showcase",
                        "Day 45: Unit Reflection"
                    ]
                }
            }
        },
        "Grade 10: Unit 2: Utopia and Dystopia": {
            "topics": {
                "Analyzing Dystopian Societies": {
                    "lessons": [
                        "Day 1: Unit Introduction: The Concept of Utopia",
                        "Day 2: Engage: Designing a Perfect World",
                        "Day 3: Presenting Utopias",
                        "Day 4: Characteristics of Dystopian Fiction",
                        "Day 5: Anchor Text Introduction",
                        "Day 6: World-Building Analysis",
                        "Day 7: Analyzing Dystopian Control",
                        "Day 8: The Dystopian Protagonist",
                        "Day 9: Reading and Discussion",
                        "Day 10: Writing Workshop: World-Building Paragraph",
                        "Day 11: Thematic Development: Conformity vs. Individuality",
                        "Day 12: Analyzing Propaganda",
                        "Day 13: Symbolism in Dystopian Literature",
                        "Day 14: Reading and Analyzing the Climax",
                        "Day 15: Socratic Seminar",
                        "Day 16: Connecting to the Real World: Research Mini-Project",
                        "Day 17: Research Day",
                        "Day 18: Making Connections",
                        "Day 19: Sharing Connections",
                        "Day 20: Summative Essay Introduction",
                        "Day 21: Essay Workshop: Thesis Development",
                        "Day 22: Essay Workshop: Gathering Evidence",
                        "Day 23: Essay Workshop: Outlining",
                        "Day 24: Drafting the Explanatory Essay",
                        "Day 25: Peer Review Workshop",
                        "Day 26: Revising the Essay",
                        "Day 27: Vocabulary and Precise Language",
                        "Day 28: Finalizing the Explanatory Essay",
                        "Day 29: Elaboration: Dystopia on Screen Intro",
                        "Day 30: Film Viewing Day 1",
                        "Day 31: Film Viewing Day 2",
                        "Day 32: Comparative Analysis: Book vs. Film",
                        "Day 33: Discussion: Analyzing Adaptation Choices",
                        "Day 34: Creative Response Intro: Your Dystopia",
                        "Day 35: Creative Project: World-Building",
                        "Day 36: Creative Project: The Protagonist",
                        "Day 37: Creative Project: Writing a Scene",
                        "Day 38: Creative Project Workshop",
                        "Day 39: Finalizing Creative Projects",
                        "Day 40: Submit Explanatory Essay",
                        "Day 41: Dystopian Showcase Day 1",
                        "Day 42: Dystopian Showcase Day 2",
                        "Day 43: Unit Closure Discussion",
                        "Day 44: Final Thematic Connection",
                        "Day 45: Unit Reflection"
                    ]
                }
            }
        },
        "Grade 10: Unit 3: Foundational Myths and Modern Meanings": {
            "topics": {
                "Exploring Archetypes and Allusions": {
                    "lessons": [
                        "Day 1: Unit Introduction: What is a Myth?",
                        "Day 2: Engage: Modern Heroes and Monsters",
                        "Day 3: The Hero's Journey",
                        "Day 4: Reading Foundational Myths 1: Creation Myths",
                        "Day 5: Reading Foundational Myths 2: Hero Myths",
                        "Day 6: Character Archetypes",
                        "Day 7: Anchor Text Introduction",
                        "Day 8: Identifying Mythological Parallels",
                        "Day 9: Analyzing Allusions",
                        "Day 10: Reading the Anchor Text",
                        "Day 11: Transformation of Character",
                        "Day 12: Transformation of Theme",
                        "Day 13: Discussion: Why Adapt Myths?",
                        "Day 14: Reading and Discussion",
                        "Day 15: Socratic Seminar",
                        "Day 16: Myths Across Media",
                        "Day 17: Comparative Analysis: Different Media",
                        "Day 18: Creative Response Project Introduction",
                        "Day 19: Brainstorming for Creative Adaptation",
                        "Day 20: Project Planning",
                        "Day 21: Creative Writing Workshop: Narrative",
                        "Day 22: Creative Writing Workshop: Poetry",
                        "Day 23: Creative Project Work Day",
                        "Day 24: Peer Review Workshop",
                        "Day 25: Revising Creative Projects",
                        "Day 26: Analytical Essay Introduction",
                        "Day 27: Essay Workshop: Comparative Thesis",
                        "Day 28: Essay Workshop: Structuring a Comparative Essay",
                        "Day 29: Essay Workshop: Gathering Evidence",
                        "Day 30: Drafting the Comparative Essay",
                        "Day 31: Finalizing Creative Projects",
                        "Day 32: Peer Review: Comparative Essay",
                        "Day 33: Revising the Comparative Essay",
                        "Day 34: Language Workshop: Academic Vocabulary",
                        "Day 35: Editing and Proofreading",
                        "Day 36: Submit Comparative Essay",
                        "Day 37: Presentation Skills Workshop",
                        "Day 38: Presentation Preparation",
                        "Day 39: Mythology Showcase Day 1",
                        "Day 40: Mythology Showcase Day 2",
                        "Day 41: Mythology Showcase Day 3",
                        "Day 42: Gallery Walk",
                        "Day 43: Unit Closure Discussion",
                        "Day 44: Connecting to Personal Experience",
                        "Day 45: Unit Reflection"
                    ]
                }
            }
        },
        "Grade 10: Unit 4: The Language of Poetry": {
            "topics": {
                "Sound and Sense in Poetry": {
                    "lessons": [
                        "Day 1: Unit Introduction: What is Poetry?",
                        "Day 2: Engage: Hearing the Music in Language",
                        "Day 3: Figurative Language 1: Simile and Metaphor",
                        "Day 4: Figurative Language 2: Personification and Imagery",
                        "Day 5: Sound Devices 1: Alliteration and Assonance",
                        "Day 6: Sound Devices 2: Rhyme and Rhythm",
                        "Day 7: Connotation and Denotation",
                        "Day 8: Close Reading a Poem: TP-CASTT",
                        "Day 9: Applying TP-CASTT",
                        "Day 10: Writing Workshop: Short Analysis",
                        "Day 11: Poetic Structure 1: The Stanza and the Line",
                        "Day 12: Poetic Structure 2: Fixed Forms (The Sonnet)",
                        "Day 13: Poetic Structure 3: Free Verse",
                        "Day 14: Comparing Forms",
                        "Day 15: Discussion: Form and Freedom",
                        "Day 16: Creative Writing Intro: Poetry Imitation",
                        "Day 17: Imitation Workshop 1: Sound",
                        "Day 18: Imitation Workshop 2: Figurative Language",
                        "Day 19: Imitation Workshop 3: Form",
                        "Day 20: Peer Review: Imitation Poems",
                        "Day 21: Creative Writing: Personal Experience",
                        "Day 22: Drafting Workshop 1: Getting Ideas Down",
                        "Day 23: Drafting Workshop 2: Shaping the Poem",
                        "Day 24: Revision Workshop: The Power of the Verb",
                        "Day 25: Revision Workshop: Cutting Clutter",
                        "Day 26: Poetry Peer Review",
                        "Day 27: Finalizing Personal Poems",
                        "Day 28: Poetry Anthology Project Introduction",
                        "Day 29: Selecting Poems for Anthology",
                        "Day 30: Writing Analyses for Anthology",
                        "Day 31: Anthology Work Day",
                        "Day 32: Anthology Peer Review",
                        "Day 33: Finalizing Anthologies",
                        "Day 34: Performance Poetry Intro",
                        "Day 35: Analyzing a Spoken Word Performance",
                        "Day 36: Preparing for a Poetry Slam",
                        "Day 37: Performance Workshop",
                        "Day 38: Presentation Visuals",
                        "Day 39: Poetry Slam Day 1",
                        "Day 40: Poetry Slam Day 2",
                        "Day 41: Poetry Slam Day 3",
                        "Day 42: Submit Poetry Anthology",
                        "Day 43: Found Poetry Workshop",
                        "Day 44: Unit Closure Discussion",
                        "Day 45: Unit Reflection"
                    ]
                }
            }
        },
        "Grade 11: Unit 1: The American Experience": {
            "topics": {
                "Analyzing Foundational American Texts": {
                    "lessons": [
                        "Day 1: Unit Introduction: The American Question",
                        "Day 2: Engage: Defining 'American'",
                        "Day 3: Reading Foundational Text 1",
                        "Day 4: Analyzing Rhetoric in Foundational Texts",
                        "Day 5: Reading Foundational Text 2: A Competing Vision",
                        "Day 6: Comparative Analysis Workshop",
                        "Day 7: Discussion: Ideals vs. Realities",
                        "Day 8: Anchor Text Introduction (e.g., The Great Gatsby)",
                        "Day 9: Reading and Annotating the Anchor Text",
                        "Day 10: Analyzing Character as Symbol",
                        "Day 11: The American Dream in the Anchor Text",
                        "Day 12: Socratic Seminar on the Anchor Text",
                        "Day 13: Literary Criticism 1: Introduction",
                        "Day 14: Applying a Critical Lens",
                        "Day 15: Writing Workshop: Integrating Critical Voices",
                        "Day 16: Connecting to Contemporary Voices: Poetry",
                        "Day 17: Connecting to Contemporary Voices: Non-Fiction",
                        "Day 18: Synthesis Discussion",
                        "Day 19: Introduction to the Synthesis Essay",
                        "Day 20: Essay Workshop: Formulating a Complex Thesis",
                        "Day 21: Essay Workshop: Selecting and Organizing Evidence",
                        "Day 22: Essay Workshop: Outlining the Synthesis Essay",
                        "Day 23: Drafting the Introduction",
                        "Day 24: Drafting Body Paragraphs with Synthesis",
                        "Day 25: Language Workshop: Varying Syntax",
                        "Day 26: Continued Drafting",
                        "Day 27: Self-Revision Workshop",
                        "Day 28: Peer Review Workshop",
                        "Day 29: Revision Planning",
                        "Day 30: Revising the Essay",
                        "Day 31: Workshop on Figurative Language and Nuance",
                        "Day 32: Editing and Proofreading",
                        "Day 33: Final Synthesis Essay Due",
                        "Day 34: Preparing for a Harkness Discussion",
                        "Day 35: Harkness Discussion Day 1",
                        "Day 36: Harkness Discussion Day 2",
                        "Day 37: Discussion Reflection",
                        "Day 38: Creative Response Project",
                        "Day 39: Creative Project Work Day",
                        "Day 40: Sharing Creative Responses",
                        "Day 41: Final Text: A Modern Speech",
                        "Day 42: Connecting Past and Present",
                        "Day 43: Unit Closure Discussion",
                        "Day 44: Portfolio Curation",
                        "Day 45: Unit Reflection"
                    ]
                }
            }
        },
        "Grade 11: Unit 2: The Author's Craft": {
            "topics": {
                "Deconstructing Authorial Style": {
                    "lessons": [
                        "Day 1: Unit Introduction: What is Style?",
                        "Day 2: Engage: Recognizing a Voice",
                        "Day 3: Author Study Introduction",
                        "Day 4: Reading and Annotating for Style",
                        "Day 5: Deconstructing Diction",
                        "Day 6: Deconstructing Syntax",
                        "Day 7: Discussion: The 'Stylistic Fingerprint'",
                        "Day 8: Reading Anchor Text 2",
                        "Day 9: Analyzing Tone and Mood",
                        "Day 10: Workshop: Writing a Style Analysis Paragraph",
                        "Day 11: Analyzing Narrative Structure",
                        "Day 12: Analyzing Thematic Development",
                        "Day 13: Figurative Language and Symbolism",
                        "Day 14: Socratic Seminar Preparation",
                        "Day 15: Socratic Seminar: Style and Meaning",
                        "Day 16: Literary Criticism on the Author",
                        "Day 17: Synthesizing Critical Perspectives",
                        "Day 18: Introduction to the Literary Argument Essay",
                        "Day 19: Essay Workshop: Formulating a Nuanced Thesis",
                        "Day 20: Essay Workshop: Organizing the Argument",
                        "Day 21: Elaboration: Mentor Text Imitation",
                        "Day 22: Creative Writing: Imitating the Master",
                        "Day 23: Peer Review: Style Imitations",
                        "Day 24: Reflection on Imitation",
                        "Day 25: Drafting the Literary Argument: Introduction",
                        "Day 26: Drafting Body Paragraphs: Diction and Syntax",
                        "Day 27: Drafting Body Paragraphs: Structure and Theme",
                        "Day 28: Drafting with a Critical Voice",
                        "Day 29: Drafting the Conclusion",
                        "Day 30: Self-Revision Workshop",
                        "Day 31: Peer Review Workshop: Full Draft",
                        "Day 32: Revising for a Formal Tone",
                        "Day 33: Final Revisions",
                        "Day 34: Editing Workshop: Advanced Conventions",
                        "Day 35: Final Literary Argument Due",
                        "Day 36: Panel Presentation Introduction",
                        "Day 37: Group Work: Planning the Panel",
                        "Day 38: Creating Presentation Materials",
                        "Day 39: Presentation Rehearsals",
                        "Day 40: Panel Presentations Day 1",
                        "Day 41: Panel Presentations Day 2",
                        "Day 42: Responding to Other Texts by the Author",
                        "Day 43: Unit Closure Discussion",
                        "Day 44: Vocabulary Acquisition",
                        "Day 45: Unit Reflection"
                    ]
                }
            }
        },
        "Grade 11: Unit 3: Shakespeare and Adaptation": {
            "topics": {
                "Reading Shakespeare": {
                    "lessons": [
                        "Day 1: Unit Introduction: Shakespeare's Legacy",
                        "Day 2: Engage: Shakespeare in Pop Culture",
                        "Day 3: Introduction to the Anchor Play",
                        "Day 4: Reading Act I",
                        "Day 5: Analyzing the Inciting Incident",
                        "Day 6: Understanding Shakespearean Language",
                        "Day 7: Reading Act II",
                        "Day 8: Workshop: The Soliloquy",
                        "Day 9: Performance Analysis",
                        "Day 10: Character Foils",
                        "Day 11: Reading Act III",
                        "Day 12: Analyzing the Climax",
                        "Day 13: Thematic Development",
                        "Day 14: Socratic Seminar",
                        "Day 15: Reading Act IV",
                        "Day 16: Reading Act V",
                        "Day 17: Discussion: Tragic Hero",
                        "Day 18: Introduction to Adaptation",
                        "Day 19: Analyzing a Film Adaptation 1",
                        "Day 20: Analyzing a Film Adaptation 2",
                        "Day 21: Comparative Discussion: Play vs. Film",
                        "Day 22: Focus on a Scene: Textual Analysis",
                        "Day 23: Focus on a Scene: Comparative Film Analysis",
                        "Day 24: Workshop: Writing a Comparative Analysis",
                        "Day 25: Evaluating Adaptations",
                        "Day 26: Creative Response: Modern Adaptation Intro",
                        "Day 27: Brainstorming a Modern Context",
                        "Day 28: Scriptwriting Workshop",
                        "Day 29: Drafting the Modern Scene",
                        "Day 30: Peer Review: Modern Scenes",
                        "Day 31: Revising the Modern Scene",
                        "Day 32: Summative Project: Performance/Analysis Intro",
                        "Day 33: Project Work Day 1",
                        "Day 34: Performance Track: Rehearsal",
                        "Day 35: Analysis Track: Thesis Development",
                        "Day 36: Performance Track: Tech and Props",
                        "Day 37: Analysis Track: Outlining and Drafting",
                        "Day 38: Project Work Day: Teacher Conferencing",
                        "Day 39: Final Project Work Day",
                        "Day 40: Shakespeare Festival Day 1: Performances",
                        "Day 41: Shakespeare Festival Day 2: Performances",
                        "Day 42: Analytical Essay Submission",
                        "Day 43: Performance Reflection",
                        "Day 44: Unit Closure Discussion",
                        "Day 45: Unit Reflection"
                    ]
                }
            }
        },
        "Grade 11: Unit 4: The Researched Argument": {
            "topics": {
                "Building a Complex Argument": {
                    "lessons": [
                        "Day 1: Unit Introduction: Writing as Action",
                        "Day 2: Engage: Identifying Public Conversations",
                        "Day 3: Topic Selection and Initial Exploration",
                        "Day 4: Formulating a Research Question",
                        "Day 5: Advanced Source Evaluation",
                        "Day 6: Research Workshop: Academic Databases",
                        "Day 7: Reading and Annotating Scholarly Articles",
                        "Day 8: Synthesizing Sources: Finding the Conversation",
                        "Day 9: Note-Taking and Annotated Bibliography",
                        "Day 10: Developing a Nuanced Thesis",
                        "Day 11: Acknowledging and Responding to Counterclaims",
                        "Day 12: Structuring a Complex Argument",
                        "Day 13: Drafting the Introduction",
                        "Day 14: Drafting Body Paragraphs: Integrating Evidence",
                        "Day 15: Workshop on Logical Fallacies",
                        "Day 16: Continued Drafting",
                        "Day 17: Drafting the Conclusion",
                        "Day 18: Self-Revision Workshop",
                        "Day 19: Peer Review Workshop",
                        "Day 20: Revising the Argument",
                        "Day 21: Language and Style Workshop",
                        "Day 22: Transitions and Cohesion",
                        "Day 23: Citation and Formatting Workshop (MLA/APA)",
                        "Day 24: Final Editing and Proofreading",
                        "Day 25: Research Paper Submission",
                        "Day 26: From Research to Advocacy: Presentation Intro",
                        "Day 27: Identifying Audience and Purpose",
                        "Day 28: Structuring the Advocacy Presentation",
                        "Day 29: Using Rhetoric for a Live Audience",
                        "Day 30: Creating Visuals for Advocacy",
                        "Day 31: Workshop: Delivery and Presence",
                        "Day 32: Presentation Rehearsal and Feedback",
                        "Day 33: Advocacy Presentations Day 1",
                        "Day 34: Advocacy Presentations Day 2",
                        "Day 35: Evaluating a Speaker's Argument",
                        "Day 36: Q&A and Discussion",
                        "Day 37: Advocacy Presentations Day 3",
                        "Day 38: Advocacy Presentations Day 4",
                        "Day 39: Connecting to Other Media",
                        "Day 40: Synthesizing Across Formats",
                        "Day 41: Writing a 'Letter to the Editor'",
                        "Day 42: Workshop: Writing for a Public Audience",
                        "Day 43: Unit Closure: Symposium of Ideas",
                        "Day 44: Acquiring Academic Vocabulary",
                        "Day 45: Final Unit Reflection"
                    ]
                }
            }
        },
        "Grade 12: Unit 1: Choice and Consequence": {
            "topics": {
                "Analyzing Complex Characters": {
                    "lessons": [
                        "Day 1: Unit Introduction: Fate and Free Will",
                        "Day 2: Engage: A Moral Dilemma",
                        "Day 3: Anchor Text Introduction",
                        "Day 4: Reading and Identifying Core Conflicts",
                        "Day 5: Analyzing Character Motivation",
                        "Day 6: Moral Ambiguity",
                        "Day 7: Reading and Discussion",
                        "Day 8: Choice-and-Consequence Mapping",
                        "Day 9: Thematic Development: Guilt and Responsibility",
                        "Day 10: Socratic Seminar",
                        "Day 11: Analyzing Structure and Pacing",
                        "Day 12: Literary Theory 1: Psychoanalytic Lens",
                        "Day 13: Literary Theory 2: Existentialist Lens",
                        "Day 14: Applying Critical Lenses",
                        "Day 15: Reading and Discussion to Conclusion",
                        "Day 16: Debate: A Character on Trial",
                        "Day 17: Introduction to the Literary Argument Essay",
                        "Day 18: Essay Workshop: Complex Thesis",
                        "Day 19: Essay Workshop: Using Ambiguous Evidence",
                        "Day 20: Essay Workshop: Outlining",
                        "Day 21: Drafting Workshop: Introduction",
                        "Day 22: Drafting Workshop: Body Paragraphs",
                        "Day 23: Language Workshop: Syntax for Effect",
                        "Day 24: Drafting Workshop: Conclusion",
                        "Day 25: Self-Revision Workshop",
                        "Day 26: Peer Review Workshop",
                        "Day 27: Teacher-Student Conferences",
                        "Day 28: Revision Planning",
                        "Day 29: Revising the Essay",
                        "Day 30: Editing and Proofreading",
                        "Day 31: Final Essay Submission",
                        "Day 32: Elaboration: Philosophical Chairs",
                        "Day 33: Debate Reflection",
                        "Day 34: Connecting to Film",
                        "Day 35: Connecting to Personal Experience",
                        "Day 36: Introduction to the Final Project",
                        "Day 37: Project Proposal Workshop",
                        "Day 38: Project Work Day",
                        "Day 39: Project Work Day",
                        "Day 40: Project Work Day",
                        "Day 41: Final Project Presentations Day 1",
                        "Day 42: Final Project Presentations Day 2",
                        "Day 43: Unit Closure Discussion",
                        "Day 44: Portfolio Selection",
                        "Day 45: Unit Reflection"
                    ]
                }
            }
        },
        "Grade 12: Unit 2: Reading the World": {
            "topics": {
                "Exploring Global Literature": {
                    "lessons": [
                        "Day 1: Unit Introduction: Mapping Our Literary Worlds",
                        "Day 2: Engage: Universal Themes",
                        "Day 3: Anchor Text Introduction",
                        "Day 4: Context Workshop: Researching the Culture",
                        "Day 5: Reading and Annotating for Cultural Perspective",
                        "Day 6: Discussing Initial Readings",
                        "Day 7: Reading the Anchor Text",
                        "Day 8: Analyzing Character through a Cultural Lens",
                        "Day 9: Thematic Development",
                        "Day 10: Writing Workshop: Cultural Analysis",
                        "Day 11: Continued Reading and Discussion",
                        "Day 12: Author's Purpose and Message",
                        "Day 13: Making Connections to Personal Experience",
                        "Day 14: Socratic Seminar Preparation",
                        "Day 15: Socratic Seminar",
                        "Day 16: Introduction to the Explanatory Essay",
                        "Day 17: Essay Workshop: Thesis Development",
                        "Day 18: Essay Workshop: Gathering Evidence",
                        "Day 19: Essay Workshop: Outlining",
                        "Day 20: Drafting the Essay",
                        "Day 21: Peer Review Workshop",
                        "Day 22: Revising the Essay",
                        "Day 23: Language Workshop: Vocabulary",
                        "Day 24: Finalizing the Explanatory Essay",
                        "Day 25: Explanatory Essay Due",
                        "Day 26: Elaboration: Exploring World Literature through Poetry",
                        "Day 27: Discussion: Universal vs. Culturally Specific",
                        "Day 28: Creative Response Project Introduction",
                        "Day 29: Project Brainstorming and Planning",
                        "Day 30: Project Work Day 1",
                        "Day 31: Project Work Day 2",
                        "Day 32: Project Work Day 3",
                        "Day 33: Connecting to Other Media: World Cinema",
                        "Day 34: Comparative Discussion: Literature and Film",
                        "Day 35: Guest Speaker or Virtual Tour",
                        "Day 36: Student-Led Presentations: Cultural Spotlight",
                        "Day 37: Presentations Day 1",
                        "Day 38: Presentations Day 2",
                        "Day 39: Synthesizing Across Presentations",
                        "Day 40: Showcase of Creative Projects",
                        "Day 41: Artist's Statement Workshop",
                        "Day 42: Unit Closure Discussion",
                        "Day 43: Acquiring Academic Vocabulary",
                        "Day 44: Portfolio Curation",
                        "Day 45: Final Unit Reflection"
                    ]
                }
            }
        },
        "Grade 12: Unit 3: Satire and Social Critique": {
            "topics": {
                "Understanding Satire": {
                    "lessons": [
                        "Day 1: Unit Introduction: The Power of Humor",
                        "Day 2: Engage: Analyzing Contemporary Satire",
                        "Day 3: The Satirist's Toolkit",
                        "Day 4: Anchor Text Introduction",
                        "Day 5: Reading and Deconstructing the Anchor Text",
                        "Day 6: Analyzing Ironic Tone",
                        "Day 7: Hyperbole and Understatement",
                        "Day 8: Delineating the Satirical Argument",
                        "Day 9: Discussion: The Satirical Target",
                        "Day 10: Writing Workshop: Satirical Analysis",
                        "Day 11: Continued Reading and Analysis",
                        "Day 12: The Role of Logic in Satire",
                        "Day 13: Evaluating the Argument",
                        "Day 14: Socratic Seminar",
                        "Day 15: Introduction to the Explanatory Essay",
                        "Day 16: Essay Workshop: Thesis Development",
                        "Day 17: Essay Workshop: Gathering Evidence",
                        "Day 18: Essay Workshop: Outlining",
                        "Day 19: Drafting the Essay",
                        "Day 20: Peer Review and Revision",
                        "Day 21: Elaboration: Satire in Different Media",
                        "Day 22: Analyzing Political Cartoons",
                        "Day 23: Evaluating a Speaker's Satirical Argument",
                        "Day 24: Discussion: The Motives of Satire",
                        "Day 25: Introduction to the Creative Satire Project",
                        "Day 26: Brainstorming Topics for Satire",
                        "Day 27: Choosing a Satirical Mode",
                        "Day 28: Creative Project Work Day: Drafting",
                        "Day 29: Workshop: Creating an Ironic Persona",
                        "Day 30: Creative Project Peer Review",
                        "Day 31: Revising Creative Projects",
                        "Day 32: Finalizing Creative Projects",
                        "Day 33: Finalizing the Analytical Essay",
                        "Day 34: Essay Submission",
                        "Day 35: Preparing for the Satire Showcase",
                        "Day 36: Presentation Workshop: Using Visuals",
                        "Day 37: Satire Showcase Day 1",
                        "Day 38: Satire Showcase Day 2",
                        "Day 39: Satire Showcase Day 3",
                        "Day 40: Audience Response and Discussion",
                        "Day 41: The Limits and Dangers of Satire",
                        "Day 42: Debate: The Responsibility of the Satirist",
                        "Day 43: Final Text Analysis",
                        "Day 44: Portfolio Selection and Reflection",
                        "Day 45: Unit Reflection"
                    ]
                }
            }
        },
        "Grade 12: Unit 4: Crafting the Future: College and Career Writing": {
            "topics": {
                "The Personal Statement": {
                    "lessons": [
                        "Day 1: Unit Introduction: Writing for Your Future",
                        "Day 2: Engage: Analyzing College Application Prompts",
                        "Day 3: What Makes a College Essay Effective?",
                        "Day 4: Brainstorming Workshop 1: Personal Inventory",
                        "Day 5: Brainstorming Workshop 2: Telling Small Stories",
                        "Day 6: Selecting a Topic",
                        "Day 7: Narrative Structure: The Anecdote-Reflection Model",
                        "Day 8: Writing Workshop: The Opening Hook",
                        "Day 9: Drafting the Anecdote",
                        "Day 10: Drafting the Reflection",
                        "Day 11: First Draft Due",
                        "Day 12: Self-Revision Workshop",
                        "Day 13: Peer Review Workshop 1",
                        "Day 14: Revision Workshop: Finding the 'So What?'",
                        "Day 15: Peer Review Workshop 2",
                        "Day 16: Voice and Tone",
                        "Day 17: Teacher-Student Conferences",
                        "Day 18: Final Revisions",
                        "Day 19: Editing and Proofreading",
                        "Day 20: Polished Personal Statement Due",
                        "Day 21: Introduction to Career Writing: The Resume",
                        "Day 22: Resume Workshop: Brainstorming Content",
                        "Day 23: Resume Workshop: Action Verbs",
                        "Day 24: Drafting the Resume",
                        "Day 25: Resume Peer Review",
                        "Day 26: Revising and Finalizing the Resume",
                        "Day 27: Introduction to Professional Communication",
                        "Day 28: Workshop: Writing a Professional Email",
                        "Day 29: Introduction to Interviewing",
                        "Day 30: Workshop: Common Interview Questions",
                        "Day 31: Mock Interview Preparation",
                        "Day 32: Adapting Speech for a Formal Context",
                        "Day 33: Mock Interviews Day 1",
                        "Day 34: Mock Interviews Day 2",
                        "Day 35: Interview Reflection and Thank-You Notes",
                        "Day 36: Scholarship Essay Workshop",
                        "Day 37: Writing a Scholarship Essay",
                        "Day 38: Researching Colleges and Careers",
                        "Day 39: Presenting Research Findings",
                        "Day 40: Sharing Research",
                        "Day 41: Creating a Professional Digital Presence",
                        "Day 42: Portfolio Assembly",
                        "Day 43: Portfolio Presentation",
                        "Day 44: Unit Closure Discussion",
                        "Day 45: Final Unit Reflection"
                    ]
                }
            }
        }
      }
    },
    Health: {
        units: {}
    },
    Math: {
      units: {
        "Algebra 1 - Unit 1: One-Variable Statistics": {
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
        "Algebra 1 - Unit 2: Linear Equations and Systems": {
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
        "Algebra 1 - Unit 3: Two-Variable Statistics": {
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
        "Algebra 1 - Unit 4: Linear Inequalities and Systems": {
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
        "Algebra 1 - Unit 5: Functions": {
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
        "Algebra 1 - Unit 6: Introduction to Exponential Functions": {
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
        "Algebra 1 - Unit 7: Introduction to Quadratic Functions": {
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
        "Algebra 1 - Unit 8: Quadratic Equations": {
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
        "Algebra 2 - Unit 1: Sequences and Functions": {
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
        "Algebra 2 - Unit 2: Polynomial Functions": {
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
        "Algebra 2 - Unit 3: Rational Functions and Equations": {
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
        "Algebra 2 - Unit 4: Complex Numbers and Rational Exponents": {
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
        "Algebra 2 - Unit 5: Exponential Functions and Equations": {
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
        "Algebra 2 - Unit 6: Transformations of Functions": {
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
        "Algebra 2 - Unit 7: Trigonometric Functions": {
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
        "Algebra 2 - Unit 8: Statistical Inferences": {
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
        "Geometry - Unit 1: Constructions and Rigid Transformations": {
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
        "Geometry - Unit 2: Congruence": {
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
        "Geometry - Unit 3: Similarity": {
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
        "Geometry - Unit 4: Right Triangle Trigonometry": {
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
        "Geometry - Unit 5: Solid Geometry": {
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
        "Geometry - Unit 6: Coordinate Geometry": {
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
        "Geometry - Unit 7: Circles": {
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
        "Geometry - Unit 8: Conditional Probability": {
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
