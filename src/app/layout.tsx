
'use client';

import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { cn } from '@/lib/utils';
import { AuthProvider } from '@/context/AuthContext';
import { AppHeader } from '@/components/common/AppHeader';
import { Footer } from '@/components/common/Footer';
import { Inter, Space_Grotesk } from 'next/font/google';
import AccessibilityWidget from '@/components/common/AccessibilityWidget';
import Script from 'next/script';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
});

// Extend the Window interface
declare global {
  interface Window {
    google: any;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('font-body antialiased bg-background', inter.variable, spaceGrotesk.variable)}>
        <div id="google_translate_element" className="fixed top-20 right-4 z-50"></div>
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

        <Script
            src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
            strategy="afterInteractive"
        />
        <Script id="google-translate" strategy="afterInteractive">
          {`
            function googleTranslateElementInit() {
              new window.google.translate.TranslateElement({pageLanguage: 'en'}, 'google_translate_element');
            }
          `}
        </Script>
      </body>
    </html>
  );
}
