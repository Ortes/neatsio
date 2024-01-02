"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var AuthController_1;
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../../../src");
const User_1 = require("../users/User");
const http_errors_1 = require("@owliehq/http-errors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
let AuthController = AuthController_1 = class AuthController {
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield User_1.default.findOne({
                where: {
                    email
                }
            });
            if (!user)
                throw http_errors_1.HttpError.Unauthorized(`No user found with this email.`);
            const { id, password: hashPassword } = user;
            const isSamePassword = bcrypt.compareSync(password, hashPassword);
            //
            if (!isSamePassword)
                throw http_errors_1.HttpError.Unauthorized(`Invalid credentials.`);
            const { accessToken } = yield AuthController_1.createLoginTokens(email, id);
            return { accessToken };
        });
    }
    /**
     *
     * @param email
     * @param id
     */
    static createLoginTokens(email, id) {
        return __awaiter(this, void 0, void 0, function* () {
            // When all is good, create user's access token
            const accessToken = jwt.sign({ email, id }, 'abc', {
                expiresIn: '7d'
            });
            return {
                accessToken
            };
        });
    }
};
__decorate([
    (0, src_1.Post)('/login'),
    __param(0, (0, src_1.Body)('email')),
    __param(1, (0, src_1.Body)('password')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
AuthController = AuthController_1 = __decorate([
    (0, src_1.Controller)('auth')
], AuthController);
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map