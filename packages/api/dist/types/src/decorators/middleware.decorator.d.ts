import { RequestHandler } from 'express';
/**
 *
 * @param middleware
 */
export declare const Middleware: (middleware: RequestHandler) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 *
 * @param validations
 */
export declare const ValidationMiddleware: (validations: any[]) => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 *
 */
export declare const AuthMiddleware: () => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
/**
 *
 */
export declare const RoleMiddleware: () => (target: any, propertyKey: string, descriptor: PropertyDescriptor) => void;
