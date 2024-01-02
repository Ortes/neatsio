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
const http_errors_1 = require("@owliehq/http-errors");
const service_1 = require("./service");
class SequelizeService extends service_1.default {
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
                throw http_errors_1.HttpError.NotFound();
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
exports.default = SequelizeService;
//# sourceMappingURL=sequelize-service.js.map