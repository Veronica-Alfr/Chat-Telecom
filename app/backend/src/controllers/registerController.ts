import { Request, Response } from "express";
import { validateUser } from "../middlewares/validations/schemaUser";
import { IRegisterService } from "../interfaces/IUserService";
import ILoginService from "../interfaces/ILoginService";
import ILogin from "../interfaces/ILogin";

export default class RegisterController {
    constructor(private registerService: IRegisterService, private loginService: ILoginService) {}

    async create(req: Request, res: Response): Promise<object>{
        const userCreate = validateUser(req.body);

        if (!userCreate.error) {
            const user = await this.registerService.create(userCreate);

            const loginBody: ILogin = validateUser(req.body);

            const token = await this.loginService.login(loginBody.email, loginBody.password);

            return res.status(201).json({ token });
        }
            const err = new Error(userCreate.error.message);
            err.name = 'UnauthorizedError';
            throw err;
        }
}