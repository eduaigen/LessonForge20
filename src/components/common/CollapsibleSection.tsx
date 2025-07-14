
'use client';

import React, { useState, useRef } from 'react';
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

const extractContentAsString = (children: React.ReactNode): string => {
    let contentToProcess = '';
    if (React.isValidElement(children) && (children.type === StyledContentDisplay)) {
        const contentProp = (children.props as any).content;
        if (typeof contentProp === 'string') {
            contentToProcess = contentProp;
        } else if (typeof contentProp === 'object' && contentProp !== null) {
            if (contentProp.worksheetContent) {
                contentToProcess = contentProp.worksheetContent;
            } else if (contentProp.scaffoldedContent) {
                contentToProcess = contentProp.scaffoldedContent;
            } else if (contentProp.articleContent) {
                contentToProcess = contentProp.articleContent;
            } else {
                contentToProcess = JSON.stringify(contentProp, null, 2);
            }
        }
    }
    return contentToProcess;
};


export default function CollapsibleSection({ title, children }: CollapsibleSectionProps) {
    const { toast } = useToast();
    const [isTranslating, setIsTranslating] = useState(false);
    const [translatedContent, setTranslatedContent] = useState<string | null>(null);
    const [translatedLanguage, setTranslatedLanguage] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState('Spanish');
    const contentRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        const printableContent = contentRef.current;
        if (printableContent) {
            const printWindow = window.open('', '', 'height=600,width=800');
            if (printWindow) {
                printWindow.document.write('<html><head><title>Print</title>');
                // Link to globals.css to maintain styling
                const styles = Array.from(document.styleSheets)
                    .map(styleSheet => {
                        try {
                            return Array.from(styleSheet.cssRules)
                                .map(rule => rule.cssText)
                                .join('');
                        } catch (e) {
                            // Can't access cross-origin stylesheets
                            if (styleSheet.href) {
                                return `<link rel="stylesheet" href="${styleSheet.href}">`;
                            }
                            return '';
                        }
                    })
                    .join('');

                printWindow.document.write(`<style>${styles}</style></head><body>`);
                printWindow.document.write(printableContent.innerHTML);
                printWindow.document.write('</body></html>');
                printWindow.document.close();
                printWindow.print();
            }
        }
    };

    const handleDownload = () => {
        const contentToDownload = extractContentAsString(children);
        if (!contentToDownload) {
            toast({ title: "Download Failed", description: "Could not extract content to download.", variant: "destructive" });
            return;
        }

        const blob = new Blob([contentToDownload], { type: 'text/markdown;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${title.replace(/ /g, '_')}.md`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const handleTranslate = async () => {
        setIsTranslating(true);
        setTranslatedContent(null);
        try {
            const contentToTranslate = extractContentAsString(children);
            
            if (!contentToTranslate.trim()) {
                throw new Error("Could not extract content for translation.");
            }

            const result = await translateContent({ content: contentToTranslate, targetLanguage: selectedLanguage });
            setTranslatedContent(result.translatedContent);
            setTranslatedLanguage(selectedLanguage);

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
                    <Button variant="outline" size="icon" onClick={handleDownload} title="Download as Markdown">
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
                        <div ref={contentRef}>
                            <div className="p-4">{children}</div>
                            {isTranslating && <GeneratingAnimation />}
                            {translatedContent && (
                                <div className="p-4 border-t-2 border-primary/20">
                                    <h3 className="text-lg font-bold font-headline mb-4 text-primary">{translatedLanguage} Translation</h3>
                                    <StyledContentDisplay content={translatedContent} />
                                </div>
                            )}
                        </div>
                    </ScrollArea>
                </CardContent>
            </AccordionContent>
        </AccordionItem>
      </Accordion>
    </Card>
  );
}
