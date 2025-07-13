'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import LessonPlanGenerator from '../dashboard/LessonPlanGenerator';
import TestMaker from '../dashboard/TestMaker';
import LabGenerator from '../dashboard/LabGenerator';
import CurriculumAuditTool from './CurriculumAuditTool';

export default function AuthDashboardPage() {
  return (
    <div className="flex flex-col">
       <div className="mb-4">
        <h1 className="text-2xl font-bold">Premium Tools</h1>
        <p className="text-muted-foreground">
          Access your exclusive curriculum generation and analysis tools.
        </p>
      </div>
      <Tabs defaultValue="lesson-plan" className="w-full">
        <TabsList className="grid w-full grid-cols-1 sm:grid-cols-4">
          <TabsTrigger value="lesson-plan">Lesson Plan Generator</TabsTrigger>
          <TabsTrigger value="test-maker">Test Maker</TabsTrigger>
          <TabsTrigger value="lab-generator">Lab Generator</TabsTrigger>
          <TabsTrigger value="curriculum-audit">Curriculum Audit</TabsTrigger>
        </TabsList>
        <TabsContent value="lesson-plan" className="mt-4">
          <LessonPlanGenerator />
        </TabsContent>
        <TabsContent value="test-maker" className="mt-4">
          <TestMaker />
        </TabsContent>
        <TabsContent value="lab-generator" className="mt-4">
          <LabGenerator />
        </TabsContent>
        <TabsContent value="curriculum-audit" className="mt-4">
          <CurriculumAuditTool />
        </TabsContent>
      </Tabs>
    </div>
  );
}
