import { Request, Response } from "express";
import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserBusiness } from "../business/UserBusiness";
import { BaseDatabase } from "../data/BaseDatabase";

export class UserController {

    constructor(
        private userBusiness: UserBusiness
    ) { }
    signup = async (req: Request, res: Response) => {
        try {

            const input: UserInputDTO = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            }
            
            const token = await this.userBusiness.createUser(input);

            res.status(200).send({ message: "Usuário cadastrado com sucesso", token });

        } catch (error) {           
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro no signup")
        }

        await BaseDatabase.destroyConnection();
    }

    login = async (req: Request, res: Response) => {

        try {

            const loginData: LoginInputDTO = {
                email: req.body.email,
                password: req.body.password
            };

            const token = await this.userBusiness.getUserByEmail(loginData);

            res.status(200).send({ message: "Usuário logado com sucesso", token });

        } catch (error) {
            if (error instanceof Error) {
                return res.status(400).send(error.message)
            }
            res.status(500).send("Erro no login")
        }

        await BaseDatabase.destroyConnection();
    }

}