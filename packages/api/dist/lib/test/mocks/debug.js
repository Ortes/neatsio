"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("./server");
console.log('==================');
console.log('Start debugging...');
console.log('==================');
(0, server_1.startServer)(3000).then(server => {
    console.log('==================');
    console.log('Server started on port 3000');
    console.log('==================');
});
//# sourceMappingURL=debug.js.map