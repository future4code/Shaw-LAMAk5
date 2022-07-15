import { UserRole } from "../../src/model/User";
import { AuthenticationData } from "../../src/services/Authenticator";

export class IdGeneratorMock {
    public generate(input: AuthenticationData): string {
        return "id"
    }

    // public verify(token: string) {
    //     return {
    //         id: "id_mock",
    //         role: UserRole.NORMAL
    //     }
    // }
}
