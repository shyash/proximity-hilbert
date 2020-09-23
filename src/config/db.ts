import mongoose from 'mongoose';
type connector = () => void;
export const connectDB: connector = async () => {
	try {
		const URI: string =
			process.env.MONGO_URI || 'mongodb://localhost/proximity';
		const conn = await mongoose.connect(URI, {
			useNewUrlParser: true,
			useCreateIndex: true,
			useFindAndModify: false,
			useUnifiedTopology: true,
		});
		console.log(`MongoDB Connected: ${conn.connection.host}`);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};
