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
        app = yield (0, server_1.startServer)(3003);
    }));
    describe('GET /params/query', () => {
        it('should return query value from one specific query param', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(app)
                .get('/cars/query?code=abc')
                .expect(200)
                .then(response => {
                expect(response.body).toMatchObject({ code: 'abc' });
            });
        }));
    });
    // TODO: make others params decorators
});
//# sourceMappingURL=params.test.js.map