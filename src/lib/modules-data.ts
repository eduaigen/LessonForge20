
import type { LucideProps } from 'lucide-react';
import { Leaf, Orbit, Dna, Atom, Magnet, Stethoscope, HeartPulse, Sigma, Library, Landmark, History, Languages, FlaskConical, TestTube, FolderSync } from 'lucide-react';
import type React from 'react';

export type Module = {
    id: string; // Stripe Price ID
    name: string;
    description: string;
    icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    type: 'course' | 'assessment_tool' | 'premium_tool';
    subject: 'science' | 'math' | 'ela' | 'social studies' | 'ell' | 'tool';
};

const courses: Module[] = [
    // Science
    { id: 'price_1PgWqMRpWk9d9d2F1zJ4d5fG', name: 'NV Biology Lesson Generator', description: '5E lesson plans for New Visions Biology.', icon: Leaf, type: 'course', subject: 'science' },
    { id: 'price_1PgWrERpWk9d9d2Fn8Y9a7bC', name: 'NV Earth Science Lesson Generator', description: '5E lesson plans for NV Earth Science.', icon: Orbit, type: 'course', subject: 'science' },
    { id: 'price_1PgWrSRpWk9d9d2F5fE6g7hJ', name: 'AP Biology Lesson Generator', description: '5E lesson plans for AP Biology.', icon: Dna, type: 'course', subject: 'science' },
    { id: 'price_1PgWreRpWk9d9d2FhK8d9e0F', name: 'NGSS Chemistry Lesson Generator', description: '5E lesson plans for NGSS Chemistry.', icon: Atom, type: 'course', subject: 'science' },
    { id: 'price_1PgWrrRpWk9d9d2FpL6m7n8O', name: 'NGSS Physics Lesson Generator', description: '5E lesson plans for NGSS Physics.', icon: Magnet, type: 'course', subject: 'science' },
    { id: 'price_1PgWs9RpWk9d9d2FqR5s6t7U', name: 'Health Lesson Generator', description: '5E lesson plans for Health class.', icon: HeartPulse, type: 'course', subject: 'science' },
    { id: 'price_1PgWsTRpWk9d9d2FvW4x5y6Z', name: 'Anatomy & Physiology Generator', description: '5E lesson plans for Anatomy & Physiology.', icon: Stethoscope, type: 'course', subject: 'science' },
    // Math
    { id: 'price_1PgWshRpWk9d9d2FaB3c4d5E', name: 'Algebra 1 Lesson Generator', description: '5E lesson plans for Illustrative Math Algebra 1.', icon: Sigma, type: 'course', subject: 'math' },
    { id: 'price_1PgWsrRpWk9d9d2FfG2h3i4J', name: 'Algebra 2 Lesson Generator', description: '5E lesson plans for Illustrative Math Algebra 2.', icon: Sigma, type: 'course', subject: 'math' },
    { id: 'price_1PgWtARpWk9d9d2FkL1m2n3O', name: 'Geometry Lesson Generator', description: '5E lesson plans for Illustrative Math Geometry.', icon: Sigma, type: 'course', subject: 'math' },
    // ELA
    { id: 'price_1PgWtORpWk9d9d2FpQ0r1s2T', name: 'ELA Lesson Generator', description: '5E lesson plans for 9th-12th Grade ELA.', icon: Library, type: 'course', subject: 'ela' },
    // Social Studies
    { id: 'price_1PgWtZRpWk9d9d2FuV9w8x9Y', name: 'Global History I Generator', description: '5E lesson plans for 9th Grade Global History.', icon: History, type: 'course', subject: 'social studies' },
    { id: 'price_1PgWtnRpWk9d9d2Fz0a1b2c3', name: 'Global History II Generator', description: '5E lesson plans for 10th Grade Global History.', icon: History, type: 'course', subject: 'social studies' },
    { id: 'price_1PgWuBRpWk9d9d2Fd4e5f6g7', name: 'U.S. History Generator', description: '5E lesson plans for U.S. History & Government.', icon: History, type: 'course', subject: 'social studies' },
    { id: 'price_1PgWuORpWk9d9d2Fh8i9j0k1', name: 'Government Generator', description: '5E lesson plans for Government & Economics.', icon: Landmark, type: 'course', subject: 'social studies' },
    // ELL
    { id: 'price_1PgWuXRpWk9d9d2Fl2m3n4o5', name: 'ELL/ENL Lesson Generator', description: 'Scaffolded 5E lesson plans for English Language Learners.', icon: Languages, type: 'course', subject: 'ell' },
];

