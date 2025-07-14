
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Settings,
  FileText,
  BookOpen,
  HelpCircle,
  FileQuestion,
  Presentation,
  Accessibility,
  Share2,
  Sigma,
  Bot,
  Loader2,
} from 'lucide-react';
import type { GenerateNVBiologyLessonOutput } from '@/ai/flows/generate-nv-biology-lesson';
import { generateWorksheet } from '@/ai/flows/worksheet-generator';
import type { WorksheetGeneratorOutput } from '@/ai/schemas/worksheet-generator-schemas';
import { useToast } from '@/hooks/use-toast';
import StyledContentDisplay from './StyledContentDisplay';
import GeneratingAnimation from './GeneratingAnimation';

type FloatingToolsMenuProps = {
  lessonPlan: GenerateNVBiologyLessonOutput | null;
};

const ToolButton = ({ icon, label, onClick, disabled = false }: { icon: React.ReactNode; label: string; onClick: () => void; disabled?: boolean }) => (
  <Button variant="outline" className="w-full justify-start gap-2" onClick={onClick} disabled={disabled}>
    {icon}
    <span>{label}</span>
  </Button>
);

export default function FloatingToolsMenu({ lessonPlan }: FloatingToolsMenuProps) {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const [worksheet, setWorksheet] = useState<WorksheetGeneratorOutput | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleGenerateWorksheet = async () => {
    if (!lessonPlan) {
      toast({
        title: "Error",
        description: "No lesson plan available to generate a worksheet from.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSheetOpen(true);
    setIsGenerating(true);
    setWorksheet(null);

    try {
      const result = await generateWorksheet(lessonPlan);
      setWorksheet(result);
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
    <div className="fixed top-1/2 right-4 -translate-y-1/2 z-40">
       <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
        <Card className="bg-background/80 backdrop-blur-sm shadow-2xl border-primary/20 animate-float-up">
          <CardHeader className="p-4 text-center">
            <CardTitle className="text-lg font-headline">AI Tools</CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0 space-y-2">
            <ToolButton icon={<FileText className="h-4 w-4" />} label="Worksheet" onClick={handleGenerateWorksheet} />
            <ToolButton icon={<BookOpen className="h-4 w-4" />} label="Reading Material" onClick={() => {}} disabled />
            <ToolButton icon={<HelpCircle className="h-4 w-4" />} label="Comprehension Qs" onClick={() => {}} disabled />
            <ToolButton icon={<FileQuestion className="h-4 w-4" />} label="Study Sheet" onClick={() => {}} disabled />
            <ToolButton icon={<FileQuestion className="h-4 w-4" />} label="Question Cluster" onClick={() => {}} disabled />
            <ToolButton icon={<Presentation className="h-4 w-4" />} label="Slideshow Outline" onClick={() => {}} disabled />
            <ToolButton icon={<Accessibility className="h-4 w-4" />} label="Scaffold Tool" onClick={() => {}} disabled />
            <ToolButton icon={<Share2 className="h-4 w-4" />} label="Diagram Generator" onClick={() => {}} disabled />
            <ToolButton icon={<Sigma className="h-4 w-4" />} label="Math Visualizer" onClick={() => {}} disabled />
            <ToolButton icon={<Bot className="h-4 w-4" />} label="Teacher Coach" onClick={() => {}} disabled />
          </CardContent>
        </Card>

        <SheetContent className="w-full sm:w-3/4 lg:w-1/2 overflow-y-auto">
            {isGenerating && <GeneratingAnimation />}
            {worksheet && (
                <StyledContentDisplay content={worksheet.worksheetContent} />
            )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
