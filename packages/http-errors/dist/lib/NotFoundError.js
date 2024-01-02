"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotFoundError = void 0;
const AbstractError_1 = require("./AbstractError");
const HttpError_1 = require("./HttpError");
/**
 *
 */
class NotFoundError extends AbstractError_1.AbstractError {
    constructor(resource) {
        super(`No ${resource} found in database.`);
        this.code = 100;
        this.defaultHttpClassError = HttpError_1.HttpError.NotFound({
            message: this.message,
            errorCode: this.code
        });
    }
}
exports.NotFoundError = NotFoundError;
//# sourceMappingURL=NotFoundError.js.map