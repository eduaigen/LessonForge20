
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { createCheckoutSession } from '@/actions/stripe';
import { Loader2, Sparkles, CheckCircle, Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { allModules, type Module } from '@/lib/modules-data';
import { cn } from '@/lib/utils';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

const ModuleCard = ({ module, isSelected, onSelect }: { module: Module, isSelected: boolean, onSelect: (id: string) => void }) => {
    const Icon = module.icon;
    return (
        <Card className={cn("transition-all duration-200", isSelected && "border-primary ring-2 ring-primary")}>
            <CardHeader className="flex flex-row items-start justify-between">
                <div>
                    <CardTitle className="text-lg flex items-center gap-2"><Icon /> {module.name}</CardTitle>
                    <CardDescription className="text-xs pt-1">{module.id}</CardDescription>
                </div>
                 <Checkbox
                    id={module.id}
                    checked={isSelected}
                    onCheckedChange={() => onSelect(module.id)}
                    className="h-5 w-5"
                />
            </CardHeader>
            <CardContent>
                <p className="text-sm text-muted-foreground">{module.description}</p>
            </CardContent>
        </Card>
    );
};

export default function PricingPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedModules, setSelectedModules] = useState<string[]>([]);
    
    const handleSelectModule = (id: string) => {
        setSelectedModules(prev =>
            prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]
        );
    };
    
    const { totalPrice, coursesCount, assessmentToolsCount } = useMemo(() => {
        const selectedCourses = selectedModules.filter(id => allModules.courses.some(c => c.id === id));
        const selectedAssessments = selectedModules.filter(id => allModules.assessment_tools.some(t => t.id === id));
        
        const coursesCount = selectedCourses.length;
        const assessmentToolsCount = selectedAssessments.length;

        let coursePrice = 0;
        if (coursesCount === 1) coursePrice = 15.99;
        if (coursesCount === 2) coursePrice = 15.99 + 9.99;
        if (coursesCount >= 3) coursePrice = 15.99 + 9.99 + (5.99 * (coursesCount - 2));

        let toolPrice = 0;
        if (coursesCount > 0) {
            // Add-on pricing for assessment tools
            toolPrice = assessmentToolsCount * 9.99;
        } else {
            // Standalone pricing for assessment tools
            toolPrice = assessmentToolsCount * 15.99;
        }

        return {
            totalPrice: coursePrice + toolPrice,
            coursesCount,
            assessmentToolsCount,
        };

    }, [selectedModules]);

    const handleSubscribe = async () => {
        if (selectedModules.length === 0) {
            toast({ title: "No Selection", description: "Please select at least one module to subscribe.", variant: "destructive" });
            return;
        }
        if (coursesCount > 3) {
             toast({ title: "Site License Needed", description: "For more than 3 course modules, please contact support for a custom site license.", variant: "destructive" });
            return;
        }

        setIsLoading(true);
        toast({ title: 'Redirecting to checkout...', description: 'Please wait while we prepare your secure checkout page.' });
        
        const { url, error } = await createCheckoutSession(selectedModules);

        if (error || !url) {
            toast({ title: 'Error', description: error || "Could not create checkout session.", variant: 'destructive' });
            setIsLoading(false);
            return;
        }

        router.push(url);
    };

    return (
        <div className="container mx-auto py-12">
            <header className="text-center mb-12">
                 <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sparkles className="h-8 w-8" />
                </div>
                <h1 className="text-4xl font-bold font-headline">Build Your Perfect Toolkit</h1>
                <p className="text-lg text-muted-foreground mt-4 max-w-3xl mx-auto">Select the lesson plan generators and premium tools you need. The more you bundle, the more you save.</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <main className="lg:col-span-8 space-y-8">
                    {Object.entries(allModules.coursesBySubject).map(([subject, modules]) => (
                        <section key={subject}>
                            <h2 className="text-2xl font-bold font-headline mb-4 capitalize">{subject} Lesson Generators</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {modules.map(module => (
                                    <ModuleCard key={module.id} module={module} isSelected={selectedModules.includes(module.id)} onSelect={() => handleSelectModule(module.id)} />
                                ))}
                            </div>
                        </section>
                    ))}
                    
                    {Object.entries(allModules.assessmentsBySubject).map(([subject, modules]) => (
                         <section key={`assessment-${subject}`}>
                            <h2 className="text-2xl font-bold font-headline mb-4 capitalize">{subject} Assessment Generators</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {modules.map(module => (
                                    <ModuleCard key={module.id} module={module} isSelected={selectedModules.includes(module.id)} onSelect={() => handleSelectModule(module.id)} />
                                ))}
                            </div>
                        </section>
                    ))}

                </main>
                
                <aside className="lg:col-span-4 sticky top-24 self-start">
                    <Card className="shadow-lg">
                        <CardHeader>
                            <CardTitle>Your Custom Toolkit</CardTitle>
                            <CardDescription>Review your selections and proceed to checkout.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <h4 className="font-semibold">Lesson Generators ({coursesCount})</h4>
                                <ul className="text-sm text-muted-foreground list-disc pl-5">
                                    <li>1st Course: $15.99</li>
                                    <li>2nd Course: $9.99</li>
                                    <li>3rd+ Course: $5.99 each</li>
                                </ul>
                                {coursesCount > 3 && <p className="text-sm text-destructive font-semibold">For more than 3 courses, please contact us for a site license.</p>}
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-semibold">Test & Lab Generators ({assessmentToolsCount})</h4>
                                 <ul className="text-sm text-muted-foreground list-disc pl-5">
                                    <li>Standalone: $15.99 each</li>
                                    <li>As Add-on: $9.99 each</li>
                                </ul>
                            </div>

                             <Alert className="mt-4">
                                <CheckCircle className="h-4 w-4" />
                                <AlertTitle>Subscriber Perk!</AlertTitle>
                                <AlertDescription>
                                    Our powerful <span className="font-semibold">Curriculum Audit Tool</span> is included for free with any subscription.
                                </AlertDescription>
                            </Alert>

                            <div className="border-t pt-4 mt-4">
                                <p className="text-2xl font-bold text-right">
                                    Total: ${totalPrice.toFixed(2)}
                                    <span className="text-sm font-normal text-muted-foreground ml-1">/ month</span>
                                </p>
                            </div>
                        </CardContent>
                        <CardContent>
                             <Button size="lg" className="w-full" onClick={handleSubscribe} disabled={isLoading || selectedModules.length === 0 || coursesCount > 3}>
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                                {coursesCount > 3 ? "Contact Support for Site License" : (isLoading ? "Redirecting..." : "Subscribe Now")}
                            </Button>
                        </CardContent>
                    </Card>
                </aside>
            </div>
        </div>
    );
}
