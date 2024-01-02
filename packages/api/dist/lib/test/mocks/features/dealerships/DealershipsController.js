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
let DealershipsController = class DealershipsController {
    /**
     *
     */
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return [{ name: 'My best cars dealership' }, { name: '2 buckets car rooms' }];
        });
    }
    /**
     *
     */
    create(body) {
        return __awaiter(this, void 0, void 0, function* () {
            return body;
        });
    }
    /**
     *
     */
    update(id2, companyId, id) {
        return __awaiter(this, void 0, void 0, function* () {
            return { companyId, id, id2 };
        });
    }
    /**
     *
     */
    delete(acceptHeader, companyId) {
        return __awaiter(this, void 0, void 0, function* () {
            return { acceptHeader, companyId };
        });
    }
};
__decorate([
    (0, src_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DealershipsController.prototype, "findAll", null);
__decorate([
    (0, src_1.Post)(),
    __param(0, src_1.Body),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], DealershipsController.prototype, "create", null);
__decorate([
    (0, src_1.Put)('/:id'),
    __param(0, (0, src_1.Body)('id')),
    __param(1, (0, src_1.Body)({ path: 'company.id' })),
    __param(2, (0, src_1.Params)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, String]),
    __metadata("design:returntype", Promise)
], DealershipsController.prototype, "update", null);
__decorate([
    (0, src_1.Delete)('/:companyId/:id'),
    __param(0, (0, src_1.Header)('accept')),
    __param(1, (0, src_1.Params)('companyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DealershipsController.prototype, "delete", null);
DealershipsController = __decorate([
    (0, src_1.Controller)('dealerships')
], DealershipsController);
exports.default = DealershipsController;
//# sourceMappingURL=DealershipsController.js.map