
'use server';
/**
 * @fileOverview An AI flow for generating a diagram image from a text description.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const GenerateDiagramImageInputSchema = z.object({
  description: z.string().describe('A detailed text description of the diagram to be generated.'),
});

const GenerateDiagramImageOutputSchema = z.object({
  imageUrl: z.string().describe('The data URI of the generated image.'),
});

export async function generateDiagramImage(
  input: z.infer<typeof GenerateDiagramImageInputSchema>
): Promise<z.infer<typeof GenerateDiagramImageOutputSchema>> {
  return generateDiagramImageFlow(input);
}

const generateDiagramImageFlow = ai.defineFlow(
  {
    name: 'generateDiagramImageFlow',
    inputSchema: GenerateDiagramImageInputSchema,
    outputSchema: GenerateDiagramImageOutputSchema,
  },
  async (input) => {
    const { media } = await ai.generate({
      model: 'googleai/gemini-2.0-flash-preview-image-generation',
      prompt: `Generate a clear, simple, and scientifically accurate diagram for educational use based on the following description. The diagram should have clear labels and be easy to understand. All text in the diagram must be exactly as provided in the description.

Description:
---
${input.description}
---
`,
      config: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    });

    if (!media || !media.url) {
      throw new Error('Image generation failed.');
    }

    return {
      imageUrl: media.url,
    };
  }
);
