'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2, BrainCircuit, Lightbulb, ListChecks } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { explainConcept, type ExplainConceptInput, type ExplainConceptOutput } from '@/ai/flows/concept-explainer';
import GeneratingAnimation from '@/components/common/GeneratingAnimation';

const formSchema = z.object({
  concept: z.string().min(3, { message: 'Concept must be at least 3 characters.' }),
});

export default function ConceptExplainerGenerator() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<ExplainConceptOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { concept: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setOutput(null);
    try {
      const result = await explainConcept(values.concept);
      setOutput(result);
    } catch (error) {
      console.error('Concept explanation failed:', error);
      toast({
        title: 'Generation Failed',
        description: 'An error occurred while generating the explanation. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <BrainCircuit className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-2xl font-headline">Concept Explainer</CardTitle>
            <CardDescription>Get a clear, grade-appropriate explanation for any concept.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="concept"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Concept or Question</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Photosynthesis, The Cold War, Dramatic Irony" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Generating...' : 'Explain Concept'}
            </Button>
          </form>
        </Form>

        {isLoading && (
            <div className="mt-8">
                <GeneratingAnimation />
            </div>
        )}

        {output && (
          <div className="mt-8 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-primary">
                  <Lightbulb className="h-5 w-5" />
                  <span>Explanation</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed">{output.explanation}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-primary">
                  <BrainCircuit className="h-5 w-5" />
                  <span>Analogy</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed">{output.analogy}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-primary">
                  <ListChecks className="h-5 w-5" />
                  <span>Key Points</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="list-disc space-y-2 pl-5">
                  {output.keyPoints.map((point, index) => (
                    <li key={index} className="text-base">{point}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
