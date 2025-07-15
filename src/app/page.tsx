
'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  FileText,
  TestTube,
  Lightbulb,
  BrainCircuit,
  BookOpenText,
  PencilRuler,
  Check,
} from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import EducationalModelDiagram from '@/components/common/EducationalModelDiagram';

export default function Home() {
  const features = [
    {
      icon: <FileText className="h-8 w-8" />,
      title: 'Lesson Plan Generation',
      description:
        'Generate complete lesson plans with objectives aligned to NGSS, state, and culturally inclusive standards.',
      color: 'text-primary',
    },
    {
      icon: <PencilRuler className="h-8 w-8" />,
      title: 'Test Maker',
      description:
        'Automatically create comprehensive tests based on your selected units and topics, aligned with educational standards.',
      color: 'text-accent',
    },
    {
      icon: <TestTube className="h-8 w-8" />,
      title: 'Lab Generator',
      description:
        'For science subjects, instantly generate safe and effective lab experiments with procedures and safety guidelines.',
      color: 'text-green-500',
    },
    {
      icon: <Lightbulb className="h-8 w-8" />,
      title: 'Learning Objective Refiner',
      description:
        'Refine your learning objectives to be SMART (Specific, Measurable, Achievable, Relevant, Time-bound).',
      color: 'text-accent',
    },
    {
      icon: <BrainCircuit className="h-8 w-8" />,
      title: 'Concept Explainer',
      description:
        'Get clear, grade-appropriate explanations for any concept or question to help your students understand.',
      color: 'text-green-500',
    },
    {
      icon: <BookOpenText className="h-8 w-8" />,
      title: 'Vocab Deep Dive',
      description:
        'Explore vocabulary with definitions, examples, common misconceptions, and real-world connections.',
      color: 'text-primary',
    },
  ];

  const dynamicContent = [
    {
      title: (
        <>
          <span className="gradient-text">Brilliant Teaching,</span> Made Simple
        </>
      ),
      description:
        'EduAiGen is your AI-powered partner for creating exceptional learning experiences. Save time on prep, engage students with dynamic content, and teach with renewed confidence.',
    },
    {
      title: (
        <>
          <span className="gradient-text">Unlock Creativity,</span> Ignite Minds
        </>
      ),
      description:
        "Spark curiosity and foster a love for learning with AI-generated content that adapts to your students' needs. Build a more engaging classroom effortlessly.",
    },
    {
      title: (
        <>
          <span className="gradient-text">Reclaim Your Time,</span> Reignite
          Your Passion
        </>
      ),
      description:
        'Automate the tedious parts of lesson planning and assessment. Spend more time doing what you love—inspiring the next generation of thinkers and leaders.',
    },
    {
      title: (
        <>
          <span className="gradient-text">Plan, Create,</span> Inspire
        </>
      ),
      description:
        'From interactive labs to differentiated lesson plans, get all the tools you need to bring your most ambitious teaching ideas to life.',
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsFading(true);
      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % dynamicContent.length);
        setIsFading(false);
      }, 1000); // Corresponds to the animation duration
    }, 20000); // 20 seconds between changes

    return () => clearInterval(interval);
  }, [dynamicContent.length]);

  return (
    <div className="flex flex-1 flex-col">
      <section className="relative overflow-hidden py-24 sm:py-32">
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
            <h1
              className={cn(
                'font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl transition-opacity duration-1000',
                isFading ? 'opacity-0' : 'opacity-100'
              )}
            >
              {dynamicContent[currentIndex].title}
            </h1>
            <p
              className={cn(
                'mx-auto mt-6 max-w-3xl text-lg text-muted-foreground md:text-xl transition-opacity duration-1000',
                isFading ? 'opacity-0' : 'opacity-100'
              )}
            >
              {dynamicContent[currentIndex].description}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Button size="lg" asChild className="shadow-lg shadow-primary/20">
                <Link href="/signup">Get Started for Free</Link>
              </Button>
              <Button size="lg" variant="ghost" asChild>
                <Link href="/#features">
                  Learn more <span aria-hidden="true">→</span>
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <section id="features" className="bg-secondary/20 py-24 sm:py-32">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                Everything You Need to Plan and Teach
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                A complete suite of AI tools designed for the modern educator,
                from crafting lesson plans to creating engaging activities.
              </p>
            </div>
            <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, i) => (
                <Card
                  key={feature.title}
                  className="animate-float-up rounded-xl border-border/50 bg-secondary/30 shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/20"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <CardHeader>
                    <div className={cn("mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10", feature.color)}>
                      {feature.icon}
                    </div>
                    <CardTitle className="mt-4 text-xl">
                      {feature.title}
                    </CardTitle>
                    <CardDescription className="pt-2">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 sm:py-32">
          <div className="container mx-auto max-w-7xl px-4">
            <div className="mx-auto grid max-w-2xl grid-cols-1 items-center gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
              <div className="lg:pr-8 lg:pt-4">
                <div className="lg:max-w-lg">
                  <h2 className="font-headline text-base font-semibold leading-7 text-primary">
                    For Educators, By Educators
                  </h2>
                  <p className="mt-2 font-headline text-3xl font-bold tracking-tight sm:text-4xl">
                    Focus on What Matters Most
                  </p>
                  <p className="mt-6 text-lg leading-8 text-muted-foreground">
                    We built EduAiGen to handle the heavy lifting of curriculum
                    planning so you can dedicate your energy to teaching. Our AI
                    tools are designed with educational best practices at their
                    core.
                  </p>
                  <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-muted-foreground lg:max-w-none">
                    <div className="relative pl-9">
                      <dt className="inline font-semibold text-foreground">
                        <Check className="absolute left-1 top-1 h-5 w-5 text-primary" />
                        Standards-Aligned.
                      </dt>{' '}
                      <dd className="inline">
                        Quickly generate materials that meet NGSS, state, and
                        culturally inclusive frameworks.
                      </dd>
                    </div>
                    <div className="relative pl-9">
                      <dt className="inline font-semibold text-foreground">
                        <Check className="absolute left-1 top-1 h-5 w-5 text-primary" />
                        Differentiated Instruction.
                      </dt>{' '}
                      <dd className="inline">
                        Easily adapt content for different grade levels and
                        learning needs.
                      </dd>
                    </div>
                    <div className="relative pl-9">
                      <dt className="inline font-semibold text-foreground">
                        <Check className="absolute left-1 top-1 h-5 w-5 text-primary" />
                        Time-Saving.
                      </dt>{' '}
                      <dd className="inline">
                        Cut down on planning time and reclaim your weekends.
                      </dd>
                    </div>
                  </dl>
                </div>
              </div>
              <div className="flex items-center justify-center">
                 <EducationalModelDiagram />
              </div>
            </div>
          </div>
        </section>
    </div>
  );
}
