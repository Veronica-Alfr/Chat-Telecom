import { Request, Response } from 'express';
import ILogin from '../interfaces/ILogin';
import ILoginService from '../interfaces/ILoginService';

export default class LoginController {
        constructor(private loginService: ILoginService) {} 

        async login(req: Request, res: Response): Promise<object>  {

        const loginBody: ILogin = req.body;

        const token = await this.loginService.login(loginBody.email, loginBody.password);

        return res.status(200).json({ token });
   }

   verifyToken(req: Request, res: Response): object {
        const { email } = req.body.user;

        return res.status(200).json({ email });
   }
}
