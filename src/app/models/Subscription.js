import { Model } from 'sequelize';

class Subscription extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.Monitoring, {
      foreignKey: 'monitoring_id',
      as: 'monitoring',
    });
    this.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  }
}

export default Subscription;
