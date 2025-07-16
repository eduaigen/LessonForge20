
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
  Magnet,
  Sparkles,
  Stethoscope,
  FlaskConical,
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const ToolCard = ({ title, description, icon, href }: { title: string, description: string, icon: React.ReactNode, href: string }) => {
  return (
    <Link href={href} className="block h-full">
      <Card
        className="cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-transform duration-200 h-full flex flex-col"
      >
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">{title}</CardTitle>
          <div className="text-primary">{icon}</div>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

const PremiumDashboardContent = () => {
  const { user, hasScienceSubscription } = useAuth();
  
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome back, {user?.name || 'educator'}!</h1>
        <p className="text-muted-foreground">
           Explore your available curriculum modules.
        </p>
      </div>

       <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {hasScienceSubscription && (
            <>
             <ToolCard 
                title="NV Biology Generator"
                description="Create 5E model lesson plans for the New Visions Biology curriculum."
                icon={<Leaf />}
                href="/nv-biology-generator"
             />
              <ToolCard 
                title="NV Earth Science Generator"
                description="Create 5E model lesson plans for NV Earth & Space Science."
                icon={<Orbit />}
                href="/ngss-earth-science-generator"
             />
              <ToolCard
                title="AP Biology Generator"
                description="Create 5E model lesson plans for the AP Biology curriculum."
                icon={<Dna />}
                href="/ap-biology-generator"
              />
              <ToolCard
                title="NGSS Chemistry Generator"
                description="Create 5E model lesson plans for the NGSS Chemistry curriculum."
                icon={<Atom />}
                href="/ngss-chemistry-generator"
              />
               <ToolCard
                title="NGSS Physics Generator"
                description="Create 5E model lesson plans for the NGSS Physics curriculum."
                icon={<Magnet />}
                href="/ngss-physics-generator"
              />
               <ToolCard
                title="Health Lesson Generator"
                description="Create 5E model lesson plans for Health class."
                icon={<HeartPulse />}
                href="/health-generator"
              />
              <ToolCard
                title="Anatomy & Physiology Generator"
                description="Create detailed lesson plans for Anatomy & Physiology."
                icon={<Stethoscope />}
                href="/anatomy-physiology-generator"
              />
            </>
          )}

          {!hasScienceSubscription && (
             <div className="text-center py-16 col-span-full">
                <h2 className="text-2xl font-bold font-headline mb-4">No Tools Available</h2>
                <p className="text-muted-foreground">You do not have any active subscriptions with available tools.</p>
            </div>
          )}
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
                    Subscribe to EduAiGen to access our full suite of powerful AI tools, including curriculum generators, test makers, and advanced lesson planning features.
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
