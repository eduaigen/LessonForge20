
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { CheckCircle2 } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const { subscribe } = useAuth();

  useEffect(() => {
    // Mark the user as subscribed
    subscribe();
    
    // Redirect to the dashboard after a short delay
    const timer = setTimeout(() => {
      router.push('/auth-dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router, subscribe]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center p-8">
        <CheckCircle2 className="w-24 h-24 text-green-500 mb-6 animate-pulse" />
        <h1 className="text-4xl font-bold font-headline mb-4">Payment Successful!</h1>
        <p className="text-lg text-muted-foreground max-w-lg">
            Thank you for subscribing! Your premium tools are now unlocked. We're redirecting you to your personalized dashboard.
        </p>
    </div>
  );
}
