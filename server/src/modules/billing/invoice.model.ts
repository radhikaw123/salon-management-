import mongoose, { Schema, Document } from 'mongoose';

export interface IInvoice extends Document {
  salonId: mongoose.Types.ObjectId;
  invoiceNumber: string;
  appointmentId?: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  lineItems: Array<{
    type: 'SERVICE' | 'RETAIL';
    itemId: mongoose.Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    staffId?: mongoose.Types.ObjectId;
  }>;
  subtotal: number;
  discountAmount: number;
  taxAmount: number;
  grandTotal: number;
  payments: Array<{
    method: 'CASH' | 'UPI' | 'CARD';
    amount: number;
    transactionRef?: string;
  }>;
  status: 'PAID' | 'VOID';
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

const InvoiceSchema = new Schema<IInvoice>(
  {
    salonId: { type: Schema.Types.ObjectId, ref: 'Salon', required: true, index: true },
    invoiceNumber: { type: String, required: true },
    appointmentId: { type: Schema.Types.ObjectId, ref: 'Appointment' },
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    lineItems: [
      {
        type: { type: String, enum: ['SERVICE', 'RETAIL'], required: true },
        itemId: { type: Schema.Types.ObjectId, required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, default: 1 },
        staffId: { type: Schema.Types.ObjectId, ref: 'User' },
      },
    ],
    subtotal: { type: Number, required: true },
    discountAmount: { type: Number, default: 0 },
    taxAmount: { type: Number, required: true },
    grandTotal: { type: Number, required: true },
    payments: [
      {
        method: { type: String, enum: ['CASH', 'UPI', 'CARD'], required: true },
        amount: { type: Number, required: true },
        transactionRef: { type: String },
      },
    ],
    status: { type: String, enum: ['PAID', 'VOID'], default: 'PAID' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

// Revenue Analytics compound index from Technical Specification Section 5.2
InvoiceSchema.index({ salonId: 1, status: 1, createdAt: -1 });

export const Invoice = mongoose.model<IInvoice>('Invoice', InvoiceSchema);