const assessment_tools: Module[] = [
    // Test Generators
    { id: 'price_1PjJqfRpWk9d9d2FxVf1g2h3', name: 'NV Biology Test Generator', description: 'Cluster-based tests for New Visions Biology.', icon: FlaskConical, type: 'assessment_tool', subject: 'science' },
    { id: 'price_1PjJqrRpWk9d9d2Fi3j4k5l6', name: 'NV Earth Science Test Generator', description: 'Cluster-based tests for NV Earth Science.', icon: FlaskConical, type: 'assessment_tool', subject: 'science' },
    { id: 'price_1PjJqzRpWk9d9d2Fm7n8o9p0', name: 'NGSS Chemistry Test Generator', description: 'Cluster-based tests for NGSS Chemistry.', icon: FlaskConical, type: 'assessment_tool', subject: 'science' },
    { id: 'price_1PjJrARpWk9d9d2Fq1r2s3t4', name: 'NGSS Physics Test Generator', description: 'Cluster-based tests for NGSS Physics.', icon: FlaskConical, type: 'assessment_tool', subject: 'science' },
    { id: 'price_1PjJrGRpWk9d9d2Fu5v6w7x8', name: 'Algebra 1 Test Generator', description: 'Regents-style tests for Algebra 1.', icon: FlaskConical, type: 'assessment_tool', subject: 'math' },
    { id: 'price_1PjJrNRpWk9d9d2Fy9z0a1b2', name: 'Algebra 2 Test Generator', description: 'Regents-style tests for Algebra 2.', icon: FlaskConical, type: 'assessment_tool', subject: 'math' },
    { id: 'price_1PjJrTRpWk9d9d2Fc3d4e5f6', name: 'Geometry Test Generator', description: 'Regents-style tests for Geometry.', icon: FlaskConical, type: 'assessment_tool', subject: 'math' },
    { id: 'price_1PjJrbRpWk9d9d2Fg7h8i9j0', name: 'ELA Test Generator', description: 'Regents-style tests for high school ELA.', icon: FlaskConical, type: 'assessment_tool', subject: 'ela' },
    { id: 'price_1PjJrhRpWk9d9d2Fk1l2m3n4', name: 'Global History I Test Generator', description: 'Regents-style tests for Global History I.', icon: FlaskConical, type: 'assessment_tool', subject: 'social studies' },
    { id: 'price_1PjJr_INVALID_nRpWk9d9d2Fo5p6q7r8', name: 'Global History II Test Generator', description: 'Regents-style tests for Global History II.', icon: FlaskConical, type: 'assessment_tool', subject: 'social studies' },
    { id: 'price_1PjJs1RpWk9d9d2Fs9t0u1v2', name: 'U.S. History Test Generator', description: 'Regents-style tests for U.S. History.', icon: FlaskConical, type: 'assessment_tool', subject: 'social studies' },
    { id: 'price_1PjJs9RpWk9d9d2Fw3x4y5z6', name: 'Government Test Generator', description: 'Regents-style tests for Government.', icon: FlaskConical, type: 'assessment_tool', subject: 'social studies' },
    { id: 'price_1PjJsGRpWk9d9d2Fa7b8c9d0', name: 'ELL/ENL Test Generator', description: 'Scaffolded tests for English Language Learners.', icon: FlaskConical, type: 'assessment_tool', subject: 'ell' },
    // Lab Generators
    { id: 'price_1PjJsNRpWk9d9d2Fe1f2g3h4', name: 'NV Biology Lab Generator', description: '45-minute NGSS-aligned labs for NV Biology.', icon: TestTube, type: 'assessment_tool', subject: 'science' },
    { id: 'price_1PjJsTRpWk9d9d2Fi5j6k7l8', name: 'NV Earth Science Lab Generator', description: '45-minute NGSS-aligned labs for NV Earth Science.', icon: TestTube, type: 'assessment_tool', subject: 'science' },
    { id: 'price_1PjJsZRpWk9d9d2Fm9n0o1p2', name: 'NGSS Chemistry Lab Generator', description: '45-minute NGSS-aligned labs for NGSS Chemistry.', icon: TestTube, type: 'assessment_tool', subject: 'science' },
    { id: 'price_1PjJseRpWk9d9d2Fq3r4s5t6', name: 'NGSS Physics Lab Generator', description: '45-minute NGSS-aligned labs for NGSS Physics.', icon: TestTube, type: 'assessment_tool', subject: 'science' },
];

const premium_tools: Module[] = [
    { id: 'price_1PgWv3RpWk9d9d2Ft0u1v2w3', name: 'Curriculum Audit Tool', description: 'Audit curriculum against standards and get suggestions.', icon: FolderSync, type: 'premium_tool', subject: 'tool' },
]

const coursesBySubject = courses.reduce((acc, course) => {
    if (!acc[course.subject]) {
        acc[course.subject] = [];
    }
    acc[course.subject].push(course);
    return acc;
}, {} as Record<string, Module[]>);

const assessmentsBySubject = assessment_tools.reduce((acc, tool) => {
    if (!acc[tool.subject]) {
        acc[tool.subject] = [];
    }
    acc[tool.subject].push(tool);
    return acc;
}, {} as Record<string, Module[]>);


export const allModules = {
    courses,
    assessment_tools,
    premium_tools,
    coursesBySubject,
    assessmentsBySubject,
};
