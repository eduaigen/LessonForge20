'use client';

import {
  BookCopy,
  TestTube,
  FileText,
  FolderSync,
  Sigma,
  History,
  Library,
  Lightbulb,
  BrainCircuit,
  BookOpenText,
  Lock,
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const tools = [
  {
    subject: 'General',
    tools: [
      {
        title: 'Lesson Plan Generator',
        description: 'Craft detailed, standards-aligned lesson plans.',
        icon: <FileText className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator',
        isSubscribed: true,
      },
      {
        title: 'Curriculum Audit',
        description: 'Analyze and simplify your existing curriculum documents.',
        icon: <FolderSync className="w-8 h-8" />,
        href: '/auth-dashboard/curriculum-audit',
        isSubscribed: true,
      },
    ],
  },
  {
    subject: 'Science',
    tools: [
      {
        title: 'Lab Generator',
        description: 'Instantly create safe and effective lab experiments.',
        icon: <TestTube className="w-8 h-8" />,
        href: '/auth-dashboard/lab-generator',
        isSubscribed: true,
      },
    ],
  },
  {
    subject: 'All Subjects',
    tools: [
       {
        title: 'Test Generator',
        description: 'Generate comprehensive tests from your curriculum.',
        icon: <BookCopy className="w-8 h-8" />,
        href: '/auth-dashboard/test-generator',
        isSubscribed: true,
      },
      {
        title: 'Learning Objective Refiner',
        description: 'Refine objectives to be SMART and student-centered.',
        icon: <Lightbulb className="w-8 h-8" />,
        href: '/dashboard',
        isSubscribed: true, 
      },
      {
        title: 'Concept Explainer',
        description: 'Break down complex topics for any grade level.',
        icon: <BrainCircuit className="w-8 h-8" />,
        href: '/dashboard',
        isSubscribed: true,
      },
      {
        title: 'Vocab Deep Dive',
        description: 'Explore any vocabulary term in rich detail.',
        icon: <BookOpenText className="w-8 h-8" />,
        href: '/dashboard',
        isSubscribed: true,
      },
    ],
  },
];

const UnsubscribedView = () => (
  <div className="text-center py-16">
    <h2 className="text-3xl font-bold font-headline mb-4">Welcome to Your Dashboard!</h2>
    <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
      You currently have access to our powerful free tools. To unlock the full suite of curriculum generators and advanced features, please subscribe.
    </p>
    <Button asChild size="lg">
      <Link href="/curriculum">
        <Lock className="mr-2 h-4 w-4" />
        Explore Premium Tools & Subscribe
      </Link>
    </Button>
  </div>
);

export default function PremiumDashboardPage() {
  const [isSubscribed, setIsSubscribed] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // In a real app, this would check the user's subscription status from an API.
    // We'll simulate it with a URL query parameter for demonstration purposes.
    const queryParams = new URLSearchParams(window.location.search);
    if (queryParams.get('subscribed') === 'true') {
      setIsSubscribed(true);
    }
  }, []);

  const handleCardClick = (href: string) => {
    router.push(href);
  };
  
  if (!isSubscribed) {
    return <UnsubscribedView />;
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Premium Tool Dashboard</h1>
        <p className="text-muted-foreground">
          Access your subscribed AI generators and free tools.
        </p>
      </div>
      {tools.map((group) => (
        <div key={group.subject}>
          <h2 className="text-2xl font-bold font-headline mb-4">{group.subject}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {group.tools.map((tool) => (
              <Card
                key={tool.title}
                onClick={() => handleCardClick(tool.href)}
                className="cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-transform duration-200"
              >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-lg font-medium">{tool.title}</CardTitle>
                  <div className="text-primary">{tool.icon}</div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{tool.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
