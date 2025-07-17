
'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Loader2 } from 'lucide-react';
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
            parsedContent = JSON.parse(result.translatedContent);
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl max-h-[90vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Spanish Version: {contentItem?.title}</DialogTitle>
          <DialogDescription>
            This content has been translated into Spanish by AI. Please review for accuracy.
          </DialogDescription>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto pr-4">
          {isLoading ? (
             <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground p-8">
                <Loader2 className="w-12 h-12 text-primary mb-4 animate-spin" />
                <h3 className="text-xl font-semibold">Translating...</h3>
                <p>Please wait while we generate the Spanish version.</p>
            </div>
          ) : translatedContent ? (
            <StyledContentDisplay content={translatedContent} type={contentItem.type} />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}
