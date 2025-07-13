import { Header } from '@/components/common/Header';
import { Footer } from '@/components/common/Footer';
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
} from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const features = [
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: 'Lesson Plan Generation',
      description:
        'Generate complete lesson plans with objectives aligned to NGSS, state, and culturally inclusive standards.',
    },
    {
      icon: <PencilRuler className="h-8 w-8 text-primary" />,
      title: 'Test Maker',
      description:
        'Automatically create comprehensive tests based on your selected units and topics, aligned with educational standards.',
    },
    {
      icon: <TestTube className="h-8 w-8 text-primary" />,
      title: 'Lab Generator',
      description:
        'For science subjects, instantly generate safe and effective lab experiments with procedures and safety guidelines.',
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-primary" />,
      title: 'Learning Objective Refiner',
      description:
        'Refine your learning objectives to be SMART (Specific, Measurable, Achievable, Relevant, Time-bound).',
    },
    {
      icon: <BrainCircuit className="h-8 w-8 text-primary" />,
      title: 'Concept Explainer',
      description:
        'Get clear, grade-appropriate explanations for any concept or question to help your students understand.',
    },
    {
      icon: <BookOpenText className="h-8 w-8 text-primary" />,
      title: 'Vocab Deep Dive',
      description:
        'Explore vocabulary with definitions, examples, common misconceptions, and real-world connections.',
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="container mx-auto max-w-7xl px-4 py-20 text-center sm:py-32">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
            Brilliant Teaching, Made Simple
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Eduaigen is your AI-powered partner for creating exceptional
            learning experiences. Save time, engage students, and teach with
            confidence.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button
              size="lg"
              asChild
              style={{
                backgroundColor: 'hsl(var(--accent))',
                color: 'hsl(var(--accent-foreground))',
              }}
              className="hover:opacity-90"
            >
              <Link href="/dashboard">Get Started Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/pricing">View Pricing</Link>
            </Button>
          </div>
        </section>

        <section
          id="features"
          className="container mx-auto max-w-7xl px-4 py-16 sm:py-24"
        >
          <div className="text-center">
            <h2 className="font-headline text-3xl font-bold tracking-tight sm:text-4xl">
              Everything You Need to Plan and Teach
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              A complete suite of AI tools designed for the modern educator.
            </p>
          </div>
          <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="bg-card/70 backdrop-blur-sm transition-all hover:shadow-lg"
              >
                <CardHeader>
                  {feature.icon}
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                  <CardDescription className="pt-2">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
