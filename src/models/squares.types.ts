import { Document, Model, Schema } from 'mongoose';
export interface Square {
	hilbert: number;
	advertisements: Schema.Types.ObjectId[];
}
export interface SquareDocument extends Square, Document {}
export interface SquareModel extends Model<SquareDocument> {}
