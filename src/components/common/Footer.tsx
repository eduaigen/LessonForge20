
'use client';

import { Logo } from '@/components/common/Logo';
import { usePathname } from 'next/navigation';

export function Footer() {
  const pathname = usePathname();

  // Don't show footer on authenticated routes
  if (pathname.startsWith('/auth-dashboard') || pathname.startsWith('/dashboard')) {
    return null;
  }

  return (
    <footer className="border-t border-border/40 mt-auto">
      <div className="container flex flex-col items-center justify-center gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <Logo />
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} Eduaigen. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
