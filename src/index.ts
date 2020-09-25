import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import { connectDB } from './config/db';
import routes from './routes';
const app: Application = express();
const PORT: number = 8800;
const IP: string = process.env.IP || '0.0.0.0';
connectDB();
app.use(cors());
app.use(express.json());
app.use(routes);
app.listen(PORT, IP, () => {
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
