import Monitoring from '../models/Monitoring';
import User from '../models/User';
import Subscription from '../models/Subscription';

class SubscriptionController {
  async store(request, response) {
    const monitoring = await Monitoring.findByPk(request.params.monitoringId, {
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (!monitoring) {
      return response.status(400).json({ err: 'Monitoring not found' });
    }

    if (monitoring.user_id === request.userId) {
      return response
        .status(401)
        .json({ err: 'You cannot subscribe to your owns monitorings' });
    }

    if (monitoring.past) {
      return response
        .status(400)
        .json({ err: 'You cannot subscribe to past monitorings' });
    }

    const user = await User.findByPk(request.userId);

    const checkSubscription = await Subscription.findOne({
      where: {
        user_id: user.id,
        monitoring_id: monitoring.id,
      },
    });

    if (checkSubscription) {
      return response
        .status(400)
        .json({ err: 'You are already registered for this monitoring' });
    }

    const checkDate = await Subscription.findOne({
      where: {
        user_id: user.id,
      },
      include: [
        {
          model: Monitoring,
          required: true,
          where: {
            date: monitoring.date,
          },
          as: 'monitoring',
        },
      ],
    });

    if (checkDate) {
      return response.status(400).json({
        err: 'You cannot subscribe at 2 monitorigns at the same time',
      });
    }

    const subscription = await Subscription.create({
      user_id: user.id,
      monitoring_id: monitoring.id,
    });

    return response.json(subscription);
  }
}

export default new SubscriptionController();
