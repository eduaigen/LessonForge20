
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  generateLessonPlan,
  type GenerateLessonPlanInput,
} from '@/ai/flows/generate-lesson-plan';
import { curriculumData } from '@/lib/curriculum-data';
import AiToolLayout from './AiToolLayout';
import {
  BookCopy,
  PlusCircle,
  RefreshCw,
} from 'lucide-react';
import Markdown from 'react-markdown';
import { Label } from '../ui/label';

export default function LessonPlanGenerator() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);

  const pageTitle = useMemo(() => {
    return searchParams.get('title') || 'Lesson Plan Generator';
  }, [searchParams]);

  // Form State
  const subjectFromUrl = useMemo(() => {
    const subject = searchParams.get('subject');
    return subject && curriculumData.subjects.includes(subject) ? subject : '';
  }, [searchParams]);

  const [selectedSubject, setSelectedSubject] = useState<string>(subjectFromUrl);
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [selectedLesson, setSelectedLesson] = useState<string>('');
  const [customPrompt, setCustomPrompt] = useState('');

  // Curriculum structure states
  const [units, setUnits] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const [lessons, setLessons] = useState<string[]>([]);

  // Pre-fill subject from URL search params
  useEffect(() => {
    setSelectedSubject(subjectFromUrl);
  }, [subjectFromUrl]);

  // Reset and update dropdowns based on selections
  useEffect(() => {
    if (selectedSubject) {
      const subjectContent = curriculumData.content[selectedSubject];
      setUnits(subjectContent ? Object.keys(subjectContent.units) : []);
      setSelectedUnit('');
      setSelectedTopic('');
      setSelectedLesson('');
    } else {
      setUnits([]);
    }
  }, [selectedSubject]);

  useEffect(() => {
    if (selectedSubject && selectedUnit) {
      const unitContent =
        curriculumData.content[selectedSubject]?.units[selectedUnit];
      setTopics(unitContent ? Object.keys(unitContent.topics) : []);
      setSelectedTopic('');
      setSelectedLesson('');
    } else {
      setTopics([]);
    }
  }, [selectedSubject, selectedUnit]);

   useEffect(() => {
    if (selectedSubject && selectedUnit && selectedTopic) {
      const topicContent =
        curriculumData.content[selectedSubject]?.units[selectedUnit]?.topics[selectedTopic];
      setLessons(topicContent ? topicContent.lessons : []);
      setSelectedLesson('');
    } else {
      setLessons([]);
    }
  }, [selectedSubject, selectedUnit, selectedTopic]);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubject || !selectedUnit || !selectedTopic || !selectedLesson) {
      toast({
        title: 'Missing Information',
        description:
          'Please select a subject, unit, topic, and lesson.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setGeneratedContent(null);

    const input: GenerateLessonPlanInput = {
      subject: selectedSubject,
      gradeLevel: '9', // Defaulting grade, can be removed if not needed by AI
      unit: selectedUnit,
      topic: selectedTopic,
      lessonTitle: selectedLesson,
      customPrompt,
      language: 'en',
    };

    try {
      const result = await generateLessonPlan(input);
      setGeneratedContent(result.lessonPlan);
    } catch (error) {
      console.error('Error generating lesson plan:', error);
      toast({
        title: 'Generation Failed',
        description:
          'An error occurred while generating the lesson plan. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedSubject(subjectFromUrl);
    setSelectedUnit('');
    setSelectedTopic('');
    setSelectedLesson('');
    setCustomPrompt('');
    setGeneratedContent(null);
  };

  const ResultDisplay = () => (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>Generated Lesson Plan</CardTitle>
        <CardDescription>
          Review the AI-generated lesson plan below.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        {isLoading ? (
          <div className="space-y-4 p-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ) : generatedContent ? (
          <ScrollArea className="flex-1">
             <div className="prose prose-sm max-w-none dark:prose-invert p-4">
                <Markdown>{generatedContent}</Markdown>
             </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
            <BookCopy className="w-16 h-16 text-muted-foreground/50" />
            <p className="mt-4">
              Your generated lesson plan will appear here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <AiToolLayout
      title={pageTitle}
      description="Craft detailed, standards-aligned lesson plans in minutes."
      resultDisplay={<ResultDisplay />}
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
            <div>
                <Label>Subject</Label>
                <Select
                    value={selectedSubject}
                    onValueChange={setSelectedSubject}
                    required
                    disabled={!!subjectFromUrl}
                >
                    <SelectTrigger>
                    <SelectValue placeholder="Select Subject" />
                    </SelectTrigger>
                    <SelectContent>
                    {curriculumData.subjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                        {subject}
                        </SelectItem>
                    ))}
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label>Unit</Label>
                <Select
                    value={selectedUnit}
                    onValueChange={setSelectedUnit}
                    disabled={units.length === 0}
                    required
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Unit" />
                    </SelectTrigger>
                    <SelectContent>
                        {units.map((unit) => (
                        <SelectItem key={unit} value={unit}>
                            {unit}
                        </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
             <div>
                <Label>Topic</Label>
                <Select
                    value={selectedTopic}
                    onValueChange={setSelectedTopic}
                    disabled={topics.length === 0}
                    required
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Topic" />
                    </SelectTrigger>
                    <SelectContent>
                        {topics.map((topic) => (
                        <SelectItem key={topic} value={topic}>
                            {topic}
                        </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
             <div>
                <Label>Lesson</Label>
                <Select
                    value={selectedLesson}
                    onValueChange={setSelectedLesson}
                    disabled={lessons.length === 0}
                    required
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select Lesson" />
                    </SelectTrigger>
                    <SelectContent>
                        {lessons.map((lesson) => (
                        <SelectItem key={lesson} value={lesson}>
                            {lesson}
                        </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </div>
        
        <div className="space-y-4">
            <div>
                <Label htmlFor="extra-info">Extra Info (Optional)</Label>
                <Textarea
                id="extra-info"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g., Focus on group work, include a specific video, address common misconceptions about..."
                />
            </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2">
          <Button type="submit" disabled={isLoading} className="w-full">
            <PlusCircle className="mr-2 h-4 w-4" />
            {isLoading ? 'Generating...' : 'Generate Lesson Plan'}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={handleReset}
            className="w-full"
          >
            <RefreshCw className="mr-2 h-4 w-4" />
            Reset
          </Button>
        </div>
      </form>
    </AiToolLayout>
  );
}

    