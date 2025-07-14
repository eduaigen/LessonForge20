
'use client';

import { Button } from '@/components/ui/button';
import {
  FileText,
  BookOpen,
  HelpCircle,
  FileQuestion,
  Presentation,
  Accessibility,
  Bot,
  ScrollText,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

type ToolName = 'Worksheet' | 'Reading Material' | 'Comprehension Qs' | 'Study Sheet' | 'Question Cluster' | 'Slideshow Outline' | 'Scaffold Tool' | 'Teacher Coach';

const tools: { name: ToolName; icon: React.ReactNode; disabled: boolean }[] = [
  { name: 'Worksheet', icon: <ScrollText className="h-5 w-5" />, disabled: false },
  { name: 'Reading Material', icon: <BookOpen className="h-5 w-5" />, disabled: true },
  { name: 'Comprehension Qs', icon: <HelpCircle className="h-5 w-5" />, disabled: true },
  { name: 'Study Sheet', icon: <FileQuestion className="h-5 w-5" />, disabled: true },
  { name: 'Question Cluster', icon: <FileQuestion className="h-5 w-5" />, disabled: true },
  { name: 'Slideshow Outline', icon: <Presentation className="h-5 w-5" />, disabled: true },
  { name: 'Scaffold Tool', icon: <Accessibility className="h-5 w-5" />, disabled: true },
  { name: 'Teacher Coach', icon: <Bot className="h-5 w-5" />, disabled: true },
];

type RightSidebarProps = {
  onToolClick: (toolName: ToolName) => void;
  isGenerating: boolean;
};

export default function RightSidebar({ onToolClick, isGenerating }: RightSidebarProps) {
  const { toast } = useToast();

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

  return (
    <aside className="fixed right-4 top-1/2 -translate-y-1/2 z-10">
      <div className="flex flex-col gap-2 p-2 bg-background/80 backdrop-blur-sm border rounded-lg shadow-lg">
        {tools.map((tool) => (
          <Button
            key={tool.name}
            variant="ghost"
            size="icon"
            onClick={() => handleToolClick(tool)}
            disabled={isGenerating || tool.disabled}
            title={tool.name}
          >
            {tool.icon}
            <span className="sr-only">{tool.name}</span>
          </Button>
        ))}
      </div>
    </aside>
  );
}
