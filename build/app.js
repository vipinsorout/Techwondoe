"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const routes_1 = require("./routes/routes");
const bodyParser = require("body-parser");
class App {
    constructor() {
        this.app = (0, express_1.default)(); // support application/json type post data
        this.app.use(bodyParser.json()); //support application/x-www-form-urlencoded post data
        this.app.use(bodyParser.urlencoded({ extended: false })); // for routing the http request to controller
        this.routePrv = new routes_1.Routes();
        this.routePrv.routes(this.app);
    }
}
exports.default = new App().app;
