
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Sigma, Sparkles, Wand2, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { algebra2Curriculum } from '@/lib/algebra2-curriculum';
import { generateAlgebra2Lesson, type GenerateAlgebra2LessonOutput } from '@/ai/flows/generate-algebra2-lesson';
import { generateReadingMaterial } from '@/ai/flows/reading-material-generator';
import { generateTeacherCoach } from '@/ai/flows/teacher-coach-generator';
import { generateSlideshowOutline } from '@/ai/flows/slideshow-outline-generator';
import { generateQuestionCluster } from '@/ai/flows/question-cluster-generator';
import { generateStudySheet } from '@/ai/flows/study-sheet-generator';
import { generateWorksheet } from '@/ai/flows/worksheet-generator';
import GeneratingAnimation from '../common/GeneratingAnimation';
import StyledContentDisplay from '../common/StyledContentDisplay';
import { useAuth } from '@/context/AuthContext';
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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useRouter } from 'next/navigation';
import { LanguageSelectionDialog, type LanguageOption } from '../common/LanguageSelectionDialog';
import Link from 'next/link';

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
  type: ToolName | 'Lesson Plan';
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
                    The Algebra 2 Generator requires a Math curriculum subscription. Subscribe now to create powerful, standards-aligned 5E lesson plans.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button size="lg" asChild>
                    <Link href="/pricing">Subscribe to Math Tools</Link>
                </Button>
            </CardContent>
        </Card>
    </div>
);

