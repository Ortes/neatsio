import Customer from './Customer';
export declare class CustomerService {
    findByEmail(email: string): Promise<Customer | null>;
    isJohn(customer: Customer): boolean;
}
