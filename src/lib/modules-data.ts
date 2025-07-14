
import type { LucideIcon } from 'lucide-react';

export const modules = {
  science: [
    { id: 'price_1Pg0yPAk4y2zY5d6o4qZ5aBc', name: 'NV Biology', description: 'NYS Living Environment curriculum.', icon: 'dna' },
    { id: 'price_1Pg0yqAk4y2zY5d6n7s8tUvW', name: 'NGSS Biology (OpenSciEd)', description: 'Inquiry-based biology phenomena.', icon: 'leaf' },
    { id: 'price_1Pg13AAk4y2zY5d6jKlMnOpQ', name: 'AP Biology', description: 'College-level, advanced placement biology.', icon: 'dna' },
    { id: 'price_1Pg0zFAk4y2zY5d6xYz0a1bC', name: 'Chemistry (OpenSciEd)', description: 'Foundational chemical principles.', icon: 'atom' },
    { id: 'price_1Pg0znAk4y2zY5d6pQrStVwX', name: 'Physics (OpenSciEd)', description: 'Core concepts like motion, forces, energy.', icon: 'magnet' },
    { id: 'price_1Pg10AAk4y2zY5d6LMN9oPqR', name: 'NV Earth Science', description: 'NYS Physical Setting curriculum.', icon: 'orbit' },
    { id: 'price_1Pg10RAk4y2zY5d6IJK7lMnO', name: 'Health', description: 'Promoting well-being & healthy choices.', icon: 'heartPulse' },
  ],
  math: [
    { id: 'price_1Pg10jAk4y2zY5d6DEF4gHjK', name: 'Illustrative Math Algebra 1', description: 'Linear equations, functions, data.', icon: 'sigma' },
    { id: 'price_1Pg10wAk4y2zY5d6sTuVwXyZ', name: 'Illustrative Math Algebra 2', description: 'Polynomials, rational, exponential.', icon: 'sigma' },
    { id: 'price_1Pg11DAk4y2zY5d6GHIJkLmN', name: 'Illustrative Math Geometry', description: 'Transformations, congruence, trig.', icon: 'sigma' },
  ],
  ela: [
    { id: 'price_1Pg11UAk4y2zY5d6OPQRsTuV', name: 'ELA 9th Grade', description: 'Analytical reading and writing skills.', icon: 'library' },
    { id: 'price_1Pg11gAk4y2zY5d6WXYZ0a1b', name: 'ELA 10th Grade', description: 'Complex texts and critical analysis.', icon: 'library' },
    { id: 'price_1Pg11sAk4y2zY5d6cdeFgHjK', name: 'ELA 11th Grade', description: 'American literature and research.', icon: 'library' },
    { id: 'price_1Pg124Ak4y2zY5d6lMnOpQrS', name: 'ELA 12th Grade', description: 'College-level reading and writing.', icon: 'library' },
  ],
  social: [
    { id: 'price_1Pg12DAk4y2zY5d6tUvWxYz0', name: 'Global History I (Grade 9)', description: 'From ancient civilizations to the post-classical world.', icon: 'history' },
    { id: 'price_1PgA9zAk4y2zY5d6q7r8sTuV', name: 'Global History II (Grade 10)', description: 'From the Age of Revolutions to contemporary issues.', icon: 'history' },
    { id: 'price_1Pg12NAk4y2zY5d6a1bCdeFg', name: 'US History & Government', description: 'American history & constitutional principles.', icon: 'history' },
    { id: 'price_1Pg12ZAk4y2zY5d6hIjKlMnO', name: 'Government & Economics', description: 'Study of government and economic principles.', icon: 'history' },
  ],
  tools: [
      { id: 'price_1Pg12lAk4y2zY5d6pQrStUvW', name: 'Test Generator', description: 'Generate comprehensive tests for any subject.', icon: 'bookCopy' },
  ]
};

export type ModuleCategory = keyof typeof modules;
