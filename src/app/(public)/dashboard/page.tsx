
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Lightbulb, BookOpenText, Target, BrainCircuit } from 'lucide-react';
import Link from 'next/link';

const tools = [
  {
    title: 'Vocabulary Deep Dive',
    description: 'Explore vocabulary with definitions, examples, misconceptions, and real-world connections.',
    href: '/dashboard/vocabulary',
    icon: <BookOpenText className="w-8 h-8" />,
  },
  {
    title: 'Learning Objective Refiner',
    description: 'Refine your learning objectives to be SMART (Specific, Measurable, Achievable, Relevant, Time-bound).',
    href: '/dashboard/objective-refiner',
    icon: <Target className="w-8 h-8" />,
  },
  {
    title: 'Concept Explainer',
    description: 'Get clear, grade-appropriate explanations for any concept or question to help your students understand.',
    href: '/dashboard/concept-explainer',
    icon: <BrainCircuit className="w-8 h-8" />,
  },
];

export default function DashboardPage() {
  return (
    <div className="flex-1 bg-background">
      <section className="container mx-auto max-w-7xl px-4 py-16 text-center sm:py-24">
        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Lightbulb className="h-10 w-10" />
        </div>
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Free AI Teacher Tools
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          A collection of simple, powerful AI tools designed to help you save time and enhance your teaching.
        </p>
      </section>

      <section className="container mx-auto max-w-5xl px-4 pb-20">
        <div className="grid gap-8 md:grid-cols-1 lg:grid-cols-3">
          {tools.map((tool) => (
            <Link key={tool.href} href={tool.href} className="block">
              <Card className="flex flex-col h-full text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary/10">
                <CardHeader>
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    {tool.icon}
                  </div>
                  <CardTitle>{tool.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{tool.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
