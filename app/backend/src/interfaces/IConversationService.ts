import Conversation from "../models/conversation";
import { IConversation } from "./IConversation";

export interface IConversationService {
    create({ members }: IConversation): Promise<Conversation>,
    // getById(id: number): Promise<Array<object>>,
}
