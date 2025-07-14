
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
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import {
  vocabDeepDive,
  type VocabDeepDiveOutput,
} from '@/ai/flows/vocab-deep-dive';
import AiToolContainer from './AiToolContainer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import StyledContentDisplay from '@/components/common/StyledContentDisplay';


const FormSchema = z.object({
  term: z.string().min(2, {
    message: 'Term must be at least 2 characters.',
  }),
});

const ResultDisplay = ({ data }: { data: VocabDeepDiveOutput }) => (
  <div className="prose prose-sm max-w-none dark:prose-invert">
    <StyledContentDisplay content={data.vocabAnalysis} />
    <Alert className="mt-6 border-primary/50 text-primary">
      <Rocket className="h-4 w-4" />
      <AlertTitle className="font-bold">Dive even deeper into language!</AlertTitle>
      <AlertDescription>
        Our premium subscription unlocks personalized vocabulary lists,
        interactive flashcards, and advanced linguistic analysis for any text.{' '}
        <Link href="/pricing" className="font-semibold underline">
          Explore Premium Features
        </Link>
      </AlertDescription>
    </Alert>
  </div>
);

export default function VocabDeepDive() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<VocabDeepDiveOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      term: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await vocabDeepDive(data);
      setResult(response);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to generate deep dive. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AiToolContainer
      title="Vocab Deep Dive"
      description="Provide a vocabulary term to generate a definition, example sentence, common misconceptions, and real-world connections."
      isLoading={isLoading}
      result={result ? <ResultDisplay data={result} /> : null}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="term"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Vocabulary Term</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Photosynthesis" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Deep Dive'}
          </Button>
        </form>
      </Form>
    </AiToolContainer>
  );
}
