
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { CheckCircle2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { subscribe, setShowDisclaimer } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const priceIdsParam = searchParams.get('price_ids');
    if (priceIdsParam) {
      const priceIds = priceIdsParam.split(',');
      subscribe(priceIds);
      
      // Don't show disclaimer to admins who get all access automatically
      const isAdminUser = sessionStorage.getItem('isAdmin') === 'true';
      if (!isAdminUser) {
        sessionStorage.setItem('showDisclaimer', 'true');
        setShowDisclaimer(true);
      }
      
      setLoading(false);
    } else {
      console.warn("No price_ids found in success URL.");
      setLoading(false);
      // Redirect or show an error if no price IDs are found
      router.push('/pricing');
    }

    // Instead of auto-redirecting, let the user click through
    // or be redirected after the disclaimer is handled.
  }, [router, subscribe, searchParams, setShowDisclaimer]);

  if (loading) {
    return (
        <div className="flex flex-1 flex-col items-center justify-center text-center p-8">
            <Loader2 className="w-24 h-24 text-primary mb-6 animate-spin" />
            <h1 className="text-4xl font-bold font-headline mb-4">Finalizing Your Subscription...</h1>
            <p className="text-lg text-muted-foreground max-w-lg">
                Please wait while we update your account with your new toolkit.
            </p>
        </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center p-8">
        <CheckCircle2 className="w-24 h-24 text-green-500 mb-6 animate-pulse" />
        <h1 className="text-4xl font-bold font-headline mb-4">Success! Your Toolkit is Ready.</h1>
        <p className="text-lg text-muted-foreground max-w-lg mb-8">
            Thank you! Your selected tools are now available in your account. You will be redirected to your dashboard shortly.
        </p>
         <Button asChild>
            <Link href="/auth-dashboard">Go to Dashboard Now</Link>
        </Button>
    </div>
  );
}
