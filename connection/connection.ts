import { createConnection } from "typeorm";
import { Company } from "../entity/Company";
import { Team } from "../entity/Team";
import { User } from "../entity/User";
import config from "../config/config";


export const connection = createConnection({
    type: "mysql", host: config.mysql.host, port: config.mysql.port, username: config.mysql.user, password: config.mysql.password, database: config.mysql.database,
    entities: [
        Company,
        Team,
        User
    ],
    synchronize: true,
    logging: false
});