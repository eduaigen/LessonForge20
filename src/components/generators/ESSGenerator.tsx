
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sparkles, Wand2, Printer, Orbit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { earthScienceCurriculum } from '@/lib/earth-science-curriculum';
import { generateESSLesson, type GenerateESSLessonOutput } from '@/ai/flows/generate-ess-lesson';
import { generateReadingMaterial } from '@/ai/flows/reading-material-generator';
import { generateTeacherCoach } from '@/ai/flows/teacher-coach-generator';
import { generateSlideshowOutline } from '@/ai/flows/slideshow-outline-generator';
import { generateQuestionCluster } from '@/ai/flows/question-cluster-generator';
import { generateStudySheet } from '@/ai/flows/study-sheet-generator';
import { generateWorksheet } from '@/ai/flows/worksheet-generator';
import GeneratingAnimation from '../common/GeneratingAnimation';
import StyledContentDisplay from '../common/StyledContentDisplay';
import { useAuth } from '@/context/AuthContext';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { ScrollArea } from '../ui/scroll-area';
import CollapsibleSection from '../common/CollapsibleSection';
import RightSidebar, { type ToolName } from '../common/RightSidebar';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const formSchema = z.object({
  unit: z.string().min(1, { message: 'Please select a unit.' }),
  topic: z.string().min(1, { message: 'Please select a topic.' }),
  lesson: z.string().min(1, { message: 'Please select a lesson.' }),
  additionalInfo: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export type GeneratedContent = {
  id: string;
  title: string;
  content: any;
  type: ToolName | 'Lesson Plan' | 'Comprehension Questions';
};

const SubscriptionPrompt = () => (
    <div className="flex flex-1 items-center justify-center">
        <Card className="max-w-2xl text-center p-8 shadow-lg">
            <CardHeader>
                 <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sparkles className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline text-3xl font-bold">Unlock This Premium Tool</CardTitle>
                <CardDescription>
                    The NGSS Earth & Space Science Generator requires a Science curriculum subscription. Subscribe now to create powerful, standards-aligned 5E lesson plans.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button size="lg" asChild>
                    <Link href="/pricing">Subscribe to Science Tools</Link>
                </Button>
            </CardContent>
        </Card>
    </div>
);


const GeneratorContent = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isToolLoading, setIsToolLoading] = useState<string | null>(null);
  
  const [lessonPackage, setLessonPackage] = useState<GeneratedContent[] | null>(null);

  const [isToolsInfoDialogOpen, setIsToolsInfoDialogOpen] = useState(false);
  const [isHighlightingTools, setIsHighlightingTools] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      unit: '',
      topic: '',
      lesson: '',
      additionalInfo: '',
    },
  });
  
  const lessonPlan = useMemo(() => {
    return lessonPackage?.find(item => item.type === 'Lesson Plan')?.content as GenerateESSLessonOutput | null;
  }, [lessonPackage]);


  const selectedUnit = form.watch('unit');
  const selectedTopic = form.watch('topic');

  const units = useMemo(() => Object.keys(earthScienceCurriculum.units), []);
  const topics = useMemo(() => {
    if (!selectedUnit) return [];
    const unitData = earthScienceCurriculum.units[selectedUnit as keyof typeof earthScienceCurriculum.units];
    return unitData ? Object.keys(unitData.topics) : [];
  }, [selectedUnit]);

  const lessons = useMemo(() => {
    if (!selectedUnit || !selectedTopic) return [];
    const unitData = earthScienceCurriculum.units[selectedUnit as keyof typeof earthScienceCurriculum.units];
    if (!unitData) return [];
    const topicData = unitData.topics[selectedTopic as keyof typeof unitData.topics];
    return topicData ? topicData.lessons.map(l => ({ title: l, objective: '' })) : [];
  }, [selectedUnit, selectedTopic]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isHighlightingTools) {
      timeoutId = setTimeout(() => {
        setIsHighlightingTools(false);
      }, 10000); // Highlight for 10 seconds
    }
    return () => clearTimeout(timeoutId);
  }, [isHighlightingTools]);

  const handleDialogClose = (open: boolean) => {
    setIsToolsInfoDialogOpen(open);
    if (!open) {
        setIsHighlightingTools(true);
    }
  }

  const handlePrintAll = () => {
    if (!lessonPackage || lessonPackage.length === 0) return;

    let combinedHtml = '';
    lessonPackage.forEach(item => {
        const contentElement = document.getElementById(`content-${item.id}`);
        if (contentElement) {
            combinedHtml += `
                <div style="page-break-before: always; padding-top: 2rem;">
                  <h2 style="font-family: sans-serif; color: #333; text-align: center; border-bottom: 1px solid #ccc; padding-bottom: 1rem; margin-bottom: 1rem;">${item.title}</h2>
                  ${contentElement.innerHTML}
                </div>
            `;
        }
    });

    const printWindow = window.open('', '', 'height=800,width=1000');
    if (printWindow) {
        printWindow.document.write('<html><head><title>EduAiGen - Complete Lesson Package</title>');
        const styles = Array.from(document.styleSheets)
            .map(styleSheet => {
                try {
                    if (styleSheet.href) return `<link rel="stylesheet" href="${styleSheet.href}">`;
                    return `<style>${Array.from(styleSheet.cssRules).map(rule => rule.cssText).join('')}</style>`;
                } catch (e) {
                    if (styleSheet.href) return `<link rel="stylesheet" href="${styleSheet.href}">`;
                    return '';
                }
            }).join('\n');
        
        printWindow.document.write(styles);
        printWindow.document.write(`
            <style>
                @page { size: auto; margin: 2rem; }
                body { -webkit-print-color-adjust: exact; padding: 2rem; }
                .document-view h2, .document-view h3, .document-view h4 { color: #333 !important; }
            </style>
        `);
        printWindow.document.write('</head><body>');
        printWindow.document.write(combinedHtml);
        printWindow.document.write('</body></html>');
        printWindow.document.close();
        setTimeout(() => {
            printWindow.print();
            printWindow.close();
        }, 250);
    }
  };

  async function onLessonPlanSubmit(values: FormData) {
    setIsLoading(true);
    setLessonPackage(null);

    try {
      const result = await generateESSLesson(values);
      
      const newLessonPlan: GeneratedContent = {
        id: `lesson-plan-${Date.now()}`,
        title: result.lessonOverview.lesson,
        content: result,
        type: 'Lesson Plan',
      };

      setLessonPackage([newLessonPlan]);
      setIsToolsInfoDialogOpen(true);

    } catch (error) {
      console.error('Lesson generation failed:', error);
      toast({
        title: 'Generation Failed',
        description: 'An error occurred while generating the lesson. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleToolClick = async (toolName: ToolName) => {
    if (!lessonPlan || !lessonPackage) {
        toast({
            title: "No Lesson Plan",
            description: "Please generate a lesson plan first before using AI tools.",
            variant: "destructive"
        });
        return;
    }

    const title = toolName;
    if (lessonPackage.some(sec => sec.title === title)) {
        toast({ title: "Already Generated", description: `A ${title} has already been generated for this lesson plan.` });
        return;
    }

    setIsToolLoading(title);

    try {
        let result: any;
        let contentType: GeneratedContent['type'] = toolName;
        let newContent: GeneratedContent | null = null;
        let resultTitle = title;

        if (toolName === 'Worksheet') {
            result = await generateWorksheet({ lessonPlanJson: JSON.stringify(lessonPlan) });
            resultTitle = 'Student Worksheet';
        } else if (toolName === 'Reading Material') {
            result = await generateReadingMaterial(lessonPlan);
            resultTitle = result.title;
        } else if (toolName === 'Teacher Coach') {
            result = await generateTeacherCoach({ lessonPlanJson: JSON.stringify(lessonPlan) });
        } else if (toolName === 'Slideshow Outline') {
            result = await generateSlideshowOutline(lessonPlan);
        } else if (toolName === 'Question Cluster') {
            result = await generateQuestionCluster({
                lessonTopic: lessonPlan.lessonOverview.topic,
                lessonObjective: lessonPlan.lessonOverview.objectives.join('; ')
            });
        } else if (toolName === 'Study Sheet') {
            result = await generateStudySheet(lessonPlan);
        }

        newContent = { id: `${toolName}-${Date.now()}`, title: resultTitle, content: result, type: contentType };

        if (newContent) {
           setLessonPackage(prev => {
                if (!prev) return null;
                return [...prev, newContent!];
           });
        }

    } catch (error) {
        console.error(`${toolName} generation failed:`, error);
        toast({ title: "Generation Failed", description: `An error occurred while generating the ${toolName}.`, variant: "destructive" });
    } finally {
        setIsToolLoading(null);
    }
  };

  return (
    <>
      <AlertDialog open={isToolsInfoDialogOpen} onOpenChange={handleDialogClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <Wand2 className="h-6 w-6 text-primary" />
              Lesson Plan Generated! What's Next?
            </AlertDialogTitle>
            <AlertDialogDescription>
               Your lesson plan is ready. Now you can use our AI tools to instantly create aligned materials. The tools are available on the right-hand sidebar.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => handleDialogClose(false)}>
              Got it, thanks!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-12 relative">
            <div className="flex-grow">
              <Card className="w-full shadow-lg mb-8">
                  <CardHeader>
                      <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Orbit className="h-6 w-6" />
                      </div>
                      <div>
                          <CardTitle className="text-2xl font-headline">NGSS Earth & Space Science Lesson Generator</CardTitle>
                          <CardDescription>Create 5E model lesson plans aligned with the NGSS for Earth & Space Science.</CardDescription>
                      </div>
                      </div>
                  </CardHeader>
                  <Form {...form}>
                      <form onSubmit={form.handleSubmit(onLessonPlanSubmit)}>
                      <CardContent className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <FormField
                              control={form.control}
                              name="unit"
                              render={({ field }) => (
                                  <FormItem>
                                  <FormLabel>Unit</FormLabel>
                                  <Select onValueChange={(value) => {
                                      field.onChange(value);
                                      form.setValue('topic', '');
                                      form.setValue('lesson', '');
                                  }} defaultValue={field.value}>
                                      <FormControl>
                                      <SelectTrigger>
                                          <SelectValue placeholder="Select a unit" />
                                      </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                      {units.map((unit) => (
                                          <SelectItem key={unit} value={unit}>{unit}</SelectItem>
                                      ))}
                                      </SelectContent>
                                  </Select>
                                  <FormMessage />
                                  </FormItem>
                              )}
                              />
                              <FormField
                              control={form.control}
                              name="topic"
                              render={({ field }) => (
                                  <FormItem>
                                  <FormLabel>Topic</FormLabel>
                                  <Select onValueChange={(value) => {
                                      field.onChange(value);
                                      form.setValue('lesson', '');
                                  }} value={field.value} disabled={!selectedUnit}>
                                      <FormControl>
                                      <SelectTrigger>
                                          <SelectValue placeholder="Select a topic" />
                                      </SelectTrigger>
                                      </FormControl>
                                      <SelectContent>
                                      {topics.map((topic) => (
                                          <SelectItem key={topic} value={topic}>{topic}</SelectItem>
                                      ))}
                                      </SelectContent>
                                  </Select>
                                  <FormMessage />
                                  </FormItem>
                              )}
                              />
                          </div>

                          {lessons && lessons.length > 0 && (
                              <FormField
                                  control={form.control}
                                  name="lesson"
                                  render={({ field }) => (
                                      <FormItem className="space-y-3">
                                      <FormLabel>Lesson Objective</FormLabel>
                                      <FormControl>
                                          <ScrollArea className="h-72 w-full rounded-md border p-4">
                                              <RadioGroup
                                                  onValueChange={field.onChange}
                                                  defaultValue={field.value}
                                                  className="flex flex-col space-y-1"
                                              >
                                                  {lessons.map((lesson, index) => (
                                                  <FormItem key={index} className="flex items-start space-x-3 space-y-0 rounded-md hover:bg-muted/50 p-2 transition-colors">
                                                      <FormControl>
                                                          <RadioGroupItem value={lesson.title} />
                                                      </FormControl>
                                                      <FormLabel className="font-normal w-full cursor-pointer">
                                                          <p className="font-semibold">{lesson.title}</p>
                                                      </FormLabel>
                                                  </FormItem>
                                                  ))}
                                              </RadioGroup>
                                          </ScrollArea>
                                      </FormControl>
                                      <FormMessage />
                                      </FormItem>
                                  )}
                              />
                          )}
                          
                          <FormField
                              control={form.control}
                              name="additionalInfo"
                              render={({ field }) => (
                                  <FormItem>
                                  <FormLabel>Additional Information (Optional)</FormLabel>
                                  <FormControl>
                                      <Textarea placeholder="e.g., 'Focus on hands-on modeling', 'Connect to local geological features', 'Emphasize climate change impacts'" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                  </FormItem>
                              )}
                          />
                      </CardContent>
                      <CardFooter>
                          <Button type="submit" disabled={isLoading} className="w-full">
                          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                          {isLoading ? 'Generating Lesson...' : 'Generate New Lesson'}
                          </Button>
                      </CardFooter>
                      </form>
                  </Form>
              </Card>
              
              {isLoading && !lessonPackage && (
                  <div className="mt-8">
                      <GeneratingAnimation />
                  </div>
              )}
              
              {lessonPackage && lessonPackage.length > 1 && (
                <div className="flex justify-end mt-4">
                  <Button onClick={handlePrintAll}>
                    <Printer className="mr-2 h-4 w-4" />
                    Print All
                  </Button>
                </div>
              )}

              {lessonPackage?.map(item => (
                <CollapsibleSection key={item.id} title={item.title} contentItem={item}>
                    <StyledContentDisplay
                        content={item.content}
                        type={item.type}
                    />
                </CollapsibleSection>
              ))}

              {!lessonPackage && !isLoading && (
                <div className="text-center py-16">
                    <h2 className="text-2xl font-bold font-headline mb-4">Ready to Generate?</h2>
                    <p className="text-muted-foreground">Select a unit, topic, and lesson to create your first AI-powered lesson plan.</p>
                </div>
              )}
             
              {isToolLoading && (
                  <CollapsibleSection title={`Generating ${isToolLoading}...`} contentItem={{id: 'loading', title: `Generating ${isToolLoading}...`, content: '', type: 'Worksheet'}}>
                      <GeneratingAnimation />
                  </CollapsibleSection>
              )}

            </div>

            {lessonPlan && <RightSidebar onToolClick={handleToolClick} isGenerating={!!isToolLoading} isHighlighting={isHighlightingTools} />}
        </div>
      </div>
    </>
  );
}

export default function ESSGenerator() {
    const { hasScienceSubscription } = useAuth();

    return hasScienceSubscription ? <GeneratorContent /> : <SubscriptionPrompt />;
}
