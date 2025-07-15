
'use server';
/**
 * @fileOverview A flow to handle contact form submissions.
 * This is a placeholder and does not send a real email.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const commonSchema = {
  name: z.string().describe('Full name of the person submitting the form.'),
  email: z.string().email().describe('Email address of the person.'),
  message: z.string().describe('The message content from the form.'),
};

const schoolLicenseSchema = z.object({
  ...commonSchema,
  formType: z.literal('schoolLicense'),
  school: z.string().describe('The name of the school or district.'),
  role: z.string().describe('The role of the person at the school/district.'),
});

const courseRequestSchema = z.object({
  ...commonSchema,
  formType: z.literal('courseRequest'),
  courseSubject: z.string().describe('The subject of the requested course.'),
  gradeLevels: z.string().describe('The target grade levels for the course.'),
});

export const SendContactEmailInputSchema = z.union([schoolLicenseSchema, courseRequestSchema]);
export type SendContactEmailInput = z.infer<typeof SendContactEmailInputSchema>;

export const SendContactEmailOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type SendContactEmailOutput = z.infer<typeof SendContactEmailOutputSchema>;

// This is a placeholder flow. In a real application, you would use a service
// like Nodemailer or an email API (SendGrid, Mailgun, etc.) to send an email.
const sendContactEmailFlow = ai.defineFlow(
  {
    name: 'sendContactEmailFlow',
    inputSchema: SendContactEmailInputSchema,
    outputSchema: SendContactEmailOutputSchema,
  },
  async (input) => {
    console.log('Received form submission:');
    console.log(JSON.stringify(input, null, 2));

    // Simulate sending an email.
    // In a real app, you would have your email sending logic here.
    // For example: await sendEmailWithNodemailer(input);

    return {
      success: true,
      message: 'Your submission has been received. Thank you!',
    };
  }
);


export async function sendContactEmail(input: SendContactEmailInput): Promise<SendContactEmailOutput> {
    return sendContactEmailFlow(input);
}
