'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, BrainCircuit, Lightbulb, ListChecks } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { explainConcept, type ExplainConceptInput, type ExplainConceptOutput } from '@/ai/flows/concept-explainer';
import { curriculumData } from '@/lib/curriculum-data';

const formSchema = z.object({
  concept: z.string().min(3, { message: 'Concept must be at least 3 characters.' }),
  subject: z.string().min(1, { message: 'Please select a subject.' }),
  gradeLevel: z.string().min(1, { message: 'Please select a grade level.' }),
});

const gradeLevels = Array.from({ length: 7 }, (_, i) => `${i + 6}th Grade`);

export default function ConceptExplainerGenerator() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<ExplainConceptOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { concept: '', subject: '', gradeLevel: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setOutput(null);
    try {
      const result = await explainConcept(values as ExplainConceptInput);
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
                  <FormLabel>Concept</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., Photosynthesis, The Cold War, Dramatic Irony" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a subject" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {curriculumData.subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="gradeLevel"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Grade Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger><SelectValue placeholder="Select a grade level" /></SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {gradeLevels.map((grade) => (
                          <SelectItem key={grade} value={grade}>{grade}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Generating...' : 'Explain Concept'}
            </Button>
          </form>
        </Form>

        {isLoading && (
            <div className="mt-8 text-center text-muted-foreground">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary mb-4" />
                <p>Crafting the perfect explanation...</p>
            </div>
        )}

        {output && (
          <div className="mt-8 space-y-6 animate-fade-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-primary">
                  <BrainCircuit className="h-5 w-5" />
                  <span>Explanation of: {output.explanation.substring(0,50)}...</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed">{output.explanation}</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl text-primary">
                  <Lightbulb className="h-5 w-5" />
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
