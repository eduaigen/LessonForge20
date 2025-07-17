
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Logo } from '@/components/common/Logo';
import { useAuth } from '@/context/AuthContext';
import { useState } from 'react';
import { MailCheck } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SignupPage() {
  const { signup, verifyUser } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    signup({ email, name: firstName });
    setIsSubmitted(true);
  };

  const handleVerification = () => {
    verifyUser(email);
    toast({
        title: "Email Verified!",
        description: "You can now log in to your account.",
    });
    router.push('/login');
  }

  if (isSubmitted) {
    return (
        <div className="flex flex-1 items-center justify-center bg-background p-4">
            <Card className="mx-auto w-full max-w-sm text-center">
                <CardHeader>
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                        <MailCheck className="h-8 w-8" />
                    </div>
                    <CardTitle className="text-2xl">Verify Your Email</CardTitle>
                    <CardDescription>
                       We&apos;ve sent a verification link to <strong>{email}</strong>. Please check your inbox and click the link to activate your account.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-xs text-muted-foreground mb-4">(For this prototype, click the button below to simulate verifying your email.)</p>
                    <Button onClick={handleVerification} className="w-full">
                        Simulate Email Verification
                    </Button>
                </CardContent>
            </Card>
        </div>
    )
  }

  return (
    <div className="flex flex-1 items-center justify-center bg-background p-4">
      <Card className="mx-auto w-full max-w-sm">
        <CardHeader>
          <div className="mb-4 flex justify-center">
            <Logo />
          </div>
          <CardTitle className="text-center text-2xl">Sign Up</CardTitle>
          <CardDescription className="text-center">
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="first-name">First name</Label>
                <Input
                  id="first-name"
                  placeholder="Max"
                  required
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input id="last-name" placeholder="Robinson" required />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
          </form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
