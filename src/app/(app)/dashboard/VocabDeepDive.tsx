'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

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
import { vocabDeepDive, type VocabDeepDiveOutput } from '@/ai/flows/vocab-deep-dive';
import AiToolContainer from './AiToolContainer';

const FormSchema = z.object({
  term: z.string().min(2, {
    message: 'Term must be at least 2 characters.',
  }),
});

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

  const ResultDisplay = ({ data }: { data: VocabDeepDiveOutput }) => (
    <div className="space-y-4">
      <div>
        <h4 className="font-headline font-semibold mb-1">Definition</h4>
        <p>{data.definition}</p>
      </div>
      <div>
        <h4 className="font-headline font-semibold mb-1">Example Sentence</h4>
        <p className='italic'>"{data.exampleSentence}"</p>
      </div>
      <div>
        <h4 className="font-headline font-semibold mb-1">Common Misconceptions</h4>
        <p>{data.commonMisconceptions}</p>
      </div>
      <div>
        <h4 className="font-headline font-semibold mb-1">Real-World Connections</h4>
        <p>{data.realWorldConnections}</p>
      </div>
    </div>
  );

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
