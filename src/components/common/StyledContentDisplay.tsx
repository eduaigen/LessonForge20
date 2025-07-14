
'use client';

import React from 'react';
import Markdown from 'react-markdown';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import { type TeacherCoachGeneratorOutput } from '@/ai/schemas/teacher-coach-generator-schemas';
import { type SlideshowOutlineOutput } from '@/ai/schemas/slideshow-outline-generator-schemas';
import type { QuestionClusterOutput } from '@/ai/schemas/question-cluster-generator-schemas';

// This component now intelligently decides how to render content.

const renderSimpleMarkdown = (content: string) => {
    return (
        <div className="document-view">
             <Markdown components={{
                table: ({node, ...props}) => <div className="overflow-x-auto my-4"><table {...props} /></div>,
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
                svg: ({ node, ...props }) => <div className="my-4 flex justify-center" dangerouslySetInnerHTML={{ __html: node?.properties?.src as string }} />,
            }}>
                {content}
            </Markdown>
        </div>
    );
};


const renderLessonPlan = (lessonPlan: any) => (
  <div className="document-view">
    <h1>{lessonPlan.lessonOverview.lesson}</h1>

    <section className="mb-6">
      <h2>I. LESSON OVERVIEW</h2>
      <p><strong>Unit:</strong> {lessonPlan.lessonOverview.unit}</p>
      <p><strong>Topic:</strong> {lessonPlan.lessonOverview.topic}</p>
      <p><strong>Lesson Summary:</strong> {lessonPlan.lessonOverview.lessonSummary}</p>
      <p><strong>NGSS / NYSSLS Standards:</strong> {lessonPlan.lessonOverview.standards}</p>
      
      <h3>A. Aim / Essential Question</h3>
      <p><strong>Aim:</strong> {lessonPlan.lessonOverview.aim}</p>
      <p><strong>Essential Question:</strong> {lessonPlan.lessonOverview.essentialQuestion}</p>

      <h3>Lesson Objectives</h3>
      <ul className="list-disc pl-5">
          {lessonPlan.lessonOverview.objectives.map((obj: string, i: number) => <li key={i}>{obj}</li>)}
      </ul>

      <h3>Key Vocabulary</h3>
      <ul className="list-disc pl-5">
          {lessonPlan.lessonOverview.vocabulary.map((vocab: {term: string, definition: string}, i: number) => <li key={i}><strong>{vocab.term}:</strong> {vocab.definition}</li>)}
      </ul>

      <h3>Materials Needed</h3>
      <ul className="list-disc pl-5">
          {lessonPlan.lessonOverview.materials.map((mat: string, i: number) => <li key={i}>{mat}</li>)}
      </ul>
    </section>

    <section className="mb-6">
      <h2>II. LESSON SEQUENCE</h2>
      
      <div className="mb-4">
        <h3>B. DO NOW (5–8 min)</h3>
        <h4>Teacher Actions</h4>
        <ul className="list-disc pl-5">
          {lessonPlan.doNow.teacherActions.map((item: string, index: number) => <li key={index}>{item}</li>)}
        </ul>
        <h4>Expected Student Outputs</h4>
        <ul className="list-disc pl-5">
          {lessonPlan.doNow.expectedStudentOutputs.map((item: string, index: number) => <li key={index}>{item}</li>)}
        </ul>
        <p><strong>Question:</strong> {lessonPlan.doNow.question}</p>
      </div>

      <div className="mb-4">
        <h3>C. MINI-LESSON / DIRECT INSTRUCTION (10–15 min)</h3>
        <h4>Teacher Actions</h4>
        <ul className="list-disc pl-5">{lessonPlan.miniLesson.teacherActions.map((item: string, index: number) => <li key={index}>{item}</li>)}</ul>
        <h4>Expected Student Outputs</h4>
        <ul className="list-disc pl-5">{lessonPlan.miniLesson.expectedStudentOutputs.map((item: string, index: number) => <li key={index}>{item}</li>)}</ul>
        <h4>Embedded Reading Passage</h4>
        <p>{lessonPlan.miniLesson.readingPassage}</p>
        {lessonPlan.miniLesson.diagram && (
           <>
              <h4>Embedded Diagram</h4>
              <div dangerouslySetInnerHTML={{ __html: lessonPlan.miniLesson.diagram }} className="my-4 flex justify-center" />
           </>
        )}
        <h4>Concept-Check Questions</h4>
        <ol className="list-decimal pl-5">
          {lessonPlan.miniLesson.conceptCheckQuestions.map((q: string, i: number) => <li key={i}>{q}</li>)}
        </ol>
      </div>

      <div className="mb-4">
        <h3>D. GUIDED PRACTICE / GROUP ACTIVITY (15–20 min)</h3>
        <h4>Teacher Actions</h4>
        <ul className="list-disc pl-5">{lessonPlan.guidedPractice.teacherActions.map((item: string, index: number) => <li key={index}>{item}</li>)}</ul>
        <h4>Expected Student Outputs</h4>
        <ul className="list-disc pl-5">{lessonPlan.guidedPractice.expectedStudentOutputs.map((item: string, index: number) => <li key={index}>{item}</li>)}</ul>
        {lessonPlan.guidedPractice.dataTable && (
            <div className="overflow-x-auto">
                <h4>{lessonPlan.guidedPractice.dataTable.title}</h4>
                <table className="w-full my-4">
                <thead>
                    <tr>{lessonPlan.guidedPractice.dataTable.headers.map((header: string, index: number) => <th key={index}>{header}</th>)}</tr>
                </thead>
                <tbody>
                    {lessonPlan.guidedPractice.dataTable.rows.map((row: string[], rowIndex: number) => (
                    <tr key={rowIndex}>{row.map((cell: string, cellIndex: number) => <td key={cellIndex}>{cell}</td>)}</tr>
                    ))}
                </tbody>
                </table>
            </div>
        )}
        {lessonPlan.guidedPractice.activityDescription && <p>{lessonPlan.guidedPractice.activityDescription}</p>}
      </div>
      
      <div className="mb-4">
        <h3>E. CHECK FOR UNDERSTANDING (CFU)</h3>
        <h4>Teacher Actions</h4>
        <ul className="list-disc pl-5">{lessonPlan.checkFoUnderstanding.teacherActions.map((item: string, index: number) => <li key={index}>{item}</li>)}</ul>
        <h4>Expected Student Outputs</h4>
        <ul className="list-disc pl-5">{lessonPlan.checkFoUnderstanding.expectedStudentOutputs.map((item: string, index: number) => <li key={index}>{item}</li>)}</ul>
        <h4>CFU Questions</h4>
        <ol className="list-decimal pl-5">
          {lessonPlan.checkFoUnderstanding.multipleChoice.map((mc: { question: string, options: string[], answer: string }, i: number) => (
            <li key={i}>
              {mc.question}
              <ul className="list-[lower-alpha] pl-6">
                {mc.options.map((opt, j) => <li key={j}>{opt}</li>)}
              </ul>
              <p><em>Answer: {mc.answer}</em></p>
            </li>
          ))}
          <li>{lessonPlan.checkFoUnderstanding.shortResponse}</li>
        </ol>
      </div>

       <div className="mb-4">
        <h3>F. INDEPENDENT PRACTICE / PERFORMANCE TASK</h3>
        <h4>Teacher Actions</h4>
        <ul className="list-disc pl-5">{lessonPlan.independentPractice.teacherActions.map((item: string, index: number) => <li key={index}>{item}</li>)}</ul>
        <h4>Expected Student Outputs</h4>
        <ul className="list-disc pl-5">{lessonPlan.independentPractice.expectedStudentOutputs.map((item: string, index: number) => <li key={index}>{item}</li>)}</ul>
        <h4>Embedded Task</h4>
        <p><strong>Prompt:</strong> {lessonPlan.independentPractice.taskPrompt}</p>
        {lessonPlan.independentPractice.taskData && (
             <div className="overflow-x-auto">
                <h4>{lessonPlan.independentPractice.taskData.title}</h4>
                <table className="w-full my-4">
                <thead>
                    <tr>{lessonPlan.independentPractice.taskData.headers.map((header: string, index: number) => <th key={index}>{header}</th>)}</tr>
                </thead>
                <tbody>
                    {lessonPlan.independentPractice.taskData.rows.map((row: string[], rowIndex: number) => (
                    <tr key={rowIndex}>{row.map((cell: string, cellIndex: number) => <td key={cellIndex}>{cell}</td>)}</tr>
                    ))}
                </tbody>
                </table>
            </div>
        )}
      </div>

       <div className="mb-4">
        <h3>G. CLOSURE / EXIT TICKET</h3>
        <h4>Teacher Actions</h4>
        <ul className="list-disc pl-5">{lessonPlan.closure.teacherActions.map((item: string, index: number) => <li key={index}>{item}</li>)}</ul>
        <h4>Expected Student Outputs</h4>
        <ul className="list-disc pl-5">{lessonPlan.closure.expectedStudentOutputs.map((item: string, index: number) => <li key={index}>{item}</li>)}</ul>
        <p><strong>Exit Ticket Question:</strong> {lessonPlan.closure.exitTicketQuestion}</p>
      </div>

       <div className="mb-4">
        <h3>H. HOMEWORK ACTIVITY</h3>
        <p>{lessonPlan.homework.activity}</p>
      </div>
    </section>

    <section className="mb-6">
      <h2>III. DIFFERENTIATION & SUPPORT</h2>
      <h4>Teacher Actions for Support</h4>
      <ul className="list-disc pl-5">{lessonPlan.differentiation.supportActions.map((item: string, index: number) => <li key={index}>{item}</li>)}</ul>
      <h4>Expected Student Outputs with Support</h4>
      <ul className="list-disc pl-5">{lessonPlan.differentiation.supportOutputs.map((item: string, index: number) => <li key={index}>{item}</li>)}</ul>
      <h4>Extension Activity</h4>
      <p>{lessonPlan.differentiation.extensionActivity}</p>
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
            <h1>Teacher Coaching Guide</h1>
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
            <h1>Slideshow Outline</h1>
            {outline.slides.map((slide, index) => (
                <section key={index} className="mb-6 border-b pb-4">
                    <h3>Slide {index + 1}: {slide.title}</h3>
                    <ul className="list-disc pl-5 space-y-2">
                        {slide.content.map((point, pointIndex) => (
                            <li key={pointIndex}>{point}</li>
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    );
};

const renderQuestionCluster = (cluster: QuestionClusterOutput) => {
    return (
      <div className="document-view">
        <h1>NGSS Question Cluster</h1>
        <section className="mb-6">
          <h2>Phenomenon</h2>
          <p className="italic">{cluster.phenomenon}</p>
        </section>
        <section className="mb-6">
          <h2>Stimulus Material</h2>
          <h4>Passage</h4>
          <p>{cluster.stimulus.passage}</p>
          <div className="my-4">
            <h4>Visual</h4>
            {cluster.stimulus.visual.startsWith('<svg') ? (
               <div dangerouslySetInnerHTML={{ __html: cluster.stimulus.visual }} />
            ) : (
                <Markdown>{cluster.stimulus.visual}</Markdown>
            )}
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
                    {cluster.questions.mcq1.options.map(opt => <li key={opt}>{opt}</li>)}
                  </ul>
                  <p className="text-sm"><em>Correct Answer: {cluster.questions.mcq1.answer}</em></p>
                </li>
                <li>
                  <p>{cluster.questions.mcq2.question}</p>
                  <ul className="list-[lower-alpha] pl-6">
                    {cluster.questions.mcq2.options.map(opt => <li key={opt}>{opt}</li>)}
                  </ul>
                   <p className="text-sm"><em>Correct Answer: {cluster.questions.mcq2.answer}</em></p>
                </li>
              </ol>
            </div>
            <div>
              <h3>Short Response</h3>
              <ol className="list-decimal pl-5 space-y-4">
                <li>{cluster.questions.shortResponse1}</li>
                <li>{cluster.questions.shortResponse2}</li>
              </ol>
            </div>
            <div>
              <h3>Modeling</h3>
              <p>{cluster.questions.modeling}</p>
            </div>
            <div>
              <h3>Prediction</h3>
              <p>{cluster.questions.prediction}</p>
            </div>
          </div>
        </section>
      </div>
    );
  };


type StyledContentDisplayProps = {
    content: any | null;
};

export default function StyledContentDisplay({ content }: StyledContentDisplayProps) {
    if (!content) return null;
    
    const isLessonPlanObject = typeof content === 'object' && content !== null && 'lessonOverview' in content;
    const isCoachingObject = typeof content === 'object' && content !== null && 'doNow' in content && 'pedagogicalRationale' in content.doNow;
    const isSlideshowObject = typeof content === 'object' && content !== null && 'slides' in content;
    const isQuestionClusterObject = typeof content === 'object' && content !== null && 'phenomenon' in content && 'questions' in content;

    if (isLessonPlanObject) {
      return renderLessonPlan(content);
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

    if (typeof content === 'string') {
        return renderSimpleMarkdown(content);
    }

    return <div className="p-4 bg-red-100 text-red-800 rounded-md">Error: Unsupported content type.</div>;
}
