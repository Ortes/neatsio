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
exports.startServer = void 0;
const src_1 = require("../../src");
const passport_1 = require("./config/passport");
const options = {
    passportStrategies: [passport_1.tokenStrategy],
    acl: {
        roleCallback: (user) => __awaiter(void 0, void 0, void 0, function* () {
            return user.role;
        })
    },
    debug: false,
    tsEnv: __filename.endsWith('ts')
};
const startServer = (port) => __awaiter(void 0, void 0, void 0, function* () {
    options.port = port;
    const express = yield src_1.app.initNativeApp(options);
    yield src_1.app.start(options);
    return express;
});
exports.startServer = startServer;
//# sourceMappingURL=server.js.map