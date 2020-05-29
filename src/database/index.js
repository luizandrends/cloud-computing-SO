import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Users from '../app/models/User';
import Monitoring from '../app/models/Monitoring';
import Subscription from '../app/models/Subscription';

const models = [Users, Monitoring, Subscription];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models.map(model => model.init(this.connection));
    models.map(
      model => model.associate && model.associate(this.connection.models)
    );
  }
}

export default new Database();
