import 'dotenv/config';
import { Options } from "sequelize";

const config: Options = {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASS || '123456',
    database: 'Chat-Telecom',
    host: process.env.DB_HOST || 'localhost',
    port: Number(process.env.DB_PORT) || 3002,
    dialect: 'sqlite',
    logging: false,
  }

export default config;