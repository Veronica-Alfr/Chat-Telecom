import { Sequelize } from 'sequelize';
import config from '../database/config/database';

export default new Sequelize(config);