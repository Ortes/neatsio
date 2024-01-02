"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoleMiddleware = exports.AuthMiddleware = exports.ValidationMiddleware = exports.Middleware = void 0;
const MetadataManager_1 = require("../MetadataManager");
const dot_prop_1 = require("dot-prop");
const pluralize_1 = require("pluralize");
const middlewares_1 = require("../middlewares");
/**
 *
 * @param middleware
 */
const Middleware = (middleware) => (target, propertyKey, descriptor) => registerMiddleware(target, propertyKey, descriptor, middleware);
exports.Middleware = Middleware;
/**
 *
 * @param validations
 */
const ValidationMiddleware = (validations) => {
    return (0, exports.Middleware)((0, middlewares_1.validationMiddleware)(validations));
};
exports.ValidationMiddleware = ValidationMiddleware;
/**
 *
 */
const AuthMiddleware = () => {
    return (0, exports.Middleware)(middlewares_1.authMiddleware);
};
exports.AuthMiddleware = AuthMiddleware;
/**
 *
 */
const RoleMiddleware = () => {
    return (target, propertyKey, descriptor) => {
        const name = target.constructor.name;
        const isController = (name === null || name === void 0 ? void 0 : name.substring(name.length - 10)) === 'Controller';
        if (!isController)
            throw new Error(`Controller name's must finish with "Controller"`);
        const resource = (0, pluralize_1.singular)(name.substring(0, name.length - 10)).toLowerCase();
        const currentRoleMiddleware = (0, middlewares_1.roleMiddleware)(resource, propertyKey);
        registerMiddleware(target, propertyKey, descriptor, currentRoleMiddleware);
    };
};
exports.RoleMiddleware = RoleMiddleware;
/**
 *
 * @param target
 * @param propertyKey
 * @param descriptor
 */
function registerMiddleware(target, propertyKey, descriptor, middleware) {
    const path = `controllers.${target.constructor.name}.middlewares.${propertyKey}`;
    if (!(0, dot_prop_1.has)(MetadataManager_1.MetadataManager.meta, path)) {
        (0, dot_prop_1.set)(MetadataManager_1.MetadataManager.meta, path, []);
    }
    MetadataManager_1.MetadataManager.meta.controllers[target.constructor.name].middlewares[propertyKey].push(middleware);
}
//# sourceMappingURL=middleware.decorator.js.map