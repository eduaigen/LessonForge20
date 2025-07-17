
import { z } from 'zod';

export const SlideshowOutlineInputSchema = z.object({
    lessonPlanJson: z.string().describe('The complete lesson plan object as a JSON string.'),
});


const slideSchema = z.object({
  title: z.string().describe('The title of the slide.'),
  content: z.array(z.string()).describe('A list of bullet points for the slide content.'),
});

export const SlideshowOutlineOutputSchema = z.object({
  slides: z.array(slideSchema).describe('A list of slides representing the lesson presentation outline.'),
});

export type SlideshowOutlineInput = z.infer<typeof SlideshowOutlineInputSchema>;
export type SlideshowOutlineOutput = z.infer<typeof SlideshowOutlineOutputSchema>;
