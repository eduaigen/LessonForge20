
'use client';

import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Sparkles, Wand2, FolderSync, Check, X, GraduationCap, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

import { auditCurriculum, type CurriculumAuditOutput } from '@/ai/flows/curriculum-audit';
import GeneratingAnimation from '../common/GeneratingAnimation';
import { useAuth } from '@/context/AuthContext';
import { allCurriculums, type Lesson } from '@/lib/all-curriculums';
import { educationalStandards } from '@/lib/educational-standards';


const formSchema = z.object({
  lesson: z.string().min(1, { message: 'Please select a lesson to audit.' }),
  auditStandard: z.string().min(1, { message: 'Please select a standard to audit against.' }),
});

type FormData = z.infer<typeof formSchema>;

const SubscriptionPrompt = () => (
    <div className="flex flex-1 items-center justify-center">
        <Card className="max-w-2xl text-center p-8 shadow-lg">
            <CardHeader>
                 <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sparkles className="h-8 w-8" />
                </div>
                <CardTitle className="font-headline text-3xl font-bold">Unlock This Premium Tool</CardTitle>
                <CardDescription>
                    The Curriculum Audit Tool is a premium feature. Subscribe now to analyze your curriculum, identify gaps, and get AI-powered suggestions for improvement.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <Button size="lg" asChild>
                    <Link href="/auth-dashboard">Return to Dashboard</Link>
                </Button>
            </CardContent>
        </Card>
    </div>
);

