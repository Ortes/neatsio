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
exports.App = void 0;
const bodyParser = require("body-parser");
const path = require("path");
const passport = require("passport");
const glob = require("fast-glob");
const http_errors_1 = require("@owliehq/http-errors");
const RightsManager_1 = require("./RightsManager");
const https = require("https");
const http = require("http");
// WTF require is needed...
const neatsio = require('@owliehq/neatsio');
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
        app.use(neatsio.routes);
        app.use((0, http_errors_1.errorsMiddleware)({ debugServer: true, skipClientError: true }));
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
                return Promise.resolve(`${path.resolve(file)}`).then(s => require(s)).then(() => {
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
                    RightsManager_1.RightsManager.roleCallback = options.acl.roleCallback;
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
            RightsManager_1.RightsManager.applyRights();
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
exports.App = App;
//# sourceMappingURL=app.js.map