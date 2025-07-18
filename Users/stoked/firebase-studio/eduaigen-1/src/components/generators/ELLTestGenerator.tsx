
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Sparkles, Wand2, Languages } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ellCurriculum } from '@/lib/ell-curriculum';
import { generateELLTest } from '@/ai/flows/generate-ell-test';
import GeneratingAnimation from '../common/GeneratingAnimation';
import { useAuth } from '@/context/AuthContext';
import CollapsibleSection from '../common/CollapsibleSection';
import StyledContentDisplay from '../common/StyledContentDisplay';
import { Checkbox } from '@/components/ui/checkbox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import RightSidebar, { type ToolName } from '../common/RightSidebar';
import { generateDifferentiatedELLTest } from '@/ai/flows/generate-ell-differentiated-test';
import { generateEnhancedELLTest } from '@/ai/flows/generate-ell-enhanced-test';
import { generateELLStudySheet } from '@/ai/flows/generate-ell-study-sheet';

const formSchema = z.object({
  lessons: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one lesson.',
  }),
});

type FormData = z.infer<typeof formSchema>;

export type TestGeneratedContent = {
  id: string;
  title: string;
  content: any;
  type: 'Test' | 'Answer Key' | 'Study Sheet' | 'Differentiated Version' | 'Enhanced Version';
  sourceId?: string;
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
                    The ELL/ENL Test Generator requires an ELL subscription. Subscribe now to create powerful, scaffolded assessments for your students.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button size="lg" asChild>
                    <Link href="/pricing">Subscribe to ELL Tools</Link>
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
  const [testPackage, setTestPackage] = useState<TestGeneratedContent[] | null>(null);
  const [isToolsInfoDialogOpen, setIsToolsInfoDialogOpen] = useState(false);
  const [isHighlightingTools, setIsHighlightingTools] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { lessons: [] },
  });

  const units = useMemo(() => Object.keys(ellCurriculum.units), []);

  useEffect(() => {
    if (testPackage) {
      addToHistory(testPackage);
    }
  }, [testPackage, addToHistory]);

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

  async function onSubmit(values: FormData) {
      setIsLoading(true);
      setTestPackage(null);
      try {
        const result = await generateELLTest(values);
        const testContent: TestGeneratedContent = { id: `test-${Date.now()}`, title: result.testTitle, content: result, type: 'Test' };
        const answerKeyContent: TestGeneratedContent = { id: `answer-key-${Date.now()}`, title: `Answer Key: ${result.testTitle}`, content: result, type: 'Answer Key' };
        const newPackage = [testContent, answerKeyContent];
        setTestPackage(newPackage);
        setIsToolsInfoDialogOpen(true);
      } catch (error) {
        console.error('Test generation failed:', error);
        toast({ title: 'Generation Failed', description: 'An error occurred while generating the test. Please try again.', variant: 'destructive' });
      } finally {
        setIsLoading(false);
      }
  };
  
  const handleToolClick = async (toolName: 'Study Sheet' | 'Differentiated Version' | 'Enhanced Version') => {
    const originalTestContent = testPackage?.find(item => item.type === 'Test');
    if (!originalTestContent) {
      toast({ title: "No Test Found", description: "Please generate a test first.", variant: "destructive" });
      return;
    }
    if (testPackage?.some(item => item.type === toolName)) {
      toast({ title: "Already Generated", description: `A ${toolName} has already been generated.`, variant: "default"});
      return;
    }

    setIsToolLoading(toolName);
    try {
        let result: any;
        let newContent: TestGeneratedContent | null = null;
        const input = { originalTest: originalTestContent.content };

        switch (toolName) {
            case 'Study Sheet':
                result = await generateELLStudySheet(input);
                newContent = { id: `study-sheet-${Date.now()}`, title: result.title, content: result, type: 'Study Sheet' };
                break;
            case 'Differentiated Version':
                result = await generateDifferentiatedELLTest(input);
                newContent = { id: `differentiated-${Date.now()}`, title: result.testTitle, content: result, type: 'Differentiated Version' };
                break;
            case 'Enhanced Version':
                result = await generateEnhancedELLTest(input);
                newContent = { id: `enhanced-${Date.now()}`, title: result.testTitle, content: result, type: 'Enhanced Version' };
                break;
        }
        if (newContent) {
            setTestPackage(prev => [...(prev || []), newContent!]);
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
            <AlertDialogTitle className="flex items-center gap-2"><Wand2 className="h-6 w-6 text-primary" />Test Generated!</AlertDialogTitle>
            <AlertDialogDescription>Your test and answer key are ready. Use the AI tools on the right sidebar to create aligned materials.</AlertDialogDescription>
            <div className="text-sm text-muted-foreground pt-4 text-left">
              <span className="font-semibold text-foreground">Available Tools:</span>
              <ul className="list-disc pl-5 mt-2 space-y-2">
                  <li><strong>Study Sheet:</strong> Creates a concise study guide.</li>
                  <li><strong>Differentiated Version:</strong> Generates a version with more scaffolds.</li>
                  <li><strong>Enhanced Version:</strong> Creates a more rigorous version for advanced students.</li>
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
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary"><Languages className="h-6 w-6" /></div>
                    <div>
                      <CardTitle className="text-2xl font-headline">ELL / ENL Test Generator</CardTitle>
                      <CardDescription>Create a custom, scaffolded test for English Language Learners.</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="lessons"
                    render={() => (
                      <FormItem>
                        <div className="mb-4"><FormLabel className="text-base">Select Lessons</FormLabel><p className="text-sm text-muted-foreground">Choose one or more lessons to include in the test.</p></div>
                        <Accordion type="multiple" className="w-full">
                          {units.map((unitKey) => {
                            const unit = ellCurriculum.units[unitKey as keyof typeof ellCurriculum.units];
                            return (
                              <AccordionItem value={unitKey} key={unitKey}>
                                <AccordionTrigger>{unit.unit}</AccordionTrigger>
                                <AccordionContent>
                                  {Object.keys(unit.topics).map(topicKey => (
                                    <div key={topicKey} className="pt-2 pl-4">
                                      <h4 className="font-semibold mb-2">{topicKey}</h4>
                                      {unit.topics[topicKey].lessons.map((lesson) => (
                                        <FormField key={lesson.title} control={form.control} name="lessons"
                                          render={({ field }) => (
                                            <FormItem className="flex flex-row items-center space-x-3 space-y-0 py-1">
                                              <FormControl>
                                                <Checkbox checked={field.value?.includes(lesson.title)}
                                                  onCheckedChange={(checked) => {
                                                    return checked ? field.onChange([...field.value, lesson.title]) : field.onChange(field.value?.filter((value) => value !== lesson.title));
                                                  }}
                                                />
                                              </FormControl>
                                              <FormLabel className="font-normal text-sm">{lesson.title}</FormLabel>
                                            </FormItem>
                                          )}
                                        />
                                      ))}
                                    </div>
                                  ))}
                                </AccordionContent>
                              </AccordionItem>
                            );
                          })}
                        </Accordion>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
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
          {testPackage?.map(item => (<CollapsibleSection key={item.id} title={item.title} contentItem={{...item, content: item.content as any}}><StyledContentDisplay content={item.content} type={item.type} /></CollapsibleSection>))}
          {isToolLoading && (<CollapsibleSection title={`Generating ${isToolLoading}...`} contentItem={{id: 'loading', title: `Generating ${isToolLoading}...`, content: '', type: 'Test'}}><GeneratingAnimation /></CollapsibleSection>)}
          {testPackage && <RightSidebar onToolClick={(toolName) => handleToolClick(toolName as any)} isGenerating={!!isToolLoading} isHighlighting={isHighlightingTools} toolset="test" />}
        </div>
      </div>
    </>
  );
};

export default function ELLTestGenerator() {
    const { hasELLSubscription } = useAuth();
    return hasELLSubscription ? <GeneratorContent /> : <SubscriptionPrompt />;
}
