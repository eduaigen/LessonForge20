
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
  content: CurriculumContent;
} = {
  subjects: ['Biology', 'Chemistry', 'Physics', 'History', 'Literature'],
  content: {
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
        'Ancient Civilizations': {
          topics: {
            'Mesopotamia': { lessons: ['Sumerians', 'Babylonians'] },
            'Egypt': { lessons: ['Old Kingdom', 'New Kingdom'] },
            'Greece': { lessons: ['Athens vs. Sparta', 'Alexander the Great'] },
            'Rome': { lessons: ['The Republic', 'The Empire'] },
          },
        },
        'World Revolutions': {
          topics: {
            'American Revolution': { lessons: ['Causes', 'Major Battles'] },
            'French Revolution': { lessons: ['Estates-General', 'Reign of Terror'] },
            'Industrial Revolution': { lessons: ['Inventions', 'Social Impact'] },
          },
        },
      },
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
    }
  },
};
