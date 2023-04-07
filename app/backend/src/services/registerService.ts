import User from "../models/user";
import IUser from "../interfaces/IUser";
import { IRegisterService } from "../interfaces/IUserService";

export default class RegisterService implements IRegisterService {
    create = async ({ email, password }: IUser): Promise<User> => {

        const userExisted = await User.findOne({
            where: { email },
        });
    
        if (userExisted) {
            const err = new Error('User already registered');
            err.name = 'UserExistError';
            throw err;
        }

        const userCreate = await User.create({ email, password });

        return userCreate;
    }
}
