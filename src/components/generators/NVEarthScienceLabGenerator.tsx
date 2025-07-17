
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, TestTube, Sparkles, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { earthScienceCurriculum } from '@/lib/earth-science-curriculum';
import { generateNVEarthScienceLab } from '@/ai/flows/generate-nv-earth-science-lab';
import GeneratingAnimation from '../common/GeneratingAnimation';
import StyledContentDisplay from '../common/StyledContentDisplay';
import { useAuth } from '@/context/AuthContext';
import CollapsibleSection from '../common/CollapsibleSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '../ui/checkbox';
import RightSidebar, { type ToolName } from '../common/RightSidebar';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { generateLabAnswerKey } from '@/ai/flows/generate-lab-answer-key';
import { generateLabStudentSheet } from '@/ai/flows/generate-lab-student-sheet';
import { generateDifferentiatedLab } from '@/ai/flows/generate-differentiated-lab';
import { generateLabTeacherCoach } from '@/ai/flows/generate-lab-teacher-coach';

const formSchema = z.object({
  lessons: z.array(z.string()).refine(value => value.length > 0, { message: 'Please select at least one lesson.' }),
  additionalInfo: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export type GeneratedContent = {
  id: string;
  title: string;
  content: any;
  type: ToolName | 'Lab Activity';
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
                    The NV Earth Science Lab Generator requires a Science curriculum subscription. Subscribe now to create powerful, 45-minute lab activities.
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
  const { addToHistory } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [labPackage, setLabPackage] = useState<GeneratedContent[] | null>(null);
  const [isToolLoading, setIsToolLoading] = useState<ToolName | null>(null);
  const [isToolsInfoDialogOpen, setIsToolsInfoDialogOpen] = useState(false);
  const [isHighlightingTools, setIsHighlightingTools] = useState(false);

  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { lessons: [], additionalInfo: '' },
  });

  const units = useMemo(() => Object.keys(earthScienceCurriculum.units), []);

  useEffect(() => {
    if (labPackage) {
      addToHistory(labPackage);
    }
  }, [labPackage, addToHistory]);

  const handleTopicCheck = (topicLessons: { title: string }[], checked: boolean | 'indeterminate') => {
    const currentSelection = form.getValues('lessons') || [];
    const topicLessonTitles = topicLessons.map(l => l.title);
    let newSelection;
    if (checked) {
        newSelection = [...new Set([...currentSelection, ...topicLessonTitles])];
    } else {
        newSelection = currentSelection.filter(l => !topicLessonTitles.includes(l));
    }
    form.setValue('lessons', newSelection, { shouldValidate: true });
  }

  const handleUnitCheck = (unitTopics: { [key: string]: { lessons: {title: string}[] } }, checked: boolean | 'indeterminate') => {
    const currentSelection = form.getValues('lessons') || [];
    const allUnitLessons = Object.values(unitTopics).flatMap(t => t.lessons.map(l => l.title));
    let newSelection;
    if(checked) {
        newSelection = [...new Set([...currentSelection, ...allUnitLessons])];
    } else {
        newSelection = currentSelection.filter(l => !allUnitLessons.includes(l));
    }
    form.setValue('lessons', newSelection, { shouldValidate: true });
  }

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

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setLabPackage(null);

    try {
      const result = await generateNVEarthScienceLab({ lessons: values.lessons, additionalInfo: values.additionalInfo });
      const newLab: GeneratedContent = {
        id: `lab-${Date.now()}`,
        title: result.labTitle,
        content: result,
        type: 'Lab Activity',
      };
      setLabPackage([newLab]);
      setIsToolsInfoDialogOpen(true);
    } catch (error) {
      console.error('Lab generation failed:', error);
      toast({
        title: 'Generation Failed',
        description: 'An error occurred while generating the lab activity. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  const handleToolClick = async (toolName: ToolName) => {
    const originalLab = labPackage?.find(item => item.type === 'Lab Activity');
    if (!originalLab) {
        toast({ title: "No Lab Found", description: "Please generate a lab first.", variant: "destructive" });
        return;
    }
    if (labPackage?.some(item => item.type === toolName)) {
        toast({ title: "Already Generated", description: `A ${toolName} has already been generated.`, variant: "default"});
        return;
    }

    setIsToolLoading(toolName);
    try {
        let result: any;
        let newContent: GeneratedContent | null = null;
        const input = { originalLab: originalLab.content };

        switch (toolName) {
            case 'Student Answer Sheet':
                result = await generateLabStudentSheet(input);
                newContent = { id: `studentsheet-${Date.now()}`, title: result.title, content: result, type: 'Student Answer Sheet' };
                break;
            case 'Answer Key':
                result = await generateLabAnswerKey(input);
                newContent = { id: `answerkey-${Date.now()}`, title: result.title, content: result, type: 'Answer Key' };
                break;
            case 'Differentiated Version':
                result = await generateDifferentiatedLab(input);
                newContent = { id: `differentiated-${Date.now()}`, title: result.labTitle, content: result, type: 'Differentiated Version' };
                break;
            case 'Teacher Coach':
                result = await generateLabTeacherCoach(input);
                newContent = { id: `coach-${Date.now()}`, title: result.title, content: result, type: 'Teacher Coach' };
                break;
        }

        if (newContent) {
            setLabPackage(prev => [...(prev || []), newContent!]);
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
            <AlertDialogTitle className="flex items-center gap-2"><Wand2 className="h-6 w-6 text-primary" />Lab Generated!</AlertDialogTitle>
            <AlertDialogDescription>Your lab activity is ready. Use the AI tools on the right sidebar to create supporting documents.</AlertDialogDescription>
            <div className="text-sm text-muted-foreground pt-4 text-left">
              <span className="font-semibold text-foreground">Available Tools:</span>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                <li><strong>Student Answer Sheet:</strong> A worksheet for students to record their work.</li>
                <li><strong>Answer Key:</strong> A complete answer key with sample data and explanations.</li>
                <li><strong>Differentiated Version:</strong> A version of the lab with more scaffolds.</li>
                <li><strong>Teacher Coach:</strong> Pedagogical advice for facilitating the lab.</li>
              </ul>
            </div>
          </AlertDialogHeader>
          <AlertDialogFooter><AlertDialogAction onClick={() => handleDialogClose(false)}>Got it, thanks!</AlertDialogAction></AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-12 relative">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <Card className="w-full shadow-lg mb-8">
                    <CardHeader>
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <TestTube className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-headline">NV Earth Science Lab Generator</CardTitle>
                            <CardDescription>Generate a 45-minute, NGSS-aligned lab activity for an Earth Science lesson.</CardDescription>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                       <FormField
                        control={form.control}
                        name="lessons"
                        render={() => (
                          <FormItem>
                               <div className="mb-4">
                                  <FormLabel className="text-base">Select Units, Topics, or Lessons</FormLabel>
                                  <p className="text-sm text-muted-foreground">Select one or more items to base your lab activity on.</p>
                              </div>
                              <Accordion type="multiple" className="w-full">
                                  {units.map((unitKey) => {
                                      const unit = earthScienceCurriculum.units[unitKey];
                                      const allUnitLessons = Object.values(unit.topics).flatMap(t => t.lessons.map(l => l.title));
                                      const selectedLessonsInUnit = form.watch('lessons').filter(l => allUnitLessons.includes(l));
                                      const isUnitIndeterminate = selectedLessonsInUnit.length > 0 && selectedLessonsInUnit.length < allUnitLessons.length;
                                      const isUnitChecked = selectedLessonsInUnit.length === allUnitLessons.length;

                                      return (
                                      <AccordionItem value={unitKey} key={unitKey}>
                                          <div className="flex items-center">
                                              <Checkbox id={`unit-${unitKey}`} className="mr-2" onCheckedChange={(checked) => handleUnitCheck(unit.topics, checked)} checked={isUnitChecked} indeterminate={isUnitIndeterminate}/>
                                              <AccordionTrigger className="flex-1">{unitKey}</AccordionTrigger>
                                          </div>
                                          <AccordionContent>
                                              <Accordion type="multiple" className="w-full pl-4">
                                                  {Object.keys(unit.topics).map(topicKey => {
                                                      const topic = unit.topics[topicKey];
                                                      const selectedInTopic = form.watch('lessons').filter(l => topic.lessons.some(tl => tl.title === l));
                                                      const isTopicIndeterminate = selectedInTopic.length > 0 && selectedInTopic.length < topic.lessons.length;
                                                      const isTopicChecked = selectedInTopic.length === topic.lessons.length;
                                                      return (
                                                          <AccordionItem value={topicKey} key={topicKey}>
                                                              <div className="flex items-center">
                                                                  <Checkbox id={`topic-${topicKey}`} className="mr-2" onCheckedChange={(checked) => handleTopicCheck(topic.lessons, checked)} checked={isTopicChecked} indeterminate={isTopicIndeterminate}/>
                                                                  <AccordionTrigger className="flex-1">{topicKey}</AccordionTrigger>
                                                              </div>
                                                              <AccordionContent>
                                                              <div className="space-y-2 pl-4">
                                                                  {topic.lessons.map((lesson, index) => (
                                                                      <FormField
                                                                          key={index}
                                                                          control={form.control}
                                                                          name="lessons"
                                                                          render={({ field }) => (
                                                                              <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                                                                                  <FormControl>
                                                                                      <Checkbox
                                                                                          checked={field.value?.includes(lesson.title)}
                                                                                          onCheckedChange={(checked) => {
                                                                                              return checked
                                                                                                  ? field.onChange([...field.value, lesson.title])
                                                                                                  : field.onChange(field.value?.filter((value) => value !== lesson.title));
                                                                                          }}
                                                                                      />
                                                                                  </FormControl>
                                                                                  <FormLabel className="font-normal">{lesson.title}</FormLabel>
                                                                              </FormItem>
                                                                          )}
                                                                      />
                                                                  ))}
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
                              <FormMessage />
                          </FormItem>
                          )}
                      />
                      <FormField control={form.control} name="additionalInfo" render={({ field }) => (
                          <FormItem>
                          <FormLabel>Additional Information (Optional)</FormLabel>
                          <FormControl>
                              <Textarea placeholder="e.g., 'Focus on qualitative observations', 'Use only household materials', 'Make it a competitive challenge'" {...field} />
                          </FormControl>
                          <FormMessage />
                          </FormItem>
                      )} />
                    </CardContent>
                    <CardFooter>
                       <Button type="submit" disabled={isLoading} className="w-full">
                          {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                          {isLoading ? 'Generating Lab...' : 'Generate Lab'}
                      </Button>
                    </CardFooter>
                </Card>
              </form>
            </Form>

            {isLoading && !labPackage && <div className="mt-8"><GeneratingAnimation /></div>}

            {labPackage?.map(item => (
              <CollapsibleSection key={item.id} title={item.title} contentItem={item}>
                <StyledContentDisplay content={item.content} type={item.type} />
              </CollapsibleSection>
            ))}

            {!labPackage && !isLoading && (
              <div className="text-center py-16">
                  <h2 className="text-2xl font-bold font-headline mb-4">Ready to Generate a Lab?</h2>
                  <p className="text-muted-foreground">Select one or more lessons to create your AI-powered lab activity.</p>
              </div>
            )}
            
            {isToolLoading && (
              <CollapsibleSection title={`Generating ${isToolLoading}...`} contentItem={{id: 'loading', title: `Generating ${isToolLoading}...`, content: '', type: 'Worksheet'}}>
                  <GeneratingAnimation />
              </CollapsibleSection>
            )}

            {labPackage && <RightSidebar onToolClick={handleToolClick} isGenerating={!!isToolLoading} isHighlighting={isHighlightingTools} toolset="lab" />}
        </div>
      </div>
    </>
  );
}

export default function NVEarthScienceLabGenerator() {
    const { hasScienceSubscription } = useAuth();
    return hasScienceSubscription ? <GeneratorContent /> : <SubscriptionPrompt />;
}
