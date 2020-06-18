import { Router } from 'express';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import MonitoringController from './app/controllers/MonitoringController';
import SubscriptionController from './app/controllers/SubscriptionController';
import MyMonitoringsController from './app/controllers/MyMonitoringsController';

import auth from './app/middlewares/auth';

const routes = Router();

routes.post('/sessions', SessionController.store);
routes.post('/users', UserController.store);

routes.use(auth);

routes.post('/monitoring', MonitoringController.store);
routes.get('/monitoring', MonitoringController.list);
routes.get('/monitoring/:id', MonitoringController.get);
routes.delete('/monitoring/:id', MonitoringController.destroy);

routes.get('/mymonitorings/:id', MyMonitoringsController.list);

routes.post('/subscriptions/:monitoringId', SubscriptionController.store);
routes.get('/subscriptions/:id', SubscriptionController.list);

routes.get('/cloudcomputing', (request, response) => {
  response.json({
    cloudComputing: 'Testando acesso do mundo inteiro',
  });
});

export default routes;
