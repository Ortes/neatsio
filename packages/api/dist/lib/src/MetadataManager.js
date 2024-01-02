"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MetadataManager = void 0;
class MetadataManager {
    /**
     *
     * @param controllerName
     */
    static registerController(controllerName) {
        MetadataManager.meta.controllers[controllerName] = MetadataManager.meta.controllers[controllerName] || {};
    }
    /**
     *
     * @param controllerName
     */
    static getControllerMetadata(controllerName) {
        return MetadataManager.meta.controllers[controllerName];
    }
}
exports.MetadataManager = MetadataManager;
/**
 *
 */
MetadataManager.meta = {
    controllers: {}
};
//# sourceMappingURL=MetadataManager.js.map