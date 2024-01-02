import { Router } from 'express';
import Service from './services/service';
declare global {
    namespace Express {
        interface Request {
            parsedQuery: any;
            results?: any;
        }
    }
}
/**
 *
 */
export declare class Controller {
    readonly service: Service;
    readonly router: Router;
    private middlewares;
    private customRoutes;
    private queryOptions;
    private unauthorizedRoutes;
    private routeName?;
    /**
     *
     */
    constructor(service: Service, router: Router, middlewares: any, customRoutes: any, queryOptions: any, unauthorizedRoutes?: Array<String>, routeName?: string | undefined);
    /**
     *
     */
    static init<T extends typeof Controller>(this: T, service: Service, router: Router, params?: any): InstanceType<T>;
    /**
     * Build all routes via availables methods for the current model
     * DISCLAIMER: call order is important
     */
    buildRoutes(): void;
    /**
     *
     */
    private buildCustomBeforeMiddlewares;
    /**
     *
     */
    private buildCustomAfterMiddlewares;
    /**
     *
     */
    private buildCustomRoutes;
    /**
     * Populate the main router with GET /models/:id route
     */
    private buildGetOneRoute;
    /**
     * Populate the main router with GET /models route
     * Handle query parameters by passing them to the service
     */
    private buildGetManyRoute;
    /**
     *
     */
    private buildCountRoute;
    /**
     *
     */
    private buildQueryRoute;
    /**
     *
     */
    private buildQueryCountRoute;
    /**
     *
     */
    private buildOnePostRoute;
    /**
     *
     */
    private buildBulkPostRoute;
    /**
     *
     */
    private buildOnePutRoute;
    /**
     *
     */
    private buildBulkPutRoute;
    /**
     *
     */
    private buildOneDeleteRoute;
    /**
     *
     */
    private buildBulkDeleteRoute;
    /**
     *
     */
    private getQueryParserMiddleware;
    /**
     *
     * @param routeName
     */
    private setRouteName;
    /**
     * Create route string from model name
     * Useful for GET / POST methods
     */
    private get mainRoute();
    /**
     * Create subroute string with id param from mainRoute
     * Useful for GET / PUT / DELETE methods
     */
    private get mainRouteWithId();
    /**
     * Create subroute string with id param from mainRoute
     * Useful for GET / PUT / DELETE methods
     */
    private get mainRouteWithBulk();
    private get mainRouteWithQuery();
    private get mainRouteWithQueryCount();
    /**
     * Create subroute string with count from mainRoute
     * Useful for GET method
     */
    private get mainRouteWithCount();
}
