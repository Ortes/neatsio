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
        app = yield (0, server_1.startServer)(3001);
        const result = yield request(app).get('/');
    }));
    describe('GET /dealerships', () => {
        it('should return an array with dealerships values', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(app)
                .get('/dealerships')
                .expect(200)
                .then(response => {
                expect(response.body).toHaveLength(2);
            });
        }));
    });
    describe('POST /dealerships', () => {
        it('should return the body to response', () => __awaiter(void 0, void 0, void 0, function* () {
            const body = {
                name: 'DARLING BUSINESS CARS'
            };
            return request(app)
                .post('/dealerships')
                .send(body)
                .expect(200)
                .then(response => {
                expect(response.body).toBeDefined();
            });
        }));
    });
    describe('PUT /dealerships/1', () => {
        it('should return body updated', () => __awaiter(void 0, void 0, void 0, function* () {
            const body = {
                id: 4,
                company: {
                    id: 1,
                    name: 'Acme'
                }
            };
            return request(app)
                .put('/dealerships/50')
                .send(body)
                .expect(200)
                .then(response => {
                expect(response.body.companyId).toBe(1);
                expect(response.body.id).toBe('50');
                expect(response.body.id2).toBe(4);
            });
        }));
    });
    // Try some random combine
    describe('DELETE /dealerships/12/1', () => {
        it('should return body with headers values', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(app)
                .delete('/dealerships/12/1')
                .accept('application/json')
                .expect(200)
                .then(response => {
                expect(response.body.companyId).toBe('12');
                expect(response.body.acceptHeader).toBe('application/json');
            });
        }));
    });
    describe('GET /cars', () => {
        it('should return value set in a custom middleware', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(app)
                .get('/cars')
                .expect(401)
                .then(response => {
                //expect(response.body).toHaveLength(1)
            });
        }));
    });
    describe('GET /cars/requesthandler', () => {
        it('should return value from a service with requestHandler activated', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(app)
                .get('/cars/requesthandler/2')
                .expect(200)
                .then(response => {
                expect(response.body.cars).toHaveLength(2);
                expect(response.body.id).toBe('2');
            });
        }));
    });
});
//# sourceMappingURL=controller.test.js.map