
'use client';

import React, { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Microscope, Sigma, Library, History, FileText, TestTube, BookCopy, Atom, Leaf, Dna, Orbit, HeartPulse, Magnet, Loader2, Languages, Sparkles } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { createCheckoutSession } from '@/actions/stripe';
import { useToast } from '@/hooks/use-toast';
import { modules, type ModuleCategory, type Module } from '@/lib/modules-data';
import Link from 'next/link';

const iconMap: { [key: string]: React.ReactNode } = {
    dna: <Dna />,
    leaf: <Leaf />,
    atom: <Atom />,
    magnet: <Magnet />,
    orbit: <Orbit />,
    heartPulse: <HeartPulse />,
    sigma: <Sigma />,
    library: <Library />,
    history: <History />,
    languages: <Languages />,
    bookCopy: <BookCopy />,
    testTube: <TestTube />,
};

const pricing = {
    course: {
        first: 15.99,
        second: 9.99,
        additional: 5.99,
    },
    premium_tool: {
        standalone: 19.99,
        addon: 9.99,
    }
};

const ModuleCard = ({ module, isSelected, onSelect }: { module: Module, isSelected: boolean, onSelect: (id: string) => void }) => (
    <Card
        onClick={() => onSelect(module.id)}
        className={cn(
            "cursor-pointer transition-all duration-200 flex flex-col",
            isSelected ? "border-primary ring-2 ring-primary shadow-lg" : "hover:shadow-md"
        )}
    >
        <CardHeader className="flex flex-row items-start justify-between pb-2">
            <div>
              <CardTitle className="text-lg font-medium">{module.name}</CardTitle>
              <CardDescription className="text-xs pt-1">{module.id}</CardDescription>
            </div>
            <div className="text-primary">{iconMap[module.icon]}</div>
        </CardHeader>
        <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground">{module.description}</p>
        </CardContent>
    </Card>
);

