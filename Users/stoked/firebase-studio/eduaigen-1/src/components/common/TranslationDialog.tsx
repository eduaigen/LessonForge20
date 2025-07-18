
'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { Loader2, Printer, Download, FileDown } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { translateContent } from '@/ai/flows/translate-content';
import StyledContentDisplay from './StyledContentDisplay';
import type { GeneratedContent } from '@/components/generators/NVBiologyGenerator';

interface TranslationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  contentItem: GeneratedContent;
}

export default function TranslationDialog({ open, onOpenChange, contentItem }: TranslationDialogProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [translatedContent, setTranslatedContent] = useState<any | null>(null);

  useEffect(() => {
    async function handleTranslate() {
      if (open && contentItem && !translatedContent) {
        setIsLoading(true);
        try {
          const result = await translateContent({
            language: 'Spanish',
            jsonContent: JSON.stringify(contentItem.content),
          });
          
          let parsedContent;
          try {
            // A more robust way to handle potential JSON issues from the AI
            const sanitizedString = result.translatedContent.replace(/```json\n?/, '').replace(/```$/, '');
            parsedContent = JSON.parse(sanitizedString);
          } catch (e) {
            console.error("🛑 JSON parsing error:", (e as Error).message);
            console.error("🚨 Problematic JSON string from AI:", result.translatedContent);
            toast({
                title: 'Translation Error',
                description: 'The AI returned an invalid format. Please try again.',
                variant: 'destructive',
            });
            onOpenChange(false);
            return;
          }

          setTranslatedContent(parsedContent);
        } catch (error) {
          console.error('Translation failed:', error);
          toast({
            title: 'Translation Failed',
            description: 'An error occurred while translating the content. Please try again.',
            variant: 'destructive',
          });
          onOpenChange(false);
        } finally {
          setIsLoading(false);
        }
      }
    }
    handleTranslate();
  }, [open, contentItem, translatedContent, onOpenChange, toast]);

  // Reset content when dialog is closed
  useEffect(() => {
    if (!open) {
      setTranslatedContent(null);
    }
  }, [open]);

  const handlePrint = () => {
    const printableContent = document.getElementById(`translated-content-${contentItem.id}`);
    if (printableContent) {
        const printWindow = window.open('', '', 'height=800,width=1000');
        if (printWindow) {
             printWindow.document.write(`<html><head><title>Translated: ${contentItem.title}</title>`);
             // This part is tricky as dialogs are in portals. We'll add basic styling.
             printWindow.document.write(`<style>
                body { font-family: sans-serif; padding: 2rem; } 
                .document-view { max-width: 100%; } 
                h1,h2,h3 { color: #333; }
                table, th, td { border: 1px solid black; border-collapse: collapse; padding: 5px; }
                th { font-weight: bold; }
             </style>`);
             printWindow.document.write('</head><body>');
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

  const handleDownloadDoc = () => {
    const content = document.getElementById(`translated-content-${contentItem.id}`);
    if (!content) return;
    const htmlContent = `<html><head><title>Translated: ${contentItem.title}</title></head><body>${content.innerHTML}</body></html>`;
    const blob = new Blob([htmlContent], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Translated_${contentItem.title.replace(/ /g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Spanish Version: {contentItem?.title}</DialogTitle>
          <DialogDescription>
            This content has been translated into Spanish by AI. Please review for accuracy.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto pr-4 -mr-4">
          {isLoading ? (
             <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8 min-h-[400px]">
                <Loader2 className="w-12 h-12 text-primary mb-4 animate-spin" />
                <h3 className="text-xl font-semibold">Translating...</h3>
                <p>Please wait while we generate the Spanish version.</p>
            </div>
          ) : translatedContent ? (
            <div id={`translated-content-${contentItem.id}`}>
               <StyledContentDisplay content={translatedContent} type={contentItem.type} />
            </div>
          ) : null}
        </div>
        {!isLoading && translatedContent && (
             <DialogFooter className="border-t pt-4 mt-4">
                <div className="flex items-center gap-2 ml-4 flex-wrap">
                    <Button variant="outline" size="icon" onClick={handlePrint} title="Print">
                        <Printer className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="icon" onClick={handleDownloadDoc} title="Download as .doc">
                        <FileDown className="h-4 w-4" />
                    </Button>
                </div>
            </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
