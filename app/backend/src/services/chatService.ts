import { IChat } from "../interfaces/IChat";
import { IChatService } from "../interfaces/IChatService";
import Chat from "../models/chat";

export default class ChatService implements IChatService {
    create = async ({ roomId, name, message, time }: IChat): Promise<Chat> => {
        const createDataChat = await Chat.create({ name, roomId, message, time });

        if (!createDataChat) {
            const err = new Error('Error creating chat');
            err.name = 'Unauthorized';
            throw err;
        }

        return createDataChat;
    }
}
