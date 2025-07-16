
'use client';

import { Toaster } from '@/components/ui/toaster';
import { AuthProvider } from '@/context/AuthContext';
import { AppHeader } from '@/components/common/AppHeader';
import { Footer } from '@/components/common/Footer';
import AccessibilityWidget from '@/components/common/AccessibilityWidget';

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <div className="relative flex min-h-screen w-full flex-col">
        <AppHeader />
        <div className="flex-1">{children}</div>
        <Footer />
      </div>
      <AccessibilityWidget />
      <Toaster />
    </AuthProvider>
  );
}
