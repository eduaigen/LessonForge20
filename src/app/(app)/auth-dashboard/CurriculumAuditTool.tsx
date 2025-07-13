'use client';

import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
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
  curriculumAudit,
  type CurriculumAuditOutput,
} from '@/ai/flows/curriculum-audit';
import AiToolContainer from '../dashboard/AiToolContainer';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const FormSchema = z.object({
  document: z.string().min(50, {
    message: 'Please paste at least 50 characters from your curriculum document.',
  }),
});

const ResultDisplay = ({ data }: { data: CurriculumAuditOutput }) => (
  <div className="space-y-6">
    <Alert className="border-primary/50">
      <Rocket className="h-4 w-4" />
      <AlertTitle className="font-bold">Exclusive Subscriber Benefit</AlertTitle>
      <AlertDescription>
        This powerful simplification is just one of many premium features designed to streamline your curriculum planning.
      </AlertDescription>
    </Alert>

    <h3 className="font-headline text-2xl font-bold text-primary">
      {data.analysisOf}
    </h3>

    <div>
      <h4 className="font-headline font-semibold text-lg mb-2">Core Learning Objectives</h4>
      <ul className="list-disc pl-5 space-y-1">
        {data.coreLearningObjectives.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>

    <div>
      <h4 className="font-headline font-semibold text-lg mb-2">Key Concepts & Content Areas</h4>
      <ul className="list-disc pl-5 space-y-1">
        {data.keyConcepts.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
    
    <div>
      <h4 className="font-headline font-semibold text-lg mb-2">Essential Questions</h4>
      <ul className="list-disc pl-5 space-y-1">
        {data.essentialQuestions.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>

    <div>
      <h4 className="font-headline font-semibold text-lg mb-2">Key Skills Emphasized</h4>
      <ul className="list-disc pl-5 space-y-1">
        {data.keySkills.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>

    <div>
      <h4 className="font-headline font-semibold text-lg mb-2">Typical Assessment Points</h4>
       <ul className="list-disc pl-5 space-y-1">
        {data.assessmentPoints.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
    
    {data.standardsAlignment && data.standardsAlignment.length > 0 && (
      <div>
        <h4 className="font-headline font-semibold text-lg mb-2">Aligned Standards (Identified)</h4>
        <ul className="list-disc pl-5 space-y-1">
          {data.standardsAlignment.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      </div>
    )}
  </div>
);

export default function CurriculumAuditTool() {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<CurriculumAuditOutput | null>(null);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      document: '',
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsLoading(true);
    setResult(null);
    try {
      const response = await curriculumAudit(data);
      setResult(response);
    } catch (error) {
      console.error(error);
      toast({
        title: 'Error',
        description: 'Failed to audit curriculum. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AiToolContainer
      title="Curriculum Audit Simplification Tool"
      description="Paste your existing curriculum documents to distill them into clear, concise, and actionable summaries."
      isLoading={isLoading}
      result={result ? <ResultDisplay data={result} /> : null}
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="document"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Curriculum Document</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Paste a unit plan, syllabus, pacing guide, etc."
                    className="min-h-[200px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={isLoading}>
            {isLoading ? 'Auditing...' : 'Simplify My Curriculum'}
          </Button>
        </form>
      </Form>
    </AiToolContainer>
  );
}
