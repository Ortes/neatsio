"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
/**
 *
 */
class HttpError extends Error {
    constructor(statusCode, message, details, errorCode, parentError) {
        super(message);
        this.statusCode = statusCode;
        this.message = message;
        this.details = details;
        this.errorCode = errorCode;
        this.parentError = parentError;
        if (parentError)
            this.stack = parentError.stack;
    }
    /**
     * Factory of
     * HTTP Error 400 Bad Request
     */
    static BadRequest(options) {
        return prepareHttpError(400, 'Bad Request', options);
    }
    /**
     * Factory of
     * HTTP Error 401 Not Found
     */
    static Unauthorized(options) {
        return prepareHttpError(401, 'Unauthorized', options);
    }
    /**
     * Factory of
     * HTTP Error 402 PaymentRequired
     */
    static PaymentRequired(options) {
        return prepareHttpError(402, 'Payment Required', options);
    }
    /**
     * Factory of
     * HTTP Error 403 Forbidden
     */
    static Forbidden(options) {
        return prepareHttpError(403, 'Forbidden', options);
    }
    /**
     * Factory of
     * HTTP Error 404 Not Found
     */
    static NotFound(options) {
        return prepareHttpError(404, 'Not Found', options);
    }
    /**
     * Factory of
     * HTTP Error 405 Method Not Allowed
     */
    static MethodNotAllowed(options) {
        return prepareHttpError(405, 'Method Not Allowed', options);
    }
    /**
     * Factory of
     * HTTP Error 406 Not Acceptable
     */
    static NotAcceptable(options) {
        return prepareHttpError(406, 'Not Acceptable', options);
    }
    /**
     * Factory of
     * HTTP Error 409 Conflict
     */
    static Conflict(options) {
        return prepareHttpError(409, 'Conflict', options);
    }
    /**
     * Factory of
     * HTTP Error 410 Gone
     */
    static Gone(options) {
        return prepareHttpError(410, 'Gone', options);
    }
    /**
     * Factory of
     * HTTP Error 422 Unprocessable Entity
     */
    static UnprocessableEntity(options) {
        return prepareHttpError(422, 'Unprocessable Entity', options);
    }
    /**
     * Factory of
     * HTTP Error 423 Locked
     */
    static Locked(options) {
        return prepareHttpError(423, 'Locked', options);
    }
    /**
     * Factory of
     * HTTP Error 500 Internal Server Error
     */
    static InternalServerError(options) {
        return prepareHttpError(500, 'Internal Server Error', options);
    }
}
exports.HttpError = HttpError;
/**
 *
 * @param statusCode
 * @param defaultMessage
 * @param options
 */
function prepareHttpError(statusCode, defaultMessage, options) {
    if (typeof options === 'string' || !options)
        return new HttpError(statusCode, options || defaultMessage);
    return new HttpError(statusCode, options.message || defaultMessage, options.details, options.errorCode, options.error);
}
//# sourceMappingURL=HttpError.js.map