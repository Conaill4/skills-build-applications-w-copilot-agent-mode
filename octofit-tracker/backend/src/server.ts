import express from 'express';

import { getApiBaseUrl } from './config/api.js';
import './config/database.js';
import activitiesRouter from './routes/activities.js';
import leaderboardRouter from './routes/leaderboard.js';
import teamsRouter from './routes/teams.js';
import usersRouter from './routes/users.js';
import workoutsRouter from './routes/workouts.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const apiBaseUrl = getApiBaseUrl(port);

app.use(express.json());

app.get('/api/health', (_request, response) => {
  response.json({ apiBaseUrl, status: 'ok' });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error('API request failed:', error);
  response.status(500).json({ error: 'Internal server error' });
});

app.listen(port, () => {
  console.log(`OctoFit API listening at ${apiBaseUrl}`);
});