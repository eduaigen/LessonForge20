
'use client';

import React from 'react';
import Markdown from 'react-markdown';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// Helper function to render a single content item
const renderContentItem = (item: string, index: number): React.ReactNode => {
  const trimmedItem = item.trim();
  if (!trimmedItem) return null;

  // LaTeX rendering
  const latexParts = trimmedItem.split(/(\$[^$]+\$|\\\(.+?\\\)|\\\[.+?\\\]|\$\$[^$]+\$\$)/g);
  if (latexParts.length > 1 && latexParts.some(p => p.startsWith('$') || p.startsWith('\\'))) {
    return (
      <p key={index} className="leading-relaxed">
        {latexParts.map((part, i) => {
          if (part.startsWith('$') && part.endsWith('$')) {
            return <InlineMath key={i} math={part.slice(1, -1)} />;
          }
          if (part.startsWith('\\(') && part.endsWith('\\)')) {
            return <InlineMath key={i} math={part.slice(2, -2)} />;
          }
          if (part.startsWith('\\[') && part.endsWith('\\]')) {
            return <BlockMath key={i} math={part.slice(2, -2)} />;
          }
          if (part.startsWith('$$') && part.endsWith('$$')) {
            return <BlockMath key={i} math={part.slice(2, -2)} />;
          }
          return <span key={i}>{part}</span>;
        })}
      </p>
    );
  }

  // SVG rendering
  if (trimmedItem.startsWith('<svg') && trimmedItem.endsWith('</svg>')) {
    return <div key={index} dangerouslySetInnerHTML={{ __html: trimmedItem }} className="my-4" />;
  }
  
  // Table rendering
  if (trimmedItem.includes('|')) {
     return <Markdown key={index} className="prose-sm dark:prose-invert max-w-none">{trimmedItem}</Markdown>;
  }

  // Fallback to Markdown for lists, paragraphs, etc.
  return <Markdown key={index} className="prose-sm dark:prose-invert max-w-none">{trimmedItem}</Markdown>;
};


const parseContent = (content: string) => {
  const sections: { title: string; content: string[] }[] = [];
  const lines = content.split('\n');
  let currentSection: { title: string; content: string[] } | null = null;

  const sectionHeaders = [
    'STUDENT LAB HANDOUT START ---', 'STUDENT RESPONSE SHEET START ---', 'TEACHER KEY & NOTES START ---',
    'RUBRIC START ---', 'STUDENT VERSION START ---', 'ANSWER KEY START ---', 'LESSON OVERVIEW',
    'LABORATORY INVESTIGATION:', 'STUDENT LAB HANDOUT', 'TEACHER ANSWER SHEET', 'AI-POWERED RECOMMENDATIONS',
    'CURRICULUM OVERVIEW', 'NGSS ALIGNMENT', 'LEARNING OBJECTIVES', 'SAFETY PRECAUTIONS', 'INTRODUCTION & BACKGROUND',
    'PROBLEM / INVESTIGATIVE QUESTION', 'HYPOTHESIS DEVELOPMENT', 'VARIABLES', 'MATERIALS', 'PROCEDURE',
    'DATA COLLECTION & OBSERVATIONS', 'DATA ANALYSIS', 'CONCLUSION', 'CLEANUP', 'STUDENT LEARNING OUTCOMES',
    'EXPECTED RESULTS & SAMPLE DATA', 'ANSWERS TO ANALYSIS QUESTIONS', 'SAMPLE CONCLUSION',
    'COMMON STUDENT MISCONCEPTIONS', 'DIFFERENTIATION STRATEGIES', 'ASSESSMENT NOTES',
    '3D ALIGNMENT AUDIT SUMMARY', 'PERFORMANCE EXPECTATIONS ALIGNMENT', 'PHENOMENA-BASED LEARNING CHECK',
    'CRSE & EQUITY LENS', 'ASSESSMENT ALIGNMENT', 'INSTRUCTIONAL COHERENCE', 'EXPORT FORMAT OPTIONS',
    'KEY ELEMENTS FOR STRONG ANSWER', 'MODEL ANSWER POINTS', 'A. AIM / ESSENTIAL QUESTION', 'B. DO NOW',
    'C. MINI-LESSON', 'D. GUIDED PRACTICE', 'E. CHECK FOR UNDERSTANDING', 'F. INDEPENDENT PRACTICE',
    'G. CLOSURE / EXIT TICKET', 'H. HOMEWORK ACTIVITY', 'I. DIFFERENTIATION & SUPPORT',
    // More specific regex patterns
    'WORKSHEET SECTION [A-Z]:', 'PART [IVXLCDM]+:', 'SECTION [A-Z0-9]+:'
  ];

  // Regex to match section headers: either an exact keyword, or a letter/numbering pattern
  const sectionRegex = new RegExp(`^(${sectionHeaders.join('|')}|[A-Z]\\. |\\d+\\.)`, 'i');
  
  lines.forEach(line => {
    const trimmedLine = line.trim();
    if (trimmedLine.length === 0 && currentSection) {
        // preserve paragraph breaks
        currentSection.content.push('');
        return;
    }

    const match = trimmedLine.match(sectionRegex);
    if (match) {
      if (currentSection) {
        sections.push(currentSection);
      }
      currentSection = { title: trimmedLine, content: [] };
    } else if (currentSection) {
      currentSection.content.push(line);
    } else {
       if (sections.length === 0) {
         sections.push({ title: 'Introduction', content: []});
       }
       sections[sections.length - 1].content.push(line);
    }
  });

  if (currentSection) {
    sections.push(currentSection);
  }
  
  return sections.map(sec => ({...sec, content: sec.content.join('\n').split(/\n\s*\n/)})).filter(s => s.title !== 'Introduction' || s.content.some(c => c.trim().length > 0));
};

