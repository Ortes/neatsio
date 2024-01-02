/**
 *
 */
export declare class HttpError extends Error {
    statusCode: number;
    message: string;
    details?: any;
    errorCode?: number | undefined;
    parentError?: Error | undefined;
    constructor(statusCode: number, message: string, details?: any, errorCode?: number | undefined, parentError?: Error | undefined);
    /**
     * Factory of
     * HTTP Error 400 Bad Request
     */
    static BadRequest(options?: OptionsErrorFactory): HttpError;
    /**
     * Factory of
     * HTTP Error 401 Not Found
     */
    static Unauthorized(options?: OptionsErrorFactory): HttpError;
    /**
     * Factory of
     * HTTP Error 402 PaymentRequired
     */
    static PaymentRequired(options?: OptionsErrorFactory): HttpError;
    /**
     * Factory of
     * HTTP Error 403 Forbidden
     */
    static Forbidden(options?: OptionsErrorFactory): HttpError;
    /**
     * Factory of
     * HTTP Error 404 Not Found
     */
    static NotFound(options?: OptionsErrorFactory): HttpError;
    /**
     * Factory of
     * HTTP Error 405 Method Not Allowed
     */
    static MethodNotAllowed(options?: OptionsErrorFactory): HttpError;
    /**
     * Factory of
     * HTTP Error 406 Not Acceptable
     */
    static NotAcceptable(options?: OptionsErrorFactory): HttpError;
    /**
     * Factory of
     * HTTP Error 409 Conflict
     */
    static Conflict(options?: OptionsErrorFactory): HttpError;
    /**
     * Factory of
     * HTTP Error 410 Gone
     */
    static Gone(options?: OptionsErrorFactory): HttpError;
    /**
     * Factory of
     * HTTP Error 422 Unprocessable Entity
     */
    static UnprocessableEntity(options?: OptionsErrorFactory): HttpError;
    /**
     * Factory of
     * HTTP Error 423 Locked
     */
    static Locked(options?: OptionsErrorFactory): HttpError;
    /**
     * Factory of
     * HTTP Error 500 Internal Server Error
     */
    static InternalServerError(options?: OptionsErrorFactory): HttpError;
}
export interface OptionsErrorFactoryObject {
    message?: string;
    error?: Error;
    details?: any;
    errorCode?: number;
}
export type OptionsErrorFactory = OptionsErrorFactoryObject | string | undefined;
