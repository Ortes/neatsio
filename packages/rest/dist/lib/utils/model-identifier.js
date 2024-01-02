"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const mongoose_service_1 = require("../services/mongoose-service");
const sequelize_service_1 = require("../services/sequelize-service");
exports.default = {
    /**
     *
     * @param model
     */
    getServiceFromModel(model) {
        return model.prototype instanceof mongoose.Model
            ? new mongoose_service_1.default(model)
            : new sequelize_service_1.default(model);
    }
};
//# sourceMappingURL=model-identifier.js.map