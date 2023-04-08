import { Router } from 'express';
import RegisterService from '../services/registerService';
import RegisterController from '../controllers/registerController';

const registerRouter = Router();

const registerService = new RegisterService();
const registerController = new RegisterController(registerService);

registerRouter.post('/', (req, res) => registerController.create(req, res));

export default registerRouter;
