
'use client';

import { Button } from '@/components/ui/button';
import {
  CheckCircle2,
  FolderSync,
  Microscope,
  Dna,
  Leaf,
  Atom,
  Magnet,
  Orbit,
  HeartPulse,
  Sigma,
  Library,
  BookOpenText,
  History,
} from 'lucide-react';
import Link from 'next/link';

const offerings = {
  science: {
    title: 'Science Offerings',
    icon: <Microscope className="h-8 w-8 text-primary" />,
    courses: [
      { name: 'NV Biology', description: 'Aligns with NYS Living Environment curriculum, focusing on life processes, diversity, genetics, evolution, and ecology.', icon: <Dna /> },
      { name: 'NGSS Biology (OpenSciEd)', description: 'Built around NGSS three dimensions for deep, inquiry-based understanding of biological phenomena.', icon: <Leaf /> },
      { name: 'NGSS Chemistry (OpenSciEd)', description: 'Emphasizes foundational chemical principles, atomic structure, and reactions through an investigative, NGSS-aligned lens.', icon: <Atom /> },
      { name: 'NGSS Physics (OpenSciEd)', description: 'Focuses on core concepts like motion, forces, energy, and waves, promoting hands-on inquiry.', icon: <Magnet /> },
      { name: 'Earth and Space Science (New Vision)', description: 'Aligns with NYS Physical Setting curriculum, covering Earth\'s systems, astronomy, and geology.', icon: <Orbit /> },
      { name: 'Health Class', description: 'Comprehensive modules promoting well-being, healthy choices, and civic health literacy.', icon: <HeartPulse /> },
    ],
  },
  math: {
    title: 'Mathematics Offerings',
    icon: <Sigma className="h-8 w-8 text-primary" />,
    courses: [
      { name: 'Illustrative Math Algebra 1', description: 'Covers linear equations, functions, quadratic expressions, and data analysis with a focus on conceptual understanding.', icon: <Sigma /> },
      { name: 'Illustrative Math Algebra 2', description: 'Extends algebraic concepts to polynomials, rational, exponential, and logarithmic functions.', icon: <Sigma /> },
      { name: 'Illustrative Math Geometry', description: 'Focuses on transformations, congruence, similarity, trigonometry, and circles, emphasizing logical reasoning.', icon: <Sigma /> },
    ],
  },
  ela: {
    title: 'English Language Arts (ELA) Offerings',
    icon: <Library className="h-8 w-8 text-primary" />,
    courses: [
      { name: 'ELA 9th Grade', description: 'Develops analytical reading and writing skills, exploring themes of identity and individual experience.', icon: <BookOpenText /> },
      { name: 'ELA 10th Grade', description: 'Engages students with more complex texts and arguments, fostering critical analysis of diverse genres.', icon: <BookOpenText /> },
      { name: 'ELA 11th Grade', description: 'Deepens literary analysis, research, and argumentative writing, with a focus on American literature.', icon: <BookOpenText /> },
      { name: 'ELA 12th Grade', description: 'Prepares students for college-level reading and writing through sophisticated analysis and synthesis.', icon: <BookOpenText /> },
    ],
  },
  social: {
    title: 'Social Studies Offerings',
    icon: <History className="h-8 w-8 text-primary" />,
    courses: [
      { name: 'Global History and Geography I & II', description: 'Covers world history from ancient civilizations to the present day, focusing on global interactions.', icon: <History /> },
      { name: 'United States History and Government', description: 'Explores American history, constitutional principles, and the nation\'s role in the world.', icon: <History /> },
      { name: 'Participation in Government and Economics', description: 'Cultivates active and informed citizens through the study of government and economic principles.', icon: <History /> },
    ],
  },
};


export default function CurriculumPage() {
  return (
    <div className="flex flex-1 flex-col bg-background">
      <main className="flex-1">
        <section className="relative overflow-hidden py-20 sm:py-28">
           <div
            aria-hidden="true"
            className="absolute -top-48 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-accent to-primary opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>
          <div className="container mx-auto max-w-7xl px-4 text-center">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
              A New Standard in <span className="gradient-text">Curriculum</span>
            </h1>
            <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl">
              Our platform offers comprehensive, and tailored educational modules across a wide range of subjects, designed to meet the specific needs of you and your students.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-4">
              <Button size="lg" asChild className="shadow-lg shadow-primary/20">
                <Link href="/signup">Get Started & Subscribe</Link>
              </Button>
            </div>
             <div className="mt-8 flex justify-center gap-x-6 text-sm font-semibold text-muted-foreground">
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> NGSS Aligned</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> NYS Standards</div>
                <div className="flex items-center gap-2"><CheckCircle2 className="h-4 w-4 text-green-500" /> Culturally Responsive</div>
            </div>
          </div>
        </section>

         <section id="subscriber-benefit" className="bg-primary/5 py-20 sm:py-28">
          <div className="container mx-auto max-w-3xl px-4 text-center">
              <div className="mx-auto max-w-3xl text-center">
                 <h2 className="text-base font-semibold leading-7 text-primary">Exclusive Subscriber Benefit</h2>
                <p className="mt-2 font-headline text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Curriculum Audit Simplification Tool
                </p>
                <p className="mt-6 text-lg text-muted-foreground">
                  Take your existing curriculum documents—dense frameworks, lengthy unit plans, or complex pacing guides—and let our AI distill them into clear, concise, and actionable summaries. Instantly identify key objectives, concepts, and assessment points. (Coming Soon)
                </p>
                <FolderSync className="mx-auto mt-8 h-16 w-16 text-primary" />
              </div>

               <div className="mt-16 border-t border-primary/10 pt-12">
                  <p className="text-lg text-muted-foreground">
                    Don't see the subject or curriculum you need? Let us know!
                  </p>
                   <Button variant="link" asChild className="mt-2 text-lg">
                      <Link href="/request-course">Request a Course</Link>
                   </Button>
               </div>
          </div>
        </section>


        {Object.entries(offerings).map(([key, subject], i) => (
          <section key={subject.title} className="py-16 sm:py-20 bg-background even:bg-muted/30">
            <div className="container mx-auto max-w-7xl px-4">
              <div className="mx-auto max-w-2xl text-center">
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl flex items-center justify-center gap-4">
                  {subject.icon} {subject.title}
                </h2>
              </div>
              <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {subject.courses.map(course => (
                  <div key={course.name} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 text-primary mt-1">{course.icon}</div>
                    <div>
                        <h3 className="font-semibold text-foreground">{course.name}</h3>
                        <p className="text-muted-foreground text-sm">{course.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        <section className="bg-muted/30">
            <div className="container mx-auto max-w-4xl px-4 py-16 text-center sm:py-24">
                <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                    Ready to Transform Your Classroom?
                </h2>
                <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
                    Join thousands of educators who are saving time, engaging students, and rediscovering the joy of teaching with EduAiGen.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6">
                    <Button size="lg" asChild className="shadow-lg shadow-primary/20">
                        <Link href="/signup">Subscribe Now</Link>
                    </Button>
                </div>
            </div>
        </section>
      </main>
    </div>
  );
}
