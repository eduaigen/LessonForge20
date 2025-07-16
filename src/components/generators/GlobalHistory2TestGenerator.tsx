
'use client';

import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';
import { Loader2, Sparkles, Wand2, History } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { globalHistory2Curriculum } from '@/lib/global-history-2-curriculum';
import { generateGlobalHistory2Test } from '@/ai/flows/generate-global-history-2-test';
import GeneratingAnimation from '../common/GeneratingAnimation';
import { useAuth } from '@/context/AuthContext';
import CollapsibleSection from '../common/CollapsibleSection';
import StyledContentDisplay from '../common/StyledContentDisplay';
import { Checkbox } from '@/components/ui/checkbox';
import type { GenerateSocialStudiesTestOutput } from '@/ai/schemas/social-studies-test-schemas';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

const formSchema = z.object({
  lessons: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one lesson.',
  }),
  dokLevel: z.number().min(1).max(4),
  mcqCount: z.number().min(1).max(28),
  crqCount: z.number().min(1).max(5),
  dbqDocCount: z.number().min(3).max(7),
});

type FormData = z.infer<typeof formSchema>;

const SubscriptionPrompt = () => (
    <div className="flex flex-1 items-center justify-center">
        <Card className="max-w-2xl text-center p-8 shadow-lg">
            <CardHeader>
                 <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sparkles className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline text-3xl font-bold">Unlock This Premium Tool</CardTitle>
                <CardDescription>
                    The Social Studies Test Generator requires a Social Studies subscription. Subscribe now to create powerful, standards-aligned assessments.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button size="lg" asChild>
                    <Link href="/pricing">Subscribe to Social Studies Tools</Link>
                </Button>
            </CardContent>
        </Card>
    </div>
);


const GeneratorContent = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [generatedTest, setGeneratedTest] = useState<GenerateSocialStudiesTestOutput | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      lessons: [],
      dokLevel: 2,
      mcqCount: 20,
      crqCount: 2,
      dbqDocCount: 5,
    },
  });

  const units = useMemo(() => Object.keys(globalHistory2Curriculum.units), []);

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setGeneratedTest(null);
    try {
      const result = await generateGlobalHistory2Test(values);
      setGeneratedTest(result);
      
    } catch (error) {
      console.error('Test generation failed:', error);
      toast({
        title: 'Generation Failed',
        description: 'An error occurred while generating the test. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        <div className="md:col-span-12 relative">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Card className="w-full shadow-lg mb-8">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <History className="h-6 w-6" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl font-headline">Global History II Test Generator</CardTitle>
                      <CardDescription>Create a custom, Regents-style test for 10th Grade Global History.</CardDescription>
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
                                <FormLabel className="text-base">Select Lessons</FormLabel>
                                <p className="text-sm text-muted-foreground">Choose one or more lessons to include in the test.</p>
                            </div>
                            <Accordion type="multiple" className="w-full">
                            {units.map((unitKey) => {
                                const unit = globalHistory2Curriculum.units[unitKey as keyof typeof globalHistory2Curriculum.units];
                                if (!unit) return null;
                                return (
                                <AccordionItem value={unitKey} key={unitKey}>
                                    <AccordionTrigger>{unit.unit}</AccordionTrigger>
                                    <AccordionContent>
                                    <div className="space-y-2 pl-4">
                                        {Object.keys(unit.topics).map(topicKey => {
                                        const topic = unit.topics[topicKey as keyof typeof unit.topics];
                                        return (
                                            <div key={topicKey} className="pt-2">
                                            <h4 className="font-semibold mb-2">{topic.topic}</h4>
                                            {topic.lessons.map((lesson, index) => (
                                                <FormField
                                                    key={`${unitKey}-${topicKey}-${index}`}
                                                    control={form.control}
                                                    name="lessons"
                                                    render={({ field }) => (
                                                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 py-1">
                                                        <FormControl>
                                                        <Checkbox
                                                            checked={field.value?.includes(lesson.title)}
                                                            onCheckedChange={(checked) => {
                                                            return checked
                                                                ? field.onChange([...field.value, lesson.title])
                                                                : field.onChange(
                                                                    field.value?.filter(
                                                                    (value) => value !== lesson.title
                                                                    )
                                                                );
                                                            }}
                                                        />
                                                        </FormControl>
                                                        <FormLabel className="font-normal text-sm">{lesson.title}</FormLabel>
                                                    </FormItem>
                                                    )}
                                                />
                                            ))}
                                            </div>
                                        );
                                        })}
                                    </div>
                                    </AccordionContent>
                                </AccordionItem>
                                );
                            })}
                            </Accordion>
                            <FormMessage />
                        </FormItem>
                        )}
                    />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
                    <FormField control={form.control} name="mcqCount" render={({ field }) => (<FormItem><FormLabel>Multiple Choice Questions: {field.value}</FormLabel><FormControl><Slider min={5} max={28} step={1} value={[field.value]} onValueChange={(v) => field.onChange(v[0])} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="crqCount" render={({ field }) => (<FormItem><FormLabel>CRQ Sets: {field.value}</FormLabel><FormControl><Slider min={1} max={5} step={1} value={[field.value]} onValueChange={(v) => field.onChange(v[0])} /></FormControl></FormItem>)} />
                    <FormField control={form.control} name="dbqDocCount" render={({ field }) => (<FormItem><FormLabel>DBQ Documents: {field.value}</FormLabel><FormControl><Slider min={3} max={7} step={1} value={[field.value]} onValueChange={(v) => field.onChange(v[0])} /></FormControl></FormItem>)} />
                  </div>
                   <FormField control={form.control} name="dokLevel" render={({ field }) => (<FormItem><FormLabel>Depth of Knowledge (DOK) Level: {field.value}</FormLabel><FormControl><Slider min={1} max={4} step={1} value={[field.value]} onValueChange={(v) => field.onChange(v[0])} /></FormControl></FormItem>)} />
                </CardContent>
                <CardFooter>
                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                    {isLoading ? 'Generating Test...' : 'Generate Test'}
                  </Button>
                </CardFooter>
              </Card>
            </form>
          </Form>

          {isLoading && <div className="mt-8"><GeneratingAnimation /></div>}
          
          {generatedTest && (
             <CollapsibleSection key={generatedTest.testTitle} title={generatedTest.testTitle} contentItem={{id: 'test', title: generatedTest.testTitle, content: generatedTest, type: 'Test' as any}}>
                <StyledContentDisplay content={generatedTest} type={'Test' as any} />
            </CollapsibleSection>
          )}
        </div>
      </div>
    </>
  );
};

export default function GlobalHistory2TestGenerator() {
    const { hasSocialStudiesSubscription } = useAuth();
    return hasSocialStudiesSubscription ? <GeneratorContent /> : <SubscriptionPrompt />;
}
