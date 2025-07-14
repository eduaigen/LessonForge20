
'use client';

import { useState, useMemo } from 'react';
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
  Atom,
  Dna,
  Leaf,
  Orbit,
  HeartPulse,
  Magnet,
  Sparkles,
  FlaskConical,
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { SubscriptionDialog } from '@/components/common/SubscriptionDialog';

const tools = {
    science: [
      {
        title: 'Lab Generator',
        description: 'Instantly create safe and effective lab experiments.',
        icon: <TestTube className="w-8 h-8" />,
        href: '/auth-dashboard/lab-generator',
        isPremium: true,
      },
      {
        title: 'NGSS Biology (OpenSciEd)',
        description: 'Inquiry-based biology phenomena.',
        icon: <Leaf className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Biology',
        isPremium: true,
      },
      {
        title: 'NV Biology',
        description: 'NYS Living Environment curriculum.',
        icon: <Dna className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Biology',
        isPremium: true,
      },
      {
        title: 'NGSS Chemistry (OpenSciEd)',
        description: 'Foundational chemical principles.',
        icon: <Atom className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Chemistry',
        isPremium: true,
      },
      {
        title: 'NGSS Physics (OpenSciEd)',
        description: 'Core concepts like motion, forces, energy.',
        icon: <Magnet className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Physics',
        isPremium: true,
      },
       {
        title: 'Earth and Space Science',
        description: 'NYS Physical Setting curriculum.',
        icon: <Orbit className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Earth_Science',
        isPremium: true,
      },
       {
        title: 'Health',
        description: 'Promoting well-being & healthy choices.',
        icon: <HeartPulse className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Health',
        isPremium: true,
      },
      {
        title: 'Interactive Simulators',
        description: 'Engaging digital simulators for science concepts.',
        icon: <FlaskConical className="w-8 h-8" />,
        href: '/dashboard', // This will be a placeholder for now
        isPremium: true,
        requiresScienceSubscription: true,
      },
    ],
    math: [
         {
        title: 'Illustrative Math Algebra 1',
        description: 'Linear equations, functions, data.',
        icon: <Sigma className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Math',
        isPremium: true,
      },
      {
        title: 'Illustrative Math Algebra 2',
        description: 'Polynomials, rational, exponential.',
        icon: <Sigma className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Math',
        isPremium: true,
      },
       {
        title: 'Illustrative Math Geometry',
        description: 'Transformations, congruence, trig.',
        icon: <Sigma className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Math',
        isPremium: true,
      },
    ],
    ela: [
        {
        title: 'ELA 9th Grade',
        description: 'Analytical reading and writing skills.',
        icon: <Library className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Literature',
        isPremium: true,
      },
       {
        title: 'ELA 10th Grade',
        description: 'Complex texts and critical analysis.',
        icon: <Library className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Literature',
        isPremium: true,
      },
       {
        title: 'ELA 11th Grade',
        description: 'American literature and research.',
        icon: <Library className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Literature',
        isPremium: true,
      },
       {
        title: 'ELA 12th Grade',
        description: 'College-level reading and writing.',
        icon: <Library className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Literature',
        isPremium: true,
      },
    ],
    social: [
       {
        title: 'Global History I & II',
        description: 'From ancient civilizations to present.',
        icon: <History className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=History',
        isPremium: true,
      },
       {
        title: 'US History & Government',
        description: 'American history & constitutional principles.',
        icon: <History className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=History',
        isPremium: true,
      },
       {
        title: 'Government & Economics',
        description: 'Study of government and economic principles.',
        icon: <History className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=History',
        isPremium: true,
      },
    ],
    general: [
      {
        title: 'Generic Lesson Plan Generator',
        description: 'Craft detailed, standards-aligned lesson plans for any subject.',
        icon: <FileText className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator',
        isPremium: true,
      },
      {
        title: 'Curriculum Audit',
        description: 'Analyze and simplify your existing curriculum documents.',
        icon: <FolderSync className="w-8 h-8" />,
        href: '/auth-dashboard/curriculum-audit',
        isPremium: true,
      },
      {
        title: 'Test Generator',
        description: 'Generate comprehensive tests from your curriculum.',
        icon: <BookCopy className="w-8 h-8" />,
        href: '/auth-dashboard/test-generator',
        isPremium: true,
      },
    ],
    free: [
     {
        title: 'Learning Objective Refiner',
        description: 'Refine objectives to be SMART and student-centered.',
        icon: <Lightbulb className="w-8 h-8" />,
        href: '/dashboard',
        isPremium: false,
      },
      {
        title: 'Concept Explainer',
        description: 'Break down complex topics for any grade level.',
        icon: <BrainCircuit className="w-8 h-8" />,
        href: '/dashboard',
        isPremium: false,
      },
      {
        title: 'Vocab Deep Dive',
        description: 'Explore any vocabulary term in rich detail.',
        icon: <BookOpenText className="w-8 h-8" />,
        href: '/dashboard',
        isPremium: false,
      },
    ]
};

