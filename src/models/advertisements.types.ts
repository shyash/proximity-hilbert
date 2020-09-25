import { Document, Model, Schema } from 'mongoose';
export interface Advertisement {
	lattitude: number;
	longitude: number;
	content: string;
	bucket: Schema.Types.ObjectId;
}
export interface AdvertisementDocument extends Advertisement, Document {}
export interface AdvertisementModel extends Model<AdvertisementDocument> {}
