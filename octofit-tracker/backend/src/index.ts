import express from 'express';
import mongoose from 'mongoose';

const app = express();
const PORT = 8000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_traker';

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, async () => {
  console.log(`Backend listening on http://localhost:${PORT}`);

  try {
    await mongoose.connect(MONGO_URI, { dbName: 'octofit-tracker' });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
});
