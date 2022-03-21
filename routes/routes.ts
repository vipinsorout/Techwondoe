import {Request, Response} from "express";
import { validateToken } from "../auth/auth";
import {Controller} from "../controller/controller";

class Routes {
    private controller: Controller;    
    constructor() {
        this.controller = new Controller();
    }    
    public routes(app:any): void {
        app.route('/')
            .get((request: Request, response: Response) => {
                response.status(200)
                    .send({
                        message: "GET request successfully."
                    });
            });// following code is to handle http://localhost:3000/superHero request.
        app.route('/company')
            .post(validateToken,this.controller.addCompany);        // following code is to handle http://localhost:3000/superHero/{superHeroId} request.
        app.route('/company/:companyId')
            .get(validateToken,this.controller.getCompanyById)
        app.route('/company/:name')
            .get(validateToken,this.controller.getCompanyByName);
            app.route('/company/:companyId/team')
            .post(validateToken,this.controller.addTeam);
            app.route('/team')
            .get(validateToken,this.controller.getTeam);
            app.route('/gettoken')
            .post(this.controller.getToken);
            app.route('/user')
            .post(this.controller.addUser);            
             
    }
}

export {Routes};