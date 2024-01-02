"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SequelizeConverter = void 0;
const sequelize_1 = require("sequelize");
const pluralize = require("pluralize");
const dot = require("dot-prop");
const utils_1 = require("../utils");
const converter_1 = require("./converter");
const neatsio_rest_1 = require("../neatsio-rest");
class SequelizeConverter extends converter_1.Converter {
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
            const { hiddenAttributes } = neatsio_rest_1.default.servicesOptions.hasOwnProperty(currentModel.name.toLowerCase())
                ? neatsio_rest_1.default.servicesOptions[currentModel.name.toLowerCase()]
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
            $eq: sequelize_1.Op.eq,
            $ne: sequelize_1.Op.ne,
            $gte: sequelize_1.Op.gte,
            $gt: sequelize_1.Op.gt,
            $lte: sequelize_1.Op.lte,
            $lt: sequelize_1.Op.lt,
            $in: sequelize_1.Op.in,
            $nin: sequelize_1.Op.notIn,
            $like: sequelize_1.Op.like,
            $notLike: sequelize_1.Op.notLike,
            $iLike: sequelize_1.Op.iLike,
            $notILike: sequelize_1.Op.notILike,
            $or: sequelize_1.Op.or,
            $and: sequelize_1.Op.and,
            // TODO: verify we are in Postgre env
            $contains: sequelize_1.Op.contains,
            $contained: sequelize_1.Op.contained,
            $overlap: sequelize_1.Op.overlap,
            $any: sequelize_1.Op.any
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
            if (!(0, utils_1.isPlainObject)(conditions))
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
                        const within = (0, sequelize_1.fn)('ST_DWithin', (0, sequelize_1.col)(`${this.model.name}.${key}`), (0, sequelize_1.fn)('ST_GeometryFromText', point), radius);
                        // @ts-ignore
                        result[sequelize_1.Op.and] = (0, sequelize_1.where)(within, true);
                        const order = [(0, sequelize_1.fn)('ST_Distance', (0, sequelize_1.col)(`${this.model.name}.${key}`), (0, sequelize_1.fn)('ST_GeometryFromText', point)), 'ASC'];
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
        const paths = (0, utils_1.normalizePath)((0, utils_1.deconstructPath)(this.populate.split(' '))).filter(path => path.split('.').length < 10);
        const treePaths = {};
        const limitIncluded = neatsio_rest_1.default.config.includeLimit;
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
                    const { hiddenAttributes } = neatsio_rest_1.default.servicesOptions.hasOwnProperty(model.name.toLowerCase())
                        ? neatsio_rest_1.default.servicesOptions[model.name.toLowerCase()]
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
exports.SequelizeConverter = SequelizeConverter;
//# sourceMappingURL=sequelize.converter.js.map