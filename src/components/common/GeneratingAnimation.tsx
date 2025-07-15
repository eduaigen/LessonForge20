
'use client';

import { useAuth } from '@/context/AuthContext';
import { Bot } from 'lucide-react';
import React, { useState, useEffect } from 'react';

const messages = [
  "Thank you for trusting EduAiGen with your creative work.",
  "Our AI is synthesizing the best educational practices for you.",
  "Crafting high-quality, standards-aligned content...",
  "Great teaching is an art; we're just helping with the canvas.",
  "Analyzing data and generating insights...",
  "Building a foundation for an excellent lesson."
];

export default function GeneratingAnimation() {
  const { user } = useAuth();
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
    }, 5000); // Change message every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground bg-background rounded-md p-8 min-h-[400px]">
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Central Node */}
        <div className="absolute w-16 h-16 bg-primary rounded-full animate-ping" style={{ animationDelay: '0s' }} />
        <div className="absolute w-16 h-16 bg-primary/50 rounded-full flex items-center justify-center">
          <Bot className="w-8 h-8 text-primary-foreground animate-pulse" />
        </div>
      </div>
      <div className="mt-8 text-center">
        <h3 className="text-xl font-headline font-semibold text-primary animate-pulse">
          Generating Content, {user?.name || 'Educator'}...
        </h3>
        <div className="min-h-[2rem] mt-2 relative w-full overflow-hidden flex items-center justify-center">
           <div
            key={currentMessageIndex}
            className="absolute inset-0 flex items-center justify-center animate-message-fade"
            >
                <p className="text-sm text-muted-foreground italic px-4">
                    "{messages[currentMessageIndex]}"
                </p>
           </div>
        </div>
      </div>
    </div>
  );
}
