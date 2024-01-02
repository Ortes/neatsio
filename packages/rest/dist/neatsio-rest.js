'use strict';

var express = require('express');
var sequelize = require('sequelize');
var pluralize = require('pluralize');
var dot = require('dot-prop');
var httpErrors = require('@owliehq/http-errors');
var mongoose = require('mongoose');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

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

function isPlainObject(obj) {
    return obj && obj.constructor === {}.constructor;
}

class Service {
}

class MongooseService extends Service {
    /**
     *
     * @param model
     */
    constructor(model) {
        super();
        this.model = model;
    }
    /**
     *
     * @param id
     */
    findById(id, queryParser) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = this.model.findById(id);
            if (queryParser) {
                const { populate } = queryParser.toMongooseParams();
                // @ts-ignore
                query = populate ? query.deepPopulate(populate) : query;
            }
            const result = yield query.exec();
            if (!result)
                throw httpErrors.HttpError.NotFound();
            return result;
        });
    }
    /**
     *
     */
    find(queryParser) {
        return __awaiter(this, void 0, void 0, function* () {
            const { conditions, select, options, populate } = queryParser.toMongooseParams();
            let query = this.model.find(conditions, select, options);
            // @ts-ignore
            query = populate ? query.deepPopulate(populate) : query;
            try {
                const result = yield query.exec();
                return result;
            }
            catch (err) {
                console.error(err);
                throw err;
            }
        });
    }
    /**
     *
     * @param queryParser
     */
    count(queryParser) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Not implemented');
        });
    }
    /**
     *
     * @param body
     */
    createOne(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const created = yield this.model.create(body);
            return created;
        });
    }
    /**
     *
     * @param id
     * @param body
     */
    updateOne(id, body) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.updateOne({ _id: id }, body);
            const updated = yield this.findById(id);
            return updated;
        });
    }
    /**
     *
     * @param body
     */
    createBulk(body) {
        throw new Error('Method not implemented.');
    }
    /**
     *
     * @param body
     * @param query
     */
    updateBulk(body, query) {
        throw new Error('Method not implemented.');
    }
    /**
     *
     * @param attributes
     */
    setHiddenAttributes(attributes) {
        this.hiddenAttributes = attributes;
    }
    /**
     *
     * @param id
     */
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.deleteOne({ _id: id });
            return { deletedAt: new Date() };
        });
    }
    /**
     *
     * @param query
     */
    deleteBulk(query) {
        return __awaiter(this, void 0, void 0, function* () {
            throw new Error('Method not implemented.');
        });
    }
    /**
     *
     * @param model
     */
    removeHiddenAttributesFromEntity(model) {
        return model;
    }
    /**
     *
     */
    get associations() {
        // TODO
        return [];
    }
    /**
     *
     */
    get modelName() {
        return this.model.modelName.toLowerCase();
    }
}

class SequelizeService extends Service {
    /**
     *
     * @param model
     */
    constructor(model) {
        super();
        this.model = model;
    }
    /**
     *
     * @param id
     */
    findById(id, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { include, attributes } = (query === null || query === void 0 ? void 0 : query.toSequelizeParams()) || {};
            const result = yield this.model.findByPk(id, { include, attributes });
            if (!result)
                throw httpErrors.HttpError.NotFound();
            return result;
        });
    }
    /**
     *
     */
    find(query) {
        return __awaiter(this, void 0, void 0, function* () {
            //
            const queryParams = query === null || query === void 0 ? void 0 : query.toSequelizeParams();
            const { count, rows } = yield this.model.findAndCountAll(queryParams);
            return rows;
        });
    }
    /**
     *
     */
    count(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { where } = (query === null || query === void 0 ? void 0 : query.toSequelizeParams()) || {};
            const result = yield this.model.count({ where });
            return result;
        });
    }
    /**
     *
     * @param body
     */
    createOne(body, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { [this.model.primaryKeyAttribute]: id } = yield this.model.create(body);
            const result = yield this.findById(id, query);
            return result;
        });
    }
    /**
     *
     * @param body
     */
    createBulk(body) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.model.bulkCreate(body);
        });
    }
    /**
     * Update an entity by the primary key (mostly id)
     * @param body
     */
    updateOne(id, body, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const entityBeforeUpdate = yield this.findById(id);
            yield entityBeforeUpdate.update(body);
            const result = yield this.findById(id, query);
            return result;
        });
    }
    /**
     * Update multiple entities by query
     * @param body
     * @param query
     */
    updateBulk(body, query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { where } = (query === null || query === void 0 ? void 0 : query.toSequelizeParams()) || {};
            const restriction = where ? { where } : { where: { 1: 1 } };
            yield this.model.update(body, restriction);
        });
    }
    /**
     *
     * @param id
     */
    deleteOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const entityBeforeDeletion = yield this.findById(id);
            yield entityBeforeDeletion.destroy();
        });
    }
    /**
     *
     * @param query
     */
    deleteBulk(query) {
        return __awaiter(this, void 0, void 0, function* () {
            const { where } = (query === null || query === void 0 ? void 0 : query.toSequelizeParams()) || {};
            const restriction = where ? { where } : { where: { 1: 1 } };
            const count = yield this.model.destroy(restriction);
            return count;
        });
    }
    /**
     *
     * @param attributes
     */
    setHiddenAttributes(attributes) {
        this.hiddenAttributes = attributes;
    }
    /**
     *
     * @param model
     */
    removeHiddenAttributesFromEntity(entity) {
        const values = entity.toJSON();
        this.hiddenAttributes.forEach((attribute) => {
            if (values[attribute])
                delete values[attribute];
        });
        return values;
    }
    /**
     *
     */
    get associations() {
        return Object.values(this.model.associations)
            .filter(association => association.associationType === 'HasMany')
            .map(association => {
            return {
                model: association.target,
                foreignKey: association.foreignKey
            };
        });
    }
    /**
     *
     */
    get modelName() {
        return this.model.name.toLowerCase();
    }
}

