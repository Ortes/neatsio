"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const Injector_1 = require("../Injector");
const Service = () => (constructor) => {
    Injector_1.providerContainer.addProvider(constructor);
    return constructor;
};
exports.Service = Service;
//# sourceMappingURL=service.decorator.js.map