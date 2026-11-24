import mongoose, { Schema, Document } from 'mongoose';

export type AppointmentStatus =
  | 'BOOKED'
  | 'CHECKED_IN'
  | 'IN_PROGRESS'
  | 'COMPLETED'
  | 'NO_SHOW'
  | 'CANCELLED';

export interface IServiceSnapshot {
  serviceId: mongoose.Types.ObjectId;
  name: string;
  durationMins: number;
  price: number;
}

export interface IAppointment extends Document {
  salonId: mongoose.Types.ObjectId;
  customerId: mongoose.Types.ObjectId;
  staffId: mongoose.Types.ObjectId;
  servicesSnapshot: IServiceSnapshot[];
  startTime: Date;
  endTime: Date;
  status: AppointmentStatus;
  source: 'WALK_IN' | 'PHONE' | 'APP';
  createdBy: mongoose.Types.ObjectId;
  idempotencyKey?: string;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

const AppointmentSchema = new Schema<IAppointment>(
  {
    salonId: { type: Schema.Types.ObjectId, ref: 'Salon', required: true, index: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
    staffId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    servicesSnapshot: [
      {
        serviceId: { type: Schema.Types.ObjectId, ref: 'Service', required: true },
        name: { type: String, required: true },
        durationMins: { type: Number, required: true },
        price: { type: Number, required: true },
      },
    ],
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
    status: {
      type: String,
      enum: ['BOOKED', 'CHECKED_IN', 'IN_PROGRESS', 'COMPLETED', 'NO_SHOW', 'CANCELLED'],
      default: 'BOOKED',
    },
    source: { type: String, enum: ['WALK_IN', 'PHONE', 'APP'], default: 'WALK_IN' },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    idempotencyKey: { type: String },
    notes: { type: String },
  },
  { timestamps: true }
);

// High-priority compound indexes from Technical Specification Section 5.2
AppointmentSchema.index({ salonId: 1, staffId: 1, startTime: 1, status: 1 });
AppointmentSchema.index({ salonId: 1, idempotencyKey: 1 }, { unique: true, sparse: true });

export const Appointment = mongoose.model<IAppointment>('Appointment', AppointmentSchema);
