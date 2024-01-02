"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.providerContainer = void 0;
require("reflect-metadata");
class Container {
    constructor() {
        this.providers = new Map();
    }
    resolve(target) {
        const name = typeof target === 'string' ? target : target.name;
        const resolved = this.providers.get(name);
        if (!resolved)
            throw new Error(`No provider found for ${target}!`);
        return resolved;
    }
    addProvider(target) {
        this.providers.set(target.name, new target());
    }
}
exports.providerContainer = new Container();
//# sourceMappingURL=Injector.js.map