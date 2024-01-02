"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractError = void 0;
const ts_custom_error_1 = require("ts-custom-error");
/**
 *
 */
class AbstractError extends ts_custom_error_1.CustomError {
    constructor(message) {
        super(message);
    }
}
exports.AbstractError = AbstractError;
//# sourceMappingURL=AbstractError.js.map