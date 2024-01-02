import { Application } from 'express';
import { InitAppNativeOptions } from './interfaces/App';
export declare class App {
    private debug;
    constructor(debug?: boolean);
    /**
     *
     */
    private controllers;
    /**
     *
     */
    private beforeMiddlewares;
    /**
     *
     */
    private beforeCommonMiddleware;
    /**
     *
     */
    private get commonMiddlewares();
    /**
     *
     * @param controller
     */
    registerController(controller: any): void;
    /**
     *
     */
    get native(): any;
    /**
     *
     */
    loadControllers(options?: any): Promise<void[]>;
    /**
     *
     * @param beforeMiddlewares
     * @param afterMiddlewares
     */
    private loadMiddlewares;
    /**
     *
     * @param options
     */
    initNativeApp(options: InitAppNativeOptions): Promise<Application>;
    /**
     *
     */
    reset(): void;
    /**
     *
     */
    start(options?: InitAppNativeOptions): Promise<void>;
}
