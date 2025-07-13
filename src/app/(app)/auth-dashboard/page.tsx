'use client';

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import {
  FileText,
  TestTube,
  StickyNote,
  FolderSync,
  FlaskConical,
  Sigma,
  BookOpenText,
  History,
  Sparkles,
  ClipboardCheck,
} from 'lucide-react';
import React from 'react';

type Tool = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
};

type SubjectTools = {
  subject: string;
  icon: React.ReactNode;
  tools: Tool[];
};

const premiumToolsBySubject: SubjectTools[] = [
  {
    subject: 'General Tools',
    icon: <Sparkles className="w-6 h-6 text-primary" />,
    tools: [
      {
        title: 'Lesson Plan Generator',
        description:
          'Generate complete lesson plans with objectives aligned to NGSS, state, and culturally inclusive standards.',
        href: '/auth-dashboard/lesson-plan',
        icon: <StickyNote className="w-8 h-8 text-primary" />,
      },
      {
        title: 'Curriculum Audit Tool',
        description:
          'Distill your existing curriculum documents into clear, concise, and actionable summaries.',
        href: '/auth-dashboard/curriculum-audit',
        icon: <FolderSync className="w-8 h-8 text-primary" />,
      },
    ],
  },
  {
    subject: 'Science',
    icon: <FlaskConical className="w-6 h-6 text-primary" />,
    tools: [
      {
        title: 'Lab Generator',
        description:
          'Instantly generate safe and effective lab experiments with procedures and safety guidelines.',
        href: '/auth-dashboard/lab-generator',
        icon: <TestTube className="w-8 h-8 text-primary" />,
      },
      {
        title: 'Science Test Maker',
        description:
          'Create comprehensive tests for Biology, Chemistry, and Physics units and topics.',
        href: '/auth-dashboard/test-maker',
        icon: <ClipboardCheck className="w-8 h-8 text-primary" />,
      },
    ],
  },
  {
    subject: 'Mathematics',
    icon: <Sigma className="w-6 h-6 text-primary" />,
    tools: [
      {
        title: 'Math Test Maker',
        description:
          'Create tests for Algebra 1, Algebra 2, and Geometry based on Illustrative Math curriculum.',
        href: '/auth-dashboard/test-maker',
        icon: <FileText className="w-8 h-8 text-primary" />,
      },
    ],
  },
  {
    subject: 'English Language Arts',
    icon: <BookOpenText className="w-6 h-6 text-primary" />,
    tools: [
      {
        title: 'ELA Test Maker',
        description:
          'Create tests for ELA grades 9-12, aligned with NYS and Common Core standards.',
        href: '/auth-dashboard/test-maker',
        icon: <FileText className="w-8 h-8 text-primary" />,
      },
    ],
  },
  {
    subject: 'Social Studies',
    icon: <History className="w-6 h-6 text-primary" />,
    tools: [
      {
        title: 'Social Studies Test Maker',
        description:
          'Create tests for Global History, US History, and Government based on NYS frameworks.',
        href: '/auth-dashboard/test-maker',
        icon: <FileText className="w-8 h-8 text-primary" />,
      },
    ],
  },
];

const ToolCard = ({ tool }: { tool: Tool }) => (
  <Card className="flex flex-col h-full">
    <CardHeader>
      <div className="flex items-start gap-4">
        <div className="bg-primary/10 p-3 rounded-lg flex-shrink-0">
          {tool.icon}
        </div>
        <div>
          <CardTitle>{tool.title}</CardTitle>
          <CardDescription className="mt-1 line-clamp-3">
            {tool.description}
          </CardDescription>
        </div>
      </div>
    </CardHeader>
    <CardContent className="flex-grow flex items-end mt-auto">
      <Button asChild className="w-full">
        <Link href={tool.href}>Use Tool</Link>
      </Button>
    </CardContent>
  </Card>
);

export default function AuthDashboardPage() {
  return (
    <div className="flex flex-col gap-10">
      <div>
        <h1 className="text-3xl font-bold font-headline">Premium Dashboard</h1>
        <p className="text-muted-foreground">
          Access your exclusive suite of curriculum generation and analysis
          tools, organized by subject.
        </p>
      </div>

      {premiumToolsBySubject.map((subjectGroup) => (
        <section key={subjectGroup.subject}>
          <div className="flex items-center gap-4 mb-6">
            <div className="bg-muted p-3 rounded-full">
              {subjectGroup.icon}
            </div>
            <h2 className="text-2xl font-bold font-headline">
              {subjectGroup.subject}
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {subjectGroup.tools.map((tool) => (
              <ToolCard key={tool.title} tool={tool} />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
