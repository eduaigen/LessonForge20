
'use client';

import { Button } from '@/components/ui/button';
import {
  FileText,
  BookOpen,
  FileQuestion,
  Presentation,
  Bot,
  PencilRuler,
  BrainCircuit,
  ClipboardCheck,
  Key
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

export type ToolName = 'Worksheet' | 'Reading Material' | 'Study Sheet' | 'Question Cluster' | 'Practice Questions' | 'Slideshow Outline' | 'Teacher Coach' | 'Differentiated Version' | 'Enhanced Version' | 'Student Answer Sheet' | 'Answer Key';

const lessonTools: { name: ToolName; icon: React.ReactNode; disabled: boolean }[] = [
  { name: 'Worksheet', icon: <FileText className="h-5 w-5" />, disabled: false },
  { name: 'Reading Material', icon: <BookOpen className="h-5 w-5" />, disabled: false },
  { name: 'Study Sheet', icon: <FileQuestion className="h-5 w-5" />, disabled: false },
  { name: 'Slideshow Outline', icon: <Presentation className="h-5 w-5" />, disabled: false },
  { name: 'Teacher Coach', icon: <Bot className="h-5 w-5" />, disabled: false },
];

const scienceLessonTools = [
    ...lessonTools,
    { name: 'Question Cluster' as ToolName, icon: <FileQuestion className="h-5 w-5" />, disabled: false }
]

const nonScienceLessonTools = [
    ...lessonTools,
    { name: 'Practice Questions' as ToolName, icon: <FileQuestion className="h-5 w-5" />, disabled: false },
]

const testTools: { name: ToolName; icon: React.ReactNode; disabled: boolean }[] = [
    { name: 'Study Sheet', icon: <BookOpen className="h-5 w-5" />, disabled: false },
    { name: 'Differentiated Version', icon: <PencilRuler className="h-5 w-5" />, disabled: false },
    { name: 'Enhanced Version', icon: <BrainCircuit className="h-5 w-5" />, disabled: false },
];

const labTools: { name: ToolName; icon: React.ReactNode; disabled: boolean }[] = [
  { name: 'Student Answer Sheet', icon: <ClipboardCheck className="h-5 w-5" />, disabled: false },
  { name: 'Differentiated Version', icon: <PencilRuler className="h-5 w-5" />, disabled: false },
  { name: 'Teacher Coach', icon: <Bot className="h-5 w-5" />, disabled: false },
];

type RightSidebarProps = {
  onToolClick: (toolName: ToolName) => void;
  isGenerating: boolean;
  isHighlighting: boolean;
  toolset?: 'lesson' | 'test' | 'lab' | 'science_lesson';
};

export default function RightSidebar({ onToolClick, isGenerating, isHighlighting, toolset = 'lesson' }: RightSidebarProps) {
  const { toast } = useToast();
  
  const getTools = () => {
    switch (toolset) {
      case 'lesson':
        return nonScienceLessonTools;
      case 'science_lesson':
        return scienceLessonTools;
      case 'test':
        return testTools;
      case 'lab':
        return labTools;
      default:
        return nonScienceLessonTools;
    }
  }
  const tools = getTools();

  const handleToolClick = (tool: (typeof tools)[0]) => {
    if (tool.disabled) {
      toast({
        title: "Coming Soon!",
        description: `The "${tool.name}" tool is under development.`,
      });
      return;
    }
    onToolClick(tool.name);
  };
  
  const getIsDisabled = (tool: (typeof tools)[0]) => {
    if (isGenerating) return true;
    return tool.disabled;
  }

  return (
    <aside className="fixed right-4 top-1/2 -translate-y-1/2 z-10">
       <TooltipProvider delayDuration={0}>
        <div className={cn(
            "flex flex-col gap-2 p-2 bg-background/80 backdrop-blur-sm border rounded-lg shadow-lg transition-all duration-300",
            isHighlighting && "animate-temporary-glow"
        )}>
          {tools.map((tool) => (
            <Tooltip key={tool.name} delayDuration={0}>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleToolClick(tool)}
                  disabled={getIsDisabled(tool)}
                  aria-label={tool.name}
                >
                  {tool.icon}
                  <span className="sr-only">{tool.name}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">
                <p>{tool.name}</p>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </TooltipProvider>
    </aside>
  );
}
