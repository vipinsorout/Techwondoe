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
exports.Controller = void 0;
const connection_1 = require("../connection/connection");
const Company_1 = require("../entity/Company");
const Team_1 = require("../entity/Team");
const typeorm_1 = require("typeorm");
const crypto_1 = require("crypto");
const User_1 = require("../entity/User");
const auth_1 = require("../auth/auth");
class Controller {
    constructor() { }
    getCompanyById(req, res) {
        connection_1.connection
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            const company = (yield connection.manager.findOne(Company_1.Company, req.params.id)) || new Company_1.Company();
            res.json(company);
        }))
            .catch(error => {
            console.error("Error ", error);
            res.json(error);
        });
    }
    getCompanyByName(req, res) {
        connection_1.connection
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            const company = yield connection.manager.find(Company_1.Company, { name: (0, typeorm_1.Like)(`%${req.params.name}%`) });
            res.json(company);
        }))
            .catch(error => {
            console.error("Error ", error);
            res.json(error);
        });
    }
    addCompany(req, res) {
        connection_1.connection
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            let requestCompany = req.body;
            let company = new Company_1.Company();
            company.name = requestCompany.name;
            company.address = requestCompany.address;
            company.ceo = requestCompany.ceo;
            company.date = requestCompany.date;
            company.id = (0, crypto_1.randomUUID)();
            yield connection.manager.save(company);
            res.json({ message: "Successfully Saved.", id: company.id });
        }))
            .catch(error => {
            console.error("Error ", error);
            res.json(error);
        });
    }
    addTeam(req, res) {
        connection_1.connection
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            let requestCompany = req.body;
            let companyId = req.params.companyId;
            let team = new Team_1.Team();
            team.leadName = requestCompany.leadName;
            team.companyId = companyId;
            team.id = (0, crypto_1.randomUUID)();
            yield connection.manager.save(team);
            res.json({ message: "Successfully Saved.", id: team.id });
        }))
            .catch(error => {
            console.error("Error ", error);
            res.json(error);
        });
    }
    getTeam(req, res) {
        connection_1.connection
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            const teams = yield connection.getRepository(Team_1.Team).createQueryBuilder("team").leftJoinAndSelect("team.companyId", "company").getMany();
            res.json(teams);
        }))
            .catch(error => {
            console.error("Error ", error);
            res.json(error);
        });
    }
    addUser(req, res) {
        connection_1.connection
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            let request = req.body;
            let user = new User_1.User();
            user.username = request.username;
            user.password = request.password;
            user.id = (0, crypto_1.randomUUID)();
            yield connection.manager.save(user);
            res.json({ message: "Successfully Saved.", id: user.id });
        }))
            .catch(error => {
            console.error("Error ", error);
            res.json(error);
        });
    }
    getToken(req, res) {
        connection_1.connection
            .then((connection) => __awaiter(this, void 0, void 0, function* () {
            const user = (yield connection.manager.findOne(User_1.User, req.params.username)) || new User_1.User();
            if (!req.headers.password && user.password != req.headers.password) {
                res.status(400).send({ message: "invalid" });
            }
            else {
                let token = (0, auth_1.getJWT)(user.id, user.username);
                res.json({ token: token });
            }
        }))
            .catch(error => {
            console.error("Error ", error);
            res.json(error);
        });
    }
}
exports.Controller = Controller;