var modelIdentifier = {
    /**
     *
     * @param model
     */
    getServiceFromModel(model) {
        return model.prototype instanceof mongoose.Model
            ? new MongooseService(model)
            : new SequelizeService(model);
    }
};

/**
 *
 * @param paths
 */
function deconstructPath(paths) {
    const _paths = [];
    paths.forEach(path => {
        let currentPath = null;
        path.split('.').forEach(function (subpath) {
            currentPath = (currentPath ? currentPath + '.' : '') + subpath.trim();
            _paths.push(currentPath);
        });
    });
    return _paths;
}
/**
 *
 * @param paths
 */
function normalizePath(paths) {
    return paths
        .map(function (path) {
        return path.trim();
    })
        .filter(function (path) {
        return path !== '';
    })
        .filter(function (path, index, self) {
        return self.indexOf(path) === index;
    }); // removes duplicates
}

class Converter {
    constructor(query) {
        this.conditions = query.conditions;
        this.limit = query.limit;
        this.skip = query.skip;
        this.sort = query.sort;
        this.select = query.select;
        this.populate = query.populate;
    }
}

class SequelizeConverter extends Converter {
    /**
     *
     * @param query
     */
    constructor(query, model) {
        super(query);
        this.model = model;
        /**
         *
         */
        this.specialSort = [];
    }
    /**
     *
     */
    toParams(options) {
        const params = {
            order: []
        };
        params.attributes = this.convertSelect();
        if (this.conditions)
            params.where = this.convertConditions(options === null || options === void 0 ? void 0 : options.inverseLngLat);
        if (this.limit)
            params.limit = this.limit;
        if (this.skip)
            params.offset = this.skip;
        if (this.sort || this.specialSort.length)
            params.order = this.convertSort();
        if (this.populate)
            params.include = this.convertPopulate();
        return params;
    }
    /**
     *
     */
    convertSelect() {
        var _a;
        const selection = ((_a = this.select) === null || _a === void 0 ? void 0 : _a.length) ? this.select.split(' ') : [];
        const currentModel = this.model;
        let attributes = undefined;
        if (currentModel) {
            const { hiddenAttributes } = orchestrator.servicesOptions.hasOwnProperty(currentModel.name.toLowerCase())
                ? orchestrator.servicesOptions[currentModel.name.toLowerCase()]
                : { hiddenAttributes: [] };
            const currentAttributes = Object.keys(currentModel.rawAttributes);
            attributes = currentAttributes
                .filter(x => !hiddenAttributes.includes(x))
                .concat(hiddenAttributes.filter((x) => !currentAttributes.includes(x)));
            if (selection.length)
                attributes = attributes.filter(x => selection.includes(x));
        }
        return attributes;
    }
    /**
     *
     */
    convertSort() {
        const fields = this.sort ? this.sort.split(' ') : [];
        //
        return [
            ...fields.map((field) => {
                const order = field.startsWith('-') ? 'DESC' : 'ASC';
                return order === 'DESC' ? [field.substring(1), order] : [field, order];
            }),
            ...this.specialSort
        ];
    }
    /**
     *
     */
    convertConditions(options) {
        const sequelizeOperators = {
            $eq: sequelize.Op.eq,
            $ne: sequelize.Op.ne,
            $gte: sequelize.Op.gte,
            $gt: sequelize.Op.gt,
            $lte: sequelize.Op.lte,
            $lt: sequelize.Op.lt,
            $in: sequelize.Op.in,
            $nin: sequelize.Op.notIn,
            $like: sequelize.Op.like,
            $notLike: sequelize.Op.notLike,
            $iLike: sequelize.Op.iLike,
            $notILike: sequelize.Op.notILike,
            $or: sequelize.Op.or,
            $and: sequelize.Op.and,
            // TODO: verify we are in Postgre env
            $contains: sequelize.Op.contains,
            $contained: sequelize.Op.contained,
            $overlap: sequelize.Op.overlap,
            $any: sequelize.Op.any
        };
        /**
         *
         * @param conditions
         */
        const convert = (conditions) => {
            //
            if (Array.isArray(conditions))
                return conditions.map(convert);
            //
            if (!isPlainObject(conditions))
                return conditions;
            //
            const converted = Object.keys(conditions).reduce((result, prop) => {
                const value = conditions[prop];
                const key = sequelizeOperators[prop] || prop;
                //
                if (value === undefined)
                    throw new Error('NO UNDEFINED VALUE');
                //
                if (value === null) {
                    result[key] = null;
                    return result;
                }
                //
                if (value.hasOwnProperty('$near')) {
                    const nearParams = value.$near;
                    const radius = nearParams.radius || 10;
                    if (nearParams.lat && nearParams.lng) {
                        const point = (options === null || options === void 0 ? void 0 : options.inverseLngLat)
                            ? `POINT(${nearParams.lat} ${nearParams.lng})`
                            : `POINT(${nearParams.lng} ${nearParams.lat})`;
                        const within = sequelize.fn('ST_DWithin', sequelize.col(`${this.model.name}.${key}`), sequelize.fn('ST_GeometryFromText', point), radius);
                        // @ts-ignore
                        result[sequelize.Op.and] = sequelize.where(within, true);
                        const order = [sequelize.fn('ST_Distance', sequelize.col(`${this.model.name}.${key}`), sequelize.fn('ST_GeometryFromText', point)), 'ASC'];
                        this.specialSort.push(order);
                    }
                    return result;
                }
                result[key] = convert(value);
                return result;
            }, {});
            return converted;
        };
        return convert(this.conditions);
    }
    /**
     *
     */
    convertPopulate() {
        const paths = normalizePath(deconstructPath(this.populate.split(' '))).filter(path => path.split('.').length < 10);
        const treePaths = {};
        const limitIncluded = orchestrator.config.includeLimit;
        paths.forEach(path => dot.set(treePaths, path, true));
        const toIncludePropertyRecursive = (tree, modelCheck) => {
            const currentModel = modelCheck;
            return Object.keys(tree).map(entry => {
                let extractedModel;
                let associationType;
                for (let [attribute, association] of Object.entries(currentModel.associations)) {
                    if (pluralize.singular(attribute) === pluralize.singular(entry)) {
                        associationType = association.associationType;
                        extractedModel = association.target;
                        break;
                    }
                }
                //
                const model = extractedModel;
                let attributes = undefined;
                if (model) {
                    const { hiddenAttributes } = orchestrator.servicesOptions.hasOwnProperty(model.name.toLowerCase())
                        ? orchestrator.servicesOptions[model.name.toLowerCase()]
                        : { hiddenAttributes: [] };
                    const currentAttributes = Object.keys(model.rawAttributes);
                    attributes = currentAttributes
                        .filter(x => !hiddenAttributes.includes(x))
                        .concat(hiddenAttributes.filter((x) => !currentAttributes.includes(x)));
                }
                const includeConfig = {
                    model,
                    as: entry,
                    attributes
                };
                //
                if (tree[entry] !== true)
                    includeConfig.include = toIncludePropertyRecursive(tree[entry], model);
                //
                if (associationType === 'HasMany') {
                    includeConfig.limit = limitIncluded;
                    includeConfig.separate = true;
                }
                return includeConfig;
            });
        };
        return toIncludePropertyRecursive(treePaths, this.model);
    }
    /**
     *
     */
    static convert(query, model, options) {
        const currentConvert = new this(query, model);
        return currentConvert.toParams(options);
    }
}

