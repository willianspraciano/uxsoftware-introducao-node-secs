import { Router } from 'express';
import { HelloWorldController } from '../controllers/HelloWorldController';

const helloWorldRoutes = Router();

const controller = new HelloWorldController();

helloWorldRoutes.get('/', controller.show);

export { helloWorldRoutes };
