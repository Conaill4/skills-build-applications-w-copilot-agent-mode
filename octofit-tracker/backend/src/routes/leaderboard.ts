import { Router } from 'express';

import { Leaderboard } from '../models/Leaderboard.js';

const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_request, response, next) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('user', 'displayName username')
      .populate('team', 'name')
      .sort({ rank: 1 });
    response.json({ leaderboard });
  } catch (error) {
    next(error);
  }
});

export default leaderboardRouter;