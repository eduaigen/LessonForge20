
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
       <head>
        <script
            id="google-translate-script"
            type="text/javascript"
            src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
            async
          ></script>
          <script
            id="google-translate-init"
            dangerouslySetInnerHTML={{
              __html: `
                function googleTranslateElementInit() {
                  new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
                }
              `,
            }}
          ></script>
      </head>
      <body className={cn('font-body antialiased bg-background', inter.variable, spaceGrotesk.variable)}>
        <AuthProvider>
          <div id="google_translate_element" style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1000 }}></div>
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
