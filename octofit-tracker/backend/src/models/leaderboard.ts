import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' },
  points: { type: Number, required: true, default: 0 },
  rank: { type: Number, required: true },
  lastUpdated: { type: Date, default: Date.now }
});

const Leaderboard = model('Leaderboard', leaderboardSchema);
export default Leaderboard;
