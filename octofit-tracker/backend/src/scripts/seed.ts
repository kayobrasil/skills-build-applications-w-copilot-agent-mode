import mongoose from 'mongoose';
import User from '../models/user';
import Team from '../models/team';
import Activity from '../models/activity';
import Workout from '../models/workout';
import Leaderboard from '../models/leaderboard';
import connectDatabase, { MONGO_URI } from '../config/database';

// Seed the octofit_db database with test data
async function seed() {
  console.log('Seed the octofit_db database with test data');
  console.log(`Connecting to MongoDB at ${MONGO_URI}`);

  await connectDatabase();

  await Promise.all([
    User.deleteMany({}),
    Team.deleteMany({}),
    Activity.deleteMany({}),
    Workout.deleteMany({}),
    Leaderboard.deleteMany({})
  ]);

  const teams = await Team.create([
    { name: 'Peak Performers', description: 'A team focused on endurance and strength' },
    { name: 'Sprint Squad', description: 'Fast-paced training for short races' }
  ]);

  const users = await User.create([
    { name: 'Ava Carter', email: 'ava.carter@example.com', role: 'member', teamId: teams[0]._id },
    { name: 'Noah Blake', email: 'noah.blake@example.com', role: 'member', teamId: teams[0]._id },
    { name: 'Mia Rivers', email: 'mia.rivers@example.com', role: 'coach', teamId: teams[1]._id }
  ]);

  teams[0].members = [users[0]._id, users[1]._id];
  teams[1].members = [users[2]._id];
  await Promise.all(teams.map(team => team.save()));

  const workouts = await Workout.create([
    {
      name: 'Morning Energy Boost',
      description: 'A balanced routine for cardio and strength to kickstart the day.',
      difficulty: 'beginner',
      durationMinutes: 30,
      focusAreas: ['cardio', 'strength']
    },
    {
      name: 'Core Crusher',
      description: 'Intense core and mobility flow for intermediate users.',
      difficulty: 'intermediate',
      durationMinutes: 45,
      focusAreas: ['core', 'mobility']
    },
    {
      name: 'Endurance Builder',
      description: 'Advanced session built for distance and stamina.',
      difficulty: 'advanced',
      durationMinutes: 60,
      focusAreas: ['endurance', 'strength']
    }
  ]);

  const activities = await Activity.create([
    {
      userId: users[0]._id,
      type: 'running',
      durationMinutes: 40,
      calories: 420,
      date: new Date(),
      notes: 'Strong tempo run with hills.'
    },
    {
      userId: users[1]._id,
      type: 'cycling',
      durationMinutes: 55,
      calories: 520,
      date: new Date(),
      notes: 'Outdoor road ride focusing on endurance.'
    },
    {
      userId: users[2]._id,
      type: 'strength',
      durationMinutes: 50,
      calories: 480,
      date: new Date(),
      notes: 'Full-body strength session with resistance bands.'
    }
  ]);

  await Leaderboard.create([
    { userId: users[0]._id, teamId: teams[0]._id, points: 1280, rank: 1 },
    { userId: users[1]._id, teamId: teams[0]._id, points: 1165, rank: 2 },
    { userId: users[2]._id, teamId: teams[1]._id, points: 1345, rank: 1 }
  ]);

  console.log('Seed data inserted successfully');
  console.log({ users: users.length, teams: teams.length, workouts: workouts.length, activities: activities.length });

  await mongoose.disconnect();
}

seed().catch(error => {
  console.error('Seed script failed:', error);
  process.exit(1);
});
