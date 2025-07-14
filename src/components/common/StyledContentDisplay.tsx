
'use client';

import React from 'react';
import Markdown from 'react-markdown';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// This component now intelligently decides how to render content.
// If it looks like a complex lesson plan (has specific headers), it uses the full "document-view" parser.
// Otherwise, it treats it as a general Markdown document but still wraps it in the "document-view" for consistent styling.

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
        {lessonPlan.guidedPractice.graph && (
           <>
              <h4>Embedded Graph</h4>
              <div dangerouslySetInnerHTML={{ __html: lessonPlan.guidedPractice.graph }} className="my-4 flex justify-center" />
           </>
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


type StyledContentDisplayProps = {
    content: any | null;
};

export default function StyledContentDisplay({ content }: StyledContentDisplayProps) {
    if (!content) return null;
    
    // Check if the content is a full lesson plan object or just a string (like a worksheet)
    const isLessonPlanObject = typeof content === 'object' && content !== null && 'lessonOverview' in content;

    if (isLessonPlanObject) {
      return renderLessonPlan(content);
    }

    // Fallback for simpler content (like a worksheet) that is a string in Markdown format
    if (typeof content === 'string') {
        return renderSimpleMarkdown(content);
    }

    return <div className="p-4 bg-red-100 text-red-800 rounded-md">Error: Unsupported content type.</div>;
}
