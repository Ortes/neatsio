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
const sequelize_typescript_1 = require("sequelize-typescript");
const src_1 = require("../../../../src");
const CustomerService_1 = require("./CustomerService");
let Customer = class Customer extends sequelize_typescript_1.Model {
    static setTriggerValue(instance) {
        return __awaiter(this, void 0, void 0, function* () {
            instance.triggeredOnBeforeSave = instance.customerService.isJohn(instance);
        });
    }
};
__decorate([
    src_1.Inject,
    __metadata("design:type", CustomerService_1.CustomerService)
], Customer.prototype, "customerService", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Customer.prototype, "lastname", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Customer.prototype, "firstname", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Customer.prototype, "email", void 0);
__decorate([
    (0, sequelize_typescript_1.Default)(false),
    sequelize_typescript_1.Column,
    __metadata("design:type", Boolean)
], Customer.prototype, "triggeredOnBeforeSave", void 0);
__decorate([
    sequelize_typescript_1.BeforeSave,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Customer]),
    __metadata("design:returntype", Promise)
], Customer, "setTriggerValue", null);
Customer = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: 'customers',
        timestamps: false
    })
], Customer);
exports.default = Customer;
//# sourceMappingURL=Customer.js.map