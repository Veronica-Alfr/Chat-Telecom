import User from "../models/user";
import IUser from "../interfaces/IRegister";
import { IRegisterService } from "../interfaces/IRegisterService";

export default class RegisterService implements IRegisterService {
    create = async ({ name, email, password }: IUser): Promise<User> => {

        const userExisted = await User.findOne({
            where: { email },
        });
    
        if (userExisted) {
            const err = new Error('User already registered!');
            err.name = 'UserExistError';
            throw err;
        }

        const userCreate = await User.create({ name, email, password });

        return userCreate;
    }
}
