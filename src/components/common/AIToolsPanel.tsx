
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import {
  FileText,
  BookOpen,
  HelpCircle,
  FileQuestion,
  Presentation,
  Accessibility,
  Bot,
} from 'lucide-react';
import type { GenerateNVBiologyLessonOutput } from '@/ai/flows/generate-nv-biology-lesson';
import { generateWorksheet } from '@/ai/flows/worksheet-generator';
import type { WorksheetGeneratorOutput } from '@/ai/schemas/worksheet-generator-schemas';
import { useToast } from '@/hooks/use-toast';
import StyledContentDisplay from './StyledContentDisplay';
import GeneratingAnimation from './GeneratingAnimation';

type AIToolsPanelProps = {
  lessonPlan: GenerateNVBiologyLessonOutput | null;
};

const ToolButton = ({ icon, label, onClick, disabled = false }: { icon: React.ReactNode; label: string; onClick: () => void; disabled?: boolean }) => (
  <Button variant="outline" className="w-full justify-start gap-3 p-4 h-auto flex-col items-start" onClick={onClick} disabled={disabled}>
    <div className="flex items-center gap-2">
      {icon}
      <span className="font-semibold">{label}</span>
    </div>
     <p className="text-xs text-muted-foreground text-left">Generates a {label.toLowerCase()} from the lesson plan.</p>
  </Button>
);

export default function AIToolsPanel({ lessonPlan }: AIToolsPanelProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<any | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);

  const handleGenerateWorksheet = async () => {
    if (!lessonPlan) {
      toast({
        title: "Error",
        description: "No lesson plan available to generate a worksheet from.",
        variant: "destructive",
      });
      return;
    }
    
    setActiveTool('Worksheet');
    setGeneratedContent(null);
    setIsSheetOpen(true);
    setIsGenerating(true);

    try {
      const result: WorksheetGeneratorOutput = await generateWorksheet(lessonPlan);
      setGeneratedContent(result.worksheetContent);
    } catch (error) {
      console.error("Worksheet generation failed:", error);
      toast({
        title: "Generation Failed",
        description: "An error occurred while generating the worksheet.",
        variant: "destructive",
      });
       setIsSheetOpen(false);
    } finally {
      setIsGenerating(false);
    }
  };

  if (!lessonPlan) return null;

  return (
    <div className="border-t mt-8 pt-8">
       <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <Card className="bg-muted/30 border-none shadow-none">
          <CardHeader className="p-4 text-center">
            <CardTitle className="text-xl font-headline">AI Post-Lesson Tools</CardTitle>
            <CardDescription>Use the generated lesson to create supplementary materials.</CardDescription>
          </CardHeader>
          <CardContent className="p-4 pt-0 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <ToolButton icon={<FileText className="h-5 w-5" />} label="Worksheet" onClick={handleGenerateWorksheet} />
            <ToolButton icon={<BookOpen className="h-5 w-5" />} label="Reading Material" onClick={() => {}} disabled />
            <ToolButton icon={<HelpCircle className="h-5 w-5" />} label="Comprehension Qs" onClick={() => {}} disabled />
            <ToolButton icon={<FileQuestion className="h-5 w-5" />} label="Study Sheet" onClick={() => {}} disabled />
            <ToolButton icon={<FileQuestion className="h-5 w-5" />} label="Question Cluster" onClick={() => {}} disabled />
            <ToolButton icon={<Presentation className="h-5 w-5" />} label="Slideshow Outline" onClick={() => {}} disabled />
            <ToolButton icon={<Accessibility className="h-5 w-5" />} label="Scaffold Tool" onClick={() => {}} disabled />
            <ToolButton icon={<Bot className="h-5 w-5" />} label="Teacher Coach" onClick={() => {}} disabled />
          </CardContent>
        </Card>

        <SheetContent className="w-full sm:w-3/4 lg:w-1/2 overflow-y-auto">
             <CardHeader>
                <CardTitle className="text-2xl font-headline">{activeTool}</CardTitle>
                <CardDescription>Generated from the lesson plan.</CardDescription>
            </CardHeader>
            <CardContent>
                {isGenerating && <GeneratingAnimation />}
                {generatedContent && !isGenerating && (
                    <StyledContentDisplay content={generatedContent} />
                )}
            </CardContent>
        </SheetContent>
      </Sheet>
    </div>
  );
}
