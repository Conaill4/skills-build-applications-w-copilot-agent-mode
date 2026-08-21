import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true, trim: true },
    focusArea: { type: String, required: true, trim: true },
    difficulty: { type: String, enum: ['beginner', 'intermediate', 'advanced'], required: true },
    estimatedMinutes: { type: Number, required: true, min: 1 },
    recommendedForGoal: { type: String, required: true, trim: true },
    exercises: [{ type: String, required: true, trim: true }],
  },
  { timestamps: true },
);

export const Workout = model('Workout', workoutSchema);