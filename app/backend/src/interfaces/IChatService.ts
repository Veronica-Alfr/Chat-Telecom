import Message from "../models/chat";
import { IChat } from "./IChat";

export interface IChatService {
    create({ roomId, name, message, time }: IChat): Promise<Message>,
}
