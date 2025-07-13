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
  Atom,
  Dna,
  Leaf,
  Orbit,
  HeartPulse,
  Magnet,
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';


const tools = {
    science: [
      {
        title: 'Lab Generator',
        description: 'Instantly create safe and effective lab experiments.',
        icon: <TestTube className="w-8 h-8" />,
        href: '/auth-dashboard/lab-generator',
      },
      {
        title: 'NGSS Biology (OpenSciEd)',
        description: 'Inquiry-based biology phenomena.',
        icon: <Leaf className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=NGSS_Biology',
      },
      {
        title: 'NV Biology',
        description: 'NYS Living Environment curriculum.',
        icon: <Dna className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=NV_Biology',
      },
      {
        title: 'NGSS Chemistry (OpenSciEd)',
        description: 'Foundational chemical principles.',
        icon: <Atom className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=NGSS_Chemistry',
      },
      {
        title: 'NGSS Physics (OpenSciEd)',
        description: 'Core concepts like motion, forces, energy.',
        icon: <Magnet className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=NGSS_Physics',
      },
       {
        title: 'Earth and Space Science',
        description: 'NYS Physical Setting curriculum.',
        icon: <Orbit className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Earth_Science',
      },
       {
        title: 'Health',
        description: 'Promoting well-being & healthy choices.',
        icon: <HeartPulse className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Health',
      },
    ],
    math: [
         {
        title: 'Illustrative Math Algebra 1',
        description: 'Linear equations, functions, data.',
        icon: <Sigma className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=IM_Algebra_1',
      },
      {
        title: 'Illustrative Math Algebra 2',
        description: 'Polynomials, rational, exponential.',
        icon: <Sigma className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=IM_Algebra_2',
      },
       {
        title: 'Illustrative Math Geometry',
        description: 'Transformations, congruence, trig.',
        icon: <Sigma className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=IM_Geometry',
      },
    ],
    ela: [
        {
        title: 'ELA 9th Grade',
        description: 'Analytical reading and writing skills.',
        icon: <Library className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=ELA_9',
      },
       {
        title: 'ELA 10th Grade',
        description: 'Complex texts and critical analysis.',
        icon: <Library className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=ELA_10',
      },
       {
        title: 'ELA 11th Grade',
        description: 'American literature and research.',
        icon: <Library className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=ELA_11',
      },
       {
        title: 'ELA 12th Grade',
        description: 'College-level reading and writing.',
        icon: <Library className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=ELA_12',
      },
    ],
    social: [
       {
        title: 'Global History I & II',
        description: 'From ancient civilizations to present.',
        icon: <History className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Global_History',
      },
       {
        title: 'US History & Government',
        description: 'American history & constitutional principles.',
        icon: <History className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=US_History',
      },
       {
        title: 'Government & Economics',
        description: 'Study of government and economic principles.',
        icon: <History className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator?subject=Gov_Econ',
      },
    ],
    general: [
      {
        title: 'Generic Lesson Plan Generator',
        description: 'Craft detailed, standards-aligned lesson plans for any subject.',
        icon: <FileText className="w-8 h-8" />,
        href: '/auth-dashboard/lesson-plan-generator',
      },
      {
        title: 'Curriculum Audit',
        description: 'Analyze and simplify your existing curriculum documents.',
        icon: <FolderSync className="w-8 h-8" />,
        href: '/auth-dashboard/curriculum-audit',
      },
      {
        title: 'Test Generator',
        description: 'Generate comprehensive tests from your curriculum.',
        icon: <BookCopy className="w-8 h-8" />,
        href: '/auth-dashboard/test-generator',
      },
    ]
};

const freeTools = [
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
]

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

const ToolCard = ({ title, description, icon, href }: { title: string, description: string, icon: React.ReactNode, href: string }) => {
  const router = useRouter();
  const handleCardClick = (href: string) => {
    router.push(href);
  };

  return (
    <Card
      onClick={() => handleCardClick(href)}
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

export default function PremiumDashboardPage() {
  const { isSubscribed } = useAuth();
  
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

       <div>
        <h2 className="text-2xl font-bold font-headline mb-4">General Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.general.map((tool) => <ToolCard key={tool.title} {...tool} />)}
        </div>
      </div>

       <div>
        <h2 className="text-2xl font-bold font-headline mb-4">Science</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {tools.science.map((tool) => <ToolCard key={tool.title} {...tool} />)}
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
          {freeTools.map((tool) => <ToolCard key={tool.title} {...tool} />)}
        </div>
      </div>
    </div>
  );
}