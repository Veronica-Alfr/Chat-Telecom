import { IChat } from "../interfaces/IChat";
import { IChatService } from "../interfaces/IChatService";
import Message from "../models/chat"

export default class ChatService implements IChatService {
    create = async ({ roomId, name, message }: IChat): Promise<Message> => {
        const createDataChat = await Message.create({ name, roomId, message });

        if (!createDataChat) {
            const err = new Error('Error creating chat');
            err.name = 'Unauthorized';
            throw err;
        }

        return createDataChat;
    }
}
