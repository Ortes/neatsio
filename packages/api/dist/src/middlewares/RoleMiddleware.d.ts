/// <reference types="qs" />
/// <reference types="express" />
export declare const roleMiddleware: (resource: string, action: string, prepareContext?: Function) => import("express").RequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
