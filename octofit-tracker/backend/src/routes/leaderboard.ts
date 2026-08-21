import { Router } from 'express';

const leaderboardRouter = Router();

leaderboardRouter.get('/', (_request, response) => {
  response.json({ leaderboard: [] });
});

export default leaderboardRouter;