
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ChevronDown, Printer, Download, Languages, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { translateContent } from '@/ai/flows/translate-content';
import StyledContentDisplay from './StyledContentDisplay';

type CollapsibleSectionProps = {
  title: string;
  children: React.ReactNode;
  onTranslate?: (content: any) => Promise<string>;
};

export default function CollapsibleSection({ title, children }: CollapsibleSectionProps) {
    const { toast } = useToast();
    const [isTranslating, setIsTranslating] = useState(false);
    const [translatedContent, setTranslatedContent] = useState<string | null>(null);

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        toast({ title: "Coming Soon!", description: "Download functionality is under development." });
    };

    const handleTranslate = async () => {
        setIsTranslating(true);
        try {
            // A bit of a hack to get the string content. We'll render to a hidden div.
            // This is not ideal but works for this specific structure.
            const container = document.createElement('div');
            const reactDom = await import('react-dom/client');
            const root = reactDom.createRoot(container);
            root.render(<div>{children}</div>);
            
            // Wait for render
            await new Promise(resolve => setTimeout(resolve, 0));

            let contentToTranslate = container.innerText;
            
            // For complex objects, we stringify them
            if (typeof (children as any)?.props?.content === 'object') {
                 contentToTranslate = JSON.stringify((children as any)?.props?.content, null, 2);
            }


            if (!contentToTranslate) {
                throw new Error("Could not extract content for translation.");
            }

            const result = await translateContent({ content: contentToTranslate, targetLanguage: 'Spanish' });
            setTranslatedContent(result.translatedContent);

        } catch (error) {
            console.error("Translation failed:", error);
            toast({
                title: "Translation Failed",
                description: "An error occurred while translating the content.",
                variant: "destructive",
            });
        } finally {
            setIsTranslating(false);
        }
    };


  return (
    <Card className="mt-6 shadow-md">
      <Accordion type="single" collapsible defaultValue="item-1">
        <AccordionItem value="item-1" className="border-b-0">
          <CardHeader className="flex flex-row items-center justify-between p-4">
            <AccordionTrigger className="flex-1 text-left hover:no-underline">
                <h3 className="text-xl font-headline">{title}</h3>
            </AccordionTrigger>
            <div className="flex items-center gap-2 ml-4">
              <Button variant="outline" size="icon" onClick={handlePrint}>
                <Printer className="h-4 w-4" />
                <span className="sr-only">Print</span>
              </Button>
              <Button variant="outline" size="icon" onClick={handleDownload}>
                <Download className="h-4 w-4" />
                <span className="sr-only">Download</span>
              </Button>
              <Button variant="outline" size="icon" onClick={handleTranslate} disabled={isTranslating}>
                {isTranslating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Languages className="h-4 w-4" />}
                <span className="sr-only">Translate</span>
              </Button>
            </div>
          </CardHeader>
          <AccordionContent>
            <CardContent className="p-0">
              <ScrollArea className="max-h-[800px] overflow-y-auto">
                <div className="p-4">
                  {translatedContent ? <StyledContentDisplay content={translatedContent} /> : children}
                </div>
              </ScrollArea>
            </CardContent>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}


function ScrollArea({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={className}>{children}</div>;
}
