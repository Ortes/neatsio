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
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../../../src");
const CustomersValidations_1 = require("./CustomersValidations");
const Customer_1 = require("./Customer");
const CustomersRights_1 = require("./CustomersRights");
const src_2 = require("../../../../src");
const CustomerService_1 = require("./CustomerService");
const controllerOptions = {
    model: Customer_1.default,
    rights: CustomersRights_1.default
};
let CustomersController = class CustomersController {
    [_a = src_1.NeatsioActions.GET_ONE]() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    [_b = src_1.NeatsioActions.CREATE_ONE]() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    [_c = src_1.NeatsioActions.GET_MANY]() {
        return __awaiter(this, void 0, void 0, function* () { });
    }
    download() {
        return (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.status(200).json({});
        });
    }
    getEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.customerService.findByEmail(email);
        });
    }
    sendMessage(message) {
        return __awaiter(this, void 0, void 0, function* () {
            return { message: 'TEST: ' + message };
        });
    }
};
__decorate([
    src_2.Inject,
    __metadata("design:type", CustomerService_1.CustomerService)
], CustomersController.prototype, "customerService", void 0);
__decorate([
    (0, src_1.Middleware)(src_1.authMiddleware),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, _a, null);
__decorate([
    (0, src_1.AuthMiddleware)(),
    (0, src_1.ValidationMiddleware)(CustomersValidations_1.validationsCreateOne),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, _b, null);
__decorate([
    (0, src_1.AuthMiddleware)(),
    (0, src_1.RoleMiddleware)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, _c, null);
__decorate([
    (0, src_1.Get)('/:id/download', { requestHandler: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], CustomersController.prototype, "download", null);
__decorate([
    (0, src_1.Get)('/email/:email'),
    __param(0, (0, src_1.Params)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "getEmail", null);
__decorate([
    (0, src_1.Post)('/test'),
    __param(0, (0, src_1.Params)('message')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "sendMessage", null);
CustomersController = __decorate([
    (0, src_1.Controller)('customers', controllerOptions)
], CustomersController);
exports.default = CustomersController;
//# sourceMappingURL=CustomersController.js.map