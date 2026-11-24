import { z } from 'zod';

export const createAppointmentSchema = z.object({
  customerId: z.string().min(1, 'Customer is required'),
  staffId: z.string().min(1, 'Staff member is required'),
  serviceIds: z.array(z.string()).min(1, 'At least one service is required'),
  startTime: z.string().datetime({ message: 'Valid ISO startTime is required' }),
  source: z.enum(['WALK_IN', 'PHONE', 'APP']).default('WALK_IN'),
  notes: z.string().optional(),
});

export const updateAppointmentStatusSchema = z.object({
  status: z.enum([
    'BOOKED',
    'CHECKED_IN',
    'IN_PROGRESS',
    'COMPLETED',
    'NO_SHOW',
    'CANCELLED',
  ]),
});

export type CreateAppointmentInput = z.infer<typeof createAppointmentSchema>;
export type UpdateAppointmentStatusInput = z.infer<typeof updateAppointmentStatusSchema>;
