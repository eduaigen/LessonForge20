'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  refineLearningObjective,
  type RefineLearningObjectiveOutput,
} from '@/ai/flows/refine-learning-objective';
import AiToolContainer from './AiToolContainer';
import { Rocket } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const FormSchema = z.object({
  objective: z.string().min(10, {
    message: 'Objective must be at least 10 characters.',
  }),
});

const SubscriptionCTA = () => (
  <Alert className="mt-6 border-primary/50 text-primary">
    <Rocket className="h-4 w-4" />
    <AlertTitle className="font-bold">Supercharge your teaching!</AlertTitle>
    <AlertDescription>
      This is just a glimpse of what our premium subscription offers. Get
      unlimited generations, advanced customization, and exclusive features to
      transform your classroom.{' '}
      <Link href="/pricing" className="font-semibold underline">
        Explore Premium Features
      </Link>
    </AlertDescription>
  </Alert>
);

const ResultDisplay = ({ data }: { data: RefineLearningObjectiveOutput }) => (
  <div className="space-y-4">
    <div>
      <h4 className="font-headline font-semibold mb-1">Original Objective</h4>
      <p className="rounded-md bg-muted/80 p-3 italic">
        "{data.originalObjective}"
      </p>
    </div>
    <div>
      <h4 className="font-headline font-semibold mb-1">Refined Objectives</h4>
      <ul className="list-disc pl-5 space-y-2">
        {data.refinedObjectives.map((obj, i) => (
          <li key={i}>{obj}</li>
        ))}
      </ul>
    </div>
    <div>
      <h4 className="font-headline font-semibold mb-1">
        Explanation of Refinement
      </h4>
      <p>{data.explanation}</p>
    </div>
    <div>
      <h4 className="font-headline font-semibold mb-1">
        Tips for Writing Learning Objectives
      </h4>
      <p>{data.tips}</p>
    </div>
    <SubscriptionCTA />
  </div>
);

export default function ObjectiveRefiner() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<RefineLearningObjectiveOutput | null>(
    null
  );
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      objective: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await refineLearningObjective(data);
      setResult({ ...response, originalObjective: data.objective });
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to refine objective. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AiToolContainer
      title="Learning Objective Refiner"
      description="Input a learning objective, and AI will help refine it to be SMART (Specific, Measurable, Achievable, Relevant, Time-bound) and student-centered."
      isLoading={isLoading}
      result={result ? <ResultDisplay data={result} /> : null}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="objective"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Original Learning Objective</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Students will learn about photosynthesis."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Refining...' : 'Refine Objective'}
          </Button>
        </form>
      </Form>
    </AiToolContainer>
  );
}
