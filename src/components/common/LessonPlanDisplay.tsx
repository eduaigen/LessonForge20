
'use client';

import React from 'react';
import type { GenerateNVBiologyLessonOutput } from '@/ai/flows/generate-nv-biology-lesson';

type LessonPlanDisplayProps = {
  lessonPlan: GenerateNVBiologyLessonOutput;
};

const Section = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <section className="mb-6">
    <h2>{title}</h2>
    {children}
  </section>
);

const SubSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mb-4">
    <h3>{title}</h3>
    {children}
  </div>
);

const ActionList = ({ title, items }: { title: string, items: string[] }) => (
  <div>
    <h4>{title}</h4>
    <ul className="list-disc pl-5">
      {items.map((item, index) => <li key={index}>{item}</li>)}
    </ul>
  </div>
);

const DataTable = ({ title, table }: { title: string, table: { headers: string[], rows: string[][] } }) => (
  <div className="overflow-x-auto">
    <h4>{title}</h4>
    <table className="w-full my-4">
      <thead>
        <tr>
          {table.headers.map((header, index) => <th key={index}>{header}</th>)}
        </tr>
      </thead>
      <tbody>
        {table.rows.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => <td key={cellIndex}>{cell}</td>)}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);


export default function LessonPlanDisplay({ lessonPlan }: LessonPlanDisplayProps) {
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

  return (
    <div className="document-view">
      <h1>{lessonOverview.lesson}</h1>

      <Section title="I. LESSON OVERVIEW">
        <p><strong>Unit:</strong> {lessonOverview.unit}</p>
        <p><strong>Topic:</strong> {lessonOverview.topic}</p>
        <p><strong>Lesson Summary:</strong> {lessonOverview.lessonSummary}</p>
        <p><strong>NGSS / NYSSLS Standards:</strong> {lessonOverview.standards}</p>
        
        <h3>A. Aim / Essential Question</h3>
        <p><strong>Aim:</strong> {lessonOverview.aim}</p>
        <p><strong>Essential Question:</strong> {lessonOverview.essentialQuestion}</p>

        <h3>Lesson Objectives</h3>
        <ul className="list-disc pl-5">
            {lessonOverview.objectives.map((obj, i) => <li key={i}>{obj}</li>)}
        </ul>

        <h3>Key Vocabulary</h3>
        <ul className="list-disc pl-5">
            {lessonOverview.vocabulary.map((vocab, i) => <li key={i}><strong>{vocab.term}:</strong> {vocab.definition}</li>)}
        </ul>

        <h3>Materials Needed</h3>
        <ul className="list-disc pl-5">
            {lessonOverview.materials.map((mat, i) => <li key={i}>{mat}</li>)}
        </ul>
      </Section>

      <Section title="II. LESSON SEQUENCE">
        <SubSection title="B. DO NOW (5–8 min)">
          <ActionList title="Teacher Actions" items={doNow.teacherActions} />
          <ActionList title="Expected Student Outputs" items={doNow.expectedStudentOutputs} />
          <p><strong>Question:</strong> {doNow.question}</p>
        </SubSection>

        <SubSection title="C. MINI-LESSON / DIRECT INSTRUCTION (10–15 min)">
          <ActionList title="Teacher Actions" items={miniLesson.teacherActions} />
          <ActionList title="Expected Student Outputs" items={miniLesson.expectedStudentOutputs} />
          <h4>Embedded Reading Passage</h4>
          <p>{miniLesson.readingPassage}</p>
          {miniLesson.diagram && (
             <>
                <h4>Embedded Diagram</h4>
                <div dangerouslySetInnerHTML={{ __html: miniLesson.diagram }} className="my-4 flex justify-center" />
             </>
          )}
          <h4>Concept-Check Questions</h4>
          <ol className="list-decimal pl-5">
            {miniLesson.conceptCheckQuestions.map((q, i) => <li key={i}>{q}</li>)}
          </ol>
        </SubSection>

        <SubSection title="D. GUIDED PRACTICE / GROUP ACTIVITY (15–20 min)">
          <ActionList title="Teacher Actions" items={guidedPractice.teacherActions} />
          <ActionList title="Expected Student Outputs" items={guidedPractice.expectedStudentOutputs} />
          {guidedPractice.dataTable && <DataTable title={guidedPractice.dataTable.title} table={guidedPractice.dataTable} />}
          {guidedPractice.graph && (
             <>
                <h4>Embedded Graph</h4>
                <div dangerouslySetInnerHTML={{ __html: guidedPractice.graph }} className="my-4 flex justify-center" />
             </>
          )}
          {guidedPractice.activityDescription && <p>{guidedPractice.activityDescription}</p>}
        </SubSection>

        <SubSection title="E. CHECK FOR UNDERSTANDING (CFU)">
          <ActionList title="Teacher Actions" items={checkFoUnderstanding.teacherActions} />
          <ActionList title="Expected Student Outputs" items={checkFoUnderstanding.expectedStudentOutputs} />
          <h4>CFU Questions</h4>
          <ol className="list-decimal pl-5">
            {checkFoUnderstanding.multipleChoice.map((mc, i) => (
              <li key={i}>
                {mc.question}
                <ul className="list-[lower-alpha] pl-6">
                  {mc.options.map((opt, j) => <li key={j}>{opt}</li>)}
                </ul>
                <p><em>Answer: {mc.answer}</em></p>
              </li>
            ))}
            <li>{checkFoUnderstanding.shortResponse}</li>
          </ol>
        </SubSection>

        <SubSection title="F. INDEPENDENT PRACTICE / PERFORMANCE TASK">
          <ActionList title="Teacher Actions" items={independentPractice.teacherActions} />
          <ActionList title="Expected Student Outputs" items={independentPractice.expectedStudentOutputs} />
          <h4>Embedded Task</h4>
          <p><strong>Prompt:</strong> {independentPractice.taskPrompt}</p>
          {independentPractice.taskData && <DataTable title={independentPractice.taskData.title} table={independentPractice.taskData} />}
        </SubSection>

        <SubSection title="G. CLOSURE / EXIT TICKET">
          <ActionList title="Teacher Actions" items={closure.teacherActions} />
          <ActionList title="Expected Student Outputs" items={closure.expectedStudentOutputs} />
          <p><strong>Exit Ticket Question:</strong> {closure.exitTicketQuestion}</p>
        </SubSection>

        <SubSection title="H. HOMEWORK ACTIVITY">
          <p>{homework.activity}</p>
        </SubSection>
      </Section>

      <Section title="III. DIFFERENTIATION & SUPPORT">
        <ActionList title="Teacher Actions for Support" items={differentiation.supportActions} />
        <ActionList title="Expected Student Outputs with Support" items={differentiation.supportOutputs} />
        <h4>Extension Activity</h4>
        <p>{differentiation.extensionActivity}</p>
      </Section>
    </div>
  );
}