const AuditResultDisplay = ({ audit }: { audit: CurriculumAuditOutput }) => {
    const getGradeColor = (grade: string) => {
        switch (grade) {
            case 'A': return 'bg-green-100 text-green-800 border-green-300';
            case 'B': return 'bg-blue-100 text-blue-800 border-blue-300';
            case 'C': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
            case 'D': return 'bg-orange-100 text-orange-800 border-orange-300';
            case 'F': return 'bg-red-100 text-red-800 border-red-300';
            default: return 'bg-gray-100 text-gray-800 border-gray-300';
        }
    }
    
    return (
        <Card className="mt-8">
            <CardHeader>
                <CardTitle>Audit Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-24 h-24 rounded-full border-4 ${getGradeColor(audit.alignmentGrade)}`}>
                        <span className="text-5xl font-bold">{audit.alignmentGrade}</span>
                    </div>
                    <p className="flex-1 text-muted-foreground italic">{audit.auditSummary}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                    <Card>
                        <CardHeader><CardTitle className="text-lg">Strengths</CardTitle></CardHeader>
                        <CardContent>
                            <ul className="list-disc pl-5 space-y-2">
                                {audit.strengths.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader><CardTitle className="text-lg">Gaps & Misalignments</CardTitle></CardHeader>
                        <CardContent>
                           <ul className="list-disc pl-5 space-y-2">
                                {audit.gaps.map((item, i) => <li key={i}>{item}</li>)}
                            </ul>
                        </CardContent>
                    </Card>
                </div>
                <Card>
                    <CardHeader><CardTitle className="text-lg">Suggestions for Improvement</CardTitle></CardHeader>
                    <CardContent>
                        <ul className="list-decimal pl-5 space-y-3">
                            {audit.suggestionsForImprovement.map((item, i) => <li key={i}>{item}</li>)}
                        </ul>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader><CardTitle className="text-lg">Pedagogical Insights</CardTitle></CardHeader>
                    <CardContent className="space-y-4">
                        <div><h4 className="font-semibold">Simplify:</h4><p className="text-muted-foreground">{audit.pedagogicalInsights.simplify}</p></div>
                        <div><h4 className="font-semibold">Differentiate:</h4><p className="text-muted-foreground">{audit.pedagogicalInsights.differentiate}</p></div>
                        <div><h4 className="font-semibold">Engage:</h4><p className="text-muted-foreground">{audit.pedagogicalInsights.engage}</p></div>
                        <div><h4 className="font-semibold">Assess:</h4><p className="text-muted-foreground">{audit.pedagogicalInsights.assess}</p></div>
                    </CardContent>
                </Card>
            </CardContent>
        </Card>
    );
}

const GeneratorContent = () => {
    const { toast } = useToast();
    const [isLoading, setIsLoading] = useState(false);
    const [auditResult, setAuditResult] = useState<CurriculumAuditOutput | null>(null);
    const [currentlySelectedLesson, setCurrentlySelectedLesson] = useState<Lesson | null>(null);
    
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: { lesson: '', auditStandard: '' },
    });

    const handleLessonSelect = (lesson: Lesson) => {
        if (currentlySelectedLesson?.title === lesson.title) {
            setCurrentlySelectedLesson(null);
            form.setValue('lesson', '');
        } else {
            setCurrentlySelectedLesson(lesson);
            form.setValue('lesson', JSON.stringify(lesson));
        }
    };
    
    async function onSubmit(values: FormData) {
        if (!currentlySelectedLesson) {
          toast({ title: 'No Lesson Selected', description: 'Please select a lesson to audit.', variant: 'destructive' });
          return;
        }
        setIsLoading(true);
        setAuditResult(null);
        try {
            const lessonData = JSON.parse(values.lesson) as Lesson;
            const result = await auditCurriculum({
                lessonTitle: lessonData.title,
                lessonObjective: lessonData.objective,
                lessonStandard: lessonData.standard || '', // Pass empty string if standard is missing
                auditStandard: values.auditStandard,
            });
            setAuditResult(result);
        } catch (error) {
            console.error('Audit generation failed:', error);
            toast({ title: 'Audit Failed', description: 'An error occurred while auditing the curriculum.', variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="md:col-span-12 relative">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <Card className="w-full shadow-lg mb-8">
                        <CardHeader>
                            <div className="flex items-center gap-4">
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                                    <FolderSync className="h-6 w-6" />
                                </div>
                                <div>
                                    <CardTitle className="text-2xl font-headline">Curriculum Audit Tool</CardTitle>
                                    <CardDescription>Analyze a lesson against educational standards to identify gaps and get improvement suggestions.</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <FormField
                                control={form.control}
                                name="lesson"
                                render={() => (
                                    <FormItem>
                                        <FormLabel className="text-base">1. Select a Lesson to Audit</FormLabel>
                                        <Accordion type="single" collapsible className="w-full">
                                            {allCurriculums.map(subject => (
                                                <AccordionItem value={subject.name} key={subject.name}>
                                                    <AccordionTrigger>{subject.name}</AccordionTrigger>
                                                    <AccordionContent>
                                                        <Accordion type="single" collapsible className="w-full pl-4">
                                                            {subject.curriculum && subject.curriculum.units && Object.keys(subject.curriculum.units).map(unitKey => {
                                                                const unit = subject.curriculum.units[unitKey];
                                                                if (!unit) return null;
                                                                return (
                                                                    <AccordionItem value={unitKey} key={unitKey}>
                                                                        <AccordionTrigger>{unit.unit}</AccordionTrigger>
                                                                        <AccordionContent>
                                                                            <Accordion type="single" collapsible className="w-full pl-4">
                                                                                {unit.topics && Object.keys(unit.topics).map(topicKey => {
                                                                                    const topic = unit.topics[topicKey];
                                                                                    if (!topic) return null;
                                                                                    return (
                                                                                        <AccordionItem value={topicKey} key={topicKey}>
                                                                                            <AccordionTrigger>{topic.topic}</AccordionTrigger>
                                                                                            <AccordionContent>
                                                                                                <div className="space-y-2 pl-4">
                                                                                                    {topic.lessons.map((lesson: Lesson, index: number) => {
                                                                                                        const isSelected = currentlySelectedLesson?.title === lesson.title;
                                                                                                        return (
                                                                                                            <div key={index} className="flex items-center justify-between gap-4 p-2 rounded-md hover:bg-muted">
                                                                                                                <div className="flex-1">
                                                                                                                    <p className="font-semibold">{lesson.title}</p>
                                                                                                                    <p className="text-sm text-muted-foreground">{lesson.objective}</p>
                                                                                                                </div>
                                                                                                                <Button type="button" variant={isSelected ? "secondary" : "outline"} size="sm" onClick={() => handleLessonSelect(lesson)}>
                                                                                                                    {isSelected ? <><Check className="h-4 w-4 mr-2" />Selected</> : 'Select'}
                                                                                                                </Button>
                                                                                                            </div>
                                                                                                        );
                                                                                                    })}
                                                                                                </div>
                                                                                            </AccordionContent>
                                                                                        </AccordionItem>
                                                                                    );
                                                                                })}
                                                                            </Accordion>
                                                                        </AccordionContent>
                                                                    </AccordionItem>
                                                                );
                                                            })}
                                                        </Accordion>
                                                    </AccordionContent>
                                                </AccordionItem>
                                            ))}
                                        </Accordion>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                             <FormField
                                control={form.control}
                                name="auditStandard"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="text-base">2. Select a Standard to Audit Against</FormLabel>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger>
                                        <SelectValue placeholder="Select a standard framework..." />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {educationalStandards.map(standard => (
                                            <SelectItem key={standard.code} value={standard.name}>{standard.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />

                            <Button type="submit" disabled={isLoading} className="w-full">
                                {isLoading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Auditing...</> : <><Wand2 className="mr-2 h-4 w-4" />Run Audit</>}
                            </Button>
                        </CardContent>
                    </Card>
                </form>
            </Form>
            
            {isLoading && <div className="mt-8"><GeneratingAnimation /></div>}

            {auditResult && <AuditResultDisplay audit={auditResult} />}
        </div>
    );
};

export default function CurriculumAuditGenerator() {
    const { isSubscribed } = useAuth();
    return isSubscribed ? <GeneratorContent /> : <SubscriptionPrompt />;
}
