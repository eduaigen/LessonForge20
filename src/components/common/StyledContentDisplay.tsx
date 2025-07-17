
'use client';

import React, { useState } from 'react';
import Markdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';
import { type TeacherCoachGeneratorOutput } from '@/ai/schemas/teacher-coach-generator-schemas';
import { type SlideshowOutlineOutput } from '@/ai/schemas/slideshow-outline-generator-schemas';
import type { QuestionClusterOutput } from '@/ai/schemas/question-cluster-generator-schemas';
import type { GenerateWorksheetOutput } from '@/ai/schemas/worksheet-generator-schemas';
import type { ReadingMaterialOutput } from '@/ai/schemas/reading-material-generator-schemas';
import type { GenerateNVBiologyLessonOutput } from '@/ai/flows/generate-nv-biology-lesson';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '../ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, FileQuestion, Wand2, RefreshCw, Trash2, Image as ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { generateComprehensionQuestions, type ComprehensionQuestionOutput } from '@/ai/flows/comprehension-question-generator';
import type { GenerateNVBiologyTestOutput } from '@/ai/schemas/nv-biology-test-schemas';
import type { TestStudySheetOutput } from '@/ai/schemas/test-study-sheet-schemas';
import type { GenerateSocialStudiesTestOutput } from '@/ai/schemas/social-studies-test-schemas';
import type { GenerateMathTestOutput } from '@/ai/schemas/math-test-schemas';
import type { GenerateELATestOutput } from '@/ai/schemas/ela-test-schemas';
import type { GenerateLabActivityOutput } from '@/ai/schemas/lab-activity-schemas';
import EditSectionDialog from './EditSectionDialog';
import { generateDiagramImage } from '@/ai/flows/generate-diagram-image';
import Image from 'next/image';

