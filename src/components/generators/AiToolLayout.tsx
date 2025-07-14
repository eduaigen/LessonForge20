import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';

type AiToolLayoutProps = {
  title: string;
  description: string;
  children: React.ReactNode;
  resultDisplay: React.ReactNode;
};

export default function AiToolLayout({
  title,
  description,
  children,
  resultDisplay,
}: AiToolLayoutProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 h-full max-h-[calc(100vh-8rem)]">
      {/* Left Column (Controls) */}
      <div className="md:col-span-1 flex flex-col gap-4">
        <div>
            <h1 className="text-2xl font-bold font-headline">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
        </div>
        <ScrollArea className="h-full pr-4">
            <div className="space-y-6">
                {children}
            </div>
        </ScrollArea>
      </div>

      {/* Right Column (Display) */}
      <div className="md:col-span-2 h-full">
        {resultDisplay}
      </div>
    </div>
  );
}
