
'use client';

import { useState, useMemo } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Microscope, Sigma, Library, History, FileText, TestTube, BookCopy, Atom, Leaf, Dna, Orbit, HeartPulse, Magnet, Loader2 } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { createCheckoutSession } from '@/actions/stripe';
import { useToast } from '@/hooks/use-toast';


const modules = {
  science: [
    { id: 'price_1Pg0yPAk4y2zY5d6o4qZ5aBc', name: 'NV Biology', description: 'NYS Living Environment curriculum.', icon: <Dna /> },
    { id: 'price_1Pg0yqAk4y2zY5d6n7s8tUvW', name: 'NGSS Biology (OpenSciEd)', description: 'Inquiry-based biology phenomena.', icon: <Leaf /> },
    { id: 'price_1Pg0zFAk4y2zY5d6xYz0a1bC', name: 'NGSS Chemistry (OpenSciEd)', description: 'Foundational chemical principles.', icon: <Atom /> },
    { id: 'price_1Pg0znAk4y2zY5d6pQrStVwX', name: 'NGSS Physics (OpenSciEd)', description: 'Core concepts like motion, forces, energy.', icon: <Magnet /> },
    { id: 'price_1Pg10AAk4y2zY5d6LMN9oPqR', name: 'Earth and Space Science', description: 'NYS Physical Setting curriculum.', icon: <Orbit /> },
    { id: 'price_1Pg10RAk4y2zY5d6IJK7lMnO', name: 'Health', description: 'Promoting well-being & healthy choices.', icon: <HeartPulse /> },
  ],
  math: [
    { id: 'price_1Pg10jAk4y2zY5d6DEF4gHjK', name: 'Illustrative Math Algebra 1', description: 'Linear equations, functions, data.', icon: <Sigma /> },
    { id: 'price_1Pg10wAk4y2zY5d6sTuVwXyZ', name: 'Illustrative Math Algebra 2', description: 'Polynomials, rational, exponential.', icon: <Sigma /> },
    { id: 'price_1Pg11DAk4y2zY5d6GHIJkLmN', name: 'Illustrative Math Geometry', description: 'Transformations, congruence, trig.', icon: <Sigma /> },
  ],
  ela: [
    { id: 'price_1Pg11UAk4y2zY5d6OPQRsTuV', name: 'ELA 9th Grade', description: 'Analytical reading and writing skills.', icon: <Library /> },
    { id: 'price_1Pg11gAk4y2zY5d6WXYZ0a1b', name: 'ELA 10th Grade', description: 'Complex texts and critical analysis.', icon: <Library /> },
    { id: 'price_1Pg11sAk4y2zY5d6cdeFgHjK', name: 'ELA 11th Grade', description: 'American literature and research.', icon: <Library /> },
    { id: 'price_1Pg124Ak4y2zY5d6lMnOpQrS', name: 'ELA 12th Grade', description: 'College-level reading and writing.', icon: <Library /> },
  ],
  social: [
    { id: 'price_1Pg12DAk4y2zY5d6tUvWxYz0', name: 'Global History I & II', description: 'From ancient civilizations to present.', icon: <History /> },
    { id: 'price_1Pg12NAk4y2zY5d6a1bCdeFg', name: 'US History & Government', description: 'American history & constitutional principles.', icon: <History /> },
    { id: 'price_1Pg12ZAk4y2zY5d6hIjKlMnO', name: 'Government & Economics', description: 'Study of government and economic principles.', icon: <History /> },
  ],
  tools: [
      { id: 'price_1Pg12lAk4y2zY5d6pQrStUvW', name: 'Test Generator', description: 'Generate comprehensive tests for any subject.', icon: <BookCopy /> },
      { id: 'price_1Pg12wAk4y2zY5d6xYz0a1bC', name: 'Lab Generator', description: 'Instantly create safe lab experiments for science classes.', icon: <TestTube /> },
  ]
};

const pricing = {
    base: 19.99,
    additional: 9.99,
};

type ModuleCategory = keyof typeof modules;

const ModuleCard = ({ module, isSelected, onSelect }: { module: any, isSelected: boolean, onSelect: (id: string) => void }) => (
    <Card
        onClick={() => onSelect(module.id)}
        className={cn(
            "cursor-pointer transition-all duration-200 flex flex-col",
            isSelected ? "border-primary ring-2 ring-primary shadow-lg" : "hover:shadow-md"
        )}
    >
        <CardHeader className="flex flex-row items-start justify-between pb-2">
            <CardTitle className="text-lg font-medium">{module.name}</CardTitle>
            <div className="text-primary">{module.icon}</div>
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
    const count = selectedModules.length;
    if (count === 0) return 0;
    if (count === 1) return pricing.base;
    return pricing.base + (count - 1) * pricing.additional;
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
        const { url } = await createCheckoutSession(selectedModules);
        if (url) {
            window.location.href = url;
        } else {
             toast({
                title: "Error Creating Checkout",
                description: "Could not create a checkout session. Please try again.",
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
      { key: 'tools', label: 'Premium Tools', icon: <FileText className="w-5 h-5 mr-2" /> }
  ];

  return (
    <div className="flex-1 bg-background">
      <section className="container mx-auto max-w-7xl px-4 py-16 text-center sm:py-24">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl">
          Build Your Perfect Toolkit
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Select the subjects and tools you need. The first item is ${pricing.base}/month, and each additional is only ${pricing.additional}/month.
        </p>
      </section>

      <section className="container mx-auto max-w-7xl px-4 pb-20">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
                <Tabs value={selectedCategory} onValueChange={(value) => setSelectedCategory(value as ModuleCategory)} className="w-full">
                    <TabsList className="grid w-full grid-cols-2 sm:grid-cols-3 md:grid-cols-5">
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
                         <div className="border-t pt-4">
                            <div className="flex items-baseline justify-center text-center">
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
