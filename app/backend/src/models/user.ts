import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class User extends Model {
  id!: number;
  email!: string;
  password!: string;
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
}, {
  timestamps: false,
  sequelize: db,
  tableName: 'users',
  underscored: true,
});

export default User;