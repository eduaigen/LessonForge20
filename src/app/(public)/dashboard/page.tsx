
'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ObjectiveRefiner from './ObjectiveRefiner';
import ConceptExplainer from './ConceptExplainer';
import VocabDeepDive from './VocabDeepDive';

export default function DashboardPage() {
  return (
    <div className="flex flex-col">
      <div className="mb-4">
        <h1 className="text-2xl font-bold">Free AI Tools</h1>
        <p className="text-muted-foreground">
          Explore our foundational AI tools, available for free to all
          educators.
        </p>
      </div>
      <Tabs defaultValue="objective-refiner" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3">
          <TabsTrigger value="objective-refiner">
            Objective Refiner
          </TabsTrigger>
          <TabsTrigger value="concept-explainer">
            Concept Explainer
          </TabsTrigger>
          <TabsTrigger value="vocab-deep-dive">Vocab Deep Dive</TabsTrigger>
        </TabsList>
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
    </div>
  );
}

    