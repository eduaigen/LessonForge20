
'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { XCircle } from 'lucide-react';

export default function CheckoutCancelPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-center p-8">
        <XCircle className="w-24 h-24 text-destructive mb-6" />
        <h1 className="text-4xl font-bold font-headline mb-4">Checkout Canceled</h1>
        <p className="text-lg text-muted-foreground max-w-lg mb-8">
            Your checkout process was canceled. You have not been charged. You can return to the pricing page to try again.
        </p>
        <Button asChild>
            <Link href="/pricing">Return to Pricing</Link>
        </Button>
    </div>
  );
}
