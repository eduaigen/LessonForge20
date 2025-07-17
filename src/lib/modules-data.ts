
import type { LucideProps } from 'lucide-react';
import { Leaf, Orbit, Dna, Atom, Magnet, Stethoscope, HeartPulse, Sigma, Library, Landmark, History, Languages, FlaskConical, TestTube, FolderSync } from 'lucide-react';
import type React from 'react';

export type Module = {
    id: string; // Stripe Price ID
    name: string;
    description: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    type: 'course' | 'premium_tool';
    subject: 'science' | 'math' | 'ela' | 'social studies' | 'ell' | 'tool';
};

const courses: Module[] = [
    // Science
    { id: 'price_1PgWqMRpWk9d9d2F1zJ4d5fG', name: 'NV Biology Generator', description: '5E lesson plans for New Visions Biology.', icon: Leaf, type: 'course', subject: 'science' },
    { id: 'price_1PgWrERpWk9d9d2Fn8Y9a7bC', name: 'NV Earth Science Generator', description: '5E lesson plans for NV Earth Science.', icon: Orbit, type: 'course', subject: 'science' },
    { id: 'price_1PgWrSRpWk9d9d2F5fE6g7hJ', name: 'AP Biology Generator', description: '5E lesson plans for AP Biology.', icon: Dna, type: 'course', subject: 'science' },
    { id: 'price_1PgWreRpWk9d9d2FhK8d9e0F', name: 'NGSS Chemistry Generator', description: '5E lesson plans for NGSS Chemistry.', icon: Atom, type: 'course', subject: 'science' },
    { id: 'price_1PgWrrRpWk9d9d2FpL6m7n8O', name: 'NGSS Physics Generator', description: '5E lesson plans for NGSS Physics.', icon: Magnet, type: 'course', subject: 'science' },
    { id: 'price_1PgWs9RpWk9d9d2FqR5s6t7U', name: 'Health Lesson Generator', description: '5E lesson plans for Health class.', icon: HeartPulse, type: 'course', subject: 'science' },
    { id: 'price_1PgWsTRpWk9d9d2FvW4x5y6Z', name: 'Anatomy & Physiology Generator', description: '5E lesson plans for Anatomy & Physiology.', icon: Stethoscope, type: 'course', subject: 'science' },
    // Math
    { id: 'price_1PgWshRpWk9d9d2FaB3c4d5E', name: 'Algebra 1 Generator', description: '5E lesson plans for Illustrative Math Algebra 1.', icon: Sigma, type: 'course', subject: 'math' },
    { id: 'price_1PgWsrRpWk9d9d2FfG2h3i4J', name: 'Algebra 2 Generator', description: '5E lesson plans for Illustrative Math Algebra 2.', icon: Sigma, type: 'course', subject: 'math' },
    { id: 'price_1PgWtARpWk9d9d2FkL1m2n3O', name: 'Geometry Generator', description: '5E lesson plans for Illustrative Math Geometry.', icon: Sigma, type: 'course', subject: 'math' },
    // ELA
    { id: 'price_1PgWtORpWk9d9d2FpQ0r1s2T', name: 'ELA Generator', description: '5E lesson plans for 9th-12th Grade ELA.', icon: Library, type: 'course', subject: 'ela' },
    // Social Studies
    { id: 'price_1PgWtZRpWk9d9d2FuV9w8x9Y', name: 'Global History I Generator', description: '5E lesson plans for 9th Grade Global History.', icon: History, type: 'course', subject: 'social studies' },
    { id: 'price_1PgWtnRpWk9d9d2Fz0a1b2c3', name: 'Global History II Generator', description: '5E lesson plans for 10th Grade Global History.', icon: History, type: 'course', subject: 'social studies' },
    { id: 'price_1PgWuBRpWk9d9d2Fd4e5f6g7', name: 'U.S. History Generator', description: '5E lesson plans for U.S. History & Government.', icon: History, type: 'course', subject: 'social studies' },
    { id: 'price_1PgWuORpWk9d9d2Fh8i9j0k1', name: 'Government Generator', description: '5E lesson plans for Government & Economics.', icon: Landmark, type: 'course', subject: 'social studies' },
    // ELL
    { id: 'price_1PgWuXRpWk9d9d2Fl2m3n4o5', name: 'ELL/ENL Lesson Generator', description: 'Scaffolded 5E lesson plans for English Language Learners.', icon: Languages, type: 'course', subject: 'ell' },
];

const tools: Module[] = [
    { id: 'price_1PgWupRpWk9d9d2Fp6q7r8s9', name: 'Test Generator', description: 'Access to all test generators across all subscribed subjects.', icon: FlaskConical, type: 'premium_tool', subject: 'tool' },
    { id: 'price_1PgWv3RpWk9d9d2Ft0u1v2w3', name: 'Lab Generator', description: 'Access to all lab generators for science subjects.', icon: TestTube, type: 'premium_tool', subject: 'tool' },
];

const coursesBySubject = courses.reduce((acc, course) => {
    if (!acc[course.subject]) {
        acc[course.subject] = [];
    }
    acc[course.subject].push(course);
    return acc;
}, {} as Record<string, Module[]>);


export const allModules = {
    courses,
    tools,
    coursesBySubject,
};
