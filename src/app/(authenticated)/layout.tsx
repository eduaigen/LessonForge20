import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/common/Logo';
import {
  FileText,
  TestTube,
  BookCopy,
  FolderSync,
  PanelLeft,
} from 'lucide-react';
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
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
          <Link
            href="#"
            className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
          >
            <Logo />
            <span className="sr-only">Eduaigen</span>
          </Link>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/auth-dashboard/lesson-plan-generator"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <FileText className="h-5 w-5" />
                  <span className="sr-only">Lesson Plan Generator</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Lesson Plan Generator</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/auth-dashboard/test-generator"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <BookCopy className="h-5 w-5" />
                  <span className="sr-only">Test Generator</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Test Generator</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/auth-dashboard/lab-generator"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <TestTube className="h-5 w-5" />
                  <span className="sr-only">Lab Generator</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Lab Generator</TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  href="/auth-dashboard/curriculum-audit"
                  className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
                >
                  <FolderSync className="h-5 w-5" />
                  <span className="sr-only">Curriculum Audit</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">Curriculum Audit</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </nav>
      </aside>
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
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
                  href="/"
                  className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                >
                  <Logo />
                  <span className="sr-only">Eduaigen</span>
                </Link>
                <Link
                  href="/auth-dashboard/lesson-plan-generator"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <FileText className="h-5 w-5" />
                  Lesson Plan Generator
                </Link>
                <Link
                  href="/auth-dashboard/test-generator"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <BookCopy className="h-5 w-5" />
                  Test Generator
                </Link>
                <Link
                  href="/auth-dashboard/lab-generator"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <TestTube className="h-5 w-5" />
                  Lab Generator
                </Link>
                <Link
                  href="/auth-dashboard/curriculum-audit"
                  className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                >
                  <FolderSync className="h-5 w-5" />
                  Curriculum Audit
                </Link>
                 <Link
                  href="/dashboard"
                  className="flex items-center gap-4 px-2.5 text-foreground"
                >
                  Free Tools
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
          <div className="ml-auto flex items-center gap-2">
            <Button variant="outline" asChild>
              <Link href="/curriculum">Get More Tools</Link>
            </Button>
            <Button asChild>
              <Link href="/">Log out</Link>
            </Button>
          </div>
        </header>
        <main className="flex-1 p-4 sm:px-6 sm:py-0 md:gap-8">
          {children}
        </main>
      </div>
    </div>
  );
}
