
'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Printer, Download, Languages, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { translateContent } from '@/ai/flows/translate-content';
import StyledContentDisplay from './StyledContentDisplay';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { ScrollArea } from '../ui/scroll-area';
import GeneratingAnimation from './GeneratingAnimation';

type CollapsibleSectionProps = {
  title: string;
  children: React.ReactNode;
};

const supportedLanguages = [
    { value: 'Spanish', label: 'Spanish' },
    { value: 'French', label: 'French' },
    { value: 'Haitian Creole', label: 'Haitian Creole' },
    { value: 'Bengali', label: 'Bengali' },
    { value: 'Mandarin', label: 'Mandarin' },
];

export default function CollapsibleSection({ title, children }: CollapsibleSectionProps) {
    const { toast } = useToast();
    const [isTranslating, setIsTranslating] = useState(false);
    const [translatedContent, setTranslatedContent] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState('Spanish');

    const handlePrint = () => {
        window.print();
    };

    const handleDownload = () => {
        toast({ title: "Coming Soon!", description: "Download functionality is under development." });
    };

    const handleTranslate = async () => {
        setIsTranslating(true);
        setTranslatedContent(null);
        try {
            let contentToTranslate = '';
            
            // This logic ensures we get the raw, structured content before it's rendered.
            if (React.isValidElement(children) && (children.type === StyledContentDisplay)) {
                 const contentProp = (children.props as any).content;
                 if (typeof contentProp === 'string') {
                    contentToTranslate = contentProp;
                 } else if (typeof contentProp === 'object' && contentProp !== null) {
                    // This handles worksheets, lesson plans, etc., that are passed as objects
                     if (contentProp.worksheetContent) {
                        contentToTranslate = contentProp.worksheetContent;
                    } else if (contentProp.scaffoldedContent) {
                        contentToTranslate = contentProp.scaffoldedContent;
                    } else if (contentProp.articleContent) {
                        contentToTranslate = contentProp.articleContent;
                    } else {
                        // Fallback for other objects like lesson plans, coaching reports, etc.
                        contentToTranslate = JSON.stringify(contentProp, null, 2);
                    }
                 }
            }
            
            if (!contentToTranslate) {
                // Fallback for simple children or cases where the above logic fails
                // Note: This might not preserve complex formatting for non-StyledContentDisplay children.
                const container = document.createElement('div');
                const reactDom = await import('react-dom/client');
                const root = reactDom.createRoot(container);
                root.render(<div>{children}</div>);
                await new Promise(resolve => setTimeout(resolve, 0));
                contentToTranslate = container.innerHTML; // Use innerHTML to preserve some tags
            }

            if (!contentToTranslate.trim()) {
                throw new Error("Could not extract content for translation.");
            }

            const result = await translateContent({ content: contentToTranslate, targetLanguage: selectedLanguage });
            setTranslatedContent(result.translatedContent);

        } catch (error) {
            console.error("Translation failed:", error);
            toast({
                title: "Translation Failed",
                description: `An error occurred while translating the content. ${error instanceof Error ? error.message : ''}`,
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
            <CardHeader className="flex flex-row items-center justify-between p-4 flex-wrap gap-4">
                <AccordionTrigger className="flex-1 text-left hover:no-underline p-0">
                    <h3 className="text-xl font-headline">{title}</h3>
                </AccordionTrigger>
                <div className="flex items-center gap-2 ml-4 flex-wrap">
                    <Button variant="outline" size="icon" onClick={handlePrint} title="Print">
                        <Printer className="h-4 w-4" />
                        <span className="sr-only">Print</span>
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleDownload} title="Download">
                        <Download className="h-4 w-4" />
                        <span className="sr-only">Download</span>
                    </Button>
                    <div className="flex items-center gap-1">
                        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                            <SelectTrigger className="w-[150px]" title="Select Language">
                                <SelectValue placeholder="Language" />
                            </SelectTrigger>
                            <SelectContent>
                                {supportedLanguages.map(lang => (
                                    <SelectItem key={lang.value} value={lang.value}>{lang.label}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Button variant="outline" onClick={handleTranslate} disabled={isTranslating} title="Translate">
                            {isTranslating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Languages className="h-4 w-4" />}
                            <span className="sr-only">Translate</span>
                        </Button>
                    </div>
                </div>
            </CardHeader>
            <AccordionContent>
                <CardContent className="p-0">
                <ScrollArea className="max-h-[800px] overflow-y-auto">
                    <div className="p-4">
                    {isTranslating ? <GeneratingAnimation /> : (translatedContent ? <StyledContentDisplay content={translatedContent} /> : children) }
                    </div>
                </ScrollArea>
                </CardContent>
            </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
