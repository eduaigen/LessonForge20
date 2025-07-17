
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { CheckCircle2 } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const router = useRouter();
  const { subscribe } = useAuth();

  useEffect(() => {
    // Since the pricing page is removed, we subscribe the user to all modules upon success.
    const allPriceIds = [
        'price_1PgWqMRpWk9d9d2F1zJ4d5fG', 'price_1PgWrERpWk9d9d2Fn8Y9a7bC', 'price_1PgWrSRpWk9d9d2F5fE6g7hJ',
        'price_1PgWreRpWk9d9d2FhK8d9e0F', 'price_1PgWrrRpWk9d9d2FpL6m7n8O', 'price_1PgWs9RpWk9d9d2FqR5s6t7U',
        'price_1PgWsTRpWk9d9d2FvW4x5y6Z', 'price_1PgWshRpWk9d9d2FaB3c4d5E', 'price_1PgWsrRpWk9d9d2FfG2h3i4J',
        'price_1PgWtARpWk9d9d2FkL1m2n3O', 'price_1PgWtORpWk9d9d2FpQ0r1s2T', 'price_1PgWtZRpWk9d9d2FuV9w8x9Y',
        'price_1PgWtnRpWk9d9d2Fz0a1b2c3', 'price_1PgWuBRpWk9d9d2Fd4e5f6g7', 'price_1PgWuORpWk9d9d2Fh8i9j0k1',
        'price_1PgWuXRpWk9d9d2Fl2m3n4o5', 'price_1PgWupRpWk9d9d2Fp6q7r8s9', 'price_1PgWv3RpWk9d9d2Ft0u1v2w3',
        'price_1PgWvGRpWk9d9d2Fx4y5z6a7', 'price_1PgWvURpWk9d9d2Fb8c9d0e1'
    ];
    
    subscribe(allPriceIds);
    
    // Redirect to the dashboard after a short delay
    const timer = setTimeout(() => {
      router.push('/auth-dashboard');
    }, 3000);

    return () => clearTimeout(timer);
  }, [router, subscribe]);

  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center p-8">
        <CheckCircle2 className="w-24 h-24 text-green-500 mb-6 animate-pulse" />
        <h1 className="text-4xl font-bold font-headline mb-4">Success! Your Premium Access is Unlocked.</h1>
        <p className="text-lg text-muted-foreground max-w-lg">
            Thank you! All premium tools are now available in your account. We're redirecting you to your personalized dashboard.
        </p>
    </div>
  );
