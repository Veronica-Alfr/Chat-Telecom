import { Router } from 'express';
import ChatService from '../services/chatService';
import ChatController from '../controllers/chatController';
import Jwt from '../helpers/jwtVerifyToken';

const chatRouter = Router();

const chatService = new ChatService();
const chatController = new ChatController(chatService);

chatRouter.post('/', (req, res) =>  chatController.create(req, res));

export default chatRouter;
