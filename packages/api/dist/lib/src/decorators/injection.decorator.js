"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Inject = void 0;
const Injector_1 = require("../Injector");
function Inject(target, propertyName) {
    const meta = Reflect.getMetadata('design:type', target, propertyName);
    if (!meta)
        throw new Error(`metadata for ${propertyName} in ${target.constructor.name} is not available`);
    Object.defineProperty(target, propertyName, {
        get: () => Injector_1.providerContainer.resolve(meta.name),
        enumerable: true,
        configurable: true
    });
}
exports.Inject = Inject;
//# sourceMappingURL=injection.decorator.js.map