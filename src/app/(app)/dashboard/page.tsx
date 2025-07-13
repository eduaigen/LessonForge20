'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LessonPlanGenerator from './LessonPlanGenerator';
import TestMaker from './TestMaker';
import LabGenerator from './LabGenerator';
import ObjectiveRefiner from './ObjectiveRefiner';
import ConceptExplainer from './ConceptExplainer';
import VocabDeepDive from './VocabDeepDive';
import { Lock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const LoginRequired = ({ toolName }: { toolName: string }) => (
  <div className="flex flex-col items-center justify-center h-[60vh] text-center p-4">
    <Lock className="w-16 h-16 text-primary/50 mb-4" />
    <h3 className="text-2xl font-bold font-headline mb-2">
      Unlock the {toolName}
    </h3>
    <p className="text-muted-foreground max-w-md mb-6">
      Please log in or sign up to access this premium feature and our full suite of AI-powered teaching tools.
    </p>
    <div className="flex gap-4">
      <Button asChild>
        <Link href="/login">Login</Link>
      </Button>
      <Button variant="outline" asChild>
        <Link href="/signup">Sign Up</Link>
      </Button>
    </div>
  </div>
);

// A simple mock of an auth hook.
// In a real app, this would be replaced with actual authentication state.
const useAuth = () => {
    return { isAuthenticated: false };
}

export default function DashboardPage() {
  const { isAuthenticated } = useAuth();
  
  return (
    <Tabs defaultValue="objective-refiner" className="w-full">
      <div className="overflow-x-auto">
        <TabsList className="grid w-full min-w-max grid-cols-6">
          <TabsTrigger value="objective-refiner">Objective Refiner</TabsTrigger>
          <TabsTrigger value="concept-explainer">Concept Explainer</TabsTrigger>
          <TabsTrigger value="vocab-deep-dive">Vocab Deep Dive</TabsTrigger>
          <TabsTrigger value="lesson-plan">
            <Lock className="w-4 h-4 mr-2" />
            Lesson Plan
          </TabsTrigger>
          <TabsTrigger value="test-maker">
            <Lock className="w-4 h-4 mr-2" />
            Test Maker
            </TabsTrigger>
          <TabsTrigger value="lab-generator">
            <Lock className="w-4 h-4 mr-2" />
            Lab Generator
          </TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="lesson-plan" className="mt-4">
        {isAuthenticated ? <LessonPlanGenerator /> : <LoginRequired toolName="Lesson Plan Generator" />}
      </TabsContent>
      <TabsContent value="test-maker" className="mt-4">
        {isAuthenticated ? <TestMaker /> : <LoginRequired toolName="Test Maker" />}
      </TabsContent>
      <TabsContent value="lab-generator" className="mt-4">
        {isAuthenticated ? <LabGenerator /> : <LoginRequired toolName="Lab Generator" />}
      </TabsContent>
      <TabsContent value="objective-refiner" className="mt-4">
        <ObjectiveRefiner />
      </TabsContent>
      <TabsContent value="concept-explainer" className="mt-4">
        <ConceptExplainer />
      </TabsContent>
      <TabsContent value="vocab-deep-dive" className="mt-4">
        <VocabDeepDive />
      </TabsContent>
    </Tabs>
  );
}
