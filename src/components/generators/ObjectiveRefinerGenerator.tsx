'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Loader2, Target, CheckCircle, Lightbulb } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { refineObjective, type RefineObjectiveInput, type RefineObjectiveOutput } from '@/ai/flows/objective-refiner';
import { curriculumData } from '@/lib/curriculum-data';

const formSchema = z.object({
  objective: z.string().min(10, { message: 'Objective must be at least 10 characters.' }),
  subject: z.string().min(1, { message: 'Please select a subject.' }),
});

export default function ObjectiveRefinerGenerator() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [output, setOutput] = useState<RefineObjectiveOutput | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { objective: '', subject: '' },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setOutput(null);
    try {
      const result = await refineObjective(values as RefineObjectiveInput);
      setOutput(result);
    } catch (error) {
      console.error('Objective refinement failed:', error);
      toast({
        title: 'Generation Failed',
        description: 'An error occurred while refining the objective. Please try again.',
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
            <Target className="h-6 w-6" />
          </div>
          <div>
            <CardTitle className="text-2xl font-headline">Learning Objective Refiner</CardTitle>
            <CardDescription>Transform your learning objectives to be SMART.</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="objective"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Current Objective</FormLabel>
                  <FormControl>
                    <Textarea placeholder="e.g., Students will learn about photosynthesis." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isLoading ? 'Refining...' : 'Refine Objective'}
            </Button>
          </form>
        </Form>

        {isLoading && (
            <div className="mt-8 text-center text-muted-foreground">
                <Loader2 className="mx-auto h-8 w-8 animate-spin text-primary mb-4" />
                <p>Making your objective SMARTer...</p>
            </div>
        )}

        {output && (
          <div className="mt-8 space-y-6 animate-fade-in">
            <Card className="bg-muted/30">
                <CardHeader>
                    <CardTitle className="text-lg">Original Objective</CardTitle>
                </CardHeader>
                <CardContent>
                    <p className="italic text-muted-foreground">"{output.originalObjective}"</p>
                </CardContent>
            </Card>

            <h3 className="text-xl font-headline text-center text-primary">Refined SMART Objective</h3>
            
            <div className="space-y-4">
                {(Object.keys(output.refinedObjective) as (keyof typeof output.refinedObjective)[]).map((key) => (
                    <div key={key} className="flex items-start gap-4">
                        <div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-lg">
                           {key.charAt(0)}
                        </div>
                        <div>
                            <h4 className="font-semibold">{key}</h4>
                            <p className="text-muted-foreground">{output.refinedObjective[key]}</p>
                        </div>
                    </div>
                ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-primary">
                  <Lightbulb className="h-5 w-5" />
                  <span>Suggestion for Improvement</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-base leading-relaxed">{output.suggestion}</p>
              </CardContent>
            </Card>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
