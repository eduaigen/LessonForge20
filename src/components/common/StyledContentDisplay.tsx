
'use client';

import React, { useState } from 'react';
import Markdown from 'react-markdown';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { type TeacherCoachGeneratorOutput } from '@/ai/schemas/teacher-coach-generator-schemas';
import { type SlideshowOutlineOutput } from '@/ai/schemas/slideshow-outline-generator-schemas';
import type { QuestionClusterOutput } from '@/ai/schemas/question-cluster-generator-schemas';
import type { StudySheetOutput } from '@/ai/schemas/study-sheet-generator-schemas';
import type { GenerateWorksheetOutput } from '@/ai/schemas/worksheet-generator-schemas';
import type { ReadingMaterialOutput } from '@/ai/schemas/reading-material-generator-schemas';
import type { GenerateNVBiologyLessonOutput } from '@/ai/flows/generate-nv-biology-lesson';
import { Button } from '../ui/button';
import { Loader2 } from 'lucide-react';
import { generateComprehensionQuestions, type ComprehensionQuestionOutput } from '@/ai/flows/comprehension-question-generator';
import { useToast } from '@/hooks/use-toast';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import GeneratingAnimation from './GeneratingAnimation';
import type { GeneratedContent } from '../generators/NVBiologyGenerator';

