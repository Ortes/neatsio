"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_typescript_1 = require("sequelize-typescript");
const Customer_1 = require("./features/customers/Customer");
const User_1 = require("./features/users/User");
const sequelize = new sequelize_typescript_1.Sequelize({
    dialect: 'sqlite',
    storage: ':memory:', //__dirname + '/database.db',
    logging: false
});
sequelize.addModels([Customer_1.default, User_1.default]);
exports.default = sequelize;
//# sourceMappingURL=database.js.map