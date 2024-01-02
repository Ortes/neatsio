import * as sequelize from 'sequelize';
import * as express from 'express';
import { NeatsioModel } from './utils';
import { Configuration } from './configuration';
/**
 *
 */
export default class Orchestrator {
    /**
     * Map of controllers registred by routeName
     */
    private controllers;
    /**
     *
     */
    config: Configuration;
    /**
     * Express router
     */
    private router;
    /**
     * Expose finally routes
     */
    get routes(): express.Router;
    /**
     * Allow to record the models, one by one with verification of duplicate contents
     * Init and create afferent controller (by model name)
     */
    registerModel<M extends sequelize.Model>(model: NeatsioModel<M>, controllerParams?: any): void;
    /**
     * Prepare a router with all REST Routes, handling errors
     * And expose the router, must be exposed in a seperate getter
     */
    private buildRoutes;
    /**
     * Get models
     */
    get models(): any;
    /**
     *
     */
    get servicesOptions(): any;
    /**
     *
     */
    reset(): void;
}
