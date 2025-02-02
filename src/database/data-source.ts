import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Medicamento } from '../entities/Medicamento';
import { User } from '../entities/User';

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'adimin',
    database: 'vitrine-medicamentos',
    synchronize: true,
    logging: false,
    entities: [User, Medicamento],
    migrations: ['src/database/migration/.ts*'],
    subscribers: ['src/database/subscribers/.ts'],
});
