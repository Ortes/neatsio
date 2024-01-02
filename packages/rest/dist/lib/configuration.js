"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Configuration = void 0;
class Configuration {
    // TODO: interface & throwing errors
    constructor(options = {}) {
        this.includeLimit = 50;
        options = options || {};
        this.includeLimit = options.includeLimit || 100;
    }
}
exports.Configuration = Configuration;
//# sourceMappingURL=configuration.js.map