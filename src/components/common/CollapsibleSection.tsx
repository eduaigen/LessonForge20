
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChevronDown, Printer, Download, Languages } from 'lucide-react';

type CollapsibleSectionProps = {
  title: string;
  children: React.ReactNode;
};

export default function CollapsibleSection({ title, children }: CollapsibleSectionProps) {
  return (
    <Card className="mt-6">
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1" className="border-b-0">
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <AccordionTrigger className="flex-1 text-left">
                <h3 className="text-xl font-headline">{title}</h3>
            </AccordionTrigger>
            <div className="flex items-center gap-2 ml-4">
              <Button variant="outline" size="icon">
                <Printer className="h-4 w-4" />
                <span className="sr-only">Print</span>
              </Button>
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </Button>
              <Button variant="outline" size="icon">
                <Languages className="h-4 w-4" />
                <span className="sr-only">Translate</span>
              </Button>
            </div>
          </CardHeader>
          <AccordionContent>
            <CardContent className="p-0">
              <div className="max-h-[600px] overflow-y-auto p-4">
                {children}
              </div>
            </CardContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
