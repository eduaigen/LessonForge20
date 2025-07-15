
'use client';

import React, { useState, useEffect } from 'react';
import {
  Accessibility,
  ZoomIn,
  ZoomOut,
  Sun,
  Link as LinkIcon,
  RotateCcw,
  Type,
  Palette,
  Contrast,
  MousePointer2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Separator } from '@/components/ui/separator';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';

const FONT_STEP = 2;
const MIN_FONT_SIZE = 12;
const MAX_FONT_SIZE = 24;
const DEFAULT_FONT_SIZE = 16;

const AccessibilityTool = ({ icon, label, children }: { icon: React.ReactNode, label: string, children: React.ReactNode }) => (
    <div className="flex items-center justify-between">
        <Label htmlFor={`switch-${label}`} className="flex items-center gap-2 text-sm font-medium cursor-pointer">
            {icon} {label}
        </Label>
        {children}
    </div>
);


export default function AccessibilityWidget() {
  const [fontSize, setFontSize] = useState(DEFAULT_FONT_SIZE);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [areLinksHighlighted, setAreLinksHighlighted] = useState(false);
  const [isReadableFont, setIsReadableFont] = useState(false);
  const [isGrayscale, setIsGrayscale] = useState(false);
  const [areColorsInverted, setAreColorsInverted] = useState(false);
  const [hasBiggerCursor, setHasBiggerCursor] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const savedFontSize = localStorage.getItem('accessibility-font-size');
    const savedContrast = localStorage.getItem('accessibility-high-contrast');
    const savedLinks = localStorage.getItem('accessibility-highlight-links');
    const savedReadableFont = localStorage.getItem('accessibility-readable-font');
    const savedGrayscale = localStorage.getItem('accessibility-grayscale');
    const savedInvert = localStorage.getItem('accessibility-invert-colors');
    const savedCursor = localStorage.getItem('accessibility-bigger-cursor');
    
    if (savedFontSize) setFontSize(parseInt(savedFontSize, 10));
    if (savedContrast) setIsHighContrast(savedContrast === 'true');
    if (savedLinks) setAreLinksHighlighted(savedLinks === 'true');
    if (savedReadableFont) setIsReadableFont(savedReadableFont === 'true');
    if (savedGrayscale) setIsGrayscale(savedGrayscale === 'true');
    if (savedInvert) setAreColorsInverted(savedInvert === 'true');
    if (savedCursor) setHasBiggerCursor(savedCursor === 'true');

  }, []);

  const applyClassAndSave = (className: string, enabled: boolean, key: string) => {
    if (!isMounted) return;
    document.documentElement.classList.toggle(className, enabled);
    localStorage.setItem(key, String(enabled));
  }

  useEffect(() => {
    if (!isMounted) return;
    document.documentElement.style.fontSize = `${fontSize}px`;
    localStorage.setItem('accessibility-font-size', fontSize.toString());
  }, [fontSize, isMounted]);

  useEffect(() => applyClassAndSave('high-contrast', isHighContrast, 'accessibility-high-contrast'), [isHighContrast, isMounted]);
  useEffect(() => applyClassAndSave('highlight-links', areLinksHighlighted, 'accessibility-highlight-links'), [areLinksHighlighted, isMounted]);
  useEffect(() => applyClassAndSave('readable-font', isReadableFont, 'accessibility-readable-font'), [isReadableFont, isMounted]);
  useEffect(() => applyClassAndSave('grayscale', isGrayscale, 'accessibility-grayscale'), [isGrayscale, isMounted]);
  useEffect(() => applyClassAndSave('invert-colors', areColorsInverted, 'accessibility-invert-colors'), [areColorsInverted, isMounted]);
  useEffect(() => applyClassAndSave('bigger-cursor', hasBiggerCursor, 'accessibility-bigger-cursor'), [hasBiggerCursor, isMounted]);

  
  const increaseFontSize = () => setFontSize((s) => Math.min(s + FONT_STEP, MAX_FONT_SIZE));
  const decreaseFontSize = () => setFontSize((s) => Math.max(s - FONT_STEP, MIN_FONT_SIZE));

  const resetSettings = () => {
    setFontSize(DEFAULT_FONT_SIZE);
    setIsHighContrast(false);
    setAreLinksHighlighted(false);
    setIsReadableFont(false);
    setIsGrayscale(false);
    setAreColorsInverted(false);
    setHasBiggerCursor(false);
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
          <div className="grid gap-4">
            <AccessibilityTool icon={<ZoomIn className="h-4 w-4"/>} label="Font Size">
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="icon" onClick={decreaseFontSize} disabled={fontSize <= MIN_FONT_SIZE} aria-label="Decrease font size">
                        <ZoomOut className="h-4 w-4" />
                    </Button>
                    <span className="w-10 text-center text-sm">{Math.round((fontSize/DEFAULT_FONT_SIZE) * 100)}%</span>
                    <Button variant="outline" size="icon" onClick={increaseFontSize} disabled={fontSize >= MAX_FONT_SIZE} aria-label="Increase font size">
                        <ZoomIn className="h-4 w-4" />
                    </Button>
                </div>
            </AccessibilityTool>
            
            <Separator />

            <AccessibilityTool icon={<Contrast className="h-4 w-4"/>} label="High Contrast">
               <Switch id="switch-High Contrast" checked={isHighContrast} onCheckedChange={setIsHighContrast} />
            </AccessibilityTool>
             <AccessibilityTool icon={<Palette className="h-4 w-4"/>} label="Invert Colors">
               <Switch id="switch-Invert Colors" checked={areColorsInverted} onCheckedChange={setAreColorsInverted} />
            </AccessibilityTool>
             <AccessibilityTool icon={<Sun className="h-4 w-4"/>} label="Grayscale">
               <Switch id="switch-Grayscale" checked={isGrayscale} onCheckedChange={setIsGrayscale} />
            </AccessibilityTool>

            <Separator />

            <AccessibilityTool icon={<LinkIcon className="h-4 w-4"/>} label="Highlight Links">
               <Switch id="switch-Highlight Links" checked={areLinksHighlighted} onCheckedChange={setAreLinksHighlighted} />
            </AccessibilityTool>
            <AccessibilityTool icon={<Type className="h-4 w-4"/>} label="Readable Font">
               <Switch id="switch-Readable Font" checked={isReadableFont} onCheckedChange={setIsReadableFont} />
            </AccessibilityTool>
            <AccessibilityTool icon={<MousePointer2 className="h-4 w-4"/>} label="Bigger Cursor">
               <Switch id="switch-Bigger Cursor" checked={hasBiggerCursor} onCheckedChange={setHasBiggerCursor} />
            </AccessibilityTool>
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
