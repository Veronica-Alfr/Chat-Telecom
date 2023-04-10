import { INTEGER, Model, STRING, ARRAY } from 'sequelize';
import db from '.';

class User extends Model {
  id!: number;
  email!: string;
  password!: string;
  roomId!: number;
}

User.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  email: {
    type: STRING,
    allowNull: false,
  },
  password: {
    type: STRING,
    allowNull: false,
  },
  roomId: {
    type: INTEGER,
    allowNull: true,
  }
}, {
  timestamps: false,
  sequelize: db
});

export default User;
