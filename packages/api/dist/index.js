'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopNamespace(e) {
    if (e && e.__esModule) { return e; } else {
        var n = {};
        if (e) {
            Object.keys(e).forEach(function (k) {
                var d = Object.getOwnPropertyDescriptor(e, k);
                Object.defineProperty(n, k, d.get ? d : {
                    enumerable: true,
                    get: function () {
                        return e[k];
                    }
                });
            });
        }
        n['default'] = e;
        return n;
    }
}

var express$1 = require('express');
var asyncWrapper = require('@owliehq/async-wrapper');
var dotProp = require('dot-prop');
var pluralize = require('pluralize');
var passport = require('passport');
var httpErrors = require('@owliehq/http-errors');
var expressValidator = require('express-validator');
require('reflect-metadata');
var bodyParser = require('body-parser');
var path = require('path');
var glob = require('fast-glob');
var https = require('https');
var http = require('http');

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __setFunctionName(f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
}
function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

var _SuppressedError = typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var RouteMethod;
(function (RouteMethod) {
    RouteMethod["GET"] = "GET";
    RouteMethod["POST"] = "POST";
    RouteMethod["PUT"] = "PUT";
    RouteMethod["DELETE"] = "DELETE";
})(RouteMethod || (RouteMethod = {}));

class MetadataManager {
    /**
     *
     * @param controllerName
     */
    static registerController(controllerName) {
        MetadataManager.meta.controllers[controllerName] = MetadataManager.meta.controllers[controllerName] || {};
    }
    /**
     *
     * @param controllerName
     */
    static getControllerMetadata(controllerName) {
        return MetadataManager.meta.controllers[controllerName];
    }
}
/**
 *
 */
MetadataManager.meta = {
    controllers: {}
};

(function (NeatsioActions) {
    NeatsioActions["GET_ONE"] = "neatsioGetOne";
    NeatsioActions["GET_MANY"] = "neatsioGetMany";
    NeatsioActions["QUERY"] = "neatsioQuery";
    NeatsioActions["QUERY_COUNT"] = "neatsioQueryCount";
    NeatsioActions["COUNT"] = "neatsioCount";
    NeatsioActions["CREATE_ONE"] = "neatsioCreateOne";
    NeatsioActions["CREATE_BULK"] = "neatsioCreateBulk";
    NeatsioActions["UPDATE_ONE"] = "neatsioUpdateOne";
    NeatsioActions["UPDATE_BULK"] = "neatsioUpdateBulk";
    NeatsioActions["DELETE_ONE"] = "neatsioDeleteOne";
})(exports.NeatsioActions || (exports.NeatsioActions = {}));

const AccessControl = require('role-acl'); // WTF happens here again with TS import
const accessControlInstance = new AccessControl();
class RightsManager {
    /**
     *
     * @param resource
     */
    constructor(resource) {
        this.resource = resource;
        /**
         *
         */
        this.acl = [];
    }
    /**
     *
     * @param role
     * @param action
     * @param attributes
     * @param condition
     */
    addRight(role, action, attributes = ['*'], condition) {
        const { resource } = this;
        const right = {
            resource,
            role,
            action,
            attributes,
            condition
        };
        this.addRightToAcl(right);
    }
    /**
     *
     * @param acl
     */
    addRightToAcl(right) {
        this.acl.push(right);
    }
    /**
     *
     */
    static applyRights() {
        RightsManager.accessController.setGrants(RightsManager.rights);
    }
    /**
     *
     */
    static registerRightsController(rightsManager) {
        RightsManager.rights.push(...rightsManager.acl);
    }
    /**
     *
     */
    static getRole(user) {
        return RightsManager.roleCallback(user);
    }
}
/**
 *
 */
RightsManager.accessController = accessControlInstance;
/**
 *
 */
RightsManager.rights = [];
/**
 *
 */
RightsManager.roleCallback = (user) => user.role;

// WTF require is needed...
const neatsio = require('@owliehq/neatsio');
/**
 *
 *
 */
