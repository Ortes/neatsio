"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const injection_1 = require("./mocks/injection");
describe('Injection tests', () => {
    it('should return param type', () => {
        const injectionInstance = new injection_1.InjectionTest();
    });
    it('should return cars from a CarService on a simple function via resolver, no injection', () => {
        expect((0, injection_1.simpleFunctionInjectionInvoke)()).toHaveLength(2);
    });
});
//# sourceMappingURL=injection.test.js.map