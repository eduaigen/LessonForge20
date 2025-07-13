export type CurriculumContent = {
  [subject: string]: {
    [grade: string]: {
      units: {
        [unit: string]: {
          topics: string[];
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
  subjects: ['Biology', 'Chemistry', 'Physics', 'History', 'Literature'],
  grades: [9, 10, 11, 12],
  content: {
    Biology: {
      '9': {
        units: {
          Ecosystems: {
            topics: ['Food Webs', 'Energy Flow', 'Biogeochemical Cycles'],
          },
          'Cellular Biology': {
            topics: [
              'Cell Structure',
              'Photosynthesis',
              'Cellular Respiration',
            ],
          },
        },
      },
      '10': {
        units: {
          Genetics: {
            topics: ['Mendelian Genetics', 'DNA Structure', 'Gene Expression'],
          },
          Evolution: {
            topics: ['Natural Selection', 'Evidence for Evolution', 'Speciation'],
          },
        },
      },
      '11': {
        units: {
          'Human Anatomy': {
            topics: [
              'Skeletal System',
              'Nervous System',
              'Circulatory System',
            ],
          },
        },
      },
      '12': {
        units: {
          Biotechnology: {
            topics: ['Genetic Engineering', 'CRISPR', 'Cloning'],
          },
        },
      },
    },
    Chemistry: {
      '10': {
        units: {
          'Atomic Structure': {
            topics: [
              'Protons, Neutrons, Electrons',
              'Isotopes',
              'Electron Configurations',
            ],
          },
        },
      },
      '11': {
        units: {
          'Chemical Bonding': {
            topics: ['Ionic Bonds', 'Covalent Bonds', 'Metallic Bonds'],
          },
          Stoichiometry: {
            topics: ['The Mole', 'Molar Mass', 'Balancing Equations'],
          },
        },
      },
      '12': {
        units: {
          'Organic Chemistry': {
            topics: ['Alkanes', 'Alkenes', 'Alkynes', 'Functional Groups'],
          },
        }
      }
    },
    Physics: {
        '11': {
            units: {
                'Kinematics': {
                    topics: ['Displacement, Velocity, and Acceleration', 'Projectile Motion', 'Uniform Circular Motion']
                }
            }
        },
        '12': {
            units: {
                'Electricity & Magnetism': {
                    topics: ["Ohm's Law", "Kirchhoff's Laws", "Magnetic Fields"]
                }
            }
        }
    }
  },
};
