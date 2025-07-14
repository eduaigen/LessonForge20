
'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { generateLabExperiment, type GenerateLabExperimentInput } from '@/ai/flows/generate-lab';
import { ngssBiologyCurriculum } from '@/lib/ngss-biology-curriculum';
import AiToolLayout from '@/components/generators/AiToolLayout';
import { TestTube, PlusCircle, RefreshCw, Printer } from 'lucide-react';
import { Label } from '@/components/ui/label';
import StyledContentDisplay from '@/components/common/StyledContentDisplay';
import GeneratingAnimation from '@/components/common/GeneratingAnimation';
import { useAuth } from '@/context/AuthContext';
import Link from 'next/link';
import { Lock } from 'lucide-react';

export default function NGSSBiologyLabGeneratorPage() {
  const { toast } = useToast();
  const { subscriptions, isAdmin } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);

  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedLesson, setSelectedLesson] = useState<string>('');

  const hasAccess = isAdmin || subscriptions.includes('price_1Pg0yqAk4y2zY5d6n7s8tUvW');

  const units = useMemo(() => Object.keys(ngssBiologyCurriculum.units || {}), []);

  const topics = useMemo(() => {
    if (!selectedUnit) return [];
    return Object.keys(ngssBiologyCurriculum.units?.[selectedUnit]?.topics || {});
  }, [selectedUnit]);

  const lessons = useMemo(() => {
    if (!selectedUnit || !selectedTopic) return [];
    return ngssBiologyCurriculum.units?.[selectedUnit]?.topics?.[selectedTopic]?.lessons || [];
  }, [selectedUnit, selectedTopic]);

  const handleUnitChange = (value: string) => {
    setSelectedUnit(value);
    setSelectedTopic('');
    setSelectedLesson('');
  };

  const handleTopicChange = (value: string) => {
    setSelectedTopic(value);
    setSelectedLesson('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUnit || !selectedTopic || !selectedLesson) {
      toast({
        title: 'Missing Information',
        description: 'Please select a unit, topic, and lesson.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setGeneratedContent(null);

    const input: GenerateLabExperimentInput = {
      subject: 'NGSS Biology',
      topic: selectedTopic,
      lessonDescription: selectedLesson,
    };

    try {
      const result = await generateLabExperiment(input);
      setGeneratedContent(result.labHandout);
    } catch (error) {
      console.error('Error generating lab:', error);
      toast({
        title: 'Generation Failed',
        description: 'An error occurred. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleReset = () => {
    setSelectedUnit('');
    setSelectedTopic('');
    setSelectedLesson('');
    setGeneratedContent(null);
  };
  
  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=800,width=800');
    if (printWindow && generatedContent) {
        printWindow.document.write('<html><head><title>Print Lab Handout</title>');
        printWindow.document.write('<style>body { font-family: sans-serif; } .document-view { background-color: white; padding: 1rem; } h3 { font-size: 1.25rem; font-weight: bold; margin-top: 1rem; margin-bottom: 0.5rem; border-bottom: 1px solid #ccc; padding-bottom: 0.25rem; } </style>');
        printWindow.document.write('</head><body>');
        printWindow.document.write(document.getElementById('printable-content')?.innerHTML || '');
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        printWindow.print();
    }
  };

  const ResultDisplay = () => (
    <Card className="h-full flex flex-col">
      <CardHeader className='flex-row items-center justify-between'>
        <div>
            <CardTitle>Generated Lab Handout</CardTitle>
            <CardDescription>Review the NGSS Biology lab below.</CardDescription>
        </div>
        <Button variant="outline" size="sm" onClick={handlePrint} disabled={!generatedContent}>
            <Printer className="mr-2 h-4 w-4" />
            Print
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col bg-muted/30 p-4">
        {isLoading ? (
          <GeneratingAnimation />
        ) : generatedContent ? (
           <ScrollArea className="flex-1 rounded-md bg-background shadow-inner">
            <div id="printable-content" className="document-view">
              <StyledContentDisplay content={generatedContent} />
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground bg-background rounded-md">
            <TestTube className="w-16 h-16 text-muted-foreground/50" />
            <p className="mt-4">Your generated lab handout will appear here.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (!hasAccess) {
    return (
      <Card className="w-full max-w-2xl mx-auto my-12">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Lock className="h-8 w-8" />
          </div>
          <CardTitle>Premium Tool Locked</CardTitle>
          <CardDescription>The NGSS Biology Lab Generator is a premium feature. Please subscribe to unlock it.</CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <Button asChild>
            <Link href="/pricing">View Subscription Options</Link>
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <AiToolLayout
      title="NGSS Biology Lab Generator"
      description="Create labs aligned with the NGSS Biology curriculum."
      resultDisplay={<ResultDisplay />}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label>Unit</Label>
            <Select value={selectedUnit} onValueChange={handleUnitChange} required>
              <SelectTrigger><SelectValue placeholder="Select Unit" /></SelectTrigger>
              <SelectContent>
                {units.map((unit) => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Topic</Label>
            <Select value={selectedTopic} onValueChange={handleTopicChange} disabled={!selectedUnit} required>
              <SelectTrigger><SelectValue placeholder="Select Topic" /></SelectTrigger>
              <SelectContent>
                {topics.map((topic) => <SelectItem key={topic} value={topic}>{topic}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>Lesson</Label>
            <Select value={selectedLesson} onValueChange={setSelectedLesson} disabled={!selectedTopic} required>
              <SelectTrigger><SelectValue placeholder="Select Lesson" /></SelectTrigger>
              <SelectContent>
                {lessons.map((lesson) => <SelectItem key={lesson} value={lesson}>{lesson}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button type="submit" disabled={isLoading} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            {isLoading ? 'Generating...' : 'Generate Lab'}
          </Button>
          <Button type="button" variant="outline" onClick={handleReset} className="w-full">
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </form>
    </AiToolLayout>
  );
}
