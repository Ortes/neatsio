"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const passport = require("passport");
const http_errors_1 = require("@owliehq/http-errors");
const authMiddleware = (req, res, next) => {
    passport.authenticate('jwt', (err, user) => {
        if (err)
            return next(err);
        //
        if (!user)
            throw http_errors_1.HttpError.Unauthorized({
                message: `Unauthorized Access, token must be provided.`,
                errorCode: 16
            });
        //
        //if (!user.active) throw HttpError.Unauthorized({ message: `Account desactivated.`, errorCode: 17 })
        req.user = user;
        next();
    })(req, res, next);
};
exports.authMiddleware = authMiddleware;
//# sourceMappingURL=AuthMiddleware.js.map