/**
 *
 */
class QueryParser {
    constructor(query, model, options) {
        this.model = model;
        this.options = options;
        this.parseConditions(query.$conditions);
        this.parseSelect(query.$select);
        this.parseLimit(query.$limit);
        this.parseSkip(query.$skip);
        this.parseSort(query.$sort);
        this.parsePopulate(query.$populate);
    }
    /**
     *
     */
    get queryParsed() {
        const { select, conditions, limit, skip, sort, populate } = this;
        return { select, conditions, limit, skip, sort, populate };
    }
    /**
     *
     */
    toMongooseParams() {
        // TODO: make to converter!
        const params = {
            conditions: {},
            options: {}
        };
        if (this.select)
            params.select = this.select;
        if (this.conditions)
            params.conditions = this.conditions;
        if (this.limit)
            params.options.limit = this.limit;
        if (this.skip)
            params.options.skip = this.skip;
        if (this.sort)
            params.options.sort = this.sort;
        if (this.populate)
            params.populate = this.populate;
        return params;
    }
    /**
     *
     */
    toSequelizeParams() {
        return SequelizeConverter.convert(this.queryParsed, this.model, this.options);
    }
    /**
     *
     * @param conditions
     */
    parseConditions(conditions) {
        try {
            this.conditions = {};
            if (conditions)
                this.conditions = this.options.body ? conditions : JSON.parse(conditions);
        }
        catch (err) {
            throw httpErrors.HttpError.BadRequest('Malformatted JSON');
        }
    }
    /**
     *
     * @param select
     */
    parseSelect(select) {
        if (!select)
            return;
        this.select = select;
    }
    /**
     *
     * @param sort
     */
    parseSort(sort) {
        if (!sort)
            return;
        this.sort = sort;
    }
    /**
     *
     * @param limit
     */
    parseLimit(limit) {
        if (!limit)
            return;
        this.limit = parseInt(limit, 10);
    }
    /**
     *
     * @param skip
     */
    parseSkip(skip) {
        if (!skip)
            return;
        this.skip = parseInt(skip, 10);
    }
    /**
     *
     * @param populate
     */
    parsePopulate(populate) {
        if (!populate)
            return;
        this.populate = populate;
    }
}

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
        const callback = asyncWrapper((req, res) => __awaiter(this, void 0, void 0, function* () {
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
        const callback = asyncWrapper((req, res) => __awaiter(this, void 0, void 0, function* () {
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
        const callback = asyncWrapper((req, res) => __awaiter(this, void 0, void 0, function* () {
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
        const callback = asyncWrapper((req, res) => __awaiter(this, void 0, void 0, function* () {
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
        const callback = asyncWrapper((req, res) => __awaiter(this, void 0, void 0, function* () {
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
        const callback = asyncWrapper((req, res) => __awaiter(this, void 0, void 0, function* () {
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
        const callback = asyncWrapper((req, res) => __awaiter(this, void 0, void 0, function* () {
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
        const callback = asyncWrapper((req, res) => __awaiter(this, void 0, void 0, function* () {
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
        const callback = asyncWrapper((req, res) => __awaiter(this, void 0, void 0, function* () {
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
        const callback = asyncWrapper((req, res) => __awaiter(this, void 0, void 0, function* () {
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
        const callback = asyncWrapper((req, res) => __awaiter(this, void 0, void 0, function* () {
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
        const middleware = asyncWrapper((req, res, next) => __awaiter(this, void 0, void 0, function* () {
            const toBeParsed = body ? req.body : req.query;
            req.parsedQuery = new QueryParser(toBeParsed, this.service.model, { body });
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

class Configuration {
    // TODO: interface & throwing errors
    constructor(options = {}) {
        this.includeLimit = 50;
        options = options || {};
        this.includeLimit = options.includeLimit || 100;
    }
}

/**
 *
 */
class Orchestrator {
    constructor() {
        /**
         * Map of controllers registred by routeName
         */
        this.controllers = {};
        /**
         *
         */
        this.config = new Configuration();
        /**
         * Express router
         */
        this.router = express.Router();
    }
    /**
     * Expose finally routes
     */
    get routes() {
        this.buildRoutes();
        return this.router;
    }
    /**
     * Allow to record the models, one by one with verification of duplicate contents
     * Init and create afferent controller (by model name)
     */
    registerModel(model, controllerParams) {
        const service = modelIdentifier.getServiceFromModel(model);
        // TODO: Do something in other place with that
        service.setHiddenAttributes((controllerParams === null || controllerParams === void 0 ? void 0 : controllerParams.hiddenAttributes) || []);
        this.controllers[service.modelName] = Controller.init(service, this.router, controllerParams);
    }
    /**
     * Prepare a router with all REST Routes, handling errors
     * And expose the router, must be exposed in a seperate getter
     */
    buildRoutes() {
        // We go through current controllers and build REST routes one by one
        Object.values(this.controllers).forEach(controller => {
            controller.buildRoutes();
        });
    }
    /**
     * Get models
     */
    get models() {
        return Object.values(this.controllers).reduce((result, controller) => {
            result[controller.service.modelName] = controller.service.model;
            return result;
        }, {});
    }
    /**
     *
     */
    get servicesOptions() {
        return Object.values(this.controllers).reduce((result, controller) => {
            const { hiddenAttributes } = controller.service;
            result[controller.service.modelName] = {
                hiddenAttributes: hiddenAttributes || []
            };
            return result;
        }, {});
    }
    /**
     *
     */
    reset() {
        this.controllers = {};
        this.router = express.Router();
    }
}

mongoose.plugin(require('mongoose-deep-populate')(mongoose));
const orchestrator = new Orchestrator();

module.exports = orchestrator;
//# sourceMappingURL=neatsio-rest.js.map
