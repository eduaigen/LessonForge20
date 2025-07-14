
'use client';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Lightbulb } from 'lucide-react';

export default function DashboardPage() {
  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <Card className="max-w-2xl text-center">
        <CardHeader>
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Lightbulb className="h-8 w-8" />
          </div>
          <CardTitle>Free AI Tools</CardTitle>
          <CardDescription>
            Our free tools are currently under maintenance. Please check back later!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">We're working hard to bring you new and improved features.</p>
        </CardContent>
      </Card>
    </div>
  );
}
