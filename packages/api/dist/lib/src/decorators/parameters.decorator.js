"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentUser = exports.Query = exports.Header = exports.Params = exports.Body = void 0;
const MetadataManager_1 = require("../MetadataManager");
const dot_prop_1 = require("dot-prop");
///
///
///
function applyBody(parameters, options) {
    const target = parameters[0];
    const key = parameters[1];
    const index = parameters[2];
    (0, dot_prop_1.set)(MetadataManager_1.MetadataManager.meta, `controllers.${target.constructor.name}.routesParameters.${key}.${index}`, {
        getValue: (req) => {
            // Without string or object params, return the whole body
            if (!options)
                return req.body;
            const path = typeof options === 'string' ? options : options === null || options === void 0 ? void 0 : options.path;
            if (!path)
                throw new Error(`Options Malformatted`);
            return (0, dot_prop_1.get)(req.body, path);
        }
    });
}
function Body(...args) {
    if (args.length > 2) {
        applyBody(args);
        return;
    }
    return (...parameters) => {
        applyBody(parameters, args[0]);
    };
}
exports.Body = Body;
///
///
///
function applyParams(parameters, options) {
    const target = parameters[0];
    const key = parameters[1];
    const index = parameters[2];
    (0, dot_prop_1.set)(MetadataManager_1.MetadataManager.meta, `controllers.${target.constructor.name}.routesParameters.${key}.${index}`, {
        getValue: (req) => {
            return !options ? req.params : req.params[options];
        }
    });
}
function Params(...args) {
    if (args.length > 2) {
        applyParams(args);
        return;
    }
    return (...parameters) => {
        applyParams(parameters, args[0]);
    };
}
exports.Params = Params;
///
///
///
function applyHeader(parameters, options) {
    const target = parameters[0];
    const key = parameters[1];
    const index = parameters[2];
    (0, dot_prop_1.set)(MetadataManager_1.MetadataManager.meta, `controllers.${target.constructor.name}.routesParameters.${key}.${index}`, {
        getValue: (req) => {
            return !options ? req.headers : req.headers[options.toLowerCase()];
        }
    });
}
function Header(...args) {
    if (args.length > 2) {
        applyHeader(args);
        return;
    }
    return (...parameters) => {
        applyHeader(parameters, args[0]);
    };
}
exports.Header = Header;
///
///
///
function applyQuery(parameters, options) {
    const target = parameters[0];
    const key = parameters[1];
    const index = parameters[2];
    (0, dot_prop_1.set)(MetadataManager_1.MetadataManager.meta, `controllers.${target.constructor.name}.routesParameters.${key}.${index}`, {
        getValue: (req) => {
            return !options ? req.query : req.query[options.toLowerCase()];
        }
    });
}
function Query(...args) {
    if (args.length > 2) {
        applyQuery(args);
        return;
    }
    return (...parameters) => {
        applyQuery(parameters, args[0]);
    };
}
exports.Query = Query;
/**
 *
 * @param target
 * @param propertyName
 * @param index
 */
function CurrentUser(target, key, index) {
    (0, dot_prop_1.set)(MetadataManager_1.MetadataManager.meta, `controllers.${target.constructor.name}.routesParameters.${key}.${index}`, {
        getValue: (req) => {
            return req.user;
        }
    });
}
exports.CurrentUser = CurrentUser;
//# sourceMappingURL=parameters.decorator.js.map