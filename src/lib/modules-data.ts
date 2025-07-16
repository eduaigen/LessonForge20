
export type Module = {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: 'course' | 'premium_tool';
};

export const modules: {
  science: Module[];
  math: Module[];
  ela: Module[];
  social: Module[];
  ell: Module[];
  tools: Module[];
} = {
  science: [
    { id: 'price_1Pg0yPAk4y2zY5d6o4qZ5aBc', name: 'NV Biology', description: 'NYS Living Environment curriculum.', icon: 'dna', type: 'course' },
    { id: 'price_1Pg0yqAk4y2zY5d6n7s8tUvW', name: 'NGSS Biology (OpenSciEd)', description: 'Inquiry-based biology phenomena.', icon: 'leaf', type: 'course' },
    { id: 'price_1Pg13AAk4y2zY5d6jKlMnOpQ', name: 'AP Biology', description: 'College-level, advanced placement biology.', icon: 'dna', type: 'course' },
    { id: 'price_1Pg0zFAk4y2zY5d6xYz0a1bC', name: 'Chemistry (OpenSciEd)', description: 'Foundational chemical principles.', icon: 'atom', type: 'course' },
    { id: 'price_1Pg0znAk4y2zY5d6pQrStVwX', name: 'Physics (OpenSciEd)', description: 'Core concepts like motion, forces, energy.', icon: 'magnet', type: 'course' },
    { id: 'price_1Pg10AAk4y2zY5d6LMN9oPqR', name: 'NV Earth Science', description: 'NYS Physical Setting curriculum.', icon: 'orbit', type: 'course' },
    { id: 'price_1Pg10RAk4y2zY5d6IJK7lMnO', name: 'Health', description: 'Promoting well-being & healthy choices.', icon: 'heartPulse', type: 'course' },
  ],
  math: [
    { id: 'price_1Pg10jAk4y2zY5d6DEF4gHjK', name: 'Illustrative Math Algebra 1', description: 'Linear equations, functions, data.', icon: 'sigma', type: 'course' },
    { id: 'price_1Pg10wAk4y2zY5d6sTuVwXyZ', name: 'Illustrative Math Algebra 2', description: 'Polynomials, rational, exponential.', icon: 'sigma', type: 'course' },
    { id: 'price_1Pg11DAk4y2zY5d6GHIJkLmN', name: 'Illustrative Math Geometry', description: 'Transformations, congruence, trig.', icon: 'sigma', type: 'course' },
  ],
  ela: [
    { id: 'price_1Pg11UAk4y2zY5d6OPQRsTuV', name: 'ELA Curriculum (Grades 9-12)', description: 'Comprehensive lesson plans for high school English.', icon: 'library', type: 'course' },
  ],
  social: [
    { id: 'price_1Pg12DAk4y2zY5d6tUvWxYz0', name: 'Global History I (Grade 9)', description: 'From ancient civilizations to the post-classical world.', icon: 'history', type: 'course' },
    { id: 'price_1PgA9zAk4y2zY5d6q7r8sTuV', name: 'Global History II (Grade 10)', description: 'From the Age of Revolutions to contemporary issues.', icon: 'history', type: 'course' },
    { id: 'price_1Pg12NAk4y2zY5d6a1bCdeFg', name: 'US History & Government', description: 'American history & constitutional principles.', icon: 'history', type: 'course' },
    { id: 'price_1Pg12ZAk4y2zY5d6hIjKlMnO', name: 'Government & Economics', description: 'Study of government and economic principles.', icon: 'history', type: 'course' },
  ],
  ell: [
    { id: 'price_1PgD4pAk4y2zY5d6mNopQrSt', name: 'ELL / ENL (Grades 9-12)', description: 'Scaffolded lessons for English Language Learners.', icon: 'languages', type: 'course' },
  ],
  tools: [
      { id: 'price_1Pg12lAk4y2zY5d6pQrStUvW', name: 'Test Generator', description: 'Generate comprehensive tests for any subject.', icon: 'bookCopy', type: 'premium_tool' },
      { id: 'price_1PgAkXAk4y2zY5d6bCdefGhI', name: 'Lab Generator', description: 'Generate inquiry-based labs for science subjects.', icon: 'testTube', type: 'premium_tool' },
  ]
};

export type ModuleCategory = keyof typeof modules;
