
'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Wand2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { refineLessonSection } from '@/ai/flows/lesson-section-refiner';

interface EditSectionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sectionName: string;
  sectionContent: any;
  onSectionUpdate: (newContent: any) => void;
  language?: 'English' | 'Spanish' | 'Bilingual';
}

export default function EditSectionDialog({
  open,
  onOpenChange,
  sectionName,
  sectionContent,
  onSectionUpdate,
  language = 'English',
}: EditSectionDialogProps) {
  const { toast } = useToast();
  const [instructions, setInstructions] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveChanges = async () => {
    if (!instructions.trim()) {
      toast({
        title: 'Instructions Required',
        description: 'Please provide instructions on how to edit the section.',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const result = await refineLessonSection({
        sectionName,
        originalContent: JSON.stringify(sectionContent),
        instructions,
      });
      
      // Sanitize the string to remove invalid control characters before parsing.
      const sanitizedContent = result.revisedContent.replace(/\n/g, "\\n");
      const revisedContent = JSON.parse(sanitizedContent);

      onSectionUpdate(revisedContent);
      toast({
        title: 'Section Updated',
        description: `The "${sectionName}" section has been successfully revised.`,
      });
      onOpenChange(false);
      setInstructions('');
    } catch (error) {
      console.error('Failed to refine section:', error);
      toast({
        title: 'Update Failed',
        description: 'An error occurred while updating the section. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit "{sectionName}" Section</DialogTitle>
          <DialogDescription>
            Provide instructions for the AI to revise this section. Be specific. For example, "Make the reading passage simpler for 9th graders" or "Add two more multiple-choice questions about the main theme."
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="instructions">Your Instructions</Label>
            <Textarea
              id="instructions"
              placeholder="e.g., 'Change the Do Now question to be about...'"
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              rows={5}
            />
          </div>
          {language === 'Bilingual' && (
             <div className="text-sm text-amber-600 bg-amber-50 p-3 rounded-md border border-amber-200">
                <strong>Note:</strong> Since this is a bilingual document, the AI will attempt to apply your changes to both the English and Spanish content to maintain consistency.
             </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSaveChanges} disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Wand2 className="mr-2 h-4 w-4" />}
            {isLoading ? 'Revising...' : 'Revise with AI'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