function generateRoutes(controller, controllerMetadata) {
    if (!controllerMetadata)
        throw Error('Missing controller configuration');
    const routesMetadata = controllerMetadata.routes || {};
    const middlewares = controllerMetadata.middlewares || {};
    const router = express$1.Router();
    Object.entries(routesMetadata).forEach(([key, meta]) => {
        const currentRouteMiddlewares = (middlewares[key] || []).reverse();
        const handler = meta.handler.bind(controller.instance);
        switch (meta.method) {
            case RouteMethod.GET:
                router.get(meta.path, currentRouteMiddlewares, handler);
                break;
            case RouteMethod.POST:
                router.post(meta.path, currentRouteMiddlewares, handler);
                break;
            case RouteMethod.PUT:
                router.put(meta.path, currentRouteMiddlewares, handler);
                break;
            case RouteMethod.DELETE:
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
        _a.router = express$1.Router(),
        _a.controllerName = controllerName,
        _a.path = `/${controllerName}`,
        _a.instance = new constructor(),
        _a);
    const { name } = constructor;
    //
    MetadataManager.registerController(name);
    const controllerMetadata = MetadataManager.getControllerMetadata(name);
    //
    const routes = generateRoutes(currentControllerClass, controllerMetadata);
    if (params.rights) {
        RightsManager.registerRightsController(params.rights);
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
        app.registerController(currentControllerClass);
    }
    return currentControllerClass;
};
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
            execute: asyncWrapper.asyncWrapper(handler.bind(controller.instance))
        };
    });
}
/**
 *
 */
function getNeatsioRoutesConfig(controllerClass) {
    const instance = new controllerClass();
    const methods = getAllMethods(instance);
    const neatsioActions = Object.values(exports.NeatsioActions);
    return methods
        .filter((method) => neatsioActions.includes(method))
        .reduce((result, action) => {
        const cleanActionName = action.substr(7);
        result[action] = cleanActionName.charAt(0).toLowerCase() + cleanActionName.slice(1);
        return result;
    }, {});
}

const buildMethod = (method) => (subRoute = '/', options = {}) => (target, propertyKey, descriptor) => {
    let handler;
    const obj = MetadataManager.meta;
    const path = `controllers.${target.constructor.name}.routesParameters.${propertyKey}`;
    if (options.requestHandler) {
        let parameters = [];
        if (dotProp.has(obj, path)) {
            parameters = MetadataManager.meta.controllers[target.constructor.name].routesParameters[propertyKey];
        }
        handler = function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const executor = descriptor.value.apply(this, Object.values(parameters).map((param) => param.getValue(req)));
                return executor(req, res);
            });
        };
        dotProp.set(MetadataManager.meta, `controllers.${target.constructor.name}.routes.${propertyKey}`, {
            path: subRoute,
            method,
            requestHandler: true,
            handler
        });
        return;
    }
    handler = function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if (dotProp.has(obj, path)) {
                const parameters = MetadataManager.meta.controllers[target.constructor.name].routesParameters[propertyKey];
                const result = yield descriptor.value.apply(this, Object.values(parameters).map((param) => param.getValue(req)));
                return res.status(200).json(result);
            }
            const result = yield descriptor.value.apply(this);
            res.status(200).json(result);
        });
    };
    dotProp.set(MetadataManager.meta, `controllers.${target.constructor.name}.routes.${propertyKey}`, {
        path: subRoute,
        method,
        handler
    });
};
const Get = buildMethod(RouteMethod.GET);
const Post = buildMethod(RouteMethod.POST);
const Put = buildMethod(RouteMethod.PUT);
const Delete = buildMethod(RouteMethod.DELETE);
const Override = () => { };

