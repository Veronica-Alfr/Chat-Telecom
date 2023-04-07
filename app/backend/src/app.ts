import * as express from 'express';
import 'express-async-errors';
import loginRouter from './routers/loginRouter';
import errorMiddleware from './middlewares/errors/errors';
import db from './models';
import { Sequelize } from 'sequelize';
import registerRouter from './routers/registerRouter';

class App {
  public app: express.Express;
  private sequelize: Sequelize
  
  constructor() {
    this.app = express.default();
    this.sequelize = db;

    this.config();

    // Não remover essa rota
    this.app.get('/', (req, res) => res.json({ ok: true }));
  }

  private connectToDatabase() {
    this.sequelize.sync();
    // await this.sequelize.authenticate();
    console.log('Connected to database!');
  }

  private config():void {
    const accessControl: express.RequestHandler = (_req, res, next) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS,PUT,PATCH');
      res.header('Access-Control-Allow-Headers', '*');
      next();
    };

    this.app.use(express.json());
    this.app.use(accessControl);

    this.app.use('/register', registerRouter);
    this.app.use('/login', loginRouter);


    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number): void {
    this.connectToDatabase();
    this.app.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };
