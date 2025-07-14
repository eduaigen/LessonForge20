
import { config } from 'dotenv';
config();

import '@/ai/flows/generate-lesson-plan.ts';
import '@/ai/flows/generate-teacher-tool.ts';
import '@/ai/flows/generate-test.ts';
import '@/ai/flows/regenerate-question.ts';
import '@/ai/flows/generate-lab.ts';
import '@/ai/flows/refine-learning-objective.ts';
import '@/ai/flows/explain-concept.ts';
import '@/ai/flows/vocab-deep-dive.ts';
import '@/ai/flows/curriculum-audit.ts';
import '@/ai/flows/send-contact-email.ts';
import '@/ai/schemas/lesson-plan-schemas.ts';
import '@/ai/schemas/contact-form-schemas.ts';
import '@/ai/schemas/teacher-tool-schemas.ts';
