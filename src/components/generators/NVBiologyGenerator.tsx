
'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Leaf, Sparkles, Wand2, History, ChevronLeft, ChevronRight, Printer, Download } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { nvBiologyCurriculum } from '@/lib/nv-biology-curriculum';
import { generateNVBiologyLesson, type GenerateNVBiologyLessonOutput } from '@/ai/flows/generate-nv-biology-lesson';
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
import { refineLessonSection } from '@/ai/flows/lesson-section-refiner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';

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

type LessonPackage = {
    id: string;
    lessonPlan: GeneratedContent;
    supplementaryMaterials: GeneratedContent[];
};


const SubscriptionPrompt = () => (
    <div className="flex flex-1 items-center justify-center">
        <Card className="max-w-2xl text-center p-8 shadow-lg">
            <CardHeader>
                 <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sparkles className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline text-3xl font-bold">Unlock This Premium Tool</CardTitle>
                <CardDescription className="text-lg text-muted-foreground pt-2">
                    The NV Biology Generator requires a Science curriculum subscription. Subscribe now to create powerful, standards-aligned 5E lesson plans.
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
  
  const [history, setHistory] = useState<LessonPackage[]>([]);
  const [activePackageId, setActivePackageId] = useState<string | null>(null);

  const [isToolsInfoDialogOpen, setIsToolsInfoDialogOpen] = useState(false);
  const [isHighlightingTools, setIsHighlightingTools] = useState(false);

  const [isRevisionDialogOpen, setIsRevisionDialogOpen] = useState(false);
  const [aiRevisionPrompt, setAiRevisionPrompt] = useState('');
  const [revisingSectionKey, setRevisingSectionKey] = useState<string | null>(null);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      unit: '',
      topic: '',
      lesson: '',
      additionalInfo: '',
    },
  });

  // State for lesson plan editing
  const [selectedSections, setSelectedSections] = useState<string[]>([]);
  const [editingSections, setEditingSections] = useState<string[]>([]);
  const [sectionContent, setSectionContent] = useState<Record<string, any>>({});
  const [originalSectionContent, setOriginalSectionContent] = useState<Record<string, any>>({});
  
  const activePackage = useMemo(() => {
    return history.find(p => p.id === activePackageId);
  }, [history, activePackageId]);

  const lessonPlan = useMemo(() => {
    return activePackage?.lessonPlan.content as GenerateNVBiologyLessonOutput | null;
  }, [activePackage]);

  // When activePackage changes, reset editing state
  useEffect(() => {
    setSelectedSections([]);
    setEditingSections([]);
    setSectionContent(lessonPlan ? { ...lessonPlan } : {});
    setOriginalSectionContent(lessonPlan ? { ...lessonPlan } : {});
  }, [activePackageId, lessonPlan]);

  const selectedUnit = form.watch('unit');
  const selectedTopic = form.watch('topic');

  const units = useMemo(() => Object.keys(nvBiologyCurriculum.units), []);
  const topics = useMemo(() => {
    if (!selectedUnit) return [];
    const unitData = nvBiologyCurriculum.units[selectedUnit as keyof typeof nvBiologyCurriculum.units];
    return unitData ? Object.keys(unitData.topics) : [];
  }, [selectedUnit]);

  const lessons = useMemo(() => {
    if (!selectedUnit || !selectedTopic) return [];
    const unitData = nvBiologyCurriculum.units[selectedUnit as keyof typeof nvBiologyCurriculum.units];
    if (!unitData) return [];
    const topicData = unitData.topics[selectedTopic as keyof typeof unitData.topics];
    return topicData ? topicData.lessons : [];
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

  async function onLessonPlanSubmit(values: FormData) {
    setIsLoading(true);
    try {
      const result = await generateNVBiologyLesson(values);
      const newPackageId = `package-${Date.now()}`;
      const newPackage: LessonPackage = {
          id: newPackageId,
          lessonPlan: {
            id: `lesson-plan-${Date.now()}`,
            title: result.lessonOverview.lesson,
            content: result,
            type: 'Lesson Plan',
          },
          supplementaryMaterials: [],
      };

      setHistory(prev => [...prev, newPackage]);
      setActivePackageId(newPackageId);
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
    if (!lessonPlan || !activePackageId) {
        toast({
            title: "No Lesson Plan",
            description: "Please generate or select a lesson plan first before using AI tools.",
            variant: "destructive"
        });
        return;
    }

    const title = toolName;
    if (activePackage?.supplementaryMaterials.some(sec => sec.title === title)) {
        toast({ title: "Already Generated", description: `A ${title} has already been generated for this lesson plan.` });
        return;
    }

    setIsToolLoading(title);

    try {
        let result: any;
        let contentType: GeneratedContent['type'] = toolName;
        let newContent: GeneratedContent | null = null;

        if (toolName === 'Worksheet') {
            result = await generateWorksheet({ lessonPlanJson: JSON.stringify(lessonPlan) });
            newContent = { id: `${toolName}-${Date.now()}`, title: 'Student Worksheet', content: result, type: contentType };
        } else if (toolName === 'Reading Material') {
            result = await generateReadingMaterial(lessonPlan);
            newContent = { id: `${toolName}-${Date.now()}`, title: result.title, content: result, type: contentType };
        } else if (toolName === 'Teacher Coach') {
            result = await generateTeacherCoach({ lessonPlanJson: JSON.stringify(lessonPlan) });
            newContent = { id: `${toolName}-${Date.now()}`, title, content: result, type: contentType };
        } else if (toolName === 'Slideshow Outline') {
            result = await generateSlideshowOutline(lessonPlan);
            newContent = { id: `${toolName}-${Date.now()}`, title, content: result, type: contentType };
        } else if (toolName === 'Question Cluster') {
            result = await generateQuestionCluster({
                lessonTopic: lessonPlan.lessonOverview.topic,
                lessonObjective: lessonPlan.lessonOverview.objectives.join('; ')
            });
            newContent = { id: `${toolName}-${Date.now()}`, title, content: result, type: contentType };
        } else if (toolName === 'Study Sheet') {
            result = await generateStudySheet({ lessonPlanJson: JSON.stringify(lessonPlan) });
            newContent = { id: `${toolName}-${Date.now()}`, title, content: result, type: contentType };
        }

        if (newContent) {
            setHistory(prev => prev.map(p => {
                if (p.id === activePackageId) {
                    return { ...p, supplementaryMaterials: [...p.supplementaryMaterials, newContent!] };
                }
                return p;
            }));
        }

    } catch (error) {
        console.error(`${toolName} generation failed:`, error);
        toast({ title: "Generation Failed", description: `An error occurred while generating the ${toolName}.`, variant: "destructive" });
    } finally {
        setIsToolLoading(null);
    }
  };

  // Lesson Plan Editing Handlers
  const handleSectionSelect = (sectionKey: string, checked: boolean) => {
    setSelectedSections(prev => 
        checked ? [...prev, sectionKey] : prev.filter(key => key !== sectionKey)
    );
  };

  const handleSectionEditToggle = (sectionKey: string) => {
    setEditingSections(prev => {
        if (prev.includes(sectionKey)) {
            // If already editing, cancel changes
            handleCancelSection(sectionKey);
            return prev.filter(key => key !== sectionKey);
        } else {
            return [...prev, sectionKey];
        }
    });
  };

  const handleSectionContentChange = (sectionKey: string, newContent: any) => {
    setSectionContent(prev => ({
        ...prev,
        [sectionKey]: newContent
    }));
  };

  const handleSaveSection = (sectionKey: string) => {
    setEditingSections(prev => prev.filter(key => key !== sectionKey));
    setOriginalSectionContent(prev => ({...prev, [sectionKey]: sectionContent[sectionKey]}));
    
    // Update the lesson plan in history
    setHistory(prevHistory => prevHistory.map(pkg => {
        if (pkg.id === activePackageId) {
            const updatedLessonPlanContent = { ...pkg.lessonPlan.content, [sectionKey]: sectionContent[sectionKey] };
            return {
                ...pkg,
                lessonPlan: { ...pkg.lessonPlan, content: updatedLessonPlanContent }
            };
        }
        return pkg;
    }));

    toast({ title: 'Section Saved', description: `Your changes to "${sectionKey}" have been saved.`});
  };

  const handleCancelSection = (sectionKey: string) => {
    setEditingSections(prev => prev.filter(key => key !== sectionKey));
    setSectionContent(prev => ({...prev, [sectionKey]: originalSectionContent[sectionKey]}));
  };

  const handleReviseClick = (sectionKey: string) => {
    setRevisingSectionKey(sectionKey);
    setIsRevisionDialogOpen(true);
  };

  const handleAiRevision = async () => {
    if (!revisingSectionKey || !lessonPlan) return;
    
    setIsRevisionDialogOpen(false);
    setIsToolLoading(`Revising ${revisingSectionKey}...`);

    try {
        const sectionToRevise = sectionContent[revisingSectionKey] || lessonPlan[revisingSectionKey as keyof typeof lessonPlan];
        const result = await refineLessonSection({
            sectionName: revisingSectionKey,
            originalContent: JSON.stringify(sectionToRevise, null, 2),
            instructions: aiRevisionPrompt,
        });

        const revisedContent = JSON.parse(result.revisedContent);
        
        handleSectionContentChange(revisingSectionKey, revisedContent);
        handleSaveSection(revisingSectionKey);
        toast({ title: 'Revision Complete', description: `The "${revisingSectionKey}" section has been updated by the AI.`});

    } catch (error) {
        console.error("AI revision failed:", error);
        toast({ title: "Revision Failed", description: "The AI failed to revise the section. Please try again.", variant: "destructive" });
    } finally {
        setIsToolLoading(null);
        setAiRevisionPrompt('');
        setRevisingSectionKey(null);
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
              <div>Your lesson plan is ready. Now you can use our AI tools to instantly create aligned materials. The tools are available on the right-hand sidebar.</div>
              <div className="text-sm text-muted-foreground pt-4 text-left">
                <p className="font-semibold text-foreground">Here are the available tools:</p>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                    <li><strong>Worksheet:</strong> Creates a student-facing worksheet.</li>
                    <li><strong>Reading Material:</strong> Generates a student-facing article.</li>
                    <li><strong>Study Sheet:</strong> Creates a concise study guide.</li>
                    <li><strong>Question Cluster:</strong> Builds a set of NGSS-style assessment questions.</li>
                    <li><strong>Slideshow Outline:</strong> Generates a presentation outline.</li>
                    <li><strong>Teacher Coach:</strong> Provides pedagogical advice for the lesson.</li>
                </ul>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => handleDialogClose(false)}>
              Got it, thanks!
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog open={isRevisionDialogOpen} onOpenChange={setIsRevisionDialogOpen}>
        <DialogContent>
            <DialogHeader>
                <DialogTitle>Revise Section with AI</DialogTitle>
                <DialogDescription>
                    Enter your instructions for how the AI should revise the "{revisingSectionKey}" section.
                </DialogDescription>
            </DialogHeader>
            <Textarea
                placeholder="e.g., 'Make this section more engaging for 9th graders', 'Add more detail about...', 'Simplify the language'"
                value={aiRevisionPrompt}
                onChange={(e) => setAiRevisionPrompt(e.target.value)}
                rows={4}
            />
            <DialogFooter>
                <Button variant="ghost" onClick={() => setIsRevisionDialogOpen(false)}>Cancel</Button>
                <Button onClick={handleAiRevision} disabled={!aiRevisionPrompt}>Revise</Button>
            </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-3">
             <Card className="sticky top-24 shadow-lg">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <History className="h-5 w-5" />
                        Generation History
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    {history.length > 0 ? (
                        <ScrollArea className="h-[60vh]">
                            <div className="space-y-2">
                                {history.map(pkg => (
                                    <Button
                                        key={pkg.id}
                                        variant={activePackageId === pkg.id ? 'secondary' : 'ghost'}
                                        className="w-full justify-start h-auto py-2 text-left"
                                        onClick={() => setActivePackageId(pkg.id)}
                                    >
                                        <div className="flex flex-col">
                                            <span className="font-semibold truncate">{pkg.lessonPlan.title}</span>
                                            <span className="text-xs text-muted-foreground">
                                                {pkg.supplementaryMaterials.length} supplementary material(s)
                                            </span>
                                        </div>
                                    </Button>
                                ))}
                            </div>
                        </ScrollArea>
                    ) : (
                        <p className="text-sm text-muted-foreground text-center py-8">
                            Generate a lesson to start your history.
                        </p>
                    )}
                </CardContent>
             </Card>
        </div>
        <div className="md:col-span-9 relative">
            <div className="flex-grow">
              <Card className="w-full shadow-lg mb-8">
                  <CardHeader>
                      <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Leaf className="h-6 w-6" />
                      </div>
                      <div>
                          <CardTitle className="text-2xl font-headline">NV Biology Lesson Generator</CardTitle>
                          <CardDescription>Create 5E model lesson plans aligned with the New Visions Biology curriculum.</CardDescription>
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
                                                          <p className="text-sm text-muted-foreground">{lesson.objective}</p>
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
                                      <Textarea placeholder="e.g., 'Focus on English Language Learners', 'Include a hands-on activity', 'Make it relevant to urban students'" {...field} />
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
              
              {isLoading && !activePackage && (
                  <div className="mt-8">
                      <GeneratingAnimation />
                  </div>
              )}

              {activePackage ? (
                <>
                    <CollapsibleSection key={activePackage.lessonPlan.id} title={activePackage.lessonPlan.title} contentItem={activePackage.lessonPlan}>
                        <StyledContentDisplay
                            content={activePackage.lessonPlan.content}
                            type={activePackage.lessonPlan.type}
                            lessonPlanState={{
                                selectedSections,
                                editingSections,
                                sectionContent,
                                onSectionSelect: handleSectionSelect,
                                onSectionEditToggle: handleSectionEditToggle,
                                onSaveSection: handleSaveSection,
                                onCancelSection: handleCancelSection,
                                onReviseSection: handleReviseClick,
                                onSectionContentChange: handleSectionContentChange,
                            }}
                        />
                    </CollapsibleSection>
                    {activePackage.supplementaryMaterials.map(section => (
                        <CollapsibleSection key={section.id} title={section.title} contentItem={section}>
                            <StyledContentDisplay content={section.content} type={section.type} />
                        </CollapsibleSection>
                    ))}
                </>
              ) : !isLoading && history.length > 0 && (
                <div className="text-center py-16">
                    <h2 className="text-2xl font-bold font-headline mb-4">No Lesson Selected</h2>
                    <p className="text-muted-foreground">Please select a lesson from the history panel to view its content.</p>
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

export default function NVBiologyGenerator() {
    const { hasScienceSubscription } = useAuth();

    return hasScienceSubscription ? <GeneratorContent /> : <SubscriptionPrompt />;
}
