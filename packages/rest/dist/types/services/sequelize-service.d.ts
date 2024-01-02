import { Model } from 'sequelize';
import Service from './service';
import QueryParser from '../query-parser';
export default class SequelizeService<M extends Model> extends Service {
    readonly model: {
        new (): M;
    } & typeof Model;
    /**
     *
     * @param model
     */
    constructor(model: {
        new (): M;
    } & typeof Model);
    /**
     *
     * @param id
     */
    findById(id: string, query?: QueryParser): Promise<Model<{}, {}>>;
    /**
     *
     */
    find(query?: QueryParser): Promise<Model<{}, {}>[]>;
    /**
     *
     */
    count(query?: QueryParser): Promise<number>;
    /**
     *
     * @param body
     */
    createOne(body: any, query?: QueryParser): Promise<Model<{}, {}>>;
    /**
     *
     * @param body
     */
    createBulk(body: any): Promise<void>;
    /**
     * Update an entity by the primary key (mostly id)
     * @param body
     */
    updateOne(id: string, body: any, query?: QueryParser): Promise<Model<{}, {}>>;
    /**
     * Update multiple entities by query
     * @param body
     * @param query
     */
    updateBulk(body: any, query?: QueryParser): Promise<void>;
    /**
     *
     * @param id
     */
    deleteOne(id: string): Promise<void>;
    /**
     *
     * @param query
     */
    deleteBulk(query?: QueryParser): Promise<any>;
    /**
     *
     * @param attributes
     */
    setHiddenAttributes(attributes: any): void;
    /**
     *
     * @param model
     */
    protected removeHiddenAttributesFromEntity(entity: Model): any;
    /**
     *
     */
    get associations(): Array<any>;
    /**
     *
     */
    get modelName(): string;
}
