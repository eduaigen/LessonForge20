
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
  Atom,
  Dna,
  Leaf,
  Orbit,
  HeartPulse,
  Stethoscope,
  Languages,
  Landmark,
  FlaskConical,
  Sparkles
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { createCheckoutSession } from '@/actions/stripe';
import { Loader2 } from 'lucide-react';
import { allModules } from '@/lib/modules-data';

const ToolCard = ({ title, description, icon, href, isSubscribed }: { title: string, description: string, icon: React.ReactNode, href?: string, isSubscribed: boolean }) => {
  return (
    <Link href={isSubscribed ? (href || '/auth-dashboard') : '/pricing'} className="block h-full">
      <Card
        className={`cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-transform duration-200 flex flex-col h-full ${!isSubscribed && 'bg-muted/50'}`}
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <div className="text-primary">{icon}</div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">{description}</p>
          {!isSubscribed && <p className="text-xs text-amber-600 font-semibold mt-2">Subscription Required</p>}
        </CardContent>
      </Card>
    </Link>
  );
};

const SubjectSection = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
    <section>
        <div className="flex items-center gap-4 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">{icon}</div>
            <h2 className="text-3xl font-bold font-headline">{title}</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {children}
        </div>
    </section>
)

const PremiumDashboardContent = () => {
  const { user, hasScienceSubscription, hasMathSubscription, hasELASubscription, hasSocialStudiesSubscription, hasELLSubscription, hasPremiumTools } = useAuth();
  
  const subjects = [
    { name: "Advanced Tools", icon: <FolderSync />, tools: allModules.premium_tools, subscription: hasPremiumTools },
    { name: "Science", icon: <Dna />, tools: [...allModules.coursesBySubject.science, ...allModules.assessmentsBySubject.science], subscription: hasScienceSubscription },
    { name: "Mathematics", icon: <Sigma />, tools: [...allModules.coursesBySubject.math, ...allModules.assessmentsBySubject.math], subscription: hasMathSubscription },
    { name: "English Language Arts", icon: <Library />, tools: [...allModules.coursesBySubject.ela, ...allModules.assessmentsBySubject.ela], subscription: hasELASubscription },
    { name: "Social Studies", icon: <History />, tools: [...allModules.coursesBySubject['social studies'], ...allModules.assessmentsBySubject['social studies']], subscription: hasSocialStudiesSubscription },
  ];

  return (
    <div className="flex flex-col gap-12">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome back, {user?.name || 'educator'}!</h1>
        <p className="text-muted-foreground">
           Explore our suite of AI-powered curriculum and assessment tools.
        </p>
      </div>

       <div className="space-y-12">
            {subjects.map(subject => (
                <SubjectSection key={subject.name} title={subject.name} icon={subject.icon}>
                    {subject.tools.map(tool => (
                        <ToolCard 
                            key={tool.id}
                            title={tool.name}
                            description={tool.description}
                            icon={<tool.icon />}
                            href={tool.href}
                            isSubscribed={subject.subscription}
                        />
                    ))}
                </SubjectSection>
            ))}
       </div>
    </div>
  );
};

const SubscriptionPrompt = () => {
  const router = useRouter();
  
  return (
    <div className="flex flex-1 items-center justify-center p-4">
        <Card className="max-w-2xl text-center p-8 shadow-lg">
            <CardHeader>
                 <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sparkles className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline text-3xl font-bold">Unlock Your Full Teaching Potential</CardTitle>
                <CardDescription className="text-lg text-muted-foreground pt-2">
                    Subscribe to EduAiGen to access our full suite of powerful AI tools, including curriculum generators, test makers, and advanced lesson planning features.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button size="lg" onClick={() => router.push('/pricing')}>
                    Subscribe Now
                </Button>
            </CardContent>
        </Card>
    </div>
)};

export default function PremiumDashboardPage() {
  const { isSubscribed } = useAuth();
  
  return isSubscribed ? <PremiumDashboardContent /> : <SubscriptionPrompt />;
}
