
'use client';

import React, { useState } from 'react';
import Markdown from 'react-markdown';
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

// This component now intelligently decides how to render content.

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


const renderTableFromObject = (tableData: { title: string, headers: string[], rows: string[][] }) => {
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
                p: ({node, ...props}) => <p {...props} />,
                strong: ({node, ...props}) => <strong {...props} />,
                blockquote: ({node, ...props}) => <blockquote {...props} />,
                svg: ({ node, ...props }) => {
                    const svgString = node?.properties?.src as string;
                    if (!svgString || typeof svgString !== 'string') {
                      // Attempt to render raw SVG from children if not in src
                      const rawSvg = node?.children?.map(c => (c as any).value).join('');
                      if (rawSvg) {
                         return <div className="my-4 flex justify-center" dangerouslySetInnerHTML={{ __html: rawSvg }} />
                      }
                      return null;
                    }
                    return <div className="my-4 flex justify-center" dangerouslySetInnerHTML={{ __html: svgString }} />
                },
            }}>
                {content}
            </Markdown>
        </div>
    );
};


const renderLessonPlan = (lessonPlan: GenerateNVBiologyLessonOutput) => {
    const renderSection = (title: string, content: any) => {
        const renderContent = () => {
            if (!content) return <p className="text-muted-foreground">Not provided.</p>;
            if (typeof content === 'string') return <p>{content}</p>;
            if (Array.isArray(content)) {
                return (
                    <ul className="list-disc pl-5">
                        {content.map((item, index) => {
                             if (typeof item === 'object' && item !== null) {
                                // For vocabulary or objectives
                                if (item.term && item.definition) {
                                    return <li key={index}><strong>{item.term}:</strong> {item.definition}</li>
                                }
                                if (item.question && item.dok) { // for questions with DOK
                                    return <li key={index}>{item.question} <span className="text-xs font-semibold text-muted-foreground">(DOK {item.dok})</span></li>
                                }
                                 if(item.question && item.options) { // for multiple choice
                                   return <li key={index}>
                                      {item.question} <span className="text-xs font-semibold text-muted-foreground">(DOK {item.dok})</span>
                                      <ul className="list-[lower-alpha] pl-6">
                                        {item.options.map((opt: string, j: number) => <li key={j}>{opt}</li>)}
                                      </ul>
                                      <p><em>Answer: {item.answer}</em></p>
                                    </li>
                                 }
                             }
                             return <li key={index}>{item}</li>
                        })}
                    </ul>
                );
            }
             if (typeof content === 'object') {
                if (content.dataTable) return renderTableFromObject(content.dataTable);
                if (content.taskData) return renderTableFromObject(content.taskData);
                if (content.question && content.dok) {
                    return <p>{content.question} <span className="text-xs font-semibold text-muted-foreground">(DOK {content.dok})</span></p>
                }
                return <pre>{JSON.stringify(content, null, 2)}</pre>;
            }
            return <p>Unsupported content type.</p>;
        };
        
        return (
            <div className="mb-4">
                <h4>{title}</h4>
                {renderContent()}
            </div>
        );
    };

    const renderLessonSection = (sectionTitle: string, section: any) => (
        <section className="mb-6">
            <h2>{sectionTitle}</h2>
            {Object.entries(section).map(([key, value]) => {
                // simple camelCase to Title Case conversion
                const title = key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
                
                // Handle nested objects like data tables or question objects
                if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
                    if ((value as any).dataTable) {
                         return renderSection('Data Table', { dataTable: (value as any).dataTable });
                    }
                    if ((value as any).taskData) {
                         return renderSection('Task Data', { taskData: (value as any).taskData });
                    }
                    if ((value as any).multipleChoice || (value as any).shortResponse) {
                        return (
                            <div key={key}>
                                {renderSection('Multiple Choice', (value as any).multipleChoice)}
                                {renderSection('Short Response', (value as any).shortResponse)}
                            </div>
                        )
                    }
                }
                
                if (key === 'readingPassage') {
                    return (
                        <div key={key} className="mb-4">
                             <h4>Embedded Reading Passage</h4>
                            <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: String(value).replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                        </div>
                    );
                }

                if (key === 'diagram') {
                     return (
                        <div key={key} className="mb-4">
                            <h4>Embedded Diagram Description</h4>
                            <blockquote className="border-l-4 border-primary pl-4 italic">
                                {String(value)}
                            </blockquote>
                        </div>
                    );
                }
                
                return <div key={key}>{renderSection(title, value)}</div>;
            })}
        </section>
    );

    return (
        <div className="document-view">
            {renderSection("I. Lesson Overview", lessonPlan.lessonOverview)}
            {renderLessonSection("B. DO NOW (5–8 min)", lessonPlan.doNow)}
            {renderLessonSection("C. MINI-LESSON / DIRECT INSTRUCTION (10–15 min)", lessonPlan.miniLesson)}
            {renderLessonSection("D. GUIDED PRACTICE / GROUP ACTIVITY (15–20 min)", lessonPlan.guidedPractice)}
            {renderLessonSection("E. CHECK FOR UNDERSTANDING (CFU)", lessonPlan.checkFoUnderstanding)}
            {renderLessonSection("F. INDEPENDENT PRACTICE / PERFORMANCE TASK", lessonPlan.independentPractice)}
            {renderLessonSection("G. CLOSURE / EXIT TICKET", lessonPlan.closure)}
            {renderLessonSection("H. HOMEWORK ACTIVITY", lessonPlan.homework)}
            {renderLessonSection("III. DIFFERENTIATION & SUPPORT", lessonPlan.differentiation)}
        </div>
    );
};

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
        {renderWorksheetHeader()}
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
            <h2>Key Concepts</h2>
            <ul className="list-disc pl-5 space-y-2">
                {studySheet.keyConcepts.map((concept, index) => (
                    <li key={index}>{concept}</li>
                ))}
            </ul>
        </section>
        <section>
            <h2>Real-World Applications & Questions</h2>
            <ul className="list-disc pl-5 space-y-2">
                {studySheet.applications.map((application, index) => (
                    <li key={index}>{application}</li>
                ))}
            </ul>
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
};

