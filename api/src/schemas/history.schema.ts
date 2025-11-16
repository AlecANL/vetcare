import z from 'zod';

const historySchema = z.object({
  pet_id: z.number().int().positive('Age must be a positive integer'),
  date: z.string().nonempty('Name is required'),
  diagnosis: z.string().nonempty('Breed is required'),
  treatment: z.string().nonempty('Breed is required'),
  comments: z.string().nonempty('Breed is required'),
});

export function validateHistory(data: any) {
  return historySchema.safeParse(data);
}
