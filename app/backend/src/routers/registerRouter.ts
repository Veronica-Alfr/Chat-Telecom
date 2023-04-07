import { Router } from 'express';
import RegisterService from '../services/registerService';
import RegisterController from '../controllers/registerController';
import LoginService from '../services/loginService';

const registerRouter = Router();

const registerService = new RegisterService();
const loginService = new LoginService();
const registerController = new RegisterController(registerService, loginService);

registerRouter.post('/', (req, res) => registerController.create(req, res));

export default registerRouter;
