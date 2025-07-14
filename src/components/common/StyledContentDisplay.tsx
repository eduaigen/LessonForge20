
'use client';

import React from 'react';
import Markdown from 'react-markdown';
import { InlineMath, BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';

// Helper function to render a single content item
const renderContentItem = (item: string, index: number): React.ReactNode => {
  const trimmedItem = item.trim();
  if (!trimmedItem) return null;

  // SVG rendering has top priority
  if (trimmedItem.startsWith('<svg') && trimmedItem.endsWith('</svg>')) {
    return <div key={index} dangerouslySetInnerHTML={{ __html: trimmedItem }} className="my-4" />;
  }

  // LaTeX rendering for items that are exclusively math
  const latexParts = trimmedItem.split(/(\$\$[\s\S]*?\$\$|\$[^$]+\$)/g);
  if (latexParts.length > 1 && latexParts.every(p => p.trim() === '' || (p.startsWith('$') && p.endsWith('$')))) {
      return (
          <p key={index} className="leading-relaxed">
            {latexParts.map((part, i) => {
              if (part.startsWith('$$') && part.endsWith('$$')) {
                return <BlockMath key={i} math={part.slice(2, -2)} />;
              }
              if (part.startsWith('$') && part.endsWith('$')) {
                return <InlineMath key={i} math={part.slice(1, -1)} />;
              }
              return null;
            })}
          </p>
      );
  }

  // Table rendering via Markdown
  if (trimmedItem.includes('|') && trimmedItem.includes('---')) {
     return <Markdown key={index} className="prose-sm dark:prose-invert max-w-none">{trimmedItem}</Markdown>;
  }

  // Fallback to Markdown for paragraphs, lists, and inline math
  return <Markdown key={index} className="prose-sm dark:prose-invert max-w-none" components={{
    p: ({ children }) => <p className="leading-relaxed">{children}</p>,
    math: (props) => <InlineMath math={props.children as string} />,
    inlineMath: (props) => <InlineMath math={props.children as string} />,
  }}>{trimmedItem}</Markdown>;
};


const parseContent = (content: string) => {
  // Protect multi-line SVG blocks from being split
  const svgRegex = /(<svg[\s\S]*?<\/svg>)/g;
  const contentParts = content.split(svgRegex);

  let sections: { title: string; content: string[] }[] = [];
  
  const processPart = (part: string) => {
    if (part.startsWith('<svg')) {
      // If the last section is for SVGs, add to it, otherwise create a new one
      if (sections.length > 0 && sections[sections.length - 1].title === "Visualizations") {
          sections[sections.length - 1].content.push(part);
      } else {
          sections.push({ title: 'Visualizations', content: [part] });
      }
      return;
    }

    const lines = part.split('\n');
    let currentSection: { title: string; content: string[] } | null = null;
    let paragraphBuffer: string[] = [];

    const pushParagraph = () => {
      if (paragraphBuffer.length > 0 && currentSection) {
        currentSection.content.push(paragraphBuffer.join('\n'));
        paragraphBuffer = [];
      }
    };
    
    lines.forEach(line => {
      const trimmedLine = line.trim();
      const isSectionHeader = 
        trimmedLine.match(/^(\*\*I{1,3}\.\s|\*\*II\.\s|\*\*III\.\s)/) || // **I. **II. **III.
        trimmedLine.match(/^[A-Z]\.\s/) || // A. B. C.
        /WORKSHEET SECTION [A-Z]:/.test(trimmedLine) ||
        /STUDENT (VERSION|LAB HANDOUT) START ---/.test(trimmedLine) ||
        /ANSWER KEY START ---/.test(trimmedLine) ||
        trimmedLine.startsWith('**');


      if (isSectionHeader) {
        pushParagraph(); // Push any buffered content before starting new section
        if(currentSection) sections.push(currentSection);
        currentSection = { title: trimmedLine.replace(/\*/g, ''), content: [] };
      } else if (trimmedLine === '') {
        pushParagraph();
      } else {
        if (!currentSection) {
           // Content before the first header
           currentSection = { title: 'Introduction', content: []};
        }
        paragraphBuffer.push(line);
      }
    });

    pushParagraph();
    if (currentSection) {
      sections.push(currentSection);
    }
  };
  
  contentParts.forEach(processPart);
  
  return sections.filter(s => s.content.some(c => c.trim().length > 0));
};

const renderSection = (section: { title: string; content: string[] }, index: number) => {
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
