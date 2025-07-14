
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
import * as htmlToText from 'html-to-text';

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
    if (!React.isValidElement(children) || children.type !== StyledContentDisplay) {
        return '';
    }
    const contentProp = (children.props as any).content;

    if (typeof contentProp === 'string') {
        return contentProp;
    }
    
    // For objects (like lesson plans, worksheets), stringify them to preserve structure.
    if (typeof contentProp === 'object' && contentProp !== null) {
        return JSON.stringify(contentProp, null, 2);
    }

    return '';
};

export default function CollapsibleSection({ title, children }: CollapsibleSectionProps) {
    const { toast } = useToast();
    const [isTranslating, setIsTranslating] = useState(false);
    const [translatedContent, setTranslatedContent] = useState<any | null>(null);
    const [translatedLanguage, setTranslatedLanguage] = useState<string | null>(null);
    const [selectedLanguage, setSelectedLanguage] = useState('Spanish');
    const contentRef = useRef<HTMLDivElement>(null);

    const handlePrint = () => {
        const printableContent = contentRef.current;
        if (printableContent) {
            const printWindow = window.open('', '', 'height=800,width=1000');
            if (printWindow) {
                printWindow.document.write('<html><head><title>Print</title>');
                const styles = Array.from(document.styleSheets)
                    .map(styleSheet => {
                        try {
                            if (styleSheet.href) {
                                return `<link rel="stylesheet" href="${styleSheet.href}">`;
                            }
                            return `<style>${Array.from(styleSheet.cssRules).map(rule => rule.cssText).join('')}</style>`;
                        } catch (e) {
                            if (styleSheet.href) {
                                return `<link rel="stylesheet" href="${styleSheet.href}">`;
                            }
                            return '';
                        }
                    })
                    .join('\n');
                printWindow.document.write(styles);
                printWindow.document.write('<body class="p-4">');
                printWindow.document.write(printableContent.innerHTML);
                printWindow.document.write('</body></html>');
                printWindow.document.close();
                setTimeout(() => {
                    printWindow.print();
                    printWindow.close();
                }, 250); 
            }
        }
    };

    const handleDownload = () => {
        if (contentRef.current) {
            const textContent = htmlToText.convert(contentRef.current.innerHTML, {
                wordwrap: 130
            });
            const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `${title.replace(/ /g, '_')}.txt`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(url);
        }
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
            const parsedResult = JSON.parse(result.translatedContent);
            setTranslatedContent(parsedResult);
            setTranslatedLanguage(selectedLanguage);

        } catch (error) {
            console.error("Translation failed:", error);
            let description = 'An error occurred while translating the content. Please try again.';
            if (error instanceof Error) {
                if (error.message.includes("JSON")) {
                    description = "The AI returned an invalid format for translation. Please try again.";
                } else {
                    description = error.message;
                }
            }
            toast({
                title: "Translation Failed",
                description: description,
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
                    <Button variant="outline" size="icon" onClick={handleDownload} title="Download as Text">
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
