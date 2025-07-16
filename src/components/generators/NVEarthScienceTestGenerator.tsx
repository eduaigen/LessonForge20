
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
import { Loader2, Sparkles, Wand2, FlaskConical, Orbit } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { earthScienceCurriculum } from '@/lib/earth-science-curriculum';
import { generateNVEarthScienceTest } from '@/ai/flows/generate-nv-earth-science-test';
import GeneratingAnimation from '../common/GeneratingAnimation';
import { useAuth } from '@/context/AuthContext';
import CollapsibleSection from '../common/CollapsibleSection';
import StyledContentDisplay from '../common/StyledContentDisplay';
import RightSidebar, { type ToolName } from '../common/RightSidebar';
import { Checkbox } from '@/components/ui/checkbox';
import { generateDifferentiatedTest } from '@/ai/flows/generate-test-differentiated';
import { generateEnhancedTest } from '@/ai/flows/generate-test-enhanced';
import { generateTestStudySheet } from '@/ai/flows/generate-test-study-sheet';

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
                    The NV Earth Science Test Generator requires a Science curriculum subscription. Subscribe now to create powerful, standards-aligned assessments.
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
  const [isToolLoading, setIsToolLoading] = useState<ToolName | null>(null);
  const [testPackage, setTestPackage] = useState<TestGeneratedContent[] | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      units: [],
      dokLevel: 2,
      clusterCount: 3,
    },
  });

  const units = useMemo(() => Object.keys(earthScienceCurriculum.units), []);

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setTestPackage(null);
    try {
      const result = await generateNVEarthScienceTest(values);

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

      setTestPackage([testContent, answerKeyContent]);
      
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

        switch (toolName) {
            case 'Study Sheet':
                result = await generateTestStudySheet({ originalTest: originalTestContent.content });
                newContent = { id: `study-sheet-${Date.now()}`, title: result.title, content: result, type: 'Study Sheet' };
                break;
            case 'Differentiated Version':
                result = await generateDifferentiatedTest({ originalTest: originalTestContent.content });
                newContent = { id: `differentiated-${Date.now()}`, title: result.testTitle, content: result, type: 'Differentiated Version' };
                break;
            case 'Enhanced Version':
                result = await generateEnhancedTest({ originalTest: originalTestContent.content });
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
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
      <div className="md:col-span-12 relative">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-full shadow-lg mb-8">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Orbit className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-headline">NV Earth Science Test Generator</CardTitle>
                  <CardDescription>Create a custom, cluster-based test aligned to the New Visions Earth Science curriculum.</CardDescription>
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
                        <p className="text-sm text-muted-foreground">Choose one or more units to include in the test.</p>
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

      {testPackage && <RightSidebar onToolClick={(toolName) => handleToolClick(toolName as any)} isGenerating={!!isToolLoading} isHighlighting={false} toolset="test" />}

    </div>
    </div>
    </>
  );
};

export default function NVEarthScienceTestGenerator() {
    const { hasScienceSubscription } = useAuth();
    return hasScienceSubscription ? <GeneratorContent /> : <SubscriptionPrompt />;
}