///
///
///
function applyBody(parameters, options) {
    const target = parameters[0];
    const key = parameters[1];
    const index = parameters[2];
    dotProp.set(MetadataManager.meta, `controllers.${target.constructor.name}.routesParameters.${key}.${index}`, {
        getValue: (req) => {
            // Without string or object params, return the whole body
            if (!options)
                return req.body;
            const path = typeof options === 'string' ? options : options === null || options === void 0 ? void 0 : options.path;
            if (!path)
                throw new Error(`Options Malformatted`);
            return dotProp.get(req.body, path);
        }
    });
}
function Body(...args) {
    if (args.length > 2) {
        applyBody(args);
        return;
    }
    return (...parameters) => {
        applyBody(parameters, args[0]);
    };
}
///
///
///
function applyParams(parameters, options) {
    const target = parameters[0];
    const key = parameters[1];
    const index = parameters[2];
    dotProp.set(MetadataManager.meta, `controllers.${target.constructor.name}.routesParameters.${key}.${index}`, {
        getValue: (req) => {
            return !options ? req.params : req.params[options];
        }
    });
}
function Params(...args) {
    if (args.length > 2) {
        applyParams(args);
        return;
    }
    return (...parameters) => {
        applyParams(parameters, args[0]);
    };
}
///
///
///
function applyHeader(parameters, options) {
    const target = parameters[0];
    const key = parameters[1];
    const index = parameters[2];
    dotProp.set(MetadataManager.meta, `controllers.${target.constructor.name}.routesParameters.${key}.${index}`, {
        getValue: (req) => {
            return !options ? req.headers : req.headers[options.toLowerCase()];
        }
    });
}
function Header(...args) {
    if (args.length > 2) {
        applyHeader(args);
        return;
    }
    return (...parameters) => {
        applyHeader(parameters, args[0]);
    };
}
///
///
///
function applyQuery(parameters, options) {
    const target = parameters[0];
    const key = parameters[1];
    const index = parameters[2];
    dotProp.set(MetadataManager.meta, `controllers.${target.constructor.name}.routesParameters.${key}.${index}`, {
        getValue: (req) => {
            return !options ? req.query : req.query[options.toLowerCase()];
        }
    });
}
function Query(...args) {
    if (args.length > 2) {
        applyQuery(args);
        return;
    }
    return (...parameters) => {
        applyQuery(parameters, args[0]);
    };
}
/**
 *
 * @param target
 * @param propertyName
 * @param index
 */
function CurrentUser(target, key, index) {
    dotProp.set(MetadataManager.meta, `controllers.${target.constructor.name}.routesParameters.${key}.${index}`, {
        getValue: (req) => {
            return req.user;
        }
    });
}

const authMiddleware = (req, res, next) => {
    passport.authenticate('jwt', (err, user) => {
        if (err)
            return next(err);
        //
        if (!user)
            throw httpErrors.HttpError.Unauthorized({
                message: `Unauthorized Access, token must be provided.`,
                errorCode: 16
            });
        //
        //if (!user.active) throw HttpError.Unauthorized({ message: `Account desactivated.`, errorCode: 17 })
        req.user = user;
        next();
    })(req, res, next);
};

const validationMiddleware = (validations) => {
    const handler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const runValidationPromises = validations.map((validation) => validation.run(req));
        yield Promise.all(runValidationPromises);
        const errors = expressValidator.validationResult(req);
        if (errors.isEmpty()) {
            const data = expressValidator.matchedData(req, { locations: ['body'] });
            // Handle object value from matchedData
            // See issue: https://github.com/express-validator/express-validator/issues/915
            req.body = Array.isArray(req.body) ? Object.values(data) : data;
            return next();
        }
        const result = errors.array().map((error) => {
            return {
                message: error.msg || `Field '${error.param}' is invalid or missing.`,
                field: error.param
            };
        });
        const message = `There's error(s) on param(s).`;
        res.status(422).json({ statusCode: 422, message, errors: result });
    });
    return asyncWrapper.asyncWrapper(handler);
};

