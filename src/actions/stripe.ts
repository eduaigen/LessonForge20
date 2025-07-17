
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
      subscription_data: {
        trial_period_days: 3,
      },
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

export async function createCustomerPortalSession(): Promise<CheckoutSessionResponse> {
    // In a real application, you would fetch the Stripe Customer ID
    // associated with the logged-in user from your database.
    // For this prototype, we'll simulate this by creating a portal
    // for a pre-existing customer or handling the case where one doesn't exist.
    // This example assumes you have a way to get the customerId.
    // A real implementation would look something like:
    // const user = await getCurrentUser();
    // const customerId = user.stripeCustomerId;

    // This is a placeholder for demonstration purposes.
    // You would replace this with actual customer retrieval logic.
    const customerId = "cus_MOCK_ID"; // Replace with actual logic
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';

    if (!customerId) {
        return { error: 'User is not a paying customer.' };
    }

    try {
        const portalSession = await stripe.billingPortal.sessions.create({
            customer: customerId,
            return_url: `${appUrl}/account`,
        });

        return { url: portalSession.url };
    } catch (error) {
        console.error('Error creating customer portal session:', error);
        const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
        return { error: `Could not create customer portal session: ${errorMessage}` };
    }
}
