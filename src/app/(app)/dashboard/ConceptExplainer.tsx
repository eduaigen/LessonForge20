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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { explainConcept } from '@/ai/flows/explain-concept';
import { curriculumData } from '@/lib/curriculum-data';
import AiToolContainer from './AiToolContainer';

const FormSchema = z.object({
  concept: z.string().min(10, {
    message: 'Please enter a concept or question of at least 10 characters.',
  }),
  gradeLevel: z.coerce.number(),
});

export default function ConceptExplainer() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      concept: '',
      gradeLevel: 9,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await explainConcept(data);
      setResult(response.explanation);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description:
          'Failed to generate explanation. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AiToolContainer
      title="Concept Explainer"
      description="Enter a concept or question and select a grade level to get a clear, concise explanation suitable for students."
      isLoading={isLoading}
      result={result}
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
          <FormField
            control={form.control}
            name="gradeLevel"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Grade Level</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(parseInt(value))}
                  defaultValue={field.value.toString()}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a grade" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {curriculumData.grades.map((grade) => (
                      <SelectItem key={grade} value={grade.toString()}>
                        {`${grade}th Grade`}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
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
