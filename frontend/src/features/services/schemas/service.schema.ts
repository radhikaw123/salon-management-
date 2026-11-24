import { z } from 'zod';

export const serviceItemSchema = z.object({
  category: z.string().min(1, 'Category is required'),
  name: z.string().min(1, 'Service name is required'),
  durationMins: z.number().int().min(5, 'Minimum duration is 5 minutes'),
  bufferMins: z.number().int().min(0).default(5),
  price: z.number().min(0, 'Price must be non-negative'),
  assignedStaffIds: z.array(z.string()).default([]),
  isActive: z.boolean().default(true),
});

export type ServiceItemInput = z.infer<typeof serviceItemSchema>;
