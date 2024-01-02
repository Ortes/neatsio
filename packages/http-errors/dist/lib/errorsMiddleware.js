"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorsMiddleware = void 0;
const HttpError_1 = require("./HttpError");
/**
 *
 */
const errorsMiddleware = (options) => {
    // Default options
    options = options || {
        debugServer: false,
        debugClient: false,
        skipClientError: false
    };
    const errorHandler = (err, req, res, next) => {
        err = err.defaultHttpClassError || err;
        const statusCode = err.statusCode || 500;
        if (options.debugServer && ((!options.skipClientError && statusCode < 500) || statusCode >= 500))
            console.error(err);
        if (statusCode === 500)
            err = HttpError_1.HttpError.InternalServerError();
        const { message, defaultHttpClassError } = err;
        const stack = options.debugClient ? err.stack : undefined;
        const errorCode = err.errorCode ? 'E' + err.errorCode.toString().padStart(5, '0') : undefined;
        const details = err.details || undefined;
        res.status(statusCode).json({
            statusCode,
            errorCode,
            message,
            details,
            stack
        });
    };
    return errorHandler;
};
exports.errorsMiddleware = errorsMiddleware;
//# sourceMappingURL=errorsMiddleware.js.map