
'use client';

import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Loader2, TestTube, Sparkles, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { nvBiologyCurriculum } from '@/lib/nv-biology-curriculum';
import {
  generateNVBiologyTest,
  type GenerateNVBiologyTestOutput,
} from '@/ai/flows/generate-nv-biology-test';
import GeneratingAnimation from '../common/GeneratingAnimation';
import { useAuth } from '@/context/AuthContext';
import CollapsibleSection from '../common/CollapsibleSection';
import StyledContentDisplay from '../common/StyledContentDisplay';

const formSchema = z.object({
  unit: z.string().min(1, { message: 'Please select a unit.' }),
  topic: z.string().min(1, { message: 'Please select a topic.' }),
  questionCount: z.number().min(4).max(20),
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
  const [isLoading, setIsLoading] = useState(false);
  const [generatedTest, setGeneratedTest] = useState<GenerateNVBiologyTestOutput | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      unit: '',
      topic: '',
      questionCount: 10,
    },
  });

  const units = useMemo(() => Object.keys(nvBiologyCurriculum.units), []);
  const selectedUnit = form.watch('unit');
  const topics = useMemo(() => {
    if (!selectedUnit) return [];
    const unitData = nvBiologyCurriculum.units[selectedUnit as keyof typeof nvBiologyCurriculum.units];
    return unitData ? Object.keys(unitData.topics) : [];
  }, [selectedUnit]);

  async function onSubmit(values: FormData) {
    setIsLoading(true);
    setGeneratedTest(null);
    try {
      const result = await generateNVBiologyTest(values);
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
  
  const TestDisplay = ({ test }: { test: GenerateNVBiologyTestOutput }) => (
    <div className="document-view">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold font-headline text-primary">{test.testTitle}</h1>
      </header>

      {test.multipleChoiceQuestions.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold font-headline text-primary mb-4">Multiple Choice</h2>
          <ol className="list-decimal pl-5 space-y-6">
            {test.multipleChoiceQuestions.map((q, i) => (
              <li key={i}>
                <p>{q.question}</p>
                <ul className="list-[lower-alpha] pl-6 mt-2 space-y-1">
                  {q.options.map(opt => <li key={opt}>{opt}</li>)}
                </ul>
              </li>
            ))}
          </ol>
        </section>
      )}

      {test.shortAnswerQuestions.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold font-headline text-primary mb-4">Short Answer</h2>
          <ol className="list-decimal pl-5 space-y-6">
            {test.shortAnswerQuestions.map((q, i) => (
              <li key={i}>
                <p>{q.question}</p>
                <div className="my-2 h-24 border-b border-dashed"></div>
              </li>
            ))}
          </ol>
        </section>
      )}
    </div>
  );

  const AnswerKeyDisplay = ({ test }: { test: GenerateNVBiologyTestOutput }) => (
    <div className="document-view">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold font-headline text-primary">Answer Key: {test.testTitle}</h1>
      </header>
       {test.multipleChoiceQuestions.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold font-headline text-primary mb-4">Multiple Choice Answers</h2>
          <ol className="list-decimal pl-5 space-y-2">
            {test.answerKey.multipleChoice.map((ans, i) => <li key={i}>{ans}</li>)}
          </ol>
        </section>
      )}
      {test.shortAnswerQuestions.length > 0 && (
        <section>
          <h2 className="text-2xl font-bold font-headline text-primary mb-4">Short Answer Sample Responses</h2>
          <ol className="list-decimal pl-5 space-y-4">
             {test.answerKey.shortAnswer.map((ans, i) => (
               <li key={i}>
                 <p><strong>Question:</strong> {test.shortAnswerQuestions[i].question}</p>
                 <p><strong>Sample Answer:</strong> {ans}</p>
               </li>
             ))}
          </ol>
        </section>
      )}
    </div>
  );

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
                  <CardTitle className="text-2xl font-headline">NV Biology Test Generator</CardTitle>
                  <CardDescription>Create a custom test based on the New Visions Biology curriculum.</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="unit"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Select Unit</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a unit" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {units.map((unit) => <SelectItem key={unit} value={unit}>{unit}</SelectItem>)}
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
                      <FormLabel>Select Topic</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value} disabled={!selectedUnit}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a topic" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {topics.map((topic) => <SelectItem key={topic} value={topic}>{topic}</SelectItem>)}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="questionCount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Questions: {field.value}</FormLabel>
                    <FormControl>
                      <Slider
                        min={4} max={20} step={2}
                        value={[field.value]}
                        onValueChange={(values) => field.onChange(values[0])}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
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
           <CollapsibleSection title={generatedTest.testTitle} contentItem={{id: 'test', title: 'Test', content: generatedTest, type: 'Test'}}>
              <TestDisplay test={generatedTest} />
           </CollapsibleSection>
           <CollapsibleSection title="Answer Key" contentItem={{id: 'answer-key', title: 'Answer Key', content: generatedTest, type: 'Test'}}>
              <AnswerKeyDisplay test={generatedTest} />
           </CollapsibleSection>
        </>
      )}
    </>
  );
};

export default function NVBiologyTestGenerator() {
    const { hasScienceSubscription } = useAuth();
    return hasScienceSubscription ? <GeneratorContent /> : <SubscriptionPrompt />;
}
