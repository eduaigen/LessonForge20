
'use client';

import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, CheckCircle, ExternalLink, Loader2 } from 'lucide-react';
import { allModules } from '@/lib/modules-data';
import { createCustomerPortalSession } from '@/actions/stripe';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
    const { user, subscriptions } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const { toast } = useToast();
    const router = useRouter();

    const activeSubscriptions = allModules.courses.filter(course => subscriptions.includes(course.id));
    const activeTools = allModules.assessment_tools.filter(tool => subscriptions.includes(tool.id));
    const activePremiumTools = allModules.premium_tools.filter(tool => subscriptions.includes(tool.id));

    const handleManageSubscription = async () => {
        setIsLoading(true);
        toast({
            title: 'Redirecting to billing portal...',
            description: 'Please wait while we connect you to our secure billing partner.',
        });

        const { url, error } = await createCustomerPortalSession();

        if (error || !url) {
            toast({
                title: 'Error',
                description: "Could not open the billing portal. If you are using a mock customer ID, this is expected. In a real app, this would redirect to Stripe.",
                variant: 'destructive',
            });
            setIsLoading(false);
            return;
        }

        router.push(url);
    };

    return (
        <div className="container mx-auto py-12 max-w-4xl">
            <Card className="shadow-lg">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <User className="h-8 w-8" />
                        </div>
                        <div>
                            <CardTitle className="text-3xl font-headline">My Account</CardTitle>
                            <CardDescription className="text-lg">{user?.email}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="space-y-8">
                    <section>
                        <h3 className="text-xl font-semibold mb-4 border-b pb-2">Active Subscriptions</h3>
                        {activeSubscriptions.length === 0 && activeTools.length === 0 && activePremiumTools.length === 0 ? (
                            <p className="text-muted-foreground">You have no active subscriptions.</p>
                        ) : (
                            <ul className="space-y-2">
                                {[...activeSubscriptions, ...activeTools, ...activePremiumTools].map(item => (
                                    <li key={item.id} className="flex items-center gap-3 text-muted-foreground">
                                        <CheckCircle className="h-5 w-5 text-green-500" />
                                        <span>{item.name}</span>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>
                </CardContent>
                <CardFooter className="bg-muted/50 p-4 flex justify-end">
                    <Button onClick={handleManageSubscription} disabled={isLoading}>
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ExternalLink className="mr-2 h-4 w-4" />}
                        {isLoading ? "Redirecting..." : "Manage Subscription"}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}
