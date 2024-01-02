"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function asyncWrapper(fn) {
    return function (req, res, next) {
        try {
            fn(req, res, next);
        }
        catch (e) {
            next(e);
        }
    };
}
exports.default = asyncWrapper;
//# sourceMappingURL=async-wrapper.js.map