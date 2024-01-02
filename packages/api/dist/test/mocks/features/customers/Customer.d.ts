import { Model } from 'sequelize-typescript';
export default class Customer extends Model {
    private customerService;
    lastname: string;
    firstname: string;
    email: string;
    triggeredOnBeforeSave: boolean;
    static setTriggerValue(instance: Customer): Promise<void>;
}