const renderTableFromObject = (tableData: { title: string, headers: string[], rows: string[][] } | null) => {
    if (!tableData || !tableData.headers || !tableData.rows) return null;
    return (
        <div className="overflow-x-auto my-4">
            <h4 className="font-semibold text-lg mb-2">{tableData.title}</h4>
            <table className="w-full border-collapse">
                <thead>
                    <tr className="border-b">
                        {tableData.headers.map((header, index) => <th key={index} className="p-2 text-left font-semibold text-foreground">{header}</th>)}
                    </tr>
                </thead>
                <tbody>
                    {tableData.rows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="border-b">
                            {row.map((cell, cellIndex) => <td key={cellIndex} className="p-2 align-top">{cell}</td>)}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};


const renderSimpleMarkdown = (content: string) => {
    const renderMath = (match: any, isBlock: boolean) => {
        const math = match[1];
        try {
            if (isBlock) {
                return <BlockMath math={math} />;
            } else {
                return <InlineMath math={math} />;
            }
        } catch (error) {
            console.error("KaTeX rendering error:", error);
            return <span>{isBlock ? `\\[${math}\\]` : `\\(${math}\\)`}</span>;
        }
    };
    
    return (
        <div className="document-view">
             <Markdown components={{
                table: ({node, ...props}) => <div className="overflow-x-auto my-4"><table className="w-full" {...props} /></div>,
                h1: ({node, ...props}) => <h1 {...props} />,
                h2: ({node, ...props}) => <h2 {...props} />,
                h3: ({node, ...props}) => <h3 {...props} />,
                h4: ({node, ...props}) => <h4 {...props} />,
                ul: ({node, ...props}) => <ul {...props} />,
                ol: ({node, ...props}) => <ol {...props} />,
                li: ({node, ...props}) => <li {...props} />,
                p: ({ node, ...props }) => {
                    const children = React.Children.toArray(props.children);
                    const newChildren = children.map((child, index) => {
                        if (typeof child === 'string') {
                            const parts = child.split(/(\\\(.*?\)|\\\[.*?\\\])/g);
                            return parts.map((part, i) => {
                                const inlineMatch = part.match(/^\\\((.*)\\\)$/);
                                if (inlineMatch) return <InlineMath key={i} math={inlineMatch[1]} />;

                                const blockMatch = part.match(/^\\\[(.*)\\\]$/);
                                if (blockMatch) return <BlockMath key={i} math={blockMatch[1]} />;
                                
                                return part;
                            });
                        }
                        return child;
                    });
                    return <p {...props}>{newChildren}</p>;
                },
                strong: ({node, ...props}) => <strong {...props} />,
                blockquote: ({node, ...props}) => <blockquote {...props} />,
                svg: ({ node, ...props }) => {
                    const svgString = node?.properties?.src as string;
                    if (!svgString || typeof svgString !== 'string') {
                      const rawSvg = node?.children?.map(c => (c as any).value).join('');
                      if (rawSvg) {
                         return <div className="my-4 flex justify-center" dangerouslySetInnerHTML={{ __html: rawSvg }} />
                      }
                      return null;
                    }
                    return <div className="my-4 flex justify-center" dangerouslySetInnerHTML={{ __html: svgString }} />
                },
                 span: ({ node, className, children, ...props }) => {
                    if (className === 'math') {
                        const content = (children as string[]).join('');
                        const math = content.replace(/^\\\((.*)\\\)$/, '$1');
                        return <InlineMath math={math} />;
                    }
                    return <span className={className} {...props}>{children}</span>;
                }
            }}>
                {content}
            </Markdown>
        </div>
    );
};


const renderLeveledQuestions = (questions: { question: string; dok: number; options?: string[]; answer?: string; }[]) => (
  <ol className="list-decimal pl-5 space-y-4">
    {questions.map((q, i) => (
      <li key={i}>
        <p>{q.question} <span className="text-xs text-muted-foreground">(DOK {q.dok})</span></p>
        {q.options && (
          <ul className="list-[lower-alpha] pl-6 mt-2">
            {q.options.map(opt => <li key={opt}>{opt}</li>)}
             {q.answer && <li className="text-green-600 font-semibold mt-1">Correct Answer: {q.answer}</li>}
          </ul>
        )}
      </li>
    ))}
  </ol>
);

const LessonSection = ({ title, children }: { title: string; children: React.ReactNode }) => (
    <section className="mb-8 border-b pb-6 last:border-b-0">
        <h2 className="text-2xl font-bold font-headline text-primary mb-4">{title}</h2>
        <div className="space-y-4 document-view">{children}</div>
    </section>
);

const renderLessonPlan = (lessonPlan: GenerateNVBiologyLessonOutput) => {
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

    return (
        <div className="p-4">
            <header className="text-center mb-8">
                <h1 className="text-3xl font-bold font-headline text-primary">{lessonOverview.lesson}</h1>
                <p className="text-lg text-muted-foreground"><strong>Unit:</strong> {lessonOverview.unit}</p>
                <p className="text-lg text-muted-foreground"><strong>Topic:</strong> {lessonOverview.topic}</p>
            </header>

            <LessonSection title="I. Lesson Overview">
                <div><strong>Summary:</strong> <p>{lessonOverview.lessonSummary}</p></div>
                <div><strong>Standards:</strong> <p>{lessonOverview.standards}</p></div>
                <div><strong>Aim/Essential Question:</strong> <p>{lessonOverview.aim}</p></div>
                <div><strong>Objectives:</strong> <ul className="list-disc pl-5">{lessonOverview.objectives.map((o, i) => <li key={i}>{o}</li>)}</ul></div>
                <div><strong>Key Vocabulary:</strong> <ul className="list-disc pl-5">{lessonOverview.vocabulary.map((v, i) => <li key={i}><strong>{v.term}:</strong> {v.definition}</li>)}</ul></div>
                <div><strong>Materials Needed:</strong> <ul className="list-disc pl-5">{lessonOverview.materials.map((m, i) => <li key={i}>{m}</li>)}</ul></div>
            </LessonSection>

            <LessonSection title="A. Do Now (5–8 min)">
                <div><h4>Question</h4><p>{doNow.question}</p></div>
                <div><h4>Teacher Actions</h4><ul className="list-disc pl-5">{doNow.teacherActions.map((a, i) => <li key={i}>{a}</li>)}</ul></div>
                <div><h4>Expected Student Outputs</h4><ul className="list-disc pl-5">{doNow.expectedStudentOutputs.map((o, i) => <li key={i}>{o}</li>)}</ul></div>
            </LessonSection>

            <LessonSection title="B. Mini-Lesson / Direct Instruction (10–15 min)">
                <div><h4>Reading Passage</h4><Markdown>{miniLesson.readingPassage}</Markdown></div>
                {miniLesson.diagram && <div><h4>Diagram Description</h4><blockquote className="border-l-4 border-primary pl-4 italic">{miniLesson.diagram}</blockquote></div>}
                <div><h4>Concept-Check Questions</h4>{renderLeveledQuestions(miniLesson.conceptCheckQuestions)}</div>
                <div><h4>Teacher Actions</h4><ul className="list-disc pl-5">{miniLesson.teacherActions.map((a, i) => <li key={i}>{a}</li>)}</ul></div>
                <div><h4>Expected Student Outputs</h4><ul className="list-disc pl-5">{miniLesson.expectedStudentOutputs.map((o, i) => <li key={i}>{o}</li>)}</ul></div>
            </LessonSection>

            <LessonSection title="C. Guided Practice / Group Activity (15–20 min)">
                {typeof guidedPractice.activityContent === 'string' 
                 ? <div><h4>Activity Description</h4><p>{guidedPractice.activityContent}</p></div>
                 : renderTableFromObject(guidedPractice.activityContent)
                }
                <div><h4>Teacher Actions</h4><ul className="list-disc pl-5">{guidedPractice.teacherActions.map((a, i) => <li key={i}>{a}</li>)}</ul></div>
                <div><h4>Expected Student Outputs</h4><ul className="list-disc pl-5">{guidedPractice.expectedStudentOutputs.map((o, i) => <li key={i}>{o}</li>)}</ul></div>
            </LessonSection>

             <LessonSection title="D. Check for Understanding (CFU)">
                <h4>CFU Questions</h4>
                {renderLeveledQuestions([...checkFoUnderstanding.multipleChoice, checkFoUnderstanding.shortResponse])}
                <div><h4>Teacher Actions</h4><ul className="list-disc pl-5">{checkFoUnderstanding.teacherActions.map((a, i) => <li key={i}>{a}</li>)}</ul></div>
                <div><h4>Expected Student Outputs</h4><ul className="list-disc pl-5">{checkFoUnderstanding.expectedStudentOutputs.map((o, i) => <li key={i}>{o}</li>)}</ul></div>
            </LessonSection>

            <LessonSection title="E. Independent Practice / Performance Task">
                <div><h4>Task Prompt</h4><p>{independentPractice.taskPrompt}</p></div>
                {renderTableFromObject(independentPractice.taskData)}
                <div><h4>Teacher Actions</h4><ul className="list-disc pl-5">{independentPractice.teacherActions.map((a, i) => <li key={i}>{a}</li>)}</ul></div>
                <div><h4>Expected Student Outputs</h4><ul className="list-disc pl-5">{independentPractice.expectedStudentOutputs.map((o, i) => <li key={i}>{o}</li>)}</ul></div>
            </LessonSection>

            <LessonSection title="F. Closure / Exit Ticket">
                <div><h4>Exit Ticket Question</h4><p>{closure.exitTicketQuestion}</p></div>
                <div><h4>Teacher Actions</h4><ul className="list-disc pl-5">{closure.teacherActions.map((a, i) => <li key={i}>{a}</li>)}</ul></div>
                <div><h4>Expected Student Outputs</h4><ul className="list-disc pl-5">{closure.expectedStudentOutputs.map((o, i) => <li key={i}>{o}</li>)}</ul></div>
            </LessonSection>

            <LessonSection title="G. Homework Activity">
                <div><h4>Activity</h4><Markdown>{homework.activity}</Markdown></div>
            </LessonSection>

            <LessonSection title="H. Differentiation & Support">
                <div><h4>Teacher Actions for Support</h4><ul className="list-disc pl-5">{differentiation.supportActions.map((a, i) => <li key={i}>{a}</li>)}</ul></div>
                <div><h4>Expected Student Outputs with Support</h4><ul className="list-disc pl-5">{differentiation.supportOutputs.map((o, i) => <li key={i}>{o}</li>)}</ul></div>
                <div><h4>Scaffolded Materials</h4><p>{differentiation.scaffoldedMaterials}</p></div>
                <div><h4>Extension Activity</h4><p>{differentiation.extensionActivity}</p></div>
            </LessonSection>
        </div>
    );
};


// =================================================================
// Worksheet Rendering
// =================================================================

const renderWorksheetHeader = () => (
    <header className="mb-8 grid grid-cols-1 sm:grid-cols-3 gap-x-8 gap-y-4 border-b pb-4">
        <div className="flex items-end space-x-2 col-span-1 sm:col-span-2">
            <label className="font-semibold whitespace-nowrap">Name:</label>
            <div className="flex-grow border-b border-foreground/50 w-full"></div>
        </div>
        <div className="flex items-end space-x-2">
            <label className="font-semibold">Date:</label>
            <div className="flex-grow border-b border-foreground/50"></div>
        </div>
        <div className="flex items-end space-x-2">
            <label className="font-semibold">Period:</label>
            <div className="flex-grow border-b border-foreground/50"></div>
        </div>
    </header>
);

const renderWorksheet = (worksheet: GenerateWorksheetOutput) => (
    <div className="document-view">
        {renderWorksheetHeader()}

        <p className="italic text-muted-foreground mb-6">{worksheet.introduction}</p>

        <section className="mb-6">
            <h3>A. AIM & VOCABULARY</h3>
            <p className="mt-2"><strong>Aim / Essential Question:</strong> {worksheet.aim.essentialQuestion}</p>
            <p className="mt-2">{worksheet.aim.rewriteSpace}</p>
            <div className="my-4 h-16 border-b border-dashed"></div>
            
            <h4 className="mt-4">{worksheet.vocabulary.title}</h4>
            <ul className="list-disc pl-5 mt-2 space-y-2">
                {worksheet.vocabulary.terms.map(v => <li key={v.term}><strong>{v.term}:</strong> {v.definition}</li>)}
            </ul>
        </section>

        <section className="mb-6">
            <h3>{worksheet.doNow.title}</h3>
            <p>{worksheet.doNow.question}</p>
            <div className="my-4 h-24 border-b border-dashed"></div>
        </section>

        <section className="mb-6">
            <h3>{worksheet.miniLesson.title}</h3>
            {worksheet.miniLesson.readingPassage && (
                <>
                    <h4>Reading Passage</h4>
                    <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: worksheet.miniLesson.readingPassage.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                </>
            )}
             {worksheet.miniLesson.diagramDescription && (
                <>
                    <h4>Diagram for Analysis</h4>
                    <blockquote className="border-l-4 border-primary pl-4 italic">
                        {worksheet.miniLesson.diagramDescription}
                    </blockquote>
                </>
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
                        {[...Array(5)].map((_, i) => (
                            <tr key={i} className="border-b">
                                <td className="p-2 h-16 align-top"></td>
                                <td className="p-2 h-16 align-top"></td>
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
                            <div className="my-2 h-12 border-b border-dashed"></div>
                        </li>
                    ))}
                    </ol>
                </>
            )}
        </section>
        
        <section className="mb-6">
            <h3>{worksheet.guidedPractice.title}</h3>
            {worksheet.guidedPractice.instructions.map((inst, i) => <p key={i}>{inst}</p>)}
            {worksheet.guidedPractice.dataTable && renderTableFromObject(worksheet.guidedPractice.dataTable)}
            <div className="my-4 h-24 border-b border-dashed"></div>
        </section>

        <section className="mb-6">
            <h3>{worksheet.checkFoUnderstanding.title}</h3>
            <ol className="list-decimal pl-5 space-y-4">
                {worksheet.checkFoUnderstanding.multipleChoice.map((mc, i) => (
                    <li key={i}>
                        <p>{mc.question}</p>
                        <ul className="list-[lower-alpha] pl-6 mt-2">
                           {mc.options.map(opt => <li key={opt}>{opt}</li>)}
                        </ul>
                    </li>
                ))}
                <li>
                    <p>{worksheet.checkFoUnderstanding.shortResponse.question}</p>
                    <div className="my-2 h-16 border-b border-dashed"></div>
                </li>
            </ol>
        </section>

        <section className="mb-6">
            <h3>{worksheet.independentPractice.title}</h3>
            <p>{worksheet.independentPractice.taskPrompt}</p>
            {worksheet.independentPractice.taskData && renderTableFromObject(worksheet.independentPractice.taskData)}
            <div className="my-4 h-32 border-b border-dashed"></div>
        </section>

        <section className="mb-6">
            <h3>{worksheet.closure.title}</h3>
            <p>{worksheet.closure.exitTicketQuestion}</p>
            <div className="my-4 h-16 border-b border-dashed"></div>
        </section>

        <section>
            <h3>{worksheet.homework.title}</h3>
            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: worksheet.homework.activity.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
            {worksheet.homework.extensionActivity && (
                <div className="mt-4">
                    <h4>Extension Activity</h4>
                    <p>{worksheet.homework.extensionActivity}</p>
                </div>
            )}
            {worksheet.homework.differentiation_support && (
                 <div className="mt-4">
                    <h4>Support Materials</h4>
                    <p>{worksheet.homework.differentiation_support}</p>
                </div>
            )}
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
                <div><strong>Lesson Title:</strong> {advice.lessonTitle}</div>
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
            {outline.slides.map((slide, index) => (
                <section key={index} className="mb-6 border-b pb-4">
                    <h3>Slide {index + 1}: {slide.title}</h3>
                     <div className="prose prose-lg max-w-none">
                        <Markdown>{slide.content.join('\n\n')}</Markdown>
                    </div>
                </section>
            ))}
        </div>
    );
};

const renderQuestionCluster = (cluster: QuestionClusterOutput) => {
    return (
      <div className="document-view">
        {renderWorksheetHeader()}
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
                    {cluster.questions.mcq1.options.map((opt:string) => <li key={opt}>{opt}</li>)}
                  </ul>
                  <p className="text-sm"><em>Correct Answer: {cluster.questions.mcq1.answer}</em></p>
                </li>
                <li>
                  <p>{cluster.questions.mcq2.question}</p>
                  <ul className="list-[lower-alpha] pl-6">
                    {cluster.questions.mcq2.options.map((opt:string) => <li key={opt}>{opt}</li>)}
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

const renderStudySheet = (studySheet: StudySheetOutput) => (
    <div className="document-view">
        <header className="text-center mb-8">
            <h1 className="text-3xl font-bold font-headline text-primary">{studySheet.lessonTitle}</h1>
            <p className="text-lg text-muted-foreground mt-2"><strong>Essential Question:</strong> {studySheet.essentialQuestion}</p>
        </header>

        <section className="mb-6">
            <h2>Key Vocabulary</h2>
            <ul className="list-disc pl-5 space-y-2">
                {studySheet.vocabulary.map((item, index) => (
                    <li key={index}>
                        <strong>{item.term}:</strong> {item.definition}
                    </li>
                ))}
            </ul>
        </section>

        <section className="mb-6">
            <h2>Core Concepts</h2>
            <ul className="list-disc pl-5 space-y-2">
                {studySheet.coreConcepts.map((concept, index) => (
                    <li key={index}>{concept}</li>
                ))}
            </ul>
        </section>

        {studySheet.keyDiagram && (
            <section className="mb-6">
                <h2>Key Diagram / Model</h2>
                <blockquote className="border-l-4 border-primary pl-4 italic">
                    {studySheet.keyDiagram}
                </blockquote>
            </section>
        )}

        <section className="mb-6">
            <h2>Key Activities & Data Summary</h2>
            <ul className="list-disc pl-5 space-y-3">
                {studySheet.activitiesAndData.map((activity, index) => (
                    <li key={index}>
                        <strong>{activity.activityTitle}:</strong> {activity.summary}
                    </li>
                ))}
            </ul>
        </section>

        <section>
            <h2>Practice Questions</h2>
            <ol className="list-decimal pl-5 space-y-4">
                {studySheet.practiceQuestions.map((q, index) => (
                    <li key={index}>
                        <p>{q.question} <em className="text-xs text-muted-foreground">({q.source})</em></p>
                        <div className="my-2 h-12 border-b border-dashed"></div>
                    </li>
                ))}
            </ol>
        </section>
    </div>
);

const ReadingMaterialDisplay = ({ content }: { content: ReadingMaterialOutput }) => {
    const { toast } = useToast();
    const [isGenerating, setIsGenerating] = useState(false);
    const [questions, setQuestions] = useState<ComprehensionQuestionOutput | null>(null);

    const handleGenerateQuestions = async () => {
        setIsGenerating(true);
        setQuestions(null);
        try {
            const result = await generateComprehensionQuestions({ articleContent: content.articleContent });
            setQuestions(result);
        } catch (error) {
            console.error("Question generation failed:", error);
            toast({
                title: "Question Generation Failed",
                description: "An error occurred while generating questions. Please try again.",
                variant: "destructive",
            });
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <div className="document-view">
            {renderWorksheetHeader()}
            {renderSimpleMarkdown(content.articleContent)}

            <div className="my-6 text-center">
                <Button onClick={handleGenerateQuestions} disabled={isGenerating}>
                    {isGenerating ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    {isGenerating ? 'Generating Questions...' : 'Generate Questions'}
                </Button>
            </div>

            {isGenerating && <GeneratingAnimation />}
            
            {questions && (
                <Card className="mt-6">
                    <CardHeader>
                        <CardTitle>Comprehension Questions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ol className="list-decimal pl-5 space-y-4">
                            {questions.questions.map((q, i) => (
                                <li key={i}>
                                    {q}
                                    <div className="my-2 h-12 border-b border-dashed"></div>
                                </li>
                            ))}
                        </ol>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};


type StyledContentDisplayProps = {
    content: any | null;
    type: GeneratedContent['type'];
};

export default function StyledContentDisplay({ content, type }: StyledContentDisplayProps) {
    if (!content) return null;
    
    switch (type) {
        case 'Lesson Plan':
            return renderLessonPlan(content);
        case 'Worksheet':
            return renderWorksheet(content);
        case 'Teacher Coach':
            return renderCoachingAdvice(content);
        case 'Slideshow Outline':
            return renderSlideshowOutline(content);
        case 'Question Cluster':
            return renderQuestionCluster(content);
        case 'Study Sheet':
            return renderStudySheet(content);
        case 'Reading Material':
            return <ReadingMaterialDisplay content={content} />;
        default:
            try {
                const jsonString = JSON.stringify(content, null, 2);
                return <pre className="whitespace-pre-wrap text-xs bg-muted p-4 rounded-md"><code>{jsonString}</code></pre>
            } catch (e) {
                return <div className="p-4 bg-red-100 text-red-800 rounded-md">Error: Unsupported content type.</div>;
            }
    }
}
