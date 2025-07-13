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
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { refineLearningObjective } from '@/ai/flows/refine-learning-objective';
import AiToolContainer from './AiToolContainer';

const FormSchema = z.object({
  objective: z.string().min(10, {
    message: 'Objective must be at least 10 characters.',
  }),
});

export default function ObjectiveRefiner() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
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
      setResult(response.refinedObjective);
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
      result={result}
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
