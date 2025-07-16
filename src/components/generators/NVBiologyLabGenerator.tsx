
'use client';

import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, TestTube, Sparkles, Wand2, Check, X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { nvBiologyCurriculum } from '@/lib/nv-biology-curriculum';
import { generateNVBiologyLab, type GenerateLabActivityOutput } from '@/ai/flows/generate-nv-biology-lab';
import GeneratingAnimation from '../common/GeneratingAnimation';
import StyledContentDisplay from '../common/StyledContentDisplay';
import { useAuth } from '@/context/AuthContext';
import CollapsibleSection from '../common/CollapsibleSection';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const formSchema = z.object({
  lesson: z.string().min(1, { message: 'Please select a lesson.' }),
  additionalInfo: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export type GeneratedContent = {
  id: string;
  title: string;
  content: GenerateLabActivityOutput;
  type: 'Lab Activity';
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
                    The NV Biology Lab Generator requires a Science curriculum subscription. Subscribe now to create powerful, 45-minute lab activities.
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
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [currentlySelectedLesson, setCurrentlySelectedLesson] = useState<string | null>(null);
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { lesson: '', additionalInfo: '' },
  });

  const units = useMemo(() => Object.keys(nvBiologyCurriculum.units), []);

  const handleClearSelection = () => {
    setCurrentlySelectedLesson(null);
    form.reset({ lesson: '', additionalInfo: form.getValues('additionalInfo') });
  }

  const handleLessonSelect = (lessonTitle: string) => {
    if (currentlySelectedLesson === lessonTitle) {
      handleClearSelection();
    } else {
      setCurrentlySelectedLesson(lessonTitle);
      form.setValue('lesson', lessonTitle);
      setGeneratedContent(null);
    }
  };

  async function onSubmit(values: FormData) {
    if (!currentlySelectedLesson) {
      toast({
        title: 'No Lesson Selected',
        description: 'Please select a lesson to base the lab on.',
        variant: 'destructive',
      });
      return;
    }
    setIsLoading(true);
    setGeneratedContent(null);

    try {
      const result = await generateNVBiologyLab(values);
      const newLab: GeneratedContent = {
        id: `lab-${Date.now()}`,
        title: result.labTitle,
        content: result,
        type: 'Lab Activity',
      };
      setGeneratedContent(newLab);
      form.reset({ lesson: '', additionalInfo: values.additionalInfo });
      setCurrentlySelectedLesson(null);
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

  return (
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
                          <CardTitle className="text-2xl font-headline">NV Biology Lab Generator</CardTitle>
                          <CardDescription>Generate a 45-minute, NGSS-aligned lab activity for a biology lesson.</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Accordion type="single" collapsible className="w-full">
                        {units.map((unitKey) => {
                            const unit = nvBiologyCurriculum.units[unitKey];
                            return (
                            <AccordionItem value={unitKey} key={unitKey}>
                                <AccordionTrigger>{unit.unit}</AccordionTrigger>
                                <AccordionContent>
                                    <Accordion type="single" collapsible className="w-full pl-4">
                                        {Object.keys(unit.topics).map(topicKey => {
                                            const topic = unit.topics[topicKey];
                                            return (
                                                <AccordionItem value={topicKey} key={topicKey}>
                                                    <AccordionTrigger>{topic.topic}</AccordionTrigger>
                                                    <AccordionContent>
                                                      <div className="space-y-2 pl-4">
                                                          {topic.lessons.map((lesson, index) => {
                                                              const isSelected = currentlySelectedLesson === lesson.title;
                                                              return (
                                                                <div key={index} className="flex items-center justify-between">
                                                                  <p className="flex-1 font-semibold">{lesson.title}</p>
                                                                  <Button type="button" variant={isSelected ? "secondary" : "outline"} size="sm" onClick={() => handleLessonSelect(lesson.title)} disabled={isSelected && !!generatedContent}>
                                                                    {isSelected ? <><Check className="h-4 w-4 mr-2" />Selected</> : 'Select'}
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
              </Card>
              {currentlySelectedLesson && (
              <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-float-up">
                  <div className="flex items-center gap-4 p-4 rounded-lg shadow-2xl bg-background border">
                       <div className="flex-grow">
                           <h4 className="font-semibold">Lab Topic Selected!</h4>
                           <p className="text-sm text-muted-foreground truncate max-w-xs">{currentlySelectedLesson}</p>
                       </div>
                       <Button type="submit" size="lg" disabled={isLoading} className="bg-green-500 hover:bg-green-600 text-white">
                           {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Wand2 className="mr-2 h-5 w-5" />}
                           {isLoading ? 'Generating...' : 'Generate Lab'}
                       </Button>
                       <Button type="button" variant="ghost" size="icon" onClick={handleClearSelection} disabled={isLoading}>
                           <X className="h-5 w-5"/>
                       </Button>
                  </div>
              </div>
              )}
            </form>
          </Form>

          {isLoading && !generatedContent && <div className="mt-8"><GeneratingAnimation /></div>}

          {generatedContent && (
            <CollapsibleSection title={generatedContent.title} contentItem={generatedContent}>
              <StyledContentDisplay content={generatedContent.content} type={generatedContent.type} />
            </CollapsibleSection>
          )}

          {!generatedContent && !isLoading && (
            <div className="text-center py-16">
                <h2 className="text-2xl font-bold font-headline mb-4">Ready to Generate a Lab?</h2>
                <p className="text-muted-foreground">Select a lesson topic to create your AI-powered lab activity.</p>
            </div>
          )}
      </div>
    </div>
  );
}

export default function NVBiologyLabGenerator() {
    const { hasScienceSubscription } = useAuth();
    return hasScienceSubscription ? <GeneratorContent /> : <SubscriptionPrompt />;
}
