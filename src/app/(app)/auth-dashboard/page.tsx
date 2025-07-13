'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FileText, TestTube, StickyNote, FolderSync } from 'lucide-react';

const premiumTools = [
  {
    title: "Lesson Plan Generator",
    description: "Generate complete lesson plans with objectives aligned to NGSS, state, and culturally inclusive standards.",
    href: "/auth-dashboard/lesson-plan",
    icon: <StickyNote className="w-8 h-8 text-primary" />
  },
  {
    title: "Test Maker",
    description: "Automatically create comprehensive tests based on your selected units and topics, aligned with educational standards.",
    href: "/auth-dashboard/test-maker",
    icon: <FileText className="w-8 h-8 text-primary" />
  },
  {
    title: "Lab Generator",
    description: "For science subjects, instantly generate safe and effective lab experiments with procedures and safety guidelines.",
    href: "/auth-dashboard/lab-generator",
    icon: <TestTube className="w-8 h-8 text-primary" />
  },
  {
    title: "Curriculum Audit Tool",
    description: "Distill your existing curriculum documents into clear, concise, and actionable summaries.",
    href: "/auth-dashboard/curriculum-audit",
    icon: <FolderSync className="w-8 h-8 text-primary" />
  }
];

export default function AuthDashboardPage() {
  return (
    <div className="flex flex-col">
       <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Premium Dashboard</h1>
        <p className="text-muted-foreground">
          Access your exclusive suite of curriculum generation and analysis tools.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {premiumTools.map((tool) => (
          <Card key={tool.title} className="flex flex-col">
            <CardHeader>
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-lg">
                  {tool.icon}
                </div>
                <div>
                  <CardTitle>{tool.title}</CardTitle>
                  <CardDescription className="mt-1">{tool.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="flex-grow flex items-end">
              <Button asChild className="w-full">
                <Link href={tool.href}>Use Tool</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
