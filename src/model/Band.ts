export class Band{
    constructor(
    private id: string,
    private name: string,
    private music_genre: string,
    private responsible: string
    ){}

    getId(){
        return this.id;
    }

    getName(){
        return this.name
    }

    getMusicGenre(){
        return this.music_genre;
    }

    getResponsible(){
        return this.responsible;
    }
//    static stringToUserRole(input: string): UserRole{
//         switch (input) {
//             case "NORMAL":
//               return UserRole.NORMAL;
//             case "ADMIN":
//               return UserRole.ADMIN;
//             default:
//               throw new Error("Invalid user role");
//         }
//     }
    static toBandModel(band: any): Band {
        return new Band(band.id, band.name, band.music_genre, band.responsible);
    }
}

export interface BandInputDTO{
    name: string;
    music_genre: string;
    responsible: string;
}

// export interface LoginInputDTO{
//     email: string;
//     password: string;
// }

// export enum UserRole{
//     NORMAL = "NORMAL",
//     ADMIN = "ADMIN"
// }