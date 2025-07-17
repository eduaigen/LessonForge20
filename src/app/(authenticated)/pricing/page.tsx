
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { createCheckoutSession } from '@/actions/stripe';
import { Loader2, Sparkles, ArrowRight, ArrowLeft, CheckCircle, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { allModules, type Module } from '@/lib/modules-data';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

type Step = 'courses' | 'addons' | 'summary';

const subjectsWithCourses = [
    { name: 'Science', icon: allModules.coursesBySubject.science[0].icon, courses: allModules.coursesBySubject.science },
    { name: 'Mathematics', icon: allModules.coursesBySubject.math[0].icon, courses: allModules.coursesBySubject.math },
    { name: 'English Language Arts', icon: allModules.coursesBySubject.ela[0].icon, courses: allModules.coursesBySubject.ela },
    { name: 'Social Studies', icon: allModules.coursesBySubject['social studies'][0].icon, courses: allModules.coursesBySubject['social studies'] },
    { name: 'ELL / ENL', icon: allModules.coursesBySubject.ell[0].icon, courses: allModules.coursesBySubject.ell },
];

const CourseSelectionCard = ({ item, isSelected, onSelect }: { item: Module, isSelected: boolean, onSelect: (id: string) => void }) => {
    return (
        <Card 
            className={cn("cursor-pointer transition-all duration-200 text-left flex flex-col", isSelected && "border-primary ring-2 ring-primary")}
            onClick={() => onSelect(item.id)}
        >
            <CardHeader className="flex-row items-start gap-4 space-y-0">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary flex-shrink-0">
                    <item.icon className="h-6 w-6" />
                </div>
                <div className="flex-1">
                    <CardTitle className="text-base">{item.name}</CardTitle>
                    <CardDescription className="text-xs mt-1">{item.description}</CardDescription>
                </div>
            </CardHeader>
             <CardContent className="mt-auto flex justify-end pt-4">
                <div className={cn("h-6 w-6 rounded-full border flex items-center justify-center", isSelected ? "bg-primary border-primary" : "bg-muted")}>
                    {isSelected && <CheckCircle className="h-4 w-4 text-primary-foreground" />}
                </div>
            </CardContent>
        </Card>
    );
};


export default function ConversationalCheckoutPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [step, setStep] = useState<Step>('courses');

    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

    const handleSelectCourse = (id: string) => {
        setSelectedCourses(prev =>
            prev.includes(id) ? prev.filter(cId => cId !== id) : [...prev, id]
        );
    };

    const handleSelectAddon = (id: string) => {
        setSelectedAddons(prev =>
            prev.includes(id) ? prev.filter(aId => aId !== id) : [...prev, id]
        );
    };
    
    const showLabAddon = useMemo(() => {
        const scienceCourseIds = allModules.coursesBySubject.science
            .filter(c => c.name !== 'AP Biology Lesson Generator' && c.name !== 'Health Lesson Generator')
            .map(c => c.id);
        return selectedCourses.some(id => scienceCourseIds.includes(id));
    }, [selectedCourses]);

    const addonTools = [
        { id: 'test_maker', name: 'Test Maker Suite', description: 'Unlock powerful test generators for all your selected subjects. Create Regents-style exams, NGSS-aligned cluster assessments, and scaffolded tests for all learners.', icon: allModules.assessment_tools[0].icon },
        ...(showLabAddon ? [{ id: 'lab_generator', name: 'Science Lab Generator Suite', description: 'Bring science to life! Generate hands-on, 45-minute, NGSS-aligned lab activities for Biology, Chemistry, Physics, and Earth Science. (AP Bio and Health not included).', icon: allModules.assessment_tools.find(t=>t.href?.includes('lab'))!.icon }] : []),
    ];

    const getPriceDetails = () => {
        const coursesCount = selectedCourses.length;
        
        const hasTestMaker = selectedAddons.includes('test_maker');
        const hasLabGenerator = selectedAddons.includes('lab_generator');
        
        let coursePrice = 0;
        if (coursesCount > 0) {
            coursePrice = 15.99 + (coursesCount - 1) * 9.99;
        }

        let testMakerPrice = hasTestMaker ? (coursesCount > 0 ? 9.99 : 15.99) : 0;
        let labGeneratorPrice = hasLabGenerator ? (coursesCount > 0 ? 9.99 : 15.99) : 0;
        
        const totalPrice = coursePrice + testMakerPrice + labGeneratorPrice;
        
        const priceIds: string[] = [];
        if (coursesCount > 0) priceIds.push(...selectedCourses);
        if(hasTestMaker) {
             const subjectSet = new Set(allModules.courses.filter(c => selectedCourses.includes(c.id)).map(c => c.subject));
             const testMakerIds = allModules.assessment_tools.filter(t => t.href?.includes('test-generator') && subjectSet.has(t.subject)).map(t => t.id);
             priceIds.push(...testMakerIds);
        }
        if(hasLabGenerator) {
            priceIds.push(...allModules.assessment_tools.filter(t => t.href?.includes('lab-generator')).map(t=>t.id));
        }
        // Always include premium tools like the audit tool with any subscription
        if (coursesCount > 0 || hasTestMaker || hasLabGenerator) {
            priceIds.push(...allModules.premium_tools.map(t => t.id));
        }


        return {
            totalPrice,
            selectedItems: [
                ...allModules.courses.filter(c => selectedCourses.includes(c.id)).map(m => m.name),
                ...(hasTestMaker ? ['Test Maker Suite'] : []),
                ...(hasLabGenerator ? ['Science Lab Generator Suite'] : []),
            ],
            priceIds: [...new Set(priceIds)] // Ensure unique price IDs
        };
    };

    const { totalPrice, selectedItems, priceIds } = getPriceDetails();

    const handleSubscribe = async () => {
        if (priceIds.length === 0) {
            toast({ title: "No Selection", description: "Please select at least one module to subscribe.", variant: "destructive" });
            return;
        }

        setIsLoading(true);
        toast({ title: 'Redirecting to checkout...', description: 'Please wait while we prepare your secure checkout page.' });
        
        const { url, error } = await createCheckoutSession(priceIds);

        if (error || !url) {
            toast({ title: 'Error', description: error || "Could not create checkout session.", variant: 'destructive' });
            setIsLoading(false);
            return;
        }

        router.push(url);
    };

    const renderStep = () => {
        switch (step) {
            case 'courses':
                return (
                    <motion.div key="courses" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}>
                        <h2 className="text-2xl font-bold font-headline mb-2 text-center">Let's build your toolkit.</h2>
                        <p className="text-muted-foreground text-center mb-8">Start by selecting the courses you teach. The first is $15.99, and each additional course is just $9.99.</p>
                        <div className="space-y-8">
                            {subjectsWithCourses.map(subject => (
                                <div key={subject.name}>
                                    <h3 className="text-xl font-semibold mb-4 flex items-center gap-3"><subject.icon className="h-6 w-6 text-primary" /> {subject.name}</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {subject.courses.map(course => (
                                            <CourseSelectionCard key={course.id} item={course} isSelected={selectedCourses.includes(course.id)} onSelect={handleSelectCourse} />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                );
            case 'addons':
                return (
                    <motion.div key="addons" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}>
                        <h2 className="text-2xl font-bold font-headline mb-2 text-center">Supercharge your subjects with our tool suites.</h2>
                        <p className="text-muted-foreground text-center mb-8">These powerful add-ons work across all the subjects you've selected and are only $9.99 each when bundled with a course.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {addonTools.map(tool => (
                                <Card key={tool.id} className={cn("flex flex-col cursor-pointer transition-all", selectedAddons.includes(tool.id) && "border-primary ring-2 ring-primary")} onClick={() => handleSelectAddon(tool.id)}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                                                    <tool.icon className="h-6 w-6" />
                                                </div>
                                                <CardTitle className="text-lg">{tool.name}</CardTitle>
                                            </div>
                                             <div className={cn("h-6 w-6 rounded-full border flex items-center justify-center", selectedAddons.includes(tool.id) ? "bg-primary border-primary" : "bg-muted")}>
                                                {selectedAddons.includes(tool.id) && <CheckCircle className="h-4 w-4 text-primary-foreground" />}
                                            </div>
                                        </div>
                                    </CardHeader>
                                    <CardContent className="flex-grow">
                                        <p className="text-sm text-muted-foreground">{tool.description}</p>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </motion.div>
                );
            case 'summary':
                return (
                     <motion.div key="summary" initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }}>
                        <h2 className="text-2xl font-bold font-headline mb-2 text-center">Your Custom Toolkit Summary</h2>
                        <p className="text-muted-foreground text-center mb-8">Here's what you've selected. Ready to supercharge your teaching?</p>
                        <Card>
                            <CardContent className="p-6">
                                {selectedItems.length > 0 ? (
                                    <ul className="space-y-2">
                                        {selectedItems.map(item => (
                                            <li key={item} className="flex items-center gap-2">
                                                <CheckCircle className="h-5 w-5 text-green-500" />
                                                <span className="font-medium">{item}</span>
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <p className="text-muted-foreground text-center">No items selected. Go back to add modules to your toolkit.</p>
                                )}
                            </CardContent>
                        </Card>
                    </motion.div>
                );
        }
    };

    const handleNext = () => {
        if (step === 'courses') setStep('addons');
        if (step === 'addons') setStep('summary');
    };

    const handleBack = () => {
        if (step === 'summary') setStep('addons');
        if (step === 'addons') setStep('courses');
    };

    return (
        <div className="container mx-auto py-12 max-w-5xl">
            <header className="text-center mb-12">
                 <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sparkles className="h-8 w-8" />
                </div>
                <h1 className="text-4xl font-bold font-headline">Build Your Perfect Toolkit</h1>
            </header>

            <AnimatePresence mode="wait">
                {renderStep()}
            </AnimatePresence>

            <footer className="mt-12 flex items-center justify-between">
                <div>
                    {step !== 'courses' && (
                        <Button variant="ghost" onClick={handleBack}>
                            <ArrowLeft className="mr-2 h-4 w-4" /> Back
                        </Button>
                    )}
                </div>
                 <div className="flex items-center gap-4">
                     <p className="text-2xl font-bold">
                        Total: ${totalPrice.toFixed(2)}
                        <span className="text-sm font-normal text-muted-foreground ml-1">/ month</span>
                    </p>
                    {step === 'summary' ? (
                         <Button size="lg" onClick={handleSubscribe} disabled={isLoading || selectedItems.length === 0}>
                            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShoppingCart className="mr-2 h-4 w-4" />}
                            {isLoading ? "Redirecting..." : "Proceed to Checkout"}
                        </Button>
                    ) : (
                        <Button size="lg" onClick={handleNext} disabled={step === 'courses' && selectedCourses.length === 0}>
                            Next <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    )}
                </div>
            </footer>
        </div>
    );
}

