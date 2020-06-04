import Monitoring from '../models/Monitoring';

class MyMonitoringsController {
  async list(request, response) {
    const { id } = request.params;

    const monitorings = await Monitoring.findAll({
      where: { user_id: id },
    });

    return response.json(monitorings);
  }
}

export default new MyMonitoringsController();
