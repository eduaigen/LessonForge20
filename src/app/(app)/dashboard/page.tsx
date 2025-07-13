'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ObjectiveRefiner from './ObjectiveRefiner';
import ConceptExplainer from './ConceptExplainer';
import VocabDeepDive from './VocabDeepDive';
import { Lock } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  return (
    <Tabs defaultValue="objective-refiner" className="w-full">
      <div className="overflow-x-auto">
        <TabsList className="grid w-full min-w-max grid-cols-6">
          <TabsTrigger value="objective-refiner">Objective Refiner</TabsTrigger>
          <TabsTrigger value="concept-explainer">Concept Explainer</TabsTrigger>
          <TabsTrigger value="vocab-deep-dive">Vocab Deep Dive</TabsTrigger>
          <TabsTrigger value="lesson-plan" asChild>
            <Link href="/curriculum">
              <Lock className="w-4 h-4 mr-2" />
              Lesson Plan
            </Link>
          </TabsTrigger>
          <TabsTrigger value="test-maker" asChild>
            <Link href="/curriculum">
              <Lock className="w-4 h-4 mr-2" />
              Test Maker
            </Link>
          </TabsTrigger>
          <TabsTrigger value="lab-generator" asChild>
            <Link href="/curriculum">
              <Lock className="w-4 h-4 mr-2" />
              Lab Generator
            </Link>
          </TabsTrigger>
        </TabsList>
      </div>
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
