import {Entity, Column, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Company 
{
    @PrimaryGeneratedColumn("uuid")
    id:string = '';

    @Column()
    name:string = '';

    @Column()
    ceo:string = '';

    @Column()
    address:string = '';

    @Column()    
    date:string = '';

}