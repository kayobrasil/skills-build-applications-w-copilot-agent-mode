import express from 'express';
import usersRouter from './routes/users';
import teamsRouter from './routes/teams';
import activitiesRouter from './routes/activities';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';
import connectDatabase, { MONGO_URI } from './config/database';

const app = express();
const PORT = 8000;
const HOST = process.env.CODESPACE_NAME ? '0.0.0.0' : '127.0.0.1';
const isCodespace = Boolean(process.env.CODESPACE_NAME);
const API_URL = isCodespace
  ? `https://${process.env.CODESPACE_NAME}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

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

export async function startServer() {
  return new Promise<void>((resolve, reject) => {
    const server = app.listen(PORT, HOST, async () => {
      console.log(`Backend listening on http://${HOST}:${PORT}`);
      console.log(`API URL: ${API_URL}`);
      console.log(`MongoDB URI: ${MONGO_URI}`);

      try {
        await connectDatabase();
        console.log('Connected to MongoDB');
        resolve();
      } catch (error) {
        console.error('MongoDB connection failed:', error);
        reject(error);
      }
    });

    server.on('error', reject);
  });
}

export default app;
