import { AbstractError, CanThrowHttpError } from './AbstractError';
import { HttpError } from './HttpError';
/**
 *
 */
export declare class NotFoundError extends AbstractError implements CanThrowHttpError {
    code: number;
    defaultHttpClassError: HttpError;
    constructor(resource: string);
}
