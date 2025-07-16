
'use client';

import React, { useState, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Loader2, TestTube, Sparkles, Wand2, FlaskConical, Atom, Leaf, Orbit, Magnet, HeartPulse, Stethoscope } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateScienceTest, type GenerateScienceTestOutput } from '@/ai/flows/generate-science-test';
import GeneratingAnimation from '../common/GeneratingAnimation';
import { useAuth } from '@/context/AuthContext';
import CollapsibleSection from '../common/CollapsibleSection';
import StyledContentDisplay from '../common/StyledContentDisplay';
import { nvBiologyCurriculum } from '@/lib/nv-biology-curriculum';
import { apBiologyCurriculum } from '@/lib/ap-biology-curriculum';
import { chemistryCurriculum } from '@/lib/chemistry-curriculum';
import { earthScienceCurriculum } from '@/lib/earth-science-curriculum';
import { physicsCurriculum } from '@/lib/physics-curriculum';
import { anatomyPhysiologyCurriculum } from '@/lib/anatomy-physiology-curriculum';
import { healthCurriculum } from '@/lib/health-curriculum';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const curriculums = {
  'NV Biology': nvBiologyCurriculum,
  'AP Biology': apBiologyCurriculum,
  'NGSS Chemistry': chemistryCurriculum,
  'NV Earth Science': earthScienceCurriculum,
  'NGSS Physics': physicsCurriculum,
  'Anatomy & Physiology': anatomyPhysiologyCurriculum,
  'Health': healthCurriculum,
};

type Subject = keyof typeof curriculums;

