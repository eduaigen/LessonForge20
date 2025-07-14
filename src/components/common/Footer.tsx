
'use client';

import { Logo } from '@/components/common/Logo';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-border/40 mt-auto bg-background">
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="flex flex-col space-y-4">
                <Logo />
                <p className="text-sm text-muted-foreground">
                    Empowering educators with AI to create exceptional learning experiences.
                </p>
                 <p className="text-sm text-muted-foreground">
                    © {new Date().getFullYear()} Eduaigen. All Rights Reserved.
                 </p>
            </div>
            <div>
                <h3 className="font-semibold text-foreground mb-4">Company</h3>
                <ul className="space-y-2">
                    <li><Link href="/#features" className="text-sm text-muted-foreground hover:text-primary">Features</Link></li>
                    <li><Link href="/curriculum" className="text-sm text-muted-foreground hover:text-primary">Curriculum</Link></li>
                    <li><Link href="/pricing" className="text-sm text-muted-foreground hover:text-primary">Pricing</Link></li>
                </ul>
            </div>
             <div>
                <h3 className="font-semibold text-foreground mb-4">Support</h3>
                <ul className="space-y-2">
                    <li><Link href="/request-course" className="text-sm text-muted-foreground hover:text-primary">Request a Course</Link></li>
                    <li><Link href="/school-license" className="text-sm text-muted-foreground hover:text-primary">School & District Licenses</Link></li>
                    <li><a href="mailto:admin@eduaigen.org" className="text-sm text-muted-foreground hover:text-primary">Contact Us</a></li>
                </ul>
            </div>
            <div>
                 <h3 className="font-semibold text-foreground mb-4">Legal</h3>
                <ul className="space-y-2">
                    <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
                    <li><Link href="#" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
                </ul>
            </div>
        </div>
      </div>
    </footer>
  );
}
