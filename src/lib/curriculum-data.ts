export type CurriculumContent = {
  [subject: string]: {
    units: {
      [unit: string]: {
        topics: string[];
      };
    };
  };
};

export const curriculumData: {
  subjects: string[];
  grades: number[]; // This can be removed later if not used anywhere else
  content: CurriculumContent;
} = {
  subjects: ['Biology', 'Chemistry', 'Physics', 'History', 'Literature'],
  grades: [9, 10, 11, 12],
  content: {
    Biology: {
      units: {
        'Ecosystems & Cells': {
          topics: ['Food Webs', 'Cell Structure', 'Photosynthesis', 'Cellular Respiration'],
        },
        'Genetics & Evolution': {
          topics: ['Mendelian Genetics', 'DNA Structure', 'Natural Selection', 'Speciation'],
        },
        'Human Anatomy': {
          topics: ['Skeletal System', 'Nervous System', 'Circulatory System'],
        },
        'Biotechnology': {
          topics: ['Genetic Engineering', 'CRISPR', 'Cloning'],
        },
      },
    },
    Chemistry: {
      units: {
        'Atomic Structure': {
          topics: ['Protons, Neutrons, Electrons', 'Isotopes', 'Electron Configurations'],
        },
        'Chemical Bonding & Stoichiometry': {
          topics: ['Ionic Bonds', 'Covalent Bonds', 'The Mole', 'Balancing Equations'],
        },
        'Organic Chemistry': {
          topics: ['Alkanes', 'Alkenes', 'Alkynes', 'Functional Groups'],
        },
      },
    },
    Physics: {
      units: {
        'Kinematics': {
          topics: ['Displacement, Velocity, and Acceleration', 'Projectile Motion', 'Uniform Circular Motion'],
        },
        'Electricity & Magnetism': {
          topics: ["Ohm's Law", "Kirchhoff's Laws", "Magnetic Fields"],
        },
      },
    },
    History: {
      units: {
        'Ancient Civilizations': {
          topics: ['Mesopotamia', 'Egypt', 'Greece', 'Rome'],
        },
        'World Revolutions': {
          topics: ['American Revolution', 'French Revolution', 'Industrial Revolution'],
        },
      },
    },
    Literature: {
      units: {
        'Shakespeare': {
          topics: ['Romeo and Juliet', 'Macbeth', 'Hamlet'],
        },
        'American Literature': {
          topics: ['The Great Gatsby', 'To Kill a Mockingbird', 'The Catcher in the Rye'],
        },
      },
    }
  },
};
