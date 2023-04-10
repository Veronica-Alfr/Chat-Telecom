import { Request, Response } from "express";
import { validateRegister } from "../middlewares/validations/schemaRegister";
import { IRegisterService } from "../interfaces/IRegisterService";
import IRegister from "../interfaces/IRegister";
import { JwtService } from '../helpers/jwtSign';

export default class RegisterController {
    constructor(private registerService: IRegisterService) {}

    async create(req: Request, res: Response): Promise<object> {
        const registerBody: IRegister = validateRegister(req.body);

        const user = await this.registerService.create(registerBody);

        const { id, email, roomId } = user;

        const token = JwtService.sign({ id, email, roomId});

        return res.status(201).json({ token });
    }
}
