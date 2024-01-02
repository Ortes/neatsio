"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.modelIdentifier = exports.isPlainObject = exports.AsyncWrapper = void 0;
var async_wrapper_1 = require("./async-wrapper");
Object.defineProperty(exports, "AsyncWrapper", { enumerable: true, get: function () { return async_wrapper_1.default; } });
var is_plain_object_1 = require("./is-plain-object");
Object.defineProperty(exports, "isPlainObject", { enumerable: true, get: function () { return is_plain_object_1.default; } });
var model_identifier_1 = require("./model-identifier");
Object.defineProperty(exports, "modelIdentifier", { enumerable: true, get: function () { return model_identifier_1.default; } });
__exportStar(require("./merge-deep"), exports);
__exportStar(require("./model-identifier"), exports);
__exportStar(require("./path"), exports);
//# sourceMappingURL=index.js.map