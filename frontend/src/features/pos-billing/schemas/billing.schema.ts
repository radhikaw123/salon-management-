import { z } from 'zod';

export const cartLineItemSchema = z.object({
  type: z.enum(['SERVICE', 'RETAIL']),
  itemId: z.string().min(1),
  name: z.string().min(1),
  price: z.number().nonnegative(),
  quantity: z.number().int().positive(),
  staffId: z.string().optional(),
});

export const paymentRecordSchema = z.object({
  method: z.enum(['CASH', 'UPI', 'CARD']),
  amount: z.number().positive(),
  transactionRef: z.string().optional(),
});

export const checkoutInvoiceSchema = z.object({
  customerId: z.string().min(1, 'Customer ID is required'),
  appointmentId: z.string().optional(),
  lineItems: z.array(cartLineItemSchema).min(1, 'At least one item is required'),
  discountPct: z.number().min(0).max(100).default(0),
  payments: z.array(paymentRecordSchema).min(1, 'At least one payment method is required'),
  idempotencyKey: z.string().uuid(),
});

export type CheckoutInvoiceInput = z.infer<typeof checkoutInvoiceSchema>;
