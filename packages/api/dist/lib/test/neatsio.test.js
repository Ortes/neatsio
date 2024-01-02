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
const database_1 = require("./mocks/database");
const Customer_1 = require("./mocks/features/customers/Customer");
const User_1 = require("./mocks/features/users/User");
const destroyOptions = {
    where: {},
    truncate: true,
    restartIdentity: true
};
let app;
describe('Neatsio: Controller mixin Neatsio routes', () => {
    beforeAll((done) => __awaiter(void 0, void 0, void 0, function* () {
        yield database_1.default.authenticate();
        yield database_1.default.sync({ force: true });
        app = yield (0, server_1.startServer)(3002);
        done();
    }));
    afterAll(() => { });
    describe('GET /customers', () => {
        beforeAll(() => {
            return Customer_1.default.create({
                firstname: 'John',
                lastname: 'DOE'
            });
        });
        afterAll(() => {
            return Customer_1.default.destroy(destroyOptions);
        });
        /*it('should return an array with customers values', async () => {
          return request(app)
            .get('/customers')
            .expect(200)
            .then(response => {
              expect(response.body).toHaveLength(1)
            })
        })*/
    });
    describe('Auth section', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield database_1.default.sync({ force: true });
            yield User_1.default.create({
                firstname: 'John',
                lastname: 'DOE',
                email: 'john.doe@acme.com',
                password: '123',
                role: 'admin'
            });
            yield Customer_1.default.create({
                firstname: 'Arnold',
                lastname: 'LEVIATHAN'
            });
        }));
        afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield User_1.default.destroy(destroyOptions);
            yield Customer_1.default.destroy(destroyOptions);
        }));
        let accessToken;
        it('should return an access token', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(app)
                .post('/auth/login')
                .send({ email: 'john.doe@acme.com', password: '123' })
                .expect(200)
                .then(response => {
                accessToken = response.body.accessToken;
                expect(response.body.accessToken).toBeDefined();
            });
        }));
        it('should not give access to required auth route without access token', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(app)
                .get('/customers/1')
                .expect(401);
        }));
        it('should not give access to required auth route with false access token', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(app)
                .get('/customers/1')
                .set('Authorization', `Bearer ex.cede.fefe`)
                .expect(401);
        }));
        it('should give access to required auth route with access token', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(app)
                .get('/customers/1')
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200)
                .then(response => {
                expect(response.body.lastname).toBe('LEVIATHAN');
            });
        }));
        it('should get custom route on neatsio config', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(app)
                .get('/customers/1/download')
                .set('Authorization', `Bearer ${accessToken}`)
                .expect(200);
        }));
    });
    describe('Validations', () => {
        let token;
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield User_1.default.sync({ force: true });
            yield User_1.default.create({
                firstname: 'John',
                lastname: 'DOE',
                email: 'john.doe@acme.com',
                password: '123',
                role: 'admin'
            });
            token = yield request(app)
                .post('/auth/login')
                .send({
                email: 'john.doe@acme.com',
                password: '123'
            })
                .then(response => response.body.accessToken);
        }));
        afterAll(() => {
            return Customer_1.default.destroy(destroyOptions);
        });
        it('should return error when validations are not fullfilled', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(app)
                .post('/customers')
                .set('Authorization', `Bearer ${token}`)
                .send({ lastname: 'D' })
                .expect(422);
        }));
        it('should create customer when validations are fullfilled', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(app)
                .post('/customers')
                .set('Authorization', `Bearer ${token}`)
                .send({ lastname: 'DOE', firstname: 'John' })
                .expect(201);
        }));
    });
    describe('Service Injection', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield Customer_1.default.sync({ force: true });
            yield Customer_1.default.create({
                lastname: 'DOE',
                firstname: 'John',
                email: 'john.doe@acme.com'
            });
            yield Customer_1.default.create({
                lastname: 'DOE',
                firstname: 'Jane',
                email: 'jane.doe@acme.com'
            });
        }));
        it('should return john customer with correct triggered value', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(app)
                .get('/customers/email/john.doe@acme.com')
                .expect(200)
                .then(response => {
                expect(response.body.email).toBe('john.doe@acme.com');
                expect(response.body.triggeredOnBeforeSave).toBe(true);
            });
        }));
        it('should return jane customer with falsy not triggered value', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(app)
                .get('/customers/email/jane.doe@acme.com')
                .expect(200)
                .then(response => {
                expect(response.body.email).toBe('jane.doe@acme.com');
                expect(response.body.triggeredOnBeforeSave).toBe(false);
            });
        }));
    });
    describe('Users section', () => {
        beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
            yield User_1.default.sync({ force: true });
            yield User_1.default.create({
                firstname: 'John',
                lastname: 'DOE',
                email: 'john.doe@acme.com',
                password: '123',
                role: 'admin'
            });
        }));
        afterAll(() => {
            return User_1.default.destroy(destroyOptions);
        });
        it('should return an array of users', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(app)
                .get('/users')
                .expect(200)
                .then(response => {
                expect(response.body).toHaveLength(1);
            });
        }));
    });
    describe('Custom route section', () => {
        let message;
        it('should return a message', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(app)
                .post('/customers/test')
                .send({ message: 'coucou' })
                .expect(200)
                .then(response => {
                message = response.body.message;
                expect(response.body.message).toBeDefined();
            });
        }));
        it('should return a 404', () => __awaiter(void 0, void 0, void 0, function* () {
            return request(app)
                .delete('/customers/test')
                .send({ message: 'coucou' })
                .expect(404);
        }));
    });
});
//# sourceMappingURL=neatsio.test.js.map