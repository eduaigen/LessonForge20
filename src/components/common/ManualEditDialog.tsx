'use client';

import React, { useState, useEffect } from 'react';
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
import { Save, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ManualEditDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  sectionName: string;
  sectionContent: any;
  onSectionUpdate: (newContent: any) => void;
}

export default function ManualEditDialog({
  open,
  onOpenChange,
  sectionName,
  sectionContent,
  onSectionUpdate,
}: ManualEditDialogProps) {
  const { toast } = useToast();
  const [jsonString, setJsonString] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setJsonString(JSON.stringify(sectionContent, null, 2));
      setError(null);
    }
  }, [open, sectionContent]);

  const handleSave = () => {
    try {
      const parsedContent = JSON.parse(jsonString);
      setError(null);
      onSectionUpdate(parsedContent);
      toast({
        title: 'Section Updated',
        description: `The "${sectionName}" section has been successfully updated manually.`,
      });
      onOpenChange(false);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'Invalid JSON format.';
      setError(`Invalid JSON: ${errorMessage}`);
      toast({
        title: 'Invalid JSON',
        description: 'Please correct the errors in the JSON content before saving.',
        variant: 'destructive',
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Manually Edit "{sectionName}" Section</DialogTitle>
          <DialogDescription>
            You are directly editing the JSON data for this section. Please ensure your edits result in valid JSON.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid w-full gap-1.5">
            <Label htmlFor="json-content">JSON Content</Label>
            <Textarea
              id="json-content"
              value={jsonString}
              onChange={(e) => setJsonString(e.target.value)}
              rows={20}
              className="font-mono text-xs"
            />
          </div>
          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 mt-0.5" />
                <div>
                    <p className="font-semibold">Error</p>
                    <p>{error}</p>
                </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancel
            </Button>
          </DialogClose>
          <Button type="button" onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
