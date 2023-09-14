// src/models/User.ts
import mongoose, { Schema, Document } from 'mongoose';

export interface UserDocument extends Document {
  name:string;
  email: string;
  password: string;
}

const userSchema: Schema<UserDocument> = new Schema({
  name:{type: String,required:true},
  email: { type: String, required: true },
  password: { type: String, required: true },
});

export default mongoose.model<UserDocument>('User', userSchema);
