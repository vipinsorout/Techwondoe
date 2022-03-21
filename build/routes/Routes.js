"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
const auth_1 = require("../auth/auth");
const controller_1 = require("../controller/controller");
class Routes {
    constructor() {
        this.controller = new controller_1.Controller();
    }
    routes(app) {
        app.route('/')
            .get((request, response) => {
            response.status(200)
                .send({
                message: "GET request successfully."
            });
        }); // following code is to handle http://localhost:3000/superHero request.
        app.route('/company')
            .post(this.controller.addCompany); // following code is to handle http://localhost:3000/superHero/{superHeroId} request.
        app.route('/company/:companyId')
            .get(auth_1.validateToken, this.controller.getCompanyById);
        app.route('/company/:name')
            .get(this.controller.getCompanyByName);
        app.route('/company/:companyId/team')
            .post(this.controller.addTeam);
        app.route('/team')
            .get(this.controller.getTeam);
        app.route('/gettoken')
            .post(this.controller.getToken);
        app.route('/user')
            .post(this.controller.addUser);
    }
}
exports.Routes = Routes;
