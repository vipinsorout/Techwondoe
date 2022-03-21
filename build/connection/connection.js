"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const typeorm_1 = require("typeorm");
const Company_1 = require("../entity/Company");
const Team_1 = require("../entity/Team");
const User_1 = require("../entity/User");
const config_1 = __importDefault(require("../config/config"));
exports.connection = (0, typeorm_1.createConnection)({
    type: "mysql", host: config_1.default.mysql.host, port: config_1.default.mysql.port, username: config_1.default.mysql.user, password: config_1.default.mysql.password, database: config_1.default.mysql.database,
    entities: [
        Company_1.Company,
        Team_1.Team,
        User_1.User
    ],
    synchronize: true,
    logging: false
});
