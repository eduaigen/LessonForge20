
'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Link from 'next/link';
import { Rocket } from 'lucide-react';
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
  explainConcept,
  type ExplainConceptOutput,
} from '@/ai/flows/explain-concept';
import AiToolContainer from './AiToolContainer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import StyledContentDisplay from '@/components/common/StyledContentDisplay';

const FormSchema = z.object({
  concept: z.string().min(10, {
    message: 'Please enter a concept or question of at least 10 characters.',
  }),
});

const ResultDisplay = ({ data }: { data: ExplainConceptOutput }) => (
  <div className="prose prose-sm max-w-none dark:prose-invert">
    <StyledContentDisplay content={data.explanation} />
    <Alert className="mt-6 border-primary/50 text-primary">
      <Rocket className="h-4 w-4" />
      <AlertTitle className="font-bold">Unlock deeper understanding!</AlertTitle>
      <AlertDescription>
        Our premium subscription offers interactive concept maps, personalized
        learning paths, and even AI-generated quizzes to solidify comprehension.{' '}
        <Link href="/pricing" className="font-semibold underline">
          Explore Premium Features
        </Link>
      </AlertDescription>
    </Alert>
  </div>
);

export default function ConceptExplainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ExplainConceptOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      concept: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await explainConcept(data);
      setResult(response);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to generate explanation. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AiToolContainer
      title="Concept Explainer"
      description="Enter a concept or question to get a clear, concise explanation suitable for students."
      isLoading={isLoading}
      result={result ? <ResultDisplay data={result} /> : null}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="concept"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Concept or Question</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="e.g., Explain the difference between nuclear fission and fusion."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Explanation'}
          </Button>
        </form>
      </Form>
    </AiToolContainer>
  );
}
