
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
