import express, { Application } from 'express';
import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' });
const app: Application = express();
const PORT: number = 8800;
const IP: string = process.env.IP || '0.0.0.0';
import { connectDB } from './config/db';
connectDB();
app.get('/', (req, res) => {
	res.send('hurray');
});
app.listen(PORT, IP, () => {
	console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
