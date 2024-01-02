/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import * as mongoose from 'mongoose';
import * as sequelize from 'sequelize';
import MongooseService from '../services/mongoose-service';
import SequelizeService from '../services/sequelize-service';
export type NeatsioModel<M> = MongooseModel | SequelizeModel<M>;
export type MongooseModel = mongoose.Model<any>;
export type SequelizeModel<M> = {
    new (): M;
} & typeof sequelize.Model;
declare const _default: {
    /**
     *
     * @param model
     */
    getServiceFromModel<M extends sequelize.Model<any, any>>(model: NeatsioModel<M>): MongooseService | SequelizeService<sequelize.Model<{}, {}>>;
};
export default _default;
