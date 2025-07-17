
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/common/Logo';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { createCheckoutSession } from '@/actions/stripe';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';

export function AppHeader() {
  const { isLoggedIn, logout, isSubscribed } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const handleSubscribe = async () => {
    setIsLoading(true);
    toast({
      title: 'Redirecting to checkout...',
      description: 'Please wait while we prepare your secure checkout page.',
    });
    
    const { url, error } = await createCheckoutSession();

    if (error) {
      toast({
        title: 'Error',
        description: error,
        variant: 'destructive',
      });
      setIsLoading(false);
      return;
    }

    if (url) {
      router.push(url);
    }
  };
  
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
              {!isSubscribed && (
                 <Button onClick={handleSubscribe} disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Subscribe'}
                </Button>
              )}
              <Button variant="ghost" asChild>
                <Link href="/auth-dashboard">Dashboard</Link>
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
