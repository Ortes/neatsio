"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const controller_1 = require("./controller");
const utils_1 = require("./utils");
const configuration_1 = require("./configuration");
/**
 *
 */
class Orchestrator {
    constructor() {
        /**
         * Map of controllers registred by routeName
         */
        this.controllers = {};
        /**
         *
         */
        this.config = new configuration_1.Configuration();
        /**
         * Express router
         */
        this.router = express.Router();
    }
    /**
     * Expose finally routes
     */
    get routes() {
        this.buildRoutes();
        return this.router;
    }
    /**
     * Allow to record the models, one by one with verification of duplicate contents
     * Init and create afferent controller (by model name)
     */
    registerModel(model, controllerParams) {
        const service = utils_1.modelIdentifier.getServiceFromModel(model);
        // TODO: Do something in other place with that
        service.setHiddenAttributes((controllerParams === null || controllerParams === void 0 ? void 0 : controllerParams.hiddenAttributes) || []);
        this.controllers[service.modelName] = controller_1.Controller.init(service, this.router, controllerParams);
    }
    /**
     * Prepare a router with all REST Routes, handling errors
     * And expose the router, must be exposed in a seperate getter
     */
    buildRoutes() {
        // We go through current controllers and build REST routes one by one
        Object.values(this.controllers).forEach(controller => {
            controller.buildRoutes();
        });
    }
    /**
     * Get models
     */
    get models() {
        return Object.values(this.controllers).reduce((result, controller) => {
            result[controller.service.modelName] = controller.service.model;
            return result;
        }, {});
    }
    /**
     *
     */
    get servicesOptions() {
        return Object.values(this.controllers).reduce((result, controller) => {
            const { hiddenAttributes } = controller.service;
            result[controller.service.modelName] = {
                hiddenAttributes: hiddenAttributes || []
            };
            return result;
        }, {});
    }
    /**
     *
     */
    reset() {
        this.controllers = {};
        this.router = express.Router();
    }
}
exports.default = Orchestrator;
//# sourceMappingURL=orchestrator.js.map