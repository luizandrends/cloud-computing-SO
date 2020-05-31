import { startOfHour, parseISO, isBefore } from 'date-fns';

import Monitoring from '../models/Monitoring';
import User from '../models/User';

class MonitoringController {
  async get(request, response) {
    const { id } = request.params;

    const findMonitoring = await Monitoring.findOne({
      where: { id },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
      ],
    });

    return response.json(findMonitoring);
  }

  async list(requst, response) {
    const monitorings = await Monitoring.findAll();

    return response.json(monitorings);
  }

  async store(request, response) {
    const { course, crew, subject_matter, date } = request.body;

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return response.status(400).json({ err: 'Past dates are not permitted' });
    }

    const checkAvaliability = await Monitoring.findOne({
      where: {
        course,
        subject_matter,
        date,
        deleted_at: null,
      },
    });

    if (checkAvaliability) {
      return response.json({ err: 'Date is not available' });
    }

    const monitoring = await Monitoring.create({
      user_id: request.userId,
      course,
      crew,
      subject_matter,
      date,
    });

    return response.json(monitoring);
  }
}

export default new MonitoringController();
