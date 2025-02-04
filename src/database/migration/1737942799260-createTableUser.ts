import { table, timeStamp } from "node:console";
import { MigrationInterface, QueryRunner, Table, Timestamp } from "typeorm";

export class CreateTableUser1737942799260 implements MigrationInterface {


    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
        name:'users',
        columns:[
            {
                name:'id',
                type:'int',
                isGenerated:true,
                generationStrategy:'increment'
            },
            {
                name:'nome',
                type:'varchar',
                length:'255',
                isNullable:false
            },

            {
                name: 'email',
                type:'varchar',
                length:'255',
                isNullable: false,
                isUnique:true
            },
            {
                name:"senha",
                type:'varchar',
                length:'255',
                isNullable: false,
            },
            {
                name:'created_at',
                type:'timestamp',
                default:'now()'
            },
            {
                name:'update_at',
                type:'timestamp',
                default:'now()'
            }
    
        ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
