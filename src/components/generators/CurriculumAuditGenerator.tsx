
'use client';

import React, { useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Sparkles, Wand2, FolderSync } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { auditCurriculum, type CurriculumAuditOutput } from '@/ai/flows/curriculum-audit';
import GeneratingAnimation from '../common/GeneratingAnimation';
import { useAuth } from '@/context/AuthContext';
import { allCurriculums, type Lesson, type Topic, type Unit } from '@/lib/all-curriculums';
import { educationalStandards } from '@/lib/educational-standards';

const formSchema = z.object({
  lessons: z.array(z.string()).refine(value => value.length > 0, {
    message: 'Please select at least one lesson, topic, or unit.'
  }),
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
                    <Link href="/pricing">Subscribe Now</Link>
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
                    <CardContent className="space-y-6">
                        <div>
                            <h4 className="font-semibold text-primary">Simplify</h4>
                            <blockquote className="mt-2 border-l-2 pl-6 italic">
                               <p><strong>Instead of this:</strong> "{audit.pedagogicalInsights.simplify.insteadOf}"</p>
                               <p><strong>Try this:</strong> "{audit.pedagogicalInsights.simplify.tryThis}"</p>
                               <p><strong>Because:</strong> {audit.pedagogicalInsights.simplify.because}</p>
                            </blockquote>
                        </div>
                         <div>
                            <h4 className="font-semibold text-primary">Differentiate</h4>
                             <blockquote className="mt-2 border-l-2 pl-6 italic">
                                <p><strong>For the activity:</strong> "{audit.pedagogicalInsights.differentiate.activity}"</p>
                                <p><strong>Provide this scaffold:</strong> {audit.pedagogicalInsights.differentiate.scaffold}</p>
                             </blockquote>
                        </div>
                        <div>
                            <h4 className="font-semibold text-primary">Engage</h4>
                            <blockquote className="mt-2 border-l-2 pl-6 italic">
                                <p><strong>To introduce the:</strong> "{audit.pedagogicalInsights.engage.concept}"</p>
                                <p><strong>Use this hook:</strong> {audit.pedagogicalInsights.engage.hook}</p>
                            </blockquote>
                        </div>
                         <div>
                            <h4 className="font-semibold text-primary">Assess</h4>
                            <p className="text-muted-foreground">{audit.pedagogicalInsights.assess}</p>
                        </div>
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
    
    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: { lessons: [], auditStandard: '' },
    });
    
    const selectedLessonsJSON = form.watch('lessons');
    const selectedLessonTitles = useMemo(() => selectedLessonsJSON.map(l => JSON.parse(l).title), [selectedLessonsJSON]);

    async function onSubmit(values: FormData) {
        setIsLoading(true);
        setAuditResult(null);
        try {
            const result = await auditCurriculum({
                curriculumContent: `[${values.lessons.join(',')}]`,
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
    
    const handleCheckChange = (items: (Lesson | Topic | Unit | any)[], checked: boolean | 'indeterminate') => {
        const getLessonsFromItem = (item: any): Lesson[] => {
            if (item.objective) return [item as Lesson]; // It's a lesson
            
            let lessons: Lesson[] = [];
            if (item.lessons) lessons = lessons.concat(item.lessons);
            if (item.topics) {
                lessons = lessons.concat(Object.values(item.topics).flatMap((t: any) => getLessonsFromItem(t)));
            }
            if (item.weeks) {
                 lessons = lessons.concat(Object.values(item.weeks).flatMap((w: any) => getLessonsFromItem(w)));
            }
             if (item.units) {
                 lessons = lessons.concat(Object.values(item.units).flatMap((u: any) => getLessonsFromItem(u)));
            }
            return lessons;
        };

        const allLessonsFromItems = items.flatMap(getLessonsFromItem);
        
        const currentSelectionJSON = form.getValues('lessons');
        const currentSelectionObjects = currentSelectionJSON.map(l => JSON.parse(l));
        
        let newSelectionObjects;

        if (checked) {
            const existingTitles = new Set(currentSelectionObjects.map(l => l.title));
            const newLessonsToAdd = allLessonsFromItems.filter(l => !existingTitles.has(l.title));
            newSelectionObjects = [...currentSelectionObjects, ...newLessonsToAdd];
        } else {
            const titlesToRemove = new Set(allLessonsFromItems.map(l => l.title));
            newSelectionObjects = currentSelectionObjects.filter(l => !titlesToRemove.has(l.title));
        }
        
        form.setValue('lessons', newSelectionObjects.map(l => JSON.stringify(l)), { shouldValidate: true });
    };

    return (
        <>
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
                                    name="lessons"
                                    render={() => (
                                        <FormItem>
                                            <FormLabel className="text-base">1. Select Curriculum Content to Audit</FormLabel>
                                            <p className="text-sm text-muted-foreground">You can select an entire unit, topic, or individual lessons.</p>
                                            <Accordion type="multiple" className="w-full">
                                                {allCurriculums.map(subject => {
                                                    if (!subject.curriculum?.units) return null;
                                                    return (
                                                        <AccordionItem value={subject.name} key={subject.name}>
                                                            <AccordionTrigger>{subject.name}</AccordionTrigger>
                                                            <AccordionContent>
                                                                <Accordion type="multiple" className="w-full pl-4">
                                                                    {Object.keys(subject.curriculum.units).map(unitKey => {
                                                                        const unit = subject.curriculum.units[unitKey];
                                                                        const getLessonsFromItem = (item: any): Lesson[] => {
                                                                            if (item.objective) return [item as Lesson]; // It's a lesson
                                                                            let lessons: Lesson[] = [];
                                                                            if (item.lessons) lessons = lessons.concat(item.lessons);
                                                                            if (item.topics) lessons = lessons.concat(Object.values(item.topics).flatMap((t: any) => getLessonsFromItem(t)));
                                                                            if (item.weeks) lessons = lessons.concat(Object.values(item.weeks).flatMap((w: any) => getLessonsFromItem(w)));
                                                                            if (item.units) lessons = lessons.concat(Object.values(item.units).flatMap((u: any) => getLessonsFromItem(u)));
                                                                            return lessons;
                                                                        };

                                                                        const allUnitLessons = getLessonsFromItem(unit);
                                                                        const selectedInUnit = selectedLessonTitles.filter(title => allUnitLessons.some(ul => ul.title === title));
                                                                        const unitCheckedState = selectedInUnit.length === allUnitLessons.length ? true : (selectedInUnit.length > 0 ? 'indeterminate' : false);
                                                                        
                                                                        return (
                                                                        <AccordionItem value={unitKey} key={unitKey}>
                                                                            <div className="flex items-center">
                                                                                <Checkbox id={`unit-${unitKey}`} className="mr-2" onCheckedChange={(c) => handleCheckChange([unit], c)} checked={unitCheckedState}/>
                                                                                <AccordionTrigger className="flex-1">{unit.unit}</AccordionTrigger>
                                                                            </div>
                                                                            <AccordionContent>
                                                                                <Accordion type="multiple" className="w-full pl-4">
                                                                                    {unit.topics && Object.keys(unit.topics).map(topicKey => {
                                                                                        const topic = unit.topics[topicKey];
                                                                                        const selectedInTopic = selectedLessonTitles.filter(title => topic.lessons.some(tl => tl.title === title));
                                                                                        const topicCheckedState = selectedInTopic.length === topic.lessons.length ? true : (selectedInTopic.length > 0 ? 'indeterminate' : false);
                                                                                        return (
                                                                                            <AccordionItem value={topicKey} key={topicKey}>
                                                                                                <div className="flex items-center">
                                                                                                    <Checkbox id={`topic-${topicKey}`} className="mr-2" onCheckedChange={(c) => handleCheckChange([topic], c)} checked={topicCheckedState} />
                                                                                                    <AccordionTrigger className="flex-1">{topic.topic}</AccordionTrigger>
                                                                                                </div>
                                                                                                <AccordionContent>
                                                                                                    <div className="space-y-2 pl-4">
                                                                                                        {topic.lessons.map((lesson, index) => (
                                                                                                            <FormField
                                                                                                                key={index}
                                                                                                                control={form.control}
                                                                                                                name="lessons"
                                                                                                                render={({ field }) => (
                                                                                                                    <FormItem className="flex flex-row items-center space-x-3 space-y-0 py-1">
                                                                                                                        <FormControl>
                                                                                                                            <Checkbox
                                                                                                                                checked={field.value?.some(v => JSON.parse(v).title === lesson.title)}
                                                                                                                                onCheckedChange={(checked) => {
                                                                                                                                    const lessonString = JSON.stringify(lesson);
                                                                                                                                    const newValues = checked
                                                                                                                                        ? [...field.value, lessonString]
                                                                                                                                        : field.value?.filter(v => v !== lessonString);
                                                                                                                                    field.onChange(newValues);
                                                                                                                                }}
                                                                                                                            />
                                                                                                                        </FormControl>
                                                                                                                        <FormLabel className="font-normal text-sm">{lesson.title}</FormLabel>
                                                                                                                    </FormItem>
                                                                                                                )}
                                                                                                            />
                                                                                                        ))}
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
                                                    )
                                                })}
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
        </>
    );
};

export default function CurriculumAuditGenerator() {
    const { hasPremiumTools } = useAuth();
    return hasPremiumTools ? <GeneratorContent /> : <SubscriptionPrompt />;
}
