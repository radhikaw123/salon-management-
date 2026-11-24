import mongoose, { Schema, Document } from 'mongoose';

export interface IProduct extends Document {
  salonId: mongoose.Types.ObjectId;
  name: string;
  sku?: string;
  category: string;
  retailPrice: number;
  costPrice: number;
  stockQuantity: number;
  lowStockThreshold: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    salonId: { type: Schema.Types.ObjectId, ref: 'Salon', required: true, index: true },
    name: { type: String, required: true },
    sku: { type: String },
    category: { type: String, required: true },
    retailPrice: { type: Number, required: true },
    costPrice: { type: Number, required: true },
    stockQuantity: { type: Number, default: 0 },
    lowStockThreshold: { type: Number, default: 5 },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export const Product = mongoose.model<IProduct>('Product', ProductSchema);
