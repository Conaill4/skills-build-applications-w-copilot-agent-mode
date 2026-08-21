import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
    points: { type: Number, required: true, min: 0 },
    rank: { type: Number, required: true, min: 1 },
    weeklyActiveMinutes: { type: Number, required: true, min: 0 },
  },
  { timestamps: true },
);

export const Leaderboard = model('Leaderboard', leaderboardSchema);