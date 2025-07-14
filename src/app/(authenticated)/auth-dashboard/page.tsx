
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
        priceId: 'price_1Pg12wAk4y2zY5d6xYz0a1bC',
      },
      {
        title: 'NV Biology',
        description: 'NYS Living Environment curriculum.',
        icon: <Dna className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Biology&title=NV%20Biology',
        isPremium: true,
        priceId: 'price_1Pg0yPAk4y2zY5d6o4qZ5aBc',
      },
      {
        title: 'NGSS Biology (OpenSciEd)',
        description: 'Inquiry-based biology phenomena.',
        icon: <Leaf className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Biology&title=NGSS%20Biology%20(OpenSciEd)',
        isPremium: true,
        priceId: 'price_1Pg0yqAk4y2zY5d6n7s8tUvW',
      },
      {
        title: 'AP Biology',
        description: 'College-level, advanced placement biology.',
        icon: <Dna className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=AP%20Biology&title=AP%20Biology',
        isPremium: true,
        priceId: 'price_1Pg13AAk4y2zY5d6jKlMnOpQ',
      },
      {
        title: 'NGSS Chemistry (OpenSciEd)',
        description: 'Foundational chemical principles.',
        icon: <Atom className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Chemistry&title=NGSS%20Chemistry%20(OpenSciEd)',
        isPremium: true,
        priceId: 'price_1Pg0zFAk4y2zY5d6xYz0a1bC',
      },
      {
        title: 'NGSS Physics (OpenSciEd)',
        description: 'Core concepts like motion, forces, energy.',
        icon: <Magnet className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Physics&title=NGSS%20Physics%20(OpenSciEd)',
        isPremium: true,
        priceId: 'price_1Pg0znAk4y2zY5d6pQrStVwX',
      },
       {
        title: 'Earth and Space Science',
        description: 'NYS Physical Setting curriculum.',
        icon: <Orbit className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Earth_Science&title=Earth%20and%20Space%20Science',
        isPremium: true,
        priceId: 'price_1Pg10AAk4y2zY5d6LMN9oPqR',
      },
       {
        title: 'Health',
        description: 'Promoting well-being & healthy choices.',
        icon: <HeartPulse className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Health&title=Health',
        isPremium: true,
        priceId: 'price_1Pg10RAk4y2zY5d6IJK7lMnO',
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
        href: '/auth-dashboard/lesson-plan-generator?subject=Math&title=Illustrative%20Math%20Algebra%201',
        isPremium: true,
        priceId: 'price_1Pg10jAk4y2zY5d6DEF4gHjK',
      },
      {
        title: 'Illustrative Math Algebra 2',
        description: 'Polynomials, rational, exponential.',
        icon: <Sigma className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Math&title=Illustrative%20Math%20Algebra%202',
        isPremium: true,
        priceId: 'price_1Pg10wAk4y2zY5d6sTuVwXyZ',
      },
       {
        title: 'Illustrative Math Geometry',
        description: 'Transformations, congruence, trig.',
        icon: <Sigma className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Math&title=Illustrative%20Math%20Geometry',
        isPremium: true,
        priceId: 'price_1Pg11DAk4y2zY5d6GHIJkLmN',
      },
    ],
    ela: [
        {
        title: 'ELA 9th Grade',
        description: 'Analytical reading and writing skills.',
        icon: <Library className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Literature&title=ELA%209th%20Grade',
        isPremium: true,
        priceId: 'price_1Pg11UAk4y2zY5d6OPQRsTuV',
      },
       {
        title: 'ELA 10th Grade',
        description: 'Complex texts and critical analysis.',
        icon: <Library className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Literature&title=ELA%2010th%20Grade',
        isPremium: true,
        priceId: 'price_1Pg11gAk4y2zY5d6WXYZ0a1b',
      },
       {
        title: 'ELA 11th Grade',
        description: 'American literature and research.',
        icon: <Library className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Literature&title=ELA%2011th%20Grade',
        isPremium: true,
        priceId: 'price_1Pg11sAk4y2zY5d6cdeFgHjK',
      },
       {
        title: 'ELA 12th Grade',
        description: 'College-level reading and writing.',
        icon: <Library className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Literature&title=ELA%2012th%20Grade',
        isPremium: true,
        priceId: 'price_1Pg124Ak4y2zY5d6lMnOpQrS',
      },
    ],
    social: [
       {
        title: 'Global History I & II',
        description: 'From ancient civilizations to present.',
        icon: <History className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=History&title=Global%20History%20I%20&%20II',
        isPremium: true,
        priceId: 'price_1Pg12DAk4y2zY5d6tUvWxYz0',
      },
       {
        title: 'US History & Government',
        description: 'American history & constitutional principles.',
        icon: <History className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=History&title=US%20History%20&%20Government',
        isPremium: true,
        priceId: 'price_1Pg12NAk4y2zY5d6a1bCdeFg',
      },
       {
        title: 'Government & Economics',
        description: 'Study of government and economic principles.',
        icon: <History className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=History&title=Government%20&%20Economics',
        isPremium: true,
        priceId: 'price_1Pg12ZAk4y2zY5d6hIjKlMnO',
      },
    ],
    general: [
      {
        title: 'Generic Lesson Plan Generator',
        description: 'Craft detailed, standards-aligned lesson plans for any subject.',
        icon: <FileText className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator',
        isPremium: true,
        priceId: null, // Assuming this is part of the base subscription.
      },
      {
        title: 'Curriculum Audit',
        description: 'Analyze and simplify your existing curriculum documents.',
        icon: <FolderSync className="w-8 h-8" />,
        href: '/auth-dashboard/curriculum-audit',
        isPremium: true,
        priceId: null, // Assuming this is part of the base subscription.
      },
      {
        title: 'Test Generator',
        description: 'Generate comprehensive tests from your curriculum.',
        icon: <BookCopy className="w-8 h-8" />,
        href: '/auth-dashboard/test-generator',
        isPremium: true,
        priceId: 'price_1Pg12lAk4y2zY5d6pQrStUvW',
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

const ToolCard = ({ title, description, icon, href }: { title: string, description: string, icon: React.ReactNode, href: string }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(href);
  };

  return (
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
  );
};

const ToolSection = ({ title, tools, userSubscriptions, isAdmin }: { title: string, tools: any[], userSubscriptions: string[], isAdmin: boolean }) => {
    const { hasScienceSubscription } = useAuth();
    
    const accessibleTools = useMemo(() => {
        if (isAdmin) return tools; // Admin sees all tools in the section

        return tools.filter(tool => {
            if (tool.requiresScienceSubscription) {
                return hasScienceSubscription;
            }
            if (tool.isPremium && tool.priceId) {
                return userSubscriptions.includes(tool.priceId);
            }
            if (tool.isPremium && tool.priceId === null) {
                return true; // Part of base subscription for non-admins
            }
            return !tool.isPremium;
        });
    }, [tools, userSubscriptions, hasScienceSubscription, isAdmin]);

    if (accessibleTools.length === 0) {
        return null;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold font-headline mb-4">{title}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {accessibleTools.map((tool) => <ToolCard key={tool.title} {...tool} />)}
            </div>
        </div>
    );
};


const PremiumDashboardContent = () => {
  const { subscriptions, isAdmin, user } = useAuth();
  
  const getAccessMessage = () => {
    if (isAdmin) return "Admin access: All tools are enabled.";
    if (subscriptions.length > 0) return "You have access to your subscribed AI generators and free tools.";
    return "You currently have access to our free tools. Subscribe to unlock premium features!";
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome back, {user?.name || 'educator'}!</h1>
        <p className="text-muted-foreground">
           {getAccessMessage()}
        </p>
      </div>

       <ToolSection title="General Tools" tools={tools.general} userSubscriptions={subscriptions} isAdmin={isAdmin} />
       <ToolSection title="Science" tools={tools.science} userSubscriptions={subscriptions} isAdmin={isAdmin} />
       <ToolSection title="Mathematics" tools={tools.math} userSubscriptions={subscriptions} isAdmin={isAdmin} />
       <ToolSection title="English Language Arts" tools={tools.ela} userSubscriptions={subscriptions} isAdmin={isAdmin} />
       <ToolSection title="Social Studies" tools={tools.social} userSubscriptions={subscriptions} isAdmin={isAdmin} />
       <ToolSection title="Free Tools" tools={tools.free} userSubscriptions={subscriptions} isAdmin={isAdmin} />
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

    

    

    