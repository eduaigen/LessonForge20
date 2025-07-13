'use client';

import { useState, useEffect } from 'react';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { generateLabExperiment } from '@/ai/flows/generate-lab';
import { curriculumData } from '@/lib/curriculum-data';
import AiToolContainer from './AiToolContainer';
import LabResultDisplay from './LabResultDisplay';

const scienceSubjects = ['Biology', 'Chemistry', 'Physics'];

const FormSchema = z.object({
  gradeLevel: z.coerce.number(),
  subject: z.string().refine((val) => scienceSubjects.includes(val)),
  topic: z.string().min(1, 'Please select a topic.'),
  lessonDescription: z.string().min(10, {
    message: 'Please provide a brief lesson description of at least 10 characters.',
  }),
});

export default function LabGenerator() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<any | null>(null);
  const [units, setUnits] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      lessonDescription: '',
    },
  });

  const selectedGrade = form.watch('gradeLevel');
  const selectedSubject = form.watch('subject');
  const selectedUnit = form.watch('unit'); // we need a unit field in the form state but not in the schema

  useEffect(() => {
    if (selectedGrade && selectedSubject) {
      const availableUnits =
        curriculumData.content[selectedSubject]?.[selectedGrade]?.units;
      setUnits(availableUnits ? Object.keys(availableUnits) : []);
      form.setValue('unit', '');
      form.setValue('topic', '');
    }
  }, [selectedGrade, selectedSubject, form]);

  useEffect(() => {
    if (selectedUnit && selectedGrade && selectedSubject) {
      const availableTopics =
        curriculumData.content[selectedSubject]?.[selectedGrade]?.units[
          selectedUnit
        ]?.topics;
      setTopics(availableTopics || []);
      form.setValue('topic', '');
    }
  }, [selectedUnit, selectedGrade, selectedSubject, form]);

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await generateLabExperiment(data);
      setResult(response);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to generate lab. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AiToolContainer
      title="Lab Generator"
      description="For science subjects, generate a lab experiment with safety guidelines and procedures based on your lesson."
      isLoading={isLoading}
      result={result ? <LabResultDisplay data={result} /> : null}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <FormField
              control={form.control}
              name="gradeLevel"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Grade</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(parseInt(value))}
                    defaultValue={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select grade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {curriculumData.grades.map((grade) => (
                        <SelectItem key={grade} value={grade.toString()}>
                          {grade}th
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select subject" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {scienceSubjects.map((subject) => (
                        <SelectItem key={subject} value={subject}>
                          {subject}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="unit"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Unit</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={!selectedSubject || !selectedGrade}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a unit" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="topic"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Topic</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  disabled={!selectedUnit}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a topic" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {topics.map((topic) => (
                      <SelectItem key={topic} value={topic}>
                        {topic}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lessonDescription"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lesson Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Briefly describe the core concepts of the lesson this lab is for."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Generating...' : 'Generate Lab'}
          </Button>
        </form>
      </Form>
    </AiToolContainer>
  );
}
