/// <reference types="qs" />
import { ErrorRequestHandler } from 'express';
/**
 *
 */
export declare const errorsMiddleware: (options?: any) => ErrorRequestHandler<import("express-serve-static-core").ParamsDictionary, any, any, import("qs").ParsedQs, Record<string, any>>;
