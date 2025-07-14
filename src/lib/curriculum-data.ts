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
        'Ecosystems & Cells': {
          topics: {
            'Food Webs': { lessons: ['Intro to Food Webs', 'Producers, Consumers, Decomposers'] },
            'Cell Structure': { lessons: ['Animal vs. Plant Cells', 'Organelle Functions'] },
            'Photosynthesis': { lessons: ['Light-Dependent Reactions', 'Calvin Cycle'] },
            'Cellular Respiration': { lessons: ['Glycolysis', 'Krebs Cycle', 'Electron Transport Chain'] },
          },
        },
        'Genetics & Evolution': {
          topics: {
            'Mendelian Genetics': { lessons: ['Dominant and Recessive Traits', 'Punnett Squares'] },
            'DNA Structure': { lessons: ['Discovery of DNA', 'DNA Replication'] },
            'Natural Selection': { lessons: ['Darwin\'s Finches', 'Adaptation'] },
            'Speciation': { lessons: ['Allopatric vs. Sympatric', 'Reproductive Isolation'] },
          },
        },
        'Human Anatomy': {
          topics: {
            'Skeletal System': { lessons: ['Types of Bones', 'Joints and Ligaments'] },
            'Nervous System': { lessons: ['Central vs. Peripheral', 'The Neuron'] },
            'Circulatory System': { lessons: ['The Heart', 'Blood Vessels'] },
          },
        },
        'Biotechnology': {
          topics: {
            'Genetic Engineering': { lessons: ['Recombinant DNA', 'GMOs'] },
            'CRISPR': { lessons: ['How CRISPR Works', 'Ethical Implications'] },
            'Cloning': { lessons: ['Somatic Cell Nuclear Transfer', 'Therapeutic Cloning'] },
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