const renderTableFromObject = (tableData: { title: string, headers: string[], rows: (string | number)[][] } | null | undefined) => {
    if (!tableData || !tableData.headers || !tableData.rows) return null;
    return (
        <div className="overflow-x-auto my-4 rounded-lg border">
            <h4 className="font-semibold text-lg mb-2 p-4">{tableData.title}</h4>
            <table className="w-full text-sm">
                <thead>
                    <tr className="border-b bg-muted/50">
                        {tableData.headers.map((header, index) => <th key={index} className="p-3 text-left font-semibold text-foreground">{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {tableData.rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b last:border-b-0">
                            {row.map((cell, cellIndex) => <td key={cellIndex} className="p-3 align-top">{cell}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

const leveledQuestions = (questions: { question: string; dok: number; options?: string[]; answer?: string; }[]) => (
  <ol className="list-decimal pl-5 space-y-4">
    {questions.map((q, i) => (
      <li key={i}>
        <p>{q.question} <span className="text-xs text-muted-foreground">(DOK {q.dok})</span></p>
        {q.options && (
          <ul className="list-[lower-alpha] pl-6 mt-2">
            {q.options.map((opt, optIndex) => <li key={`${i}-${optIndex}`}>{opt}</li>)}
             {q.answer && <li className="text-green-600 font-semibold mt-1">Correct Answer: {q.answer}</li>}
          </ul>
        )}
      </li>
    ))}
  </ol>
);

const DiagramGenerator = ({ description }: { description: string }) => {
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();

    const handleGenerate = async () => {
        setIsLoading(true);
        try {
            const result = await generateDiagramImage({ description });
            setImageUrl(result.imageUrl);
            toast({ title: 'Diagram Generated', description: 'The diagram has been successfully created.' });
        } catch (error) {
            console.error('Diagram generation failed:', error);
            toast({ title: 'Error', description: 'Failed to generate diagram.', variant: 'destructive' });
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleDelete = () => {
        setImageUrl(null);
    }

    return (
        <div className="mt-4 p-4 border rounded-md bg-muted/50">
            <h4 className="font-semibold text-foreground mb-2">Diagram/Model Description</h4>
            <p className="italic text-muted-foreground">{description}</p>
            {!imageUrl && (
                 <div className="mt-4">
                    <Button onClick={handleGenerate} disabled={isLoading} size="sm">
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ImageIcon className="mr-2 h-4 w-4" />}
                        {isLoading ? 'Generating...' : 'Generate Diagram'}
                    </Button>
                     <p className="text-xs text-amber-600 mt-2">
                        <strong>Experimental Feature:</strong> AI image generation may not be perfect. Please review the output carefully.
                     </p>
                </div>
            )}
            {imageUrl && (
                <div className="mt-4">
                    <Image src={imageUrl} alt="Generated Diagram" width={500} height={500} className="rounded-md border" />
                    <div className="flex gap-2 mt-2">
                         <Button onClick={handleGenerate} disabled={isLoading} size="sm" variant="outline">
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
                            Regenerate
                        </Button>
                         <Button onClick={handleDelete} disabled={isLoading} size="sm" variant="destructive">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};


const LessonSectionCard = ({ title, children, sectionName, sectionContent, onSectionUpdate }: { title: string; children: React.ReactNode, sectionName: string; sectionContent: any; onSectionUpdate: (sectionName: string, newContent: any) => void; }) => {
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

    const handleUpdate = (newContent: any) => {
        onSectionUpdate(sectionName, newContent);
    };

    return (
        <Card className="mb-6">
            <CardHeader>
                <CardTitle className="text-xl font-bold font-headline text-primary">{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 document-view">
                {children}
            </CardContent>
             <CardFooter className="bg-muted/50 p-2 flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setIsEditDialogOpen(true)}>
                    <Wand2 className="mr-2 h-4 w-4" /> Edit Instructions
                </Button>
            </CardFooter>
            <EditSectionDialog 
                open={isEditDialogOpen}
                onOpenChange={setIsEditDialogOpen}
                sectionName={sectionName}
                sectionContent={sectionContent}
                onSectionUpdate={handleUpdate}
            />
        </Card>
    );
};

const LessonPlanDisplay = ({ lessonPlan: initialLessonPlan }: { lessonPlan: GenerateNVBiologyLessonOutput }) => {
    const [lessonPlan, setLessonPlan] = useState(initialLessonPlan);

    const handleSectionUpdate = (sectionName: string, newContent: any) => {
        setLessonPlan(prev => {
            if (!prev) return null;
            const updatedPlan = { ...prev, [sectionName]: newContent };
            return updatedPlan;
        });
    };
    
    if (!lessonPlan) return null;

    const { 
        lessonOverview, 
        doNow, 
        miniLesson, 
        guidedPractice, 
        checkFoUnderstanding, 
        independentPractice, 
        closure, 
        homework, 
        differentiation 
    } = lessonPlan;
    
    const sections = [
        { name: "doNow", title: "A. Do Now (5–8 min)", content: doNow },
        { name: "miniLesson", title: "B. Mini-Lesson / Direct Instruction (10–15 min)", content: miniLesson },
        { name: "guidedPractice", title: "C. Guided Practice / Group Activity (15–20 min)", content: guidedPractice },
        { name: "checkFoUnderstanding", title: "D. Check for Understanding (CFU)", content: checkFoUnderstanding },
        { name: "independentPractice", title: "E. Independent Practice / Performance Task", content: independentPractice },
        { name: "closure", title: "F. Closure / Exit Ticket", content: closure },
        { name: "homework", title: "G. Homework Activity", content: homework },
        { name: "differentiation", title: "H. Differentiation & Support", content: differentiation }
    ];

    return (
        <div className="p-4">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold font-headline text-primary">{lessonOverview.lesson}</h1>
                <p className="text-lg text-muted-foreground"><strong>Unit:</strong> {lessonOverview.unit}</p>
                <p className="text-lg text-muted-foreground"><strong>Topic:</strong> {lessonOverview.topic}</p>
            </header>

            <LessonSectionCard title="I. Lesson Overview" sectionName="lessonOverview" sectionContent={lessonOverview} onSectionUpdate={handleSectionUpdate}>
                <div><strong>Summary:</strong> <p>{lessonOverview.lessonSummary}</p></div>
                <div><strong>Standards:</strong> <p>{lessonOverview.standards}</p></div>
                <div><strong>Aim/Essential Question:</strong> <p>{lessonOverview.aim}</p></div>
                <div><strong>Objectives:</strong> <ul className="list-disc pl-5">{lessonOverview.objectives.map((o, i) => <li key={i}>{o}</li>)}</ul></div>
                <div><strong>Key Vocabulary:</strong> <ul className="list-disc pl-5">{lessonOverview.vocabulary.map((v, i) => <li key={i}><strong>{v.term}:</strong> {v.definition}</li>)}</ul></div>
                <div><strong>Materials Needed:</strong> <ul className="list-disc pl-5">{lessonOverview.materials.map((m, i) => <li key={i}>{m}</li>)}</ul></div>
            </LessonSectionCard>

            {sections.map(section => {
                 if (!section.content) return null;
                 const sectionContent = section.content as any;
                 return (
                    <LessonSectionCard key={section.name} title={section.title} sectionName={section.name} sectionContent={sectionContent} onSectionUpdate={handleSectionUpdate}>
                       {section.name === 'doNow' && <div><h4>Question</h4><p>{sectionContent.question}</p></div>}
                       {section.name === 'miniLesson' && <>
                           <div><h4>Reading Passage</h4><Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{sectionContent.readingPassage}</Markdown></div>
                           {sectionContent.diagram && <DiagramGenerator description={sectionContent.diagram} />}
                           <div><h4>Concept-Check Questions</h4>{leveledQuestions(sectionContent.conceptCheckQuestions)}</div>
                       </>}
                       {section.name === 'guidedPractice' && (typeof sectionContent.activityContent === 'string' 
                           ? <div><h4>Activity Description</h4><p>{sectionContent.activityContent}</p></div>
                           : renderTableFromObject(sectionContent.activityContent as any)
                       )}
                       {section.name === 'checkFoUnderstanding' && leveledQuestions([...sectionContent.multipleChoice, sectionContent.shortResponse])}
                       {section.name === 'independentPractice' && <>
                           <div><h4>Task Prompt</h4><p>{sectionContent.taskPrompt}</p></div>
                           {renderTableFromObject(sectionContent.taskData)}
                       </>}
                       {section.name === 'closure' && <div><h4>Exit Ticket Question</h4><p>{sectionContent.exitTicketQuestion}</p></div>}
                       {section.name === 'homework' && <div><h4>Activity</h4><Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{sectionContent.activity}</Markdown></div>}
                       {section.name === 'differentiation' && <>
                           <div><h4>Teacher Actions for Support</h4><ul className="list-disc pl-5">{sectionContent.supportActions.map((a: string, i: number) => <li key={i}>{a}</li>)}</ul></div>
                           <div className="mt-4 p-4 border rounded-md"><h4 className="font-semibold text-foreground mb-2">Scaffolded Materials</h4><Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{sectionContent.scaffoldedMaterials}</Markdown></div>
                           <div><h4>Extension Activity</h4><p>{sectionContent.extensionActivity}</p></div>
                       </>}
                       {sectionContent.teacherActions && <div><h4>Teacher Actions</h4><ul className="list-disc pl-5">{sectionContent.teacherActions.map((a: string, i: number) => <li key={i}>{a}</li>)}</ul></div>}
                       {sectionContent.expectedStudentOutputs && <div><h4>Expected Student Outputs</h4><ul className="list-disc pl-5">{sectionContent.expectedStudentOutputs.map((o: string, i: number) => <li key={i}>{o}</li>)}</ul></div>}
                   </LessonSectionCard>
                )
            })}
        </div>
    );
};

const renderWorksheet = (worksheet: GenerateWorksheetOutput) => (
    <div className="document-view">
         <header className="mb-8 grid grid-cols-2 gap-x-8 gap-y-2 border-b-2 border-primary pb-4">
            <h1 className="col-span-2 text-2xl font-bold font-headline text-primary">{worksheet.header.lessonTitle}</h1>
            <p className="col-span-2 text-md text-muted-foreground">{worksheet.header.unitTitle}</p>
            <div className="pt-4">{worksheet.header.name}</div>
            <div>{worksheet.header.date}</div>
            <div>{worksheet.header.class}</div>
            <div>{worksheet.header.period}</div>
        </header>

        <section className="mb-6">
            <h3>A. AIM & VOCABULARY</h3>
            <p className="mt-2"><strong>Aim / Essential Question:</strong> {worksheet.aim.essentialQuestion}</p>
            <p className="mt-2">{worksheet.aim.rewriteSpace}</p>
            <div className="my-4 h-24 border-b border-dashed"></div>
            
            {worksheet.vocabulary && worksheet.vocabulary.terms && worksheet.vocabulary.terms.length > 0 && (
              <>
                <h4 className="mt-4">{worksheet.vocabulary.title}</h4>
                <ul className="list-disc pl-5 mt-2 space-y-2">
                    {worksheet.vocabulary.terms.map((v, i) => <li key={i}><strong>{v.term}:</strong> {v.definition}</li>)}
                </ul>
              </>
            )}
        </section>

        <section className="mb-6">
            <h3>{worksheet.doNow.title}</h3>
            <p>{worksheet.doNow.question}</p>
            <div className="my-4 h-32 border-b border-dashed"></div>
        </section>

        <section className="mb-6">
            <h3>{worksheet.miniLesson.title}</h3>
            {worksheet.miniLesson.readingPassage && (
                <>
                    <h4>Reading Passage</h4>
                    <div className="prose prose-lg max-w-none">
                       <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{worksheet.miniLesson.readingPassage}</Markdown>
                    </div>
                </>
            )}
             {worksheet.miniLesson.diagramDescription && (
                <div className="p-4 border-l-4 border-primary bg-muted/50 rounded-r-lg my-4">
                    <h4 className="font-semibold">Diagram for Analysis</h4>
                    <p className="italic">{worksheet.miniLesson.diagramDescription}</p>
                    <div className="my-4 h-64 border-2 border-dashed rounded-lg bg-background flex items-center justify-center text-muted-foreground">
                        <p>Space for Diagram</p>
                    </div>
                </div>
            )}
             <h4>{worksheet.miniLesson.notesTitle}</h4>
            <div className="overflow-x-auto my-4">
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="border-b">
                            <th className="p-2 text-left font-semibold text-foreground w-1/2">Key Ideas / Concepts</th>
                            <th className="p-2 text-left font-semibold text-foreground w-1/2">Notes / Details / Questions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {[...Array(8)].map((_, i) => (
                            <tr key={i} className="border-b">
                                <td className="p-2 h-20 align-top"></td>
                                <td className="p-2 h-20 align-top"></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {worksheet.miniLesson.conceptCheckQuestions && worksheet.miniLesson.conceptCheckQuestions.length > 0 && (
                <>
                    <h4>Concept Check Questions</h4>
                    <ol className="list-decimal pl-5 mt-2 space-y-4">
                    {worksheet.miniLesson.conceptCheckQuestions.map((q, i) => (
                        <li key={i}>
                            {q.question}
                            <div className="my-2 h-20 border-b border-dashed"></div>
                        </li>
                    ))}
                    </ol>
                </>
            )}
        </section>
        
        <section className="mb-6">
            <h3>{worksheet.guidedPractice.title}</h3>
            {Array.isArray(worksheet.guidedPractice.instructions) && worksheet.guidedPractice.instructions.map((inst, i) => <p key={i}>{inst}</p>)}
            {worksheet.guidedPractice.dataTable && renderTableFromObject(worksheet.guidedPractice.dataTable)}
            <div className="my-4 h-48 border-b border-dashed"></div>
        </section>

        <section className="mb-6">
            <h3>{worksheet.checkFoUnderstanding.title}</h3>
            <ol className="list-decimal pl-5 space-y-4">
                {worksheet.checkFoUnderstanding.multipleChoice.map((mc, i) => (
                    <li key={i}>
                        <p>{mc.question}</p>
                        <ul className="list-[lower-alpha] pl-6 mt-2">
                           {mc.options.map((opt, optIndex) => <li key={optIndex}>{opt}</li>)}
                        </ul>
                    </li>
                ))}
                <li>
                    <p>{worksheet.checkFoUnderstanding.shortResponse.question}</p>
                    <div className="my-2 h-24 border-b border-dashed"></div>
                </li>
            </ol>
        </section>

        <section className="mb-6">
            <h3>{worksheet.independentPractice.title}</h3>
            <p>{worksheet.independentPractice.taskPrompt}</p>
            {worksheet.independentPractice.taskData && renderTableFromObject(worksheet.independentPractice.taskData)}
            <div className="my-4 h-64 border-b border-dashed"></div>
        </section>

        <section className="mb-6">
            <h3>{worksheet.closure.title}</h3>
            <p>{worksheet.closure.exitTicketQuestion}</p>
            <div className="my-4 h-24 border-b border-dashed"></div>
        </section>

        <section>
            <h3>{worksheet.homework.title}</h3>
            <div className="prose prose-lg max-w-none">
                <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{worksheet.homework.activity}</Markdown>
            </div>
        </section>
    </div>
);

const renderCoachingAdvice = (advice: TeacherCoachGeneratorOutput) => {
    const sections = [
        { title: "B. DO NOW", advice: advice.doNow },
        { title: "C. MINI-LESSON", advice: advice.miniLesson },
        { title: "D. GUIDED PRACTICE", advice: advice.guidedPractice },
        { title: "E. CHECK FOR UNDERSTANDING", advice: advice.checkFoUnderstanding },
        { title: "F. INDEPENDENT PRACTICE", advice: advice.independentPractice },
        { title: "G. CLOSURE", advice: advice.closure },
        { title: "H. HOMEWORK", advice: advice.homework },
    ];

    return (
         <div className="document-view">
             <header className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 border-b pb-4">
                <div><strong>Lesson:</strong> {advice.lessonTitle}</div>
                <div><strong>Unit:</strong> {advice.unitTitle}</div>
                <div><strong>Teacher:</strong> {advice.teacherName}</div>
                <div><strong>Date:</strong> {advice.date}</div>
            </header>
            {sections.map(sec => (
                <section key={sec.title} className="mb-8">
                    <h2>{sec.title}</h2>
                    <div className="space-y-4">
                        <div>
                            <h4>Pedagogical Rationale</h4>
                            <p>{sec.advice.pedagogicalRationale}</p>
                        </div>
                        <div>
                            <h4>Sample Teacher Script / Talk Moves</h4>
                            <blockquote className="whitespace-pre-wrap">{sec.advice.sampleScript}</blockquote>
                        </div>
                        <div>
                            <h4>Danielson Framework Connection</h4>
                            <p>{sec.advice.danielsonConnection}</p>
                        </div>
                        <div>
                            <h4>CRSE / UDL Check</h4>
                            <p>{sec.advice.crseUdlCheck}</p>
                        </div>
                    </div>
                </section>
            ))}
        </div>
    );
};

const renderSlideshowOutline = (outline: SlideshowOutlineOutput) => {
    return (
        <div className="document-view">
            <header className="mb-8 border-b pb-4">
                <h1 className="text-3xl font-bold font-headline text-primary">{outline.lessonTitle}</h1>
                <p className="text-lg text-muted-foreground">{outline.unitTitle}</p>
            </header>
            {outline.slides.map((slide, index) => (
                <section key={index} className="mb-6 border-b pb-4">
                    <h3>Slide {index + 1}: {slide.title}</h3>
                     <div className="prose prose-lg max-w-none">
                        <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{slide.content.join('\n\n')}</Markdown>
                    </div>
                </section>
            ))}
        </div>
    );
};

const renderQuestionCluster = (cluster: QuestionClusterOutput) => {
    return (
      <div className="document-view">
        <section className="mb-6">
          <h2>Phenomenon</h2>
          <p className="italic">{cluster.phenomenon}</p>
        </section>
        <section className="mb-6">
          <h2>Stimulus Material</h2>
          <div className="my-4">
             {renderTableFromObject(cluster.stimulus.visual)}
          </div>
        </section>
        <section className="mb-6">
          <h2>Questions</h2>
          <div className="space-y-6">
            <div>
              <h3>Multiple Choice</h3>
              <ol className="list-decimal pl-5 space-y-4">
                <li>
                  <p>{cluster.questions.mcq1.question}</p>
                  <ul className="list-[lower-alpha] pl-6">
                    {cluster.questions.mcq1.options.map((opt:string, index: number) => <li key={index}>{opt}</li>)}
                  </ul>
                  <p className="text-sm"><em>Correct Answer: {cluster.questions.mcq1.answer}</em></p>
                </li>
                <li>
                  <p>{cluster.questions.mcq2.question}</p>
                  <ul className="list-[lower-alpha] pl-6">
                    {cluster.questions.mcq2.options.map((opt:string, index: number) => <li key={index}>{opt}</li>)}
                  </ul>
                   <p className="text-sm"><em>Correct Answer: {cluster.questions.mcq2.answer}</em></p>
                </li>
              </ol>
            </div>
            <div>
              <h3>Short Response</h3>
              <ol className="list-decimal pl-5 space-y-6">
                <li>
                    <p>{cluster.questions.shortResponse1}</p>
                    <div className="my-2 h-20 border-b border-dashed"></div>
                </li>
                <li>
                    <p>{cluster.questions.shortResponse2}</p>
                    <div className="my-2 h-20 border-b border-dashed"></div>
                </li>
              </ol>
            </div>
            <div>
              <h3>Modeling</h3>
              <p>{cluster.questions.modeling}</p>
              <div className="my-2 h-32 border-b border-dashed"></div>
            </div>
            <div>
              <h3>Prediction</h3>
              <p>{cluster.questions.prediction}</p>
              <div className="my-2 h-32 border-b border-dashed"></div>
            </div>
          </div>
        </section>
      </div>
    );
  };

const renderStudySheet = (studySheet: TestStudySheetOutput | any) => {
    if (!studySheet) {
        return <div className="p-4 bg-yellow-100 text-yellow-800 rounded-md">Study sheet content is not available.</div>;
    }
    return (
        <div className="document-view">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold font-headline text-primary">{studySheet.lessonTitle || studySheet.title}</h1>
                 {studySheet.unitTitle && <p className="text-lg text-muted-foreground">{studySheet.unitTitle}</p>}
            </header>

            {studySheet.essentialQuestion && (
                 <section className="mb-6">
                    <h2>Essential Question</h2>
                    <p>{studySheet.essentialQuestion}</p>
                </section>
            )}

            {Array.isArray(studySheet.keyConcepts) && studySheet.keyConcepts.length > 0 && (
                <section className="mb-6">
                    <h2>Key Concepts</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        {studySheet.keyConcepts?.map((concept, index) => (
                            <li key={index}>{concept}</li>
                        ))}
                    </ul>
                </section>
            )}

            {Array.isArray(studySheet.vocabulary) && studySheet.vocabulary.length > 0 && (
                <section className="mb-6">
                    <h2>Key Vocabulary</h2>
                    <ul className="list-disc pl-5 space-y-2">
                        {studySheet.vocabulary?.map((item, index) => (
                            <li key={index}>
                                <strong>{item.term}:</strong> {item.definition}
                            </li>
                        ))}
                    </ul>
                </section>
            )}
            
            {Array.isArray(studySheet.essentialQuestions) && studySheet.essentialQuestions.length > 0 && (
                <section>
                    <h2>Essential Questions</h2>
                    <ol className="list-decimal pl-5 space-y-4">
                        {studySheet.essentialQuestions?.map((q, index) => (
                            <li key={index}>
                                <p>{q}</p>
                                <div className="my-2 h-12 border-b border-dashed"></div>
                            </li>
                        ))}
                    </ol>
                </section>
            )}
        </div>
    );
};

const ReadingMaterialDisplay = ({ content }: { content: ReadingMaterialOutput }) => {
    const { toast } = useToast();
    const [isGenerating, setIsLoading] = useState(false);
    const [generatedQuestions, setGeneratedQuestions] = useState<ComprehensionQuestionOutput | null>(null);

    const onGenerateQuestions = async () => {
        setIsGenerating(true);
        setGeneratedQuestions(null);
        try {
            const result = await generateComprehensionQuestions({ 
                articleContent: content.articleContent,
             });
            setGeneratedQuestions(result);
            toast({ title: "Success", description: "Comprehension questions generated." });
        } catch (error) {
            console.error(error);
            toast({ title: "Error", description: "Failed to generate questions.", variant: "destructive" });
        } finally {
            setIsGenerating(false);
        }
    };
    
    return (
        <div className="document-view">
            <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{content.articleContent}</Markdown>

            <div className="mt-8 border-t pt-6">
                <Button onClick={onGenerateQuestions} disabled={isGenerating}>
                    {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <FileQuestion className="mr-2 h-4 w-4" />}
                    {isGenerating ? 'Generating...' : 'Generate Comprehension Questions'}
                </Button>
            </div>

            {generatedQuestions && (
                <div className="mt-6">
                    <h3 className="text-xl font-bold font-headline text-primary mb-4">Generated Comprehension Questions</h3>
                    <ol className="list-decimal pl-5 space-y-2">
                        {generatedQuestions.questions.map((q, i) => (
                            <li key={i}>{q}</li>
                        ))}
                    </ol>
                </div>
            )}
        </div>
    );
};

const ScienceTestDisplay = ({ test, type }: { test: GenerateNVBiologyTestOutput, type: string }) => (
    <div className="document-view">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold font-headline text-primary">{test.testTitle}</h1>
        {test.instructions && <p className="text-muted-foreground mt-4">{test.instructions}</p>}
      </header>
      
      {test.clusters?.map((cluster, clusterIndex) => (
        <section key={clusterIndex} className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Cluster {clusterIndex + 1}</h2>
          <Card className="bg-muted/50 mb-6">
            <CardHeader><CardTitle>Phenomenon</CardTitle></CardHeader>
            <CardContent>
              <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{cluster.phenomenon}</Markdown>
              {renderTableFromObject(cluster.dataTable)}
            </CardContent>
          </Card>
          
          <h3 className="text-xl font-semibold mb-4">Multiple Choice Questions</h3>
          <ol className="list-decimal pl-5 space-y-6">
            {cluster.multipleChoiceQuestions.map((q, i) => (
              <li key={i}>
                <p>{q.question}</p>
                <ul className="list-[lower-alpha] pl-6 mt-2 space-y-1">
                  {q.options.map((opt, optIndex) => <li key={`${i}-${optIndex}`}>{opt}</li>)}
                </ul>
              </li>
            ))}
          </ol>

          <h3 className="text-xl font-semibold mt-8 mb-4">Short Answer Questions</h3>
          <ol className="list-decimal pl-5 space-y-6">
            {cluster.shortAnswerQuestions.map((q, i) => (
              <li key={i}>
                <p>{q.question}</p>
                <div className="my-2 h-24 border-b border-dashed"></div>
              </li>
            ))}
          </ol>

          <h3 className="text-xl font-semibold mt-8 mb-4">Claim-Evidence-Reasoning</h3>
           <p>{cluster.cerQuestion.question}</p>
           <div className="my-2 h-32 border-b border-dashed"></div>
        </section>
      ))}
    </div>
  );

const ScienceAnswerKeyDisplay = ({ test }: { test: GenerateNVBiologyTestOutput }) => (
    <div className="document-view">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold font-headline text-primary">{test.testTitle} - Answer Key</h1>
      </header>
       {test.clusters?.map((cluster, clusterIndex) => (
        <section key={clusterIndex} className="mb-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-4">Cluster {clusterIndex + 1} Answer Key</h2>
          
          <h3 className="text-xl font-semibold mb-4">Multiple Choice Answers</h3>
          <ol className="list-decimal pl-5 space-y-2">
            {cluster.answerKey.multipleChoice.map((ans, i) => (
              <li key={i}><strong>{ans.answer}</strong> {ans.explanation && <span className="text-sm text-muted-foreground">- {ans.explanation}</span>}</li>
            ))}
          </ol>

          <h3 className="text-xl font-semibold mt-8 mb-4">Short Answer Sample Responses</h3>
          <ol className="list-decimal pl-5 space-y-4">
             {cluster.answerKey.shortAnswer.map((ans, i) => (
               <li key={i}>
                 <p><strong>Question:</strong> {ans.question}</p>
                 <p><strong>Sample Answer:</strong> {ans.sampleAnswer}</p>
               </li>
             ))}
          </ol>

          <h3 className="text-xl font-semibold mt-8 mb-4">CER Sample Response</h3>
          <div>
              <p><strong>Claim:</strong> {cluster.answerKey.cer.sampleClaim}</p>
              <p><strong>Evidence:</strong></p>
              <ul className="list-disc pl-6">
                {cluster.answerKey.cer.sampleEvidence.map((ev, i) => <li key={i}>{ev}</li>)}
              </ul>
              <p><strong>Reasoning:</strong> {cluster.answerKey.cer.sampleReasoning}</p>
          </div>
        </section>
      ))}
    </div>
  );

const SocialStudiesTestDisplay = ({ test }: { test: GenerateSocialStudiesTestOutput }) => (
    <div className="document-view">
        <header className="text-center mb-8">
            <h1 className="text-3xl font-bold font-headline text-primary">{test.testTitle}</h1>
            {test.instructions && <p className="text-muted-foreground mt-4">{test.instructions}</p>}
        </header>
        
        {/* Part I: Multiple Choice */}
        <section className="mb-12">
            <h2 className="text-2xl font-bold font-headline text-primary mb-4 border-b pb-2">{test.partI.title}</h2>
            <ol className="list-decimal pl-5 space-y-8">
                {test.partI.questions.map((mc, index) => (
                    <li key={index}>
                        <div className="p-4 border border-dashed rounded-md mb-2">
                          <Markdown>{mc.stimulus}</Markdown>
                        </div>
                        <p>{mc.question}</p>
                        <ul className="list-[lower-alpha] pl-6 mt-2 space-y-1">
                            {mc.options.map((opt, optIndex) => <li key={`${index}-${optIndex}`}>{opt}</li>)}
                        </ul>
                    </li>
                ))}
            </ol>
        </section>

        {/* Part II: Constructed-Response Questions */}
        <section className="mb-12">
            <h2 className="text-2xl font-bold font-headline text-primary mb-4 border-b pb-2">{test.partII.title}</h2>
            {test.partII.sets?.map((crqSet, setIndex) => (
                <div key={setIndex} className="mb-8 border-t pt-6">
                    <h3 className="text-xl font-semibold mb-4">Constructed-Response Set {setIndex + 1}</h3>
                    {crqSet.documents.map((doc, docIndex) => (
                         <div key={docIndex} className="p-4 border rounded-md mb-4 bg-muted/30">
                           <p className="font-semibold mb-2">Document {docIndex + 1}</p>
                           <Markdown>{doc}</Markdown>
                         </div>
                    ))}
                    <ol className="list-decimal pl-5 space-y-6">
                        {crqSet.questions.map((q, qIndex) => (
                            <li key={qIndex}>
                                <p>{q.question}</p>
                                <div className="my-2 h-24 border-b border-dashed"></div>
                            </li>
                        ))}
                    </ol>
                </div>
            ))}
        </section>

        {/* Part III: Document-Based Question (DBQ) */}
        <section>
             <h2 className="text-2xl font-bold font-headline text-primary mb-4 border-b pb-2">{test.partIII.title}</h2>
             <div className="space-y-6">
                <div>
                    <h3 className="font-semibold">Historical Context:</h3>
                    <p>{test.partIII.dbq.historicalContext}</p>
                </div>
                <div>
                    <h3 className="font-semibold">Task:</h3>
                    <p>{test.partIII.dbq.task}</p>
                </div>
                 <div>
                    <h3 className="font-semibold">Documents:</h3>
                    {test.partIII.dbq.documents.map((doc, docIndex) => (
                         <div key={docIndex} className="p-4 border rounded-md mt-4 bg-muted/30">
                           <p className="font-semibold mb-2">Document {docIndex + 1}</p>
                           <Markdown>{doc}</Markdown>
                         </div>
                    ))}
                 </div>
                 <div className="my-4 h-64 border-b border-dashed"></div>
             </div>
        </section>
    </div>
);

const MathTestDisplay = ({ test }: { test: GenerateMathTestOutput }) => (
    <div className="document-view">
      <header className="text-center mb-8">
        <h1 className="text-3xl font-bold font-headline text-primary">{test.testTitle}</h1>
        {test.instructions && <p className="text-muted-foreground mt-4">{test.instructions}</p>}
      </header>
  
      {/* Part I: Multiple Choice */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold font-headline text-primary mb-4 border-b pb-2">{test.partI.title}</h2>
        <ol className="list-decimal pl-5 space-y-8">
          {test.partI.questions.map((mc, index) => (
            <li key={index}>
              <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{mc.question}</Markdown>
              <ul className="list-[lower-alpha] pl-6 mt-2 space-y-1">
                {mc.options.map((opt, optIndex) => (
                  <li key={`${index}-${optIndex}`}><Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{opt}</Markdown></li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </section>
  
      {/* Part II: 2-Credit Constructed Response */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold font-headline text-primary mb-4 border-b pb-2">{test.partII.title}</h2>
        <ol className="list-decimal pl-5 space-y-8">
          {test.partII.questions.map((q, index) => (
            <li key={index}>
              <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{q.question}</Markdown>
              <div className="my-2 h-24 border-b border-dashed"></div>
            </li>
          ))}
        </ol>
      </section>
  
      {/* Part III: 4-Credit Constructed Response */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold font-headline text-primary mb-4 border-b pb-2">{test.partIII.title}</h2>
        <ol className="list-decimal pl-5 space-y-8">
          {test.partIII.questions.map((q, index) => (
            <li key={index}>
              <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{q.question}</Markdown>
              <div className="my-2 h-32 border-b border-dashed"></div>
            </li>
          ))}
        </ol>
      </section>
  
      {/* Part IV: 6-Credit Constructed Response */}
      <section>
        <h2 className="text-2xl font-bold font-headline text-primary mb-4 border-b pb-2">{test.partIV.title}</h2>
        <div>
          <Markdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>{test.partIV.question.question}</Markdown>
          <div className="my-2 h-48 border-b border-dashed"></div>
        </div>
      </section>
    </div>
);

const ELATestDisplay = ({ test }: { test: GenerateELATestOutput }) => (
    <div className="document-view">
        <header className="text-center mb-8">
            <h1 className="text-3xl font-bold font-headline text-primary">{test.testTitle}</h1>
            {test.instructions && <p className="text-muted-foreground mt-4">{test.instructions}</p>}
        </header>

        {/* Part 1: Reading Comprehension */}
        <section className="mb-12">
            <h2 className="text-2xl font-bold font-headline text-primary mb-4 border-b pb-2">{test.part1.title}</h2>
            {test.part1.passages.map((p, pIndex) => (
                <div key={pIndex} className="mb-8 border-b pb-6 last:border-b-0">
                    <h3 className="text-xl font-semibold mb-2">Passage {pIndex + 1}: {p.passage.title}</h3>
                    <Card className="bg-muted/30 mb-4 p-4"><Markdown>{p.passage.content}</Markdown></Card>
                    <ol className="list-decimal pl-5 space-y-6">
                        {p.questions.map((q, qIndex) => (
                            <li key={qIndex}>
                                <p>{q.question}</p>
                                <ul className="list-[lower-alpha] pl-6 mt-2 space-y-1">
                                    {q.options.map((opt, optIndex) => <li key={`${qIndex}-${optIndex}`}>{opt}</li>)}
                                </ul>
                            </li>
                        ))}
                    </ol>
                </div>
            ))}
        </section>

        {/* Part 2: Argument Essay */}
        <section className="mb-12">
            <h2 className="text-2xl font-bold font-headline text-primary mb-4 border-b pb-2">{test.part2.title}</h2>
            <h3 className="font-semibold">Directions:</h3>
            <p className="mb-4">{test.part2.argumentEssay.prompt}</p>
            <h3 className="font-semibold">Sources:</h3>
            {test.part2.argumentEssay.sources.map((source, sIndex) => (
                 <div key={sIndex} className="p-4 border rounded-md mt-4 bg-muted/30">
                    <p className="font-semibold mb-2">Source {sIndex + 1}: {source.title}</p>
                    <Markdown>{source.content}</Markdown>
                  </div>
            ))}
             <div className="my-4 h-64 border-b border-dashed"></div>
        </section>

        {/* Part 3: Text Analysis */}
        <section>
            <h2 className="text-2xl font-bold font-headline text-primary mb-4 border-b pb-2">{test.part3.title}</h2>
            <h3 className="font-semibold">Directions:</h3>
            <p className="mb-4">{test.part3.textAnalysis.prompt}</p>
            <h3 className="font-semibold">Text:</h3>
            <Card className="bg-muted/30 mb-4 p-4"><Markdown>{test.part3.textAnalysis.passage.content}</Markdown></Card>
            <div className="my-4 h-64 border-b border-dashed"></div>
        </section>
    </div>
);

const ELAAnswerKeyDisplay = ({ test }: { test: GenerateELATestOutput }) => (
    <div className="document-view">
        <header className="text-center mb-8">
            <h1 className="text-3xl font-bold font-headline text-primary">{test.testTitle} - Answer Key</h1>
        </header>

        <section className="mb-12">
            <h2 className="text-2xl font-bold font-headline text-primary mb-4 border-b pb-2">Part 1: Reading Comprehension Answers</h2>
            {test.answerKey.part1.map((passageAnswers, index) => (
                <div key={index} className="mb-4">
                    <h3 className="text-xl font-semibold">{passageAnswers.passageTitle}</h3>
                    <ol className="list-decimal pl-5">
                        {passageAnswers.answers.map((answer, ansIndex) => (
                            <li key={ansIndex}>{answer}</li>
                        ))}
                    </ol>
                </div>
            ))}
        </section>

        <section className="mb-12">
            <h2 className="text-2xl font-bold font-headline text-primary mb-4 border-b pb-2">Part 2: Argument Essay Sample Response</h2>
            <Markdown>{test.answerKey.part2.sampleEssay}</Markdown>
        </section>

        <section>
            <h2 className="text-2xl font-bold font-headline text-primary mb-4 border-b pb-2">Part 3: Text Analysis Sample Response</h2>
            <Markdown>{test.answerKey.part3.sampleResponse}</Markdown>
        </section>
    </div>
);

const SocialStudiesAnswerKeyDisplay = ({ test }: { test: GenerateSocialStudiesTestOutput }) => (
    <div className="document-view">
        <header className="text-center mb-8">
            <h1 className="text-3xl font-bold font-headline text-primary">{test.testTitle} - Answer Key</h1>
        </header>

        <section className="mb-12">
            <h2 className="text-2xl font-bold font-headline text-primary mb-4 border-b pb-2">Part I: Multiple Choice Answers</h2>
            <ol className="list-decimal pl-5 space-y-2">
                {test.answerKey.part1.map((item, index) => (
                    <li key={index}>{item.answer}</li>
                ))}
            </ol>
        </section>

        <section className="mb-12">
            <h2 className="text-2xl font-bold font-headline text-primary mb-4 border-b pb-2">Part II: Constructed-Response Sample Answers</h2>
            {test.answerKey.part2.map((set, setIndex) => (
                <div key={setIndex} className="mb-6">
                    <h3 className="text-xl font-semibold">CRQ Set {set.setNumber}</h3>
                    <ol className="list-decimal pl-5 space-y-4">
                        {set.questions.map((q, qIndex) => (
                            <li key={qIndex}>
                                <p><strong>Question:</strong> {q.question}</p>
                                <p><strong>Sample Answer:</strong> <Markdown>{q.sampleAnswer}</Markdown></p>
                            </li>
                        ))}
                    </ol>
                </div>
            ))}
        </section>

        <section>
            <h2 className="text-2xl font-bold font-headline text-primary mb-4 border-b pb-2">Part III: DBQ Sample Essay</h2>
            <Markdown>{test.answerKey.part3.sampleEssay}</Markdown>
        </section>
    </div>
);
  
const LabActivityDisplay = ({ lab }: { lab: GenerateLabActivityOutput }) => (
    <div className="document-view">
        <header className="text-center mb-8">
            <h1 className="text-3xl font-bold font-headline text-primary">{lab.labTitle}</h1>
            <p className="text-lg text-muted-foreground">{lab.subjectArea} | {lab.gradeLevel}</p>
            <p className="text-sm text-muted-foreground mt-2"><strong>Time Required:</strong> {lab.timeBreakdown}</p>
        </header>

        <Card className="mb-6">
            <CardHeader><CardTitle className="text-xl font-bold font-headline text-primary">Introduction: Phenomenon</CardTitle></CardHeader>
            <CardContent><div className="prose prose-lg max-w-none"><Markdown>{lab.phenomenonReading}</Markdown></div></CardContent>
        </Card>

        <Card className="mb-6">
            <CardHeader><CardTitle className="text-xl font-bold font-headline text-primary">Pre-Lab Questions</CardTitle></CardHeader>
            <CardContent><ol className="list-decimal pl-5 space-y-2">{lab.preLabQuestions.map((q, i) => <li key={i}>{q}</li>)}</ol></CardContent>
        </Card>
        
        <Card className="mb-6">
            <CardHeader><CardTitle className="text-xl font-bold font-headline text-primary">Student Investigation Design</CardTitle></CardHeader>
            <CardContent className="space-y-4">
                <div><h4 className="font-semibold">1. Testable Question</h4><p className="italic">{lab.testableQuestionPrompt}</p></div>
                <div><h4 className="font-semibold">2. Hypothesis</h4><p className="italic">{lab.hypothesisPrompt}</p></div>
                <div><h4 className="font-semibold">3. Variables</h4><p className="italic"><strong>Independent:</strong> {lab.variablesPrompt.independent}</p><p className="italic"><strong>Dependent:</strong> {lab.variablesPrompt.dependent}</p><p className="italic"><strong>Controlled:</strong> {lab.variablesPrompt.controlled}</p></div>
            </CardContent>
        </Card>

        <Card className="mb-6">
            <CardHeader><CardTitle className="text-xl font-bold font-headline text-primary">Materials and Safety</CardTitle></CardHeader>
            <CardContent>
                <div><strong>Materials & Equipment:</strong> <ul className="list-disc pl-5">{lab.materialsAndEquipment.map((m, i) => <li key={i}>{m}</li>)}</ul></div>
                <div><strong className="text-destructive">Safety Precautions:</strong> <ul className="list-disc pl-5 text-destructive/80">{lab.safetyPrecautions.map((s, i) => <li key={i}>{s}</li>)}</ul></div>
            </CardContent>
        </Card>
    </div>
);

type StyledContentDisplayProps = {
    content: any | null;
    type: string;
};

export default function StyledContentDisplay({ content, type }: StyledContentDisplayProps) {
    if (!content) return null;
    
    const isSocialStudiesTest = content.partI && content.partII?.sets;
    const isMathTest = content.partI && content.partII?.questions && content.partIV?.question;
    const isScienceTest = content.clusters;
    const isELATest = content.part1 && content.part2?.argumentEssay && content.part3?.textAnalysis;
    const isLabActivity = content.labTitle && content.ngssAlignment;

    switch (type) {
        case 'Lesson Plan':
            return <LessonPlanDisplay lessonPlan={content} />;
        case 'Worksheet':
            if (!content.aim) return <div className="p-4 bg-red-100 text-red-800 rounded-md">Error: Worksheet content is missing the 'aim' property.</div>;
            return renderWorksheet(content);
        case 'Teacher Coach':
            if (isLabActivity) return <div className="p-4 bg-yellow-100 text-yellow-800 rounded-md">Teacher Coach for labs coming soon.</div>; // Placeholder
            return renderCoachingAdvice(content);
        case 'Slideshow Outline':
            return renderSlideshowOutline(content);
        case 'Question Cluster':
            return renderQuestionCluster(content);
        case 'Reading Material':
            return <ReadingMaterialDisplay content={content} />;
        case 'Lab Activity':
        case 'Differentiated Version':
             if (isLabActivity) return <LabActivityDisplay lab={content} />;
             // Fallthrough for differentiated tests
        case 'Test':
        case 'Enhanced Version':
            if (isScienceTest) return <ScienceTestDisplay test={content} type={type} />;
            if (isSocialStudiesTest) return <SocialStudiesTestDisplay test={content} />;
            if (isMathTest) return <MathTestDisplay test={content} />;
            if (isELATest) return <ELATestDisplay test={content} />;
            return <div className="p-4 bg-red-100 text-red-800 rounded-md">Error: Unknown test structure.</div>;
        case 'Answer Key':
            if (isScienceTest) return <ScienceAnswerKeyDisplay test={content} />;
            if (isSocialStudiesTest) return <SocialStudiesAnswerKeyDisplay test={content} />;
            if (isELATest) return <ELAAnswerKeyDisplay test={content} />;
            // Add Math Answer Key Display when available
            return <div className="p-4 bg-yellow-100 text-yellow-800 rounded-md">Answer Key display for this test type is not yet implemented.</div>;
        case 'Study Sheet':
            return renderStudySheet(content);
        case 'Student Answer Sheet':
             // Assuming student answer sheet is just a variation of a worksheet for now
            return renderWorksheet(content);
        default:
            try {
                const jsonString = JSON.stringify(content, null, 2);
                return <pre className="whitespace-pre-wrap text-xs bg-muted p-4 rounded-md"><code>{jsonString}</code></pre>
            } catch (e) {
                return <div className="p-4 bg-red-100 text-red-800 rounded-md">Error: Unsupported content type.</div>;
            }
    }
}
