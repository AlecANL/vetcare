import z from 'zod';

const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters long'),
  rol_id: z.number().int().positive('Role ID must be a positive integer'),
});

export function validateUser(data: any) {
  return userSchema.safeParse(data);
}