const ToolCard = ({ title, description, icon, href, isPremium, requiresScienceSubscription = false }: { title: string, description: string, icon: React.ReactNode, href: string, isPremium: boolean, requiresScienceSubscription?: boolean }) => {
  const router = useRouter();
  const { isSubscribed, hasScienceSubscription } = useAuth();
  const [showSubscriptionDialog, setShowSubscriptionDialog] = useState(false);

  const handleCardClick = () => {
    // Free tools on this page link back to the main free tools dashboard
    if (href === '/dashboard') {
       router.push(href);
       return;
    }

    let hasAccess = false;
    if (isPremium && isSubscribed) {
        if (requiresScienceSubscription) {
            hasAccess = hasScienceSubscription;
        } else {
            hasAccess = true;
        }
    } else if (!isPremium) {
        hasAccess = true;
    }
    
    if (hasAccess) {
      router.push(href);
    } else {
      setShowSubscriptionDialog(true);
    }
  };

  const handleSubscribeClick = () => {
    router.push('/pricing');
  };

  return (
    <>
      <Card
        onClick={handleCardClick}
        className="cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-transform duration-200"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <div className="text-primary">{icon}</div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
      <SubscriptionDialog
        open={showSubscriptionDialog}
        onOpenChange={setShowSubscriptionDialog}
        onConfirm={handleSubscribeClick}
        toolName={title}
      />
    </>
  );
};


const PremiumDashboardContent = () => {
  const { hasScienceSubscription } = useAuth();

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Tool Dashboard</h1>
        <p className="text-muted-foreground">
           Access your subscribed AI generators and free tools.
        </p>
      </div>

       <div>
        <h2 className="text-2xl font-bold font-headline mb-4">General Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.general.map((tool) => <ToolCard key={tool.title} {...tool} />)}
        </div>
      </div>

       <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Science</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.science
            .filter(tool => !tool.requiresScienceSubscription || (tool.requiresScienceSubscription && hasScienceSubscription))
            .map((tool) => <ToolCard key={tool.title} {...tool} />)}
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Mathematics</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.math.map((tool) => <ToolCard key={tool.title} {...tool} />)}
        </div>
      </div>
      
       <div>
        <h2 className="text-2xl font-bold font-headline mb-4">English Language Arts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.ela.map((tool) => <ToolCard key={tool.title} {...tool} />)}
        </div>
      </div>

       <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Social Studies</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.social.map((tool) => <ToolCard key={tool.title} {...tool} />)}
        </div>
      </div>

       <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Free Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.free.map((tool) => <ToolCard key={tool.title} {...tool} />)}
        </div>
      </div>
    </div>
  );
};

const SubscriptionPrompt = () => (
    <div className="flex flex-1 items-center justify-center">
        <Card className="max-w-2xl text-center p-8 shadow-lg">
            <CardHeader>
                 <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sparkles className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline text-3xl font-bold">Unlock Your Full Teaching Potential</CardTitle>
                <CardDescription className="text-lg text-muted-foreground pt-2">
                    Subscribe to Eduaigen to access our full suite of powerful AI tools, including curriculum generators, test makers, and advanced lesson planning features.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button size="lg" asChild>
                    <Link href="/pricing">Explore Premium Tools & Subscribe</Link>
                </Button>
            </CardContent>
        </Card>
    </div>
);

export default function PremiumDashboardPage() {
  const { isSubscribed } = useAuth();
  
  return isSubscribed ? <PremiumDashboardContent /> : <SubscriptionPrompt />;
}
