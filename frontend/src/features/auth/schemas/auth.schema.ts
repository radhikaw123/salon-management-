import { z } from 'zod';

export const phoneLoginSchema = z.object({
  phone: z
    .string()
    .min(10, 'Phone number must be at least 10 digits')
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format'),
});

export const otpVerifySchema = z.object({
  phone: z.string().min(10),
  otp: z.string().length(6, 'OTP must be exactly 6 digits'),
});

export type PhoneLoginForm = z.infer<typeof phoneLoginSchema>;
export type OtpVerifyForm = z.infer<typeof otpVerifySchema>;
