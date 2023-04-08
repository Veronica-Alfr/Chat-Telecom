import User from "../models/user";
import IRegister from "./IRegister";

export interface IRegisterService {
    create({ name, email, password }: IRegister): Promise<User>
}
