import { ISequelizeParsedParameters } from './converters';
/**
 *
 */
export default class QueryParser {
    private model;
    private options?;
    private conditions?;
    private limit?;
    private skip?;
    private sort?;
    private select?;
    private populate?;
    constructor(query: any, model: any, options?: any);
    /**
     *
     */
    private get queryParsed();
    /**
     *
     */
    toMongooseParams(): IMongooseParsedParameters;
    /**
     *
     */
    toSequelizeParams(): ISequelizeParsedParameters;
    /**
     *
     * @param conditions
     */
    private parseConditions;
    /**
     *
     * @param select
     */
    private parseSelect;
    /**
     *
     * @param sort
     */
    private parseSort;
    /**
     *
     * @param limit
     */
    private parseLimit;
    /**
     *
     * @param skip
     */
    private parseSkip;
    /**
     *
     * @param populate
     */
    private parsePopulate;
}
/**
 *
 */
export interface IMongooseParsedParameters {
    conditions: {
        [key: string]: any;
    };
    select?: string;
    options: {
        sort?: string;
        limit?: number;
        skip?: number;
    };
    populate?: string;
}
