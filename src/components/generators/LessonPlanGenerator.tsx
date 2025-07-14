
'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
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
import { ScrollArea } from '@/components/ui/scroll-area';
// import {
//   generateLessonPlan,
//   type GenerateLessonPlanInput,
// } from '@/ai/flows/generate-lesson-plan';
import { curriculumData } from '@/lib/curriculum-data';
import AiToolLayout from './AiToolLayout';
import {
  BookCopy,
  PlusCircle,
  RefreshCw,
  Printer,
} from 'lucide-react';
import { Label } from '../ui/label';
import StyledContentDisplay from '../common/StyledContentDisplay';
import GeneratingAnimation from '../common/GeneratingAnimation';
import AiTeacherTools from './AiTeacherTools';

// Helper to dynamically load curriculum data
const getCurriculumForSubject = async (subject: string) => {
    try {
        switch (subject) {
            case 'AP Biology':
                return (await import('@/lib/ap-biology-curriculum')).apBiologyCurriculum;
            case 'NV Biology':
                return (await import('@/lib/nv-biology-curriculum')).nvBiologyCurriculum;
            case 'NGSS Biology (OpenSciEd)':
                return (await import('@/lib/ngss-biology-curriculum')).ngssBiologyCurriculum;
            case 'Chemistry (OpenSciEd)':
                return (await import('@/lib/chemistry-curriculum')).chemistryCurriculum;
            case 'NV Earth Science':
                return (await import('@/lib/earth-science-curriculum')).earthScienceCurriculum;
            case 'Physics (OpenSciEd)':
                return (await import('@/lib/physics-curriculum')).physicsCurriculum;
            case 'Health':
                return (await import('@/lib/health-curriculum')).healthCurriculum;
            case 'Global History I (Grade 9)':
                 return (await import('@/lib/global-history-1-curriculum')).globalHistory1Curriculum;
            case 'Global History II (Grade 10)':
                 return (await import('@/lib/global-history-2-curriculum')).globalHistory2Curriculum;
            case 'US History & Government':
                 return (await import('@/lib/us-history-curriculum')).usHistoryCurriculum;
            case 'Government & Economics':
                 return (await import('@/lib/government-economics-curriculum')).governmentEconomicsCurriculum;
            case 'Illustrative Math Algebra 1':
            case 'Illustrative Math Algebra 2':
            case 'Illustrative Math Geometry':
                 return (await import('@/lib/math-curriculum')).mathCurriculum;
            case 'ELA 9th Grade':
                return (await import('@/lib/ela9-curriculum')).ela9Curriculum;
            case 'ELA 10th Grade':
                return (await import('@/lib/ela10-curriculum')).ela10Curriculum;
            case 'ELA 11th Grade':
                return (await import('@/lib/ela11-curriculum')).ela11Curriculum;
            case 'ELA 12th Grade':
                return (await import('@/lib/ela12-curriculum')).ela12Curriculum;
            default:
                return null;
        }
    } catch (e) {
        console.error(`Failed to load curriculum for ${subject}:`, e);
        return null;
    }
};


