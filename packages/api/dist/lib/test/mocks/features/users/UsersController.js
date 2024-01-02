"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const src_1 = require("../../../../src");
const User_1 = require("./User");
const controllerOptions = {
    model: User_1.default
};
let UsersController = class UsersController {
};
UsersController = __decorate([
    (0, src_1.Controller)('users', controllerOptions)
], UsersController);
exports.default = UsersController;
//# sourceMappingURL=UsersController.js.map