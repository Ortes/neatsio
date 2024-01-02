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
exports.roleMiddleware = void 0;
const async_wrapper_1 = require("@owliehq/async-wrapper");
const http_errors_1 = require("@owliehq/http-errors");
const RightsManager_1 = require("../RightsManager");
const roleMiddleware = (resource, action, prepareContext) => {
    const callback = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        if (!user)
            throw Error(`You have not called AuthMiddleware before this one (RoleMiddleware).`);
        const role = yield RightsManager_1.RightsManager.getRole(user);
        if (!role)
            throw Error(`There's an error with user's role, maybe the callback is not set correctly.`);
        if (!RightsManager_1.RightsManager.accessController.getRoles().includes(role))
            throw http_errors_1.HttpError.Forbidden({
                message: `You don't have the right ACL to execute this action on optional requested resource.`
            });
        const permission = yield RightsManager_1.RightsManager.accessController
            .can(role)
            .context({
            body: req.body,
            params: req.params,
            user,
            custom: prepareContext ? yield prepareContext(req) : undefined
        })
            .execute(action)
            .on(resource);
        if (!permission.granted)
            throw http_errors_1.HttpError.Forbidden({
                message: `You don't have the right ACL to execute this action on optional requested resource.`
            });
        next();
    });
    return (0, async_wrapper_1.asyncWrapper)(callback);
};
exports.roleMiddleware = roleMiddleware;
//# sourceMappingURL=RoleMiddleware.js.map