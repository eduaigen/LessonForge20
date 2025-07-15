
'use client';

import React, { useState, useEffect } from 'react';
import {
  Accessibility,
  ZoomIn,
  ZoomOut,
  Sun,
  Link,
  RotateCcw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';

const FONT_STEP = 2;
const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 24;
const DEFAULT_FONT_SIZE = 16;

export default function AccessibilityWidget() {
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [areLinksHighlighted, setAreLinksHighlighted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedFontSize = localStorage.getItem('accessibility-font-size');
    const savedContrast = localStorage.getItem('accessibility-high-contrast');
    const savedLinks = localStorage.getItem('accessibility-highlight-links');
    
    if (savedFontSize) setFontSize(parseInt(savedFontSize, 10));
    if (savedContrast) setIsHighContrast(savedContrast === 'true');
    if (savedLinks) setAreLinksHighlighted(savedLinks === 'true');
  }, []);

  useEffect(() => {
    if (!isMounted) return;
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem('accessibility-font-size', fontSize.toString());
  }, [fontSize, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    document.documentElement.classList.toggle('high-contrast', isHighContrast);
    localStorage.setItem('accessibility-high-contrast', String(isHighContrast));
  }, [isHighContrast, isMounted]);

  useEffect(() => {
    if (!isMounted) return;
    document.documentElement.classList.toggle('highlight-links', areLinksHighlighted);
     localStorage.setItem('accessibility-highlight-links', String(areLinksHighlighted));
  }, [areLinksHighlighted, isMounted]);
  
  const increaseFontSize = () => setFontSize((s) => Math.min(s + FONT_STEP, MAX_FONT_SIZE));
  const decreaseFontSize = () => setFontSize((s) => Math.max(s - FONT_STEP, MIN_FONT_SIZE));
  const toggleHighContrast = () => setIsHighContrast(c => !c);
  const toggleHighlightLinks = () => setAreLinksHighlighted(h => !h);

  const resetSettings = () => {
    setFontSize(DEFAULT_FONT_SIZE);
    setIsHighContrast(false);
    setAreLinksHighlighted(false);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-4 right-4 h-14 w-14 rounded-full shadow-lg z-50"
          aria-label="Open Accessibility Menu"
        >
          <Accessibility className="h-7 w-7" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 mb-2" side="top" align="end">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Accessibility</h4>
            <p className="text-sm text-muted-foreground">
              Adjust the display settings for better readability.
            </p>
          </div>
          <Separator />
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Font Size</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={decreaseFontSize} disabled={fontSize <= MIN_FONT_SIZE}>
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="w-6 text-center text-sm">{Math.round((fontSize/DEFAULT_FONT_SIZE) * 100)}%</span>
                <Button variant="outline" size="icon" onClick={increaseFontSize} disabled={fontSize >= MAX_FONT_SIZE}>
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-between">
               <span className="text-sm font-medium flex items-center gap-2"><Sun className="h-4 w-4"/> High Contrast</span>
               <Button variant={isHighContrast ? "secondary" : "outline"} onClick={toggleHighContrast}>
                   {isHighContrast ? 'Disable' : 'Enable'}
                </Button>
            </div>
             <div className="flex items-center justify-between">
               <span className="text-sm font-medium flex items-center gap-2"><Link className="h-4 w-4" /> Highlight Links</span>
               <Button variant={areLinksHighlighted ? "secondary" : "outline"} onClick={toggleHighlightLinks}>
                   {areLinksHighlighted ? 'Disable' : 'Enable'}
                </Button>
            </div>
          </div>
           <Separator />
            <Button variant="ghost" onClick={resetSettings} className="w-full justify-center gap-2">
                <RotateCcw className="h-4 w-4" /> Reset
            </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
