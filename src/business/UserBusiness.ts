import { UserInputDTO, LoginInputDTO } from "../model/User";
import { UserDatabase } from "../data/UserDatabase";
import { HashManager } from "../services/HashManager";
import { Authenticator } from "../services/Authenticator";
import { IdGenerator } from "../services/IdGenerator";

export class UserBusiness {
    constructor(
        private userData: UserDatabase,
        private idGenerator: IdGenerator,
        private hashManager: HashManager,
        private authenticator: Authenticator,
    ) { }
    createUser = async (user: UserInputDTO) => {       
        
        const { name, email, password, role } = user
        if (!name || !email || !password || !role) {
            throw new Error("Campos inválidos")

        }
        const registeredUser = await this.userData.getUserByEmail(user.email)
        if (registeredUser) {
            throw new Error("Email já cadastrado")
        }
        const id = this.idGenerator.generate();       

        const hashPassword = await this.hashManager.hash(user.password);
        
        await this.userData.createUser(id, name, email, hashPassword, role);

        const accessToken = this.authenticator.generateToken({ id, role });

        return accessToken;
    }

    getUserByEmail = async (user: LoginInputDTO) => {

        const { email, password } = user
        if (!email || !password) {
            throw new Error("'email' e 'senha' são obrigatórios")
        }
        const userFromDB = await this.userData.getUserByEmail(user.email)

        if (!userFromDB) {
            throw new Error("Usuário não encontrado")
        }

        const hashCompare = await this.hashManager.compare(user.password, userFromDB.getPassword());

        if (!hashCompare) {
            throw new Error("Senha incorreta")
        }

        const accessToken = this.authenticator.generateToken({ id: userFromDB.getId(), role: userFromDB.getRole() });

        return accessToken;
    }
}