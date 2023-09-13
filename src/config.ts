
import { config } from 'dotenv';
config();

export const MONGODB_URI: string = process.env.MONGODB_URI || '';
export const JWT_SECRET: string = process.env.JWT_SECRET || '';
export const PORT: number = Number(process.env.PORT) || 3000;
export const BASE_API: string = process.env.BASE_API || '';

