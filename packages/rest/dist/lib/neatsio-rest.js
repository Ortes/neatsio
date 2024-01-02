"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const orchestrator_1 = require("./orchestrator");
const mongoose = require("mongoose");
mongoose.plugin(require('mongoose-deep-populate')(mongoose));
const orchestrator = new orchestrator_1.default();
exports.default = orchestrator;
//# sourceMappingURL=neatsio-rest.js.map