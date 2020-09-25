import { model } from 'mongoose';
import { AdvertisementDocument } from './advertisements.types';
import { AdvertisementSchema } from './advertisements.schema';
export const Advertisement = model<AdvertisementDocument>(
	'Advertisement',
	AdvertisementSchema,
);