const roleMiddleware = (resource, action, prepareContext) => {
    const callback = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const user = req.user;
        if (!user)
            throw Error(`You have not called AuthMiddleware before this one (RoleMiddleware).`);
        const role = yield RightsManager.getRole(user);
        if (!role)
            throw Error(`There's an error with user's role, maybe the callback is not set correctly.`);
        if (!RightsManager.accessController.getRoles().includes(role))
            throw httpErrors.HttpError.Forbidden({
                message: `You don't have the right ACL to execute this action on optional requested resource.`
            });
        const permission = yield RightsManager.accessController
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
            throw httpErrors.HttpError.Forbidden({
                message: `You don't have the right ACL to execute this action on optional requested resource.`
            });
        next();
    });
    return asyncWrapper.asyncWrapper(callback);
};

/**
 *
 * @param middleware
 */
const Middleware = (middleware) => (target, propertyKey, descriptor) => registerMiddleware(target, propertyKey, descriptor, middleware);
/**
 *
 * @param validations
 */
const ValidationMiddleware = (validations) => {
    return Middleware(validationMiddleware(validations));
};
/**
 *
 */
const AuthMiddleware = () => {
    return Middleware(authMiddleware);
};
/**
 *
 */
const RoleMiddleware = () => {
    return (target, propertyKey, descriptor) => {
        const name = target.constructor.name;
        const isController = (name === null || name === void 0 ? void 0 : name.substring(name.length - 10)) === 'Controller';
        if (!isController)
            throw new Error(`Controller name's must finish with "Controller"`);
        const resource = pluralize.singular(name.substring(0, name.length - 10)).toLowerCase();
        const currentRoleMiddleware = roleMiddleware(resource, propertyKey);
        registerMiddleware(target, propertyKey, descriptor, currentRoleMiddleware);
    };
};
/**
 *
 * @param target
 * @param propertyKey
 * @param descriptor
 */
function registerMiddleware(target, propertyKey, descriptor, middleware) {
    const path = `controllers.${target.constructor.name}.middlewares.${propertyKey}`;
    if (!dotProp.has(MetadataManager.meta, path)) {
        dotProp.set(MetadataManager.meta, path, []);
    }
    MetadataManager.meta.controllers[target.constructor.name].middlewares[propertyKey].push(middleware);
}

class Container {
    constructor() {
        this.providers = new Map();
    }
    resolve(target) {
        const name = typeof target === 'string' ? target : target.name;
        const resolved = this.providers.get(name);
        if (!resolved)
            throw new Error(`No provider found for ${target}!`);
        return resolved;
    }
    addProvider(target) {
        this.providers.set(target.name, new target());
    }
}
const providerContainer = new Container();

const Service = () => (constructor) => {
    providerContainer.addProvider(constructor);
    return constructor;
};

function Inject(target, propertyName) {
    const meta = Reflect.getMetadata('design:type', target, propertyName);
    if (!meta)
        throw new Error(`metadata for ${propertyName} in ${target.constructor.name} is not available`);
    Object.defineProperty(target, propertyName, {
        get: () => providerContainer.resolve(meta.name),
        enumerable: true,
        configurable: true
    });
}

