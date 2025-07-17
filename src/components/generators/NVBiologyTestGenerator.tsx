
'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Slider } from '@/components/ui/slider';
import { Loader2, TestTube, Sparkles, Wand2, FlaskConical } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { nvBiologyCurriculum } from '@/lib/nv-biology-curriculum';
import { generateNVBiologyTest, type GenerateNVBiologyTestOutput } from '@/ai/flows/generate-nv-biology-test';
import GeneratingAnimation from '../common/GeneratingAnimation';
import { useAuth } from '@/context/AuthContext';
import CollapsibleSection from '../common/CollapsibleSection';
import StyledContentDisplay from '../common/StyledContentDisplay';
import RightSidebar, { type ToolName } from '../common/RightSidebar';
import { Checkbox } from '@/components/ui/checkbox';
import { generateDifferentiatedTest } from '@/ai/flows/generate-test-differentiated';
import { generateEnhancedTest } from '@/ai/flows/generate-test-enhanced';
import { generateTestStudySheet } from '@/ai/flows/generate-test-study-sheet';
import { AlertDialog, AlertDialogAction, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const formSchema = z.object({
  units: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one unit.',
  }),
  dokLevel: z.number().min(1).max(4),
  clusterCount: z.number().min(1).max(5),
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
                    The NV Biology Test Generator requires a Science curriculum subscription. Subscribe now to create powerful, standards-aligned assessments.
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
  const [isToolLoading, setIsToolLoading] = useState<ToolName | null>(null);
  const [testPackage, setTestPackage] = useState<TestGeneratedContent[] | null>(null);
  const [isToolsInfoDialogOpen, setIsToolsInfoDialogOpen] = useState(false);
  const [isHighlightingTools, setIsHighlightingTools] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      units: [],
      dokLevel: 2,
      clusterCount: 3,
    },
  });

  const units = useMemo(() => Object.keys(nvBiologyCurriculum.units), []);

  useEffect(() => {
    if (testPackage) {
      addToHistory(testPackage);
    }
  }, [testPackage, addToHistory]);

  const handleDialogClose = (open: boolean) => {
    setIsToolsInfoDialogOpen(open);
    if (!open) {
        setIsHighlightingTools(true);
    }
  }

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setTestPackage(null);
    try {
      const result = await generateNVBiologyTest(values);
      
      const potentialTitle = result.testTitle;
      if (testPackage?.some(item => item.title === potentialTitle)) {
          toast({ title: "Already Generated", description: `A test for these units has already been generated.`, variant: "default" });
          setIsLoading(false);
          return;
      }

      const testContent: TestGeneratedContent = {
        id: `test-${Date.now()}`,
        title: result.testTitle,
        content: result,
        type: 'Test',
      };
      
      const answerKeyContent: TestGeneratedContent = {
          id: `answer-key-${Date.now()}`,
          title: `Answer Key: ${result.testTitle}`,
          content: result,
          type: 'Answer Key',
      }
      
      const newPackage = [testContent, answerKeyContent];
      setTestPackage(newPackage);
      setIsToolsInfoDialogOpen(true);
      
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
                result = await generateTestStudySheet(input);
                newContent = { id: `study-sheet-${Date.now()}`, title: result.title, content: result, type: 'Study Sheet' };
                break;
            case 'Differentiated Version':
                result = await generateDifferentiatedTest(input);
                newContent = { id: `differentiated-${Date.now()}`, title: result.testTitle, content: result, type: 'Differentiated Version' };
                break;
            case 'Enhanced Version':
                result = await generateEnhancedTest(input);
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
  
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    if (isHighlightingTools) {
      timeoutId = setTimeout(() => {
        setIsHighlightingTools(false);
      }, 10000); // Highlight for 10 seconds
    }
    return () => clearTimeout(timeoutId);
  }, [isHighlightingTools]);

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
                  <li><strong>Differentiated Version:</strong> Generates a version with simplified language.</li>
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
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <FlaskConical className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-headline">NV Biology Test Generator</CardTitle>
                  <CardDescription>Create a custom, cluster-based test aligned to the New Visions Biology curriculum.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
               <FormField
                control={form.control}
                name="units"
                render={() => (
                    <FormItem>
                    <div className="mb-4">
                        <FormLabel className="text-base">Select Units</FormLabel>
                        <FormMessage />
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {units.map((unit) => (
                        <FormField
                        key={unit}
                        control={form.control}
                        name="units"
                        render={({ field }) => {
                            return (
                            <FormItem key={unit} className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                <Checkbox
                                    checked={field.value?.includes(unit)}
                                    onCheckedChange={(checked) => {
                                    return checked
                                        ? field.onChange([...field.value, unit])
                                        : field.onChange(
                                            field.value?.filter(
                                            (value) => value !== unit
                                            )
                                        )
                                    }}
                                />
                                </FormControl>
                                <FormLabel className="font-normal">{unit}</FormLabel>
                            </FormItem>
                            )
                        }}
                        />
                    ))}
                    </div>
                    <FormMessage />
                    </FormItem>
                )}
                />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                 <FormField
                    control={form.control}
                    name="clusterCount"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Number of Question Clusters: {field.value}</FormLabel>
                        <FormControl>
                        <Slider min={1} max={5} step={1} value={[field.value]} onValueChange={(values) => field.onChange(values[0])} />
                        </FormControl>
                    </FormItem>
                    )}
                />
                 <FormField
                    control={form.control}
                    name="dokLevel"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Depth of Knowledge (DOK) Level: {field.value}</FormLabel>
                        <FormControl>
                        <Slider min={1} max={4} step={1} value={[field.value]} onValueChange={(values) => field.onChange(values[0])}/>
                        </FormControl>
                    </FormItem>
                    )}
                />
              </div>
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

      {isLoading && <GeneratingAnimation />}
      
      {testPackage?.map(item => (
        <CollapsibleSection key={item.id} title={item.title} contentItem={{...item, content: item.content as any}}>
            <StyledContentDisplay content={item.content} type={item.type} />
        </CollapsibleSection>
      ))}

      {isToolLoading && (
        <CollapsibleSection title={`Generating ${isToolLoading}...`} contentItem={{id: 'loading', title: `Generating ${isToolLoading}...`, content: '', type: 'Test'}}>
            <GeneratingAnimation />
        </CollapsibleSection>
      )}

      {testPackage && <RightSidebar onToolClick={(toolName) => handleToolClick(toolName as any)} isGenerating={!!isToolLoading} isHighlighting={isHighlightingTools} toolset="test" />}

    </div>
    </div>
    </>
  );
};

export default function NVBiologyTestGenerator() {
    const { hasScienceSubscription } = useAuth();
    return hasScienceSubscription ? <GeneratorContent /> : <SubscriptionPrompt />;
}
