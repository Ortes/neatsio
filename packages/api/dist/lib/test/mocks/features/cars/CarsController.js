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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
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
const src_1 = require("../../../../src");
const src_2 = require("../../../../src");
const CarsService_1 = require("./CarsService");
let CarsController = class CarsController {
    constructor() {
        this.carsService.addCars();
    }
    find(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const cars = this.carsService.getCars();
            return cars.filter(car => car.userId === user.id);
        });
    }
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const cars = this.carsService.getCars();
            return cars;
        });
    }
    query(code) {
        return { code };
    }
    requestHandler(id) {
        const retrieveKey = (idLa) => __awaiter(this, void 0, void 0, function* () {
            return idLa;
        });
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            this.carsService.reset();
            this.carsService.addCars();
            const retrievedId = yield retrieveKey(id);
            res.json({ cars: this.carsService.getCars(), id: retrievedId });
        });
    }
};
__decorate([
    src_2.Inject,
    __metadata("design:type", CarsService_1.CarsService)
], CarsController.prototype, "carsService", void 0);
__decorate([
    (0, src_1.AuthMiddleware)(),
    (0, src_1.Get)(),
    __param(0, src_1.CurrentUser),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "find", null);
__decorate([
    (0, src_1.Get)('/service'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CarsController.prototype, "findAll", null);
__decorate([
    (0, src_1.Get)('/query'),
    __param(0, (0, src_1.Query)('code')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CarsController.prototype, "query", null);
__decorate([
    (0, src_1.Get)('/requesthandler/:id', { requestHandler: true }),
    __param(0, (0, src_1.Params)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], CarsController.prototype, "requestHandler", null);
CarsController = __decorate([
    (0, src_1.Controller)('cars'),
    __metadata("design:paramtypes", [])
], CarsController);
exports.default = CarsController;
//# sourceMappingURL=CarsController.js.map