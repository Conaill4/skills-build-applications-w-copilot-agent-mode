import { Router } from 'express';

import { Workout } from '../models/Workout.js';

const workoutsRouter = Router();

workoutsRouter.get('/', async (_request, response, next) => {
  try {
    const workouts = await Workout.find().sort({ difficulty: 1, title: 1 });
    response.json({ workouts });
  } catch (error) {
    next(error);
  }
});

export default workoutsRouter;