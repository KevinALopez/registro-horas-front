export interface IUser {
    id?:number;
    username:string;
    email:string;
    password?:string;
    currentPassword?: string;
    role:string;
    contract:string;

}
