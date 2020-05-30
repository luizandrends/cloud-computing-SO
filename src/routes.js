import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import MonitoringController from './app/controllers/MonitoringController';
import SubscriptionController from './app/controllers/SubscriptionController';

import auth from './app/middlewares/auth';

const routes = Router();

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.use(auth);

routes.post('/monitoring', MonitoringController.store);

routes.post('/subscriptions/:monitoringId', SubscriptionController.store);
routes.get('/subscriptions/:id', SubscriptionController.list);

export default routes;
