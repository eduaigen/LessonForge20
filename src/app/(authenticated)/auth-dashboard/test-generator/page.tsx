
'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { ScrollArea } from '@/components/ui/scroll-area';
import { generateTest, type GenerateTestInput } from '@/ai/flows/generate-test';
import { regenerateQuestion } from '@/ai/flows/regenerate-question';
import { curriculumData as baseCurriculumData } from '@/lib/curriculum-data';
import { modules } from '@/lib/modules-data';
import AiToolLayout from '@/components/generators/AiToolLayout';
import { BookCopy, PlusCircle, RefreshCw, Printer, Edit, Trash2, Sparkles, Loader2 } from 'lucide-react';
import { Label } from '@/components/ui/label';
import StyledContentDisplay from '@/components/common/StyledContentDisplay';
import GeneratingAnimation from '@/components/common/GeneratingAnimation';
import Link from 'next/link';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Lock } from 'lucide-react';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter, DialogClose } from '@/components/ui/dialog';

const mapPriceIdToSubject = (): { [key: string]: string } => {
    const mapping: { [key: string]: string } = {};
    const subjectModules = { ...modules };
    delete subjectModules.tools; // Exclude tools from this mapping

    Object.values(subjectModules).flat().forEach(module => {
      if (module.name === "NV Biology" || module.name === "NGSS Biology (OpenSciEd)" || module.name === "AP Biology") {
          mapping[module.id] = module.name;
      } else {
          mapping[module.id] = subjectNameToCurriculumKey(module.name);
      }
    });
    return mapping;
};

// A reverse mapping to find the key in curriculumData.content
const subjectNameToCurriculumKey = (subjectName: string): string => {
    if (subjectName.includes('NV Biology') || subjectName.includes('NGSS Biology') || subjectName.includes('AP Biology')) return 'Biology';
    if (subjectName.includes('Chemistry')) return 'Chemistry';
    if (subjectName.includes('Physics')) return 'Physics';
    if (subjectName.includes('Earth')) return 'Earth_Science';
    if (subjectName.includes('Health')) return 'Health';
    if (subjectName.includes('Math')) return 'Math';
    if (subjectName.includes('ELA')) return 'Literature';
    if (subjectName.includes('History') || subjectName.includes('Government')) return 'History';
    return subjectName;
}

interface TestQuestion {
    id: number;
    question: string;
    answer: string;
}

