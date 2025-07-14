
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';

export function AppHeader() {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const pricingHref = isLoggedIn ? '/pricing' : '/signup';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-7xl items-center px-4">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <Logo />
          </Link>
        </div>
        <nav className="hidden items-center gap-6 text-sm font-medium md:flex">
          <Link
            href="/#features"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Features
          </Link>
          <Link
            href="/curriculum"
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Curriculum
          </Link>
          <Link
            href={pricingHref}
            className="text-foreground/60 transition-colors hover:text-foreground/80"
          >
            Pricing
          </Link>
           {isLoggedIn && (
            <Link
                href="/dashboard"
                className="font-semibold text-foreground transition-colors hover:text-foreground/80"
            >
                Free Tools
            </Link>
           )}
        </nav>
        <div className="flex flex-1 items-center justify-end space-x-2">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" asChild>
                <Link href="/auth-dashboard">Premium Dashboard</Link>
              </Button>
              <Button onClick={handleLogout}>Log Out</Button>
            </>
          ) : (
            <>
              <Button variant="ghost" asChild>
                <Link href="/login">Login</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Get Started</Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
