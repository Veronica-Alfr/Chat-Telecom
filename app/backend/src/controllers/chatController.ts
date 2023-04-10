import { Request, Response } from "express";
import { IChatService } from "../interfaces/IChatService";
import { IChat } from "../interfaces/IChat";
import { validateMessage } from "../middlewares/validations/schemaChat";

export default class ChatController {
    constructor(private messageService: IChatService) {}

    async create(req: Request, res: Response): Promise<object> {
        const chatBody: IChat = validateMessage(req.body);
        console.log(chatBody);

        const chat = await this.messageService.create(chatBody);

        return res.status(201).json(chat);
    }
}