export default function TestGeneratorPage() {
  const { toast } = useToast();
  const { subscriptions, isAdmin } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState<number | null>(null);

  // State for generated content
  const [studentVersion, setStudentVersion] = useState<TestQuestion[]>([]);
  const [answerKey, setAnswerKey] = useState<TestQuestion[]>([]);

  // State for editing a question
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<TestQuestion | null>(null);
  const [editedQuestionText, setEditedQuestionText] = useState('');
  const [editedAnswerText, setEditedAnswerText] = useState('');
  
  const priceIdToSubject = useMemo(mapPriceIdToSubject, []);

  const availableSubjects = useMemo(() => {
    const subjectModules = { ...modules };
    delete subjectModules.tools; // Exclude tools from the list of available subjects

    if (isAdmin) return Object.values(subjectModules).flat().map(m => m.name);
    
    const testGeneratorSub = subscriptions.includes('price_1Pg12lAk4y2zY5d6pQrStUvW');
    if (!testGeneratorSub) return [];

    const subscribedSubjects = subscriptions
      .map(priceId => priceIdToSubject[priceId])
      .filter((subject): subject is string => !!subject);
      
    return [...new Set(subscribedSubjects)];
  }, [subscriptions, isAdmin, priceIdToSubject]);

  const hasAccess = isAdmin || subscriptions.includes('price_1Pg12lAk4y2zY5d6pQrStUvW');

  // Form State
  const [selectedSubject, setSelectedSubject] = useState<string>('');
  const [selectedUnits, setSelectedUnits] = useState<string[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<string>('');
  const [customPrompt, setCustomPrompt] = useState('');
  const [numMultipleChoice, setNumMultipleChoice] = useState<number | undefined>();
  const [numShortAnswer, setNumShortAnswer] = useState<number | undefined>();
  const [numConstructedResponse, setNumConstructedResponse] = useState<number | undefined>();
  const [numEssay, setNumEssay] = useState<number | undefined>();

  // Curriculum structure states
  const [units, setUnits] = useState<string[]>([]);
  const [topics, setTopics] = useState<string[]>([]);
  
  const handleUnitChange = (unit: string) => {
    setSelectedUnits(prev => 
      prev.includes(unit) ? prev.filter(u => u !== unit) : [...prev, unit]
    );
  };

  useEffect(() => {
    if (selectedSubject) {
      const curriculumKey = subjectNameToCurriculumKey(selectedSubject);
      const subjectContent = baseCurriculumData.content[curriculumKey];
      setUnits(subjectContent ? Object.keys(subjectContent.units) : []);
      setSelectedUnits([]);
      setSelectedTopic('');
    } else {
      setUnits([]);
    }
  }, [selectedSubject]);

  useEffect(() => {
    if (selectedSubject && selectedUnits.length === 1) {
      const curriculumKey = subjectNameToCurriculumKey(selectedSubject);
      const unitContent =
        baseCurriculumData.content[curriculumKey]?.units[selectedUnits[0]];
      setTopics(unitContent ? Object.keys(unitContent.topics) : []);
      setSelectedTopic('');
    } else {
      setTopics([]);
      setSelectedTopic('');
    }
  }, [selectedSubject, selectedUnits]);

  const parseTestContent = (content: string): { student: TestQuestion[], answer: TestQuestion[] } => {
    const studentMarker = 'STUDENT VERSION START ---';
    const answerMarker = 'ANSWER KEY START ---';

    const studentPart = content.substring(content.indexOf(studentMarker) + studentMarker.length, content.indexOf(answerMarker)).trim();
    const answerPart = content.substring(content.indexOf(answerMarker) + answerMarker.length).trim();
    
    const parseSection = (sectionText: string): TestQuestion[] => {
        if (!sectionText) return [];
        // Regex to split by question number (e.g., "1.", "2. ", "**3.**")
        const questions = sectionText.split(/\n(?=\d+\.\s|\*\*\d+\.\*\*\s)/).filter(q => q.trim() !== '');
        return questions.map((q, index) => ({
            id: index + 1,
            question: q.trim(),
            answer: '' // Placeholder, will be filled for answer key
        }));
    };
    
    const studentQuestions = parseSection(studentPart);
    const answerKeyAnswers = parseSection(answerPart);

    // Map answers to questions
    studentQuestions.forEach((sq, i) => {
        if(answerKeyAnswers[i]) {
            sq.answer = answerKeyAnswers[i].question; // The "question" in the answer key is the answer content
        }
    });

    return { student: studentQuestions, answer: answerKeyAnswers };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubject || selectedUnits.length === 0) {
      toast({
        title: 'Missing Information',
        description: 'Please select a subject and at least one unit.',
        variant: 'destructive',
      });
      return;
    }
    if (selectedUnits.length === 1 && !selectedTopic) {
         toast({
            title: 'Missing Information',
            description: 'Please select a topic for the selected unit.',
            variant: 'destructive',
        });
        return;
    }

    setIsLoading(true);
    setStudentVersion([]);
    setAnswerKey([]);

    const input: GenerateTestInput = {
      subject: selectedSubject,
      unit: selectedUnits.join(', '),
      topic: selectedUnits.length === 1 ? selectedTopic : 'All Topics',
      instructions: customPrompt,
      numMultipleChoice: numMultipleChoice,
      numShortAnswer: numShortAnswer,
      numConstructedResponse: numConstructedResponse,
      numEssay: numEssay,
    };

    try {
      const result = await generateTest(input);
      const { student, answer } = parseTestContent(result.test);
      setStudentVersion(student);
      setAnswerKey(answer);
    } catch (error) {
      console.error('Error generating test:', error);
      toast({
        title: 'Generation Failed',
        description: 'An error occurred while generating the test. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedSubject('');
    setSelectedUnits([]);
    setSelectedTopic('');
    setCustomPrompt('');
    setNumMultipleChoice(undefined);
    setNumShortAnswer(undefined);
    setNumConstructedResponse(undefined);
    setNumEssay(undefined);
    setStudentVersion([]);
    setAnswerKey([]);
  };

  const handleDeleteQuestion = (id: number) => {
      setStudentVersion(prev => prev.filter(q => q.id !== id));
  }

  const handleOpenEditDialog = (question: TestQuestion) => {
    setEditingQuestion(question);
    setEditedQuestionText(question.question);
    setEditedAnswerText(question.answer);
    setIsEditDialogOpen(true);
  }

  const handleSaveEdit = () => {
    if (!editingQuestion) return;
    setStudentVersion(prev => prev.map(q => 
        q.id === editingQuestion.id 
        ? { ...q, question: editedQuestionText, answer: editedAnswerText } 
        : q
    ));
    setIsEditDialogOpen(false);
    setEditingQuestion(null);
  };

  const handleRegenerateQuestion = async (id: number) => {
      const questionToRegenerate = studentVersion.find(q => q.id === id);
      if (!questionToRegenerate) return;

      setIsRegenerating(id);
      try {
          const result = await regenerateQuestion({
              originalQuestion: questionToRegenerate.question,
              subject: selectedSubject,
              unit: selectedUnits.join(', '),
              topic: selectedUnits.length === 1 ? selectedTopic : 'All Topics',
          });
          
          setStudentVersion(prev => prev.map(q => 
              q.id === id 
              ? { ...q, question: result.newQuestion, answer: result.newAnswer } 
              : q
          ));

      } catch (error) {
          console.error("Error regenerating question", error);
          toast({
              title: 'Regeneration Failed',
              description: 'Could not regenerate the question. Please try again.',
              variant: 'destructive'
          });
      } finally {
          setIsRegenerating(null);
      }
  }

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=800,width=800');
    if (printWindow) {
      const studentContent = document.getElementById('printable-student-version')?.innerHTML;
      const answerKeyContent = document.getElementById('printable-answer-key')?.innerHTML;
      printWindow.document.write('<html><head><title>Print Test</title>');
      printWindow.document.write('<style>body { font-family: sans-serif; } .document-view { background-color: white; padding: 1rem; } h3 { font-size: 1.25rem; font-weight: bold; margin-top: 1rem; margin-bottom: 0.5rem; border-bottom: 1px solid #ccc; padding-bottom: 0.25rem; } .student-version, .answer-key { page-break-before: always; } </style>');
      printWindow.document.write('</head><body>');
      if (studentContent) {
        printWindow.document.write('<div class="student-version"><h3>STUDENT VERSION</h3>' + studentContent + '</div>');
      }
       if (answerKeyContent) {
        printWindow.document.write('<div class="answer-key"><h3>ANSWER KEY</h3>' + answerKeyContent + '</div>');
      }
      printWindow.document.write('</body></html>');
      printWindow.document.close();
      printWindow.print();
    }
  };

  const ResultDisplay = () => (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex-row items-center justify-between">
        <div>
          <CardTitle>Generated Test</CardTitle>
          <CardDescription>
            Review, edit, and print the AI-generated test.
          </CardDescription>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handlePrint}
          disabled={studentVersion.length === 0}
        >
          <Printer className="mr-2 h-4 w-4" />
          Print
        </Button>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col bg-muted/30 p-4">
        {isLoading ? (
          <GeneratingAnimation />
        ) : studentVersion.length > 0 ? (
          <ScrollArea className="flex-1 rounded-md bg-background shadow-inner">
            <div id="printable-student-version" className="document-view p-4 space-y-4">
              <h3 className="font-bold text-lg">STUDENT VERSION</h3>
              {studentVersion.map((q) => (
                <div key={q.id} className="p-3 rounded-md border bg-card group relative">
                  <StyledContentDisplay content={q.question} />
                  <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleOpenEditDialog(q)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => handleRegenerateQuestion(q.id)} disabled={isRegenerating === q.id}>
                       {isRegenerating === q.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive" onClick={() => handleDeleteQuestion(q.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
             <div id="printable-answer-key" className="document-view p-4 space-y-4 mt-4">
                <h3 className="font-bold text-lg">ANSWER KEY</h3>
                {studentVersion.map((q) => (
                  q.answer && <div key={q.id}><StyledContentDisplay content={q.answer} /></div>
                ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground bg-background rounded-md">
            <BookCopy className="w-16 h-16 text-muted-foreground/50" />
            <p className="mt-4">
              Your generated test will appear here.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );

  if (!hasAccess) {
    return (
        <Card className="w-full max-w-2xl mx-auto my-12">
            <CardHeader className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Lock className="h-8 w-8" />
                </div>
                <CardTitle>Premium Tool Locked</CardTitle>
                <CardDescription>The Test Generator is a premium tool. Please subscribe to unlock this feature.</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
                <Button asChild>
                    <Link href="/pricing">View Subscription Options</Link>
                </Button>
            </CardContent>
        </Card>
    )
  }
  
  if (availableSubjects.length === 0 && !isAdmin) {
    return (
         <Card className="w-full max-w-2xl mx-auto my-12">
            <CardHeader className="text-center">
                 <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <BookCopy className="h-8 w-8" />
                </div>
                <CardTitle>No Subject Subscription Found</CardTitle>
                <CardDescription>To use the Test Generator, you need an active subscription to at least one subject module. Please select a subject on the pricing page.</CardDescription>
            </CardHeader>
            <CardContent className="text-center">
                 <Button asChild>
                    <Link href="/pricing">Subscribe to a Subject</Link>
                </Button>
            </CardContent>
        </Card>
    )
  }

  return (
    <>
        <AiToolLayout
        title="Test Generator"
        description="Create comprehensive tests from your curriculum."
        resultDisplay={<ResultDisplay />}
        >
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
            <div>
                <Label>Subject</Label>
                <Select
                value={selectedSubject}
                onValueChange={setSelectedSubject}
                required
                >
                <SelectTrigger>
                    <SelectValue placeholder="Select a Subscribed Subject" />
                </SelectTrigger>
                <SelectContent>
                    {availableSubjects.map((subject) => (
                    <SelectItem key={subject} value={subject}>
                        {subject}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            
            <div>
                <Label>Unit(s)</Label>
                <ScrollArea className="h-40 rounded-md border p-4">
                    <div className="space-y-2">
                        {units.length > 0 ? units.map((unit) => (
                            <div key={unit} className="flex items-center space-x-2">
                                <Checkbox
                                    id={unit}
                                    checked={selectedUnits.includes(unit)}
                                    onCheckedChange={() => handleUnitChange(unit)}
                                />
                                <label
                                    htmlFor={unit}
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    {unit}
                                </label>
                            </div>
                        )) : (
                            <p className="text-sm text-muted-foreground">Please select a subject to see available units.</p>
                        )}
                    </div>
                </ScrollArea>
            </div>
            <div>
                <Label>Topic</Label>
                <Select
                value={selectedTopic}
                onValueChange={setSelectedTopic}
                disabled={selectedUnits.length !== 1}
                required={selectedUnits.length === 1}
                >
                <SelectTrigger>
                    <SelectValue placeholder={selectedUnits.length === 1 ? "Select Topic" : "Select a single unit to enable topics"} />
                </SelectTrigger>
                <SelectContent>
                    {topics.map((topic) => (
                    <SelectItem key={topic} value={topic}>
                        {topic}
                    </SelectItem>
                    ))}
                </SelectContent>
                </Select>
            </div>
            </div>

            <div className="space-y-4 border-t pt-4">
                <h3 className="text-md font-semibold">Test Composition</h3>
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="num-mc"># of Multiple Choice</Label>
                        <Input id="num-mc" type="number" min="0" value={numMultipleChoice || ''} onChange={e => setNumMultipleChoice(e.target.value ? parseInt(e.target.value) : undefined)} placeholder="e.g., 10" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="num-sa"># of Short Answer</Label>
                        <Input id="num-sa" type="number" min="0" value={numShortAnswer || ''} onChange={e => setNumShortAnswer(e.target.value ? parseInt(e.target.value) : undefined)} placeholder="e.g., 5" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="num-cr"># of Constructed Response</Label>
                        <Input id="num-cr" type="number" min="0" value={numConstructedResponse || ''} onChange={e => setNumConstructedResponse(e.target.value ? parseInt(e.target.value) : undefined)} placeholder="e.g., 3" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="num-essay"># of Essays</Label>
                        <Input id="num-essay" type="number" min="0" value={numEssay || ''} onChange={e => setNumEssay(e.target.value ? parseInt(e.target.value) : undefined)} placeholder="e.g., 1" />
                    </div>
                </div>
            </div>

            <div className="space-y-4 border-t pt-4">
            <div>
                <Label htmlFor="extra-info">Additional Instructions (Optional)</Label>
                <Textarea
                id="extra-info"
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                placeholder="e.g., Focus on lab safety, include a question about the Scientific Revolution..."
                />
            </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
            <Button type="submit" disabled={isLoading} className="w-full">
                <PlusCircle className="mr-2 h-4 w-4" />
                {isLoading ? 'Generating...' : 'Generate Test'}
            </Button>
            <Button
                type="button"
                variant="outline"
                onClick={handleReset}
                className="w-full"
            >
                <RefreshCw className="mr-2 h-4 w-4" />
                Reset
            </Button>
            </div>
        </form>
        </AiToolLayout>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
            <DialogContent className="sm:max-w-[625px]">
                <DialogHeader>
                    <DialogTitle>Edit Question</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                        <Label htmlFor="edit-question">Question</Label>
                        <Textarea id="edit-question" value={editedQuestionText} onChange={(e) => setEditedQuestionText(e.target.value)} className="min-h-[150px]" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="edit-answer">Answer</Label>
                        <Textarea id="edit-answer" value={editedAnswerText} onChange={(e) => setEditedAnswerText(e.target.value)} className="min-h-[150px]" />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button onClick={handleSaveEdit}>Save Changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </>
  );
}
