
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
  grades: [6, 7, 8, 9, 10, 11, 12],
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
                    "Engage & Explore": { lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
                    "Earth and the Moon": { lessons: ["Lesson 4", "Lesson 5", "Lesson 6"] },
                    "Modeling the Sun": { lessons: ["Lesson 7", "Lesson 8", "Lesson 9"] },
                    "Interpreting Data About Distant Objects": { lessons: ["Lesson 10", "Lesson 11", "Lesson 12"] },
                    "Unit Closing": { lessons: ["Lesson 13"] }
                }
            },
            "Unit 2: Earthquakes, Volcanoes, and Tsunamis: Who's at Risk?": {
                topics: {
                    "Engage & Launch": { lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
                    "Tectonic Movement and Plate Boundaries": { lessons: ["Lesson 4", "Lesson 5", "Lesson 6"] },
                    "Natural Hazard Data": { lessons: ["Lesson 7", "Lesson 8", "Lesson 9"] },
                    "Earthquake Engineering": { lessons: ["Lesson 10", "Lesson 11"] },
                    "Unit Closing": { lessons: ["Lesson 12"] }
                }
            },
            "Unit 3: Climate Change Throughout Human History": {
                topics: {
                    "Engage and Ice Core Data": { lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
                    "Global Warming and Carbon Emissions": { lessons: ["Lesson 4", "Lesson 5", "Lesson 6"] },
                    "Sea Level and Ecosystem Effects": { lessons: ["Lesson 7", "Lesson 8"] },
                    "Geoengineering and Mitigation": { lessons: ["Lesson 9", "Lesson 10"] },
                    "Unit Closing": { lessons: ["Lesson 11"] }
                }
            },
            "Unit 4: More Hurricanes and Blizzards in NYC?": {
                topics: {
                    "Extreme Weather Patterns": { lessons: ["Lesson 1", "Lesson 2", "Lesson 3"] },
                    "Hurricane Frequency": { lessons: ["Lesson 4", "Lesson 5", "Lesson 6"] },
                    "Blizzard Analysis": { lessons: ["Lesson 7", "Lesson 8"] },
                    "Infrastructure Resilience": { lessons: ["Lesson 9", "Lesson 10"] },
                    "Unit Closing": { lessons: ["Lesson 11"] }
                }
            },
            "Unit 5: Solutions for a Sustainable Future": {
                topics: {
                    "Burning Fossil Fuels": { lessons: ["Lesson 1", "Lesson 2", "Lesson 3", "Lesson 4", "Lesson 5", "Lesson 6", "Lesson 7", "Lesson 8", "Lesson 9", "Lesson 10"] },
                    "Land Use & Biodiversity": { lessons: ["Lesson 11", "Lesson 12", "Lesson 13", "Lesson 14", "Lesson 15", "Lesson 16"] },
                    "Mining": { lessons: ["Lesson 17", "Lesson 18", "Lesson 19", "Lesson 20", "Lesson 21", "Lesson 22", "Lesson 23"] },
                    "Unit Closing": { lessons: ["Lesson 24", "Lesson 25", "Lesson 26"] }
                }
            },
            "Unit 6: Probability of Life Elsewhere": {
                topics: {
                    "Stability of the Solar System": { lessons: ["Lesson 1", "Lesson 2", "Lesson 3", "Lesson 4", "Lesson 5", "Lesson 6", "Lesson 7"] },
                    "Coevolution of Earth and Life": { lessons: ["Lesson 8", "Lesson 9", "Lesson 10", "Lesson 11", "Lesson 12"] },
                    "Origin of the Universe": { lessons: ["Lesson 13", "Lesson 14", "Lesson 15", "Lesson 16", "Lesson 17"] },
                    "Asteroid Orbits": { lessons: ["Lesson 18", "Lesson 19", "Lesson 20", "Lesson 21", "Lesson 22"] },
                    "Unit Closing": { lessons: ["Lesson 23"] }
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
        'Shakespeare': {
          topics: {
            'Romeo and Juliet': { lessons: ['Act I: The Feud', 'Act V: Tragedy'] },
            'Macbeth': { lessons: ['The Witches\' Prophecy', 'The Downfall of Macbeth'] },
            'Hamlet': { lessons: ['"To be or not to be"', 'The Ghost'] },
          },
        },
        'American Literature': {
          topics: {
            'The Great Gatsby': { lessons: ['The American Dream', 'Symbolism'] },
            'To Kill a Mockingbird': { lessons: ['Racial Injustice', 'Coming of Age'] },
            'The Catcher in the Rye': { lessons: ['Alienation', 'Phoniness'] },
          },
        },
      },
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
        }
      }
    }
  },
};

    