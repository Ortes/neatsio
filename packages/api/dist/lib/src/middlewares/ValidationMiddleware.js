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
exports.validationMiddleware = void 0;
const express_validator_1 = require("express-validator");
const async_wrapper_1 = require("@owliehq/async-wrapper");
const validationMiddleware = (validations) => {
    const handler = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const runValidationPromises = validations.map((validation) => validation.run(req));
        yield Promise.all(runValidationPromises);
        const errors = (0, express_validator_1.validationResult)(req);
        if (errors.isEmpty()) {
            const data = (0, express_validator_1.matchedData)(req, { locations: ['body'] });
            // Handle object value from matchedData
            // See issue: https://github.com/express-validator/express-validator/issues/915
            req.body = Array.isArray(req.body) ? Object.values(data) : data;
            return next();
        }
        const result = errors.array().map((error) => {
            return {
                message: error.msg || `Field '${error.param}' is invalid or missing.`,
                field: error.param
            };
        });
        const message = `There's error(s) on param(s).`;
        res.status(422).json({ statusCode: 422, message, errors: result });
    });
    return (0, async_wrapper_1.asyncWrapper)(handler);
};
exports.validationMiddleware = validationMiddleware;
//# sourceMappingURL=ValidationMiddleware.js.map