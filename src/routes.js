import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import MonitoringController from './app/controllers/MonitoringController';

import auth from './app/middlewares/auth';

const routes = Router();

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.use(auth);

routes.post('/monitoring', MonitoringController.store);

export default routes;
