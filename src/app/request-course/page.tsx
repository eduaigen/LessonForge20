
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import Link from 'next/link';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { sendContactEmail } from '@/ai/flows/send-contact-email';
import { Loader2 } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  courseSubject: z.string().min(3, { message: 'Please enter a subject.' }),
  gradeLevels: z.string().min(1, { message: 'Please enter at least one grade level.' }),
  message: z.string().min(10, { message: 'Please provide some details about the course you need.' }),
});

export default function RequestCoursePage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      courseSubject: '',
      gradeLevels: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await sendContactEmail({
        ...values,
        formType: 'courseRequest',
      });
      if (response.success) {
        toast({
          title: 'Request Submitted',
          description: response.message,
        });
        setIsSubmitted(true);
      } else {
        throw new Error(response.message);
      }
    } catch (error) {
      console.error('Submission failed:', error);
      toast({
        title: 'Submission Failed',
        description: 'An error occurred while submitting your request. Please try again later.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="flex flex-1 items-center justify-center p-4">
          <Card className="w-full max-w-lg text-center">
              <CardHeader>
                  <CardTitle>Thank You!</CardTitle>
                  <CardDescription>Your course request has been submitted. We'll review your suggestion and keep it in mind for future curriculum development.</CardDescription>
              </CardHeader>
              <CardContent>
                  <Button asChild>
                      <Link href="/curriculum">Back to Curriculum</Link>
                  </Button>
              </CardContent>
          </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-1 items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Request a New Course</CardTitle>
          <CardDescription>
            Don't see the curriculum you need? Let us know what you're looking for. We prioritize development based on teacher feedback.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                        <Label htmlFor="name">Full Name</Label>
                        <FormControl>
                            <Input id="name" placeholder="John Appleseed" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                        <FormItem>
                        <Label htmlFor="email">Email Address</Label>
                        <FormControl>
                            <Input id="email" type="email" placeholder="john.appleseed@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <FormField
                    control={form.control}
                    name="courseSubject"
                    render={({ field }) => (
                        <FormItem>
                        <Label htmlFor="courseSubject">Course Subject</Label>
                        <FormControl>
                            <Input id="courseSubject" placeholder="e.g., AP Art History" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="gradeLevels"
                    render={({ field }) => (
                        <FormItem>
                        <Label htmlFor="gradeLevels">Grade Levels</Label>
                        <FormControl>
                            <Input id="gradeLevels" placeholder="e.g., 11, 12" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
              </div>
                <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                        <FormItem>
                        <Label htmlFor="message">Details & Standards</Label>
                        <FormControl>
                            <Textarea id="message" placeholder="Please provide any relevant details, such as the specific standards (e.g., state, NGSS, Common Core) or frameworks this course should align with." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {isLoading ? 'Submitting...' : 'Submit Request'}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
