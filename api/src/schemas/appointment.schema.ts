import z from 'zod';

const appointmentSchema = z.object({
  userId: z.number().int().positive('UserId is required'),
  client: z.object({
    name: z.string().nonempty('Name is required'),
    phone: z.string().nonempty('Phone is required'),
    email: z.string().email('Invalid email').optional(),
    address: z.string().optional(),
  }),
  pet: z.object({
    name: z.string().nonempty('Name is required'),
    specie: z.number().int().positive('Specie Id must be a positive integer'),
    breed: z.string().nonempty('Breed is required'),
    age: z.number().int().positive('Age must be a positive integer'),
    gender: z.number().int().positive('Gender must be a positive integer'),
    weight: z.number().int().positive('Weight must be a positive integer'),
  }),

  appointment: z.object({
    date: z.string().nonempty('Date is required'),
    hour: z.string().nonempty('Hour is required'),
    type: z.number().int().positive('Type must be a positive integer'),
    comments: z.string().nonempty('Comments is required'),
  }),
});

export function validateAppointment(data: any) {
  return appointmentSchema.safeParse(data);
}