// WTF require is needed...
const neatsio$1 = require('@owliehq/neatsio');
const cors = require('cors');
const express = require('express');
class App {
    constructor(debug = false) {
        this.debug = debug;
        /**
         *
         */
        this.controllers = [];
        /**
         *
         */
        this.beforeMiddlewares = [];
        /**
         *
         */
        this.beforeCommonMiddleware = [];
    }
    /**
     *
     */
    get commonMiddlewares() {
        return [
            cors({ origin: true }),
            bodyParser.json({ limit: '10mb' }),
            bodyParser.urlencoded({ extended: false, limit: '10mb' }),
            passport.initialize(),
            (req, res, next) => {
                res.removeHeader('X-Powered-By');
                next();
            }
        ];
    }
    /**
     *
     * @param controller
     */
    registerController(controller) {
        this.controllers.push(controller);
    }
    /**
     *
     */
    get native() {
        const app = express();
        if (this.beforeCommonMiddleware.length)
            app.use(this.beforeCommonMiddleware);
        app.use(this.commonMiddlewares);
        if (this.beforeMiddlewares.length)
            app.use(this.beforeMiddlewares);
        this.controllers.forEach((controller) => {
            app.use(controller.path, controller.router);
        });
        app.use(neatsio$1.routes);
        app.use(httpErrors.errorsMiddleware({ debugServer: true, skipClientError: true }));
        app.use((req, res) => {
            res.status(404).json({
                message: 'Not found.',
                statusCode: 404
            });
        });
        return app;
    }
    /**
     *
     */
    loadControllers(options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.controllers.length)
                throw new Error('Controllers already set');
            //
            const extension = options.tsEnv ? 'ts' : 'js';
            const controllerFound = glob.sync(`**/*Controller.${extension}`, {
                absolute: true,
                deep: 5,
                ignore: ['**/node_modules/**']
            });
            if (this.debug)
                console.log(`${controllerFound.length} controllers found! Importing now...`);
            const promises = controllerFound.map((file) => {
                return new Promise(function (resolve) { resolve(_interopNamespace(require(path.resolve(file)))); }).then(() => {
                    const [controllerName] = file.split('/').slice(-1);
                    if (this.debug)
                        console.log(`${controllerName.slice(0, -3)} has been successfully loaded.`);
                });
            });
            return Promise.all(promises);
        });
    }
    /**
     *
     * @param beforeMiddlewares
     * @param afterMiddlewares
     */
    loadMiddlewares(beforeCommonMiddleware = [], beforeMiddlewares = [], afterMiddlewares = []) {
        this.beforeMiddlewares = beforeMiddlewares;
        this.beforeCommonMiddleware = beforeCommonMiddleware;
    }
    /**
     *
     * @param options
     */
    initNativeApp(options) {
        return __awaiter(this, void 0, void 0, function* () {
            this.reset();
            if (options.passportStrategies) {
                if (!options.passportStrategies.length)
                    throw new Error('Passport needs at least one effective strategy');
                options.passportStrategies.forEach((strategy) => passport.use(strategy));
            }
            if (options.acl) {
                if (options.acl.roleCallback) {
                    RightsManager.roleCallback = options.acl.roleCallback;
                }
            }
            if (options.useBeforeMiddlewares || options.useBeforeCommonMiddlewares) {
                this.loadMiddlewares(options.useBeforeCommonMiddlewares, options.useBeforeMiddlewares);
            }
            const loadControllersOptions = {
                tsEnv: options.tsEnv
            };
            //
            yield this.loadControllers(loadControllersOptions);
            //
            RightsManager.applyRights();
            return this.native;
        });
    }
    /**
     *
     */
    reset() {
        this.controllers = [];
    }
    /**
     *
     */
    /* istanbul ignore next */
    start(options = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const app = yield this.initNativeApp(options);
            return new Promise((resolve, reject) => {
                try {
                    let server;
                    if (options.credentials) {
                        server = https.createServer(options.credentials, app);
                    }
                    else {
                        server = http.createServer(app);
                    }
                    server.listen((options === null || options === void 0 ? void 0 : options.port) || 3000, () => {
                        resolve();
                    });
                }
                catch (err) {
                    reject(err);
                }
            });
        });
    }
}

const app = new App();

exports.App = App;
exports.AuthMiddleware = AuthMiddleware;
exports.Body = Body;
exports.Controller = Controller;
exports.CurrentUser = CurrentUser;
exports.Delete = Delete;
exports.Get = Get;
exports.Header = Header;
exports.Inject = Inject;
exports.Middleware = Middleware;
exports.Override = Override;
exports.Params = Params;
exports.Post = Post;
exports.Put = Put;
exports.Query = Query;
exports.RightsManager = RightsManager;
exports.RoleMiddleware = RoleMiddleware;
exports.Service = Service;
exports.ValidationMiddleware = ValidationMiddleware;
exports.app = app;
exports.authMiddleware = authMiddleware;
exports.providerContainer = providerContainer;
exports.roleMiddleware = roleMiddleware;
exports.validationMiddleware = validationMiddleware;
//# sourceMappingURL=index.js.map
