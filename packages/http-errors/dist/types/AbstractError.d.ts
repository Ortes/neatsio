import { CustomError } from 'ts-custom-error';
import { HttpError } from './HttpError';
/**
 *
 */
export declare abstract class AbstractError extends CustomError {
    abstract code: number;
    constructor(message: string);
}
/**
 *
 */
export interface CanThrowHttpError {
    defaultHttpClassError: HttpError;
}
