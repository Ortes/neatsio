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
class MongooseService extends service_1.default {
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
                throw http_errors_1.HttpError.NotFound();
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
exports.default = MongooseService;
//# sourceMappingURL=mongoose-service.js.map