export default function PricingPage() {
  const { toast } = useToast();
  const [selectedModules, setSelectedModules] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<ModuleCategory>('science');
  const [isLoading, setIsLoading] = useState(false);

  const handleSelectModule = (id: string) => {
    setSelectedModules(prev =>
      prev.includes(id) ? prev.filter(mId => mId !== id) : [...prev, id]
    );
  };

  const totalPrice = useMemo(() => {
    if (selectedModules.length === 0) return 0;

    const allModules = Object.values(modules).flat();
    const selected = selectedModules.map(id => allModules.find(m => m.id === id)).filter(Boolean) as Module[];

    const courses = selected.filter(m => m.type === 'course');
    const premiumTools = selected.filter(m => m.type === 'premium_tool');
    
    let total = 0;

    if (courses.length === 0 && premiumTools.length > 0) {
        // Only premium tools selected
        total += pricing.premium_tool.standalone;
        if (premiumTools.length > 1) {
            total += (premiumTools.length - 1) * pricing.premium_tool.addon;
        }
    } else {
        // Courses are selected, possibly with tools
        if (courses.length > 0) {
            total += pricing.course.first;
        }
        if (courses.length > 1) {
            total += pricing.course.second;
        }
        if (courses.length > 2) {
            total += (courses.length - 2) * pricing.course.additional;
        }

        // Add price for any premium tools as add-ons
        total += premiumTools.length * pricing.premium_tool.addon;
    }
    
    return total;
  }, [selectedModules]);

  const handleSubscribe = async () => {
    if (selectedModules.length === 0) {
        toast({
            title: "No Selection",
            description: "Please select at least one module or tool to subscribe.",
            variant: "destructive"
        });
        return;
    }
    setIsLoading(true);
    try {
        const { url, error } = await createCheckoutSession(selectedModules);
        if (url) {
            window.location.href = url;
        } else {
             toast({
                title: "Error Creating Checkout",
                description: error || "Could not create a checkout session. Please try again.",
                variant: "destructive"
            });
        }
    } catch (error) {
        console.error("Stripe checkout error:", error);
         toast({
            title: "Subscription Error",
            description: "An unexpected error occurred. Please contact support.",
            variant: "destructive"
        });
    } finally {
        setIsLoading(false);
    }
  };
  
  const subjectTabs: { key: ModuleCategory; label: string; icon: React.ReactNode }[] = [
      { key: 'science', label: 'Science', icon: <Microscope className="w-5 h-5 mr-2" /> },
      { key: 'math', label: 'Mathematics', icon: <Sigma className="w-5 h-5 mr-2" /> },
      { key: 'ela', label: 'ELA', icon: <Library className="w-5 h-5 mr-2" /> },
      { key: 'social', label: 'Social Studies', icon: <History className="w-5 h-5 mr-2" /> },
      { key: 'ell', label: 'ELL/ENL', icon: <Languages className="w-5 h-5 mr-2" /> },
      { key: 'tools', label: 'Premium Tools', icon: <FileText className="w-5 h-5 mr-2" /> }
  ];

  return (
    <div className="flex-1 bg-background">
      <section className="container mx-auto max-w-7xl px-4 py-16 text-center sm:py-24">
         <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Sparkles className="h-8 w-8" />
        </div>
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Build Your Perfect Toolkit
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-lg text-muted-foreground">
          Select the subjects and tools you need. Mix and match to create your ideal subscription package.
        </p>
      </section>

      <section className="container mx-auto max-w-7xl px-4 pb-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
                <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ModuleCategory)} className="w-full">
                    <TabsList className="grid w-full grid-cols-3 sm:grid-cols-4 md:grid-cols-6">
                        {subjectTabs.map(tab => (
                            <TabsTrigger key={tab.key} value={tab.key} className="flex items-center text-xs sm:text-sm">
                                {tab.icon}{tab.label}
                            </TabsTrigger>
                        ))}
                    </TabsList>
                    {(Object.keys(modules) as ModuleCategory[]).map((category) => (
                        <TabsContent key={category} value={category} className="mt-8">
                            <div className="grid gap-6 md:grid-cols-2">
                                {modules[category].map(module => (
                                    <ModuleCard 
                                        key={module.id}
                                        module={module}
                                        isSelected={selectedModules.includes(module.id)}
                                        onSelect={handleSelectModule}
                                    />
                                ))}
                            </div>
                        </TabsContent>
                    ))}
                </Tabs>
            </div>
            
            <div className="lg:col-span-1">
                <Card className="sticky top-24 shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-2xl">Your Subscription</CardTitle>
                        <CardDescription>Review your selections and proceed to checkout.</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="min-h-[10rem] border-t pt-4">
                          {selectedModules.length > 0 ? (
                            <ul className="space-y-2">
                                {selectedModules.map(moduleId => {
                                    const allModules = Object.values(modules).flat();
                                    const module = allModules.find(m => m.id === moduleId);
                                    return (
                                        <li key={moduleId} className="flex items-center justify-between text-sm font-medium">
                                            <span>{module?.name || moduleId}</span>
                                            <Check className="h-5 w-5 text-green-500" />
                                        </li>
                                    );
                                })}
                            </ul>
                          ) : (
                            <div className="flex items-center justify-center h-full text-sm text-muted-foreground">
                                <p>Select modules to get started.</p>
                            </div>
                          )}
                        </div>
                         <div className="border-t pt-4 text-center">
                            <div className="flex items-baseline justify-center">
                                <span className="text-4xl font-bold tracking-tighter text-foreground">
                                    ${totalPrice.toFixed(2)}
                                </span>
                                <span className="ml-1 text-muted-foreground">
                                    / month
                                </span>
                            </div>
                         </div>
                    </CardContent>
                    <CardFooter>
                         <Button onClick={handleSubscribe} className="w-full" size="lg" disabled={isLoading || selectedModules.length === 0}>
                            {isLoading ? <Loader2 className="animate-spin" /> : 'Subscribe Now'}
                        </Button>
                    </CardFooter>
                </Card>
            </div>
        </div>
      </section>
    </div>
  );
}
