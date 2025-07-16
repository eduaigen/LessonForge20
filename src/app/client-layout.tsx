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
      <div className="flex min-h-screen flex-col">
        <AppHeader />
        <main className="flex-1 flex flex-col pt-16">{children}</main>
        <Footer />
      </div>
      <AccessibilityWidget />
      <Toaster />
    </AuthProvider>
  );
}
