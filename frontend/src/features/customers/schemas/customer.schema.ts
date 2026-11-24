import { z } from 'zod';

export const customerSchema = z.object({
  name: z.string().min(2, 'Customer name is required'),
  phone: z.string().min(10, 'Valid phone number is required'),
  gender: z.enum(['MALE', 'FEMALE', 'OTHER']).optional(),
  notes: z.string().optional(),
  allergies: z.array(z.string()).default([]),
});

export type CustomerInput = z.infer<typeof customerSchema>;
