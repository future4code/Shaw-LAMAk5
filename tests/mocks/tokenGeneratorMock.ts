import { UserRole } from "../../src/model/User";
import { AuthenticationData } from "../../src/services/Authenticator";

export class TokenGeneratorMock {

    public generate = (input: AuthenticationData): string => {
        return "token"
    };

    public verify(token: string) {
        switch (token) {
            case "token de normal user":
                return {
                    id: "id_user_1",
                    role: UserRole.NORMAL
                }
            case "token de admin user":
                return {
                    id: "id_user_2",
                    role: UserRole.ADMIN
                }
            default:
                return undefined
        }

    }
}