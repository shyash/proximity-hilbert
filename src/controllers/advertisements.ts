import { Advertisement } from '../models/advertisements.model';
import { Vector } from './Vector';
import { Hilbert } from './Hilbert';
import { create } from './squares';
import { Square } from '../models/squares.model';
import { SquareDocument } from '../models/squares.types';

export const getAll = async (req: any, res: any) => {
	try {
		const advertisements = await Advertisement.find();
		return res.status(200).json({
			success: true,
			count: advertisements.length,
			data: advertisements,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: 'Server Error' });
	}
};

export const get = async (req: any, res: any) => {
	try {
		const ad = await Advertisement.findById(req.params.id)
			.populate('bucket')
			.exec();
		return res.status(200).json({
			success: true,
			data: ad,
		});
	} catch (err) {
		res.status(500).json({ error: 'Server Error' });
	}
};

export const add = async (req: any, res: any) => {
	try {
		const lattitude: number = req.body.lattitude;
		const longitude: number = req.body.longitude;
		const content: string = req.body.content;
		const east: number = 77.3981;
		const west: number = 76.8281;
		const north: number = 28.91;
		const south: number = 28.34;
		const longRange = north - south;
		const latRange = east - west;
		const x = longitude - west;
		const y = north - lattitude;
		const order = 10;
		const points = Math.pow(2, order);
		const hilbert = new Hilbert(order);
		const cx = Math.round((x / longRange) * (points - 1));
		const cy = Math.round((y / latRange) * (points - 1));
		const vec: Vector = new Vector(cx, cy);

		if (!isInRange(x, y, longRange, latRange))
			throw new Error('Location out of range');

		const square: number = hilbert.transform(vec);

		let fetchedSquare: SquareDocument | null = await Square.findOne({
			hilbert: square,
		});

		if (!fetchedSquare) {
			const resp = await create(square);
			if (!resp.success) throw resp.error;
			fetchedSquare = resp.data;
		}
		const ad = await Advertisement.create({
			lattitude,
			longitude,
			content,
			bucket: fetchedSquare?._id,
		});

		fetchedSquare?.advertisements.push(ad._id);
		await fetchedSquare?.save();
		return res.status(200).json({
			success: true,
			data: ad,
		});
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
};

export const isInRange = (
	x: number,
	y: number,
	longRange: number,
	latRange: number,
): boolean => {
	if (x > longRange || x < 0) return false;
	if (y > latRange || y < 0) return false;
	return true;
};
