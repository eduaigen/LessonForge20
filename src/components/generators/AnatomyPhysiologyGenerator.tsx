
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Stethoscope, Sparkles, Wand2, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { anatomyPhysiologyCurriculum } from '@/lib/anatomy-physiology-curriculum';
import { generateAnatomyPhysiologyLesson, type GenerateAnatomyPhysiologyLessonOutput } from '@/ai/flows/generate-anatomy-physiology-lesson';
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
import { createCheckoutSession } from '@/actions/stripe';
import { useRouter } from 'next/navigation';

const formSchema = z.object({
  quarter: z.string().min(1, { message: 'Please select a quarter.' }),
  unit: z.string().min(1, { message: 'Please select a unit.' }),
  week: z.string().min(1, { message: 'Please select a week.' }),
  lesson: z.string().min(1, { message: 'Please select a lesson.' }),
  additionalInfo: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export type GeneratedContent = {
  id: string;
  title: string;
  content: any;
  type: ToolName | 'Lesson Plan' | 'Comprehension Questions';
  sourceId?: string;
};

const SubscriptionPrompt = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async () => {
    setIsLoading(true);
    toast({
      title: 'Redirecting to checkout...',
      description: 'Please wait while we prepare your secure checkout page.',
    });
    
    const { url, error } = await createCheckoutSession();

    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    if (url) {
      router.push(url);
    }
  };

  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <Card className="max-w-2xl text-center p-8 shadow-lg">
          <CardHeader>
               <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Sparkles className="h-8 w-8" />
              </div>
              <CardTitle className="font-headline text-3xl font-bold">Unlock This Premium Tool</CardTitle>
              <CardDescription className="text-lg text-muted-foreground pt-2">
                  The Anatomy & Physiology Generator requires a subscription to access. Subscribe now to create powerful, standards-aligned 5E lesson plans and supporting materials.
              </CardDescription>
          </CardHeader>
          <CardContent>
              <Button size="lg" onClick={handleSubscribe} disabled={isLoading}>
                  {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Subscribe to All-Access'}
              </Button>
          </CardContent>
      </Card>
    </div>
  );
};


const GeneratorContent = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isToolLoading, setIsToolLoading] = useState<string | null>(null);
  
  const [lessonPackage, setLessonPackage] = useState<GeneratedContent[] | null>(null);
  const [currentlySelectedLesson, setCurrentlySelectedLesson] = useState<string | null>(null);

  const [isToolsInfoDialogOpen, setIsToolsInfoDialogOpen] = useState(false);
  const [isHighlightingTools, setIsHighlightingTools] = useState(false);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      quarter: '',
      unit: '',
      week: '',
      lesson: '',
      additionalInfo: '',
    },
  });
  
  const lessonPlan = useMemo(() => {
    return lessonPackage?.find(item => item.type === 'Lesson Plan')?.content as GenerateAnatomyPhysiologyLessonOutput | null;
  }, [lessonPackage]);

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
  
  const handleClearSelection = () => {
    setCurrentlySelectedLesson(null);
    form.reset({ quarter: '', unit: '', week: '', lesson: '', additionalInfo: form.getValues('additionalInfo') });
  }

  const handleLessonSelect = (quarterKey: string, unitKey: string, weekKey: string, lessonTitle: string) => {
    if (currentlySelectedLesson === lessonTitle) {
      handleClearSelection();
    } else {
      setCurrentlySelectedLesson(lessonTitle);
      form.setValue('quarter', quarterKey);
      form.setValue('unit', unitKey);
      form.setValue('week', weekKey);
      form.setValue('lesson', lessonTitle);
      setLessonPackage(null); // Clear previous generations
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
      const result = await generateAnatomyPhysiologyLesson(values);
      
      const newLessonPlan: GeneratedContent = {
        id: `lesson-plan-${Date.now()}`,
        title: result.lessonOverview.lesson,
        content: result,
        type: 'Lesson Plan',
      };

      setLessonPackage([newLessonPlan]);
      setIsToolsInfoDialogOpen(true);
      form.reset({ quarter: '', unit: '', week: '', lesson: '', additionalInfo: values.additionalInfo });
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
    if (lessonPackage.some(sec => sec.title.startsWith(title))) {
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
            resultTitle = `Teacher Coach: ${lessonPlan.lessonOverview.lesson}`;
        } else if (toolName === 'Slideshow Outline') {
            result = await generateSlideshowOutline(lessonPlan);
            resultTitle = `Slideshow Outline: ${lessonPlan.lessonOverview.lesson}`;
        } else if (toolName === 'Question Cluster') {
            result = await generateQuestionCluster({
                lessonTopic: lessonPlan.lessonOverview.topic,
                lessonObjective: lessonPlan.lessonOverview.objectives.join('; ')
            });
            resultTitle = `Question Cluster: ${lessonPlan.lessonOverview.topic}`;
        } else if (toolName === 'Study Sheet') {
            result = await generateStudySheet(lessonPlan);
            resultTitle = `Study Sheet: ${lessonPlan.lessonOverview.lesson}`;
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

  const quarters = useMemo(() => Object.keys(anatomyPhysiologyCurriculum.quarters), []);

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
            <div className="text-sm text-muted-foreground pt-4 text-left">
              <span className="font-semibold text-foreground">Here are the available tools:</span>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li><strong>Worksheet:</strong> Creates a student-facing worksheet.</li>
                  <li><strong>Reading Material:</strong> Generates a student-facing article.</li>
                  <li><strong>Study Sheet:</strong> Creates a concise study guide.</li>
                  <li><strong>Question Cluster:</strong> Builds a set of NGSS-style assessment questions.</li>
                  <li><strong>Slideshow Outline:</strong> Generates a presentation outline.</li>
                  <li><strong>Teacher Coach:</strong> Provides pedagogical advice for the lesson.</li>
              </ul>
            </div>
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onLessonPlanSubmit)}>
              <Card className="w-full shadow-lg mb-8">
                  <CardHeader>
                      <div className="flex items-center justify-between flex-wrap gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                              <Stethoscope className="h-6 w-6" />
                          </div>
                          <div>
                              <CardTitle className="text-2xl font-headline">Anatomy & Physiology Lesson Generator</CardTitle>
                              <CardDescription>Create 5E model lesson plans for Anatomy & Physiology.</CardDescription>
                          </div>
                        </div>
                      </div>
                  </CardHeader>
                      <CardContent className="space-y-6">
                        <Accordion type="single" collapsible className="w-full" defaultValue='item-1'>
                            {quarters.map((quarterKey) => {
                                const quarter = anatomyPhysiologyCurriculum.quarters[quarterKey as keyof typeof anatomyPhysiologyCurriculum.quarters];
                                if (!quarter) return null;
                                return (
                                <AccordionItem value={quarterKey} key={quarterKey}>
                                    <AccordionTrigger>{quarterKey}</AccordionTrigger>
                                    <AccordionContent>
                                        <Accordion type="single" collapsible className="w-full pl-4">
                                            {Object.keys(quarter.units).map(unitKey => {
                                                const unit = quarter.units[unitKey as keyof typeof quarter.units];
                                                if(!unit) return null;
                                                return (
                                                    <AccordionItem value={unitKey} key={unitKey}>
                                                        <AccordionTrigger>{unitKey}</AccordionTrigger>
                                                        <AccordionContent>
                                                          <Accordion type="single" collapsible className="w-full pl-4">
                                                            {Object.keys(unit.weeks).map(weekKey => {
                                                                const week = unit.weeks[weekKey as keyof typeof unit.weeks];
                                                                if(!week) return null;
                                                                return (
                                                                    <AccordionItem value={weekKey} key={weekKey}>
                                                                        <AccordionTrigger>{weekKey}</AccordionTrigger>
                                                                        <AccordionContent>
                                                                            <div className="space-y-2 pl-4">
                                                                                {week.lessons.map((lesson, index) => {
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
                                                                                            onClick={() => handleLessonSelect(quarterKey, unitKey, weekKey, lesson.title)}
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
                                      <Textarea placeholder="e.g., 'Focus on clinical connections', 'Include more diagrams', 'Simplify the language for ELL students'" {...field} />
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
                    <p className="text-muted-foreground">Select a quarter, unit, week, and lesson to create your first AI-powered lesson plan.</p>
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

export default function AnatomyPhysiologyGenerator() {
    const { hasScienceSubscription } = useAuth();

    return hasScienceSubscription ? <GeneratorContent /> : <SubscriptionPrompt />;
}
