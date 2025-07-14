
'use server';

/**
 * @fileOverview An AI agent that processes contact form submissions and formats them as emails.
 *
 * - sendContactEmail - A function that handles processing form data.
 * - SendContactEmailInput - The input type for the sendContactEmail function.
 * - SendContactEmailOutput - The return type for the sendContactEmail function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';
import { 
    SendContactEmailInputSchema, 
    type SendContactEmailInput, 
    SendContactEmailOutputSchema,
    type SendContactEmailOutput,
    EmailSchema 
} from '@/ai/schemas/contact-form-schemas';


// This is the exported function that the UI will call.
export async function sendContactEmail(input: SendContactEmailInput): Promise<SendContactEmailOutput> {
  console.log('Received contact form submission:', input);
  
  // Here, you would integrate with a real email service provider (e.g., Resend, SendGrid).
  // For this example, we will just log the composed email to the console.
  const composedEmail = await contactFormEmailFlow(input);

  console.log('--- Composed Email ---');
  console.log(`To: ${composedEmail.to.join(', ')}`);
  console.log(`From: ${composedEmail.from}`);
  console.log(`Subject: ${composedEmail.subject}`);
  console.log('Body:');
  console.log(composedEmail.body);
  console.log('----------------------');

  // We'll simulate a successful submission.
  return {
    success: true,
    message: 'Your request has been submitted successfully! We will get back to you shortly.',
  };
}


const prompt = ai.definePrompt({
  name: 'contactFormEmailPrompt',
  input: {schema: SendContactEmailInputSchema},
  output: {schema: EmailSchema},
  prompt: `You are an administrative assistant. Your task is to process a form submission and format it into a professional email.

The email should be sent to admin@eduaigen.org and admin@eduaigen.net.
The from address should be system@eduaigen.org.

Based on the form type, create an appropriate subject and body for the email.

**Form Data:**
- Form Type: {{{formType}}}
- Name: {{{name}}}
- Email: {{{email}}}
{{#if school}}- School/District: {{{school}}}{{/if}}
{{#if role}}- Role: {{{role}}}{{/if}}
{{#if courseSubject}}- Requested Course Subject: {{{courseSubject}}}{{/if}}
{{#if gradeLevels}}- Requested Grade Levels: {{{gradeLevels}}}{{/if}}
- Message:
{{{message}}}

Compose the email now.
`,
});

const contactFormEmailFlow = ai.defineFlow(
  {
    name: 'contactFormEmailFlow',
    inputSchema: SendContactEmailInputSchema,
    outputSchema: EmailSchema,
  },
  async (input) => {
    const {output} = await prompt(input);
    return output!;
  }
);
