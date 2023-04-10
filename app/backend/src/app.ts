import * as express from 'express';
import cors from 'cors';
import http from 'http'
import { Server } from 'socket.io';
import 'express-async-errors';
import loginRouter from './routers/loginRouter';
import errorMiddleware from './middlewares/errors/errors';
import db from './models';
import { Sequelize } from 'sequelize';
import registerRouter from './routers/registerRouter';
import chatRouter from './routers/chatRouter';

class App {
  public app: express.Express;
  private sequelize: Sequelize;
  private server: http.Server;
  
  constructor() {
    this.app = express.default();
    this.sequelize = db;
    this.server = http.createServer(this.app);

    this.config();

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

    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(accessControl);

    const io = new Server(this.server, {
      cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
      }
    });

    io.on("connection", (socket) => {
      console.log(`User Connected: ${socket.id}`);
    
      socket.on("join_room", (data) => {
        socket.join(data);
        console.log(`User with ID: ${socket.id} joined room: ${data}`);
      });
    
      socket.on("send_message", (data) => {
        socket.to(data.room).emit("receive_message", data);
      });
    
      socket.on("disconnect", () => {
        console.log("User Disconnected", socket.id);
      });
    });

    this.app.use('/register', registerRouter);
    this.app.use('/login', loginRouter);
    this.app.use('/chat', chatRouter);

    this.app.use(errorMiddleware);
  }

  public start(PORT: string | number): void {
    this.connectToDatabase();
    this.server.listen(PORT, () => console.log(`Running on port ${PORT}`));
  }
}

export { App };
