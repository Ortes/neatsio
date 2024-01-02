"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tokenStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const User_1 = require("../features/users/User");
/**
 *
 */
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'abc'
};
/**
 *
 */
exports.tokenStrategy = new passport_jwt_1.Strategy(options, (token, done) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //
        const user = yield User_1.default.findByPk(token.id);
        //
        if (user)
            return done(null, user);
        done(null, false);
    }
    catch (err) {
        done(err, false, { message: 'Internal Server Error' });
    }
}));
//# sourceMappingURL=passport.js.map