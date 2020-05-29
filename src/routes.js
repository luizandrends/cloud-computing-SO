import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import MonitoringController from './app/controllers/MonitoringController';

const routes = Router();

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.post('/monitoring', MonitoringController.store);

export default routes;
