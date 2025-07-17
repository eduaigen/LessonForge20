
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

// Import the schema from the new location
import { SendContactEmailInputSchema } from '@/ai/schemas/send-contact-email-schemas';

// We need to extract the specific schema for this form
const formSchema = SendContactEmailInputSchema.pick({
    name: true,
    email: true,
    school: true,
    role: true,
    message: true,
}).refine(data => data.school && data.role, {
    message: "This schema should only be used for school license requests",
    path: ["school"],
});

export default function SchoolLicensePage() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      school: '',
      role: '',
      message: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      const response = await sendContactEmail({
        ...values,
        formType: 'schoolLicense',
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
                  <CardDescription>Your request for information on a school or district license has been received. Our team will review it and get back to you shortly.</CardDescription>
              </CardHeader>
              <CardContent>
                  <Button asChild>
                      <Link href="/">Return to Homepage</Link>
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
          <CardTitle>School & District Licenses</CardTitle>
          <CardDescription>
            Interested in bringing EduAiGen to your entire school or district? Fill out the form below to get in touch with our partnerships team.
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
                            <Input id="name" placeholder="Jane Doe" {...field} />
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
                            <Input id="email" type="email" placeholder="jane.doe@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                 <FormField
                    control={form.control}
                    name="school"
                    render={({ field }) => (
                        <FormItem>
                        <Label htmlFor="school">School or District Name</Label>
                        <FormControl>
                            <Input id="school" placeholder="Springfield Independent School District" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                    />
                <FormField
                    control={form.control}
                    name="role"
                    render={({ field }) => (
                        <FormItem>
                        <Label htmlFor="role">Your Role</Label>
                        <FormControl>
                            <Input id="role" placeholder="Curriculum Director" {...field} />
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
                        <Label htmlFor="message">Message</Label>
                        <FormControl>
                            <Textarea id="message" placeholder="Tell us about your needs, the number of teachers you're looking to support, and any questions you have." {...field} />
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
