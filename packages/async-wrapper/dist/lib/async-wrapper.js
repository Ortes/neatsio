"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncWrapper = void 0;
const asyncWrapper = (handler) => {
    return (req, res, next) => {
        handler(req, res, next).catch(next);
    };
};
exports.asyncWrapper = asyncWrapper;
//# sourceMappingURL=async-wrapper.js.map