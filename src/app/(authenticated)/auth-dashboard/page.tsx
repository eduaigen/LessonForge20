
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
  Languages,
  Landmark,
  FlaskConical
} from 'lucide-react';
import Link from 'next/link';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Separator } from '@/components/ui/separator';

const ToolCard = ({ title, description, icon, href, className }: { title: string, description: string, icon: React.ReactNode, href: string, className?: string }) => {
  return (
    <Link href={href} className="block">
      <Card
        className={`cursor-pointer hover:shadow-lg hover:-translate-y-1 transition-transform duration-200 flex flex-col ${className}`}
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
  const { user, hasScienceSubscription, hasMathSubscription, hasELASubscription, hasSocialStudiesSubscription, hasELLSubscription } = useAuth();
  
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="text-3xl font-bold font-headline">Welcome back, {user?.name || 'educator'}!</h1>
        <p className="text-muted-foreground">
           Explore your available curriculum modules.
        </p>
      </div>

       <div className="space-y-8">
          {hasScienceSubscription && (
            <section>
              <h2 className="text-2xl font-bold font-headline mb-4">Science Modules</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-muted-foreground">Lesson Plan Generators</h3>
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
                </div>
                <div className="space-y-6">
                    <h3 className="text-lg font-semibold text-muted-foreground">Assessment & Lab Generators</h3>
                     <ToolCard 
                        title="NV Biology Test Generator"
                        description="Create custom tests for the New Visions Biology curriculum."
                        icon={<FlaskConical />}
                        href="/nv-biology-test-generator"
                     />
                     <ToolCard
                        title="NV Earth Science Test Generator"
                        description="Create custom tests for the New Visions Earth Science curriculum."
                        icon={<FlaskConical />}
                        href="/nv-earth-science-test-generator"
                     />
                     <ToolCard
                        title="NGSS Physics Test Generator"
                        description="Create custom tests for the NGSS Physics curriculum."
                        icon={<FlaskConical />}
                        href="/ngss-physics-test-generator"
                     />
                     <ToolCard
                        title="NGSS Chemistry Test Generator"
                        description="Create custom tests for the NGSS Chemistry curriculum."
                        icon={<FlaskConical />}
                        href="/ngss-chemistry-test-generator"
                     />
                     <Card className="flex flex-col bg-muted/50">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-lg font-medium text-muted-foreground">Lab Generator</CardTitle>
                            <TestTube className="text-muted-foreground/50"/>
                        </CardHeader>
                        <CardContent className="flex-grow">
                            <p className="text-sm text-muted-foreground">Coming soon! Create safe, effective lab activities.</p>
                        </CardContent>
                     </Card>
                </div>
              </div>
            </section>
          )}

          {hasMathSubscription && (
            <section>
              <h2 className="text-2xl font-bold font-headline mb-4">Mathematics Modules</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <ToolCard
                    title="Algebra 1 Generator"
                    description="Create 5E model lesson plans for Illustrative Math Algebra 1."
                    icon={<Sigma />}
                    href="/algebra1-generator"
                />
                <ToolCard
                    title="Algebra 2 Generator"
                    description="Create 5E model lesson plans for Illustrative Math Algebra 2."
                    icon={<Sigma />}
                    href="/algebra2-generator"
                />
                <ToolCard
                    title="Geometry Generator"
                    description="Create 5E model lesson plans for Illustrative Math Geometry."
                    icon={<Sigma />}
                    href="/geometry-generator"
                />
              </div>
            </section>
          )}

          {hasELASubscription && (
            <section>
              <h2 className="text-2xl font-bold font-headline mb-4">ELA Modules</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <ToolCard
                  title="ELA Curriculum Generator"
                  description="Create lesson plans for 9th-12th Grade ELA."
                  icon={<Library />}
                  href="/ela-generator"
                />
              </div>
            </section>
          )}
          
          {hasSocialStudiesSubscription && (
            <section>
              <h2 className="text-2xl font-bold font-headline mb-4">Social Studies Modules</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-muted-foreground">Lesson Plan Generators</h3>
                      <ToolCard
                          title="Global History I"
                          description="Create lesson plans for 9th Grade Global History."
                          icon={<History />}
                          href="/global-history-1-generator"
                      />
                      <ToolCard
                          title="Global History II"
                          description="Create lesson plans for 10th Grade Global History."
                          icon={<History />}
                          href="/global-history-2-generator"
                      />
                      <ToolCard
                          title="U.S. History"
                          description="Create lesson plans for United States History & Government."
                          icon={<History />}
                          href="/us-history-generator"
                      />
                      <ToolCard
                          title="Government & Economics"
                          description="Create lesson plans for Participation in Government & Economics."
                          icon={<Landmark />}
                          href="/government-generator"
                      />
                  </div>
                  <div className="space-y-6">
                      <h3 className="text-lg font-semibold text-muted-foreground">Assessment Generators</h3>
                       <ToolCard
                          title="Global History I Test"
                          description="Create custom tests for 9th Grade Global History."
                          icon={<FlaskConical />}
                          href="/global-history-1-test-generator"
                      />
                       <ToolCard
                          title="Global History II Test"
                          description="Create custom tests for 10th Grade Global History."
                          icon={<FlaskConical />}
                          href="/global-history-2-test-generator"
                      />
                       <ToolCard
                          title="U.S. History Test"
                          description="Create custom tests for U.S. History."
                          icon={<FlaskConical />}
                          href="/us-history-test-generator"
                      />
                       <ToolCard
                          title="Government Test"
                          description="Create custom tests for Government & Economics."
                          icon={<FlaskConical />}
                          href="/government-test-generator"
                      />
                  </div>
              </div>
            </section>
          )}

          {hasELLSubscription && (
             <section>
              <h2 className="text-2xl font-bold font-headline mb-4">ELL / ENL Modules</h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <ToolCard
                  title="ELL / ENL Lesson Generator"
                  description="Create scaffolded lesson plans for English Language Learners."
                  icon={<Languages />}
                  href="/ell-generator"
                />
              </div>
            </section>
          )}


          {!hasScienceSubscription && !hasMathSubscription && !hasELASubscription && !hasSocialStudiesSubscription && !hasELLSubscription && (
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
