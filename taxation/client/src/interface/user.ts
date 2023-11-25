export interface IUser{
    id?:number
    first_name:string
    last_name:string
    username:string
    email:string
    is_superuser?:string
    password:string
    confirm_password?:string
}