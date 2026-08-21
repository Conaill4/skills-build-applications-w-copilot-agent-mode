import mongoose from 'mongoose';

import { Activity } from '../models/Activity.js';
import { Leaderboard } from '../models/Leaderboard.js';
import { Team } from '../models/Team.js';
import { User } from '../models/User.js';
import { Workout } from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      { name: 'Octo Striders', motto: 'Eight arms, one pace.' },
      { name: 'Core Crushers', motto: 'Strong centers, stronger teams.' },
    ]);

    const users = await User.insertMany([
      {
        username: 'mona-fit',
        email: 'mona@example.com',
        displayName: 'Mona Lovelace',
        fitnessGoal: 'Build race endurance',
        team: teams[0]._id,
      },
      {
        username: 'devon-lifts',
        email: 'devon@example.com',
        displayName: 'Devon Kim',
        fitnessGoal: 'Increase strength',
        team: teams[1]._id,
      },
      {
        username: 'riley-runs',
        email: 'riley@example.com',
        displayName: 'Riley Chen',
        fitnessGoal: 'Improve daily consistency',
        team: teams[0]._id,
      },
    ]);

    await Team.updateOne(
      { _id: teams[0]._id },
      { members: [users[0]._id, users[2]._id] },
    );
    await Team.updateOne({ _id: teams[1]._id }, { members: [users[1]._id] });

    await Activity.insertMany([
      {
        user: users[0]._id,
        activityType: 'Trail run',
        durationMinutes: 48,
        caloriesBurned: 430,
        activityDate: new Date('2026-08-18T07:30:00Z'),
      },
      {
        user: users[1]._id,
        activityType: 'Strength training',
        durationMinutes: 55,
        caloriesBurned: 360,
        activityDate: new Date('2026-08-19T18:15:00Z'),
      },
      {
        user: users[2]._id,
        activityType: 'Cycling commute',
        durationMinutes: 35,
        caloriesBurned: 280,
        activityDate: new Date('2026-08-20T08:05:00Z'),
      },
    ]);

    await Leaderboard.insertMany([
      { user: users[0]._id, team: teams[0]._id, points: 1280, rank: 1, weeklyActiveMinutes: 215 },
      { user: users[1]._id, team: teams[1]._id, points: 1125, rank: 2, weeklyActiveMinutes: 180 },
      { user: users[2]._id, team: teams[0]._id, points: 940, rank: 3, weeklyActiveMinutes: 150 },
    ]);

    await Workout.insertMany([
      {
        title: '5K Pace Builder',
        focusArea: 'Cardio endurance',
        difficulty: 'intermediate',
        estimatedMinutes: 42,
        recommendedForGoal: 'Build race endurance',
        exercises: ['Dynamic warmup', 'Tempo intervals', 'Easy cooldown'],
      },
      {
        title: 'Full-Body Strength Circuit',
        focusArea: 'Strength',
        difficulty: 'beginner',
        estimatedMinutes: 35,
        recommendedForGoal: 'Increase strength',
        exercises: ['Goblet squats', 'Push-ups', 'Dumbbell rows', 'Plank holds'],
      },
      {
        title: 'Consistency Reset Flow',
        focusArea: 'Mobility',
        difficulty: 'beginner',
        estimatedMinutes: 22,
        recommendedForGoal: 'Improve daily consistency',
        exercises: ['Hip openers', 'Shoulder mobility', 'Breathing cooldown'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
