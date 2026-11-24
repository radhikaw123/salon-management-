import { z } from 'zod';

export const shiftScheduleSchema = z.object({
  dayOfWeek: z.number().int().min(0).max(6),
  startTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Format must be HH:mm'),
  endTime: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/, 'Format must be HH:mm'),
  isWorkingDay: z.boolean(),
  breakStart: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional(),
  breakEnd: z.string().regex(/^([01]\d|2[0-3]):[0-5]\d$/).optional(),
});

export const staffMemberSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().min(10, 'Valid phone number required'),
  role: z.enum(['RECEPTION', 'STAFF']),
  shiftSchedule: z.array(shiftScheduleSchema).default([]),
  commission: z.object({
    servicePct: z.number().min(0).max(100).default(0),
    retailPct: z.number().min(0).max(100).default(0),
  }),
});

export type StaffMemberInput = z.infer<typeof staffMemberSchema>;
