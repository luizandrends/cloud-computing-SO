import { startOfHour, parseISO, isBefore } from 'date-fns';

import Monitoring from '../models/Monitoring';

class MonitoringController {
  async store(request, response) {
    const { course, crew, subject_matter, date } = request.body;

    const hourStart = startOfHour(parseISO(date));

    if (isBefore(hourStart, new Date())) {
      return response.status(400).json({ err: 'Past dates are not permitted' });
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
