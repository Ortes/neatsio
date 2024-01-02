"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Converter = void 0;
class Converter {
    constructor(query) {
        this.conditions = query.conditions;
        this.limit = query.limit;
        this.skip = query.skip;
        this.sort = query.sort;
        this.select = query.select;
        this.populate = query.populate;
    }
}
exports.Converter = Converter;
//# sourceMappingURL=converter.js.map