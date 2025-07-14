import {z} from 'genkit';

export const SendContactEmailInputSchema = z.object({
  formType: z.enum(['courseRequest', 'schoolLicense']).describe('The type of form being submitted.'),
  name: z.string().describe('The full name of the person submitting the form.'),
  email: z.string().email().describe('The email address of the person submitting the form.'),
  message: z.string().describe('The main message or content from the form submission.'),
  school: z.string().optional().describe('The name of the school or district (for school license requests).'),
  role: z.string().optional().describe('The role of the person at the school (for school license requests).'),
  courseSubject: z.string().optional().describe('The subject of the requested course.'),
  gradeLevels: z.string().optional().describe('The grade levels for the requested course.'),
});
export type SendContactEmailInput = z.infer<typeof SendContactEmailInputSchema>;

export const SendContactEmailOutputSchema = z.object({
  success: z.boolean(),
  message: z.string(),
});
export type SendContactEmailOutput = z.infer<typeof SendContactEmailOutputSchema>;

export const EmailSchema = z.object({
    to: z.array(z.string().email()),
    from: z.string().email(),
    subject: z.string(),
    body: z.string(),
});
export type Email = z.infer<typeof EmailSchema>;
