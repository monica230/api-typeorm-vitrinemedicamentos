import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateTableMedicamentos1738461913896
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'medicamentos',
                columns: [
                    {
                        name: 'id',
                        type: 'int',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                        length: '255',
                        isNullable: false,
                    },
                    {
                        name: 'descricao',
                        type:'text',
                        isNullable:true,                    },
                        {
                            name:'quantidade',
                        type: 'int',
                        isGenerated:false,
                        },
                        {
                            name:'userId',
                            type:'int',
                            isNullable:false,
                        },
            ],
            foreignKeys:[
                {
                    columnNames:['userId'],
                    referencedColumnNames:['id'],
                    referencedTableName:'users',
                    onDelete:'CASCADE',
                    onUpdate:'CASCADE',
                },
            ],
        }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('medicamentos');
    }
}
