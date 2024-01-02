"use strict";
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Controller = void 0;
const express_1 = require("express");
// WTF require is needed...
const neatsio = require('@owliehq/neatsio');
const async_wrapper_1 = require("@owliehq/async-wrapper");
const Metadata_1 = require("../interfaces/Metadata");
const MetadataManager_1 = require("../MetadataManager");
const __1 = require("..");
const NeatsioActions_1 = require("../interfaces/NeatsioActions");
const RightsManager_1 = require("../RightsManager");
/**
 *
 *
 */
function generateRoutes(controller, controllerMetadata) {
    if (!controllerMetadata)
        throw Error('Missing controller configuration');
    const routesMetadata = controllerMetadata.routes || {};
    const middlewares = controllerMetadata.middlewares || {};
    const router = (0, express_1.Router)();
    Object.entries(routesMetadata).forEach(([key, meta]) => {
        const currentRouteMiddlewares = (middlewares[key] || []).reverse();
        const handler = meta.handler.bind(controller.instance);
        switch (meta.method) {
            case Metadata_1.RouteMethod.GET:
                router.get(meta.path, currentRouteMiddlewares, handler);
                break;
            case Metadata_1.RouteMethod.POST:
                router.post(meta.path, currentRouteMiddlewares, handler);
                break;
            case Metadata_1.RouteMethod.PUT:
                router.put(meta.path, currentRouteMiddlewares, handler);
                break;
            case Metadata_1.RouteMethod.DELETE:
                router.delete(meta.path, currentRouteMiddlewares, handler);
                break;
        }
    });
    return router;
}
/**
 *
 * @param controllerName
 */
const Controller = (controllerName, params = {}) => (constructor) => {
    var _a;
    //
    const currentControllerClass = (_a = class extends constructor {
        },
        __setFunctionName(_a, "currentControllerClass"),
        _a.router = (0, express_1.Router)(),
        _a.controllerName = controllerName,
        _a.path = `/${controllerName}`,
        _a.instance = new constructor(),
        _a);
    const { name } = constructor;
    //
    MetadataManager_1.MetadataManager.registerController(name);
    const controllerMetadata = MetadataManager_1.MetadataManager.getControllerMetadata(name);
    //
    const routes = generateRoutes(currentControllerClass, controllerMetadata);
    if (params.rights) {
        RightsManager_1.RightsManager.registerRightsController(params.rights);
    }
    if (params.model) {
        const neatsioRoutes = getNeatsioRoutesConfig(currentControllerClass);
        const unauthorizedRoutes = (params.unauthorizedRoutes || []).map(neatsioAction => {
            const removeNeatsio = neatsioAction.substring(7);
            return removeNeatsio[0].toLowerCase() + removeNeatsio.substring(1);
        });
        const hiddenAttributes = params.hiddenAttributes || [];
        const config = Object.assign(Object.assign({}, buildNeatsioConfig(currentControllerClass, controllerMetadata, neatsioRoutes)), { unauthorizedRoutes,
            hiddenAttributes });
        neatsio.registerModel(params.model, config);
    }
    else {
        currentControllerClass.router = routes;
        __1.app.registerController(currentControllerClass);
    }
    return currentControllerClass;
};
exports.Controller = Controller;
/**
 *
 * @param controllerMetadata
 * @param neatsioRoutes
 */
function buildNeatsioConfig(controller, controllerMetadata, neatsioRoutes) {
    const middlewares = Object.entries(neatsioRoutes).reduce((result, entry) => {
        var _a;
        const action = entry[0];
        const key = entry[1];
        if ((_a = controllerMetadata === null || controllerMetadata === void 0 ? void 0 : controllerMetadata.middlewares) === null || _a === void 0 ? void 0 : _a.hasOwnProperty(action)) {
            if (!result[key])
                result[key] = { before: [], after: [] };
            // handle after ?
            result[key].before = controllerMetadata.middlewares[action].reverse();
        }
        return result;
    }, {});
    const routes = prepareCustomRoutesForNeatsio(controller, controllerMetadata);
    return {
        middlewares,
        routes
    };
}
/**
 *
 */
function getAllMethods(obj) {
    let props = [];
    do {
        const l = Object.getOwnPropertyNames(obj)
            .concat(Object.getOwnPropertySymbols(obj).map(s => s.toString()))
            .sort()
            .filter((p, i, arr) => typeof obj[p] === 'function' && p !== 'constructor' && (i == 0 || p !== arr[i - 1]) && props.indexOf(p) === -1);
        props = props.concat(l);
    } while ((obj = Object.getPrototypeOf(obj)) && Object.getPrototypeOf(obj));
    return props;
}
/**
 *
 * @param controllerMetadata
 */
function prepareCustomRoutesForNeatsio(controller, controllerMetadata) {
    if (!controllerMetadata.routes)
        return [];
    return Object.entries(controllerMetadata.routes).map(([methodName, route]) => {
        const { path, handler, method } = route;
        const declaredMiddlewares = controllerMetadata.middlewares || {};
        const middlewares = declaredMiddlewares[methodName] || [];
        return {
            path,
            method,
            middlewares,
            execute: (0, async_wrapper_1.asyncWrapper)(handler.bind(controller.instance))
        };
    });
}
/**
 *
 */
function getNeatsioRoutesConfig(controllerClass) {
    const instance = new controllerClass();
    const methods = getAllMethods(instance);
    const neatsioActions = Object.values(NeatsioActions_1.NeatsioActions);
    return methods
        .filter((method) => neatsioActions.includes(method))
        .reduce((result, action) => {
        const cleanActionName = action.substr(7);
        result[action] = cleanActionName.charAt(0).toLowerCase() + cleanActionName.slice(1);
        return result;
    }, {});
}
//# sourceMappingURL=controller.decorator.js.map