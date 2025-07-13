'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LessonPlanGenerator from './LessonPlanGenerator';
import TestMaker from './TestMaker';
import LabGenerator from './LabGenerator';
import ObjectiveRefiner from './ObjectiveRefiner';
import ConceptExplainer from './ConceptExplainer';
import VocabDeepDive from './VocabDeepDive';

export default function DashboardPage() {
  return (
    <Tabs defaultValue="lesson-plan" className="w-full">
      <div className="overflow-x-auto">
        <TabsList className="grid w-full min-w-max grid-cols-6">
          <TabsTrigger value="lesson-plan">Lesson Plan</TabsTrigger>
          <TabsTrigger value="test-maker">Test Maker</TabsTrigger>
          <TabsTrigger value="lab-generator">Lab Generator</TabsTrigger>
          <TabsTrigger value="objective-refiner">Objective Refiner</TabsTrigger>
          <TabsTrigger value="concept-explainer">Concept Explainer</TabsTrigger>
          <TabsTrigger value="vocab-deep-dive">Vocab Deep Dive</TabsTrigger>
        </TabsList>
      </div>
      <TabsContent value="lesson-plan" className="mt-4">
        <LessonPlanGenerator />
      </TabsContent>
      <TabsContent value="test-maker" className="mt-4">
        <TestMaker />
      </TabsContent>
      <TabsContent value="lab-generator" className="mt-4">
        <LabGenerator />
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
