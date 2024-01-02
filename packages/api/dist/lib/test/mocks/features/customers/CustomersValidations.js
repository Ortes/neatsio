"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationsCreateOne = void 0;
const express_validator_1 = require("express-validator");
exports.validationsCreateOne = [
    (0, express_validator_1.body)('lastname')
        .isString()
        .trim()
        .isLength({ min: 2 }),
    (0, express_validator_1.body)('firstname')
        .isString()
        .trim()
        .isLength({ min: 2 })
];
//# sourceMappingURL=CustomersValidations.js.map