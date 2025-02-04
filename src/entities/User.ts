import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";


@Entity('users')
export class User {

@PrimaryGeneratedColumn('increment')  
id:number;  

@Column('varchar',{ length: 255, nullable: false})
nome:string;

@Column('varchar',{ length: 255, nullable: false,unique: true})
email:string;

@Column('varchar',{ length: 255, nullable: false})
senha:string;

}

/*id (chave primária, auto-incremento)

nome (string)

email (string, único)

senha (string, hash)*/

//