import User from "../models/user";
import IUser from "./IUser";

export interface IRegisterService {
    create({ email, password }: IUser): Promise<User>
}
