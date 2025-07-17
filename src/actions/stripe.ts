
'use server';

import Stripe from 'stripe';
import { z } from 'zod';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2024-06-20',
});

const checkoutSessionSchema = z.array(z.string().startsWith('price_'));

type CheckoutSessionResponse = {
  url?: string | null;
  error?: string;
};

export async function createCheckoutSession(priceIds: string[]): Promise<CheckoutSessionResponse> {
  const validation = checkoutSessionSchema.safeParse(priceIds);

  if (!validation.success) {
    return { error: 'Invalid Price ID format provided.' };
  }

  if (priceIds.length === 0) {
    return { error: 'No subscription items selected.' };
  }
  
  const lineItems = priceIds.map(priceId => ({
    price: priceId,
    quantity: 1,
  }));

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'subscription',
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&price_ids=${priceIds.join(',')}`,
      cancel_url: `${appUrl}/checkout/cancel`,
    });

    return { url: session.url };
  } catch (error) {
    console.error('Error creating Stripe Checkout session:', error);
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return { error: `Could not create checkout session: ${errorMessage}` };
  }
}