const formSchema = z.object({
  subject: z.string().min(1, { message: 'Please select a subject.' }),
  units: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: 'You have to select at least one unit.',
  }),
  clusterCount: z.number().min(1).max(10),
  dokLevel: z.number().min(1).max(3),
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
                    The Science Test Generator requires a Science curriculum subscription. Subscribe now to create powerful, standards-aligned assessments.
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
  const [generatedTest, setGeneratedTest] = useState<GenerateScienceTestOutput | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: 'NV Biology',
      units: [],
      clusterCount: 3,
      dokLevel: 2,
    },
  });

  const { watch, setValue } = form;
  const selectedSubject = watch('subject') as Subject;

  const unitOptions = useMemo(() => {
    if (!selectedSubject || !curriculums[selectedSubject]) return [];
    const curriculum = curriculums[selectedSubject];
    // @ts-ignore
    return curriculum ? Object.keys(curriculum.units) : [];
  }, [selectedSubject]);

  const handleSubjectChange = (subject: Subject) => {
    setValue('subject', subject);
    setValue('units', []);
  }

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setGeneratedTest(null);
    try {
      const curriculum = curriculums[values.subject as Subject];
      const selectedUnitsContent = values.units.reduce((acc, unitName) => {
        // @ts-ignore
        if (curriculum && curriculum.units[unitName]) {
          // @ts-ignore
          acc[unitName] = curriculum.units[unitName];
        }
        return acc;
      }, {} as any);

      const result = await generateScienceTest({
        ...values,
        curriculumContent: JSON.stringify(selectedUnitsContent, null, 2),
      });

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
  
  const TestDisplay = ({ test }: { test: GenerateScienceTestOutput }) => (
    <div className="document-view">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold font-headline text-primary">{test.testTitle}</h1>
      </header>
       {test.clusters.map((cluster, i) => (
         <section key={i} className="mb-8 border-t pt-6">
           <h2 className="text-2xl font-bold font-headline text-primary mb-4">{cluster.clusterTitle}</h2>
           <div className="prose prose-lg max-w-none mb-4">
             <StyledContentDisplay content={cluster.stimulus} type={'Worksheet'} />
           </div>
           <ol className="list-decimal pl-5 space-y-6">
             {cluster.questions.map((q, j) => (
                <li key={j}>
                    {'question' in q && <p>{q.question}</p>}
                    {'options' in q && q.options && (
                        <ul className="list-[lower-alpha] pl-6 mt-2 space-y-1">
                            {q.options.map(opt => <li key={opt}>{opt}</li>)}
                        </ul>
                    )}
                     {'sampleAnswer' in q && <div className="my-2 h-24 border-b border-dashed"></div>}
                </li>
             ))}
           </ol>
         </section>
       ))}
    </div>
  );
  
  const AnswerKeyDisplay = ({ test }: { test: GenerateScienceTestOutput }) => (
    <div className="document-view">
        <header className="text-center mb-8">
            <h1 className="text-3xl font-bold font-headline text-primary">Answer Key: {test.testTitle}</h1>
        </header>

        {test.answerKey.map((clusterAnswers, i) => (
             <section key={i} className="mb-8 border-t pt-6">
                 <h2 className="text-2xl font-bold font-headline text-primary mb-4">{clusterAnswers.clusterTitle}</h2>
                 <ol className="list-decimal pl-5 space-y-4">
                     {clusterAnswers.answers.map((ans, j) => (
                         <li key={j}>
                             <p><strong>Question:</strong> {ans.question}</p>
                             <p><strong>Answer:</strong> {ans.answer}</p>
                         </li>
                     ))}
                 </ol>
             </section>
        ))}
    </div>
  );

  const subjectTabs = [
    { name: 'NV Biology', icon: <Leaf className="h-4 w-4" /> },
    { name: 'AP Biology', icon: <Atom className="h-4 w-4" /> },
    { name: 'NGSS Chemistry', icon: <FlaskConical className="h-4 w-4" /> },
    { name: 'NV Earth Science', icon: <Orbit className="h-4 w-4" /> },
    { name: 'NGSS Physics', icon: <Magnet className="h-4 w-4" /> },
    { name: 'Anatomy & Physiology', icon: <Stethoscope className="h-4 w-4" /> },
    { name: 'Health', icon: <HeartPulse className="h-4 w-4" /> },
  ];

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Card className="w-full shadow-lg mb-8">
            <CardHeader>
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <TestTube className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-headline">Science Test Generator</CardTitle>
                  <CardDescription>Create assessments for any science curriculum by selecting units, clusters, and DOK level.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
               <Tabs value={selectedSubject} onValueChange={(value) => handleSubjectChange(value as Subject)}>
                    <TabsList className="grid w-full grid-cols-3 md:grid-cols-7">
                        {subjectTabs.map(tab => (
                            <TabsTrigger key={tab.name} value={tab.name}>
                                {tab.icon} <span className='ml-2 hidden md:inline-block'>{tab.name}</span>
                            </TabsTrigger>
                        ))}
                    </TabsList>
                </Tabs>
                <FormField
                    control={form.control}
                    name="units"
                    render={() => (
                        <FormItem>
                        <FormLabel className="text-base">Select Units</FormLabel>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {unitOptions.map((unit) => (
                            <FormField
                                key={unit}
                                control={form.control}
                                name="units"
                                render={({ field }) => {
                                return (
                                    <FormItem
                                    key={unit}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                    >
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
                                    <FormLabel className="font-normal">
                                        {unit}
                                    </FormLabel>
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="clusterCount"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Number of Question Clusters: {field.value}</FormLabel>
                        <FormControl>
                        <Slider
                            min={1} max={10} step={1}
                            value={[field.value]}
                            onValueChange={(values) => field.onChange(values[0])}
                        />
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
                        <Slider
                            min={1} max={3} step={1}
                            value={[field.value]}
                            onValueChange={(values) => field.onChange(values[0])}
                        />
                        </FormControl>
                    </FormItem>
                    )}
                  />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
                {isLoading ? 'Generating...' : 'Generate Test'}
              </Button>
            </CardContent>
          </Card>
        </form>
      </Form>

      {isLoading && <GeneratingAnimation />}
      
      {generatedTest && (
        <>
           <CollapsibleSection title={generatedTest.testTitle} contentItem={{id: 'test', title: 'Test', content: generatedTest, type: 'Worksheet'}}>
              <TestDisplay test={generatedTest} />
           </CollapsibleSection>
           <CollapsibleSection title="Answer Key" contentItem={{id: 'answer-key', title: 'Answer Key', content: generatedTest, type: 'Worksheet'}}>
              <AnswerKeyDisplay test={generatedTest} />
           </CollapsibleSection>
        </>
      )}
    </>
  );
};

export default function ScienceTestGenerator() {
    const { hasScienceSubscription } = useAuth();
    return hasScienceSubscription ? <GeneratorContent /> : <SubscriptionPrompt />;
}
