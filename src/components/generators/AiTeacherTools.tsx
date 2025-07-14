
'use client';

import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  FileText,
  BookOpen,
  HelpCircle,
  ClipboardList,
  Grid3x3,
  Presentation,
  Accessibility,
  Share2,
  Calculator,
  UserCheck,
  Printer,
  Globe,
  Download,
  Loader2,
} from 'lucide-react';
import { generateTeacherTool } from '@/ai/flows/generate-teacher-tool';
import type { ToolType } from '@/ai/schemas/teacher-tool-schemas';
import StyledContentDisplay from '../common/StyledContentDisplay';
import { useToast } from '@/hooks/use-toast';

const teacherTools = [
  {
    value: 'worksheet',
    title: 'Worksheet Generator',
    icon: <FileText className="w-5 h-5" />,
    description: 'Reproduces Parts A–I of the lesson as a student-facing worksheet.',
  },
  {
    value: 'reading_material',
    title: 'Reading Material Generator',
    icon: <BookOpen className="w-5 h-5" />,
    description: 'Generates NGSS-aligned nonfiction text (150–400 words).',
  },
  {
    value: 'comprehension_questions',
    title: 'Comprehension Question Generator',
    icon: <HelpCircle className="w-5 h-5" />,
    description: 'Pulls from Reading Material to create MC, CER, or Phenomenon-based questions.',
  },
  {
    value: 'study_sheet',
    title: 'Study Sheet Generator',
    icon: <ClipboardList className="w-5 h-5" />,
    description: 'Outputs a fact-based review sheet with vocabulary and key concepts.',
  },
  {
    value: 'cluster_questions',
    title: 'Cluster Question Generator (Science Only)',
    icon: <Grid3x3 className="w-5 h-5" />,
    description: 'Creates a full 6-question NGSS-style cluster with a real-world phenomenon.',
  },
  {
    value: 'slideshow_outline',
    title: 'Slideshow Outline Generator',
    icon: <Presentation className="w-5 h-5" />,
    description: 'Builds teaching slides from A–I, including presenter notes and visual cues.',
  },
  {
    value: 'ell_swd_scaffolds',
    title: 'ELL/SWD Scaffold Tool',
    icon: <Accessibility className="w-5 h-5" />,
    description: 'Regenerates the worksheet with built-in scaffolds like sentence frames and visual cues.',
  },
  {
    value: 'diagram_flowchart',
    title: 'Diagram / Flowchart Generator',
    icon: <Share2 className="w-5 h-5" />,
    description: 'Auto-generates print-ready blackline diagrams referenced in the lesson.',
  },
  {
    value: 'math_visualizer',
    title: 'Math Visualizer',
    icon: <Calculator className="w-5 h-5" />,
    description: 'Renders editable and printable functions, graphs, and geometric shapes.',
  },
  {
    value: 'teacher_coach',
    title: 'Teacher Coach Generator',
    icon: <UserCheck className="w-5 h-5" />,
    description: 'Provides pedagogical guidance and sample scripts for each lesson part.',
  },
];


const ToolGenerationArea = ({ tool, lessonPlanContent }: { tool: typeof teacherTools[0], lessonPlanContent: string }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [generatedContent, setGeneratedContent] = useState<string | null>(null);
    const { toast } = useToast();

    const handleGenerate = async () => {
        setIsLoading(true);
        setGeneratedContent(null);
        try {
            const result = await generateTeacherTool({
                lessonPlan: lessonPlanContent,
                toolType: tool.value as ToolType,
            });
            setGeneratedContent(result.content);
        } catch (error) {
            console.error(`Error generating ${tool.title}:`, error);
            toast({
                title: 'Generation Failed',
                description: `An error occurred while generating the ${tool.title}.`,
                variant: 'destructive',
            });
        } finally {
            setIsLoading(false);
        }
    };
    
    // Placeholder actions
    const handlePrint = () => alert('Print functionality coming soon!');
    const handleTranslate = () => alert('Translate functionality coming soon!');
    const handleDownload = () => alert('Download functionality coming soon!');

    return (
        <div className="p-4 bg-muted/50 rounded-b-lg">
            <div className="flex justify-start mb-4">
                <Button onClick={handleGenerate} disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {isLoading ? 'Generating...' : `Generate ${tool.title}`}
                </Button>
            </div>
            
            {generatedContent && (
                <div className="border-t pt-4">
                    <div className="flex justify-end gap-2 mb-4">
                        <Button variant="outline" size="sm" onClick={handlePrint}><Printer className="w-4 h-4 mr-2"/> Print</Button>
                        <Button variant="outline" size="sm" onClick={handleTranslate}><Globe className="w-4 h-4 mr-2"/> Translate</Button>
                        <Button variant="outline" size="sm" onClick={handleDownload}><Download className="w-4 h-4 mr-2"/> Download</Button>
                    </div>
                    <div className="bg-background p-4 rounded-md shadow-inner">
                        <StyledContentDisplay content={generatedContent} />
                    </div>
                </div>
            )}
        </div>
    );
};


export default function AiTeacherTools({ lessonPlanContent }: { lessonPlanContent: string }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Teacher Tools</CardTitle>
        <CardDescription>
          Use the lesson plan you just created to generate supplementary materials.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full">
          {teacherTools.map((tool) => (
            <AccordionItem value={tool.value} key={tool.value}>
              <AccordionTrigger className="font-semibold text-md hover:no-underline">
                <div className="flex items-center gap-3">
                  <div className="text-primary">{tool.icon}</div>
                  <div>
                    {tool.title}
                    <p className="text-sm text-muted-foreground font-normal text-left">{tool.description}</p>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <ToolGenerationArea tool={tool} lessonPlanContent={lessonPlanContent} />
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
