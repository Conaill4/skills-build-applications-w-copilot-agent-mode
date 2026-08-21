import { Router } from 'express';

const activitiesRouter = Router();

activitiesRouter.get('/', (_request, response) => {
  response.json({ activities: [] });
});

export default activitiesRouter;