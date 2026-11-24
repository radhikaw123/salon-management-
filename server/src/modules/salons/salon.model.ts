import mongoose, { Schema, Document } from 'mongoose';

export interface ISalon extends Document {
  name: string;
  address: string;
  timezone: string;
  currency: string;
  taxConfig: {
    gstRate: number;
    gstin?: string;
  };
  discountPolicy: {
    receptionMaxPct: number;
  };
  businessHours: Array<{
    dayOfWeek: number;
    openTime: string;
    closeTime: string;
    isOpen: boolean;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

const SalonSchema = new Schema<ISalon>(
  {
    name: { type: String, required: true },
    address: { type: String, required: true },
    timezone: { type: String, default: 'Asia/Kolkata' },
    currency: { type: String, default: 'INR' },
    taxConfig: {
      gstRate: { type: Number, default: 18 },
      gstin: { type: String },
    },
    discountPolicy: {
      receptionMaxPct: { type: Number, default: 10 },
    },
    businessHours: [
      {
        dayOfWeek: { type: Number, required: true },
        openTime: { type: String, default: '09:00' },
        closeTime: { type: String, default: '20:00' },
        isOpen: { type: Boolean, default: true },
      },
    ],
  },
  { timestamps: true }
);

export const Salon = mongoose.model<ISalon>('Salon', SalonSchema);
