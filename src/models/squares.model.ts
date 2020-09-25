import { model } from 'mongoose';
import { SquareDocument } from './squares.types';
import { SquareSchema } from './squares.schema';
export const Square = model<SquareDocument>('Square', SquareSchema);
