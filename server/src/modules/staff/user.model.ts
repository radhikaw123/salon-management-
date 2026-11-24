import mongoose, { Schema, Document } from 'mongoose';

export type UserRole = 'OWNER' | 'RECEPTION' | 'STAFF';

export interface IUser extends Document {
  salonId: mongoose.Types.ObjectId;
  role: UserRole;
  name: string;
  phone: string;
  passwordHash?: string;
  isActive: boolean;
  shiftSchedule: Array<{
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    isWorkingDay: boolean;
    breakStart?: string;
    breakEnd?: string;
  }>;
  commission: {
    servicePct: number;
    retailPct: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    salonId: { type: Schema.Types.ObjectId, ref: 'Salon', required: true, index: true },
    role: { type: String, enum: ['OWNER', 'RECEPTION', 'STAFF'], required: true },
    name: { type: String, required: true },
    phone: { type: String, required: true },
    passwordHash: { type: String },
    isActive: { type: Boolean, default: true },
    shiftSchedule: [
      {
        dayOfWeek: { type: Number, required: true },
        startTime: { type: String, default: '09:00' },
        endTime: { type: String, default: '19:00' },
        isWorkingDay: { type: Boolean, default: true },
        breakStart: { type: String },
        breakEnd: { type: String },
      },
    ],
    commission: {
      servicePct: { type: Number, default: 0 },
      retailPct: { type: Number, default: 0 },
    },
  },
  { timestamps: true }
);

// Compound index for unique phone per salon
UserSchema.index({ salonId: 1, phone: 1 }, { unique: true });

export const User = mongoose.model<IUser>('User', UserSchema);