export default function LessonPlanGenerator() {
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  
  const pageTitle = useMemo(() => {
    const subject = searchParams.get('subject');
    return subject ? `${subject} Lesson Plan Generator` : 'Lesson Plan Generator';
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
  const [currentCurriculum, setCurrentCurriculum] = useState<any>(null);
  
  // Pre-fill subject from URL search params
  useEffect(() => {
    setSelectedSubject(subjectFromUrl);
  }, [subjectFromUrl]);
  
  // Load curriculum when subject changes
  useEffect(() => {
    const loadCurriculum = async () => {
        if (selectedSubject) {
            setIsLoading(true);
            const data = await getCurriculumForSubject(selectedSubject);
            setCurrentCurriculum(data);
            setSelectedUnit('');
            setSelectedTopic('');
            setSelectedLesson('');
            setIsLoading(false);
        } else {
            setCurrentCurriculum(null);
        }
    };
    loadCurriculum();
  }, [selectedSubject]);

  // Memoize dropdown options to prevent re-renders
  const units = useMemo(() => {
    if (!currentCurriculum) return [];
    return Object.keys(currentCurriculum.units || {});
  }, [currentCurriculum]);

  const topics = useMemo(() => {
    if (!currentCurriculum || !selectedUnit) return [];
    return Object.keys(currentCurriculum.units?.[selectedUnit]?.topics || {});
  }, [currentCurriculum, selectedUnit]);

  const lessons = useMemo(() => {
    if (!currentCurriculum || !selectedUnit || !selectedTopic) return [];
    return currentCurriculum.units?.[selectedUnit]?.topics?.[selectedTopic]?.lessons || [];
  }, [currentCurriculum, selectedUnit, selectedTopic]);

  // Reset dependent dropdowns when a parent dropdown changes
  const handleSubjectChange = (value: string) => {
    setSelectedSubject(value);
    setSelectedUnit('');
    setSelectedTopic('');
    setSelectedLesson('');
  };

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
    if (!selectedSubject || !selectedUnit || !selectedTopic || !selectedLesson) {
      toast({
        title: 'Missing Information',
        description:
          'Please select a subject, unit, topic, and lesson.',
        variant: 'destructive',
      });
      return;
    }
    // setIsLoading(true);
    // setGeneratedContent(null);

    // const input: GenerateLessonPlanInput = {
    //   subject: selectedSubject,
    //   unit: selectedUnit,
    //   topic: selectedTopic,
    //   lessonTitle: selectedLesson,
    //   customPrompt,
    //   language: 'en',
    // };

    // try {
    //   const result = await generateLessonPlan(input);
    //   setGeneratedContent(result);
    // } catch (error) {
    //   console.error('Error generating lesson plan:', error);
    //   toast({
    //     title: 'Generation Failed',
    //     description:
    //       'An error occurred while generating the lesson plan. Please try again.',
    //     variant: 'destructive',
    //   });
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const handleReset = () => {
    setSelectedSubject(subjectFromUrl);
    setSelectedUnit('');
    setSelectedTopic('');
    setSelectedLesson('');
    setCustomPrompt('');
    setGeneratedContent(null);
  };
  
  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=800,width=800');
    if (printWindow) {
        const contentElement = document.getElementById('printable-content');
        if (contentElement) {
            printWindow.document.write('<html><head><title>Print Lesson Plan</title>');
            // Include styles if needed, especially for the prose classes
            printWindow.document.write('<style>body { font-family: sans-serif; } .prose { max-w: 100%; } .document-view { background-color: white; padding: 1rem; } h3 { font-size: 1.25rem; font-weight: bold; margin-top: 1rem; margin-bottom: 0.5rem; border-bottom: 1px solid #ccc; padding-bottom: 0.25rem; } </style>');
            printWindow.document.write('</head><body>');
            printWindow.document.write(contentElement.innerHTML);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.document.print();
        }
    }
  };

  const ResultDisplay = () => (
    <Card className="h-full flex flex-col">
      <CardHeader className='flex-row items-center justify-between'>
        <div>
            <CardTitle>Generated Lesson Plan</CardTitle>
            <CardDescription>
            Review the AI-generated lesson plan below.
            </CardDescription>
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
    <div className="flex flex-col flex-1 gap-8">
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
                            onValueChange={handleSubjectChange}
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
                            onValueChange={handleUnitChange}
                            disabled={units.length === 0 || isLoading}
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
                            onValueChange={handleTopicChange}
                            disabled={topics.length === 0 || isLoading}
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
                            disabled={lessons.length === 0 || isLoading}
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
        
        {generatedContent && <AiTeacherTools lessonPlanContent={generatedContent} />}

    </div>
  );
}
