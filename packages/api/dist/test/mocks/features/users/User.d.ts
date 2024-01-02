import { Model } from 'sequelize-typescript';
export default class User extends Model {
    lastname: string;
    firstname: string;
    email: string;
    password: string;
    role: string;
    static changePassword(instance: User): void;
}