const GeneratorContent = () => {
  const { toast } = useToast();
  const { addToHistory } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isToolLoading, setIsToolLoading] = useState<ToolName | null>(null);
  
  const [lessonPackage, setLessonPackage] = useState<GeneratedContent[] | null>(null);
  const [currentlySelectedLesson, setCurrentlySelectedLesson] = useState<string | null>(null);

  const [isToolsInfoDialogOpen, setIsToolsInfoDialogOpen] = useState(false);
  const [isHighlightingTools, setIsHighlightingTools] = useState(false);
  const [isLanguageDialogOpen, setIsLanguageDialogOpen] = useState(false);
  const [selectedTool, setSelectedTool] = useState<ToolName | null>(null);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { unit: '', topic: '', lesson: '', additionalInfo: '' },
  });
  
  const lessonPlan = useMemo(() => {
    return lessonPackage?.find(item => item.type === 'Lesson Plan')?.content as GenerateAlgebra2LessonOutput | null;
  }, [lessonPackage]);

  useEffect(() => {
    if (lessonPackage) {
      addToHistory(lessonPackage);
    }
  }, [lessonPackage, addToHistory]);

  const units = useMemo(() => Object.keys(algebra2Curriculum.units), []);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isHighlightingTools) {
      timeoutId = setTimeout(() => setIsHighlightingTools(false), 10000);
    }
    return () => clearTimeout(timeoutId);
  }, [isHighlightingTools]);

  const handleDialogClose = (open: boolean) => {
    setIsToolsInfoDialogOpen(open);
    if (!open) setIsHighlightingTools(true);
  }

  const handleClearSelection = () => {
    setCurrentlySelectedLesson(null);
    form.reset({ unit: '', topic: '', lesson: '', additionalInfo: form.getValues('additionalInfo') });
  }

  const handleLessonSelect = (unitKey: string, topicKey: string, lessonTitle: string) => {
    if (currentlySelectedLesson === lessonTitle) {
      handleClearSelection();
    } else {
      setCurrentlySelectedLesson(lessonTitle);
      form.setValue('unit', unitKey);
      form.setValue('topic', topicKey);
      form.setValue('lesson', lessonTitle);
      setLessonPackage(null);
    }
  };

  async function onLessonPlanSubmit(values: FormData) {
    if (!currentlySelectedLesson) {
      toast({
        title: 'No Lesson Selected',
        description: 'Please select a lesson from the list before generating.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setLessonPackage(null);

    try {
      const result = await generateAlgebra2Lesson(values);
      const newLessonPlan: GeneratedContent = {
        id: `lesson-plan-${Date.now()}`,
        title: result.lessonOverview.lesson,
        content: result,
        type: 'Lesson Plan',
      };

      const newPackage = [newLessonPlan];
      setLessonPackage(newPackage);

      setIsToolsInfoDialogOpen(true);
       form.reset({ unit: '', topic: '', lesson: '', additionalInfo: values.additionalInfo });
       setCurrentlySelectedLesson(null);

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

  const handleToolClick = (toolName: ToolName) => {
    if (!lessonPlan) {
        toast({ title: "No Lesson Plan", description: "Please generate a lesson plan first.", variant: "destructive" });
        return;
    }
    setSelectedTool(toolName);
    setIsLanguageDialogOpen(true);
  };
  
  const executeToolGeneration = async (language: LanguageOption) => {
    if (!lessonPlan || !lessonPackage || !selectedTool) return;

    if (lessonPackage.some(sec => sec.title.startsWith(selectedTool))) {
      toast({ title: "Already Generated", description: `A ${selectedTool} has already been generated.` });
      return;
    }

    setIsToolLoading(selectedTool);
    try {
      let result: any;
      let resultTitle = selectedTool;
      const input = { lessonPlanJson: JSON.stringify(lessonPlan), language };

      switch (selectedTool) {
        case 'Worksheet': result = await generateWorksheet(input); resultTitle = 'Student Worksheet'; break;
        case 'Reading Material': result = await generateReadingMaterial(input); resultTitle = result.title; break;
        case 'Teacher Coach': result = await generateTeacherCoach(input); resultTitle = `Teacher Coach: ${lessonPlan.lessonOverview.lesson}`; break;
        case 'Slideshow Outline': result = await generateSlideshowOutline(input); resultTitle = `Slideshow Outline: ${lessonPlan.lessonOverview.lesson}`; break;
        case 'Question Cluster': result = await generateQuestionCluster({ ...input, lessonTopic: lessonPlan.lessonOverview.topic, lessonObjective: lessonPlan.lessonOverview.objectives.join('; ') }); resultTitle = `Question Cluster: ${lessonPlan.lessonOverview.topic}`; break;
        case 'Study Sheet': result = await generateStudySheet(input); resultTitle = `Study Sheet: ${lessonPlan.lessonOverview.lesson}`; break;
      }

      const newContent: GeneratedContent = { id: `${selectedTool}-${Date.now()}`, title: resultTitle, content: result, type: selectedTool };
      setLessonPackage(prev => prev ? [...prev, newContent] : [newContent]);

    } catch (error) {
      console.error(`${selectedTool} generation failed:`, error);
      toast({ title: "Generation Failed", description: `An error occurred while generating the ${selectedTool}.`, variant: "destructive" });
    } finally {
      setIsToolLoading(null);
      setSelectedTool(null);
    }
  };

  return (
    <>
      <AlertDialog open={isToolsInfoDialogOpen} onOpenChange={handleDialogClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2"><Wand2 className="h-6 w-6 text-primary" />Lesson Plan Generated!</AlertDialogTitle>
            <AlertDialogDescription>Your lesson plan is ready. Use the AI tools on the right sidebar to create aligned materials.</AlertDialogDescription>
            <div className="text-sm text-muted-foreground pt-4 text-left">
              <span className="font-semibold text-foreground">Available Tools:</span>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li><strong>Worksheet:</strong> Creates a student-facing worksheet.</li>
                <li><strong>Reading Material:</strong> Generates a student-facing article.</li>
                <li><strong>Study Sheet:</strong> Creates a concise study guide.</li>
                <li><strong>Question Cluster:</strong> Builds NGSS-style assessment questions.</li>
                <li><strong>Slideshow Outline:</strong> Generates a presentation outline.</li>
                <li><strong>Teacher Coach:</strong> Provides pedagogical advice for the lesson.</li>
              </ul>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => handleDialogClose(false)}>Got it, thanks!</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <LanguageSelectionDialog 
        open={isLanguageDialogOpen}
        onOpenChange={setIsLanguageDialogOpen}
        onSelectLanguage={executeToolGeneration}
        toolName={selectedTool}
      />

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-12 relative">
            <div className="flex-grow">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onLessonPlanSubmit)}>
              <Card className="w-full shadow-lg mb-8">
                  <CardHeader>
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <Sigma className="h-6 w-6" />
                          </div>
                          <div>
                              <CardTitle className="text-2xl font-headline">Illustrative Math - Algebra 2 Lesson Generator</CardTitle>
                              <CardDescription>Create 5E model lesson plans aligned with the Illustrative Math curriculum.</CardDescription>
                          </div>
                        </div>
                      </div>
                  </CardHeader>
                      <CardContent className="space-y-6">
                        <Accordion type="single" collapsible className="w-full" defaultValue='item-1'>
                            {units.map((unitKey) => {
                                const unit = algebra2Curriculum.units[unitKey as keyof typeof algebra2Curriculum.units];
                                if (!unit) return null;
                                return (
                                <AccordionItem value={unitKey} key={unitKey}>
                                    <AccordionTrigger>{unit.unit}</AccordionTrigger>
                                    <AccordionContent>
                                        <Accordion type="single" collapsible className="w-full pl-4">
                                            {Object.keys(unit.topics).map(topicKey => {
                                                const topic = unit.topics[topicKey as keyof typeof unit.topics];
                                                if(!topic) return null;
                                                return (
                                                    <AccordionItem value={topicKey} key={topicKey}>
                                                        <AccordionTrigger>{topic.topic}</AccordionTrigger>
                                                        <AccordionContent>
                                                          <div className="space-y-2 pl-4">
                                                              {topic.lessons.map((lesson, index) => {
                                                                  const isSelected = currentlySelectedLesson === lesson.title;
                                                                  return (
                                                                      <div key={index} className="flex items-center justify-between">
                                                                          <div className="flex-1">
                                                                              <p className="font-semibold">{lesson.title}</p>
                                                                              <p className="text-sm text-muted-foreground">{lesson.objective}</p>
                                                                          </div>
                                                                          <Button 
                                                                            type="button"
                                                                            variant={isSelected ? "secondary" : "outline"}
                                                                            size="sm"
                                                                            onClick={() => handleLessonSelect(unit.unit, topic.topic, lesson.title)}
                                                                            disabled={isSelected && !!lessonPackage}
                                                                            >
                                                                                {isSelected ? (
                                                                                    <>
                                                                                        <Check className="h-4 w-4 mr-2" />
                                                                                        Selected
                                                                                    </>
                                                                                ) : 'Select'}
                                                                            </Button>
                                                                      </div>
                                                                  );
                                                              })}
                                                          </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                )
                                            })}
                                        </Accordion>
                                    </AccordionContent>
                                </AccordionItem>
                                )
                            })}
                        </Accordion>

                          <FormField
                              control={form.control}
                              name="additionalInfo"
                              render={({ field }) => (
                                  <FormItem>
                                  <FormLabel>Additional Information (Optional)</FormLabel>
                                  <FormControl>
                                      <Textarea placeholder="e.g., 'Focus on graphing calculator skills', 'Connect to real-world financial models', 'Emphasize proofs and identities'" {...field} />
                                  </FormControl>
                                  <FormMessage />
                                  </FormItem>
                              )}
                          />
                      </CardContent>
              </Card>
               {currentlySelectedLesson && (
                <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-float-up">
                    <div className="flex items-center gap-4 p-4 rounded-lg shadow-2xl bg-background border">
                         <div className="flex-grow">
                             <h4 className="font-semibold">Lesson Selected!</h4>
                             <p className="text-sm text-muted-foreground truncate max-w-xs">{currentlySelectedLesson}</p>
                         </div>
                         <Button type="submit" size="lg" disabled={isLoading} className="bg-green-500 hover:bg-green-600 text-white">
                             {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Wand2 className="mr-2 h-5 w-5" />}
                             {isLoading ? 'Generating...' : 'Generate Lesson'}
                         </Button>
                         <Button type="button" variant="ghost" size="icon" onClick={handleClearSelection} disabled={isLoading}>
                             <X className="h-5 w-5"/>
                         </Button>
                    </div>
                </div>
              )}
              </form>
            </Form>
              
              {isLoading && !lessonPackage && (
                  <div className="mt-8">
                      <GeneratingAnimation />
                  </div>
              )}

              {lessonPackage?.map(item => (
                <CollapsibleSection 
                    key={item.id} 
                    title={item.title} 
                    contentItem={item}
                >
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

export default function Algebra2Generator() {
    const { hasMathSubscription } = useAuth();

    return hasMathSubscription ? <GeneratorContent /> : <SubscriptionPrompt />;
}
