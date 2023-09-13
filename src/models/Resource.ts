// src/models/Resource.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface ResourceDocument extends Document {
  name: string;
  description: string;
  category: string;
  price: number;
  quantity: number;
}

const resourceSchema: Schema<ResourceDocument> = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export default mongoose.model<ResourceDocument>('Resource', resourceSchema);
