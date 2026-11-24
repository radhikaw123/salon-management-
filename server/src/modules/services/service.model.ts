import mongoose, { Schema, Document } from 'mongoose';

export interface IService extends Document {
  salonId: mongoose.Types.ObjectId;
  category: string;
  name: string;
  durationMins: number;
  bufferMins: number;
  price: number;
  assignedStaffIds: mongoose.Types.ObjectId[];
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ServiceSchema = new Schema<IService>(
  {
    salonId: { type: Schema.Types.ObjectId, ref: 'Salon', required: true, index: true },
    category: { type: String, required: true },
    name: { type: String, required: true },
    durationMins: { type: Number, required: true },
    bufferMins: { type: Number, default: 5 },
    price: { type: Number, required: true },
    assignedStaffIds: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Service = mongoose.model<IService>('Service', ServiceSchema);
