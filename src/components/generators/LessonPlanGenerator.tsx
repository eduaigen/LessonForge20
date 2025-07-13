'use client';

import React, { useState, useEffect, useMemo } from 'react';
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
import { Input } from '@/components/ui/input';
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
  SpellCheck,
  Languages,
} from 'lucide-react';
import Markdown from 'react-markdown';

export default function LessonPlanGenerator() {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);

  // Form State
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedGrade, setSelectedGrade] = useState<string>('');
  const [selectedUnit, setSelectedUnit] = useState<string>('');
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [lessonTitle, setLessonTitle] = useState('');
  const [lessonAim, setLessonAim] = useState('');
  const [customPrompt, setCustomPrompt] = useState('');

  // Curriculum structure states
  const [units, setUnits] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);

  // Reset and update dropdowns based on selections
  useEffect(() => {
    if (selectedSubject && selectedGrade) {
      const gradeContent = curriculumData.content[selectedSubject]?.[selectedGrade];
      setUnits(gradeContent ? Object.keys(gradeContent.units) : []);
      setSelectedUnit('');
      setSelectedTopic('');
    } else {
      setUnits([]);
    }
  }, [selectedSubject, selectedGrade]);

  useEffect(() => {
    if (selectedSubject && selectedGrade && selectedUnit) {
      const unitContent =
        curriculumData.content[selectedSubject]?.[selectedGrade]?.units[
          selectedUnit
        ];
      setTopics(unitContent ? unitContent.topics : []);
      setSelectedTopic('');
    } else {
      setTopics([]);
    }
  }, [selectedSubject, selectedGrade, selectedUnit]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubject || !selectedGrade || !lessonTitle || !lessonAim) {
      toast({
        title: 'Missing Information',
        description:
          'Please select a subject, grade, and provide a lesson title and aim.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setGeneratedContent(null);

    const input: GenerateLessonPlanInput = {
      subject: selectedSubject,
      gradeLevel: selectedGrade,
      unit: selectedUnit,
      topic: selectedTopic,
      lessonTitle,
      lessonAim,
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
    setSelectedSubject('');
    setSelectedGrade('');
    setSelectedUnit('');
    setSelectedTopic('');
    setLessonTitle('');
    setLessonAim('');
    setCustomPrompt('');
    setGeneratedContent(null);
  };

  const ResultDisplay = () => (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Generated Lesson Plan</CardTitle>
        <CardDescription>
          Review the AI-generated lesson plan below.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>
        ) : generatedContent ? (
          <ScrollArea className="h-[calc(100vh-20rem)]">
             <div className="prose prose-sm max-w-none dark:prose-invert">
                <Markdown>{generatedContent}</Markdown>
             </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center h-[calc(100vh-20rem)] text-center">
            <BookCopy className="w-16 h-16 text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">
              Your generated lesson plan will appear here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <AiToolLayout
      title="Lesson Plan Generator"
      description="Craft detailed, standards-aligned lesson plans in minutes."
      resultDisplay={<ResultDisplay />}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Curriculum Focus</CardTitle>
            <CardDescription>
              Select the curriculum context for your lesson plan.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Select
                value={selectedSubject}
                onValueChange={setSelectedSubject}
                required
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
              <Select
                value={selectedGrade}
                onValueChange={setSelectedGrade}
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select Grade" />
                </SelectTrigger>
                <SelectContent>
                  {curriculumData.grades.map((grade) => (
                    <SelectItem key={grade} value={grade.toString()}>
                      {grade}th Grade
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Select
              value={selectedUnit}
              onValueChange={setSelectedUnit}
              disabled={units.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Unit (Optional)" />
              </SelectTrigger>
              <SelectContent>
                {units.map((unit) => (
                  <SelectItem key={unit} value={unit}>
                    {unit}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={selectedTopic}
              onValueChange={setSelectedTopic}
              disabled={topics.length === 0}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select Topic (Optional)" />
              </SelectTrigger>
              <SelectContent>
                {topics.map((topic) => (
                  <SelectItem key={topic} value={topic}>
                    {topic}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Lesson Details</CardTitle>
            <CardDescription>
              Provide the core details for this specific lesson.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              value={lessonTitle}
              onChange={(e) => setLessonTitle(e.target.value)}
              placeholder="Lesson Title"
              required
            />
            <Textarea
              value={lessonAim}
              onChange={(e) => setLessonAim(e.target.value)}
              placeholder="Lesson Aim / Essential Question"
              required
            />
            <Textarea
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
              placeholder="Additional Instructions (e.g., focus on group work, include a specific video)"
            />
          </CardContent>
        </Card>

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
