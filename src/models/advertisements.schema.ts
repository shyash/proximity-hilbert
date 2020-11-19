import { Schema } from 'mongoose';
export const AdvertisementSchema = new Schema({
	lattitude: Number,
	longitude: Number,
	content: String,
	imageSrc: String,
	bucket: {
		type: Schema.Types.ObjectId,
		ref: 'Square',
	},
});
