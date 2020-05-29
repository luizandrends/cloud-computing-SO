import Sequelize, { Model } from 'sequelize';
import { isBefore, subHours } from 'date-fns';

class Monitoring extends Model {
  static init(sequelize) {
    super.init(
      {
        course: Sequelize.STRING,
        class: Sequelize.STRING,
        subject_matter: Sequelize.STRING,
        date: Sequelize.DATE,
        deleted_at: Sequelize.DATE,
        past: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(this.date, new Date());
          },
        },
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            return isBefore(new Date(), subHours(this.date, 2));
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Monitoring;
