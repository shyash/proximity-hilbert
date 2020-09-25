import { Square } from '../models/squares.model';
import { SquareDocument } from '../models/squares.types';
import { Hilbert } from './Hilbert';
import { Vector } from './Vector';
import { isInRange } from './advertisements';

export const getAll = async (req: any, res: any) => {
	try {
		const squares = await Square.find();
		return res.status(200).json({
			success: true,
			count: squares.length,
			data: squares,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: 'Server Error' });
	}
};

export const get = async (req: any, res: any) => {
	try {
		const square = await Square.findById(req.params.id)
			.populate('advertisements')
			.exec();
		return res.status(200).json({
			success: true,
			data: square,
		});
	} catch (err) {
		console.log(err);
		res.status(500).json({ error: 'Server Error' });
	}
};

export const present = async (num: number): Promise<boolean> => {
	const square = await Square.find({ hilbert: num }).countDocuments();
	return square > 0;
};

interface created {
	success: boolean;
	data: SquareDocument | null;
	error?: any;
}

export const create = async (num: number): Promise<created> => {
	try {
		const fetchedSquare = await Square.findOne({ hilbert: num });
		if (fetchedSquare)
			return {
				success: true,
				data: fetchedSquare,
			};

		const newSquare = await Square.create({ hilbert: num, advertisements: [] });
		return {
			success: true,
			data: newSquare,
		};
	} catch (error) {
		return {
			success: false,
			data: null,
			error,
		};
	}
};

export const locate = async (req: any, res: any) => {
	try {
		const order = 10;
		const points = Math.pow(2, order);
		const hilbert = new Hilbert(order);
		const x = req.params.longitude - 76.8281;
		const y = 28.91 - req.params.lattitude;
		if (!isInRange(x, y, 0.57, 0.57)) throw new Error('Location out of range');
		const cx = Math.round((x / 0.57) * (points - 1));
		const cy = Math.round((y / 0.57) * (points - 1));
		const transformed = hilbert.transform(new Vector(cx, cy));
		const square = await Square.findOne({ hilbert: transformed })
			.populate('advertisements')
			.exec();
		return res.status(200).json({
			success: true,
			data: square,
		});
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
};

export const locateRange = async (req: any, res: any) => {
	try {
		const order: number = 10;
		const points = Math.pow(2, order);
		const hilbert = new Hilbert(order);
		const lattitude = req.params.lattitude;
		const longitude = req.params.longitude;

		const x: number = longitude - 76.8281;
		const y: number = 28.91 - lattitude;
		const range: number = +req.params.range;
		if (isNaN(x) || isNaN(y))
			throw new Error('lattitude and longitude must be numbers');
		if (isNaN(range)) throw new Error('range must be an integer');
		if (!isInRange(x, y, 0.57, 0.57)) throw new Error('Location out of range');
		const cx = Math.round((x / 0.57) * (points - 1));
		const cy = Math.round((y / 0.57) * (points - 1));
		const transformed: number = hilbert.transform(new Vector(cx, cy));
		const squares = await Square.find({
			hilbert: {
				$gte: transformed - range / 2,
				$lte: transformed + range / 2,
			},
		})
			.populate('advertisements')
			.exec();
		return res.status(200).json({
			success: true,
			data: squares,
		});
	} catch (err) {
		res.status(500).json({ success: false, error: err.message });
	}
};
