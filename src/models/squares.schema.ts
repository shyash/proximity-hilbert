import { Schema } from 'mongoose';
export const SquareSchema = new Schema({
	hilbert: {
		type: Number,
		unique: true,
	},
	advertisements: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Advertisement',
		},
	],
});
