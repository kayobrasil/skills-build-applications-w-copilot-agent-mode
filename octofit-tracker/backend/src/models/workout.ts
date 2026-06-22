import { Schema, model } from 'mongoose';

const workoutSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
  durationMinutes: { type: Number, required: true },
  focusAreas: [{ type: String }],
  createdAt: { type: Date, default: Date.now }
});

const Workout = model('Workout', workoutSchema);
export default Workout;
