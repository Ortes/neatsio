"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const http_errors_1 = require("@owliehq/http-errors");
const converters_1 = require("./converters");
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
        return converters_1.SequelizeConverter.convert(this.queryParsed, this.model, this.options);
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
            throw http_errors_1.HttpError.BadRequest('Malformatted JSON');
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
exports.default = QueryParser;
//# sourceMappingURL=query-parser.js.map