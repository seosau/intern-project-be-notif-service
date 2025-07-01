export interface IUser {
    id: string;
    fullName: string;
    email: string;
    password: string;
    image: string ;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date;
}