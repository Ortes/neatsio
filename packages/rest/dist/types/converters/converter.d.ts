export declare abstract class Converter {
    protected conditions?: any;
    protected limit?: any;
    protected skip?: any;
    protected sort?: any;
    protected select?: any;
    protected populate?: any;
    constructor(query: ParsedQuery);
    abstract toParams(options?: any): any;
}
export interface ParsedQuery {
    conditions?: any;
    skip?: any;
    sort?: any;
    limit?: any;
    select?: any;
    populate?: any;
}
