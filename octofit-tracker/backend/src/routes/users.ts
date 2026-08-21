import { Router } from 'express';

import { User } from '../models/User.js';

const usersRouter = Router();

usersRouter.get('/', async (_request, response, next) => {
  try {
    const users = await User.find().populate('team', 'name motto').sort({ displayName: 1 });
    response.json({ users });
  } catch (error) {
    next(error);
  }
});

export default usersRouter;