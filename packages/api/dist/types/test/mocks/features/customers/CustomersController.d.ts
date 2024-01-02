import { Request, Response } from 'express';
import { NeatsioActions } from '../../../../src';
import Customer from './Customer';
export default class CustomersController {
    private customerService;
    [NeatsioActions.GET_ONE](): Promise<void>;
    [NeatsioActions.CREATE_ONE](): Promise<void>;
    [NeatsioActions.GET_MANY](): Promise<void>;
    download(): (req: Request, res: Response) => Promise<void>;
    getEmail(email: string): Promise<Customer | null>;
    sendMessage(message: string): Promise<{
        message: string;
    }>;
}
