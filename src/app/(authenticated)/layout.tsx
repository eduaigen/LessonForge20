
'use client';

import {
  FileText,
  TestTube,
  BookCopy,
  FolderSync,
  PanelLeft,
  Home,
  Lightbulb,
  DollarSign,
  History,
} from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';


export default function AuthenticatedAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-1 bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex mt-16">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
           <TooltipProvider>
             <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/auth-dashboard"
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Home className="h-5 w-5" />
                  <span className="sr-only">Dashboard</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Dashboard</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/dashboard"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <Lightbulb className="h-5 w-5" />
                  <span className="sr-only">Free Tools</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Free Tools</TooltipContent>
            </Tooltip>
             <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/pricing"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <DollarSign className="h-5 w-5" />
                  <span className="sr-only">Pricing</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Pricing</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/history"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <History className="h-5 w-5" />
                  <span className="sr-only">History</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">History</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col flex-1 sm:pl-14 mt-16">
        <header className="sticky top-16 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6 sm:top-0">
          <Sheet>
            <SheetTrigger asChild>
              <Button size="icon" variant="outline" className="sm:hidden">
                <PanelLeft className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="sm:max-w-xs">
              <nav className="grid gap-6 text-lg font-medium">
                <Link
                  href="/auth-dashboard"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Dashboard
                </Link>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <Lightbulb className="h-5 w-5" />
                  Free Tools
                </Link>
                 <Link
                  href="/pricing"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <DollarSign className="h-5 w-5" />
                  Pricing
                </Link>
                <Link
                  href="/history"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <History className="h-5 w-5" />
                  History
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
