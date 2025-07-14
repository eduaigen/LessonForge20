'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Loader2, BookOpenText, Target, Users, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { vocabularyDeepDive, type VocabularyDeepDiveOutput } from '@/ai/flows/vocabulary-deep-dive';
import GeneratingAnimation from '@/components/common/GeneratingAnimation';

const formSchema = z.object({
  term: z.string().min(2, { message: 'Term must be at least 2 characters.' }),
});

export default function VocabularyGenerator() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<VocabularyDeepDiveOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { term: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setOutput(null);
    try {
      const result = await vocabularyDeepDive(values.term);
      setOutput(result);
    } catch (error) {
      console.error('Vocabulary deep dive failed:', error);
      toast({
        title: 'Generation Failed',
        description: 'An error occurred while generating the vocabulary content. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }
  
  const ResultCard = ({ title, content, icon }: { title: string, content: string, icon: React.ReactNode }) => (
    <Card>
        <CardHeader>
            <CardTitle className="flex items-center gap-2 text-xl text-primary">
                {icon}
                <span>{title}</span>
            </CardTitle>
        </CardHeader>
        <CardContent>
            <p className="text-base leading-relaxed">{content}</p>
        </CardContent>
    </Card>
  );

  return (
    <Card className="w-full shadow-lg">
      <CardHeader>
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
            <BookOpenText className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-2xl font-headline">Vocabulary Deep Dive</CardTitle>
            <CardDescription>Generate rich, contextual content for any vocabulary term.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="term"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vocabulary Term</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Photosynthesis, Imperialism, Irony" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Generating...' : 'Generate Deep Dive'}
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
            <h2 className="text-3xl font-headline text-center">
              Deep Dive: <span className="text-primary">{output.term}</span>
            </h2>
            <ResultCard title="Definition" content={output.definition} icon={<BookOpenText className="h-5 w-5" />} />
            <ResultCard title="In-Context Example" content={output.inContextExample} icon={<Target className="h-5 w-5" />} />
            <ResultCard title="Common Misconceptions" content={output.commonMisconceptions} icon={<Users className="h-5 w-5" />} />
            <ResultCard title="Real-World Connection" content={output.realWorldConnection} icon={<Globe className="h-5 w-5" />} />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
