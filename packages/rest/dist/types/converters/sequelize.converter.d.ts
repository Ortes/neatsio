import { Model } from 'sequelize';
import { Converter, ParsedQuery } from './converter';
export declare class SequelizeConverter extends Converter {
    private model;
    /**
     *
     */
    private specialSort;
    /**
     *
     * @param query
     */
    constructor(query: ParsedQuery, model: {
        new (): Model;
    } & typeof Model);
    /**
     *
     */
    toParams(options: any): ISequelizeParsedParameters;
    /**
     *
     */
    private convertSelect;
    /**
     *
     */
    private convertSort;
    /**
     *
     */
    private convertConditions;
    /**
     *
     */
    private convertPopulate;
    /**
     *
     */
    static convert(query: ParsedQuery, model: {
        new (): Model;
    } & typeof Model, options: any): ISequelizeParsedParameters;
}
export interface ISequelizeParsedParameters {
    attributes?: Array<string>;
    where?: {
        [key: string]: any;
    };
    order: Array<any>;
    limit?: number;
    offset?: number;
    include?: Array<any>;
}
