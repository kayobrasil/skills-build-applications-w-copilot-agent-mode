import express from 'express';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app = express();
const PORT = 8000;
const HOST = process.env.CODESPACE_NAME ? '0.0.0.0' : '127.0.0.1';
const isCodespace = Boolean(process.env.CODESPACE_NAME);
const API_URL = isCodespace
  ? `https://${process.env.CODESPACE_NAME}-8000.githubpreview.dev`
  : `http://localhost:${PORT}`;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db';

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.get('/api/config', (_req, res) => {
  res.json({ apiUrl: API_URL, port: PORT, codespace: process.env.CODESPACE_NAME || null });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.listen(PORT, HOST, async () => {
  console.log(`Backend listening on http://${HOST}:${PORT}`);
  console.log(`API URL: ${API_URL}`);

  try {
    await mongoose.connect(MONGO_URI, { dbName: 'octofit-tracker' });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }
});
