import { Router } from 'express';

import { helloWorldRoutes } from './helloWorldRoutes';
import { usersRoutes } from './usersRoutes';
import { tasksRoutes } from './tasksRoutes';
import { authenticateRoutes } from './authenticateRoutes';

const routes = Router();

routes.use('/hello-world', helloWorldRoutes);
routes.use('/users', usersRoutes);
routes.use('/tasks', tasksRoutes);
routes.use('/sessions', authenticateRoutes);

export { routes };
