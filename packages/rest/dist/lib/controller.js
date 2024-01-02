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
exports.Controller = void 0;
const pluralize = require("pluralize");
const query_parser_1 = require("./query-parser");
const utils_1 = require("./utils");
/**
 *
 */
class Controller {
    /**
     *
     */
    constructor(service, router, middlewares, customRoutes = [], queryOptions, unauthorizedRoutes = [], routeName) {
        //this.customRoutes = params.routes || []
        this.service = service;
        this.router = router;
        this.middlewares = middlewares;
        this.customRoutes = customRoutes;
        this.queryOptions = queryOptions;
        this.unauthorizedRoutes = unauthorizedRoutes;
        this.routeName = routeName;
        this.setRouteName(routeName);
    }
    /**
     *
     */
    static init(service, router, params) {
        params = params || {};
        const { middlewares, routes, queryOptions, unauthorizedRoutes } = Object.assign({ middlewares: {
                before: [],
                after: [],
                getOne: [],
                getMany: [],
                query: [],
                queryCount: [],
                createOne: [],
                createBulk: [],
                updateOne: [],
                updateBulk: [],
                deleteOne: []
            } }, params);
        return new this(service, router, middlewares, routes, queryOptions, unauthorizedRoutes);
    }
    /**
     * Build all routes via availables methods for the current model
     * DISCLAIMER: call order is important
     */
    buildRoutes() {
        this.buildCustomBeforeMiddlewares();
        this.buildCustomRoutes();
        if (!this.unauthorizedRoutes.includes('count'))
            this.buildCountRoute();
        if (!this.unauthorizedRoutes.includes('query'))
            this.buildQueryRoute();
        if (!this.unauthorizedRoutes.includes('queryCount'))
            this.buildQueryCountRoute();
        if (!this.unauthorizedRoutes.includes('getOne'))
            this.buildGetOneRoute();
        if (!this.unauthorizedRoutes.includes('getMany'))
            this.buildGetManyRoute();
        if (!this.unauthorizedRoutes.includes('createBulk'))
            this.buildBulkPostRoute();
        if (!this.unauthorizedRoutes.includes('createOne'))
            this.buildOnePostRoute();
        if (!this.unauthorizedRoutes.includes('updateBulk'))
            this.buildBulkPutRoute();
        if (!this.unauthorizedRoutes.includes('updateOne'))
            this.buildOnePutRoute();
        if (!this.unauthorizedRoutes.includes('deleteBulk'))
            this.buildBulkDeleteRoute();
        if (!this.unauthorizedRoutes.includes('deleteOne'))
            this.buildOneDeleteRoute();
        this.buildCustomAfterMiddlewares();
    }
    /**
     *
     */
    buildCustomBeforeMiddlewares() {
        var _a, _b;
        if ((_b = (_a = this.middlewares) === null || _a === void 0 ? void 0 : _a.before) === null || _b === void 0 ? void 0 : _b.length)
            this.router.use(this.mainRoute, this.middlewares.before);
    }
    /**
     *
     */
    buildCustomAfterMiddlewares() {
        var _a, _b;
        if ((_b = (_a = this.middlewares) === null || _a === void 0 ? void 0 : _a.after) === null || _b === void 0 ? void 0 : _b.length)
            this.router.use(this.mainRoute, this.middlewares.after);
    }
    /**
     *
     */
    buildCustomRoutes() {
        this.customRoutes.forEach((route) => {
            const middlewares = route.middlewares || [];
            switch (route.method) {
                case 'GET':
                    this.router.get(this.mainRoute + route.path, middlewares, route.execute);
                    break;
                case 'POST':
                    this.router.post(this.mainRoute + route.path, middlewares, route.execute);
                    break;
                case 'PUT':
                    this.router.put(this.mainRoute + route.path, middlewares, route.execute);
                    break;
                case 'DELETE':
                    this.router.delete(this.mainRoute + route.path, middlewares, route.execute);
                    break;
            }
        });
    }
    /**
     * Populate the main router with GET /models/:id route
     */
    buildGetOneRoute() {
        var _a, _b;
        const callback = (0, utils_1.AsyncWrapper)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.service.findById(req.params.id, req.parsedQuery);
            return res.status(200).json(response);
        }));
        const beforeMiddlewares = ((_b = (_a = this.middlewares) === null || _a === void 0 ? void 0 : _a.getOne) === null || _b === void 0 ? void 0 : _b.before) || [];
        this.router.get(this.mainRouteWithId, [...beforeMiddlewares, this.getQueryParserMiddleware(), callback]);
    }
    /**
     * Populate the main router with GET /models route
     * Handle query parameters by passing them to the service
     */
    buildGetManyRoute() {
        var _a, _b;
        const callback = (0, utils_1.AsyncWrapper)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.service.find(req.parsedQuery);
            return res.status(200).json(response);
        }));
        const beforeMiddlewares = ((_b = (_a = this.middlewares) === null || _a === void 0 ? void 0 : _a.getMany) === null || _b === void 0 ? void 0 : _b.before) || [];
        this.router.get(this.mainRoute, [...beforeMiddlewares, this.getQueryParserMiddleware(), callback]);
    }
    /**
     *
     */
    buildCountRoute() {
        var _a, _b;
        const callback = (0, utils_1.AsyncWrapper)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.service.count(req.parsedQuery);
            return res.status(200).json(response);
        }));
        const beforeMiddlewares = ((_b = (_a = this.middlewares) === null || _a === void 0 ? void 0 : _a.count) === null || _b === void 0 ? void 0 : _b.before) || [];
        this.router.get(this.mainRouteWithCount, [...beforeMiddlewares, this.getQueryParserMiddleware(), callback]);
    }
    /**
     *
     */
    buildQueryRoute() {
        var _a, _b;
        const callback = (0, utils_1.AsyncWrapper)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.service.find(req.parsedQuery);
            return res.status(200).json(response);
        }));
        const beforeMiddlewares = ((_b = (_a = this.middlewares) === null || _a === void 0 ? void 0 : _a.query) === null || _b === void 0 ? void 0 : _b.before) || [];
        this.router.post(this.mainRouteWithQuery, [...beforeMiddlewares, this.getQueryParserMiddleware(true), callback]);
    }
    /**
     *
     */
    buildQueryCountRoute() {
        var _a, _b;
        const callback = (0, utils_1.AsyncWrapper)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.service.count(req.parsedQuery);
            return res.status(200).json(response);
        }));
        const beforeMiddlewares = ((_b = (_a = this.middlewares) === null || _a === void 0 ? void 0 : _a.queryCount) === null || _b === void 0 ? void 0 : _b.before) || [];
        this.router.post(this.mainRouteWithQueryCount, [
            ...beforeMiddlewares,
            this.getQueryParserMiddleware(true),
            callback
        ]);
    }
    /**
     *
     */
    buildOnePostRoute() {
        var _a, _b;
        const callback = (0, utils_1.AsyncWrapper)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.service.createOne(req.body, req.parsedQuery);
            return res.status(201).json(response);
        }));
        const beforeMiddlewares = ((_b = (_a = this.middlewares) === null || _a === void 0 ? void 0 : _a.createOne) === null || _b === void 0 ? void 0 : _b.before) || [];
        this.router.post(this.mainRoute, [...beforeMiddlewares, this.getQueryParserMiddleware(), callback]);
    }
    /**
     *
     */
    buildBulkPostRoute() {
        var _a, _b;
        const callback = (0, utils_1.AsyncWrapper)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.service.createBulk(req.body);
            return res.status(201).json(response);
        }));
        const beforeMiddlewares = ((_b = (_a = this.middlewares) === null || _a === void 0 ? void 0 : _a.createBulk) === null || _b === void 0 ? void 0 : _b.before) || [];
        this.router.post(this.mainRouteWithBulk, [...beforeMiddlewares, callback]);
    }
    /**
     *
     */
    buildOnePutRoute() {
        var _a, _b;
        const callback = (0, utils_1.AsyncWrapper)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.service.updateOne(req.params.id, req.body, req.parsedQuery);
            return res.status(200).json(response);
        }));
        const beforeMiddlewares = ((_b = (_a = this.middlewares) === null || _a === void 0 ? void 0 : _a.updateOne) === null || _b === void 0 ? void 0 : _b.before) || [];
        this.router.put(this.mainRouteWithId, [...beforeMiddlewares, this.getQueryParserMiddleware(), callback]);
    }
    /**
     *
     */
    buildBulkPutRoute() {
        var _a, _b;
        const callback = (0, utils_1.AsyncWrapper)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.service.updateBulk(req.body, req.parsedQuery);
            return res.status(200).json(response);
        }));
        const beforeMiddlewares = ((_b = (_a = this.middlewares) === null || _a === void 0 ? void 0 : _a.updateBulk) === null || _b === void 0 ? void 0 : _b.before) || [];
        this.router.put(this.mainRouteWithBulk, [...beforeMiddlewares, this.getQueryParserMiddleware(), callback]);
    }
    /**
     *
     */
    buildOneDeleteRoute() {
        var _a, _b;
        const callback = (0, utils_1.AsyncWrapper)((req, res) => __awaiter(this, void 0, void 0, function* () {
            yield this.service.deleteOne(req.params.id);
            return res.status(200).json();
        }));
        const beforeMiddlewares = ((_b = (_a = this.middlewares) === null || _a === void 0 ? void 0 : _a.deleteOne) === null || _b === void 0 ? void 0 : _b.before) || [];
        this.router.delete(this.mainRouteWithId, [...beforeMiddlewares, callback]);
    }
    /**
     *
     */
    buildBulkDeleteRoute() {
        var _a, _b;
        const callback = (0, utils_1.AsyncWrapper)((req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield this.service.deleteBulk(req.parsedQuery);
            return res.status(200).json({ count: response });
        }));
        const beforeMiddlewares = ((_b = (_a = this.middlewares) === null || _a === void 0 ? void 0 : _a.deleteBulk) === null || _b === void 0 ? void 0 : _b.before) || [];
        this.router.delete(this.mainRouteWithBulk, [...beforeMiddlewares, this.getQueryParserMiddleware(), callback]);
    }
    /**
     *
     */
    getQueryParserMiddleware(body = false) {
        const middleware = (0, utils_1.AsyncWrapper)((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const toBeParsed = body ? req.body : req.query;
            req.parsedQuery = new query_parser_1.default(toBeParsed, this.service.model, { body });
            return next();
        }));
        return middleware;
    }
    /**
     *
     * @param routeName
     */
    setRouteName(routeName) {
        this.routeName = routeName || pluralize.plural(this.service.modelName).toLowerCase();
    }
    /**
     * Create route string from model name
     * Useful for GET / POST methods
     */
    get mainRoute() {
        return '/' + this.routeName;
    }
    /**
     * Create subroute string with id param from mainRoute
     * Useful for GET / PUT / DELETE methods
     */
    get mainRouteWithId() {
        return this.mainRoute + '/:id';
    }
    /**
     * Create subroute string with id param from mainRoute
     * Useful for GET / PUT / DELETE methods
     */
    get mainRouteWithBulk() {
        return this.mainRoute + '/bulk';
    }
    get mainRouteWithQuery() {
        return this.mainRoute + '/query';
    }
    get mainRouteWithQueryCount() {
        return this.mainRoute + '/query/count';
    }
    /**
     * Create subroute string with count from mainRoute
     * Useful for GET method
     */
    get mainRouteWithCount() {
        return this.mainRoute + '/count';
    }
}
exports.Controller = Controller;
//# sourceMappingURL=controller.js.map