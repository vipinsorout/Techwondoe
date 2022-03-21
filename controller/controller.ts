import { Request, Response } from 'express';
import { connection } from "../connection/connection";
import { Company } from '../entity/Company';
import { Team } from '../entity/Team';
import { Like } from 'typeorm';
import { randomUUID } from 'crypto';
import { User } from '../entity/User';
import { getJWT } from '../auth/auth';

class Controller {
    constructor() { }
    public getCompanyById(req: Request, res: Response) {
        connection
            .then(async connection => {
                const company: Company = await connection.manager.findOne(Company,req.params.id) || new Company();
                res.json(company);
            })
            .catch(error => {
                console.error("Error ", error);
                res.json(error);
            });
    }

    public getCompanyByName(req: Request, res: Response) {
        connection
            .then(async connection => {
                const company: Company[] = await connection.manager.find(Company,{name: Like(`%${req.params.name}%`)});                
                res.json(company);
            })
            .catch(error => {
                console.error("Error ", error);
                res.json(error);
            });
    }

    public addCompany(req: Request, res: Response) {
        connection
            .then(async connection => {
                let requestCompany = req.body;
                let company = new Company();
                company.name = requestCompany.name;
                company.address = requestCompany.address;
                company.ceo = requestCompany.ceo;
                company.date =requestCompany.date;
                company.id = randomUUID();
                await connection.manager.save(company);
                res.json({ message: "Successfully Saved.",id:company.id })
            })
            .catch(error => {
                console.error("Error ", error);
                res.json(error);
            });
    }

    public addTeam(req: Request, res: Response) {
        connection
            .then(async connection => {
                let requestCompany = req.body;
                let companyId = req.params.companyId;
                let team = new Team();
                team.leadName = requestCompany.leadName;
                team.companyId = companyId;
                team.id = randomUUID();
                await connection.manager.save(team);
                res.json({ message: "Successfully Saved.",id:team.id })
            })
            .catch(error => {
                console.error("Error ", error);
                res.json(error);
            });
    }

    public getTeam(req: Request, res: Response) {
        connection
            .then(async connection => {
                const teams: Team[] = await connection.getRepository(Team).createQueryBuilder("team").leftJoinAndSelect("team.companyId","company").getMany();
                res.json(teams);
            })
            .catch(error => {
                console.error("Error ", error);
                res.json(error);
            });
    }
    
    public addUser(req: Request, res: Response) {
        connection
            .then(async connection => {
                let request = req.body;
                let user = new User();
                user.username = request.username;
                user.password = request.password;
                user.id = randomUUID();
                await connection.manager.save(user);
                res.json({ message: "Successfully Saved.",id:user.id })
            })
            .catch(error => {
                console.error("Error ", error);
                res.json(error);
            });
    }
    
    public getToken(req: Request, res: Response) {
        connection
            .then(async connection => {
                const user: User = await connection.manager.findOne(User,req.params.username) || new User();
                if(!req.headers.password && user.password != req.headers.password)
                {
                    res.status(400).send({message:"invalid"});
                }else
                {
                    let token = getJWT(user.id,user.username);
                    res.json({token:token});
                }
            })
            .catch(error => {
                console.error("Error ", error);
                res.json(error);
            });
    }    

}

export { Controller }