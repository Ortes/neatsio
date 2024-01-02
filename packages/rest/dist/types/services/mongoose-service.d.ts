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
import { Model } from 'mongoose';
import Service from './service';
import QueryParser from '../query-parser';
export default class MongooseService extends Service {
    readonly model: Model<any>;
    /**
     *
     * @param model
     */
    constructor(model: Model<any>);
    /**
     *
     * @param id
     */
    findById(id: string, queryParser?: QueryParser): Promise<any>;
    /**
     *
     */
    find(queryParser: QueryParser): Promise<any[]>;
    /**
     *
     * @param queryParser
     */
    count(queryParser: QueryParser): Promise<void>;
    /**
     *
     * @param body
     */
    createOne(body: any): Promise<any>;
    /**
     *
     * @param id
     * @param body
     */
    updateOne(id: string, body: any): Promise<any>;
    /**
     *
     * @param body
     */
    createBulk(body: any): Promise<any>;
    /**
     *
     * @param body
     * @param query
     */
    updateBulk(body: any, query?: any): Promise<any>;
    /**
     *
     * @param attributes
     */
    setHiddenAttributes(attributes: any): void;
    /**
     *
     * @param id
     */
    deleteOne(id: string): Promise<any>;
    /**
     *
     * @param query
     */
    deleteBulk(query?: QueryParser | undefined): Promise<any>;
    /**
     *
     * @param model
     */
    protected removeHiddenAttributesFromEntity(model: any): any;
    /**
     *
     */
    get associations(): never[];
    /**
     *
     */
    get modelName(): string;
}