export default function StyledContentDisplay({ content }: StyledContentDisplayProps) {
    if (!content) return null;
    
    const isLessonPlanObject = typeof content === 'object' && content !== null && 'lessonOverview' in content;
    const isCoachingObject = typeof content === 'object' && content !== null && content.doNow && 'pedagogicalRationale' in content.doNow;
    const isSlideshowObject = typeof content === 'object' && content !== null && 'slides' in content;
    const isQuestionClusterObject = typeof content === 'object' && content !== null && 'phenomenon' in content && 'questions' in content;
    const isStudySheetObject = typeof content === 'object' && content !== null && 'keyConcepts' in content;
    const isWorksheetObject = typeof content === 'object' && content !== null && 'header' in content && 'doNow' in content;
    const isReadingMaterialObject = typeof content === 'object' && content !== null && 'articleContent' in content && 'questionCluster' in content;

    if (isLessonPlanObject) {
      return renderLessonPlan(content);
    }

    if (isWorksheetObject) {
        return renderWorksheet(content);
    }
    
    if (isCoachingObject) {
        return renderCoachingAdvice(content);
    }

    if (isSlideshowObject) {
        return renderSlideshowOutline(content);
    }

    if (isQuestionClusterObject) {
        return renderQuestionCluster(content);
    }

     if (isStudySheetObject) {
        return renderStudySheet(content);
    }
    
    if (isReadingMaterialObject) {
        return <ReadingMaterialDisplay content={content} />;
    }

    let markdownContent = '';
    if (typeof content === 'string') {
        markdownContent = content;
    } 

    if (markdownContent) {
        return renderSimpleMarkdown(markdownContent);
    }

    // Try to stringify if it's an unrecognized object, for debugging.
    if (typeof content === 'object' && content !== null) {
        try {
            const jsonString = JSON.stringify(content, null, 2);
            return <pre className="whitespace-pre-wrap text-xs bg-muted p-4 rounded-md"><code>{jsonString}</code></pre>
        } catch (e) {
            // ignore
        }
    }


    return <div className="p-4 bg-red-100 text-red-800 rounded-md">Error: Unsupported content type.</div>;
}
