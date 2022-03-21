import {Entity, Column, PrimaryGeneratedColumn, ManyToOne} from "typeorm";
import { Company } from "./Company";

@Entity()
export class Team
{
 @PrimaryGeneratedColumn("uuid")
 id:string = '';

 @ManyToOne(type => Company)
 @Column()
 companyId:string = '';

 @Column()
 leadName:string = '';
}