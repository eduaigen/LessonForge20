
'use client';

import { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { createCheckoutSession } from '@/actions/stripe';
import { Loader2, Sparkles, ArrowRight, CheckCircle, ShoppingCart, Lock, CalendarDays } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { allModules, type Module } from '@/lib/modules-data';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

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
             <CardFooter className="mt-auto flex justify-between items-center pt-4">
                <p className="text-xs text-muted-foreground">ID: {item.id}</p>
                <div className={cn("h-6 w-6 rounded-full border flex items-center justify-center", isSelected ? "bg-primary border-primary" : "bg-muted")}>
                    {isSelected && <CheckCircle className="h-4 w-4 text-primary-foreground" />}
                </div>
            </CardFooter>
        </Card>
    );
};


export default function ConversationalCheckoutPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
    const [selectedAddons, setSelectedAddons] = useState<string[]>([]);

    const subjectsWithCourses = Object.values(allModules.coursesBySubject).map(courses => ({
        name: courses[0].subject.charAt(0).toUpperCase() + courses[0].subject.slice(1),
        icon: courses[0].icon,
        courses: courses,
    })).sort((a,b) => a.name.localeCompare(b.name));

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
        ...allModules.premium_tools.map(tool => ({ ...tool, priceId: tool.id })),
        { id: 'price_1PjJrTRpWk9d9d2Fc3d4e5f6', name: 'Test Maker Suite', description: 'Unlock powerful test generators for all your selected subjects. Create Regents-style exams, NGSS-aligned cluster assessments, and scaffolded tests for all learners.', icon: allModules.assessment_tools[0].icon },
        ...(showLabAddon ? [{ id: 'price_1PjJseRpWk9d9d2Fq3r4s5t6', name: 'Science Lab Generator Suite', description: 'Bring science to life! Generate hands-on, 45-minute, NGSS-aligned lab activities for Biology, Chemistry, Physics, and Earth Science. (AP Bio and Health not included).', icon: allModules.assessment_tools.find(t=>t.href?.includes('lab'))!.icon }] : []),
    ];

    const getPriceDetails = () => {
        const coursesCount = selectedCourses.length;
        const selectedSubjects = new Set(allModules.courses.filter(c => selectedCourses.includes(c.id)).map(c => c.subject));
        const showSiteLicensePrompt = selectedSubjects.size >= 3;

        const hasTestMaker = selectedAddons.includes('price_1PjJrTRpWk9d9d2Fc3d4e5f6');
        const hasLabGenerator = selectedAddons.includes('price_1PjJseRpWk9d9d2Fq3r4s5t6');
        const hasPremiumTools = selectedAddons.some(id => allModules.premium_tools.some(t => t.id === id));
        
        let coursePrice = 0;
        if (coursesCount === 1) coursePrice = 14.99;
        if (coursesCount === 2) coursePrice = 14.99 + 9.99;
        if (coursesCount >= 3) coursePrice = 14.99 + 9.99 + (coursesCount - 2) * 5.99;

        const baseItemCount = coursesCount + (hasPremiumTools ? 1 : 0);
        let testMakerPrice = hasTestMaker ? (baseItemCount > 0 ? 9.99 : 14.99) : 0;
        let labGeneratorPrice = hasLabGenerator ? (baseItemCount > 0 ? 9.99 : 14.99) : 0;
        let premiumToolsPrice = hasPremiumTools ? (coursesCount > 0 ? 9.99 : 14.99) : 0;
        
        const totalPrice = coursePrice + testMakerPrice + labGeneratorPrice + (hasPremiumTools && coursesCount === 0 ? premiumToolsPrice : 0);
        
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
        if(hasPremiumTools){
             priceIds.push(...allModules.premium_tools.map(t => t.id));
        }
        
        return {
            totalPrice,
            showSiteLicensePrompt,
            selectedItems: [
                ...allModules.courses.filter(c => selectedCourses.includes(c.id)).map(m => m.name),
                ...(hasPremiumTools ? allModules.premium_tools.map(t => t.name) : []),
                ...(hasTestMaker ? ['Test Maker Suite'] : []),
                ...(hasLabGenerator ? ['Science Lab Generator Suite'] : []),
            ],
            priceIds: [...new Set(priceIds)]
        };
    };

    const { totalPrice, selectedItems, priceIds, showSiteLicensePrompt } = getPriceDetails();
    
    const getUpsellMessage = () => {
        const courseCount = selectedCourses.length;
        if (courseCount === 1) return "Great choice! Add a second course for just $9.99/mo and unlock our powerful tool suites for the same discounted price.";
        if (courseCount === 2) return "Excellent! Add a third course for only $5.99/mo to expand your toolkit even further.";
        if (courseCount >= 3) return `You're building a powerful collection! Each additional course is just $5.99/mo.`;
        return "Each additional course is just $9.99/mo. Supercharge your subjects with our tool suites for the same price.";
    };

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

    return (
        <div className="container mx-auto py-12 max-w-5xl">
            <header className="text-center mb-12">
                 <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                    <Sparkles className="h-8 w-8" />
                </div>
                <h1 className="text-4xl font-bold font-headline">Build Your Perfect Toolkit</h1>
                <p className="text-muted-foreground mt-2">Start by selecting the course lesson generators you teach. Your first is $14.99/mo. All subscriptions include a 3-day free trial.</p>
            </header>

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

            <AnimatePresence>
                {selectedCourses.length > 0 && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="mt-16 pt-12 border-t border-dashed"
                    >
                        <h2 className="text-2xl font-bold font-headline mb-2 text-center">Complete Your Toolkit</h2>
                        <p className="text-muted-foreground text-center mb-8">{getUpsellMessage()}</p>
                        
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
                                    <CardFooter className="mt-auto flex justify-between items-center pt-4">
                                        <p className="text-xs text-muted-foreground">ID: {tool.id}</p>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <AnimatePresence>
            {showSiteLicensePrompt && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-12"
                >
                    <Card className="bg-primary/10 border-primary/20 text-center p-6">
                        <CardHeader>
                            <CardTitle className="font-headline text-2xl">Need Access for Your Department or School?</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground">You've selected courses across three or more subjects! You may qualify for a discounted site license. Contact our team to get a custom quote for your school or district.</p>
                        </CardContent>
                        <CardFooter className="justify-center">
                            <Button onClick={() => router.push('/school-license')}>Request a Site License Quote</Button>
                        </CardFooter>
                    </Card>
                </motion.div>
            )}
            </AnimatePresence>


            <AnimatePresence>
            {selectedItems.length > 0 && (
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-12 sticky bottom-6 z-50"
                >
                    <Card className="shadow-2xl border-primary/20">
                        <CardContent className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                             <div className="flex-1">
                                <h3 className="font-semibold text-lg">Your Custom Toolkit:</h3>
                                <div className="text-sm text-muted-foreground max-w-md">
                                    {selectedItems.length > 0 ? selectedItems.join(', ') : 'Select a course to get started.'}
                                </div>
                            </div>
                            <div className="flex flex-col sm:items-end w-full sm:w-auto">
                                <p className="text-3xl font-bold">
                                    Total: ${totalPrice.toFixed(2)}
                                    <span className="text-sm font-normal text-muted-foreground ml-1">/ mo</span>
                                </p>
                                <p className="text-xs text-green-600 font-semibold flex items-center gap-1 mt-1">
                                    <CalendarDays className="h-3 w-3" /> Includes a 3-day free trial
                                </p>
                                 <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                    <Lock className="h-3 w-3" /> Secure checkout powered by Stripe
                                </p>
                            </div>
                             <Button size="lg" onClick={handleSubscribe} disabled={isLoading || selectedItems.length === 0} className="w-full sm:w-auto">
                                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <ShoppingCart className="mr-2 h-4 w-4" />}
                                {isLoading ? "Redirecting..." : "Start Free Trial"}
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            )}
            </AnimatePresence>

        </div>
    );
}
