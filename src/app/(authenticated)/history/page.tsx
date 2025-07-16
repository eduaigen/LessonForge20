
'use client';

import { useAuth } from '@/context/AuthContext';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import CollapsibleSection from '@/components/common/CollapsibleSection';
import StyledContentDisplay from '@/components/common/StyledContentDisplay';
import { History, Inbox } from 'lucide-react';

export default function HistoryPage() {
    const { generationHistory } = useAuth();

    return (
        <div className="container mx-auto py-12">
            <Card className="w-full shadow-lg mb-8">
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <History className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="text-2xl font-headline">Generation History</CardTitle>
                            <CardDescription>Review your last 20 generated lesson packages. History is cleared when you log out.</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    {generationHistory.length === 0 ? (
                        <div className="text-center py-16 text-muted-foreground">
                            <Inbox className="h-12 w-12 mx-auto mb-4" />
                            <h3 className="text-xl font-semibold">No History Yet</h3>
                            <p>Your generated content will appear here.</p>
                        </div>
                    ) : (
                        <div className="space-y-8">
                            {generationHistory.map((pkg) => {
                                const lessonPlanItem = pkg.find(item => item.type === 'Lesson Plan');
                                if (!lessonPlanItem) return null;

                                const lessonTitle = lessonPlanItem.content?.lessonOverview?.lesson || 'Untitled Lesson';

                                return (
                                    <Card key={lessonPlanItem.id} className="overflow-hidden">
                                        <CardHeader className="bg-muted/50">
                                            <CardTitle>{lessonTitle}</CardTitle>
                                             <CardDescription>
                                                {lessonPlanItem.content?.lessonOverview?.unit} - {lessonPlanItem.content?.lessonOverview?.topic}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="p-4 space-y-4">
                                            {pkg.map(item => (
                                                <CollapsibleSection
                                                    key={item.id}
                                                    title={item.title}
                                                    contentItem={item}
                                                >
                                                    <StyledContentDisplay
                                                        content={item.content}
                                                        type={item.type}
                                                    />
                                                </CollapsibleSection>
                                            ))}
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </div>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
