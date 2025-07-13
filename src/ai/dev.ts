import { config } from 'dotenv';
config();

import '@/ai/flows/generate-lesson-plan.ts';
import '@/ai/flows/generate-test.ts';
import '@/ai/flows/generate-lab.ts';
import '@/ai/flows/refine-learning-objective.ts';
import '@/ai/flows/explain-concept.ts';
import '@/ai/flows/vocab-deep-dive.ts';