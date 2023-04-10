import { INTEGER, Model, STRING } from 'sequelize';
import db from '.';

class Chat extends Model {
  id!: number;
  name!: string;
  rooId!: number;
  message!: string;
}

Chat.init({
  id: {
    type: INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  roomId: {
    type: INTEGER,
    allowNull: false,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  message: {
    type: STRING,
    allowNull: false,
  },
}, {
  timestamps: true,
  sequelize: db
});

export default Chat;
