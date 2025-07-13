import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/common/Logo';

export default function AuthDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6 z-50">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold md:text-base"
          >
            <Logo />
            <span className="sr-only">Eduaigen</span>
          </Link>
          <Link
            href="/dashboard"
            className="text-muted-foreground transition-colors hover:text-foreground/80"
          >
            Free Tools
          </Link>
          <Link
            href="/auth-dashboard"
            className="font-bold text-foreground transition-colors hover:text-foreground/80"
          >
            Premium Dashboard
          </Link>
          <Link
            href="/pricing"
            className="text-muted-foreground transition-colors hover:text-foreground/80"
          >
            Subscriptions
          </Link>
        </nav>
        <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
          <div className="ml-auto flex-1 sm:flex-initial" />
          <Button variant="outline">Log Out</Button>
        </div>
      </header>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        {children}
      </main>
    </div>
  );
}
