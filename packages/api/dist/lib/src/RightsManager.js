"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RightsManager = void 0;
const AccessControl = require('role-acl'); // WTF happens here again with TS import
const accessControlInstance = new AccessControl();
class RightsManager {
    /**
     *
     * @param resource
     */
    constructor(resource) {
        this.resource = resource;
        /**
         *
         */
        this.acl = [];
    }
    /**
     *
     * @param role
     * @param action
     * @param attributes
     * @param condition
     */
    addRight(role, action, attributes = ['*'], condition) {
        const { resource } = this;
        const right = {
            resource,
            role,
            action,
            attributes,
            condition
        };
        this.addRightToAcl(right);
    }
    /**
     *
     * @param acl
     */
    addRightToAcl(right) {
        this.acl.push(right);
    }
    /**
     *
     */
    static applyRights() {
        RightsManager.accessController.setGrants(RightsManager.rights);
    }
    /**
     *
     */
    static registerRightsController(rightsManager) {
        RightsManager.rights.push(...rightsManager.acl);
    }
    /**
     *
     */
    static getRole(user) {
        return RightsManager.roleCallback(user);
    }
}
exports.RightsManager = RightsManager;
/**
 *
 */
RightsManager.accessController = accessControlInstance;
/**
 *
 */
RightsManager.rights = [];
/**
 *
 */
RightsManager.roleCallback = (user) => user.role;
//# sourceMappingURL=RightsManager.js.map