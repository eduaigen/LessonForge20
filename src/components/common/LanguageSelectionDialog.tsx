
'use client';

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
  AlertDialogFooter
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Languages } from 'lucide-react';
import type { ToolName } from './RightSidebar';

export type LanguageOption = 'English' | 'Spanish';

interface LanguageSelectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSelectLanguage: (language: LanguageOption) => void;
  toolName: ToolName | 'Test' | 'Lab Activity' | null;
}

export function LanguageSelectionDialog({
  open,
  onOpenChange,
  onSelectLanguage,
  toolName
}: LanguageSelectionDialogProps) {
  if (!toolName) return null;

  const handleSelect = (language: LanguageOption) => {
    onSelectLanguage(language);
    onOpenChange(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <Languages className="h-5 w-5 text-primary" />
            Choose Language for "{toolName}"
          </AlertDialogTitle>
          <AlertDialogDescription>
            Select a language to generate a complete document. You can generate a version in the other language afterward.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex-col sm:flex-col sm:space-x-0 gap-2">
          <Button onClick={() => handleSelect('English')}>English</Button>
          <Button onClick={() => handleSelect('Spanish')}>Spanish</Button>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
