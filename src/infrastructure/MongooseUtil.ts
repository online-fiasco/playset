import * as mongoose from 'mongoose';

export const connectDB = async () => {
  if (mongoose.connection.readyState === 1) return;

  const mongoURI = process.env.MONGO_URI as string;
  await mongoose.connect(mongoURI, { useNewUrlParser: true });
};
