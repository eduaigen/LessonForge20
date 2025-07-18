
'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ShieldCheck, FileText, Accessibility, HandHeart } from 'lucide-react';

const AboutSection = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
  <Card>
    <CardHeader>
      <CardTitle className="flex items-center gap-4 text-2xl font-headline">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
          {icon}
        </div>
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent className="prose prose-slate max-w-none text-muted-foreground prose-headings:text-primary">
      {children}
    </CardContent>
  </Card>
);

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-4xl py-12">
      <header className="text-center mb-12">
        <h1 className="text-5xl font-bold font-headline gradient-text">About EduAiGen</h1>
        <p className="mt-4 text-xl text-muted-foreground">Our Mission, Policies, and Commitment to Educators</p>
      </header>
      
      <div className="space-y-8">
        <AboutSection title="Our Philosophy: For Educators, By Educators" icon={<Users className="h-6 w-6" />}>
          <p>
            EduAiGen was founded by an educator with over 25 years of classroom experience—a passionate believer in the power of great teaching. We know the challenges of the modern classroom firsthand: the long hours of planning, the need to differentiate for diverse learners, and the constant pressure to create engaging, effective materials. Our goal is to put powerful AI tools into the hands of teachers to automate the tedious parts of the job, freeing you up to do what you do best: inspire students.
          </p>
          <p>
            We are committed to creating tools that are not just technologically advanced, but also pedagogically sound, aligned with standards, and genuinely helpful for the educators we serve.
          </p>
        </AboutSection>
        
        <AboutSection title="Subscription & Cancellation Policy" icon={<FileText className="h-6 w-6" />}>
          <h4>3-Day Free Trial</h4>
          <p>
            We believe you should be able to try our tools before you commit. All of our subscriptions begin with a <strong>3-day free trial</strong>. You will need to provide a credit card to start the trial, but your card will not be charged until the trial period ends. You can cancel at any time during the trial without being charged.
          </p>
          <h4>Billing and Cancellation</h4>
          <p>
            After the trial period, your subscription will automatically renew on a monthly basis. You can manage or cancel your subscription at any time from your "Account" page.
          </p>
          <p>
            When you cancel, your subscription will remain active until the end of your current billing cycle. Please note that we do not offer refunds for partial months. Cancellation simply prevents future charges.
          </p>
        </AboutSection>

        <AboutSection title="Data Privacy & Security" icon={<ShieldCheck className="h-6 w-6" />}>
            <p>
              We take your privacy and the security of your data with the utmost seriousness. Our commitment to you is simple and unwavering:
            </p>
            <ul>
              <li><strong>We will NEVER sell your data.</strong> Your personal information, usage data, and any content you create are yours and yours alone. We do not sell or rent data to third parties, marketers, or anyone else.</li>
              <li><strong>No Third-Party Analytics.</strong> We do not use third-party analytics tools that would compromise or share student or teacher data. Our service improvements are based on aggregated, anonymized usage patterns, not individual tracking.</li>
              <li><strong>Secure Transactions.</strong> All payments are processed through Stripe, a global leader in online payment processing. We do not store your full credit card information on our servers. All Personally Identifiable Information (PII) is handled with strict security protocols.</li>
            </ul>
        </AboutSection>
        
        <AboutSection title="Accessibility & Equity Commitment" icon={<Accessibility className="h-6 w-6" />}>
          <h4>WCAG 2.1 AA & CR-SE Alignment</h4>
           <p>
             Education should be accessible and equitable for everyone. We are committed to making our platform usable by as many people as possible, regardless of technology or ability, and strive to meet WCAG 2.1 Level AA standards. Our Accessibility Widget provides tools to adjust font sizes, contrast, and other display settings to meet your needs.
          </p>
          <p>
            Furthermore, we are dedicated to the principles of Culturally Responsive-Sustaining Education (CR-SE). Our AI prompts are designed to be culturally neutral, and we provide multilingual learner support through our translation features. We are continuously working to improve the accessibility and equity of our site. If you encounter any issues or have suggestions, please contact us.
          </p>
        </AboutSection>

        <AboutSection title="Intellectual Property and Fair Use" icon={<HandHeart className="h-6 w-6" />}>
          <p>
            All content generated by EduAiGen, including lesson plans, worksheets, and assessments, is the intellectual property of EduAiGen. Your subscription grants you a license to use these materials for educational, non-commercial purposes in your classroom.
          </p>
          <p>
            This means you are encouraged to print, copy, and distribute the materials to your students. However, you may not sell, redistribute, or republish the content on other platforms for commercial purposes. We believe in empowering educators, and we trust our community to use these tools to enrich their teaching practice fairly and ethically.
          </p>
        </AboutSection>
      </div>
    </div>
  );
}
