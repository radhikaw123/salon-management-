import mongoose, { Schema, Document } from 'mongoose';

export interface ICustomer extends Document {
  salonId: mongoose.Types.ObjectId;
  name: string;
  phone: string;
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
  notes?: string;
  allergies: string[];
  loyaltyPoints: number;
  lastVisitAt?: Date;
  totalVisits: number;
  createdAt: Date;
  updatedAt: Date;
}

const CustomerSchema = new Schema<ICustomer>(
  {
    salonId: { type: Schema.Types.ObjectId, ref: 'Salon', required: true, index: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, enum: ['MALE', 'FEMALE', 'OTHER'] },
    notes: { type: String },
    allergies: { type: [String], default: [] },
    loyaltyPoints: { type: Number, default: 0 },
    lastVisitAt: { type: Date },
    totalVisits: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Indexes specified in Architecture Doc Section 5.2
CustomerSchema.index({ salonId: 1, phone: 1 }, { unique: true });
CustomerSchema.index({ salonId: 1, name: 'text' });

export const Customer = mongoose.model<ICustomer>('Customer', CustomerSchema);
