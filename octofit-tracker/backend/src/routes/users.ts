import { Router } from 'express';

const usersRouter = Router();

usersRouter.get('/', (_request, response) => {
  response.json({ users: [] });
});

export default usersRouter;