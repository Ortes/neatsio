"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.foid = void 0;
let IDX = 36;
let HEX = '';
while (IDX--)
    HEX += IDX.toString(36);
const foid = (len) => {
    var str = '', num = len || 11;
    while (num--)
        str += HEX[(Math.random() * 36) | 0];
    return str;
};
exports.foid = foid;
//# sourceMappingURL=foid.js.map