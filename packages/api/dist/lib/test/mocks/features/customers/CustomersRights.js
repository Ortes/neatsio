"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../../../src");
class CustomersRights extends src_1.RightsManager {
    constructor() {
        super('customer');
        this.addRight('admin', src_1.NeatsioActions.GET_MANY);
        this.addRight('user', src_1.NeatsioActions.GET_ONE);
    }
}
exports.default = new CustomersRights();
//# sourceMappingURL=CustomersRights.js.map