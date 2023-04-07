import User from "../models/user";
import { JwtService } from "./jwtService";

export default class LoginService {
    public login = async (email: string, password: string): Promise<string> => {  
       const user = await User.findOne({
       where: { email },
    });

    if (!user) {
      const err = new Error('You are not registered!');
      err.name = 'Unauthorized';
      throw err;
    }

    if (user.email && user.password !== password) {
      const err = new Error('Incorrect email or password');
      err.name = 'Unauthorized';
      throw err;
    }

    const  { id } = user;
    const token = JwtService.sign({ id, email });

    return token;
  }
}
