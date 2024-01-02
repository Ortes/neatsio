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
exports.Override = exports.Delete = exports.Put = exports.Post = exports.Get = void 0;
const dot_prop_1 = require("dot-prop");
const MetadataManager_1 = require("../MetadataManager");
const Metadata_1 = require("../interfaces/Metadata");
const buildMethod = (method) => (subRoute = '/', options = {}) => (target, propertyKey, descriptor) => {
    let handler;
    const obj = MetadataManager_1.MetadataManager.meta;
    const path = `controllers.${target.constructor.name}.routesParameters.${propertyKey}`;
    if (options.requestHandler) {
        let parameters = [];
        if ((0, dot_prop_1.has)(obj, path)) {
            parameters = MetadataManager_1.MetadataManager.meta.controllers[target.constructor.name].routesParameters[propertyKey];
        }
        handler = function (req, res) {
            return __awaiter(this, void 0, void 0, function* () {
                const executor = descriptor.value.apply(this, Object.values(parameters).map((param) => param.getValue(req)));
                return executor(req, res);
            });
        };
        (0, dot_prop_1.set)(MetadataManager_1.MetadataManager.meta, `controllers.${target.constructor.name}.routes.${propertyKey}`, {
            path: subRoute,
            method,
            requestHandler: true,
            handler
        });
        return;
    }
    handler = function (req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            if ((0, dot_prop_1.has)(obj, path)) {
                const parameters = MetadataManager_1.MetadataManager.meta.controllers[target.constructor.name].routesParameters[propertyKey];
                const result = yield descriptor.value.apply(this, Object.values(parameters).map((param) => param.getValue(req)));
                return res.status(200).json(result);
            }
            const result = yield descriptor.value.apply(this);
            res.status(200).json(result);
        });
    };
    (0, dot_prop_1.set)(MetadataManager_1.MetadataManager.meta, `controllers.${target.constructor.name}.routes.${propertyKey}`, {
        path: subRoute,
        method,
        handler
    });
};
exports.Get = buildMethod(Metadata_1.RouteMethod.GET);
exports.Post = buildMethod(Metadata_1.RouteMethod.POST);
exports.Put = buildMethod(Metadata_1.RouteMethod.PUT);
exports.Delete = buildMethod(Metadata_1.RouteMethod.DELETE);
const Override = () => { };
exports.Override = Override;
//# sourceMappingURL=methods.decorator.js.map