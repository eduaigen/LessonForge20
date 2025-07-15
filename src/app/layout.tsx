
'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/context/AuthContext';
import { AppHeader } from '@/components/common/AppHeader';
import { Footer } from '@/components/common/Footer';
import { Inter, Space_Grotesk } from 'next/font/google';
import AccessibilityWidget from '@/components/common/AccessibilityWidget';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-body antialiased bg-background', inter.variable, spaceGrotesk.variable)}>
        <AuthProvider>
          <div className="flex min-h-screen flex-col">
            <AppHeader />
            <main className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
          </div>
          <AccessibilityWidget />
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  );
}
