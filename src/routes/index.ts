import { Router } from 'express';
import { helloWorldRoutes } from './HelloWorldRoutes';
import { usersRoutes } from './UsersRoutes';

const routes = Router();

routes.use('/hello-world', helloWorldRoutes);
routes.use('/users', usersRoutes);

export { routes };
