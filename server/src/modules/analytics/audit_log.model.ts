import mongoose, { Schema, Document } from 'mongoose';

export interface IAuditLog extends Document {
  salonId: mongoose.Types.ObjectId;
  actorId: mongoose.Types.ObjectId;
  actorRole: 'OWNER' | 'RECEPTION' | 'STAFF';
  action: string;
  targetCollection: string;
  targetId: mongoose.Types.ObjectId;
  diff?: Record<string, unknown>;
  timestamp: Date;
}

const AuditLogSchema = new Schema<IAuditLog>(
  {
    salonId: { type: Schema.Types.ObjectId, ref: 'Salon', required: true, index: true },
    actorId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    actorRole: { type: String, enum: ['OWNER', 'RECEPTION', 'STAFF'], required: true },
    action: { type: String, required: true },
    targetCollection: { type: String, required: true },
    targetId: { type: Schema.Types.ObjectId, required: true },
    diff: { type: Schema.Types.Mixed },
    timestamp: { type: Date, default: Date.now },
  },
  { timestamps: false }
);

AuditLogSchema.index({ salonId: 1, timestamp: -1 });

export const AuditLog = mongoose.model<IAuditLog>('AuditLog', AuditLogSchema);
