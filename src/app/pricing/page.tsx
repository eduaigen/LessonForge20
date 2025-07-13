// This is a new file or has been significantly updated.
'use client';

import { useRouter } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';


export default function PricingPage() {
    const router = useRouter();
    const { subscribe } = useAuth();

    const handleSubscribe = () => {
        subscribe();
        router.push('/auth-dashboard');
    }

    const tiers = [
    {
      name: 'Single Module',
      price: '$19.99',
      priceDescription: '/ month',
      description:
        'Focus on a single subject or tool with full access to its features.',
      features: [
        'Access to one full subject module OR',
        'Access to one premium tool (Test Maker or Lab Generator)',
        'Lesson Plan Generation',
        'Learning Objective Refiner',
        'Concept Explainer',
        'Vocab Deep Dive',
      ],
      cta: 'Complete Subscription',
    },
    {
      name: 'Module Bundle',
      price: '$29.98',
      priceDescription: '/ month',
      description: 'Combine two modules and get 50% off the second one.',
      features: [
        'Access to two full subject modules',
        'All standard AI tools included',
        'Ideal for interdisciplinary teaching',
        'Priority support',
      ],
      cta: 'Complete Subscription',
      popular: true,
    },
    {
      name: 'Educator Pro',
      price: '$34.98',
      priceDescription: '/ month',
      description: 'The ultimate toolkit with a subject and a premium tool.',
      features: [
        'One subject module + one premium tool',
        'Save on the premium tool bundle',
        'Full access to all AI features',
        'Best value for comprehensive planning',
      ],
      cta: 'Complete Subscription',
    },
  ];

  return (
    <div className="flex-1">
        <section className="container mx-auto max-w-7xl px-4 py-16 text-center sm:py-24">
          <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
            Choose Your Plan & Get Started
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Select a plan to unlock our premium AI tools. All plans come with a 7-day free trial.
          </p>
        </section>

        <section className="container mx-auto max-w-7xl px-4 pb-20">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {tiers.map((tier) => (
              <Card
                key={tier.name}
                className={`flex flex-col ${
                  tier.popular ? 'border-primary shadow-lg' : ''
                }`}
              >
                <CardHeader className="pb-4">
                  <CardTitle>{tier.name}</CardTitle>
                  <CardDescription>{tier.description}</CardDescription>
                  <div className="flex items-baseline pt-4">
                    <span className="text-4xl font-bold tracking-tighter">
                      {tier.price}
                    </span>
                    <span className="ml-1 text-muted-foreground">
                      {tier.priceDescription}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="h-5 w-5 flex-shrink-0 text-green-500 mt-1" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleSubscribe}
                    className="w-full"
                    style={{
                      backgroundColor: tier.popular
                        ? 'hsl(var(--accent))'
                        : 'hsl(var(--primary))',
                      color: tier.popular
                        ? 'hsl(var(--accent-foreground))'
                        : 'hsl(var(--primary-foreground))',
                    }}
                  >
                    {tier.cta}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>
    </div>
  );
}
