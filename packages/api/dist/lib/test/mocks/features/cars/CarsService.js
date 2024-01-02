"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsService = void 0;
const service_decorator_1 = require("../../../../src/decorators/service.decorator");
const src_1 = require("../../../../src");
const RegistrationService_1 = require("./RegistrationService");
let CarsService = class CarsService {
    constructor() {
        this.myCars = [];
    }
    addCars() {
        const registrations = this.registrationService.getAvailableRegistration();
        const cars = [
            { registration: registrations[0], name: 'Renault Mégane', userId: 1 },
            { registration: registrations[1], name: 'Land Rover Evoque', userId: 2 }
        ];
        this.myCars.push(...cars);
    }
    getCars() {
        return this.myCars;
    }
    reset() {
        this.myCars = [];
    }
};
exports.CarsService = CarsService;
__decorate([
    src_1.Inject,
    __metadata("design:type", RegistrationService_1.RegistrationService)
], CarsService.prototype, "registrationService", void 0);
exports.CarsService = CarsService = __decorate([
    (0, service_decorator_1.Service)()
], CarsService);
//# sourceMappingURL=CarsService.js.map