const SimpleFlowDiagram = ({ data }: { data: string }) => {
    const lines = data.split('\n');
    const title = lines.find(l => l.startsWith('[START_SIMPLE_FLOW_DIAGRAM:'))?.replace('[START_SIMPLE_FLOW_DIAGRAM:', '').replace(']', '') || 'Flow Diagram';
    const centerLabel = lines.find(l => l.startsWith('CENTER_ELEMENT_LABEL:'))?.split(':')[1]?.trim() || '';
    const centerShape = lines.find(l => l.startsWith('CENTER_ELEMENT_SHAPE:'))?.split(':')[1]?.trim() as 'rect' | 'oval' | 'diamond' || 'rect';
    const inputs = lines.filter(l => l.startsWith('INPUT:')).map(l => l.replace('INPUT:', '').trim());
    const outputs = lines.filter(l => l.startsWith('OUTPUT:')).map(l => l.replace('OUTPUT:', '').trim());
    
    const shapeStyles = {
        rect: { rx: 8, ry: 8 },
        oval: { rx: 50, ry: 25 },
        diamond: {}
    };

    return (
        <div className="p-4 my-4 border rounded-lg bg-muted/50">
            <h4 className="font-bold text-center mb-4">{title}</h4>
            <svg width="100%" height="300" viewBox="0 0 400 300">
                {/* Center Element */}
                <g transform="translate(200, 150)">
                    {centerShape === 'diamond' ? (
                        <polygon points="0,-30 50,0 0,30 -50,0" stroke="hsl(var(--primary))" fill="hsl(var(--card))" strokeWidth="2" />
                    ) : (
                        <rect x="-60" y="-25" width="120" height="50" {...shapeStyles[centerShape]} stroke="hsl(var(--primary))" fill="hsl(var(--card))" strokeWidth="2" />
                    )}
                    <text x="0" y="5" textAnchor="middle" fill="hsl(var(--foreground))">{centerLabel}</text>
                </g>
                
                {/* Inputs */}
                {inputs.map((input, i) => {
                    const [label, pos] = input.split(',').map(s => s.trim());
                    const position = pos?.split(':')[1]?.trim() || 'top';
                    let x1 = 100, y1 = 50, x2=140, y2=135;
                    if(position === 'top') { x1 = 200; y1 = 50; x2 = 200; y2 = 125; }
                    if(position === 'left') { x1 = 50; y1 = 150; x2 = 140; y2 = 150; }
                    
                    return (
                        <g key={`in-${i}`}>
                            <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(var(--foreground))" strokeWidth="1" markerEnd="url(#arrow)" />
                            <text x={x1 - 10} y={y1 - 5} textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12">{label}</text>
                        </g>
                    )
                })}

                {/* Outputs */}
                {outputs.map((output, i) => {
                    const [label, pos] = output.split(',').map(s => s.trim());
                    const position = pos?.split(':')[1]?.trim() || 'bottom';
                    let x1 = 260, y1 = 165, x2=300, y2=250;
                     if(position === 'bottom') { x1 = 200; y1 = 175; x2 = 200; y2 = 250; }
                     if(position === 'right') { x1 = 260; y1 = 150; x2 = 350; y2 = 150; }
                    
                    return (
                        <g key={`out-${i}`}>
                           <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="hsl(var(--foreground))" strokeWidth="1" markerEnd="url(#arrow)" />
                            <text x={x2 + 10} y={y2 + 5} textAnchor="middle" fill="hsl(var(--foreground))" fontSize="12">{label}</text>
                        </g>
                    )
                })}

                <defs>
                    <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                        <path d="M 0 0 L 10 5 L 0 10 z" fill="hsl(var(--foreground))" />
                    </marker>
                </defs>
            </svg>
        </div>
    );
};


const renderSection = (section: { title: string; content: string[] }, index: number) => {
    // Check for special diagram blocks
    const fullContent = section.content.join('\n');
    if (fullContent.includes('[START_SIMPLE_FLOW_DIAGRAM:')) {
        return <SimpleFlowDiagram key={index} data={fullContent} />;
    }

    return (
        <div key={index} className="mb-4 break-inside-avoid">
            <h3 className="font-bold text-lg mt-4 mb-2 border-b pb-1 text-primary">{section.title}</h3>
            <div className="space-y-2">
                {section.content.map(renderContentItem)}
            </div>
        </div>
    );
};

type StyledContentDisplayProps = {
    content: string | null;
};

export default function StyledContentDisplay({ content }: StyledContentDisplayProps) {
    if (!content) return null;
    const sections = parseContent(content);

    return (
        <div className="p-4 bg-card text-card-foreground rounded-md shadow-sm styled-content">
            {sections.map(renderSection)}
        </div>
    );
}
