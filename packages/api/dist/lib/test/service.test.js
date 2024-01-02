"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("supertest");
const server_1 = require("./mocks/server");
let app;
describe('Server mocked', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        app = yield (0, server_1.startServer)(3004);
    }));
    describe('GET /cars/service', () => {
        it('should return value via services init in construtor', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(app)
                .get('/cars/service')
                .expect(200)
                .then(response => {
                expect(response.body).toHaveLength(2);
                expect(response.body[0].registration).toBe('AA-000-BB');
                expect(response.body[1].registration).toBe('CC-111-DD');
            });
        }));
    });
});
//# sourceMappingURL=service.test.js.map